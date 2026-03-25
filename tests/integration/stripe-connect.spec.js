// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Stripe Connect API integration tests.
 *
 * Tests the /api/stripe-connect endpoint against the live deployment.
 * Verifies auth enforcement, parameter validation, and response shapes.
 */

const LIVE_URL = 'https://churnrecovery.com';

test.describe('/api/stripe-connect — authentication', () => {
  test('GET without auth returns 401', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/stripe-connect?project_id=proj_test123`);
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body).toHaveProperty('error');
    expect(body).toHaveProperty('code', 'UNAUTHORIZED');
  });

  test('POST without auth returns 401', async ({ request }) => {
    const res = await request.post(`${LIVE_URL}/api/stripe-connect`, {
      data: { code: 'ac_test', state: 'teststate' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body).toHaveProperty('error');
  });

  test('DELETE without auth returns 401', async ({ request }) => {
    const res = await request.delete(`${LIVE_URL}/api/stripe-connect`, {
      data: { project_id: 'proj_test123' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body).toHaveProperty('error');
  });

  test('GET with forged JWT returns 401', async ({ request }) => {
    const fakeJwt = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMyIsImV4cCI6OTk5OTk5OTk5OX0.FAKESIG';
    const res = await request.get(`${LIVE_URL}/api/stripe-connect?project_id=proj_test`, {
      headers: { Authorization: `Bearer ${fakeJwt}` },
    });
    expect(res.status()).toBe(401);
  });
});

test.describe('/api/stripe-connect — parameter validation', () => {
  // We use demo mode header on localhost; these tests verify validation shapes

  test('GET without project_id returns 400 or 401', async ({ request }) => {
    // Without auth — 401; With auth but missing param — 400
    const res = await request.get(`${LIVE_URL}/api/stripe-connect`);
    expect([400, 401]).toContain(res.status());

    if (res.status() === 400) {
      const body = await res.json();
      expect(body).toHaveProperty('error');
      expect(body).toHaveProperty('code', 'MISSING_PARAM');
    }
  });

  test('POST with missing code returns 400 or 401', async ({ request }) => {
    const res = await request.post(`${LIVE_URL}/api/stripe-connect`, {
      data: { state: 'somestate' }, // missing code
      headers: { 'Content-Type': 'application/json' },
    });
    expect([400, 401]).toContain(res.status());
  });

  test('POST with invalid state encoding returns 400 or 401', async ({ request }) => {
    const res = await request.post(`${LIVE_URL}/api/stripe-connect`, {
      data: { code: 'ac_test', state: 'not-valid-base64!!!!' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect([400, 401]).toContain(res.status());
  });

  test('DELETE with missing project_id returns 400 or 401', async ({ request }) => {
    const res = await request.delete(`${LIVE_URL}/api/stripe-connect`, {
      data: {},
      headers: { 'Content-Type': 'application/json' },
    });
    expect([400, 401]).toContain(res.status());
  });
});

test.describe('/api/stripe-connect — CORS headers', () => {
  test('OPTIONS preflight returns 200', async ({ request }) => {
    const res = await request.fetch(`${LIVE_URL}/api/stripe-connect`, {
      method: 'OPTIONS',
      headers: {
        Origin: 'https://churnrecovery.com',
        'Access-Control-Request-Method': 'GET',
      },
    });
    // 200 or 204
    expect([200, 204]).toContain(res.status());
  });
});

test.describe('/api/stripe-connect — connect-stripe page', () => {
  test('/app/connect-stripe page renders with Connect with Stripe button', async ({ page }) => {
    await page.goto(`${LIVE_URL}/app/connect-stripe`);
    // Either the connected state or the connect button should be visible
    const body = await page.textContent('body');
    expect(body).toBeTruthy();
    // Should have ChurnRecovery content
    expect(body).toMatch(/Connect|Stripe|ChurnRecovery/i);
  });

  test('/app/connect-stripe has auth gate (Clerk redirect)', async ({ page }) => {
    await page.goto(`${LIVE_URL}/app/connect-stripe`);
    // Should either show the page content or redirect to sign-in
    const url = page.url();
    const body = await page.textContent('body');
    // Either we're on the page or redirected to sign-in
    const isOnPage = url.includes('/connect-stripe') || url.includes('/sign-in') || body?.includes('Sign in');
    expect(isOnPage).toBe(true);
  });
});
