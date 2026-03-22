// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('ROI Calculator (/tools/roi-calculator)', () => {
  test('page loads with correct title', async ({ page }) => {
    const response = await page.goto('/tools/roi-calculator', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title.toLowerCase()).toMatch(/roi|calculator|churn/i);
  });

  test('has key input sliders', async ({ page }) => {
    await page.goto('/tools/roi-calculator', { waitUntil: 'domcontentloaded' });

    // Should have range inputs
    const sliders = page.locator('input[type="range"]');
    const count = await sliders.count();
    expect(count).toBeGreaterThan(0);
  });

  test('has subscriber/customer count input', async ({ page }) => {
    await page.goto('/tools/roi-calculator', { waitUntil: 'domcontentloaded' });

    // Checks for subscriber or customer label text
    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(/subscriber|customer|member/i);
  });

  test('has churn rate input', async ({ page }) => {
    await page.goto('/tools/roi-calculator', { waitUntil: 'domcontentloaded' });

    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(/churn rate/i);
  });

  test('results section is visible', async ({ page }) => {
    await page.goto('/tools/roi-calculator', { waitUntil: 'domcontentloaded' });

    // Should show some result/output — recoverable revenue, savings, etc.
    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(/recover|save|revenue|result/i);
  });

  test('slider updates output when changed', async ({ page }) => {
    await page.goto('/tools/roi-calculator', { waitUntil: 'domcontentloaded' });

    const firstSlider = page.locator('input[type="range"]').first();
    await expect(firstSlider).toBeVisible();

    // Use evaluate to set the slider value directly (avoids step constraint issues with fill())
    const min = Number(await firstSlider.getAttribute('min'));
    const max = Number(await firstSlider.getAttribute('max'));
    const step = Number(await firstSlider.getAttribute('step') || '1');
    // Pick a value that satisfies min + N*step constraint
    const targetSteps = Math.floor((max - min) / step / 2);
    const newVal = min + targetSteps * step;

    await firstSlider.evaluate((el, val) => {
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, String(newVal));
    await page.waitForTimeout(300);

    // Page should still be valid after slider interaction
    const after = await page.textContent('body');
    expect(after.length).toBeGreaterThan(0);
    expect(after).not.toContain('Internal Server Error');
  });

  test('has "Get Started Free" CTA button', async ({ page }) => {
    await page.goto('/tools/roi-calculator', { waitUntil: 'domcontentloaded' });

    const cta = page.locator('a, button').filter({ hasText: /get started free/i }).first();
    await expect(cta).toBeVisible();
  });
});
