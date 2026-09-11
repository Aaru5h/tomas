# Tomas Bau & Sanierung

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
- [Repository Structure](#-repository-structure)
- [Getting Started (Local Development)](#-getting-started-local-development)
- [Configuration & Single Source of Truth (`lib/site.ts`)](#-configuration--single-source-of-truth-libsitets)
- [Local SEO & Structured Data](#-local-seo--structured-data)
- [Privacy (GDPR/DSGVO) & Accessibility](#-privacy-gdprdsgvo--accessibility)
- [Pre-Launch Checklist](#-pre-launch-checklist)
- [License](#-license)

---

## 🏢 About the Project

This repository contains the complete source code for the official marketing and customer acquisition website of **Tomas Bau & Sanierung** (located at Werth 22, 42275 Wuppertal, Germany).

The business specializes in professional flooring installation (laminate, vinyl, hardwood parquet, herringbone, design floors), low-dust parquet sanding and refinishing, screed leveling, subfloor preparation, and full removal/disposal of old floors—offering workmanship and help finding materials, with no product sales or physical showroom.

The website was engineered with a strict focus on lightning-fast performance, high mobile conversion rates, and uncompromising Local SEO for Wuppertal and the broader Rhine-Ruhr metropolitan region.

---

## ✨ Key Features

- **⚡ Server-First Architecture (Next.js 14 App Router):** 100% server-rendered static and dynamic markup ensuring instant First Contentful Paint (FCP), zero layout shifts, and total search engine crawlability without client-side hydration delays.
- **📱 Mobile-First Conversion Suite:**
  - Sticky bottom contact bar (`MobileCallBar`) featuring one-tap calling and direct WhatsApp chat for mobile visitors.
  - Fully responsive design validated across all device widths from 320 px smartphones to large 4K desktop screens.
- **🖼️ Interactive Real-Project Showcase Gallery:**
  - Multi-category filtering (*Before / After*, *Finished Rooms*, *In Progress*).
  - Accessible native HTML5 `<dialog>` lightbox modal with full keyboard navigation (Left/Right arrow keys, Escape) and click-outside backdrop dismissal.
  - Real project photography using Next.js `Image` optimization (AVIF/WebP) with hero preloading and lazy loading.
- **🛠️ Comprehensive Service Catalog (10 Core Services):**
  - Featured offerings with prominent visuals, plus native expandable service cards with deep-link anchor support (`#service-{slug}`).
- **📍 Local SEO & Service Radius:**
  - Covers a 150 km operating radius with plain crawlable text indexing 26 key German cities (Düsseldorf, Cologne, Essen, Dortmund, Solingen, Remscheid, etc.).
- **📋 Transparent FAQ Accordion:**
  - Answers common customer questions on pricing, material procurement, sanding feasibility, and service areas.
- **✉️ Accessible Inquiry Form:**
  - Submits inquiries through the Next.js `/api/kontakt` route with server validation and Resend email delivery. See [contact setup](tomas-bau-website/CONTACT_SETUP.md).
- **🔒 GDPR / DSGVO Compliant by Design:**
  - Self-hosted Inter font (WOFF2) with zero requests to Google Fonts CDNs.
  - No tracking cookies or invasive third-party analytics scripts required.
  - Keyless external Google Maps link preventing external iframe tracking.

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14.2](https://nextjs.org/) | App Router, Server Components, Metadata API, Route Handlers |
| **UI Library** | [React 18.3](https://react.dev/) | Modern functional components, clean state management |
| **Language** | [TypeScript 5.5](https://www.typescriptlang.org/) | End-to-end type safety across content models and UI props |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) | Custom brand color tokens (Navy/Teal/Warm Gray/Slate) |
| **Media & Icons** | SVG & Next/Image | High-fidelity WebP/JPEG assets with responsive `sizes` attributes |
| **Typography** | Inter Variable | 100% locally hosted in `app/fonts/` (47 KB WOFF2, SIL OFL License) |

---

## 📂 Repository Structure

```text
.
├── media/                          # Source photo assets and project references
├── tomas-bau-website/              # Main Next.js application directory
│   ├── app/                        # Next.js App Router
│   │   ├── datenschutz/            # Privacy Policy route (/datenschutz - GDPR draft)
│   │   ├── fonts/                  # Self-hosted Inter Variable WOFF2 font files
│   │   ├── impressum/              # Legal Notice route (/impressum - German Impressum draft)
│   │   ├── globals.css             # Global styles, color tokens & Tailwind directives
│   │   ├── layout.tsx              # Root HTML shell, metadata, and font definitions
│   │   ├── page.tsx                # Homepage (Hero, Services, About, Gallery, FAQ, Contact)
│   │   ├── robots.ts               # Dynamic robots.txt generation
│   │   └── sitemap.ts              # Dynamic sitemap.xml generation
│   ├── components/                 # Reusable UI component layer
│   │   ├── ContactForm.tsx         # Customer inquiry form
│   │   ├── Footer.tsx              # Page footer with NAP data & legal navigation
│   │   ├── Gallery.tsx             # Filterable gallery with native accessible lightbox
│   │   ├── Header.tsx              # Navigation bar with emergency call action
│   │   ├── MobileCallBar.tsx       # Floating mobile quick-action bar (Call / WhatsApp)
│   │   └── StructuredData.tsx      # Schema.org JSON-LD structured data injector
│   ├── lib/
│   │   └── site.ts                 # Single source of truth for business NAP, content, and data
│   ├── public/
│   │   └── images/                 # Processed WebP/JPEG photos for hero & project gallery
│   ├── package.json                # Dependencies and npm build scripts
│   ├── tailwind.config.ts          # Tailwind styling configuration
│   └── tsconfig.json               # TypeScript compiler configuration
├── .gitignore                      # Git exclusion rules
└── README.md                       # Project documentation
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- **Node.js**: `v18.17` or later
- **npm**: `v9.0` or later (or `pnpm` / `yarn`)

### Installation & Run

1. **Navigate to the web application directory:**
   ```bash
   cd tomas-bau-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build and test for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## ⚙️ Configuration & Single Source of Truth (`lib/site.ts`)

All business data—Name, Address, Phone (NAP), opening hours, services, gallery items, and service areas—are centralized inside [`tomas-bau-website/lib/site.ts`](file:///Users/aarushgupta/Desktop/Albin%20/tomas-bau-website/lib/site.ts):

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

> **Why this matters:** When the owner updates phone numbers, business hours, or addresses, modifying `lib/site.ts` immediately updates all user-facing components (headers, footers, contact cards, call buttons) **and** keeps Google's structured data (JSON-LD) 100% in sync without discrepancies.

### Environment Variables (`.env.local`)

Create an optional `.env.local` inside `tomas-bau-website/` to set the canonical URL:

```env
# Base URL for canonical URLs, OpenGraph, Twitter Cards, and sitemap.xml
NEXT_PUBLIC_SITE_URL=https://www.tomasbau.de
```

---

## 🔍 Local SEO & Structured Data

The website is engineered for top placement in Google Search and Google Local (Map Pack):

- **Schema.org JSON-LD (`StructuredData.tsx`):**
  - `LocalBusiness` / `HomeAndConstructionBusiness`: Validates consistent NAP data, GPS coordinates (`51.2735, 7.1668`), opening hours, and operating radius.
  - `Service`: Machine-readable catalog describing all 10 flooring, renovation, and cleaning services.
  - `FAQPage`: Synchronizes visible customer FAQ answers into rich snippet candidate data.
  - `WebSite`: Canonical web presence definition.
- **Sitemap & Robots:**
  - `/sitemap.xml`: Auto-generated via `app/sitemap.ts` (includes the canonical homepage; legal drafts are `noindex`).
  - `/robots.txt`: Auto-generated via `app/robots.ts` referencing the live sitemap.
- **On-Page SEO Hygiene:**
  - Strict semantic hierarchy with a single `<h1>` tag on the homepage.
  - Descriptive, German-language `alt` tags incorporating local geo-intent keywords for every image.
  - Full OpenGraph and Twitter social card metadata with dedicated preview images.

---

## 🛡️ Privacy (GDPR/DSGVO) & Accessibility

- **100% GDPR / DSGVO Compliant:**
  - No external fonts CDN: the variable Inter font file (`Inter-latin.woff2`) is hosted directly from `app/fonts/`.
  - Zero third-party tracker cookies: no cookie consent banner is needed out-of-the-box.
  - Privacy-preserving external Google Maps link avoids remote iframe cookie placement.
- **Accessibility (A11y):**
  - High color contrast adhering to WCAG 2.1 AA standards.
  - Native accessible dialog for image lightbox supporting full keyboard control (`Escape` to close, arrow keys to cycle).
  - All core content and contact details remain visible and readable even if JavaScript is disabled.

---

## 📋 Pre-Launch Checklist

1. [ ] **Verify Production Domain:** Update `NEXT_PUBLIC_SITE_URL` in `.env.local` and `lib/site.ts`.
2. [ ] **Finalize Legal Notices:** Complete business registration number, VAT ID (USt-IdNr.), and representative details in [`/impressum`](file:///Users/aarushgupta/Desktop/Albin%20/tomas-bau-website/app/impressum/page.tsx) and [`/datenschutz`](file:///Users/aarushgupta/Desktop/Albin%20/tomas-bau-website/app/datenschutz/page.tsx).
3. [ ] **Google Search Console:** Verify domain ownership and submit `https://your-domain.de/sitemap.xml`.
4. [ ] **Google Business Profile:** Ensure company name, address, phone number, and hours match `lib/site.ts` exactly.

---

## 📄 License

Proprietary project for **Tomas Bau & Sanierung**. All rights reserved.  
The embedded Inter font is licensed under the [SIL Open Font License (OFL)](file:///Users/aarushgupta/Desktop/Albin%20/tomas-bau-website/app/fonts/OFL.txt).

## September 2026 content update

The five new project photos from `media/` are prepared in `public/images/` with screenshot borders removed. They appear first in the gallery; the radiator detail pair also illustrates precision on the homepage. Cleaning and floor sanding are highlighted services. The business provides labor and help finding materials, with no product sales or showroom. Calls use +49 159 01039781; +49 176 83135344 is exclusively for WhatsApp.
