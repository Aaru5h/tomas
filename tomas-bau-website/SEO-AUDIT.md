# Bautomas SEO audit — 29 September 2026

## Scope and deployment inspection

Website codebase: `tomas-bau-website`, Next.js 14.2.35 App Router. Build command: `prisma generate && next build`; production start: `next start`. Five public HTML routes: `/`, `/impressum`, `/datenschutz`, `/login`, `/signup`. API handlers and protected dashboard paths are not public content pages. There is no checked-in Vercel configuration or local `.vercel` project association. HTTP response headers confirm that the live site is served by Vercel. Account-side deployment settings were not accessed.

Read-only live HTTP checks found:

- All five public routes return HTTP 200.
- Homepage canonical, Open Graph URL/images, Twitter image, JSON-LD, sitemap and robots sitemap reference used the wrong `www.tomasbau.de` origin.
- HTTPS non-www redirects permanently (308) to HTTPS www and preserves paths/query strings.
- HTTP www redirects permanently to HTTPS www. HTTP non-www redirects via HTTPS non-www to HTTPS www. HTTPS responses include HSTS.
- Legal pages were intentionally marked noindex in code; login/signup inherited the homepage metadata and canonical.

## Implementation and exact file inventory

| File | Change |
| --- | --- |
| `lib/site.ts` | Pin production origin to `https://www.bautomas.de`, independent of stale environment values; add alternate names; improve German homepage description. Contact and business facts preserved. |
| `lib/seo.ts` (new) | Shared registry for all five public routes, unique German titles/descriptions, absolute self-canonicals, index/follow for general robots and Googlebot, full Open Graph and Twitter cards. Homepage canonical includes the trailing slash. |
| `app/layout.tsx` | Apply shared homepage metadata, retain German language, mobile viewport, icons and local font. |
| `app/impressum/page.tsx` | Dedicated social metadata and index/follow, self-canonical; existing draft text preserved. |
| `app/datenschutz/page.tsx` | Dedicated social metadata and index/follow, self-canonical; existing draft text preserved. |
| `app/(auth)/login/layout.tsx` (new) | Server-side route metadata without changing the login form. |
| `app/(auth)/signup/layout.tsx` (new) | Server-side route metadata without changing the registration form. |
| `app/sitemap.ts` | All five public indexable routes share the metadata route registry. No invented modification dates. |
| `components/StructuredData.tsx` | Correct production URLs, LocalBusiness/HomeAndConstructionBusiness types, alternate names, explicit Wuppertal City service area alongside existing radius, linked German FAQPage/WebSite. Existing phone, email, address, hours and Instagram retained. |
| `app/page.tsx` | Add one sentence to the existing About paragraph connecting Tomas Bau and Bau Tomas to the Wuppertal business. Existing content retained. |
| `components/Footer.tsx` | Add a 137px responsive image size hint matching the existing logo display width; no style changes. |
| `README.md`, `CONTACT_SETUP.md` | Correct project setup instructions so old domain/environment guidance does not reintroduce the issue. |
| `scripts/verify-seo.py` (new) | Read-only local HTTP smoke checks for metadata, crawl rules, sitemap, links, fragments, image alt attributes and JSON-LD/visible-content parity. |
| `SEO-AUDIT.md` (new) | This audit and deployment handoff. |

`app/robots.ts` already allows all crawlers and consumes `site.url`; its generated response is corrected by the origin fix without editing the file. The Instagram handle `tomasbau.de` is deliberately retained: it is a social profile, not a canonical domain. No CSS, business facts, contact details, forms, DNS/MX, account settings or deployment changes were made.

## Verification results

- `npm run build`: passed; all five public pages, robots.txt and sitemap.xml prerendered. Homepage first-load JavaScript: 97.6 kB.
- `npm run typecheck`: passed.
- `npm test`: all 7 existing contact tests passed; no live form submissions were sent.
- `python3 scripts/verify-seo.py http://127.0.0.1:3100`: passed against `next start`, including exact homepage canonical `https://www.bautomas.de/`, all five pages' metadata and robots, sitemap coverage, every rendered internal link/fragment, nonempty image alt text, parsed JSON-LD and matching visible FAQs/services/business contacts.
- `git diff --check`: passed.
- The initial full build reported existing authentication dependency warnings for Edge runtime APIs (`bcryptjs`, `jose`). Authentication logic was not changed. These do not block the public-page SEO verification.
- The local Next.js compiler package lacked its binary and was repaired in ignored `node_modules` using the exact required version. No dependency manifest or lockfile changed.
- Formal Google/schema validator submission, Search Console, Lighthouse and field Core Web Vitals measurements were not performed. Live pages still have their original metadata until an approved deployment.

Implementation uses the [Next.js 14 Metadata API](https://nextjs.org/docs/14/app/building-your-application/optimizing/metadata). All metadata URLs are absolute; `metadataBase` is explicitly null because this installed Next.js version otherwise removes the homepage canonical's required trailing slash.

## Review notes

- The user requested index/follow on every public page, so this includes login/signup and both legal pages. The legal pages still visibly describe themselves as drafts with missing owner-provided details. Review and complete those separately before approving publication; no legal text was invented in this SEO task.
- FAQ JSON-LD comes from exactly the same data as the visible expandable FAQs. Markup does not promise Google rich-result eligibility or rankings.
- Existing performance measures include static rendering, local font with swap, AVIF/WebP image optimization, responsive image sizes, hero preload, lazy-loaded gallery images, and compression. This change only adds the missing footer image size hint. No field Core Web Vitals or Lighthouse score is claimed.
- Live deployment settings were inferred only where observable from HTTP headers/redirects. No Vercel account, Search Console or DNS changes were made.

## After an approved deployment

1. Repeat the source, robots, sitemap and redirect checks on the live domain; confirm no stale edge cache or X-Robots-Tag blocks public routes.
2. In the existing Google Search Console property for Bautomas, submit `https://www.bautomas.de/sitemap.xml`. If no property exists, obtain approval for ownership verification first; DNS verification would be a separate authorized action.
3. Inspect `https://www.bautomas.de/` with URL Inspection, run the live test, and request indexing. Inspect the other public URLs and monitor Google's selected canonical, Page indexing, sitemap processing and Core Web Vitals.
4. If an obsolete sitemap was submitted to the old domain, remove that obsolete submission where accessible, after approval. Do not submit the unconfirmed `tomasbau.de` domain as this site's canonical.

## Client message

We corrected the website's search-engine address and improved German page descriptions, social previews, the sitemap and business information for Tomas Bau & Sanierung in Wuppertal. The business can now be identified consistently as Tomas Bau and Bau Tomas. The changes preserve the design, contact details and forms and are ready for review before publication. Google will need to recrawl the site after deployment.
