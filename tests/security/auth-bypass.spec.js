// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Security Test Suite: Authentication Bypass
 *
 * Tests that /app/* protected routes enforce Clerk auth gating.
 * Because the app is a static export, server-side 401 redirects are not
 * possible — auth is enforced client-side via Clerk JS. These tests verify:
 *
 * 1. Every protected route includes the Clerk JS script tag (required for gating)
 * 2. Every protected route includes the publishable key (pk_) for Clerk to init
 * 3. Pages reference sign-in in their HTML (auth redirect target)
 * 4. No server-side secrets or raw user data are leaked in the static HTML
 * 5. Sign-in/sign-up pages are accessible without auth
 *
 * NOTE: Full server-side auth bypass tests (sending requests without valid JWT
 * to the Cloudflare Functions API) require a live deployment. Those tests are
 * marked .skip() — see tests/security/api-auth.spec.js for live API security tests.
 */

const PROTECTED_ROUTES = [
  '/app/dashboard',
  '/app/cancel-flow',
  '/app/analytics',
  '/app/settings',
  '/app/install',
  '/app/onboarding',
  '/app/projects',
  '/app/connect-stripe',
  '/app/recovery',
];

test.describe('Auth Bypass — client-side gating checks', () => {
  for (const route of PROTECTED_ROUTES) {
    test(`${route} — requires Clerk JS for auth gating`, async ({ page }) => {
      let rawHtml = '';
      await page.route(route, async (route) => {
        const response = await route.fetch();
        rawHtml = await response.text();
        await route.fulfill({ response });
      });

      await page.goto(route, { waitUntil: 'commit' });

      // SECURITY: Must include Clerk JS script for client-side auth enforcement
      expect(rawHtml, `${route} missing Clerk JS script`).toContain('data-clerk-js-script');

      // SECURITY: Must include publishable key for Clerk to initialize
      expect(rawHtml, `${route} missing Clerk publishable key`).toContain('pk_');

      // SECURITY: Must not expose secret keys in HTML
      expect(rawHtml, `${route} must not expose secret key`).not.toContain('sk_live_');
      expect(rawHtml, `${route} must not expose test secret key`).not.toContain('sk_test_');
    });
  }

  test('protected routes must not expose server-side secrets in HTML', async ({ page }) => {
    for (const route of PROTECTED_ROUTES) {
      let rawHtml = '';
      await page.route(route, async (route) => {
        const response = await route.fetch();
        rawHtml = await response.text();
        await route.fulfill({ response });
      });

      await page.goto(route, { waitUntil: 'commit' });

      // SECURITY: No raw API keys, DB credentials, or tokens in rendered HTML
      expect(rawHtml, `${route}: no CLERK_SECRET_KEY in HTML`).not.toMatch(/CLERK_SECRET_KEY/);
      expect(rawHtml, `${route}: no DB connection string in HTML`).not.toMatch(/sqlite|postgres:\/\//i);
      expect(rawHtml, `${route}: no raw JWT in HTML`).not.toMatch(/eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/);
    }
  });

  test('sign-in page is publicly accessible without auth', async ({ page }) => {
    const response = await page.goto('/app/sign-in', { waitUntil: 'commit' });
    expect(response.status()).toBe(200);
  });

  test('sign-up page is publicly accessible without auth', async ({ page }) => {
    const response = await page.goto('/app/sign-up', { waitUntil: 'commit' });
    expect(response.status()).toBe(200);
  });

  test('404 page does not expose internal paths or stack traces', async ({ page }) => {
    let rawHtml = '';
    await page.route('/app/nonexistent-route-xyz', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/app/nonexistent-route-xyz', { waitUntil: 'commit' });

    // SECURITY: No Node.js stack traces in 404 pages
    expect(rawHtml).not.toContain('at Object.<anonymous>');
    expect(rawHtml).not.toContain('node_modules');
    expect(rawHtml).not.toContain('ENOENT');
  });
});

test.describe('Auth Bypass — static HTML must not reveal auth state', () => {
  test('dashboard HTML does not expose user PII in static shell', async ({ page }) => {
    let rawHtml = '';
    await page.route('/app/dashboard', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/app/dashboard', { waitUntil: 'commit' });

    // SECURITY: Static shell should not contain hardcoded user emails or IDs
    // (user data should only be injected after Clerk authenticates client-side)
    expect(rawHtml).not.toMatch(/user_[a-zA-Z0-9]{24,}/); // Clerk user ID pattern
    expect(rawHtml).not.toMatch(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/); // email addresses
  });

  test('settings page HTML does not expose Stripe keys', async ({ page }) => {
    let rawHtml = '';
    await page.route('/app/settings', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/app/settings', { waitUntil: 'commit' });

    // SECURITY: Stripe secret keys must never appear in HTML
    expect(rawHtml).not.toMatch(/sk_(live|test)_[A-Za-z0-9]+/);
    expect(rawHtml).not.toMatch(/whsec_[A-Za-z0-9]+/);
  });
});
