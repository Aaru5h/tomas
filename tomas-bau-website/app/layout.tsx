import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { site, description } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileCallBar from '@/components/MobileCallBar';

const inter = localFont({
  src: './fonts/Inter-latin.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Bodenleger in Wuppertal | Tomas Bau & Sanierung',
    template: '%s | Tomas Bau & Sanierung Wuppertal',
  },
  description,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: site.url,
    siteName: site.name,
    title: 'Bodenleger in Wuppertal | Tomas Bau & Sanierung',
    description,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tomas Bau & Sanierung – Bodenleger in Wuppertal, von alt bis neu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bodenleger Wuppertal | Tomas Bau & Sanierung',
    description,
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Bodenleger',
  icons: {
    icon: [{ url: '/images/icon.png', type: 'image/png' }],
    apple: [{ url: '/images/icon.png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#1A2035',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body>
        <a
          href="#hauptinhalt"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-navy focus:px-5 focus:py-3 focus:text-white"
        >
          Zum Hauptinhalt springen
        </a>
        <Header />
        <main id="hauptinhalt">{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
