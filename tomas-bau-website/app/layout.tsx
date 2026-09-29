import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileCallBar from '@/components/MobileCallBar';
import { Analytics } from '@vercel/analytics/next';

const inter = localFont({
  src: './fonts/Inter-latin.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  ...pageMetadata('/'),
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
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
        <Analytics />
      </body>
    </html>
  );
}
