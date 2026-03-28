// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * CTA Consistency Tests
 * All primary CTAs should say "Start Free Trial" → /app/sign-up.
 * "Join Waitlist" and "Get Started Free" are legacy language.
 * Spot-checks 5 key pages.
 */

const KEY_PAGES = [
  { path: '/', label: 'Homepage' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/compare/churnkey', label: 'Compare Churnkey' },
  { path: '/features', label: 'Features' },
  { path: '/demo', label: 'Demo' },
];

test.describe('CTA consistency — all primary CTAs say "Start Free Trial"', () => {
  for (const { path, label } of KEY_PAGES) {
    test(`${label} (${path}) has "Start Free Trial" CTA`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      const cta = page.locator('a, button').filter({ hasText: /start free trial/i });
      const count = await cta.count();
      expect(count).toBeGreaterThan(0);
    });

    test(`${label} (${path}) does NOT use legacy CTAs`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      const legacyCta = page.locator('a, button').filter({ hasText: /join waitlist|get started free/i });
      const count = await legacyCta.count();
      expect(count).toBe(0);
    });
  }
});
