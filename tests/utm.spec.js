// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('UTM parameter capture', () => {
  test('captures utm_source from URL and stores in localStorage', async ({ page }) => {
    await page.goto('/for/substack?utm_source=reddit&utm_medium=social&utm_campaign=launch', {
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(1000);

    const stored = await page.evaluate(() => {
      const raw = localStorage.getItem('cr_utm');
      return raw ? JSON.parse(raw) : null;
    });

    expect(stored).not.toBeNull();
    expect(stored.utm_source).toBe('reddit');
    expect(stored.utm_medium).toBe('social');
    expect(stored.utm_campaign).toBe('launch');
    expect(stored.landing_page).toBe('/for/substack');
    expect(stored.captured_at).toBeTruthy();
  });

  test('preserves first-touch attribution on subsequent visits', async ({ page }) => {
    // First visit with UTM
    await page.goto('/?utm_source=google&utm_medium=cpc', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Second visit with different UTM
    await page.goto('/?utm_source=twitter&utm_medium=social', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const firstTouch = await page.evaluate(() => {
      const raw = localStorage.getItem('cr_utm');
      return raw ? JSON.parse(raw) : null;
    });

    const lastTouch = await page.evaluate(() => {
      const raw = localStorage.getItem('cr_utm_last');
      return raw ? JSON.parse(raw) : null;
    });

    // First-touch should be preserved
    expect(firstTouch.utm_source).toBe('google');
    expect(firstTouch.utm_medium).toBe('cpc');

    // Last-touch should have the newer data
    expect(lastTouch.utm_source).toBe('twitter');
    expect(lastTouch.utm_medium).toBe('social');
  });

  test('does NOT store anything when no UTM params present', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const stored = await page.evaluate(() => localStorage.getItem('cr_utm'));
    expect(stored).toBeNull();
  });

  test('captures ref param for referral tracking', async ({ page }) => {
    await page.goto('/?ref=partner123', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const stored = await page.evaluate(() => {
      const raw = localStorage.getItem('cr_utm');
      return raw ? JSON.parse(raw) : null;
    });

    expect(stored).not.toBeNull();
    expect(stored.ref).toBe('partner123');
  });

  test('UTM data persists across page navigation', async ({ page }) => {
    await page.goto('/?utm_source=newsletter', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Navigate to another page
    await page.goto('/pricing', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const stored = await page.evaluate(() => {
      const raw = localStorage.getItem('cr_utm');
      return raw ? JSON.parse(raw) : null;
    });

    expect(stored).not.toBeNull();
    expect(stored.utm_source).toBe('newsletter');
  });

  test('sign-up page has access to UTM data for Clerk metadata', async ({ page }) => {
    // Visit with UTM first
    await page.goto('/?utm_source=producthunt&utm_campaign=launch', {
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(500);

    // Then navigate to sign-up
    await page.goto('/app/sign-up', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Verify UTM is still in localStorage
    const stored = await page.evaluate(() => {
      const raw = localStorage.getItem('cr_utm');
      return raw ? JSON.parse(raw) : null;
    });

    expect(stored).not.toBeNull();
    expect(stored.utm_source).toBe('producthunt');
  });
});
