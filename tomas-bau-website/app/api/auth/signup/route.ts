import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { randomBytes, createHash } from 'node:crypto';
import { site } from '@/lib/site';

const attempts = new Map<string, { count: number; until: number }>();

export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  if (origin !== new URL(req.url).origin && origin !== new URL(site.url).origin) return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 403 });
  if (req.headers.get('content-type')?.split(';')[0] !== 'application/json') return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 415 });
  const key = process.env.AUTH_TRUST_PROXY === 'true' ? req.headers.get('x-forwarded-for')?.split(',')[0] || 'shared' : 'shared';
  const now = Date.now();
  for (const [id, value] of attempts) if (value.until < now) attempts.delete(id);
  const attempt = attempts.get(key) || { count: 0, until: now + 600000 };
  if (++attempt.count > 5) return NextResponse.json({ error: 'Zu viele Versuche. Bitte später erneut versuchen.' }, { status: 429 });
  attempts.set(key, attempt);
  if (Number(req.headers.get('content-length')) > 4096) return NextResponse.json({ error: 'Anfrage zu groß.' }, { status: 413 });
  let data: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 4096) return NextResponse.json({ error: 'Anfrage zu groß.' }, { status: 413 });
    data = JSON.parse(raw);
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid body');
  } catch { return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 }); }
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  const password = data.password;
  const localVerification = process.env.NODE_ENV === 'development' && process.env.AUTH_DEV_VERIFICATION_LINK === 'true';
  const sender = process.env.AUTH_FROM_EMAIL;
  if (!localVerification && (!process.env.RESEND_API_KEY || !sender)) return NextResponse.json({ error: 'Registrierung derzeit nicht verfügbar.' }, { status: 503 });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || name.length > 100 || typeof password !== 'string' || password.length < 10 || password.length > 128) {
    return NextResponse.json(
      { error: 'Bitte gültige E-Mail und Passwort (10–128 Zeichen) eingeben.' },
      { status: 400 }
    );
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json(
      { error: 'Ein Konto mit dieser E-Mail existiert bereits.' },
      { status: 409 }
    );
  }

  const hashed = await bcrypt.hash(password, 12);
  const token = randomBytes(32).toString('hex');
  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.create({ data: { name, email, password: hashed } });
      await tx.verificationToken.create({ data: { identifier: email, token: createHash('sha256').update(token).digest('hex'), expires: new Date(Date.now() + 86400000) } });
    });
  } catch { return NextResponse.json({ error: 'Registrierung fehlgeschlagen. Bitte prüfen Sie Ihre Angaben.' }, { status: 409 }); }
  const link = `${new URL(req.url).origin}/api/auth/verify?email=${encodeURIComponent(email)}&token=${token}`;
  if (localVerification) return NextResponse.json({ success: true, verificationUrl: link }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  const sent = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: sender, to: [email], subject: 'E-Mail-Adresse bestätigen', text: `Bestätigen Sie Ihre E-Mail-Adresse innerhalb von 24 Stunden: ${link}` }), signal: AbortSignal.timeout(10000) }).catch(() => null);
  if (!sent?.ok) {
    await prisma.user.delete({ where: { email } });
    await prisma.verificationToken.deleteMany({ where: { identifier: email } });
    return NextResponse.json({ error: 'Bestätigung konnte nicht versendet werden. Bitte später erneut versuchen.' }, { status: 502 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
