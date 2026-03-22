// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * CTA Consistency Tests
 * All primary CTAs should say "Get Started Free" → /app/sign-up.
 * "Join Waitlist" is legacy language and should NOT appear.
 * Spot-checks 5 key pages.
 */

const KEY_PAGES = [
  { path: '/', label: 'Homepage' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/compare/churnkey', label: 'Compare Churnkey' },
  { path: '/features', label: 'Features' },
  { path: '/demo', label: 'Demo' },
];

test.describe('CTA consistency — all primary CTAs say "Get Started Free"', () => {
  for (const { path, label } of KEY_PAGES) {
    test(`${label} (${path}) has "Get Started Free" CTA`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      // Must have at least one "Get Started Free" CTA
      const cta = page.locator('a, button').filter({ hasText: /get started free/i });
      const count = await cta.count();
      expect(count).toBeGreaterThan(0);
    });

    test(`${label} (${path}) does NOT use "Join Waitlist" CTA`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      // "Join Waitlist" is legacy — should not appear as a CTA
      const legacyCta = page.locator('a, button').filter({ hasText: /join waitlist/i });
      const count = await legacyCta.count();
      expect(count).toBe(0);
    });
  }
});
