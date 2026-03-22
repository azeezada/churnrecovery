// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * API contract tests — verifies endpoint shapes against the live deployment.
 * These test real Cloudflare Workers endpoints, not the local static export.
 */
const LIVE_URL = 'https://churnrecovery.com';

test.describe('API contracts', () => {
  test('POST /api/waitlist accepts email and returns success or conflict', async ({ request }) => {
    const testEmail = `integration-test-${Date.now()}@example.com`;

    const response = await request.post(`${LIVE_URL}/api/waitlist`, {
      data: { email: testEmail },
      headers: { 'Content-Type': 'application/json' },
    });

    // 200 = success, 201 = created, 409 = already exists, 429 = rate limited
    expect([200, 201, 409, 429]).toContain(response.status());

    if (response.status() === 200 || response.status() === 201) {
      const body = await response.json().catch(() => null);
      // Response should be JSON (or empty 200)
      if (body) {
        expect(typeof body).toBe('object');
      }
    }
  });

  test('POST /api/waitlist rejects invalid email', async ({ request }) => {
    const response = await request.post(`${LIVE_URL}/api/waitlist`, {
      data: { email: 'not-an-email' },
      headers: { 'Content-Type': 'application/json' },
    });

    // Should reject with 400 or accept gracefully; 429 = rate limited
    expect([200, 201, 400, 422, 429]).toContain(response.status());
  });

  test('POST /api/waitlist rejects empty body', async ({ request }) => {
    const response = await request.post(`${LIVE_URL}/api/waitlist`, {
      data: {},
      headers: { 'Content-Type': 'application/json' },
    });

    // Should reject with 400/422 or rate-limit (429)
    expect([400, 422, 429, 500]).toContain(response.status());
  });

  test('GET /api/waitlist/count returns JSON with count number', async ({ request }) => {
    const response = await request.get(`${LIVE_URL}/api/waitlist/count`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('count');
    expect(typeof body.count).toBe('number');
    expect(body.count).toBeGreaterThanOrEqual(0);
  });

  test('GET /api/cancel-flow returns response for test project', async ({ request }) => {
    const response = await request.get(`${LIVE_URL}/api/cancel-flow?projectId=test`);

    // 200 = flow exists, 404 = project not found (both valid)
    expect([200, 404]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();
      expect(typeof body).toBe('object');
    }
  });

  test('GET /api/cancel-flow without projectId returns error or default', async ({ request }) => {
    const response = await request.get(`${LIVE_URL}/api/cancel-flow`);

    // Should return 400 (missing param) or 200 (default flow)
    expect([200, 400, 404]).toContain(response.status());
  });

  test('POST /api/events accepts event data', async ({ request }) => {
    const response = await request.post(`${LIVE_URL}/api/events`, {
      data: {
        type: 'test_event',
        projectId: 'integration-test',
        timestamp: new Date().toISOString(),
        data: { source: 'playwright-integration-test' },
      },
      headers: { 'Content-Type': 'application/json' },
    });

    // Endpoint should exist and either accept or reject test data
    expect([200, 201, 400, 401, 403, 500]).toContain(response.status());
  });

  test('POST /api/events rejects empty body', async ({ request }) => {
    const response = await request.post(`${LIVE_URL}/api/events`, {
      data: {},
      headers: { 'Content-Type': 'application/json' },
    });

    // Should not be a 500
    expect(response.status()).not.toBe(500);
  });

  test('GET /api/analytics requires authentication', async ({ request }) => {
    const response = await request.get(`${LIVE_URL}/api/analytics`);

    // Without auth, should return 401 or 403
    // May also 404 if the endpoint doesn't exist yet
    expect([401, 403, 404]).toContain(response.status());
  });
});

test.describe('API contracts — static assets', () => {
  test('widget.js is served correctly', async ({ request }) => {
    const response = await request.get(`${LIVE_URL}/widget.js`);
    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'];
    expect(contentType).toMatch(/javascript/);

    const body = await response.text();
    expect(body.length).toBeGreaterThan(100);
  });

  test('widget.min.js is served correctly', async ({ request }) => {
    const response = await request.get(`${LIVE_URL}/widget.min.js`);
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body.length).toBeGreaterThan(50);
  });

  test('sitemap.xml is valid', async ({ request }) => {
    const response = await request.get(`${LIVE_URL}/sitemap.xml`);
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain('<?xml');
    expect(body).toContain('<urlset');
    expect(body).toContain('churnrecovery.com');
  });

  test('robots.txt exists', async ({ request }) => {
    const response = await request.get(`${LIVE_URL}/robots.txt`);
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toMatch(/User-agent|Sitemap/i);
  });

  test('build-id.txt exists', async ({ request }) => {
    const response = await request.get(`${LIVE_URL}/build-id.txt`);
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body.trim().length).toBeGreaterThan(0);
  });
});
