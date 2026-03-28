// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Helper: navigate to /demo, click the start button, and wait for the modal.
 */
async function startDemo(page) {
  await page.goto('/demo', { waitUntil: 'domcontentloaded' });
  const startBtn = page.locator('button', { hasText: 'Click to start the demo' });
  await expect(startBtn).toBeVisible();
  await startBtn.click();
  await page.waitForTimeout(400);
}

/**
 * Return the bounding box of the demo container (the relative wrapper
 * that holds the dashboard + modal overlay).
 */
async function getContainerBox(page) {
  const container = page.locator('.relative.overflow-hidden').first();
  await expect(container).toBeVisible();
  return container.boundingBox();
}

/**
 * Return the bounding box of the modal dialog.
 */
async function getModalBox(page) {
  const modal = page.locator('.bg-brand-white.rounded-2xl.w-full.max-w-\\[440px\\]').first();
  await expect(modal).toBeVisible();
  return modal.boundingBox();
}

/**
 * Assert that the modal fits entirely within the container.
 */
async function assertModalWithinContainer(page, label) {
  const containerBox = await getContainerBox(page);
  const modalBox = await getModalBox(page);

  expect(containerBox, `${label}: container should have a bounding box`).toBeTruthy();
  expect(modalBox, `${label}: modal should have a bounding box`).toBeTruthy();

  expect(modalBox.y).toBeGreaterThanOrEqual(containerBox.y);
  expect(modalBox.y + modalBox.height).toBeLessThanOrEqual(
    containerBox.y + containerBox.height + 1 // 1px tolerance for sub-pixel rounding
  );
}

test.describe('demo popup overflow', () => {
  test('modal does not overflow the demo container at step 1', async ({ page }) => {
    await startDemo(page);

    // Visual baseline screenshot
    await expect(page).toHaveScreenshot('demo-step1.png', {
      maxDiffPixelRatio: 0.01,
    });

    await assertModalWithinContainer(page, 'step1');
  });

  test('modal stays contained through all cancel flow steps', async ({ page }) => {
    await startDemo(page);

    // Step 1 - reason selection
    await assertModalWithinContainer(page, 'step1');

    // Step 2 - click a cancel reason
    const reasonBtn = page.locator('button', { hasText: "It's too expensive" });
    await reasonBtn.click();
    await page.waitForTimeout(400);
    await assertModalWithinContainer(page, 'step2-pause-offer');

    // Step 3 - decline pause offer
    const declinePause = page.locator('button', { hasText: /no thanks, continue canceling/i });
    if (await declinePause.isVisible().catch(() => false)) {
      await declinePause.click();
      await page.waitForTimeout(400);
      await assertModalWithinContainer(page, 'step3-discount-offer');
    }

    // Step 4 - decline discount
    const declineDiscount = page.locator('button', { hasText: /no thanks, I still want to cancel/i });
    if (await declineDiscount.isVisible().catch(() => false)) {
      await declineDiscount.click();
      await page.waitForTimeout(400);
      await assertModalWithinContainer(page, 'step4-exit-survey');
    }
  });

  test('saved outcome modal stays within container', async ({ page }) => {
    await startDemo(page);

    // Navigate to step 2 then accept the pause offer
    const reasonBtn = page.locator('button', { hasText: "It's too expensive" });
    await reasonBtn.click();
    await page.waitForTimeout(400);

    const pauseBtn = page.locator('button', { hasText: /pause my account/i });
    await pauseBtn.click();
    await page.waitForTimeout(400);

    await assertModalWithinContainer(page, 'saved');
  });

  test('lost outcome modal stays within container', async ({ page }) => {
    await startDemo(page);

    const skipBtn = page.locator('button', { hasText: 'Skip and cancel immediately' });
    await skipBtn.click();
    await page.waitForTimeout(400);

    await assertModalWithinContainer(page, 'lost');
  });
});

/**
 * Responsive tests: verify modal containment at mobile, tablet, and desktop widths.
 */
const viewports = [
  { label: 'mobile', width: 390, height: 844 },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'desktop', width: 1280, height: 720 },
];

for (const vp of viewports) {
  test.describe(`responsive: ${vp.label} (${vp.width}px)`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test(`modal fits container at ${vp.width}px`, async ({ page }) => {
      await startDemo(page);

      await expect(page).toHaveScreenshot(`demo-${vp.label}.png`, {
        maxDiffPixelRatio: 0.01,
      });

      await assertModalWithinContainer(page, vp.label);
    });

    test(`all steps fit container at ${vp.width}px`, async ({ page }) => {
      await startDemo(page);
      await assertModalWithinContainer(page, `${vp.label}-step1`);

      // Step 2
      const reasonBtn = page.locator('button', { hasText: "It's too expensive" });
      await reasonBtn.click();
      await page.waitForTimeout(400);
      await assertModalWithinContainer(page, `${vp.label}-step2`);

      // Step 3
      const declinePause = page.locator('button', { hasText: /no thanks, continue canceling/i });
      if (await declinePause.isVisible().catch(() => false)) {
        await declinePause.click();
        await page.waitForTimeout(400);
        await assertModalWithinContainer(page, `${vp.label}-step3`);
      }

      // Step 4
      const declineDiscount = page.locator('button', { hasText: /no thanks, I still want to cancel/i });
      if (await declineDiscount.isVisible().catch(() => false)) {
        await declineDiscount.click();
        await page.waitForTimeout(400);
        await assertModalWithinContainer(page, `${vp.label}-step4`);
      }
    });
  });
}
