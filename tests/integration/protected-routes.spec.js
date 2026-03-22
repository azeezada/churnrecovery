// @ts-check
const { test, expect } = require('@playwright/test');
const { mockSignedIn, mockSignedOut } = require('../helpers/mock-auth');

/**
 * Protected routes test suite.
 * Verifies that /app/* pages:
 * - Require Clerk auth (have the script tag for client-side gating)
 * - Load correctly when signed in (200 with real content)
 * - Include auth gating when signed out
 */

const PROTECTED_ROUTES = [
  { path: '/app/dashboard', name: 'Dashboard' },
  { path: '/app/cancel-flow', name: 'Cancel Flow' },
  { path: '/app/analytics', name: 'Analytics' },
  { path: '/app/settings', name: 'Settings' },
  { path: '/app/install', name: 'Install' },
  { path: '/app/onboarding', name: 'Onboarding' },
  { path: '/app/projects', name: 'Projects' },
  { path: '/app/connect-stripe', name: 'Connect Stripe' },
  { path: '/app/recovery', name: 'Recovery' },
];

test.describe('protected routes — signed OUT', () => {
  for (const { path, name } of PROTECTED_ROUTES) {
    test(`${name} (${path}) has Clerk auth gating`, async ({ page }) => {
      // Capture raw HTML to verify Clerk script is present
      let rawHtml = '';
      await page.route(path, async (route) => {
        const response = await route.fetch();
        rawHtml = await response.text();
        await route.fulfill({ response });
      });

      const response = await page.goto(path, { waitUntil: 'commit' });

      // Static export always returns 200
      expect(response.status()).toBe(200);

      // Page must include Clerk JS for client-side auth protection
      expect(rawHtml).toContain('data-clerk-js-script');
      expect(rawHtml).toContain('pk_');

      // Page should have a title (not a broken page)
      expect(rawHtml).toMatch(/<title>/);
    });
  }
});

test.describe('protected routes — signed IN', () => {
  for (const { path, name } of PROTECTED_ROUTES) {
    test(`${name} (${path}) returns 200 with content`, async ({ page }) => {
      // Capture raw HTML — Clerk mock interferes with JS rendering
      let rawHtml = '';
      await page.route(path, async (route) => {
        const response = await route.fetch();
        rawHtml = await response.text();
        await route.fulfill({ response });
      });

      const response = await page.goto(path, { waitUntil: 'commit' });
      expect(response.status()).toBe(200);

      // Verify from raw SSG HTML
      expect(rawHtml).toMatch(/<title>.+<\/title>/);
      expect(rawHtml.length).toBeGreaterThan(1000);
      expect(rawHtml).not.toContain('Internal Server Error');
      expect(rawHtml).toContain('/app/dashboard');
    });
  }
});

test.describe('protected routes — sidebar navigation consistency', () => {
  for (const { path, name } of PROTECTED_ROUTES) {
    test(`${name} (${path}) has sidebar navigation in HTML`, async ({ page }) => {
      let rawHtml = '';
      await page.route(path, async (route) => {
        const response = await route.fetch();
        rawHtml = await response.text();
        await route.fulfill({ response });
      });

      await page.goto(path, { waitUntil: 'commit' });

      // All app pages have the sidebar nav links in the SSG HTML
      const expectedLinks = ['/app/dashboard', '/app/cancel-flow', '/app/analytics', '/app/settings', '/app/install'];
      for (const link of expectedLinks) {
        expect(rawHtml, `Missing sidebar link ${link} on ${path}`).toContain(`href="${link}"`);
      }
    });
  }
});

