import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { moderateReview } from '@/app/bewertungen/actions';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Bewertungen prüfen', robots: { index: false, follow: false } };

export default async function Page() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');
  const admin = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  if (admin?.role !== 'ADMIN') redirect('/');
  const reviews = await prisma.review.findMany({ where: { status: 'PENDING' }, orderBy: { createdAt: 'asc' }, include: { user: { select: { name: true, email: true } } } });
  return <main className="section container-page"><h1 className="h2">Bewertungen prüfen</h1><p className="mt-4 text-brand-navy/70">{reviews.length} Bewertungen warten auf Prüfung. Bitte nach denselben Inhaltsregeln für positive und negative Erfahrungen entscheiden.</p><div className="mt-10 space-y-8">{reviews.map(review => <article key={review.id} className="max-w-3xl border-t border-brand-navy/20 pt-6"><p className="font-semibold">{review.rating} / 5 Sterne · {review.user.name || 'Kunde'} ({review.user.email})</p>{review.title && <h2 className="mt-3 text-xl font-bold">{review.title}</h2>}<p className="mt-3 whitespace-pre-wrap">{review.body}</p><form action={moderateReview} className="mt-5 flex gap-4"><input type="hidden" name="id" value={review.id} /><button name="decision" value="PUBLISHED" className="rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white">Veröffentlichen</button><button name="decision" value="REJECTED" className="rounded-lg border border-red-700 px-5 py-3 font-semibold text-red-700">Ablehnen</button></form></article>)}{reviews.length === 0 && <p>Keine offenen Bewertungen.</p>}</div></main>;
}
