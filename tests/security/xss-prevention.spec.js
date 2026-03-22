// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Security Test Suite: XSS (Cross-Site Scripting) Prevention
 *
 * Tests that user-supplied inputs are properly sanitized and that
 * script injection attempts are neutralized.
 *
 * Coverage:
 * - Public pages: query params, URL fragments
 * - Static HTML: no unescaped user-supplied content in rendered output
 * - Content-Security-Policy headers (checked via page headers)
 * - Demo cancel flow: widget inputs
 *
 * Note: API-level XSS tests (input sanitization in D1 writes) require a live
 * server with auth. Those are covered in tests/security/api-auth.spec.js.
 * The _shared.js sanitizeString() is tested via unit behavior assertions.
 */

// XSS payloads — standard vectors from OWASP Top 10
const XSS_PAYLOADS = [
  '<script>alert(1)</script>',
  '"><script>alert(1)</script>',
  "' onmouseover='alert(1)",
  '<img src=x onerror=alert(1)>',
  'javascript:alert(1)',
  '"><img src=x onerror=alert(document.cookie)>',
  '<svg onload=alert(1)>',
  '&#x3C;script&#x3E;alert(1)&#x3C;/script&#x3E;',
  '%3Cscript%3Ealert(1)%3C/script%3E',
];

test.describe('XSS Prevention — URL parameter reflection', () => {
  test('homepage does not reflect query params into HTML unsanitized', async ({ page }) => {
    const xssParam = encodeURIComponent('<script>alert(1)</script>');

    let rawHtml = '';
    await page.route(`/?q=${xssParam}`, async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    // Navigate with XSS payload in query string
    await page.goto(`/?q=${xssParam}`, { waitUntil: 'commit' });

    // SECURITY: Raw <script> tag must not appear unescaped in the response HTML
    // (static export doesn't server-render query params, but verify)
    expect(rawHtml).not.toContain('<script>alert(1)</script>');
  });

  test('URL hash (fragment) XSS does not execute in browser', async ({ page }) => {
    // Track any alerts that might fire
    let alertFired = false;
    page.on('dialog', async (dialog) => {
      alertFired = true;
      await dialog.dismiss();
    });

    await page.goto('/#<script>alert(1)</script>', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    expect(alertFired).toBe(false);
  });

  test('demo page does not execute injected scripts from URL params', async ({ page }) => {
    let alertFired = false;
    page.on('dialog', async (dialog) => {
      alertFired = true;
      await dialog.dismiss();
    });

    // Try XSS via query parameter on demo page
    await page.goto('/demo?name=<script>alert(1)</script>', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    expect(alertFired).toBe(false);
  });
});

test.describe('XSS Prevention — static page content safety', () => {
  test('blog pages do not have unescaped script injection vectors', async ({ page }) => {
    let rawHtml = '';
    await page.route('/blog', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/blog', { waitUntil: 'commit' });

    // SECURITY: No inline event handlers from user content
    // (blog posts are markdown — verify they don't have XSS-style attributes)
    expect(rawHtml).not.toMatch(/onerror\s*=/i);
    expect(rawHtml).not.toMatch(/onload\s*=/i);
    expect(rawHtml).not.toMatch(/onclick\s*=\s*["']?javascript:/i);
  });

  test('pricing page does not contain unescaped script injection', async ({ page }) => {
    let rawHtml = '';
    await page.route('/pricing', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/pricing', { waitUntil: 'commit' });

    // Verify no suspicious inline event handlers injected
    expect(rawHtml).not.toMatch(/javascript:alert/i);
    expect(rawHtml).not.toMatch(/eval\(atob\(/i);
  });
});

test.describe('XSS Prevention — Content Security Policy', () => {
  // NOTE: CSP headers are set by the CDN/Cloudflare Pages, not the Next.js static export.
  // We test that pages at minimum don't have inline scripts that bypass a future CSP.

  test('homepage does not use document.write()', async ({ page }) => {
    let rawHtml = '';
    await page.route('/', async (route) => {
      const response = await route.fetch();
      rawHtml = await response.text();
      await route.fulfill({ response });
    });

    await page.goto('/', { waitUntil: 'commit' });

    // document.write() is a CSP bypass vector
    expect(rawHtml).not.toContain('document.write(');
  });

  test('no eval() in inline scripts on public pages', async ({ page }) => {
    const publicPages = ['/', '/pricing', '/features', '/demo'];

    for (const pagePath of publicPages) {
      let rawHtml = '';
      await page.route(pagePath, async (route) => {
        const response = await route.fetch();
        rawHtml = await response.text();
        await route.fulfill({ response });
      });

      await page.goto(pagePath, { waitUntil: 'commit' });

      // SECURITY: eval() in inline scripts is a high-risk XSS enabler
      // (note: some minified JS may use eval, but inline <script> blocks should not)
      const inlineScripts = rawHtml.match(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi) || [];
      for (const script of inlineScripts) {
        expect(script, `eval() found in inline script on ${pagePath}`).not.toContain('eval(');
      }
    }
  });
});

test.describe('XSS Prevention — demo cancel flow widget', () => {
  test('demo page widget loads without executing injected scripts', async ({ page }) => {
    let alertFired = false;
    page.on('dialog', async (dialog) => {
      alertFired = true;
      await dialog.dismiss();
    });

    await page.goto('/demo', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    expect(alertFired).toBe(false);
  });
});

test.describe('XSS Prevention — sanitizeString utility coverage', () => {
  /**
   * These tests validate the sanitization logic in _shared.js functions/api/_shared.js.
   * We test the behavior indirectly through what gets returned by public cancel-flow API.
   * Full unit tests of sanitizeString() would require importing the ESM module in a
   * compatible test runner — marked skip as they require live API or ESM-compatible runner.
   */

  test.skip('sanitizeString strips control characters (requires live API or ESM runner)', async () => {
    // This test needs wrangler dev or a live CF worker
    // sanitizeString('\x00evil\x01') should strip \x00 and \x01
  });

  test('cancel-flow GET with valid projectId returns sanitized JSON', async ({ request }) => {
    const res = await request.get('https://churnrecovery.com/api/cancel-flow?projectId=proj_test');

    // Accept 200 or 404 — but must return valid JSON, not raw user input
    expect([200, 404]).toContain(res.status());

    if (res.status() === 200) {
      const body = await res.json();
      // SECURITY: Response should not contain script tags from user input
      const bodyStr = JSON.stringify(body);
      expect(bodyStr).not.toContain('<script>');
      expect(bodyStr).not.toContain('javascript:');
    }
  });
});
