# ChurnRecovery Security Testing Plan

**Version:** 1.0  
**Date:** March 2026  
**Coverage:** OWASP Top 10, Auth Bypass, XSS, CSRF, Rate Limiting, Injection, Clerk Configuration, Stripe Webhook  

---

## Overview

ChurnRecovery is a SaaS product built on:
- **Frontend:** Next.js 15 static export (Cloudflare Pages)
- **Backend:** Cloudflare Pages Functions (`functions/api/*.js`)
- **Auth:** Clerk v7 (client-side via `@clerk/nextjs`, server-side via RS256/ES256 JWKS)
- **Database:** Cloudflare D1 (SQLite at the edge)
- **Payments:** Stripe webhooks

This document defines the security testing strategy, discovered posture, findings, and remediation status.

---

## Architecture Security Model

### Auth Flow

```
Browser → Clerk JS (CDN) → Clerk API (clerk.com)
                          ↓
              Clerk issues short-lived JWT (RS256/ES256)
                          ↓
Browser → CF Pages Function → verifyJwt() → JWKS → userId
```

**Key properties:**
- Static HTML always returns 200 (no server-side 401 redirects from static pages)
- Auth enforcement is **client-side** for page routing (Clerk JS redirects)
- Auth enforcement is **server-side** for API calls (JWKS signature verification)
- Dev mode: `X-User-Id` header accepted from `localhost` origins only

### Database Access Pattern

All D1 queries use parameterized prepared statements:
```js
env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId).first()
```
SQL injection is prevented by design.

### Input Sanitization

`sanitizeString(str, maxLength)` in `_shared.js`:
- Strips control characters (`\x00-\x08`, `\x0B`, `\x0C`, `\x0E-\x1F`, `\x7F`)
- Enforces maximum length
- Applied to all user-supplied fields before DB writes

---

## Test Files

| File | Coverage | Requires Live API |
|------|----------|-------------------|
| `tests/security/auth-bypass.spec.js` | Client-side auth gating, secret exposure | No (local static) |
| `tests/security/api-auth.spec.js` | JWT validation, token forgery, JWKS | Yes (churnrecovery.com) |
| `tests/security/xss-prevention.spec.js` | URL param reflection, inline scripts, CSP | No + Live |
| `tests/security/cors-headers.spec.js` | CORS origin validation, CSRF via CORS | Yes (live) |
| `tests/security/rate-limiting.spec.js` | Rate limit thresholds, 429 responses | Yes (live, skip by default) |
| `tests/security/injection.spec.js` | SQL injection, oversized payloads, path traversal | Yes (live) |
| `tests/security/clerk-config.spec.js` | Clerk key validation, script source, data leakage | No + Live |
| `tests/security/stripe-webhook.spec.js` | Webhook signature, replay attacks, malformed events | Yes (live) |

---

## Security Posture Assessment

### ✅ Strengths

#### 1. JWT Verification (RS256/ES256 JWKS) — Strong
**File:** `functions/api/_shared.js` — `verifyJwt()`

- Full cryptographic signature verification against Clerk's JWKS endpoint
- `kid` (key ID) matching for multi-key rotation support
- `exp`, `nbf` claim validation
- Issuer validation (must include "clerk")
- `sub` claim presence validation
- Algorithm whitelist: RS256/384/512, ES256/384/512
- JWKS cache with 1-hour TTL to prevent excessive fetches

**Risk:** Low when `CLERK_JWKS_URL` env var is set. When not set, falls back to unverified decode with a console warning — acceptable in dev, must be remediated in production.

#### 2. SQL Injection Prevention — Strong
All D1 queries use parameterized statements. No string interpolation in SQL. Input is passed via `.bind()` which prevents injection by design.

#### 3. Rate Limiting — Present
- `/api/cancel-flow` GET: 60 req/min
- `/api/events` POST: 30 req/min  
- `/api/projects` POST: 5 req/min (creation)
- `/api/stripe-webhook` POST: 100 req/min

**Note:** Uses in-memory Map keyed by IP. Effective per-isolate but resets on worker recycle. For production scale, Cloudflare Rate Limiting rules are recommended in addition.

#### 4. Stripe Webhook Signature Verification — Strong
HMAC-SHA256 verification using constant-time comparison (prevents timing attacks). Timestamp tolerance of 5 minutes (prevents replay attacks).

#### 5. CORS Policy — Correct Design
- Authenticated endpoints: CORS restricted to `ALLOWED_ORIGINS` list
- Widget endpoints (`/api/cancel-flow` GET, `/api/events` POST): Allow any origin (required for customer embeds)
- `Vary: Origin` header present on restricted endpoints

#### 6. Input Sanitization — Present
`sanitizeString()` applied to all user-supplied fields. Field-specific validation for Stripe keys, webhook URLs, API keys.

#### 7. Project Ownership Verification — Correct
All authenticated operations verify `project.user_id === userId` before allowing reads/writes. Prevents IDOR attacks.

#### 8. Secret Stripping from API Responses — Correct
`sanitizeProject()` removes `stripe_secret_key` and `stripe_webhook_secret` before returning project data to clients.

---

### ⚠️ Findings & Recommendations

#### Finding 1: Security Headers Not Enforced at Application Layer
**Severity:** Medium  
**Status:** Informational (Cloudflare handles at CDN layer)

The Next.js static export does not set HTTP security headers in `next.config.js` because the app uses `output: 'export'` (static HTML files). Security headers must be configured via Cloudflare Pages headers or `_headers` file.

**Recommended headers to add via Cloudflare Pages `_headers` file:**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://*.clerk.com https://*.clerk.accounts.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.clerk.com https://api.stripe.com; frame-src https://js.stripe.com https://*.clerk.com;
```

**Action Required:** Create `public/_headers` for Cloudflare Pages deployment.

#### Finding 2: Dev Mode Auth Bypass (X-User-Id) — Design Risk
**Severity:** Low (localhost-only by design)  
**Status:** By Design / Monitor

The `X-User-Id` header bypass is restricted to `localhost` origins only:
```js
const isLocalDev = origin.startsWith('http://localhost')
if (isLocalDev) {
  const devUserId = request.headers.get('X-User-Id')
  if (devUserId) return devUserId
}
```

**Risk:** If the Cloudflare Worker is somehow invoked without an `Origin` header from a non-browser client pointing at production, the bypass would not trigger (no origin = no bypass). This is acceptable but should be monitored.

**Recommendation:** Consider adding an additional check: if `CLERK_JWKS_URL` is set (production), disable the dev bypass entirely.

#### Finding 3: JWKS Fallback Mode Without Crypto Verification
**Severity:** High (if `CLERK_JWKS_URL` is not set in CF Pages env)  
**Status:** Warning in console, needs production verification

When `CLERK_JWKS_URL` env var is not set, the code falls back to decoding the JWT without cryptographic verification:
```js
// WARNING in console: only structural + claims validation
const payload = JSON.parse(atob(parts[1]...))
if (!payload.iss?.includes('clerk')) return null
return payload.sub || null
```

This means **any forged JWT claiming Clerk as issuer would pass** if `CLERK_JWKS_URL` is not configured.

**Action Required:** Verify `CLERK_JWKS_URL` is set in Cloudflare Pages production environment variables.

#### Finding 4: Rate Limiting Applies After Auth Check (Projects POST)
**Severity:** Low  
**Status:** By Design / Low Risk

In `functions/api/projects.js`, the POST handler checks auth first, then rate limits:
```js
const userId = await getUserId(request, env)
if (!userId) return 401 // auth check first
const rl = rateLimit(request, ...) // rate limit second
```

This means the rate limit counter only increments for authenticated users creating projects — unauthenticated requests never count against the limit. This is intentional (rate limit protects authenticated abuse) but means:
- Unauthenticated brute-force attempts against the JWT verification are only limited by Cloudflare's global rate limiting rules

**Recommendation:** Consider adding a global rate limit for unauthenticated 401 responses to prevent JWT brute-force attempts (though RS256 JWTs are computationally infeasible to brute force, this prevents enumeration of valid users).

#### Finding 5: No Content-Security-Policy in Static HTML
**Severity:** Medium  
**Status:** Needs remediation

The Next.js static export doesn't include a CSP header. While Cloudflare can inject headers, this gap means the local dev server (`npx serve out/`) has no CSP protection.

**Recommendation:** Add `next.config.js` headers (even in static export, you can use `_headers` file deployed with Cloudflare Pages).

---

## OWASP Top 10 Coverage Matrix

| OWASP Category | Status | Test Coverage |
|---|---|---|
| A01: Broken Access Control | ✅ Covered | auth-bypass.spec.js, api-auth.spec.js |
| A02: Cryptographic Failures | ✅ Covered | clerk-config.spec.js (key exposure), api-auth.spec.js (JWKS) |
| A03: Injection | ✅ Covered | injection.spec.js |
| A04: Insecure Design | ⚠️ Partial | Finding 2 (dev bypass), Finding 3 (JWKS fallback) |
| A05: Security Misconfiguration | ⚠️ Partial | clerk-config.spec.js, Finding 1 (missing headers) |
| A06: Vulnerable Components | ℹ️ Not tested | Requires dependency audit (npm audit) |
| A07: Auth & Session Failures | ✅ Covered | api-auth.spec.js (JWT forgery, expiry, alg:none) |
| A08: Software/Data Integrity | ✅ Covered | stripe-webhook.spec.js (HMAC validation) |
| A09: Security Logging | ℹ️ By Design | console.error for failed auth, console.warn for missing config |
| A10: SSRF | ✅ Low Risk | Webhook URL validated to HTTPS only in projects.js |

---

## Running the Security Tests

### Local tests (no live server needed)
```bash
# Tests that work against the local static export
npx playwright test tests/security/auth-bypass.spec.js
npx playwright test tests/security/clerk-config.spec.js
npx playwright test tests/security/xss-prevention.spec.js
```

### Live API tests (requires production deployment)
```bash
# Tests against https://churnrecovery.com
npx playwright test tests/security/api-auth.spec.js
npx playwright test tests/security/cors-headers.spec.js
npx playwright test tests/security/injection.spec.js
npx playwright test tests/security/stripe-webhook.spec.js
```

### Rate limiting tests (manual, may affect production)
```bash
# Skipped by default — remove .skip() to run manually
npx playwright test tests/security/rate-limiting.spec.js
```

### Run all security tests
```bash
npx playwright test tests/security/
```

---

## Production Security Checklist

Before going live, verify:

- [ ] `CLERK_JWKS_URL` is set in Cloudflare Pages env vars
- [ ] `STRIPE_WEBHOOK_SECRET` is set in Cloudflare Pages env vars
- [ ] Cloudflare Pages `_headers` file sets X-Frame-Options, X-Content-Type-Options, etc.
- [ ] Cloudflare Rate Limiting rules are configured as a second layer
- [ ] Clerk publishable key is `pk_live_*` (not `pk_test_*` in production)
- [ ] No debug endpoints or dev routes exposed in production build
- [ ] `npm audit` shows no high/critical vulnerabilities in dependencies
- [ ] HSTS is enabled (Cloudflare handles this on the SSL/TLS tab)
- [ ] Clerk's "Block sign-ups" setting is configured if needed (prevent unauthorized registrations)

---

## Future Work

1. **Dependency audit:** Add `npm audit --audit-level=high` to CI
2. **SAST scan:** Integrate a static analysis tool (e.g., Semgrep) for the functions/api/ code
3. **Penetration testing:** Schedule a manual pentest after major feature releases
4. **Security headers file:** Create `public/_headers` for Cloudflare Pages deployment
5. **Automated secret scanning:** Add truffleHog or gitleaks to git pre-commit hooks
6. **JWKS fallback removal:** Once CLERK_JWKS_URL is confirmed set in all environments, remove the fallback and fail hard

---

*This document should be reviewed and updated after each significant feature addition or architecture change.*
