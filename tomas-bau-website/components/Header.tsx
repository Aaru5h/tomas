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
        scrolled ? 'bg-white shadow-sm' : 'bg-white'
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-screen-2xl items-center gap-4 px-5 sm:gap-6 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center rounded-sm" aria-label={`${site.name} – Startseite`}>
          <Image
            src="/images/logo.png"
            alt={`${site.name} Logo – Bodenleger in Wuppertal`}
            width={1025}
            height={330}
            priority
            sizes="(max-width: 639px) 128px, 144px"
            className="h-auto w-32 sm:w-36"
          />
        </Link>

        <nav aria-label="Hauptnavigation" className="mx-auto hidden xl:block">
          <ul className="flex items-center gap-1 2xl:gap-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={`/${l.href}`}
                  className="inline-flex min-h-11 items-center whitespace-nowrap rounded-md px-2 text-sm font-semibold text-brand-navy/80 transition-colors hover:bg-teal-50 hover:text-teal-700 2xl:px-3"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3 xl:ml-0">
          <div className="hidden items-center gap-1 border-r border-brand-navy/15 pr-3 xl:flex">
          <Link
            href="/login"
            className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-brand-navy/80 transition-colors hover:bg-teal-50 hover:text-teal-700"
          >
            Anmelden
          </Link>
          <Link
            href="/signup"
            className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
          >
            Registrieren
          </Link>
          </div>
          <a
            href={site.phone.href}
            className="btn-red hidden min-h-11 whitespace-nowrap !px-4 !py-3 !text-sm sm:inline-flex"
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
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-brand-navy/15 text-brand-navy transition-colors hover:bg-teal-50 hover:text-teal-700 xl:hidden"
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
        <nav aria-label="Mobile Navigation" className="container-page pb-24 pt-3 md:pb-6">
          <ul className="grid sm:grid-cols-2 sm:gap-x-8">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={`/${l.href}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-brand-navy/10 py-3 text-base font-semibold text-brand-navy transition-colors hover:text-teal-700"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-lg border border-brand-navy/20 px-3 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-stone-50"
            >
              Anmelden
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-lg bg-teal-50 px-3 py-3 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-100"
            >
              Registrieren
            </Link>
            <a
              href={site.phone.href}
              className="btn-red col-span-2 w-full"
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
