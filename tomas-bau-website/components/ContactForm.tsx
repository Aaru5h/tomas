'use client';

import { useRef, useState } from 'react';
import { site } from '@/lib/site';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const submitting = useRef(false);
  const submission = useRef<{ body: string; key: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const body = JSON.stringify(Object.fromEntries(data));
    submitting.current = true;
    setStatus('pending');
    setFeedback('Ihre Anfrage wird gesendet …');
    try {
      if (submission.current?.body !== body) submission.current = { body, key: crypto.randomUUID() };
      const response = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': submission.current.key },
        body,
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        throw new Error(typeof result.message === 'string' ? result.message : 'Der Versand ist fehlgeschlagen. Bitte versuchen Sie es erneut.');
      }
      setStatus('success');
      setFeedback(result.message);
      form.reset();
      submission.current = null;
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error && error.name === 'Error' ? error.message : 'Der Versand konnte nicht bestätigt werden. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.');
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form onSubmit={onSubmit} aria-busy={status === 'pending'} className="space-y-4">
      <fieldset disabled={status === 'pending'} className="space-y-4 disabled:opacity-70">
      <div hidden aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
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
          minLength={2}
          maxLength={100}
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
          minLength={6}
          maxLength={40}
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
          minLength={10}
          maxLength={5000}
          required
          placeholder="Welcher Boden, welche Fläche, welcher Ort?"
          className="w-full resize-y rounded-lg border border-brand-navy/15 bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-brand-navy/60 focus:border-teal focus:ring-2 focus:ring-teal/20"
        />
      </div>

      <button type="submit" className="btn-red w-full disabled:cursor-wait">
        {status === 'pending' ? 'Wird gesendet …' : 'Anfrage senden'}
      </button>
      </fieldset>

      <p role="status" aria-live="polite" className={`min-h-[1.25rem] text-sm ${status === 'error' ? 'text-brand-redDark' : 'text-teal-700'}`}>
        {feedback}
      </p>
      <noscript><p>Zum Senden über das Formular benötigen Sie JavaScript. Bitte kontaktieren Sie uns per E-Mail oder Telefon.</p></noscript>

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
