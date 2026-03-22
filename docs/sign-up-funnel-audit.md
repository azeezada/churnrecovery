# Sign-Up Funnel Audit — 2026-03-22

## Summary

Full audit of the ChurnRecovery user sign-up funnel. 4 issues found, all fixed. Build passes.

---

## Funnel Steps

### 1. Landing Page (`pages/index.js`) — ✅ Working

- Hero CTA links to `/app/sign-up` ✅
- Bottom CTA section links to `/app/sign-up` ✅  
- No leftover waitlist links found ✅
- `SignUpCTA` component used at the bottom ✅
- Demo link points to `/demo` ✅

### 2. Sign-Up Page (`pages/app/sign-up/[[...index]].js`) — ⚠️ Issue Found → Fixed

**Issues:**
- `afterSignUpUrl` was set to `/app/dashboard` — new users should go through onboarding first
- Inner ClerkProvider `afterSignUpUrl` also pointed to `/app/dashboard`

**Fixes Applied:**
- Changed `afterSignUpUrl="/app/dashboard"` → `afterSignUpUrl="/app/onboarding"` in the `ClerkSignUp` component call
- Changed inner ClerkProvider `afterSignUpUrl="/app/dashboard"` → `afterSignUpUrl="/app/onboarding"`

### 3. Sign-In Page (`pages/app/sign-in/[[...index]].js`) — ⚠️ Issue Found → Fixed

**Issues:**
- Demo mode text had typo: `. env.local` (extra space before `env`)

**Fixes Applied:**
- Fixed typo: `. env.local` → `.env.local`

### 4. `_app.js` (global Clerk config) — ⚠️ Issue Found → Fixed

**Issues:**
- `afterSignUpUrl` and `signUpForceRedirectUrl` both pointed to `/app/dashboard`, bypassing onboarding for new sign-ups

**Fixes Applied:**
- `afterSignUpUrl: '/app/dashboard'` → `afterSignUpUrl: '/app/onboarding'`
- `signUpForceRedirectUrl: '/app/dashboard'` → `signUpForceRedirectUrl: '/app/onboarding'`

### 5. Middleware (`middleware.js`) — ✅ Working (by design)

- Static export to Cloudflare Pages — middleware is a passthrough (correct for this architecture)
- Auth is enforced client-side via Clerk JS SDK
- Comment explains the design decision clearly

### 6. AppLayout (`components/AppLayout.js`) — ⚠️ Issue Found → Fixed

**Issues:**
- No client-side auth guard: unauthenticated users could potentially see a flash of protected app UI before Clerk redirects them
- No loading state while Clerk auth is resolving

**Fixes Applied:**
- Added `useEffect` auth guard: when Clerk is enabled and user is not loaded/signed in, redirects to `/app/sign-in`
- Added loading state that shows a spinner while auth resolves, preventing flash of protected content

### 7. Dashboard (`pages/app/dashboard.js`) — ✅ Working

- Uses `useAuthUser` hook correctly ✅
- Shows user's name/email when loaded ✅
- `DashboardPage.isAppPage = true` set correctly (skips public Header/Footer) ✅
- Graceful fallback to demo mode when Clerk not configured ✅
- All imports resolve correctly ✅

### 8. Onboarding (`pages/app/onboarding.js`) — ✅ Working

- 4-step wizard: project creation → flow template → install widget → connect Stripe ✅
- Step 4 "Skip for Now" redirects to `/app/dashboard` ✅
- Step 4 "Connect Stripe" redirects to `/app/connect-stripe` ✅
- `OnboardingPage.isAppPage = true` set correctly ✅
- Graceful API fallback to localStore ✅

### 9. SignUpCTA Component (`components/SignUpCTA.js`) — ✅ Working

- Links to `/app/sign-up` ✅
- Accepts `source` prop for UTM tracking ✅
- No waitlist references ✅

---

## Issues Found & Fixes Applied

| # | File | Issue | Fix |
|---|------|-------|-----|
| 1 | `pages/app/sign-up/[[...index]].js` | `afterSignUpUrl` → `/app/dashboard` (should be `/app/onboarding`) | Changed to `/app/onboarding` |
| 2 | `pages/_app.js` | `afterSignUpUrl` + `signUpForceRedirectUrl` → `/app/dashboard` | Changed both to `/app/onboarding` |
| 3 | `pages/app/sign-in/[[...index]].js` | Typo `. env.local` (space before env) | Fixed to `.env.local` |
| 4 | `components/AppLayout.js` | No auth guard — no redirect or loading state for unauthenticated users | Added `useEffect` auth guard + loading state |

---

## Build Result

```
✓ Build completed successfully
Process exited with code 0
✅ Fixed sign-up catch-all
✅ Fixed sign-in catch-all
```

---

## Complete Funnel Flow (Post-Fix)

```
/ (homepage)
  ↓ CTA: "Get Started Free →"
/app/sign-up
  ↓ After sign-up (Clerk)
/app/onboarding
  ↓ Complete setup wizard → "Skip for Now" or finish Step 4
/app/dashboard
```

---

## Recommendations

1. **Add redirect after onboarding completion**: Step 4 "Connect Stripe" leads to `/app/connect-stripe` — verify that page has a "continue to dashboard" button after connecting.

2. **Track completed onboarding**: Consider storing an `onboardingCompleted` flag in Clerk user metadata so returning users aren't redirected back through onboarding on subsequent sign-ins.

3. **Middleware can be enhanced later**: Once the project moves off `output: 'export'` to a server-rendered deployment, Clerk's `authMiddleware` can be added for true server-side route protection.

4. **Test end-to-end with real Clerk keys**: The demo mode fallback is solid, but run through the full flow with real Clerk test keys to confirm all redirect URLs work correctly.
