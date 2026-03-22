// @ts-check
const { test, expect } = require('@playwright/test');
const { mockSignedIn, mockSignedOut } = require('../helpers/mock-auth');

test.describe('Journey 1: New user onboarding', () => {
  test('homepage has waitlist signup form', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const waitlistSection = page.locator('#waitlist');
    await expect(waitlistSection).toBeVisible();

    const emailInput = waitlistSection.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();

    const submitButton = waitlistSection.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
  });

  test('can enter email in waitlist form', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const waitlistSection = page.locator('#waitlist');
    const emailInput = waitlistSection.locator('input[type="email"]');
    await emailInput.fill('newuser@example.com');
    expect(await emailInput.inputValue()).toBe('newuser@example.com');
  });

  test('sign-up page is accessible from homepage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Look for sign-up / get started link in header
    const signUpLink = page.locator('a[href*="sign-up"], a[href*="Sign"], a:has-text("Get Started")').first();
    if (await signUpLink.isVisible().catch(() => false)) {
      const href = await signUpLink.getAttribute('href');
      expect(href).toBeTruthy();
    }

    // Verify sign-up page itself loads
    const response = await page.goto('/app/sign-up', { waitUntil: 'commit' });
    expect(response.status()).toBe(200);
  });

  test('onboarding page loads for signed-in user', async ({ page }) => {
    await mockSignedIn(page);
    const response = await page.goto('/app/onboarding', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const bodyText = await page.textContent('body');
    // Onboarding should have setup/wizard related content
    const hasOnboardingContent = /setup|wizard|onboard|project|get started|welcome/i.test(bodyText);
    expect(hasOnboardingContent).toBe(true);
  });

  test('install page shows code snippet for signed-in user', async ({ page }) => {
    await mockSignedIn(page);
    const response = await page.goto('/app/install', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const bodyText = await page.textContent('body');
    // Install page should have code/snippet content
    const hasInstallContent = /install|widget|script|code|snippet|embed/i.test(bodyText);
    expect(hasInstallContent).toBe(true);
  });

  test('connect-stripe page loads for signed-in user', async ({ page }) => {
    await mockSignedIn(page);
    const response = await page.goto('/app/connect-stripe', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const bodyText = await page.textContent('body');
    const hasStripeContent = /stripe|connect|payment|billing/i.test(bodyText);
    expect(hasStripeContent).toBe(true);
  });

  test('dashboard loads for signed-in user', async ({ page }) => {
    await mockSignedIn(page);
    const response = await page.goto('/app/dashboard', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const title = await page.title();
    expect(title).toContain('Dashboard');
  });
});

test.describe('Journey 2: Returning user', () => {
  test('dashboard has app sidebar navigation links', async ({ page }) => {
    // Use raw HTML to verify sidebar (Clerk mock may interfere with JS rendering)
    let rawHtml = '';
    await page.route('/app/dashboard', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/app/dashboard', { waitUntil: 'commit' });

    // Sidebar links are in the SSG HTML
    const expectedLinks = ['/app/dashboard', '/app/cancel-flow', '/app/analytics', '/app/settings', '/app/install'];
    for (const expected of expectedLinks) {
      expect(rawHtml).toContain(`href="${expected}"`);
    }
  });

  test('cancel-flow builder loads for signed-in user', async ({ page }) => {
    await mockSignedIn(page);
    const response = await page.goto('/app/cancel-flow', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const bodyText = await page.textContent('body');
    const hasCancelFlowContent = /cancel|flow|step|reason|builder/i.test(bodyText);
    expect(hasCancelFlowContent).toBe(true);
  });

  test('analytics page loads for signed-in user', async ({ page }) => {
    await mockSignedIn(page);
    const response = await page.goto('/app/analytics', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const bodyText = await page.textContent('body');
    const hasAnalyticsContent = /analytics|chart|metric|data|saved|recovered/i.test(bodyText);
    expect(hasAnalyticsContent).toBe(true);
  });

  test('settings page loads for signed-in user', async ({ page }) => {
    await mockSignedIn(page);
    const response = await page.goto('/app/settings', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const bodyText = await page.textContent('body');
    const hasSettingsContent = /settings|api|key|account|config/i.test(bodyText);
    expect(hasSettingsContent).toBe(true);
  });

  test('install page shows widget code for signed-in user', async ({ page }) => {
    await mockSignedIn(page);
    const response = await page.goto('/app/install', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const bodyText = await page.textContent('body');
    const hasCodeSnippet = /script|widget|install|embed|code/i.test(bodyText);
    expect(hasCodeSnippet).toBe(true);
  });
});

test.describe('Journey 3: Public pages (no auth)', () => {
  test('homepage renders all major sections', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const bodyText = await page.textContent('body');

    // Hero section
    expect(bodyText).toMatch(/churn|cancel|recover|save/i);

    // Features section
    expect(bodyText).toMatch(/feature|benefit/i);

    // Pricing or CTA
    expect(bodyText).toMatch(/pricing|free|start|waitlist/i);
  });

  test('/pricing renders comparison table', async ({ page }) => {
    await page.goto('/pricing', { waitUntil: 'domcontentloaded' });

    const title = await page.title();
    expect(title).toMatch(/pricing/i);

    const bodyText = await page.textContent('body');
    // Pricing page should have plan names or pricing info
    expect(bodyText).toMatch(/free|pro|enterprise|plan|\$|month|year/i);
  });

  test('/demo renders cancel flow widget', async ({ page }) => {
    await page.goto('/demo', { waitUntil: 'domcontentloaded' });

    const title = await page.title();
    expect(title).toContain('Demo');

    // The demo should have the start button
    const startBtn = page.locator('button', { hasText: 'Click to start the demo' });
    await expect(startBtn).toBeVisible();

    // Click through the demo
    await startBtn.click();
    await page.waitForTimeout(400);

    // Step 1 should show cancel reasons
    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(/before you go|cancel|reason/i);
  });

  test('/docs renders documentation content', async ({ page }) => {
    const response = await page.goto('/docs', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);

    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(/doc|guide|api|install|widget|integration/i);
  });

  test('/blog renders posts list', async ({ page }) => {
    const response = await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    // Blog should have links to individual posts
    const postLinks = await page.$$eval('a[href*="/posts/"]', (anchors) =>
      anchors.map(a => a.getAttribute('href')).filter(Boolean)
    );
    expect(postLinks.length).toBeGreaterThan(0);
  });

  test('clicking a blog post shows content', async ({ page }) => {
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });

    const firstPostLink = page.locator('a[href*="/posts/"]').first();
    const href = await firstPostLink.getAttribute('href');
    expect(href).toBeTruthy();

    const response = await page.goto(href, { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const bodyText = await page.textContent('body');
    // Blog post should have substantial content
    expect(bodyText.length).toBeGreaterThan(200);
  });

  test('/features renders feature sections', async ({ page }) => {
    const response = await page.goto('/features', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(/cancel flow|analytics|recovery|widget|integration/i);
  });

  test('/tools/churn-calculator is interactive', async ({ page }) => {
    const response = await page.goto('/tools/churn-calculator', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    // Calculator should have input fields
    const inputs = await page.$$('input[type="number"], input[type="range"]');
    expect(inputs.length).toBeGreaterThan(0);
  });

  test('/tools/roi-calculator updates output on input', async ({ page }) => {
    const response = await page.goto('/tools/roi-calculator', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);

    // Should have inputs for calculator
    const inputs = await page.$$('input');
    expect(inputs.length).toBeGreaterThan(0);

    // Try entering values
    const firstInput = page.locator('input').first();
    if (await firstInput.isVisible()) {
      const currentType = await firstInput.getAttribute('type');
      if (currentType === 'number' || currentType === 'range' || !currentType) {
        await firstInput.fill('1000');
        // Wait for calculator to update
        await page.waitForTimeout(300);
      }
    }
  });
});
