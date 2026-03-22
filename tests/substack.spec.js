// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Substack landing page (/for/substack)', () => {
  test('page loads with correct title', async ({ page }) => {
    const response = await page.goto('/for/substack', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title).toMatch(/Substack/i);
  });

  test('page mentions Substack prominently', async ({ page }) => {
    await page.goto('/for/substack', { waitUntil: 'domcontentloaded' });

    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(/Substack/i);
  });

  test('has newsletter / creator messaging', async ({ page }) => {
    await page.goto('/for/substack', { waitUntil: 'domcontentloaded' });

    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(/newsletter|creator|subscriber/i);
  });

  test('has "Get Started Free" CTA', async ({ page }) => {
    await page.goto('/for/substack', { waitUntil: 'domcontentloaded' });

    // At least one "Get Started Free" link or button
    const cta = page.locator('a, button').filter({ hasText: /get started free/i }).first();
    await expect(cta).toBeVisible();
  });

  test('has a sign-up CTA linking to /app/sign-up', async ({ page }) => {
    await page.goto('/for/substack', { waitUntil: 'domcontentloaded' });

    // Check for sign-up link
    const signUpLink = page.locator('a[href*="/app/sign-up"]');
    const count = await signUpLink.count();
    expect(count).toBeGreaterThan(0);
  });

  test('no error text in body', async ({ page }) => {
    await page.goto('/for/substack', { waitUntil: 'domcontentloaded' });

    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('Internal Server Error');
    expect(bodyText).not.toContain('404');
  });
});
