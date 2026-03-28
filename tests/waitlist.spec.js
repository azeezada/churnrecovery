// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('sign-up CTA on homepage', () => {
  test('homepage has "Start Free Trial" CTA linking to /app/sign-up', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const cta = page.locator('a').filter({ hasText: /start free trial/i });
    const count = await cta.count();
    expect(count).toBeGreaterThan(0);

    const href = await cta.first().getAttribute('href');
    expect(href).toContain('/app/sign-up');
  });

  test('homepage has "Sign in" link in header', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const signIn = page.locator('header a').filter({ hasText: /sign in/i });
    await expect(signIn).toBeVisible();
    const href = await signIn.getAttribute('href');
    expect(href).toBe('/app/sign-in');
  });

  test('homepage does NOT contain "Join Waitlist" language', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const bodyText = await page.textContent('body');
    expect(bodyText.toLowerCase()).not.toContain('join waitlist');
    expect(bodyText.toLowerCase()).not.toContain('join the waitlist');
  });
});
