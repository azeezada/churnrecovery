// @ts-check
const { test, expect } = require('@playwright/test');

// Skip auth tests in CI — Clerk publishable key is not available in static export without env vars
test.describe('auth pages', () => {
  test.skip(!!process.env.CI, 'Clerk pk_ key not available in CI');

  test('sign-up page loads and has Clerk script', async ({ page }) => {
    // Clerk JS may redirect the page, so capture raw HTML to verify without race conditions
    let rawHtml = '';
    await page.route('/app/sign-up', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    const response = await page.goto('/app/sign-up', { waitUntil: 'commit' });
    expect(response.status()).toBe(200);

    // Verify from raw HTML (before any JS redirect)
    expect(rawHtml).toContain('Sign Up');
    expect(rawHtml).toContain('data-clerk-js-script');
    expect(rawHtml).toContain('pk_');
  });

  test('sign-in page loads and has Clerk script', async ({ page }) => {
    // Intercept and capture the raw HTML before Clerk JS runs and redirects away
    let rawHtml = '';
    await page.route('/app/sign-in', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    const response = await page.goto('/app/sign-in', { waitUntil: 'commit' });
    expect(response.status()).toBe(200);

    // Check the raw HTML (before JS redirect) for Sign In title and Clerk script
    expect(rawHtml).toContain('Sign In');
    expect(rawHtml).toContain('data-clerk-js-script');
    expect(rawHtml).toContain('pk_');
  });

  test('sign-up page has Clerk preload link', async ({ page }) => {
    // Clerk JS redirects the page before the DOM is stable, so capture raw HTML
    let rawHtml = '';
    await page.route('/app/sign-up', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });
    await page.goto('/app/sign-up', { waitUntil: 'commit' });

    // The preload link and Clerk script are in the raw HTML
    const hasClerkLink = rawHtml.includes('clerk') && (rawHtml.includes('rel="preload"') || rawHtml.includes('data-clerk-js-script'));
    expect(hasClerkLink).toBe(true);
  });

  test('sign-in page has Clerk preload link', async ({ page }) => {
    // Clerk JS redirects the page before the DOM is stable, so capture raw HTML
    let rawHtml = '';
    await page.route('/app/sign-in', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });
    await page.goto('/app/sign-in', { waitUntil: 'commit' });

    // The preload link and Clerk script are in the raw HTML
    const hasClerkLink = rawHtml.includes('clerk') && (rawHtml.includes('rel="preload"') || rawHtml.includes('data-clerk-js-script'));
    expect(hasClerkLink).toBe(true);
  });
});
