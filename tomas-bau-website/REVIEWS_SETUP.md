# Reviews launch setup

The site uses the existing PostgreSQL database. No larger database service is needed for low traffic. Do not deploy the review feature until the following are complete:

1. Provision a PostgreSQL database if production does not already have one. Set `DATABASE_URL` and a strong `AUTH_SECRET` in production. The current repository contains a schema but no earlier migration history; if the auth tables already exist, apply `prisma/migrations/20261123000000_reviews/migration.sql` once to that database. If it is a fresh database, use `npx prisma db push` to create the full schema. Back up an existing database first.
2. Set `RESEND_API_KEY` and a verified sender address in `AUTH_FROM_EMAIL` for account confirmation. Configure `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` if Google login should be offered.
3. Register the owner account, confirm its email, then grant admin access with a targeted SQL update: `UPDATE "User" SET "role" = 'ADMIN' WHERE "email" = 'owner@example.com';` Replace the email with the actual owner account and verify exactly one row changed. Never expose an admin registration route.
4. Configure a platform or WAF rate limit for `/api/auth/*` and review submissions. The in-process signup limiter is a fallback for a single instance.
5. Complete the draft privacy and legal notices with the owner's actual processor, hosting, retention, legal basis, and contact details before launch.
6. Smoke test signup, confirmation, login, Google login (if enabled), submit/edit/delete, moderation, and public rendering against a staging database.

Reviews are one per account and become public only after admin approval. An edit returns the review to the queue. The public rating is derived only from published reviews. Google does not award review stars in search for business-controlled reviews of that same business.
