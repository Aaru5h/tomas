'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { site, navLinks } from '@/lib/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1280px)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="shrink-0" aria-label={`${site.name} – Startseite`}>
          <Image
            src="/images/logo.png"
            alt={`${site.name} Logo – Bodenleger in Wuppertal`}
            width={1025}
            height={330}
            priority
            sizes="(max-width: 639px) 125px, 150px"
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden xl:block">
          <ul className="flex items-center gap-5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={`/${l.href}`}
                  className="text-[15px] font-semibold text-brand-navy/80 transition-colors hover:text-teal"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-[15px] font-semibold text-brand-navy/80 transition-colors hover:text-teal"
          >
            Anmelden
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-teal px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-teal-600"
          >
            Registrieren
          </Link>
          <a
            href={site.phone.href}
            className="btn-red !px-5 !py-3 !text-[15px]"
            aria-label={`Jetzt anrufen: ${site.phone.display}`}
          >
            <PhoneIcon />
            <span>{site.phone.display}</span>
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-brand-navy xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M3 12h18" />
                <path d="M3 6h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-black/5 bg-white xl:hidden"
      >
        <nav aria-label="Mobile Navigation" className="container-page pb-24 pt-4 md:pb-4">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={`/${l.href}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-black/5 py-4 text-lg font-semibold text-brand-navy"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block rounded-lg border border-brand-navy py-3 text-center text-lg font-semibold text-brand-navy"
            >
              Anmelden
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-teal py-3 text-center text-lg font-semibold text-white"
            >
              Registrieren
            </Link>
            <a
              href={site.phone.href}
              className="btn-red w-full"
              onClick={() => setOpen(false)}
            >
              <PhoneIcon />
              {site.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1l-2.22 2.2Z" />
    </svg>
  );
}
