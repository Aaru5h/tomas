const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, filename);
};
const { POST } = require('../app/api/kontakt/route.ts');
const { allowContact, validateContact } = require('../lib/contact.ts');
const originalFetch = global.fetch;
const originalEnv = { ...process.env };
afterEach(() => {
  global.fetch = originalFetch;
  for (const key of ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL', 'CONTACT_TRUST_PROXY']) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});
const contact = { name: 'Erika Muster', telefon: '+49 123 456789', nachricht: 'Bitte um Rückruf zum Parkettboden.', website: '' };
function request(body = contact, headers = {}) {
  return new Request('https://example.test/api/kontakt', {
    method: 'POST',
    headers: { origin: 'https://example.test', 'content-type': 'application/json', 'idempotency-key': '12345678-1234-4123-8123-123456789012', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}
function configured() {
  process.env.RESEND_API_KEY = 'test-key';
  process.env.CONTACT_FROM_EMAIL = 'Website <contact@example.test>';
  process.env.CONTACT_TO_EMAIL = 'owner@example.test';
}
test('validates trimmed fields and rejects malformed, oversized and injected values', () => {
  assert.equal(validateContact({ ...contact, name: '  Erika  ' }).name, 'Erika');
  for (const value of [null, [], {}, { ...contact, name: ' ' }, { ...contact, name: 'A\nB' }, { ...contact, telefon: 'abcdef' }, { ...contact, nachricht: 'a'.repeat(5001) }, { ...contact, nachricht: 42 }]) {
    assert.equal(validateContact(value), null);
  }
});
test('rejects untrusted requests, malformed JSON, invalid content and honeypots', async () => {
  let calls = 0;
  global.fetch = async () => { calls++; throw new Error('must not call provider'); };
  for (const [req, status] of [
    [request(contact, { origin: 'https://attacker.test' }), 403],
    [request(contact, { origin: '' }), 403],
    [request(contact, { 'content-type': 'text/plain' }), 415],
    [request(contact, { 'idempotency-key': '' }), 400],
    [request('{'), 400],
    [request({}), 400],
    [request({ ...contact, website: 'spam.test' }), 400],
    [request('a'.repeat(24001)), 413],
  ]) assert.equal((await POST(req)).status, status);
  assert.equal(calls, 0);
});
test('missing configuration fails honestly without sending', async () => {
  delete process.env.RESEND_API_KEY;
  const response = await POST(request());
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
});
test('sends to the configured owner and keeps retries idempotent', async () => {
  configured();
  const calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    return Response.json({ id: 'email-123' });
  };
  for (let i = 0; i < 2; i++) {
    const response = await POST(request());
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
    assert.equal(response.headers.get('cache-control'), 'no-store');
  }
  assert.equal(calls[0].url, 'https://api.resend.com/emails');
  const payload = JSON.parse(calls[0].options.body);
  assert.deepEqual(payload.to, ['owner@example.test']);
  assert.match(payload.text, /\+49 123 456789/);
  assert.equal(payload.from, process.env.CONTACT_FROM_EMAIL);
  assert.equal(calls[0].options.headers['Idempotency-Key'], calls[1].options.headers['Idempotency-Key']);
});
test('provider failures and network timeouts never return success or leak errors', async () => {
  configured();
  for (const mock of [
    async () => Response.json({ message: 'private provider details' }, { status: 403 }),
    async () => Response.json({}),
    async () => { throw new Error('private timeout details'); },
  ]) {
    global.fetch = mock;
    const response = await POST(request());
    assert.equal(response.status, 502);
    const body = await response.json();
    assert.equal(body.ok, false);
    assert.doesNotMatch(body.message, /private/);
  }
});
test('endpoint limits repeated sending attempts', async () => {
  configured();
  global.fetch = async () => { throw new Error('must not send after limit'); };
  const response = await POST(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '600');
});
test('rate limit resets after ten minutes', () => {
  for (let i = 0; i < 5; i++) assert.equal(allowContact('test-client', 1000), true);
  assert.equal(allowContact('test-client', 1001), false);
  assert.equal(allowContact('test-client', 601000), true);
});
