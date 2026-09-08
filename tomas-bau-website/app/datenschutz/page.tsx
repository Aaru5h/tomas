import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Datenschutz', description: 'Hinweise zu Kontaktaufnahme und Datenschutz bei Tomas Bau & Sanierung.',
  alternates: { canonical: '/datenschutz' }, robots: { index: false, follow: true },
};

export default function Datenschutz() {
  return <div className="container-page section"><div className="legal-copy max-w-3xl"><Link href="/" className="font-semibold text-teal-700 underline">Zur Startseite</Link><h1 className="h2 mt-8">Datenschutz</h1><p className="mt-6 rounded-xl bg-stone-100 p-5 font-semibold">Entwurf: Diese Hinweise beschreiben den aktuellen Prototyp. Die vollständige Datenschutzerklärung muss vor der Veröffentlichung für den tatsächlichen Betrieb ergänzt und geprüft werden.</p><h2>Kontakt</h2><p>{site.name}, {site.address.street}, {site.address.postalCode} {site.address.city}<br /><a className="underline" href={`mailto:${site.email}`}>{site.email}</a></p><p>Die vollständige Identität des Verantwortlichen ist durch den Inhaber zu ergänzen.</p><h2>Kontaktformular und E-Mail</h2><p>Das Formular bereitet aus Ihren Eingaben eine Nachricht in Ihrem E-Mail-Programm vor. Es übermittelt die Anfrage nicht selbst an einen Webserver. Erst wenn Sie die E-Mail absenden, werden Ihre Angaben über Ihren E-Mail-Anbieter an uns übermittelt.</p><h2>Externe Links</h2><p>Die Website verlinkt auf Google Maps, Instagram und WhatsApp. Diese Dienste werden erst aufgerufen, wenn Sie dem jeweiligen Link folgen. Eine Google-Maps-Karte wird auf dieser Website nicht eingebettet.</p><h2>Technischer Betrieb</h2><p>Der aktuelle Quellcode enthält keine Analyse- oder Marketing-Skripte. Beim Abruf einer Website verarbeitet der Hosting-Anbieter technische Verbindungsdaten. Der konkrete Anbieter, die verarbeiteten Daten und die Speicherdauer müssen für den tatsächlichen Betrieb ergänzt werden.</p><h2>Vor Veröffentlichung zu ergänzen</h2><ul className="list-disc space-y-3 pl-5"><li>Vollständige Angaben zum Verantwortlichen und zum Hosting-Anbieter.</li><li>Zwecke, Rechtsgrundlagen, Empfänger und Speicherdauer der Datenverarbeitung.</li><li>Informationen zu Betroffenenrechten und Beschwerdemöglichkeiten.</li><li>Angaben zu den tatsächlich eingesetzten E-Mail- und weiteren Dienstleistern.</li></ul></div></div>;
}
