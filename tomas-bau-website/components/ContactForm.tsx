'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

/**
 * Prototype form: composes a pre-filled mail in the visitor's mail client.
 * No backend, no API key, no third-party request — nothing to configure to demo it.
 *
 * ponytail: swap this handler for a POST to /api/kontakt (Resend/Web3Forms)
 * when the site goes live. The markup and validation stay as-is.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '');
    const phone = String(data.get('telefon') ?? '');
    const message = String(data.get('nachricht') ?? '');

    const body = `Name: ${name}\nTelefon: ${phone}\n\n${message}`;
    window.location.href =
      `mailto:${site.email}` +
      `?subject=${encodeURIComponent(`Anfrage von ${name}`)}` +
      `&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-brand-navy">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Ihr Name"
          className="w-full rounded-lg border border-brand-navy/15 bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-brand-navy/60 focus:border-teal focus:ring-2 focus:ring-teal/20"
        />
      </div>

      <div>
        <label htmlFor="telefon" className="mb-1.5 block text-sm font-semibold text-brand-navy">
          Telefonnummer
        </label>
        <input
          id="telefon"
          name="telefon"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+49 …"
          className="w-full rounded-lg border border-brand-navy/15 bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-brand-navy/60 focus:border-teal focus:ring-2 focus:ring-teal/20"
        />
      </div>

      <div>
        <label htmlFor="nachricht" className="mb-1.5 block text-sm font-semibold text-brand-navy">
          Nachricht
        </label>
        <textarea
          id="nachricht"
          name="nachricht"
          rows={5}
          required
          placeholder="Welcher Boden, welche Fläche, welcher Ort?"
          className="w-full resize-y rounded-lg border border-brand-navy/15 bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-brand-navy/60 focus:border-teal focus:ring-2 focus:ring-teal/20"
        />
      </div>

      <button type="submit" className="btn-red w-full">
        E-Mail vorbereiten
      </button>

      <p aria-live="polite" className="min-h-[1.25rem] text-sm text-teal-700">
        {sent ? `Bitte senden Sie die vorbereitete Nachricht in Ihrem E-Mail-Programm ab. Falls es sich nicht öffnet, schreiben Sie direkt an ${site.email}.` : ''}
      </p>

      <p className="text-sm leading-relaxed text-brand-navy/70">Alternativ: <a href={`mailto:${site.email}`} className="underline">{site.email}</a>. Hinweise zum Umgang mit Ihren Daten finden Sie im <a href="/datenschutz" className="underline">Datenschutz</a>.</p>

      <p className="rounded-lg bg-brand-red/5 p-3.5 text-sm font-semibold text-brand-redDark">
        Für Preisanfragen bitte telefonisch kontaktieren:{' '}
        <a href={site.phone.href} className="underline underline-offset-2">
          {site.phone.display}
        </a>
      </p>
    </form>
  );
}
