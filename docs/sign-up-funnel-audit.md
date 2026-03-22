# Sign-Up Funnel Audit
**Date:** 2026-03-22  
**Auditor:** Macai (AI dev partner)  
**Project:** ChurnRecovery  

---

## Summary

The sign-up funnel was largely in good shape — Clerk is configured with a real live key, all CTAs correctly link to `/app/sign-up`, and the Clerk widget is properly embedded. However, **three issues were found and fixed**, with the most critical one being that new users after sign-up were being sent to `/app/dashboard` instead of `/app/onboarding` (skipping the entire onboarding flow).

---

## Funnel Flow (End-to-End)

```
Landing Page CTA → /app/sign-up → Clerk Auth → /app/onboarding → /app/dashboard
```

### Step 1: Landing Page CTA → /app/sign-up ✅

- **`pages/index.js`**: Hero section CTA `<a href="/app/sign-up">Start Saving Subscribers →</a>` ✅
- **`pages/index.js`**: Bottom CTA section `<a href="/app/sign-up">Get Started Free →</a>` ✅
- **`components/SignUpCTA.js`**: Bottom-of-page CTA component links to `/app/sign-up?source=...` ✅
- **Checked all other pages** (`/pricing`, `/features`, `/demo`, `/compare/*`, `/integrations`, `/about`, etc.) — all 35+ CTAs correctly point to `/app/sign-up` ✅
- **No old waitlist URLs found** in production pages (WaitlistForm.js still exists as a component but is not used on any public-facing page) ✅

### Step 2: /app/sign-up — Clerk Registration ✅

- **File:** `pages/app/sign-up/[[...index]].js`
- Checks if Clerk is configured via `isClerkEnabled()` (validates real key pattern)
- With real Clerk key: renders `<ClerkProvider>` wrapping `<SignUp>` widget ✅
- Widget config: `path="/app/sign-up"`, `routing="path"`, `signInUrl="/app/sign-in"` ✅
- Fallback (no key): renders friendly demo-mode message ✅
- Error boundary `<ClerkErrorBoundary>` wraps widget to catch Clerk JS crashes ✅

### Step 3: After Sign-Up Redirect → /app/onboarding ✅ (FIXED)

- **Was broken**: `_app.js` had `signUpForceRedirectUrl: '/app/dashboard'` which overrides all other `afterSignUpUrl` settings in Clerk
- **Fixed**: Changed to `signUpForceRedirectUrl: '/app/onboarding'` and `afterSignUpUrl: '/app/onboarding'`
- **Also fixed**: `.env.local` had `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/app/dashboard` → changed to `/app/onboarding`

### Step 4: Onboarding Flow ✅ (IMPROVED)

- **File:** `pages/app/onboarding.js`
- 4-step wizard: Project Name → Cancel Flow Template → Widget Install Code → Stripe Connect
- All steps functional — creates project via API (with localStore fallback) ✅
- Step 4 redirects to `/app/dashboard` on completion ✅
- **Added auth guard**: unauthenticated Clerk users now redirect to `/app/sign-in` instead of seeing a broken loading state

### Step 5: Dashboard — Auth Protected ✅ (IMPROVED)

- **File:** `pages/app/dashboard.js`
- Uses `useAuthUser()` which reads from Clerk or returns demo user ✅
- **Added auth guard**: unauthenticated Clerk users now redirect to `/app/sign-in` instead of showing empty/broken state
- In demo mode (no Clerk key), dashboard renders normally with demo user ✅

---

## Issues Found & Fixed

### 🔴 CRITICAL — New users skipped onboarding (FIXED)

**File:** `pages/_app.js`  
**Problem:** `signUpForceRedirectUrl: '/app/dashboard'` was overriding `afterSignUpUrl='/app/onboarding'` everywhere. Every new sign-up landed on the dashboard directly, bypassing the 4-step setup wizard entirely. This means new users never got their project created, cancel flow configured, or widget install code.

**Fix:**
```js
// Before (broken):
signUpForceRedirectUrl: '/app/dashboard',

// After (fixed):
signUpForceRedirectUrl: '/app/onboarding',
```

Also fixed `afterSignUpUrl: '/app/onboarding'` (was `/app/dashboard`) in `_app.js` and `.env.local`.

### 🟡 IMPORTANT — No auth guard on dashboard/onboarding (FIXED)

**Files:** `pages/app/dashboard.js`, `pages/app/onboarding.js`  
**Problem:** When Clerk is enabled, unauthenticated users visiting `/app/dashboard` or `/app/onboarding` would see an empty/broken loading state forever — no redirect to sign-in.

**Fix:** Created `lib/useAuthGuard.js` — a hook that:
- In demo mode: no-op (demo user always "authenticated")
- With Clerk: waits for `isLoaded`, then redirects to `/app/sign-in` if no user

Applied to dashboard and onboarding pages:
```js
const { isReady } = useAuthGuard()
if (!isReady) return null  // either loading or redirecting
```

### 🟢 MINOR — ClerkErrorBoundary showed stale "Coming Soon" copy (FIXED)

**File:** `components/ClerkErrorBoundary.js`  
**Problem:** Error boundary fallback said "Sign Up Coming Soon" / "Sign In Coming Soon" — misleading now that Clerk is live in production.

**Fix:** Updated to "Unable to Load Sign Up" / "Unable to Load Sign In" with instructions to refresh the page.

---

## Configuration Verified

| Config | Value | Status |
|--------|-------|--------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_live_Y2xlcmsuY2h1cm5...` (valid live key) | ✅ |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/app/sign-in` | ✅ |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/app/sign-up` | ✅ |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/app/dashboard` | ✅ |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/app/onboarding` | ✅ (fixed) |
| `CLERK_JWKS_URL` | `https://clerk.churnrecovery.com/.well-known/jwks.json` | ✅ |
| Middleware | Passthrough (static export — Cloudflare Pages) | ✅ expected |

---

## Files Changed

| File | Change |
|------|--------|
| `pages/_app.js` | Fixed `signUpForceRedirectUrl` and `afterSignUpUrl` to `/app/onboarding` |
| `.env.local` | Fixed `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` to `/app/onboarding` |
| `lib/useAuthGuard.js` | **New file** — client-side auth guard hook |
| `pages/app/dashboard.js` | Added `useAuthGuard` to redirect unauthenticated users |
| `pages/app/onboarding.js` | Added `useAuthGuard` to redirect unauthenticated users |
| `components/ClerkErrorBoundary.js` | Updated stale "Coming Soon" error copy |

---

## Build & Test Results

- **Build:** ✅ `npm run build` — 146 pages compiled, 0 errors
- **Tests:** ✅ `npm test` — 318 passed, 7 skipped (expected), 0 failed

---

## Remaining Notes

- **`WaitlistForm.js`** still exists but is not used on any marketing pages. Can be removed or kept for potential waitlist campaigns.
- **Other app pages** (`/app/analytics`, `/app/settings`, `/app/cancel-flow`, etc.) do not have explicit auth guards yet — they use demo fallback mode which means unauthenticated Clerk users see demo data rather than being redirected. Consider adding `useAuthGuard` to all app pages for consistency.
- **Middleware** is currently a passthrough — appropriate for static export to Cloudflare Pages. If the project moves to a Node.js server, `clerkMiddleware()` from `@clerk/nextjs` should be used instead.
