// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('auth pages', () => {
  test('sign-up page loads and has Clerk script', async ({ page }) => {
    const response = await page.goto('/app/sign-up', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);

    // Clerk is loaded via external script tag
    const clerkScript = page.locator('script[data-clerk-js-script]');
    await expect(clerkScript).toHaveCount(1);

    // Check for Clerk publishable key
    const key = await clerkScript.getAttribute('data-clerk-publishable-key');
    expect(key).toBeTruthy();
    expect(key).toContain('pk_');
  });

  test('sign-in page loads and has Clerk script', async ({ page }) => {
    const response = await page.goto('/app/sign-in', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);

    // Clerk is loaded via external script tag
    const clerkScript = page.locator('script[data-clerk-js-script]');
    await expect(clerkScript).toHaveCount(1);
  });

  test('sign-up page has Clerk preload link', async ({ page }) => {
    await page.goto('/app/sign-up', { waitUntil: 'domcontentloaded' });

    // Clerk UI preload link
    const clerkPreload = page.locator('link[href*="clerk"]');
    const count = await clerkPreload.count();
    expect(count).toBeGreaterThan(0);
  });

  test('sign-in page has Clerk preload link', async ({ page }) => {
    await page.goto('/app/sign-in', { waitUntil: 'domcontentloaded' });

    const clerkPreload = page.locator('link[href*="clerk"]');
    const count = await clerkPreload.count();
    expect(count).toBeGreaterThan(0);
  });
});
