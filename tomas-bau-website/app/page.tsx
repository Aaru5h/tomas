import Image from 'next/image';
import Gallery from '@/components/Gallery';
import ContactForm from '@/components/ContactForm';
import StructuredData from '@/components/StructuredData';
import { site, services, serviceAreas, faqs, mapsLink } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-photo">
          <Image src="/images/mosaikparkett-fertiger-raum.jpg" alt="Mosaikparkett in einem hellen Raum – ein Projekt von Tomas Bau & Sanierung" fill priority sizes="(max-width: 767px) 100vw, 60vw" className="object-cover object-[center_65%]" />
        </div>
        <div className="hero-shade" />
        <div className="container-page relative z-10">
          <div className="hero-copy">
            <h1 id="hero-title">Ihr Bodenbelag-Experte in <span className="text-teal-400">Wuppertal.</span></h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/80">Ein neuer Boden. Ein neues Raumgefühl. Wir verlegen Parkett, Vinyl und Laminat – und geben alten Holzböden ihren Charakter zurück.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={site.phone.href} className="btn-red">Jetzt anrufen <Arrow /></a>
              <a href="#kontakt" className="btn-outline">Kostenlos anfragen</a>
            </div>
            <p className="mt-7 text-sm text-white/75">Wuppertal & {site.serviceRadiusKm} km Umgebung · {site.yearsExperience} Jahre Erfahrung</p>
          </div>
          <a href="#galerie" className="hero-caption">Einblick in unsere Arbeit <Arrow /><span>Mosaikparkett · fertige Bodenfläche</span></a>
        </div>
      </section>

      <div className="border-b border-brand-navy/10 bg-stone-50">
        <ul className="container-page flex flex-col gap-3 py-6 text-sm font-semibold sm:flex-row sm:justify-between sm:gap-6">
          {['Material finden & fachgerecht verlegen', 'Parkett, Vinyl, Laminat & mehr', 'Persönliche Beratung am Telefon'].map((text) => <li key={text} className="flex items-center gap-3"><Check />{text}</li>)}
        </ul>
      </div>

      <section id="leistungen" className="section">
        <div className="container-page">
          <div className="section-heading"><h2 className="h2">Der passende Boden.<br /><span className="text-teal-700">Das richtige Handwerk.</span></h2><p>Verlegen, schleifen und reinigen: unsere Leistungen für Ihre Böden und Räume in Wuppertal und Umgebung.</p></div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[{ slug: 'parkett-verlegen', image: 'fischgraet-parkett-detail.jpg', alt: 'Fischgrätparkett aus Eiche mit natürlicher Maserung' }, { slug: 'vinylboden-verlegen', image: 'nivellierung-ausgleichsmasse.jpg', alt: 'Ausgleichsmasse wird mit einer Stachelwalze verteilt – Untergrundvorbereitung für die Bodenverlegung' }, { slug: 'laminatboden-verlegen', image: 'fischgraet-laminat-verlegen-laser.jpg', alt: 'Fischgrät-Laminat wird mit einem Kreuzlinienlaser eingemessen' }].map(({ slug, image, alt }) => {
              const service = services.find((item) => item.slug === slug)!;
              return <article key={slug} id={`service-${slug}`} className="service-feature">
                {image ? <div className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src={`/images/${image}`} alt={alt!} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover" /></div> : <div className="vinyl-panel"><span>Vinylboden</span><p>{service.short}</p><a href="#kontakt" className="inline-flex items-center gap-3 text-sm font-semibold underline underline-offset-4">Projekt besprechen <Arrow /></a></div>}
                <h3 className="mt-6 text-xl font-bold">{service.title}</h3><p className="mt-3 text-base leading-relaxed text-brand-navy/75">{service.body}</p>
              </article>;
            })}
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {['bodenschleifen', 'reinigungsservice'].map((slug) => {
              const service = services.find((item) => item.slug === slug)!;
              return <article key={slug} id={`service-${slug}`} className="border-t border-brand-navy/15 pt-7"><h3 className="text-xl font-bold">{service.title}</h3><p className="mt-3 max-w-prose leading-relaxed text-brand-navy/75">{service.body}</p><a href="#kontakt" className="mt-5 inline-flex items-center gap-3 font-semibold text-teal-700 underline underline-offset-4">{slug === 'bodenschleifen' ? 'Bodenschleifen anfragen' : 'Reinigung anfragen'} <Arrow /></a></article>;
            })}
          </div>
          <div className="mt-14 grid border-t border-brand-navy/15 md:grid-cols-2 md:gap-x-12">
            {services.filter((s) => !['parkett-verlegen', 'vinylboden-verlegen', 'laminatboden-verlegen', 'bodenschleifen', 'reinigungsservice'].includes(s.slug)).map((service) => <details id={`service-${service.slug}`} key={service.slug} className="service-detail"><summary>{service.title}<span className="detail-plus" aria-hidden="true">+</span></summary><p>{service.body}</p></details>)}
          </div>
          <p className="mt-8 text-sm font-semibold">Preise und Installation nur telefonisch: <a className="text-teal-700 underline underline-offset-4" href={site.phone.href}>{site.phone.display}</a></p>
        </div>
      </section>

      <section id="ueber-uns" className="section bg-stone-100">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div><h2 className="h2">Gute Böden beginnen<br />mit Erfahrung.</h2><p className="mt-6 text-lg leading-relaxed text-brand-navy/75">Seit {site.yearsExperience} Jahren dreht sich bei {site.name} alles um den Boden unter Ihren Füßen.</p><p className="mt-4 leading-relaxed text-brand-navy/75">Material finden und verlegen: Wir begleiten Ihr Projekt von der Auswahl des passenden Belags über die Untergrundvorbereitung bis zur fertigen Oberfläche. Ein Ansprechpartner, alle Arbeitsschritte. Wir bieten handwerkliche Arbeit und Hilfe bei der Materialsuche – keinen Produktverkauf und keinen Showroom.</p><p className="mt-4 leading-relaxed text-brand-navy/75">Nicht jeder Boden muss neu. Bei diesem Mosaikparkett zeigen der Abschliff und die anschließende Versiegelung, was im vorhandenen Holz steckt.</p><a href="#kontakt" className="mt-7 inline-flex items-center gap-3 font-bold text-teal-700 underline underline-offset-4">Über Ihren Boden sprechen <Arrow /></a></div>
          <div><div className="grid grid-cols-2 gap-3">
            {[{ src: 'mosaikparkett-geschliffen.jpg', label: 'Nach dem Abschliff', alt: 'Dasselbe Mosaikparkett nach dem Schleifen, vor der Oberflächenbehandlung' }, { src: 'mosaikparkett-versiegelt.jpg', label: 'Nach der Versiegelung', alt: 'Dasselbe Mosaikparkett nach der Versiegelung mit sichtbarer Eichenmaserung' }].map((item) => <figure key={item.src}><div className="relative aspect-[3/4] overflow-hidden rounded-xl"><Image src={`/images/${item.src}`} alt={item.alt} fill sizes="(max-width: 1023px) 45vw, 25vw" className="object-cover" /></div><figcaption className="mt-3 text-sm font-semibold">{item.label}</figcaption></figure>)}
          </div><p className="mt-5 text-sm text-brand-navy/65">Ein Raum, zwei Arbeitsschritte. Eigene Projektaufnahmen.</p></div>
        </div>
      </section>

      <section className="section" aria-labelledby="precision-title"><div className="container-page grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"><div><h2 id="precision-title" className="h2">Präzision bis<br />ins Detail.</h2><p className="mt-6 leading-relaxed text-brand-navy/75">An Heizungsrohren und Ecken kommt es auf den passenden Zuschnitt an. Diese Aufnahmen zeigen, wie wir die Diele vorbereiten und rund um das Rohr einpassen.</p></div><div className="grid grid-cols-2 gap-3">{[{ src: 'parkett-rohr-zuschnitt.jpg', label: 'Passgenau zugeschnitten', alt: 'Parkettdielen mit vorbereiteten Aussparungen für das Heizungsrohr' }, { src: 'parkett-rohr-anschluss.jpg', label: 'Rund um das Rohr eingepasst', alt: 'Verlegte Parkettdiele mit passgenauer Aussparung am Heizungsrohr' }].map((item) => <figure key={item.src}><div className="relative aspect-[3/4] overflow-hidden rounded-xl"><Image src={`/images/${item.src}`} alt={item.alt} fill sizes="(max-width: 1023px) 45vw, 30vw" className="object-cover" /></div><figcaption className="mt-3 text-sm font-semibold">{item.label}</figcaption></figure>)}</div></div></section>

      <section id="galerie" className="section"><div className="container-page"><div className="section-heading"><h2 className="h2">Handwerk, das<br />man sehen kann.</h2><p>Fertige Böden und ein Blick auf die Arbeit dahinter. Entdecken Sie unsere Projekte im Detail.</p></div><div className="mt-10"><Gallery /></div></div></section>

      <section id="einsatzgebiet" className="section bg-brand-navy text-white"><div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20"><div><h2 className="h2">In Wuppertal zu Hause.<br /><span className="text-teal-400">In der Region für Sie da.</span></h2><p className="mt-6 max-w-lg leading-relaxed text-white/75">Wir arbeiten in einem Umkreis von rund {site.serviceRadiusKm} km – im Bergischen Land, im Rheinland und im Ruhrgebiet. Rufen Sie uns an, um Ihr Projekt und die Anfahrt zu besprechen.</p><a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn-outline mt-8">Standort in Google Maps öffnen <Arrow /></a><p className="mt-4 text-sm text-white/70">{site.address.street} · {site.address.postalCode} {site.address.city}<br />Kein Showroom · Bitte kontaktieren Sie uns vorab.</p></div><div><h3 className="mb-6 text-lg font-bold">Unser Einsatzgebiet</h3><ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/80">{serviceAreas.map((city) => <li key={city} className="border-b border-white/10 pb-2">{city}</li>)}</ul></div></div></section>

      <section id="faq" className="section"><div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"><div><h2 className="h2">Fragen vor dem<br />ersten Schritt?</h2><p className="mt-5 leading-relaxed text-brand-navy/70">Hier finden Sie Antworten zu Material, Verlegung, Reinigung und unserem Einsatzgebiet.</p></div><div className="border-t border-brand-navy/15">{faqs.map((faq) => <details key={faq.question} className="service-detail"><summary>{faq.question}<span className="detail-plus" aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>

      <section id="kontakt" className="section bg-stone-100"><div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20"><div><h2 className="h2">Was haben Sie<br />mit Ihrem Boden vor?</h2><p className="mt-6 max-w-md text-lg leading-relaxed text-brand-navy/75">Neuverlegung, Bodenschleifen, Reinigung oder eine erste Frage: Erzählen Sie uns von Ihrem Projekt.</p><a className="mt-8 inline-block text-2xl font-bold tracking-tight text-teal-700 sm:text-3xl" href={site.phone.href}>{site.phone.display}</a><p className="mt-4"><a href={site.phone.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex flex-wrap gap-x-2 font-semibold text-teal-700 underline underline-offset-4"><span>Nur WhatsApp:</span><span>{site.phone.whatsappDisplay}</span></a></p><p className="mt-3 text-sm text-brand-navy/70">{site.openingHours.label}<br />{site.openingHours.sundayLabel}</p><address className="mt-8 space-y-3 not-italic"><p><a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></p><p>{site.name}<br /><a className="underline underline-offset-4" href={mapsLink} target="_blank" rel="noopener noreferrer">{site.address.street}, {site.address.postalCode} {site.address.city}</a></p></address></div><div className="rounded-xl bg-white p-6 sm:p-9"><h3 className="text-xl font-bold">Ihr Projekt kurz beschrieben</h3><p className="mb-6 mt-2 text-sm leading-relaxed text-brand-navy/70">Das Formular bereitet eine E-Mail vor. Sie senden sie anschließend in Ihrem E-Mail-Programm ab.</p><ContactForm /></div></div></section>
    </>
  );
}

function Arrow() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>; }
function Check() { return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-teal-700" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>; }
