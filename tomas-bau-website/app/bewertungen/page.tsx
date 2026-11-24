import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Reviews } from '@/components/Reviews';
import { deleteReview, saveReview } from './actions';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import DeleteReviewButton from '@/components/DeleteReviewButton';

export const dynamic = 'force-dynamic';
export const metadata = pageMetadata('/bewertungen');

export default async function Page({ searchParams }: { searchParams: { error?: string; sent?: string; deleted?: string } }) {
  const session = await auth();
  const own = session?.user?.id ? await prisma.review.findUnique({ where: { userId: session.user.id } }).catch((error: unknown) => { console.error('Own review unavailable', error); return null; }) : null;
  const notices: Record<string, string> = { invalid: 'Bitte prüfen Sie die Bewertung: 1–5 Sterne und 30–1500 Zeichen Text.', verify: 'Bitte bestätigen Sie zuerst Ihre E-Mail-Adresse.', wait: 'Bitte warten Sie eine Minute, bevor Sie erneut speichern.' };
  return <div className="section container-page"><h1 className="h2">Bewertungen</h1><p className="mt-4 max-w-2xl text-brand-navy/70">Lesen Sie, wie Kunden unsere Arbeit erlebt haben, und teilen Sie Ihre eigene Erfahrung.</p>
    <div className="mt-12"><Reviews /></div>
    <section id="bewertung-schreiben" className="mt-16 max-w-2xl border-t border-brand-navy/20 pt-10" aria-labelledby="review-form-title"><h2 id="review-form-title" className="text-2xl font-bold">Ihre Erfahrung teilen</h2>
      {searchParams.error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-4 text-red-800">{notices[searchParams.error] || 'Die Bewertung konnte nicht gespeichert werden.'}</p>}
      {searchParams.sent && <p role="status" className="mt-5 rounded-lg bg-teal-50 p-4 text-teal-900">Vielen Dank. Ihre Bewertung wird geprüft und erscheint nach der Freigabe.</p>}
      {searchParams.deleted && <p role="status" className="mt-5 rounded-lg bg-teal-50 p-4 text-teal-900">Ihre Bewertung wurde gelöscht.</p>}
      {!session?.user?.id ? <p className="mt-5">Bitte <Link className="font-semibold text-teal-700 underline" href="/login?callbackUrl=%2Fbewertungen%23bewertung-schreiben">melden Sie sich an</Link> oder <Link className="font-semibold text-teal-700 underline" href="/signup">erstellen Sie ein Konto</Link>, um eine Bewertung abzugeben.</p> : <>
        {own && <p className="mt-5 text-sm text-brand-navy/70">Ihre Bewertung: {own.status === 'PUBLISHED' ? 'veröffentlicht' : own.status === 'PENDING' ? 'in Prüfung' : 'nicht veröffentlicht'}. Änderungen werden erneut geprüft.</p>}
        <form action={saveReview} className="mt-6 space-y-5">
          <div><label htmlFor="rating" className="block font-semibold">Bewertung</label><select id="rating" name="rating" required defaultValue={own?.rating ?? ''} className="mt-2 w-full rounded-lg border border-brand-navy/25 bg-white p-3"><option value="" disabled>Sterne wählen</option>{[5,4,3,2,1].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Stern' : 'Sterne'}</option>)}</select></div>
          <div><label htmlFor="title" className="block font-semibold">Titel (optional)</label><input id="title" name="title" maxLength={100} defaultValue={own?.title ?? ''} className="mt-2 w-full rounded-lg border border-brand-navy/25 p-3" /></div>
          <div><label htmlFor="body" className="block font-semibold">Ihre Erfahrung</label><textarea id="body" name="body" minLength={30} maxLength={1500} required rows={6} defaultValue={own?.body ?? ''} className="mt-2 w-full rounded-lg border border-brand-navy/25 p-3" /><p className="mt-1 text-sm text-brand-navy/65">30–1500 Zeichen. Bitte keine persönlichen Daten Dritter eintragen.</p></div>
          <button className="btn-red" type="submit">{own ? 'Bewertung aktualisieren' : 'Bewertung einreichen'}</button>
        </form>
        {own && <form action={deleteReview} className="mt-6"><DeleteReviewButton /></form>}
      </>}
    </section>
  </div>;
}
