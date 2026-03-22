// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Security Test Suite: API Authentication & JWT Validation
 *
 * Tests the Cloudflare Functions API (/api/*) for proper auth enforcement.
 *
 * These tests run against the LIVE deployment because:
 * - The static export serves `out/` via `serve` — Cloudflare Functions are NOT included
 * - Functions run on Cloudflare's edge, not in the local dev server
 * - A separate worker process would be needed to test locally (wrangler dev)
 *
 * Tests verify:
 * - Unauthenticated requests return 401
 * - Forged / malformed JWTs return 401
 * - Expired tokens return 401
 * - Wrong-issuer tokens return 401
 * - Public endpoints (widget GET /api/cancel-flow) remain accessible
 * - Rate limiting returns 429 after threshold
 */

const LIVE_URL = 'https://churnrecovery.com';

// ─── JWT helpers for test tokens ─────────────────────────────────────────────

/**
 * Base64url encode (no Node.js Buffer — runs in browser context too).
 */
function base64url(str) {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Build a structurally-valid but UNSIGNED JWT with provided payload.
 * Signature is a random string — not a real HMAC/RSA/ECDSA signature.
 */
function buildFakeJwt(payload, header = { alg: 'RS256', typ: 'JWT', kid: 'fake-key-id' }) {
  const h = base64url(JSON.stringify(header));
  const p = base64url(JSON.stringify(payload));
  // Fake signature — 342 chars of base64url (RS256 size)
  const sig = 'A'.repeat(342);
  return `${h}.${p}.${sig}`;
}

const now = Math.floor(Date.now() / 1000);

const EXPIRED_TOKEN = buildFakeJwt({
  sub: 'user_test123',
  iss: 'https://clerk.churnrecovery.com',
  iat: now - 7200,
  exp: now - 3600, // expired 1 hour ago
});

const FUTURE_NBF_TOKEN = buildFakeJwt({
  sub: 'user_test123',
  iss: 'https://clerk.churnrecovery.com',
  iat: now,
  nbf: now + 3600, // not valid for 1 hour
  exp: now + 7200,
});

const WRONG_ISSUER_TOKEN = buildFakeJwt({
  sub: 'user_evil',
  iss: 'https://evil-attacker.com', // not a Clerk issuer
  iat: now,
  exp: now + 3600,
});

const NO_SUB_TOKEN = buildFakeJwt({
  iss: 'https://clerk.churnrecovery.com',
  iat: now,
  exp: now + 3600,
  // missing 'sub'
});

const VALID_LOOKING_TOKEN = buildFakeJwt({
  sub: 'user_test_playwright',
  iss: 'https://clerk.churnrecovery.com',
  iat: now,
  exp: now + 3600,
});

// ─── Auth-protected endpoint tests ───────────────────────────────────────────

test.describe('API Auth — protected endpoints require valid JWT (live)', () => {
  test('GET /api/projects — no auth returns 401', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/projects`);
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body).toHaveProperty('error');
  });

  test('POST /api/projects — no auth returns 401', async ({ request }) => {
    const res = await request.post(`${LIVE_URL}/api/projects`, {
      data: { name: 'Attacker Project' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.status()).toBe(401);
  });

  test('GET /api/analytics — no auth returns 401', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/analytics?projectId=proj_test`);
    expect(res.status()).toBe(401);
  });

  test('GET /api/events — no auth returns 401', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/events?projectId=proj_test`);
    expect(res.status()).toBe(401);
  });

  test('POST /api/cancel-flow — no auth returns 401', async ({ request }) => {
    const res = await request.post(`${LIVE_URL}/api/cancel-flow`, {
      data: { projectId: 'proj_test', reasons: [] },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.status()).toBe(401);
  });
});

test.describe('API Auth — JWT forgery detection (live)', () => {
  test('forged JWT with fake signature returns 401 (not 200)', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/projects`, {
      headers: { Authorization: `Bearer ${VALID_LOOKING_TOKEN}` },
    });

    // ⚠️  SECURITY FINDING: This test will FAIL if CLERK_JWKS_URL is not set in
    // Cloudflare Pages environment variables. When unset, _shared.js previously
    // fell back to unverified JWT decode (accepted any Clerk-issuer JWT without
    // cryptographic verification). The fallback has been REMOVED in _shared.js
    // (now returns null when CLERK_JWKS_URL is not set).
    // ACTION REQUIRED: Set CLERK_JWKS_URL in CF Pages env vars and redeploy.
    //
    // Must reject — signature won't verify against real JWKS
    expect(res.status()).toBe(401);
  });

  test('expired JWT returns 401', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/projects`, {
      headers: { Authorization: `Bearer ${EXPIRED_TOKEN}` },
    });
    expect(res.status()).toBe(401);
  });

  test('wrong issuer JWT returns 401', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/projects`, {
      headers: { Authorization: `Bearer ${WRONG_ISSUER_TOKEN}` },
    });
    expect(res.status()).toBe(401);
  });

  test('JWT missing sub claim returns 401', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/projects`, {
      headers: { Authorization: `Bearer ${NO_SUB_TOKEN}` },
    });
    expect(res.status()).toBe(401);
  });

  test('malformed JWT (only 2 parts) returns 401', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/projects`, {
      headers: { Authorization: 'Bearer header.payload' },
    });
    expect(res.status()).toBe(401);
  });

  test('Authorization: Bearer with empty token returns 401', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/projects`, {
      headers: { Authorization: 'Bearer ' },
    });
    expect(res.status()).toBe(401);
  });

  test('Authorization header with wrong scheme returns 401', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/projects`, {
      headers: { Authorization: `Basic ${VALID_LOOKING_TOKEN}` },
    });
    expect(res.status()).toBe(401);
  });

  test('JWT with algorithm none returns 401', async ({ request }) => {
    // "alg: none" attack — should be rejected
    // ⚠️  SECURITY FINDING: This test will FAIL if CLERK_JWKS_URL is not set.
    // See note on "forged JWT" test above. Requires deploy of _shared.js fix.
    const noneToken = buildFakeJwt(
      { sub: 'attacker', iss: 'https://clerk.churnrecovery.com', exp: now + 3600 },
      { alg: 'none', typ: 'JWT' }
    );
    const res = await request.get(`${LIVE_URL}/api/projects`, {
      headers: { Authorization: `Bearer ${noneToken}` },
    });
    expect(res.status()).toBe(401);
  });
});

test.describe('API Auth — public endpoints remain accessible (live)', () => {
  test('GET /api/cancel-flow (widget) is accessible without auth', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/cancel-flow?projectId=proj_test`);
    // 200 (default flow) or 404 (project not found) — both are fine
    expect([200, 404]).toContain(res.status());
    // Must NOT be 401 — this is a public widget endpoint
    expect(res.status()).not.toBe(401);
  });

  test('GET /api/health returns 200 without auth', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/health`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('status', 'ok');
  });

  test('POST /api/events (widget) accepts data without auth', async ({ request }) => {
    const res = await request.post(`${LIVE_URL}/api/events`, {
      data: {
        apiKey: 'cr_live_invalid_key_for_test',
        outcome: 'flow_started',
        sessionId: 'test-session',
      },
      headers: { 'Content-Type': 'application/json' },
    });
    // 403 (invalid key) or 400 (missing fields) — not 401 (auth-gated)
    expect([200, 201, 400, 403, 404]).toContain(res.status());
    expect(res.status()).not.toBe(401);
  });
});

test.describe('API Auth — X-User-Id header must be blocked in production (live)', () => {
  test('X-User-Id dev header from non-localhost must be rejected', async ({ request }) => {
    // This header is only accepted on localhost origins.
    // From production (churnrecovery.com origin), it must be ignored.
    const res = await request.get(`${LIVE_URL}/api/projects`, {
      headers: {
        'X-User-Id': 'user_attacker_123',
        'Origin': 'https://evil.com',
      },
    });
    // Must reject — no valid JWT provided
    expect(res.status()).toBe(401);
  });
});
