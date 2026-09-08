import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Impressum', description: 'Anbieterangaben und Kontakt zu Tomas Bau & Sanierung.',
  alternates: { canonical: '/impressum' }, robots: { index: false, follow: true },
};

export default function Impressum() {
  return <div className="container-page section"><div className="legal-copy max-w-3xl"><Link href="/" className="font-semibold text-teal-700 underline">Zur Startseite</Link><h1 className="h2 mt-8">Impressum</h1><p className="mt-6 rounded-xl bg-stone-100 p-5 font-semibold">Entwurf: Die vollständigen Anbieterangaben müssen vor der Veröffentlichung vom Inhaber ergänzt und geprüft werden.</p><h2>Kontakt</h2><p>{site.name}<br />{site.address.street}<br />{site.address.postalCode} {site.address.city}<br />{site.address.countryName}</p><p>Telefon: <a href={site.phone.href} className="underline">{site.phone.display}</a><br />E-Mail: <a href={`mailto:${site.email}`} className="underline">{site.email}</a></p><h2>Vor Veröffentlichung zu ergänzen</h2><ul className="list-disc space-y-3 pl-5"><li>Vollständiger Name des Inhabers bzw. der vertretungsberechtigten Person und Rechtsform.</li><li>Registerangaben, zuständige Kammer und berufsrechtliche Angaben, soweit zutreffend.</li><li>Umsatzsteuer-Identifikationsnummer bzw. weitere erforderliche Identifikationsangaben, soweit vorhanden.</li><li>Weitere Pflichtangaben entsprechend der tatsächlichen Geschäftstätigkeit.</li></ul></div></div>;
}
