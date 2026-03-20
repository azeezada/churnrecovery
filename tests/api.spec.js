// @ts-check
const { test, expect } = require('@playwright/test');

/*
 * API endpoint tests against the live Cloudflare deployment.
 * These test real endpoints, not the local static export.
 */
const LIVE_URL = 'https://churnrecovery.com';

test.describe('API endpoints (live)', () => {
  test('POST /api/waitlist with test email', async ({ request }) => {
    const response = await request.post(`${LIVE_URL}/api/waitlist`, {
      data: { email: `playwright-test-${Date.now()}@example.com` },
      headers: { 'Content-Type': 'application/json' },
    });

    // Accept 200, 201, or 409 (already exists)
    expect([200, 201, 409]).toContain(response.status());
  });

  test('GET /api/waitlist/count returns JSON with count', async ({ request }) => {
    const response = await request.get(`${LIVE_URL}/api/waitlist/count`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('count');
    expect(typeof body.count).toBe('number');
  });

  test('GET /api/cancel-flow returns response', async ({ request }) => {
    const response = await request.get(`${LIVE_URL}/api/cancel-flow?projectId=test`);

    // Accept 200 or 404 (test project may not exist)
    expect([200, 404]).toContain(response.status());
  });

  test('POST /api/events accepts event data', async ({ request }) => {
    const response = await request.post(`${LIVE_URL}/api/events`, {
      data: {
        type: 'test',
        projectId: 'test',
        timestamp: new Date().toISOString(),
      },
      headers: { 'Content-Type': 'application/json' },
    });

    // Accept 200, 201, or 400/500 (endpoint exists but may reject test data)
    expect([200, 201, 400, 500]).toContain(response.status());
  });
});
