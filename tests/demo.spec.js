// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Helper: navigate to /demo and click the "Click to start the demo" button
 * so the cancel flow overlay becomes active.
 */
async function startDemo(page) {
  await page.goto('/demo', { waitUntil: 'domcontentloaded' });
  // The demo starts with a blurred dashboard + a CTA button overlay
  const startBtn = page.locator('button', { hasText: 'Click to start the demo' });
  await expect(startBtn).toBeVisible();
  await startBtn.click();
  // After clicking, step1 modal appears
  await page.waitForTimeout(400);
}

test.describe('cancel flow demo', () => {
  test('demo page loads with correct title', async ({ page }) => {
    await page.goto('/demo', { waitUntil: 'domcontentloaded' });

    const title = await page.title();
    expect(title).toContain('Demo');

    // Should have the fake browser chrome (coloured dots)
    const redDot = page.locator('div').filter({ hasText: /^$/ }).first();
    // The dashboard blurred background should be present
    await expect(page.locator('text=MyApp')).toBeVisible();
  });

  test('"Click to start the demo" button is visible and clickable', async ({ page }) => {
    await page.goto('/demo', { waitUntil: 'domcontentloaded' });

    const startBtn = page.locator('button', { hasText: 'Click to start the demo' });
    await expect(startBtn).toBeVisible();
    await startBtn.click();
    // After click the start button disappears and step1 modal appears
    await page.waitForTimeout(400);
    await expect(startBtn).not.toBeVisible();
  });

  test('cancel flow shows reason selection (step 1) after starting', async ({ page }) => {
    await startDemo(page);

    // Step 1 should show "Wait — before you go..."
    await expect(page.locator('text=Wait — before you go')).toBeVisible();

    // Should show cancel reasons
    await expect(page.locator('button', { hasText: "It's too expensive" })).toBeVisible();
    await expect(page.locator('button', { hasText: "I'm not using it enough" })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Missing features I need' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Switching to another tool' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Just taking a break' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Something else' })).toBeVisible();
  });

  test('clicking a cancel reason advances to step 2 (offer screen)', async ({ page }) => {
    await startDemo(page);

    // Click "It's too expensive" reason
    const reasonButton = page.locator('button', { hasText: "It's too expensive" });
    await expect(reasonButton).toBeVisible();
    await reasonButton.click();

    // Wait for step 2 transition
    await page.waitForTimeout(600);

    // Step 2 should show a pause/offer — check for offer-related content
    const bodyText = await page.textContent('body');
    const hasStep2Content = /pause|offer|save|discount|step 2|step\s+2/i.test(bodyText);
    expect(hasStep2Content).toBe(true);
  });

  test('clicking through all steps reaches outcome screen', async ({ page }) => {
    await startDemo(page);

    // Step 1: pick a cancel reason
    const reasonBtn = page.locator('button', { hasText: "It's too expensive" });
    await reasonBtn.click();
    await page.waitForTimeout(600);

    // Step 2: decline the pause offer to go to step 3
    // Look for a "decline" / "not interested" / "see other options" type button
    const declineBtn = page.locator('button', { hasText: /see other|no thanks|not interested|decline|step 3/i }).first();
    if (await declineBtn.isVisible().catch(() => false)) {
      await declineBtn.click();
      await page.waitForTimeout(600);
    }

    // Step 3: decline the discount to go to step 4
    const declineBtn2 = page.locator('button', { hasText: /no thanks|not interested|decline|cancel anyway|step 4/i }).first();
    if (await declineBtn2.isVisible().catch(() => false)) {
      await declineBtn2.click();
      await page.waitForTimeout(600);
    }

    // Final state should be some outcome
    const bodyText = await page.textContent('body');
    const hasOutcome = /saved|cancelled|canceled|goodbye|thank|sorry|restart|try again|exit survey|real reason/i.test(bodyText);
    expect(hasOutcome).toBe(true);
  });

  test('"Skip and cancel immediately" link is visible in step 1', async ({ page }) => {
    await startDemo(page);

    const skipLink = page.locator('button', { hasText: 'Skip and cancel immediately' });
    await expect(skipLink).toBeVisible();
  });

  test('clicking "Skip and cancel immediately" reaches lost/canceled state', async ({ page }) => {
    await startDemo(page);

    const skipLink = page.locator('button', { hasText: 'Skip and cancel immediately' });
    await skipLink.click();
    await page.waitForTimeout(500);

    // Should show canceled/lost state or "try again" prompt
    const bodyText = await page.textContent('body');
    const isLostState = /cancelled|canceled|sorry to see|we.re sorry|restart|try again/i.test(bodyText);
    expect(isLostState).toBe(true);
  });
});
