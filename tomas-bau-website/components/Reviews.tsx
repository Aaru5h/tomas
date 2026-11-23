import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export async function Reviews({ compact = false }: { compact?: boolean }) {
  const [reviews, aggregate] = await Promise.all([
    prisma.review.findMany({ where: { status: 'PUBLISHED' }, orderBy: { publishedAt: 'desc' }, take: compact ? 3 : 30, select: { id: true, rating: true, title: true, body: true, publishedAt: true, updatedAt: true, user: { select: { name: true } } } }),
    prisma.review.aggregate({ where: { status: 'PUBLISHED' }, _avg: { rating: true }, _count: { rating: true } }),
  ]);
  return <div>
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div><h2 className="h2">Erfahrungen unserer Kunden</h2><p className="mt-3 text-brand-navy/70">Echte Rückmeldungen zu unserer Arbeit.</p></div>
      <Link href="/bewertungen" className="font-semibold text-teal-700 underline underline-offset-4">{compact ? 'Alle Bewertungen ansehen' : 'Bewertung schreiben'}</Link>
    </div>
    {aggregate._count.rating > 0 ? <p className="mt-8 text-lg font-semibold" aria-label={`${aggregate._avg.rating?.toFixed(1)} von 5 Sternen aus ${aggregate._count.rating} Bewertungen`}><span className="text-teal-700">★ {aggregate._avg.rating?.toFixed(1)} / 5</span> <span className="text-sm font-normal text-brand-navy/70">({aggregate._count.rating} Bewertungen)</span></p> : <p className="mt-8 text-brand-navy/70">Noch keine veröffentlichten Bewertungen. Teilen Sie Ihre Erfahrung.</p>}
    <div className="mt-6 grid gap-6 md:grid-cols-3">{reviews.map((review) => <article key={review.id} className="border-t border-brand-navy/20 pt-5">
      <p className="text-lg tracking-wide text-teal-700" aria-label={`${review.rating} von 5 Sternen`}>{'★'.repeat(review.rating)}<span className="text-brand-navy/20">{'★'.repeat(5 - review.rating)}</span></p>
      {review.title && <h3 className="mt-3 text-lg font-bold">{review.title}</h3>}
      <p className="mt-3 whitespace-pre-wrap leading-relaxed text-brand-navy/80">{review.body}</p>
      <p className="mt-4 text-sm text-brand-navy/60">{review.user.name || 'Kunde'} · {review.publishedAt?.toLocaleDateString('de-DE')}</p>
    </article>)}</div>
  </div>;
}
