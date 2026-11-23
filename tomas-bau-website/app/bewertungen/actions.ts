'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function currentUser() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');
  return session.user.id;
}

export async function saveReview(form: FormData) {
  const userId = await currentUser();
  const rating = Number(form.get('rating'));
  const title = String(form.get('title') ?? '').trim();
  const body = String(form.get('body') ?? '').trim();
  if (!Number.isInteger(rating) || rating < 1 || rating > 5 || title.length > 100 || body.length < 30 || body.length > 1500 || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(body)) redirect('/bewertungen?error=invalid');
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { emailVerified: true } });
  if (!user?.emailVerified) redirect('/bewertungen?error=verify');
  const existing = await prisma.review.findUnique({ where: { userId }, select: { updatedAt: true } });
  if (existing && Date.now() - existing.updatedAt.getTime() < 60000) redirect('/bewertungen?error=wait');
  await prisma.review.upsert({ where: { userId }, create: { userId, rating, title: title || null, body }, update: { rating, title: title || null, body, status: 'PENDING', publishedAt: null, moderationNote: null, moderatedAt: null, moderatedBy: null } });
  revalidatePath('/bewertungen');
  revalidatePath('/');
  redirect('/bewertungen?sent=1');
}

export async function deleteReview() {
  const userId = await currentUser();
  await prisma.review.deleteMany({ where: { userId } });
  revalidatePath('/bewertungen');
  revalidatePath('/');
  redirect('/bewertungen?deleted=1');
}

export async function moderateReview(form: FormData) {
  const userId = await currentUser();
  const admin = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
  if (admin?.role !== 'ADMIN') redirect('/');
  const id = String(form.get('id') ?? '');
  const decision = form.get('decision');
  if (!id || (decision !== 'PUBLISHED' && decision !== 'REJECTED')) return;
  await prisma.review.updateMany({ where: { id, status: 'PENDING' }, data: { status: decision, moderatedBy: userId, moderatedAt: new Date(), publishedAt: decision === 'PUBLISHED' ? new Date() : null } });
  revalidatePath('/bewertungen');
  revalidatePath('/');
  revalidatePath('/admin/bewertungen');
}
