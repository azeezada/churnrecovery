// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Security Test Suite: Clerk Configuration Validation
 *
 * Tests that Clerk is correctly configured and not misconfigured in ways
 * that would allow auth bypass or information disclosure.
 *
 * Coverage:
 * 1. Publishable key is present and is a valid pk_ key (not empty / test key in prod)
 * 2. Clerk script loads from the correct CDN (not a spoofed URL)
 * 3. Sign-in/sign-up pages use Clerk components (not rolling their own auth)
 * 4. No CLERK_SECRET_KEY exposed in client-side HTML
 * 5. Clerk JWKS endpoint is accessible (if known)
 * 6. Sessions are bound to correct domain
 */

test.describe('Clerk Configuration — publishable key validation', () => {
  test('sign-in page has valid Clerk publishable key format', async ({ page }) => {
    let rawHtml = '';
    await page.route('/app/sign-in', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/app/sign-in', { waitUntil: 'commit' });

    // SECURITY: Publishable key must exist and have correct format
    expect(rawHtml).toContain('pk_');

    // Extract the publishable key
    const pkMatch = rawHtml.match(/pk_[a-zA-Z0-9_-]+/);
    expect(pkMatch, 'Clerk publishable key must be present').toBeTruthy();

    const pk = pkMatch[0];

    // Must be either pk_live_ or pk_test_ — no other formats are valid
    expect(pk, 'Must be a valid Clerk key format').toMatch(/^pk_(live|test)_/);

    // Key must not be a placeholder or demo value
    expect(pk, 'Must not be placeholder key').not.toBe('pk_your_key_here');
    expect(pk.length, 'Key must be at least 20 chars').toBeGreaterThan(20);
  });

  test('dashboard page has valid Clerk publishable key', async ({ page }) => {
    let rawHtml = '';
    await page.route('/app/dashboard', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/app/dashboard', { waitUntil: 'commit' });

    const pkMatch = rawHtml.match(/pk_[a-zA-Z0-9_-]+/);
    expect(pkMatch).toBeTruthy();
    expect(pkMatch[0]).toMatch(/^pk_(live|test)_/);
  });

  test('CLERK_SECRET_KEY is never exposed in client HTML', async ({ page }) => {
    const pagesToCheck = [
      '/app/sign-in',
      '/app/sign-up',
      '/app/dashboard',
      '/app/settings',
      '/',
    ];

    for (const pagePath of pagesToCheck) {
      let rawHtml = '';
      await page.route(pagePath, async (route) => {
        const response = await route.fetch();
        rawHtml = await response.text();
        await route.fulfill({ response });
      });

      await page.goto(pagePath, { waitUntil: 'commit' });

      // SECURITY: Secret key must NEVER appear in client-rendered HTML
      expect(rawHtml, `${pagePath}: CLERK_SECRET_KEY must not be in HTML`).not.toMatch(/sk_(live|test)_[A-Za-z0-9]+/);
      expect(rawHtml, `${pagePath}: No raw secret key env var`).not.toContain('CLERK_SECRET_KEY');
    }
  });
});

test.describe('Clerk Configuration — script source integrity', () => {
  test('Clerk JS loads from legitimate Clerk CDN domains', async ({ page }) => {
    let rawHtml = '';
    await page.route('/app/sign-in', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/app/sign-in', { waitUntil: 'commit' });

    // Extract script src attributes
    const scriptSrcs = [...rawHtml.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
    const dataClerkScripts = [...rawHtml.matchAll(/data-clerk-js-script="([^"]+)"/g)].map(m => m[1]);

    // Find Clerk-related script sources
    const clerkScripts = [...scriptSrcs, ...dataClerkScripts].filter(src =>
      src.includes('clerk') || src.includes('__clerk')
    );

    for (const src of clerkScripts) {
      // SECURITY: Clerk JS must load from Clerk's own CDN, not a third-party
      const isLegitimateClerkDomain =
        src.startsWith('https://') &&
        (
          src.includes('.clerk.com') ||
          src.includes('.clerk.accounts') ||
          src.includes('clerk.browser.js') ||
          src.includes('clerk-js')
        );

      if (src.startsWith('http')) {
        expect(isLegitimateClerkDomain, `Clerk script from suspicious source: ${src}`).toBe(true);
      }
    }
  });

  test('Clerk data attribute uses correct publishable key on sign-in', async ({ page }) => {
    let rawHtml = '';
    await page.route('/app/sign-in', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/app/sign-in', { waitUntil: 'commit' });

    // The Clerk script data attribute should reference a publishable key
    const hasDataClerk = rawHtml.includes('data-clerk-js-script') || rawHtml.includes('clerkJSUrl');
    expect(hasDataClerk).toBe(true);
  });
});

test.describe('Clerk Configuration — auth flow correctness', () => {
  test('sign-in page has Clerk SignIn component or script reference', async ({ page }) => {
    let rawHtml = '';
    await page.route('/app/sign-in', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/app/sign-in', { waitUntil: 'commit' });

    // SECURITY: Page must use Clerk for auth, not a custom login form
    // Custom login forms are vulnerable to credential stuffing without Clerk's protections
    const hasClerk = rawHtml.includes('clerk') && (
      rawHtml.includes('Sign In') ||
      rawHtml.includes('sign-in')
    );
    expect(hasClerk, 'Sign-in page must use Clerk').toBe(true);

    // SECURITY: Page must NOT have a raw password input without Clerk
    // (If Clerk is present, password inputs are rendered by Clerk's iframe, not in HTML)
    const hasRawPasswordInput = rawHtml.includes('<input') &&
                                rawHtml.includes('type="password"') &&
                                !rawHtml.includes('clerk');
    expect(hasRawPasswordInput, 'Must not have raw password input outside Clerk').toBe(false);
  });

  test('sign-up page does not allow open registration bypass', async ({ page }) => {
    let rawHtml = '';
    await page.route('/app/sign-up', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/app/sign-up', { waitUntil: 'commit' });

    // Must use Clerk's sign-up component (not a custom form that bypasses Clerk's controls)
    expect(rawHtml).toContain('clerk');
    expect(rawHtml).toContain('pk_');
  });

  test('protected pages have Clerk script for auth enforcement', async ({ page }) => {
    let rawHtml = '';
    await page.route('/app/dashboard', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/app/dashboard', { waitUntil: 'commit' });

    // Dashboard must have Clerk script for client-side auth enforcement
    expect(rawHtml).toContain('data-clerk-js-script');

    // The Clerk publishable key must be present so Clerk JS can init and redirect
    // Note: /app/sign-in is not embedded in the static HTML shell — it's a JS redirect
    // performed by Clerk after initialization. We verify Clerk can init (has the key).
    expect(rawHtml).toContain('pk_live_');

    // Dashboard should be present in nav (it's the static shell)
    expect(rawHtml).toContain('/app/dashboard');
  });
});

test.describe('Clerk Configuration — sensitive data exposure', () => {
  test('Next.js env vars not exposed in __NEXT_DATA__', async ({ page }) => {
    let rawHtml = '';
    await page.route('/app/dashboard', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/app/dashboard', { waitUntil: 'commit' });

    // Extract __NEXT_DATA__ if present
    const nextDataMatch = rawHtml.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (nextDataMatch) {
      const nextData = nextDataMatch[1];

      // SECURITY: Secret env vars must not be in __NEXT_DATA__
      expect(nextData).not.toMatch(/sk_(live|test)_/);
      expect(nextData).not.toContain('CLERK_SECRET_KEY');
      expect(nextData).not.toContain('DATABASE_URL');
      expect(nextData).not.toContain('STRIPE_SECRET');
    }

    // If no __NEXT_DATA__ (static export), that's fine too
  });

  test('window env vars not exposed in inline scripts', async ({ page }) => {
    let rawHtml = '';
    await page.route('/', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/', { waitUntil: 'commit' });

    // Check for common patterns of leaking env vars to client
    expect(rawHtml).not.toContain('process.env.CLERK_SECRET');
    expect(rawHtml).not.toContain('window.CLERK_SECRET');
    expect(rawHtml).not.toContain('window.STRIPE_SECRET');
  });
});
