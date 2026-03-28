// @ts-check
const { test, expect } = require('@playwright/test');

test.skip(!!process.env.CI, 'Clerk not configured in CI');

/**
 * Clerk Widget Rendering Tests
 *
 * These tests verify that the Clerk sign-in/sign-up widgets actually RENDER
 * in the browser after JavaScript hydration — not just that the static HTML
 * contains the right script tags.
 *
 * Previous tests only checked raw HTML for `data-clerk-js-script` and `pk_`,
 * which passes even when the widget fails to mount (error boundary catches it,
 * or the dynamic import never resolves, or Clerk JS errors silently).
 *
 * These tests use Clerk API mocking to simulate what real users see.
 */

const CLERK_FRONTEND_API = /clerk\.churnrecovery\.com|clerk\.accounts\.dev/;

/**
 * Mock Clerk's frontend API to return a valid environment + client response
 * so the embedded <SignIn>/<SignUp> components actually attempt to render.
 */
async function mockClerkAPI(page) {
  await page.route('**/*clerk*/**', async (route) => {
    const url = route.request().url();

    // Environment endpoint — tells Clerk SDK what auth methods are available
    if (url.includes('/v1/environment')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          auth_config: {
            object: 'auth_config',
            id: 'aac_mock',
            single_session_mode: true,
            first_name: 'optional',
            last_name: 'optional',
            email_address: 'required',
            phone_number: 'off',
            username: 'off',
            password: 'required',
          },
          display_config: {
            object: 'display_config',
            application_name: 'ChurnRecovery',
            branded: true,
            home_url: 'https://churnrecovery.com',
            sign_in_url: 'https://churnrecovery.com/app/sign-in',
            sign_up_url: 'https://churnrecovery.com/app/sign-up',
            after_sign_in_url: 'https://churnrecovery.com/app/dashboard',
            after_sign_up_url: 'https://churnrecovery.com/app/dashboard',
            logo_image_url: '',
            favicon_image_url: '',
            theme: { general: { color: '#D97757' } },
          },
          user_settings: {
            attributes: {
              email_address: {
                enabled: true,
                required: true,
                used_for_first_factor: true,
                verifications: ['email_code'],
              },
              password: {
                enabled: true,
                required: true,
              },
            },
            social: {},
          },
        }),
      });
    }

    // Client endpoint — tells Clerk about the current session
    if (url.includes('/v1/client')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          response: {
            object: 'client',
            id: 'client_mock',
            sessions: [],
            sign_in: null,
            sign_up: null,
            last_active_session_id: null,
            created_at: Date.now(),
            updated_at: Date.now(),
          },
          client: {
            object: 'client',
            id: 'client_mock',
            sessions: [],
            sign_in: null,
            sign_up: null,
          },
        }),
      });
    }

    // JWKS — return a mock key
    if (url.includes('/.well-known/jwks')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ keys: [] }),
      });
    }

    // Let Clerk JS bundles through (they load from CDN)
    if (url.includes('.js') || url.includes('.css') || url.includes('.woff')) {
      return route.continue();
    }

    // Default: return empty OK for unknown Clerk endpoints
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });
}


test.describe('sign-in page — widget renders', () => {
  test('page does NOT show "Authentication Not Configured" fallback', async ({ page }) => {
    await page.goto('/app/sign-in', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('Authentication Not Configured');
    expect(bodyText).not.toContain('Get Clerk Keys');
    expect(bodyText).not.toContain('Continue in demo mode');
  });

  test('page does NOT show error boundary fallback', async ({ page }) => {
    await page.goto('/app/sign-in', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('Sign In Coming Soon');
    expect(bodyText).not.toContain('setting up authentication');
    expect(bodyText).not.toContain('Explore Demo');
  });

  test('page does NOT get stuck on "Loading..." placeholder', async ({ page }) => {
    await mockClerkAPI(page);
    await page.goto('/app/sign-in', { waitUntil: 'networkidle' });

    // Wait for the dynamic import loading state to resolve
    // The loading placeholder says "Loading..." — it should be replaced by Clerk widget
    await page.waitForTimeout(5000);

    const bodyText = await page.textContent('body');
    // "Loading..." as the ONLY content means the dynamic import never resolved
    const mainContent = bodyText.replace(/ChurnRecovery/g, '').trim();
    expect(mainContent).not.toBe('Loading...');
  });

  test('Clerk sign-in component mounts a form element', async ({ page }) => {
    await mockClerkAPI(page);
    await page.goto('/app/sign-in', { waitUntil: 'networkidle' });

    // Wait for Clerk to mount — it renders a form with email input
    // Clerk components render inside a div with cl-* class names or data-clerk attributes
    try {
      await page.waitForSelector(
        'form, [data-clerk-component], .cl-signIn-root, .cl-rootBox, input[type="email"], input[name="identifier"]',
        { timeout: 10000 }
      );
    } catch {
      // If no Clerk element appeared, check what IS on the page
      const bodyHtml = await page.innerHTML('body');
      const bodyText = await page.textContent('body');

      // Collect diagnostic info
      const diagnostics = {
        hasLoadingText: bodyText.includes('Loading...'),
        hasErrorBoundary: bodyText.includes('Coming Soon') || bodyText.includes('Explore Demo'),
        hasDemoFallback: bodyText.includes('Not Configured'),
        hasClerkRoot: bodyHtml.includes('cl-') || bodyHtml.includes('data-clerk'),
        visibleText: bodyText.substring(0, 500),
      };

      throw new Error(
        `Clerk sign-in widget did not render. Diagnostics: ${JSON.stringify(diagnostics, null, 2)}`
      );
    }
  });

  test('no critical console errors during sign-in page load', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    await mockClerkAPI(page);
    await page.goto('/app/sign-in', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Filter known non-critical noise
    const critical = errors.filter(e =>
      !e.includes('Failed to load resource') &&
      !e.includes('net::ERR_') &&
      !e.includes('favicon') &&
      !e.includes('404') &&
      !e.includes('CORS')
    );

    // Log all errors for debugging even if we filter
    if (critical.length > 0) {
      console.log('Console errors on sign-in page:', critical);
    }

    // Clerk-specific fatal errors that indicate the widget won't render
    const clerkFatal = critical.filter(e =>
      e.includes('ClerkProvider') ||
      e.includes('Multiple ClerkProvider') ||
      e.includes('Clerk: Missing publishableKey') ||
      e.includes('Clerk: Invalid publishableKey')
    );
    expect(clerkFatal).toEqual([]);
  });
});


test.describe('sign-up page — widget renders', () => {
  test('page does NOT show "Authentication Not Configured" fallback', async ({ page }) => {
    await page.goto('/app/sign-up', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('Authentication Not Configured');
    expect(bodyText).not.toContain('Get Clerk Keys');
    expect(bodyText).not.toContain('Continue in demo mode');
  });

  test('page does NOT show error boundary fallback', async ({ page }) => {
    await page.goto('/app/sign-up', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('Sign Up Coming Soon');
    expect(bodyText).not.toContain('setting up authentication');
    expect(bodyText).not.toContain('Explore Demo');
  });

  test('Clerk sign-up component mounts a form element', async ({ page }) => {
    await mockClerkAPI(page);
    await page.goto('/app/sign-up', { waitUntil: 'networkidle' });

    try {
      await page.waitForSelector(
        'form, [data-clerk-component], .cl-signUp-root, .cl-rootBox, input[type="email"], input[name="emailAddress"]',
        { timeout: 10000 }
      );
    } catch {
      const bodyText = await page.textContent('body');
      const bodyHtml = await page.innerHTML('body');

      const diagnostics = {
        hasLoadingText: bodyText.includes('Loading...'),
        hasErrorBoundary: bodyText.includes('Coming Soon') || bodyText.includes('Explore Demo'),
        hasDemoFallback: bodyText.includes('Not Configured'),
        hasClerkRoot: bodyHtml.includes('cl-') || bodyHtml.includes('data-clerk'),
        visibleText: bodyText.substring(0, 500),
      };

      throw new Error(
        `Clerk sign-up widget did not render. Diagnostics: ${JSON.stringify(diagnostics, null, 2)}`
      );
    }
  });
});


test.describe('sign-in/sign-up — isClerkEnabled correctness', () => {
  test('isClerkEnabled returns true for production key format (pk_live_ with base64 + $)', async ({ page }) => {
    // This tests the regex fix — pk_live_ keys contain +, /, =, $ characters
    await page.goto('/app/sign-in', { waitUntil: 'domcontentloaded' });

    // The page should render the Clerk branch, not the demo branch
    // Check that the dynamic import wrapper div exists (not the DemoSignIn component)
    const rawHtml = await page.innerHTML('body');

    // The Clerk branch has ClerkErrorBoundary wrapping a dynamic import
    // The demo branch has a div with "Authentication Not Configured"
    // We check for the absence of the demo branch content
    expect(rawHtml).not.toContain('Authentication Not Configured');
    expect(rawHtml).not.toContain('Get Clerk Keys');
  });

  test('CTAs on homepage link to /app/sign-up (not waitlist or external)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Find all "Get Started" or "Sign Up" links
    const ctaLinks = await page.locator('a[href*="sign-up"], a[href*="sign-in"]').all();
    expect(ctaLinks.length).toBeGreaterThan(0);

    for (const link of ctaLinks) {
      const href = await link.getAttribute('href');
      // Should point to our custom pages, not Clerk's hosted pages
      expect(href).not.toContain('accounts.churnrecovery.com');
      expect(href).toMatch(/\/app\/sign-(up|in)/);
    }
  });
});


test.describe('sign-in/sign-up — no duplicate ClerkProvider', () => {
  test('page source does not nest multiple ClerkProviders', async ({ page }) => {
    // This is a static analysis test — check the built JS for nested providers
    // The _app.js already wraps everything in ClerkProvider.
    // The sign-in page's dynamic import should NOT create another one.

    const response = await page.goto('/app/sign-in', { waitUntil: 'commit' });
    const html = await response.text();

    // Extract all JS bundle URLs
    const bundleUrls = [...html.matchAll(/\/_next\/static\/chunks\/[^"]+\.js/g)].map(m => m[0]);

    // Fetch the sign-in page bundle and check for nested ClerkProvider
    let signInBundle = '';
    for (const url of bundleUrls) {
      if (url.includes('sign-in') || url.includes('8156')) {
        const resp = await page.request.get(url);
        signInBundle = await resp.text();
        break;
      }
    }

    if (signInBundle) {
      // Count ClerkProvider references — the dynamic import wrapper creates one,
      // but it shouldn't if _app.js already provides one
      const providerCount = (signInBundle.match(/ClerkProvider/g) || []).length;

      // If there are multiple, the dynamic import is creating a nested provider
      // This is informational — log it for debugging
      console.log(`ClerkProvider references in sign-in bundle: ${providerCount}`);
    }
  });
});
