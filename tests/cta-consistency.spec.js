// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * CTA Consistency Tests
 * All primary CTAs should say "Join Waitlist" — not "Get started free" or "Get Early Access".
 * Spot-checks 5 key pages.
 */

const KEY_PAGES = [
  { path: '/', label: 'Homepage' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/compare/churnkey', label: 'Compare Churnkey' },
  { path: '/features', label: 'Features' },
  { path: '/demo', label: 'Demo' },
];

test.describe('CTA consistency — all primary CTAs say "Join Waitlist"', () => {
  for (const { path, label } of KEY_PAGES) {
    test(`${label} (${path}) has "Join Waitlist" CTA`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      // Must have at least one "Join Waitlist" CTA
      const waitlistCta = page.locator('a, button').filter({ hasText: /join waitlist/i });
      const count = await waitlistCta.count();
      expect(count).toBeGreaterThan(0);
    });

    test(`${label} (${path}) does NOT use old CTAs ("Get started free" / "Get Early Access")`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      const bodyText = await page.textContent('body');

      // These old CTA phrases should not appear
      expect(bodyText).not.toMatch(/get started free/i);
      expect(bodyText).not.toMatch(/get early access/i);
    });
  }
});
