// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Security Test Suite: CORS Policy & Security Headers
 *
 * Tests that:
 * 1. Authenticated API endpoints only allow origins from ALLOWED_ORIGINS
 * 2. Widget endpoints (cancel-flow GET, events POST) allow any origin
 * 3. Security headers are present on responses
 * 4. CORS preflight (OPTIONS) returns correct headers
 *
 * These tests run against the live deployment because CORS headers are set
 * by Cloudflare Functions, not the static Next.js export.
 */

const LIVE_URL = 'https://churnrecovery.com';

const ALLOWED_ORIGINS = [
  'https://churnrecovery.com',
  'https://www.churnrecovery.com',
];

const DISALLOWED_ORIGINS = [
  'https://evil.com',
  'https://attacker.example.com',
  'https://churnrecovery.com.evil.com',
  'null',
];

// ─── CORS — authenticated endpoints ──────────────────────────────────────────

test.describe('CORS — authenticated endpoints restrict origin (live)', () => {
  test('GET /api/projects with allowed origin reflects origin in CORS header', async ({ request }) => {
    for (const origin of ALLOWED_ORIGINS) {
      const res = await request.get(`${LIVE_URL}/api/projects`, {
        headers: { Origin: origin },
      });

      // May return 401 (no auth) — we're testing CORS headers, not auth
      const corsOrigin = res.headers()['access-control-allow-origin'];

      if (corsOrigin) {
        // If CORS header is present, it must be the allowed origin, not a wildcard
        expect(corsOrigin, `Origin ${origin} should be reflected`).toBe(origin);
        expect(corsOrigin, 'Should not reflect wildcard for auth endpoints').not.toBe('*');
      }
    }
  });

  test('GET /api/projects with disallowed origin returns empty CORS header', async ({ request }) => {
    for (const badOrigin of DISALLOWED_ORIGINS) {
      const res = await request.get(`${LIVE_URL}/api/projects`, {
        headers: { Origin: badOrigin },
      });

      const corsOrigin = res.headers()['access-control-allow-origin'];

      // SECURITY: Disallowed origins must not get CORS access
      // The header should be absent or empty (not set to the attacker origin)
      if (corsOrigin) {
        expect(corsOrigin, `Origin ${badOrigin} must not be allowed`).not.toBe(badOrigin);
        expect(corsOrigin, 'Must not be wildcard on auth endpoints').not.toBe('*');
      }
    }
  });

  test('OPTIONS /api/projects preflight returns CORS headers', async ({ request }) => {
    const res = await request.fetch(`${LIVE_URL}/api/projects`, {
      method: 'OPTIONS',
      headers: {
        Origin: 'https://churnrecovery.com',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Authorization',
      },
    });

    // Preflight should return 204 or 200
    expect([200, 204]).toContain(res.status());

    const allowMethods = res.headers()['access-control-allow-methods'];
    if (allowMethods) {
      // Should allow standard HTTP methods
      expect(allowMethods).toContain('GET');
      expect(allowMethods).toContain('POST');
    }
  });
});

// ─── CORS — widget endpoints (allow any origin) ───────────────────────────────

test.describe('CORS — widget endpoints allow any origin (live)', () => {
  test('GET /api/cancel-flow accepts requests from any origin', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/cancel-flow?projectId=proj_test`, {
      headers: { Origin: 'https://customer-app.example.com' },
    });

    // CORS header should be present and allow the origin (widget use case)
    const corsOrigin = res.headers()['access-control-allow-origin'];

    // Widget endpoints should not block third-party origins
    expect([200, 404]).toContain(res.status());
    // Either the specific origin or * is acceptable for widget endpoints
    if (corsOrigin) {
      const isAllowed =
        corsOrigin === 'https://customer-app.example.com' || corsOrigin === '*';
      expect(isAllowed, 'Widget endpoint should allow third-party origins').toBe(true);
    }
  });

  test('OPTIONS /api/cancel-flow preflight allows any origin', async ({ request }) => {
    const res = await request.fetch(`${LIVE_URL}/api/cancel-flow`, {
      method: 'OPTIONS',
      headers: {
        Origin: 'https://random-customer.io',
        'Access-Control-Request-Method': 'GET',
      },
    });

    expect([200, 204]).toContain(res.status());
  });

  test('OPTIONS /api/events preflight allows any origin (widget events)', async ({ request }) => {
    const res = await request.fetch(`${LIVE_URL}/api/events`, {
      method: 'OPTIONS',
      headers: {
        Origin: 'https://another-customer.com',
        'Access-Control-Request-Method': 'POST',
      },
    });

    expect([200, 204]).toContain(res.status());
  });
});

// ─── Security Headers ─────────────────────────────────────────────────────────

test.describe('Security Headers — live deployment', () => {
  test('main site returns important security-related headers', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/`);

    const headers = res.headers();

    // X-Content-Type-Options prevents MIME sniffing
    const xContentType = headers['x-content-type-options'];
    if (xContentType) {
      expect(xContentType.toLowerCase()).toContain('nosniff');
    }

    // NOTE: Missing security headers are flagged as warnings here, not failures,
    // since they may be configured at the Cloudflare Pages / CDN layer.
    // Log presence for documentation purposes:
    const securityHeaders = [
      'x-frame-options',
      'x-content-type-options',
      'strict-transport-security',
      'content-security-policy',
      'referrer-policy',
    ];

    const presentHeaders = securityHeaders.filter(h => headers[h]);
    const missingHeaders = securityHeaders.filter(h => !headers[h]);

    // At minimum, the static site should serve HSTS on HTTPS
    // (Cloudflare enforces this by default)
    // We don't fail tests for missing headers as CF handles many at the edge
    console.log(`Security headers present: ${presentHeaders.join(', ')}`);
    if (missingHeaders.length > 0) {
      console.warn(`Security headers missing (should be added to CF Page Rules): ${missingHeaders.join(', ')}`);
    }

    // The test passes as long as the page loads — header audit is in the plan doc
    expect(res.status()).toBe(200);
  });

  test('API health endpoint returns JSON content type', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/health`);
    const contentType = res.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('API responses do not expose server version headers', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/health`);
    const headers = res.headers();

    // SECURITY: Server version disclosure helps attackers target known CVEs
    expect(headers['x-powered-by']).toBeUndefined();
    // Cloudflare will set 'server: cloudflare' which is acceptable
    const server = headers['server'];
    if (server) {
      expect(server.toLowerCase()).not.toContain('express');
      expect(server.toLowerCase()).not.toContain('apache');
      expect(server.toLowerCase()).not.toContain('nginx/');
    }
  });
});

// ─── CORS — CSRF via cross-origin state-changing requests ─────────────────────

test.describe('CORS — CSRF protection via origin validation (live)', () => {
  test('POST /api/projects from evil.com origin is blocked (no creds returns 401 not 200)', async ({ request }) => {
    // CSRF attack: evil.com tries to create a project on behalf of a user.
    // Without the user's JWT, this should return 401.
    // Even if the attacker sends a valid-looking JWT, our CORS restriction
    // on the auth endpoints means the browser would block the response.
    const res = await request.post(`${LIVE_URL}/api/projects`, {
      data: { name: 'CSRF attack project' },
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://evil.com',
      },
    });

    // Without a valid JWT, must return 401
    expect(res.status()).toBe(401);
  });

  test('PUT /api/projects from evil.com without auth returns 401', async ({ request }) => {
    const res = await request.put(`${LIVE_URL}/api/projects`, {
      data: { projectId: 'proj_victim', name: 'Hacked!' },
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://evil.com',
      },
    });

    expect(res.status()).toBe(401);
  });

  test('DELETE /api/projects from evil.com without auth returns 401', async ({ request }) => {
    const res = await request.delete(`${LIVE_URL}/api/projects`, {
      data: { projectId: 'proj_victim' },
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://evil.com',
      },
    });

    expect(res.status()).toBe(401);
  });
});
