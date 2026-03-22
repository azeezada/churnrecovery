# ChurnRecovery — Product Completeness Assessment
**Date:** 2026-03-22 03:45 EDT

## MVP User Journey Assessment

### Step 1: Sign up with email ✅ WORKS
- **URL:** https://churnrecovery.com/app/sign-up/
- **Status:** Clerk is configured and working in production
- **Auth methods:** Email + password, Google OAuth, email code verification
- **Clerk instance:** `set-jaybird-83.clerk.accounts.dev` (test mode)
- **After sign-up:** Redirects to `/app/dashboard`
- **Issue:** Clerk is in **test mode** (pk_test_). For real users, need to switch to production keys (pk_live_). Test mode works but shows Clerk test banner.

### Step 2: See a dashboard ✅ WORKS (with caveats)
- **URL:** https://churnrecovery.com/app/dashboard
- **Status:** Page loads. Shows empty state with "Welcome to ChurnRecovery" + setup wizard CTA.
- **Data flow:** Dashboard tries API first (`/api/projects`), falls back to localStorage
- **On production with Clerk auth:** API calls include JWT Bearer token → D1 queries work → real data
- **On production without auth:** Falls back to localStorage demo data
- **Empty state UX:** Clean — shows "Start Setup Wizard" button → onboarding flow

### Step 3: Configure a cancel flow ✅ WORKS
- **URL:** https://churnrecovery.com/app/cancel-flow
- **Status:** Visual cancel flow builder works. Reason editor, offer type picker, live preview.
- **⚠️ Data persistence issue:** Cancel flow page uses **only localStorage** (`localStore.js`), NOT the real API. Saves to browser, not D1.
- **Impact:** If user clears browser or uses different device, cancel flow config is lost.
- **Fix needed:** Wire cancel-flow.js to use `apiFetch('/api/cancel-flow', ...)` like dashboard.js does.

### Step 4: Get a widget code snippet ✅ WORKS
- **URL:** https://churnrecovery.com/app/install
- **Status:** Shows 3 installation methods (script tag, npm, React component) with copy buttons
- **Code snippet includes:** project ID and API key from localStorage project
- **Widget URL:** `https://churnrecovery.com/widget.js` (serves correctly, 200 OK)

### Step 5: Widget works on their site ✅ WORKS (API is functional)
- **Widget:** Pure vanilla JS IIFE, ~15KB, self-contained CSS
- **API endpoints verified on production:**
  - `GET /api/cancel-flow?projectId=X` → Returns flow config (200) ✅
  - `POST /api/events` with API key → Records events to D1 ✅ (rejects invalid keys correctly)
  - `GET /api/health` → 200 ✅
- **Widget flow:** Reason picker → Smart offer → Save/cancel outcome
- **Events tracked:** flow_started, reason_selected, saved, cancelled, paused, downgraded, feedback_submitted

---

## Feature Status Matrix

| Feature | Status | What's Working | What's Missing |
|---------|--------|---------------|----------------|
| **Sign-up/Sign-in** | ✅ Works | Clerk auth, email+Google, redirects | Switch from test → production Clerk keys |
| **Dashboard** | ✅ Works | Stats, events, project creation via API+localStorage fallback | — |
| **Onboarding wizard** | ✅ Works | 3-step flow: template → customize → install | Uses localStorage only, not API |
| **Cancel flow builder** | ⚠️ Partial | Visual editor, live preview, reason/offer config | **Uses localStorage, not D1 API** |
| **Analytics page** | ✅ Works | Bar charts, metrics, event table. API-first with localStorage fallback | — |
| **Settings page** | ⚠️ Partial | API key display, Stripe connection UI, webhooks | **Uses localStorage, not D1 API** |
| **Install page** | ✅ Works | 3 install methods, code snippets with project ID | — |
| **Widget (widget.js)** | ✅ Works | Vanilla JS, fetches config, posts events, auto-binds | Needs minification for CDN |
| **API: projects** | ✅ Works | CRUD with Clerk JWT auth, D1 storage | — |
| **API: cancel-flow** | ✅ Works | GET (public for widget), POST (auth required), D1 | — |
| **API: events** | ✅ Works | POST (public with API key/CORS), D1 storage | — |
| **API: analytics** | ✅ Works | Aggregation queries on D1 | — |
| **D1 Database** | ✅ Works | Schema deployed, tables: projects, cancel_flows, cancel_events, failed_payments | — |
| **Homepage CTA** | ✅ Fixed | "Get Started Free →" links to /app/sign-up | Was "Join Waitlist" — now fixed |
| **All 44+ pages** | ✅ Fixed | Waitlist language replaced with active sign-up CTAs | — |

---

## Critical Fixes Needed (P0)

### 1. Wire cancel-flow.js and settings.js to D1 API (not just localStorage)
**Impact:** Cancel flow configs saved in browser localStorage are lost if user switches device/browser. Must persist to D1 via `/api/cancel-flow` POST.

**Files:** `pages/app/cancel-flow.js`, `pages/app/settings.js`, `pages/app/onboarding.js`
**Pattern:** Follow `pages/app/dashboard.js` which already does API-first with localStorage fallback.

### 2. Switch Clerk to production mode
**Current:** `pk_test_c2V0LWpheWJpcmQtODMuY2xlcmsuYWNjb3VudHMuZGV2JA` (test key)
**Needed:** Production instance with `pk_live_*` key
**Steps:** Clerk Dashboard → Production → Get production keys → Update `.env.local` + Cloudflare Pages env vars → Redeploy

### 3. Verify Clerk JWT signatures in Pages Functions
**Current:** `getUserId()` decodes JWT but doesn't verify signature (noted in PRODUCT_ARCHITECTURE.md)
**Risk:** Anyone could forge a JWT with a fake `sub` claim
**Fix:** Use Clerk's JWKS endpoint to verify JWT signatures, or use Clerk's published public key

---

## What Was Fixed Today

1. **Removed ALL waitlist language** — 44+ pages updated, ~2,400 lines of dead code removed
2. **Created SignUpCTA component** — Replaces WaitlistForm everywhere with "Get Started Free →" + "/app/sign-up" links
3. **Header CTA updated** — Desktop and mobile nav now say "Get Started Free" → /app/sign-up
4. **Homepage hero CTA** — "Start Saving Subscribers →" now links to sign-up, not waitlist anchor
5. **All /for/ landing pages** — 19 platform-specific pages cleaned up
6. **Comparison, integration, template pages** — All CTAs updated
7. **Build passes** — 118 pages, all routes valid, committed and pushed

---

## Remaining WORKQUEUE Items to Add

### P0 — Blocks real users
- [ ] Wire cancel-flow.js, settings.js, onboarding.js to use D1 API (not just localStorage)
- [ ] Switch Clerk to production keys
- [ ] Add JWT signature verification in Pages Functions
- [ ] Deploy the waitlist→signup changes to production (pushed to main, needs CF Pages redeploy)

### P1 — First week improvements  
- [ ] Cloudflare Web Analytics snippet (still undone from WORKQUEUE)
- [ ] UTM parameter capture on sign-up (pass through to Clerk metadata or D1)
- [ ] Minify widget.js for CDN distribution
- [ ] Add loading states to sign-up/sign-in pages
- [ ] Error boundary for Clerk component failures
