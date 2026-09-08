'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gallery, galleryCategories } from '@/lib/site';

// ponytail: native <dialog> instead of a lightbox dep — it gives focus trap,
// Esc-to-close and inert background for free. Add a lib only if we need
// pinch-zoom or swipe gestures.
export default function Gallery() {
  const [filter, setFilter] = useState<string>('alle');
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const items = filter === 'alle' ? gallery : gallery.filter((g) => g.category === filter);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };

  const close = useCallback(() => {
    dialogRef.current?.close();
    setIndex(null);
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, step]);

  useEffect(() => {
    if (index === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [index]);

  const active = index === null ? null : items[index];

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-start gap-2.5">
        {galleryCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setFilter(c.id);
              setIndex(null);
            }}
            aria-pressed={filter === c.id}
            className={`min-h-11 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors ${
              filter === c.id
                ? 'bg-teal-700 text-white'
                : 'bg-brand-navy/5 text-brand-navy hover:bg-brand-navy/10'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        {items.map((item, i) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block w-full overflow-hidden rounded-xl bg-brand-navy/5"
              aria-label={`Bild vergrößern: ${item.caption}`}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1023px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent p-3 pt-10 text-left">
                <span className="block text-xs font-semibold leading-snug text-white sm:text-sm">
                  {item.caption}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/90"
        aria-label="Bildergalerie"
      >
        {active && (
          <div onClick={(event) => { if (event.target === event.currentTarget) close(); }}
            className="fixed inset-0 flex flex-col items-center justify-center p-4">
            <div className="relative max-h-[78vh] w-auto">
              <Image
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                sizes="90vw"
                className="max-h-[78vh] max-w-[90vw] w-auto rounded-lg object-contain"
              />
            </div>
            <p aria-live="polite" className="mt-4 max-w-xl text-center text-sm text-white sm:text-base">{active.caption}</p>

            <button
              type="button"
              onClick={close}
              aria-label="Schließen"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Vorheriges Bild"
              className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 sm:left-6"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Nächstes Bild"
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 sm:right-6"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
