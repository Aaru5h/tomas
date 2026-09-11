# Contact backend

The existing homepage, legal pages, navigation, gallery and SEO routes use Next.js.
The form now posts JSON to `POST /api/kontakt`, which validates the request and sends
a plain-text email through Resend. No Express service or database is required.

## Enable delivery

1. Copy `.env.example` to `.env.local` in this application, or configure the same
   variables in the deployment's environment settings.
2. Create a Resend API key with sending permission and verify your sending domain.
3. Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (an address on that verified domain).
   `CONTACT_TO_EMAIL` defaults to the business email in `lib/site.ts`.
4. Set `NEXT_PUBLIC_SITE_URL` to the production origin. Rebuild and restart.
5. Deploy as a Next.js Node/serverless app, not a static export.
6. Submit an inquiry you control and verify receipt in the business inbox.

Keys stay server-side. Missing configuration returns 503 and the form offers direct
email/phone alternatives. A success means Resend accepted the email, not that the
recipient has read it or that final inbox delivery is guaranteed. Check delivery
events in Resend when troubleshooting. Requests and provider errors are not logged.

## Abuse protection and retries

The endpoint enforces same-origin browser submissions, JSON content type, a 24 KB
body limit, field validation and a honeypot. Each browser submission gets an
idempotency key, retained for retries of the same content. Resend deduplicates it
within its retention window; the application does not automatically retry sends.

The local limiter allows five attempts per ten minutes per trusted client IP.
Set `CONTACT_TRUST_PROXY=true` only if the hosting proxy overwrites
`x-forwarded-for`; otherwise all requests share the conservative limit.
The in-memory limit resets on process restart and is not shared between instances.
Configure a shared hosting/WAF rate limit on `/api/kontakt` before a public launch
with multiple instances. Origin checks and the honeypot alone do not stop bots.

The privacy and legal pages are still drafts: the owner must supply the missing
business and hosting details, and review the actual email-provider processing and
retention arrangements before publishing.

## Verification

Run `npm test` and `npm run build`. Tests mock Resend: no real email is sent.
They exercise validation, malformed/oversized requests, origin checks, configuration
failures, provider failures, rate limiting and successful submission payloads.

References: [Next.js Route Handlers](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers),
[Resend email API](https://resend.com/docs/api-reference/emails/send-email).
