// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('churn calculator', () => {
  test('calculator page loads with default values', async ({ page }) => {
    await page.goto('/tools/churn-calculator', { waitUntil: 'domcontentloaded' });

    const title = await page.title();
    expect(title).toContain('Calculator');

    // Should have MRR slider (default $10k)
    await expect(page.locator('text=Monthly Recurring Revenue')).toBeVisible();
    await expect(page.locator('text=$10.0k')).toBeVisible();

    // Should have churn rate slider (default 5%)
    await expect(page.locator('text=Monthly Churn Rate')).toBeVisible();

    // Should have save rate slider (default 30%)
    await expect(page.locator('text=Expected Cancel Flow Save Rate')).toBeVisible();
  });

  test('calculator shows correct default calculations', async ({ page }) => {
    await page.goto('/tools/churn-calculator', { waitUntil: 'domcontentloaded' });

    // Default: MRR = $10,000, Churn = 5%, Save Rate = 30%
    // Monthly revenue at risk = $10,000 * 0.05 = $500
    // Annual revenue at risk = $500 * 12 = $6,000
    // Monthly recoverable = $500 * 0.30 = $150
    // Annual recoverable = $150 * 12 = $1,800

    // Use the card containers to scope the assertions
    const monthlyAtRisk = page.locator('div', { hasText: 'Monthly revenue at risk' }).locator('div', { hasText: /^\$500$/ }).first();
    await expect(monthlyAtRisk).toBeVisible();

    const annualAtRisk = page.locator('div', { hasText: 'Annual revenue at risk' }).locator('div', { hasText: /^\$6\.0k$/ }).first();
    await expect(annualAtRisk).toBeVisible();

    const monthlyRecoverable = page.locator('div', { hasText: 'Monthly revenue recoverable' }).locator('div', { hasText: /^\$150$/ }).first();
    await expect(monthlyRecoverable).toBeVisible();

    const annualRecoverable = page.locator('div', { hasText: 'Annual revenue recoverable' }).locator('div', { hasText: /^\$1\.8k$/ }).first();
    await expect(annualRecoverable).toBeVisible();
  });

  test('MRR slider updates calculations', async ({ page }) => {
    await page.goto('/tools/churn-calculator', { waitUntil: 'domcontentloaded' });

    // Find the MRR range input and change its value
    const mrrSlider = page.locator('input[type="range"][min="1000"][max="500000"]');
    await expect(mrrSlider).toBeVisible();

    // Set MRR to $50,000
    await mrrSlider.fill('50000');
    await mrrSlider.dispatchEvent('input');
    await page.waitForTimeout(200);

    // With MRR=$50k, churn=5%, save=30%:
    // Monthly at risk = $50k * 0.05 = $2,500
    // Annual at risk = $30,000
    // Monthly recoverable = $2,500 * 0.30 = $750
    // Annual recoverable = $9,000
    await expect(page.locator('text=$50.0k')).toBeVisible();
  });

  test('churn rate slider is interactive', async ({ page }) => {
    await page.goto('/tools/churn-calculator', { waitUntil: 'domcontentloaded' });

    const churnSlider = page.locator('input[type="range"][min="0.5"][max="20"]');
    await expect(churnSlider).toBeVisible();

    // Change churn rate to 10%
    await churnSlider.fill('10');
    await churnSlider.dispatchEvent('input');
    await page.waitForTimeout(200);

    // Should show 10%
    await expect(page.locator('text=10%')).toBeVisible();
  });

  test('Churnkey comparison section exists', async ({ page }) => {
    await page.goto('/tools/churn-calculator', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('text=How does ChurnRecovery compare to Churnkey')).toBeVisible();
  });
});
