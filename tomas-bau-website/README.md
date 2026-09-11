# Tomas Bau & Sanierung — Website

> **Modern, high-performance web platform for Tomas Bau & Sanierung** — Expert flooring installation, parquet restoration, and subfloor preparation based in Wuppertal, Germany, serving a 150 km radius across North Rhine-Westphalia (NRW).

![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![React 18](https://img.shields.io/badge/React-18.3-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![SEO Ready](https://img.shields.io/badge/Local_SEO-Schema.org_JSON--LD-success?style=flat-square)

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started & Scripts](#-getting-started--scripts)
- [Configuration & Single Source of Truth (`lib/site.ts`)](#-configuration--single-source-of-truth-libsitets)
- [Local SEO & Structured Data](#-local-seo--structured-data)
- [Privacy (GDPR/DSGVO) & Accessibility](#-privacy-gdprdsgvo--accessibility)
- [Pre-Launch Checklist](#-pre-launch-checklist)
- [License](#-license)

---

## 🏢 About the Project

This directory contains the complete Next.js 14 App Router application for **Tomas Bau & Sanierung** (Werth 22, 42275 Wuppertal, Germany).

The company specializes in professional flooring installation (laminate, vinyl, hardwood parquet, herringbone, and design floors), dust-free parquet sanding, screed leveling, subfloor preparation, and full removal/disposal of existing floors.

The web platform is built for maximum load speed, high mobile conversion rates, and strict Local SEO for Wuppertal and the Rhine-Ruhr area.

---

## ✨ Key Features

- **⚡ Server-First Architecture (Next.js 14 App Router):** Server-rendered markup ensuring rapid First Contentful Paint (FCP) and full search engine indexability.
- **📱 Mobile Conversion Focus:**
  - Floating bottom bar (`MobileCallBar`) with instant one-tap calling and WhatsApp chat.
  - Responsive design tested from 320 px smartphones to large desktop screens.
- **🖼️ Interactive Real-Project Showcase Gallery:**
  - Multi-category filtering (*Before / After*, *Finished Rooms*, *In Progress*).
  - Accessible native HTML5 `<dialog>` lightbox modal with keyboard controls (Arrow keys, Escape) and click-outside dismissal.
  - Real project images utilizing Next.js `Image` optimization (AVIF/WebP) with hero preloading and lazy loading.
- **🛠️ 10 Core Services:**
  - Key offerings with rich imagery and native expandable detail cards with anchor links (`#service-{slug}`).
- **📍 Local SEO & Service Radius:**
  - Crawlable coverage across 26 major cities within 150 km of Wuppertal.
- **📋 Transparent FAQ Accordion:**
  - Addressing pricing, material options, restoration feasibility, and regional coverage.
- **✉️ Accessible Inquiry Form:**
  - Submits inquiries through the Next.js `/api/kontakt` route with server validation and Resend email delivery. See [contact setup](CONTACT_SETUP.md).
- **🔒 GDPR / DSGVO Compliant by Design:**
  - Self-hosted Inter font (WOFF2) with zero remote font server calls.
  - Zero tracking cookies or invasive third-party scripts.
  - Privacy-friendly external Google Maps links avoiding tracking iframes.

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14.2](https://nextjs.org/) | App Router, Server Components, Metadata API |
| **UI Library** | [React 18.3](https://react.dev/) | Functional components & hooks |
| **Language** | [TypeScript 5.5](https://www.typescriptlang.org/) | Complete type safety for models and components |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) | Custom brand color palette (Navy / Teal / Warm Gray / Slate) |
| **Media & Icons** | SVG & Next/Image | Responsive WebP/JPEG assets |
| **Typography** | Inter Variable | 100% self-hosted in `app/fonts/` (47 KB WOFF2, SIL OFL License) |

---

## 📂 Project Structure

```text
tomas-bau-website/
├── app/                        # Next.js App Router
│   ├── datenschutz/            # Privacy Policy route (/datenschutz - GDPR draft)
│   ├── fonts/                  # Self-hosted Inter Variable WOFF2 font files
│   ├── impressum/              # Legal Notice route (/impressum - German Impressum draft)
│   ├── globals.css             # Global styles, color tokens & Tailwind directives
│   ├── layout.tsx              # Root HTML shell, metadata, and font definitions
│   ├── page.tsx                # Homepage (Hero, Services, About, Gallery, FAQ, Contact)
│   ├── robots.ts               # Dynamic robots.txt generation
│   └── sitemap.ts              # Dynamic sitemap.xml generation
├── components/                 # Reusable UI component layer
│   ├── ContactForm.tsx         # Customer inquiry form
│   ├── Footer.tsx              # Page footer with NAP data & legal navigation
│   ├── Gallery.tsx             # Filterable gallery with native accessible lightbox
│   ├── Header.tsx              # Navigation bar with emergency call action
│   ├── MobileCallBar.tsx       # Floating mobile quick-action bar (Call / WhatsApp)
│   └── StructuredData.tsx      # Schema.org JSON-LD structured data injector
├── lib/
│   └── site.ts                 # Single source of truth for business NAP, content, and data
├── public/
│   └── images/                 # Processed WebP/JPEG photos for hero & project gallery
├── package.json                # Dependencies and npm build scripts
├── tailwind.config.ts          # Tailwind styling configuration
├── tsconfig.json               # TypeScript compiler configuration
└── README.md                   # Application documentation
```

---

## 🚀 Getting Started & Scripts

### Prerequisites

- **Node.js**: `v18.17` or higher
- **npm**: `v9.0` or higher (or `pnpm` / `yarn`)

### Available Commands

```bash
# 1. Install dependencies
npm install

# 2. Start development server (at http://localhost:3000)
npm run dev

# 3. Create production build (runs TypeScript & bundle checks)
npm run build

# 4. Start production server
npm run start

# 5. Run linter
npm run lint
```

---

## ⚙️ Configuration & Single Source of Truth (`lib/site.ts`)

All core company info, contact information, hours, services, and gallery items live in [`lib/site.ts`](file:///Users/aarushgupta/Desktop/Albin%20/tomas-bau-website/lib/site.ts):

```typescript
export const site = {
  name: 'Tomas Bau & Sanierung',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tomasbau.de',
  tagline: 'Ihr Bodenbelag-Experte in Wuppertal',
  yearsExperience: 7,
  phone: {
    display: '+49 159 01039781',
    href: 'tel:+4915901039781',
    whatsapp: 'https://wa.me/4917683135344',
    whatsappDisplay: '+49 176 83135344',
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

> **Why this matters:** Updating `lib/site.ts` guarantees that UI elements (Header, Footer, ContactForm, MobileCallBar) and SEO structured data (JSON-LD) remain identical, preventing Google data mismatch penalties.

### Environment Variables (`.env.local`)

You can define `.env.local` to override the live canonical URL:

```env
# Production domain for metadata, OpenGraph, and sitemap.xml
NEXT_PUBLIC_SITE_URL=https://www.tomasbau.de
```

---

## 🔍 Local SEO & Structured Data

- **Schema.org JSON-LD (`StructuredData.tsx`):**
  - `LocalBusiness` / `HomeAndConstructionBusiness`: Validates NAP consistency, geographic coordinates, opening hours, and service radius.
  - `Service`: Structured index of the 10 flooring, renovation, and cleaning offerings.
  - `FAQPage`: Reflects customer FAQs into Google rich result candidate format.
  - `WebSite`: Canonical web presence definition.
- **Sitemap & Robots:**
  - `/sitemap.xml`: Auto-generated by `app/sitemap.ts` (indexes canonical homepage; legal drafts are `noindex`).
  - `/robots.txt`: Auto-generated by `app/robots.ts`.
- **On-Page SEO Hygiene:**
  - Strict heading hierarchy with one single `<h1>`.
  - Detailed German `alt` text for images containing local geo-targeted keywords.
  - Full OpenGraph and Twitter card meta tags.

---

## 🛡️ Privacy (GDPR/DSGVO) & Accessibility

- **100% GDPR / DSGVO Compliant:**
  - Inter font is self-hosted locally under `app/fonts/Inter-latin.woff2`.
  - No analytics or cookie tracking scripts.
  - External Google Maps link eliminates third-party tracking cookies.
- **Accessibility (A11y):**
  - WCAG 2.1 AA compliant contrast ratios.
  - Keyboard-operable modal lightbox with `Escape` close handler.
  - All content is readable and rendered even without JavaScript enabled.

---

## 📋 Pre-Launch Checklist

1. [ ] **Verify Production Domain:** Set `NEXT_PUBLIC_SITE_URL` in `.env.local` and `lib/site.ts`.
2. [ ] **Finalize Legal Notices:** Complete business registration number, VAT ID (USt-IdNr.), and representative details in [`app/impressum/page.tsx`](file:///Users/aarushgupta/Desktop/Albin%20/tomas-bau-website/app/impressum/page.tsx) and [`app/datenschutz/page.tsx`](file:///Users/aarushgupta/Desktop/Albin%20/tomas-bau-website/app/datenschutz/page.tsx).
3. [ ] **Google Search Console:** Verify domain ownership and submit `https://your-domain.de/sitemap.xml`.
4. [ ] **Google Business Profile:** Ensure company name, address, phone number, and hours match `lib/site.ts` exactly.

---

## 📄 License

Proprietary project for **Tomas Bau & Sanierung**. All rights reserved.  
The embedded Inter font is licensed under the [SIL Open Font License (OFL)](file:///Users/aarushgupta/Desktop/Albin%20/tomas-bau-website/app/fonts/OFL.txt).

## September 2026 content update

The five new project photos from `media/` are prepared in `public/images/` with screenshot borders removed. They appear first in the gallery; the radiator detail pair also illustrates precision on the homepage. Cleaning and floor sanding are highlighted services. The business provides labor and help finding materials, with no product sales or showroom. Calls use +49 159 01039781; +49 176 83135344 is exclusively for WhatsApp.
