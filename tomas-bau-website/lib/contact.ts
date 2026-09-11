export type Contact = { name: string; telefon: string; nachricht: string };

export function validateContact(value: unknown): Contact | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  if (typeof data.name !== 'string' || typeof data.telefon !== 'string' || typeof data.nachricht !== 'string') return null;
  const name = data.name.trim();
  const telefon = data.telefon.trim();
  const nachricht = data.nachricht.trim();
  if (name.length < 2 || name.length > 100 || /[\r\n\x00-\x1f]/.test(name)) return null;
  if (telefon.length > 40 || !/^[+\d\s()./-]+$/.test(telefon) || (telefon.match(/\d/g)?.length ?? 0) < 6) return null;
  if (nachricht.length < 10 || nachricht.length > 5000 || nachricht.includes('\0')) return null;
  return { name, telefon, nachricht };
}

// Best-effort per-process protection. Configure a hosting/WAF rate limit as well
// when running multiple instances; this deliberately stores no contact content.
const attempts = new Map<string, { count: number; expires: number }>();
export function allowContact(key: string, now = Date.now()): boolean {
  for (const [id, entry] of attempts) if (entry.expires <= now) attempts.delete(id);
  const entry = attempts.get(key);
  if (entry) {
    if (entry.count >= 5) return false;
    entry.count++;
  } else {
    if (attempts.size >= 10000) return false;
    attempts.set(key, { count: 1, expires: now + 600000 });
  }
  return true;
}

export async function sendContact(contact: Contact, key: string, config: { apiKey: string; from: string; to: string }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `contact/${key}`,
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      subject: `Website-Anfrage von ${contact.name}`,
      text: `Neue Anfrage über die Website\n\nName: ${contact.name}\nTelefon: ${contact.telefon}\n\n${contact.nachricht}`,
    }),
    signal: AbortSignal.timeout(10000),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Email provider rejected the request');
  const result = await response.json();
  if (typeof result?.id !== 'string' || !result.id) throw new Error('Email provider did not acknowledge the request');
}
