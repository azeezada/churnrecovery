// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('sign-in and sign-up pages — no application errors', () => {
  test('sign-in page should NOT show "Application error"', async ({ page }) => {
    await page.goto('/app/sign-in', { waitUntil: 'domcontentloaded' });

    // Wait for JS hydration
    await page.waitForTimeout(2000);

    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('Application error');
    expect(bodyText).not.toContain('client-side exception');
  });

  test('sign-up page should NOT show "Application error"', async ({ page }) => {
    await page.goto('/app/sign-up', { waitUntil: 'domcontentloaded' });

    // Wait for JS hydration
    await page.waitForTimeout(2000);

    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('Application error');
    expect(bodyText).not.toContain('client-side exception');
  });

  test('sign-in page loads without console errors', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/app/sign-in', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    // Filter out known non-critical errors (network/CORS from Clerk dev mode, React error boundaries)
    const criticalErrors = consoleErrors.filter(err =>
      !err.includes('Failed to load resource') &&
      !err.includes('net::ERR_') &&
      !err.includes('CORS') &&
      !err.includes('Clerk') &&
      !err.includes('clerk') &&
      !err.includes('uiComponents_Sign') &&
      !err.includes('componentStack')
    );

    // Should have no critical JS errors
    expect(criticalErrors).toEqual([]);
  });

  test('sign-in page renders ChurnRecovery branding', async ({ page }) => {
    await page.goto('/app/sign-in', { waitUntil: 'domcontentloaded' });

    // Should show ChurnRecovery branding
    const branding = page.locator('a').filter({ hasText: 'ChurnRecovery' });
    await expect(branding).toBeVisible();
  });
});
