# Server API Routes (Local Dev Only)

These files were originally in `pages/api/` but were moved here because
Next.js `output: 'export'` (static HTML export) doesn't support API routes.

These routes use `better-sqlite3` and are meant for **local development only**.
They won't run on Cloudflare Workers.

## Production API

In production, API routes are handled by:
- **`workers-site/index.js`** — Cloudflare Worker with D1 database
- Currently supports: `/api/waitlist` (POST), `/api/waitlist/count` (GET)
- Dashboard API routes (events, projects, analytics, etc.) need to be
  ported to the Worker + D1 when the dashboard goes live.

## To use these locally

You can temporarily move them back to `pages/api/` and remove
`output: 'export'` from `next.config.js` for local development with
`npm run dev`.
