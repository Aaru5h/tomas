# Tomas Bau & Sanierung — Website

> **Moderne, hochperformante Webpräsenz für Tomas Bau & Sanierung** — Meisterhafte Bodenbelagsarbeiten, Parkettsanierung und Untergrundvorbereitung in Wuppertal und ganz Nordrhein-Westfalen (150 km Einsatzradius).

![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![React 18](https://img.shields.io/badge/React-18.3-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![SEO Ready](https://img.shields.io/badge/Local_SEO-Schema.org_JSON--LD-success?style=flat-square)

---

## 📌 Inhaltsverzeichnis

- [Über das Projekt](#-über-das-projekt)
- [Hauptfunktionen](#-hauptfunktionen)
- [Technologie-Stack](#-technologie-stack)
- [Projektstruktur](#-projektstruktur)
- [Erste Schritte & Befehle](#-erste-schritte--befehle)
- [Konfiguration & Single Source of Truth (`lib/site.ts`)](#-konfiguration--single-source-of-truth-libsitets)
- [SEO & Strukturierte Daten](#-seo--strukturierte-daten)
- [Datenschutz & Barrierefreiheit](#-datenschutz--barrierefreiheit)
- [Checkliste vor dem Go-Live](#-checkliste-vor-dem-go-live)

---

## 🏢 Über das Projekt

Dieses Verzeichnis enthält den vollständigen Next.js 14 App Router Quellcode für **Tomas Bau & Sanierung** (Werth 22, 42275 Wuppertal).

Das Handwerksunternehmen bietet fachgerechte Bodenverlegung (Laminat, Vinyl, Parkett, Designböden), staubarmes Parkettschleifen, Estrichnivellierung sowie den kompletten Rückbau von Altbelägen inklusive Materialbeschaffung aus einer Hand.

Die Website wurde mit Fokus auf maximale Geschwindigkeit, hervorragende mobile Konversionen und kompromisslose lokale Suchmaschinenoptimierung (Local SEO) für Wuppertal und das Ruhrgebiet/Rheinland entwickelt.

---

## ✨ Hauptfunktionen

- **⚡ Server Components (Next.js 14 App Router):** Vollständiges Server-Rendering aller Inhalte für ultraschnelle Ladezeiten und optimale Auffindbarkeit.
- **📱 Mobile-First Konvertierung:** 
  - Feste Kontaktleiste (`MobileCallBar`) mit Direktwahl und WhatsApp-Schnellkontakt auf Smartphones.
  - Vollständig responsives Layout getestet auf Geräten von 320 px bis 4K-Monitoren.
- **🖼️ Interaktive Projektgalerie mit echtem Bildmaterial:**
  - Kategoriefilter (*Vorher/Nachher*, *Fertige Räume*, *In Arbeit*).
  - Zugänglicher nativer Lightbox-Dialog mit Tastaturbedienung (Pfeiltasten, Escape) und Gesten-/Hintergrund-Schließen.
- **🛠️ Vollständiges Leistungsspektrum (9 Leistungsbereiche):**
  - Hervorgehobene Kernleistungen sowie aufklappbare Detailbeschreibungen mit Anker-Direktverlinkung (`#service-{slug}`).
- **📍 Lokale SEO-Präsenz & Einsatzgebiet:**
  - 26 indexierbare Städte im 150-km-Umkreis (Düsseldorf, Köln, Essen, Dortmund, Solingen, Remscheid etc.).
- **📋 Transparenter FAQ-Bereich:**
  - Häufige Kundenfragen zu Kosten, Materialbeschaffung, Sanierungsfähigkeit und Umkreis.
- **✉️ Barrierefreies Kontaktformular:**
  - Bereitet eine strukturierte E-Mail-Anfrage (`mailto:`) vor, ohne dass sensible Kundendaten über externe Drittanbieter-Server geleitet werden müssen.
- **🔒 Datenschutzkonform (DSGVO):**
  - Selbstgehostete Schriftarten (Inter Variable WOFF2, kein Google Fonts CDN).
  - Keine Tracking-Cookies oder Drittanbieter-Tracker.
  - Datenschutzfreundliche externe Verlinkung zu Google Maps ohne Remote-Iframe-Tracking.

---

## 🛠️ Technologie-Stack

| Bereich | Technologie | Beschreibung |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14.2](https://nextjs.org/) | App Router, Server Components, Metadata API |
| **UI-Bibliothek** | [React 18.3](https://react.dev/) | Moderne funktionale Komponenten & Hooks |
| **Sprache** | [TypeScript 5.5](https://www.typescriptlang.org/) | Durchgängige Typsicherheit für Inhalte & Konfigurationen |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) | Utility-First CSS mit maßgeschneiderter Markenfarbpalette |
| **Icons & Media** | SVG & Next/Image | Optimierte WebP/JPEG-Bilder mit Prioritäts- und Lazy-Loading |
| **Typografie** | Inter Variable | 100 % lokal gehostet unter `app/fonts/` (OFL Lizenz) |

---

## 📂 Projektstruktur

```text
tomas-bau-website/
├── app/                        # Next.js App Router
│   ├── datenschutz/            # Datenschutzerklärung (DSGVO-Entwurf)
│   ├── fonts/                  # Selbstgehostete Inter Variable WOFF2 Font
│   ├── impressum/              # Impressum (Rechtlicher Entwurf)
│   ├── globals.css             # Globale Styles & Tailwind Direktiven
│   ├── layout.tsx              # Root Layout mit Metadaten & Schriftart-Definition
│   ├── page.tsx                # Startseite (Hero, Leistungen, Galerie, FAQ, Kontakt)
│   ├── robots.ts               # Dynamische robots.txt Generierung
│   └── sitemap.ts              # Dynamische sitemap.xml Generierung
├── components/                 # Wiederverwendbare UI-Komponenten
│   ├── ContactForm.tsx         # Kunden-Kontaktformular
│   ├── Footer.tsx              # Seitenfuß mit NAP-Daten & Rechtslinks
│   ├── Gallery.tsx             # Projektgalerie mit Filter & nativer Lightbox
│   ├── Header.tsx              # Header mit Navigation & Notfall-Telefonnummer
│   ├── MobileCallBar.tsx       # Fixierte mobile Anruf- & WhatsApp-Leiste
│   └── StructuredData.tsx      # Schema.org JSON-LD Script Injection
├── lib/
│   └── site.ts                 # Zentrale Single-Source-of-Truth für Inhalte & Metadaten
├── public/
│   └── images/                 # Optimierte Fotos für Hero, Galerie & Vorher-Nachher
├── package.json                # Abhängigkeiten & Scripts
├── tailwind.config.ts          # Tailwind CSS Konfiguration
├── tsconfig.json               # TypeScript Konfiguration
└── README.md                   # Diese Dokumentation
```

---

## 🚀 Erste Schritte & Befehle

### Voraussetzungen

- **Node.js**: Version 18.17 oder höher
- **npm**: Version 9 oder höher (oder pnpm / yarn)

### Verfügbare Scripts

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Entwicklungsserver starten (auf http://localhost:3000)
npm run dev

# 3. Produktions-Build erstellen (inkl. TypeScript- & Type-Checks)
npm run build

# 4. Produktions-Server starten
npm run start

# 5. Linter ausführen
npm run lint
```

---

## ⚙️ Konfiguration & Single Source of Truth (`lib/site.ts`)

Sämtliche Unternehmensdaten, Kontaktdaten, Öffnungszeiten, Leistungen und Galerie-Einträge werden zentral in [`lib/site.ts`](file:///Users/aarushgupta/Desktop/Albin%20/tomas-bau-website/lib/site.ts) gepflegt:

```typescript
export const site = {
  name: 'Tomas Bau & Sanierung',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tomasbau.de',
  tagline: 'Ihr Bodenbelag-Experte in Wuppertal',
  yearsExperience: 7,
  phone: {
    display: '+49 159 01039781',
    href: 'tel:+4915901039781',
    whatsapp: 'https://wa.me/4915901039781',
  },
  email: 'bautomas23@gmail.com',
  address: {
    street: 'Werth 22',
    postalCode: '42275',
    city: 'Wuppertal',
    region: 'Nordrhein-Westfalen',
    country: 'DE',
  },
  // ...
};
```

> **Vorteil:** Änderungen an Telefonnummer, Adresse oder Öffnungszeiten aktualisieren automatisch sowohl die sichtbaren Komponenten (Header, Footer, Kontakt, Anruf-Buttons) als auch die unsichtbaren SEO-JSON-LD-Schemas. Ein Auseinanderdriften der Daten wird so technisch ausgeschlossen.

### Umgebungsvariablen (`.env.local`)

Erstellen Sie bei Bedarf eine `.env.local` Datei im Verzeichnis `tomas-bau-website/`:

```env
# Basis-URL für kanonische Links, OpenGraph und Sitemap
NEXT_PUBLIC_SITE_URL=https://www.tomasbau.de
```

---

## 🔍 SEO & Strukturierte Daten

Die Website ist für maximale Sichtbarkeit in lokalen Suchergebnissen (Google Local Pack, Google Maps, Organische Suche) ausgelegt:

- **JSON-LD Schemas (`StructuredData.tsx`):**
  - `LocalBusiness` / `HomeAndConstructionBusiness`: Vollständige NAP-Konsistenz (Name, Address, Phone), Geo-Koordinaten, Öffnungszeiten und Einzugsgebiet.
  - `Service`: Maschinenlesbarer Katalog der 9 angebotenen Dienstleistungen.
  - `FAQPage`: Automatische Spiegelung der sichtbaren Kundenfragen für Rich-Snippet-Chancen in Google.
  - `WebSite`: Kanonische URL und Seiteninformationen.
- **Sitemap & Robots:**
  - `/sitemap.xml`: Generiert über `app/sitemap.ts` (enthält die indexierbare Startseite).
  - `/robots.txt`: Generiert über `app/robots.ts` (verweist auf die Sitemap).
- **On-Page SEO:**
  - Semantische HTML5-Struktur mit genau einer `<h1>`-Überschrift auf der Startseite.
  - Deutsche Bildbeschreibungen (`alt`-Attribute) mit lokalen Suchbegriffen für alle Projektfotos.
  - Vollständige Open Graph- und Twitter Card-Metadaten.

---

## 🛡️ Datenschutz & Barrierefreiheit

- **100 % DSGVO-freundlich:** Keine Einbindung von Google Web Fonts über externe Server. Die Schriftartdatei (`Inter-VariableFont_opsz,wght.woff2`) liegt lokal auf dem Server unter `app/fonts/`.
- **Keine Tracking-Cookies:** Keine Cookie-Banner-Pflicht, solange keine optionalen Marketing- oder Analyse-Skripte hinzugefügt werden.
- **Rechtliche Vorlagen:** Vollständige Vorlagen für `/impressum` und `/datenschutz` sind hinterlegt (vor Veröffentlichung durch Inhaber zu prüfen).
- **A11y / Barrierefreiheit:**
  - Farbkontraste nach WCAG-Standards.
  - Tastaturbedienbare Lightbox und Menüs inklusive `Escape`-Unterstützung.
  - Alle Kerninhalte bleiben auch ohne aktiviertes JavaScript vollständig lesbar.

---

## 📋 Checkliste vor dem Go-Live

1. [ ] **Domain bestätigen:** Die finale Domain in `.env.local` und `lib/site.ts` eintragen.
2. [ ] **Rechtstexte finalisieren:** Inhaberdaten, USt-IdNr. und Registereintrag in [`app/impressum/page.tsx`](file:///Users/aarushgupta/Desktop/Albin%20/tomas-bau-website/app/impressum/page.tsx) und [`app/datenschutz/page.tsx`](file:///Users/aarushgupta/Desktop/Albin%20/tomas-bau-website/app/datenschutz/page.tsx) vervollständigen.
3. [ ] **Google Search Console:** Nach dem Deployment die Domain verifizieren und die Sitemap `https://ihre-domain.de/sitemap.xml` einreichen.
4. [ ] **Google Unternehmensprofil:** Abgleich der Kontaktdaten (Name, Telefon, Adresse, Öffnungszeiten) mit den Werten in `lib/site.ts`.

---

## 📄 Lizenz

Proprietäres Projekt für **Tomas Bau & Sanierung**. Alle Rechte vorbehalten.
Die eingebettete Inter-Schriftart unterliegt der [SIL Open Font License (OFL)](file:///Users/aarushgupta/Desktop/Albin%20/tomas-bau-website/app/fonts/OFL.txt).
