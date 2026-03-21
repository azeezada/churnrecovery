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

  test('has "Join Waitlist" CTA', async ({ page }) => {
    await page.goto('/for/substack', { waitUntil: 'domcontentloaded' });

    // At least one "Join Waitlist" link or button
    const cta = page.locator('a, button').filter({ hasText: /join waitlist/i }).first();
    await expect(cta).toBeVisible();
  });

  test('has a waitlist form or email capture element', async ({ page }) => {
    await page.goto('/for/substack', { waitUntil: 'domcontentloaded' });

    // Check for a form element or email input
    const form = page.locator('form');
    const emailInput = page.locator('input[type="email"]');
    const hasForm = (await form.count()) > 0;
    const hasEmailInput = (await emailInput.count()) > 0;

    // At minimum there should be a CTA link pointing to waitlist
    const waitlistLink = page.locator('a[href*="waitlist"], a[href*="tally"]');
    const hasWaitlistLink = (await waitlistLink.count()) > 0;

    expect(hasForm || hasEmailInput || hasWaitlistLink).toBe(true);
  });

  test('no error text in body', async ({ page }) => {
    await page.goto('/for/substack', { waitUntil: 'domcontentloaded' });

    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('Internal Server Error');
    expect(bodyText).not.toContain('404');
  });
});
