import { createHash } from 'node:crypto';
import { allowContact, sendContact, validateContact } from '../../../lib/contact';
import { site } from '../../../lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function reply(status: number, message: string) {
  return Response.json({ ok: status === 200, message }, {
    status,
    headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': '600' } : {}) },
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const allowedOrigins = [new URL(request.url).origin, new URL(site.url).origin];
  if (!origin || !allowedOrigins.includes(origin) || request.headers.get('sec-fetch-site') === 'cross-site') {
    return reply(403, 'Bitte senden Sie die Anfrage direkt über unsere Website.');
  }
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
    return reply(415, 'Die Anfrage muss als JSON gesendet werden.');
  }
  const id = request.headers.get('idempotency-key');
  if (!id || !/^[a-f0-9-]{36}$/i.test(id)) return reply(400, 'Ungültige Anfrage. Bitte laden Sie die Seite neu.');

  let data: unknown;
  const reader = request.body?.getReader();
  if (!reader) return reply(400, 'Bitte füllen Sie das Formular aus.');
  try {
    let bytes = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 24000) {
        await reader.cancel();
        return reply(413, 'Ihre Anfrage ist zu lang. Bitte kürzen Sie die Nachricht.');
      }
      chunks.push(value);
    }
    data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return reply(400, 'Die Anfrage konnte nicht gelesen werden.');
  } finally {
    reader.releaseLock();
  }
  const contact = validateContact(data);
  if (!contact) return reply(400, 'Bitte prüfen Sie Name (2–100 Zeichen), Telefonnummer (mindestens 6 Ziffern) und Nachricht (10–5000 Zeichen).');
  if (typeof (data as Record<string, unknown>).website !== 'string' || (data as Record<string, unknown>).website !== '') {
    return reply(400, 'Die Anfrage konnte nicht verarbeitet werden. Bitte kontaktieren Sie uns telefonisch.');
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  if (!apiKey || !from) return reply(503, 'Das Kontaktformular ist derzeit nicht verfügbar. Bitte rufen Sie uns an oder schreiben Sie uns direkt eine E-Mail.');

  // Only trust a client IP header when the deployment proxy overwrites it.
  const ip = process.env.CONTACT_TRUST_PROXY === 'true'
    ? request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    : 'shared';
  if (!allowContact(createHash('sha256').update(ip).digest('hex'))) {
    return reply(429, 'Zu viele Anfragen. Bitte versuchen Sie es in 10 Minuten erneut oder rufen Sie uns an.');
  }
  try {
    await sendContact(contact, id, { apiKey, from, to });
    return reply(200, 'Vielen Dank! Ihre Anfrage wurde übermittelt. Wir melden uns telefonisch bei Ihnen.');
  } catch {
    return reply(502, 'Der Versand konnte nicht bestätigt werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.');
  }
}
