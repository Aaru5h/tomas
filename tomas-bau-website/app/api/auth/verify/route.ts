import { createHash } from 'node:crypto';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email')?.trim().toLowerCase();
  const token = url.searchParams.get('token');
  if (!email || !token || !/^[a-f0-9]{64}$/.test(token)) return Response.redirect(new URL('/login?verified=0', url));
  const digest = createHash('sha256').update(token).digest('hex');
  const result = await prisma.verificationToken.deleteMany({ where: { identifier: email, token: digest, expires: { gt: new Date() } } });
  if (result.count !== 1) return Response.redirect(new URL('/login?verified=0', url));
  await prisma.user.update({ where: { email }, data: { emailVerified: new Date() } });
  return Response.redirect(new URL('/login?verified=1', url));
}
