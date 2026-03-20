# ChurnRecovery — Product Architecture

## Overview
The ChurnRecovery product consists of three parts, layered on top of the existing marketing site.

## Architecture

### Part A: Dashboard (SaaS Web App)
- **Auth:** Clerk v7 (`@clerk/nextjs`)
- **Pages:** Under `/pages/app/`
  - `sign-in/[[...index]].js` — Clerk sign-in
  - `sign-up/[[...index]].js` — Clerk sign-up
  - `dashboard.js` — Overview with stats, recent events, quick actions
  - `cancel-flow.js` — Visual cancel flow builder with live preview
  - `analytics.js` — Churn metrics, bar charts, event table
  - `settings.js` — API keys, Stripe connection, webhooks, danger zone
  - `install.js` — Widget install instructions (script tag, npm, React)
- **Layout:** `AppLayout.js` component with sidebar nav and `UserButton`
- **Auth Protection:** Clerk middleware protects all `/app/*` routes
- **Page Flag:** App pages set `Component.isAppPage = true` — `_app.js` skips marketing Header/Footer for app pages

### Part B: Embeddable Widget (`/public/widget.js`)
- Pure vanilla JS, no framework dependency
- Self-contained: injects its own CSS
- Promise-based API: `ChurnRecovery.showCancelFlow(options) → result`
- Three-step flow: reason picker → smart offer → outcome
- Posts events to `/api/events` with CORS support
- Fetches flow config from `/api/cancel-flow`
- Auto-binds to elements with `data-churnrecovery="cancel"` attribute
- `ChurnRecovery.init()` for programmatic setup

### Part C: API Routes (`/pages/api/`)
- `projects.js` — CRUD for projects (auth required)
- `cancel-flow.js` — GET flow config (public for widget), POST save config (auth required)
- `events.js` — POST events from widget (public, CORS), GET for dashboard
- `analytics.js` — GET analytics data (auth required)
- `stripe-webhook.js` — Handles Stripe webhook events (raw body parsing for signature verification)

### Part D: Database Schema (`/db/schema.sql`)
- Cloudflare D1 (SQLite) schema
- Tables: projects, cancel_flows, cancel_events, failed_payments
- Proper indexes for query performance
- Foreign key relationships

## Key Architecture Decisions

### 1. Hybrid Rendering (No More Static Export)
- Removed `output: 'export'` from `next.config.js`
- Enables API routes and server-side auth middleware
- Existing marketing pages still prerender as static HTML
- New app pages use client-side rendering with Clerk auth

### 2. Clerk for Auth
- `@clerk/nextjs` v7
- `ClerkProvider` wraps entire app in `_app.js`
- Middleware (`middleware.js`) protects `/app/*` routes
- Uses `useUser()` hook for auth state in components
- Sign-in/sign-up URLs: `/app/sign-in`, `/app/sign-up`
- After auth redirect: `/app/dashboard`

### 3. Layout Switching
- Marketing pages: Header + Footer (via `_app.js`)
- App pages: AppLayout with sidebar (set `Component.isAppPage = true`)
- This avoids React context conflicts between marketing nav and app nav

### 4. In-Memory MVP → D1 Migration Path
- API routes currently use in-memory Maps for data
- D1 schema is ready in `/db/schema.sql`
- Migration: swap Map operations with D1 queries (Cloudflare Workers binding)
- No structural changes needed — same API contracts

### 5. Widget Design
- Standalone IIFE — no build step for consumers
- Reads config from `<script>` tag attributes
- Fetches flow config from API (falls back to defaults)
- All CSS injected inline (no external stylesheet)
- Animates in/out with CSS transitions
- Returns Promise with structured result object

## Environment Variables
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/app/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/app/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/app/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/app/dashboard
STRIPE_SECRET_KEY=sk_live_... (optional)
STRIPE_WEBHOOK_SECRET=whsec_... (optional)
```

## File Structure (New Files)
```
churnrecovery/
├── middleware.js                        # Clerk auth middleware
├── .env.example                        # Environment variable template
├── .env.local                          # Local dev env vars
├── db/schema.sql                       # D1 database schema
├── components/
│   └── AppLayout.js                    # Dashboard sidebar layout
├── pages/
│   ├── app/
│   │   ├── sign-in/[[...index]].js     # Clerk sign-in
│   │   ├── sign-up/[[...index]].js     # Clerk sign-up
│   │   ├── dashboard.js                # Overview dashboard
│   │   ├── cancel-flow.js              # Cancel flow builder
│   │   ├── analytics.js                # Analytics dashboard
│   │   ├── settings.js                 # Project settings
│   │   └── install.js                  # Widget install guide
│   └── api/
│       ├── projects.js                 # Project CRUD
│       ├── cancel-flow.js              # Cancel flow config
│       ├── events.js                   # Event logging
│       ├── analytics.js                # Analytics API
│       └── stripe-webhook.js           # Stripe webhooks
├── public/
│   └── widget.js                       # Embeddable cancel flow widget
└── PRODUCT_ARCHITECTURE.md             # This file
```

## Next Steps (Post-MVP)
1. Set up Clerk account and get real API keys
2. Create D1 database and run schema migration
3. Replace in-memory stores with D1 queries
4. Deploy to Cloudflare Pages (hybrid mode)
5. Set up Stripe Connect OAuth flow
6. Minify widget.js for CDN distribution
7. Build email templates for dunning sequences
8. Add real-time analytics with WebSocket updates
