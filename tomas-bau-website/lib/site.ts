/**
 * Single source of truth for NAP (Name/Address/Phone), services and gallery.
 * Everything on the page and in the JSON-LD reads from here, so the structured
 * data can never drift out of sync with the visible text — which is exactly
 * what Google checks for local businesses.
 */

export const site = {
  name: 'Tomas Bau & Sanierung',
  legalName: 'Tomas Bau & Sanierung',
  // Change here (or set NEXT_PUBLIC_SITE_URL) when the real domain goes live.
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tomasbau.de').origin,
  tagline: 'Ihr Bodenbelag-Experte in Wuppertal',
  yearsExperience: 7,

  phone: {
    display: '+49 159 01039781',
    href: 'tel:+4915901039781',
    e164: '+4915901039781',
    whatsapp: 'https://wa.me/4915901039781',
  },
  email: 'bautomas23@gmail.com',

  address: {
    street: 'Werth 22',
    postalCode: '42275',
    city: 'Wuppertal',
    region: 'Nordrhein-Westfalen',
    country: 'DE',
    countryName: 'Deutschland',
  },
  geo: { lat: 51.2735, lng: 7.1668 },

  openingHours: {
    label: 'Montag – Samstag: 07:00 – 18:00 Uhr',
    sundayLabel: 'Sonntag: geschlossen',
    schema: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '18:00',
      },
    ],
  },

  instagram: {
    handle: 'tomasbau.de',
    url: 'https://www.instagram.com/tomasbau.de/',
  },

  serviceRadiusKm: 150,
} as const;

export const mapsLink =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(`${site.address.street}, ${site.address.postalCode} ${site.address.city}`);

/** Keyless Google Maps embed — no API key, no billing account required. */
export const mapsEmbed =
  'https://maps.google.com/maps?q=' +
  encodeURIComponent(`${site.address.street}, ${site.address.postalCode} ${site.address.city}`) +
  '&t=&z=12&ie=UTF8&iwloc=&output=embed';

export type Service = {
  slug: string;
  title: string;
  short: string;
  body: string;
  icon: string;
};

export const services: Service[] = [
  {
    slug: 'laminatboden-verlegen',
    title: 'Laminatboden verlegen',
    short: 'Robust, pflegeleicht und schnell verlegt.',
    body: 'Laminat in jeder Optik – von der klassischen Diele bis zum Fischgrätmuster. Wir arbeiten millimetergenau mit Kreuzlinienlaser, damit jede Fuge sitzt.',
    icon: 'planks',
  },
  {
    slug: 'vinylboden-verlegen',
    title: 'Vinylboden verlegen',
    short: 'Wasserfest, leise und ideal für Küche und Bad.',
    body: 'Klick-Vinyl und vollflächig verklebtes Designvinyl. Warm unter den Füßen, strapazierfähig und perfekt für Räume mit hoher Feuchtigkeit.',
    icon: 'droplet',
  },
  {
    slug: 'parkett-verlegen',
    title: 'Parkett verlegen',
    short: 'Echtholz, das Generationen überdauert.',
    body: 'Massiv- und Mehrschichtparkett in Fischgrät, Chevron, Schiffsboden oder Mosaik. Verklebt oder schwimmend verlegt – handwerklich sauber ausgeführt.',
    icon: 'herringbone',
  },
  {
    slug: 'sonstige-bodenbelaege',
    title: 'Sonstige Bodenbeläge',
    short: 'Teppich, Linoleum, Kork und mehr.',
    body: 'Sie haben einen besonderen Belag im Blick? Wir verlegen auch Teppichboden, Linoleum, Kork und Designbeläge fachgerecht und sauber.',
    icon: 'layers',
  },
  {
    slug: 'bodeninstallation',
    title: 'Bodeninstallation',
    short: 'Material finden und verlegen – alles aus einer Hand.',
    body: 'Wir beschaffen den passenden Bodenbelag für Ihr Budget und verlegen ihn direkt. Sie müssen sich um nichts kümmern – ein Ansprechpartner von der Auswahl bis zur letzten Leiste.',
    icon: 'package',
  },
  {
    slug: 'alten-boden-entfernen',
    title: 'Alten Boden entfernen',
    short: 'Rückbau inklusive Entsorgung.',
    body: 'Alter Teppich, Fliesen, PVC oder Parkett muss raus? Wir demontieren rückstandsfrei, entfernen Kleberreste und entsorgen fachgerecht.',
    icon: 'trash',
  },
  {
    slug: 'untergrundvorbereitung-nivellierung',
    title: 'Untergrundvorbereitung & Nivellierung',
    short: 'Der ebene Untergrund entscheidet über das Ergebnis.',
    body: 'Spachteln, Grundieren und Nivellieren mit Ausgleichsmasse. Ein perfekt vorbereiteter Estrich ist die Voraussetzung dafür, dass Ihr neuer Boden dauerhaft hält.',
    icon: 'level',
  },
  {
    slug: 'reparatur-restaurierung',
    title: 'Reparatur & Restaurierung',
    short: 'Schäden beheben statt komplett erneuern.',
    body: 'Einzelne Dielen tauschen, Wasserschäden ausbessern, Knarren und Fugen beseitigen. Oft günstiger und nachhaltiger als ein kompletter Neubelag.',
    icon: 'wrench',
  },
  {
    slug: 'bodenschleifen',
    title: 'Bodenschleifen',
    short: 'Altes Parkett wird wieder wie neu.',
    body: 'Professionelles Abschleifen von Parkett und Dielen mit staubarmen Maschinen, anschließend Versiegeln oder Ölen. Aus einem stumpfen Altboden wird ein Schmuckstück.',
    icon: 'sander',
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: 'vorher-nachher' | 'fertige-raeume' | 'in-arbeit';
  width: number;
  height: number;
};

export const gallery: GalleryItem[] = [
  {
    src: '/images/mosaikparkett-versiegelt.jpg',
    alt: 'Frisch geschliffenes und versiegeltes Mosaikparkett aus Eiche in einem Dachgeschosszimmer in Wuppertal',
    caption: 'Mosaikparkett – nach dem Schleifen und Versiegeln',
    category: 'vorher-nachher',
    width: 1200,
    height: 1600,
  },
  {
    src: '/images/mosaikparkett-geschliffen.jpg',
    alt: 'Mosaikparkett aus Eiche direkt nach dem Abschleifen, noch unbehandelt und roh',
    caption: 'Dasselbe Parkett – direkt nach dem Abschliff',
    category: 'vorher-nachher',
    width: 1200,
    height: 1600,
  },
  {
    src: '/images/fischgraet-parkett-detail.jpg',
    alt: 'Detailaufnahme eines fertig verlegten Fischgrätparketts aus Eiche mit rustikaler Maserung',
    caption: 'Fischgrätparkett Eiche rustikal – Detail',
    category: 'fertige-raeume',
    width: 1200,
    height: 1600,
  },
  {
    src: '/images/fischgraet-verlegung-kleber.jpg',
    alt: 'Fischgrätparkett wird auf frisch aufgetragenem Parkettkleber verlegt, Dehnungsfuge mit Keilen gesichert',
    caption: 'Fischgrät vollflächig verklebt – in Arbeit',
    category: 'in-arbeit',
    width: 1200,
    height: 1600,
  },
  {
    src: '/images/chevron-parkett-verlegung.jpg',
    alt: 'Chevron-Parkett aus heller Eiche wird in einem Neubau in Wuppertal verlegt',
    caption: 'Chevron-Parkett im Neubau',
    category: 'in-arbeit',
    width: 739,
    height: 1018,
  },
  {
    src: '/images/fischgraet-laminat-verlegen-laser.jpg',
    alt: 'Vorbereitung zur Verlegung von Fischgrät-Laminat mit Kreuzlinienlaser und Krono Original Paketen',
    caption: 'Fischgrät-Laminat – Einmessen mit Kreuzlinienlaser',
    category: 'in-arbeit',
    width: 740,
    height: 1297,
  },
  {
    src: '/images/dielen-verlegen-schlagklotz.jpg',
    alt: 'Eichendielen werden mit Schlagklotz und Gummihammer auf Trittschalldämmung verlegt',
    caption: 'Eichendielen auf Trittschalldämmung',
    category: 'in-arbeit',
    width: 900,
    height: 1600,
  },
  {
    src: '/images/teppichboden-entfernen.jpg',
    alt: 'Alter grüner Teppichboden wird in einer Gewerbefläche herausgerissen und zur Entsorgung gestapelt',
    caption: 'Teppichboden-Rückbau im Gewerbeobjekt',
    category: 'in-arbeit',
    width: 1200,
    height: 1600,
  },
  {
    src: '/images/nivellierung-ausgleichsmasse.jpg',
    alt: 'Selbstverlaufende Ausgleichsmasse wird mit einer Stachelwalze auf dem Estrich verteilt',
    caption: 'Nivellieren mit Ausgleichsmasse',
    category: 'in-arbeit',
    width: 1200,
    height: 1600,
  },
  {
    src: '/images/estrich-untergrund-fertig.jpg',
    alt: 'Fertig nivellierter, ebener Estrich in einem Altbaubüro, bereit für den neuen Bodenbelag',
    caption: 'Untergrund fertig – bereit für den neuen Belag',
    category: 'fertige-raeume',
    width: 1200,
    height: 1600,
  },
];

export const galleryCategories = [
  { id: 'alle', label: 'Alle Projekte' },
  { id: 'vorher-nachher', label: 'Vorher / Nachher' },
  { id: 'fertige-raeume', label: 'Fertige Räume' },
  { id: 'in-arbeit', label: 'In Arbeit' },
] as const;

/** Cities inside the 150 km service radius — plain crawlable text for local SEO. */
export const serviceAreas = [
  'Wuppertal',
  'Solingen',
  'Remscheid',
  'Düsseldorf',
  'Köln',
  'Essen',
  'Dortmund',
  'Bochum',
  'Duisburg',
  'Hagen',
  'Mönchengladbach',
  'Krefeld',
  'Leverkusen',
  'Bonn',
  'Gelsenkirchen',
  'Oberhausen',
  'Mülheim an der Ruhr',
  'Velbert',
  'Hilden',
  'Ratingen',
  'Neuss',
  'Bergisch Gladbach',
  'Witten',
  'Herne',
  'Münster',
  'Aachen',
];

export const description =
  'Bodenleger in Wuppertal: Parkett, Vinyl und Laminat verlegen, Böden schleifen und sanieren. Material und Verlegung aus einer Hand. Jetzt Projekt besprechen.';

export const faqs = [
  { question: 'Was kostet das Verlegen von Laminat, Vinyl oder Parkett?', answer: `Preise und Installationstermine besprechen wir telefonisch, weil jeder Untergrund und jeder Raum anders ist. Rufen Sie uns unter ${site.phone.display} an – die Beratung ist kostenlos und unverbindlich.` },
  { question: 'In welchem Umkreis arbeitet Tomas Bau & Sanierung?', answer: `Wir arbeiten von Wuppertal aus in einem Umkreis von rund ${site.serviceRadiusKm} km. Dazu gehören unter anderem Düsseldorf, Köln, Essen, Dortmund, Bochum, Duisburg, Solingen und Remscheid.` },
  { question: 'Besorgen Sie auch das Material für den Bodenbelag?', answer: 'Ja. Wir finden den passenden Bodenbelag für Ihr Budget und verlegen ihn direkt – Material und Verlegung aus einer Hand, ein Ansprechpartner für das gesamte Projekt.' },
  { question: 'Kann altes Parkett abgeschliffen statt ersetzt werden?', answer: 'Das hängt vom Zustand und der verbleibenden Nutzschicht ab. Wenn der Boden dafür geeignet ist, schleifen wir Parkett und Dielen staubarm ab und versiegeln oder ölen sie neu. Gerne besprechen wir, ob eine Restaurierung für Ihren Boden infrage kommt.' },
];

export const navLinks = [
  { href: '#leistungen', label: 'Leistungen' },
  { href: '#ueber-uns', label: 'Über uns' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#einsatzgebiet', label: 'Einsatzgebiet' },
  { href: '#faq', label: 'Fragen & Antworten' },
  { href: '#kontakt', label: 'Kontakt' },
];
