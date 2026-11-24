import type { Metadata } from 'next';
import { site, description } from '@/lib/site';

export const publicPages = {
  '/': { title: 'Bodenleger in Wuppertal | Tomas Bau & Sanierung', description },
  '/bewertungen': { title: 'Bewertungen | Tomas Bau & Sanierung', description: 'Erfahrungen unserer Kunden und Ihre Bewertung zu Tomas Bau & Sanierung.' },
  '/impressum': {
    title: 'Impressum | Tomas Bau & Sanierung Wuppertal',
    description: 'Anbieterangaben und Kontakt zu Tomas Bau & Sanierung in Wuppertal: Anschrift, Telefonnummer und E-Mail-Adresse.',
  },
  '/datenschutz': {
    title: 'Datenschutz | Tomas Bau & Sanierung Wuppertal',
    description: 'Hinweise zum Datenschutz bei Tomas Bau & Sanierung in Wuppertal: Kontaktaufnahme, Kontaktformular und externe Links.',
  },
  '/login': {
    title: 'Anmelden | Tomas Bau & Sanierung Wuppertal',
    description: 'Melden Sie sich bei Tomas Bau & Sanierung mit Ihrem bestehenden Konto an. Hier gelangen Sie zur Anmeldung und zur Registrierung.',
  },
  '/signup': {
    title: 'Registrieren | Tomas Bau & Sanierung Wuppertal',
    description: 'Erstellen Sie ein Konto bei Tomas Bau & Sanierung. Sie haben bereits ein Konto? Wechseln Sie direkt zur Anmeldung.',
  },
} as const;

export function pageMetadata(path: keyof typeof publicPages): Metadata {
  const { title, description } = publicPages[path];
  const url = `${site.url}${path}`;
  const image = {
    url: `${site.url}/images/og-image.jpg`, width: 1200, height: 630,
    alt: `${site.name} – Bodenleger in Wuppertal`,
  };
  return {
    // Every URL is absolute. A metadataBase makes Next 14 strip the root slash.
    metadataBase: null,
    title: { absolute: title }, description,
    alternates: { canonical: url },
    robots: path === '/impressum' || path === '/datenschutz' || path === '/login' || path === '/signup'
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    openGraph: { type: 'website', locale: 'de_DE', url, siteName: site.name, title, description, images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
