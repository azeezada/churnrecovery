// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Tests for the /refer referral system.
 *
 * Note: The static export generates `/refer/[code].html` as a single file
 * that handles all referral codes client-side. Tests navigate to that file.
 * In production (Cloudflare Pages), any /refer/* path resolves to this page.
 */

test.describe('/refer page', () => {
  test('referral landing page has correct title in static HTML', async ({ page }) => {
    // The static file is literally named [code].html — navigate there directly
    await page.goto('/refer/%5Bcode%5D', { waitUntil: 'domcontentloaded' });

    // Page should have the invited title (set in Head regardless of code)
    await expect(page).toHaveTitle("You've been invited to ChurnRecovery");
  });

  test('referral landing page renders invitation content', async ({ page }) => {
    await page.goto('/refer/%5Bcode%5D', { waitUntil: 'networkidle' });

    // H1 heading should be visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("You've been invited to ChurnRecovery");

    // Should show Founding Member perks section
    const body = await page.content();
    expect(body).toContain('Founding Member');
  });

  test('referral landing page includes sign-up CTA after hydration', async ({ page }) => {
    await page.goto('/refer/%5Bcode%5D', { waitUntil: 'networkidle' });

    // After JS hydration, there should be a sign-up link
    const signUpLink = page.locator('a[href*="/app/sign-up"]');
    await expect(signUpLink.first()).toBeVisible({ timeout: 8000 });
  });

  test('referral link generator page loads and generates link', async ({ page }) => {
    await page.goto('/refer', { waitUntil: 'networkidle' });

    // Page should load (refer/index.html → /refer.html in static export)
    // Also check the refer.html directly
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Referral Link');

    // Should have a text input for the name/code
    const input = page.locator('input[type="text"]');
    await expect(input).toBeVisible();

    // Type a name and verify the generated URL appears
    await input.fill('dawood');

    // Wait for React state update
    await page.waitForTimeout(300);

    // Should show the referral URL in the page
    const pageContent = await page.content();
    expect(pageContent).toContain('churnrecovery.com/refer/dawood');
  });
});
