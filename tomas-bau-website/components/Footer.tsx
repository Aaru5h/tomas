import Image from 'next/image';
import Link from 'next/link';
import { site, services, navLinks, mapsLink } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white/70">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <Image
            src="/images/logo.png"
            alt={`${site.name} – Bodenleger Wuppertal`}
            width={1025}
            height={330}
            loading="lazy"
            className="h-11 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Bodenbeläge aus einer Hand – Material finden und verlegen. Seit {site.yearsExperience}{' '}
            Jahren in Wuppertal und {site.serviceRadiusKm} km Umgebung.
          </p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-teal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.8 3.8 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.98c-3.14 0-3.51.01-4.75.07-1.15.05-1.77.24-2.18.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.15.24 1.77.4 2.18.22.55.47.94.88 1.35.41.41.8.66 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.15-.05 1.77-.24 2.18-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.15-.24-1.77-.4-2.18a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.75-.07Zm0 3.37a5.49 5.49 0 1 1 0 10.98 5.49 5.49 0 0 1 0-10.98Zm0 9a3.51 3.51 0 1 0 0-7.02 3.51 3.51 0 0 0 0 7.02Zm6.99-9.22a1.28 1.28 0 1 1-2.56 0 1.28 1.28 0 0 1 2.56 0Z" />
            </svg>
            @{site.instagram.handle}
          </a>
        </div>

        <nav aria-label="Footer Navigation">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Navigation</h2>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={`/${l.href}`} className="transition-colors hover:text-teal">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Leistungen">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Leistungen</h2>
          <ul className="space-y-2.5 text-sm">
            {services.filter((service) => ['parkett-verlegen', 'vinylboden-verlegen', 'laminatboden-verlegen', 'bodeninstallation', 'bodenschleifen', 'reinigungsservice'].includes(service.slug)).map((s) => (
              <li key={s.slug}>
                <a href={`/#service-${s.slug}`} className="transition-colors hover:text-teal">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* NAP block — plain crawlable text, identical wording everywhere on the site */}
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Kontakt</h2>
          <address className="space-y-3 text-sm not-italic">
            <p className="font-semibold text-white">{site.name}</p>
            <p>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-teal">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
                <br />
                {site.address.countryName}
              </a>
            </p>
            <p>
              <a href={site.phone.href} className="font-bold text-white transition-colors hover:text-teal">
                {site.phone.display}
              </a>
            </p>
            <p>
              <a href={site.phone.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-teal">
                Nur WhatsApp:<br />{site.phone.whatsappDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-teal">
                {site.email}
              </a>
            </p>
          </address>
          <p className="mt-4 text-sm">
            {site.openingHours.label}
            <br />
            <span className="text-white/70">{site.openingHours.sundayLabel}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Alle Rechte vorbehalten.
          </p>
          <nav aria-label="Rechtliches" className="flex gap-6">
            <Link href="/impressum" className="transition-colors hover:text-teal">
              Impressum
            </Link>
            <Link href="/datenschutz" className="transition-colors hover:text-teal">
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>

      {/* clearance for the fixed mobile call bar */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </footer>
  );
}
