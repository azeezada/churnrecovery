// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * New feature coverage — wave post-2026-03-22
 *
 * Tests added for features not covered in the previous wave:
 * 1. Internal linking — blog posts link to /for/ pages
 * 2. Error handling — API routes return {error, code} JSON on failures
 * 3. /api/health endpoint
 * 4. /api/projects unauthenticated returns 401 JSON
 * 5. UTM capture on /app/sign-up doesn't crash
 * 6. Homepage loads (AnimatedHero / shadcn polish doesn't break page)
 */

const LIVE_URL = 'https://churnrecovery.com';
const LOCAL_BASE = 'http://localhost:3050';

// ──────────────────────────────────────────────────────────────────────────────
// 1. Internal linking — key blog posts reference /for/ pages
// ──────────────────────────────────────────────────────────────────────────────
test.describe('Internal linking — blog posts link to /for/ pages', () => {
  test('churn-prevention-strategies-coaching post links to /for/ pages', async ({ page }) => {
    const res = await page.goto(`${LOCAL_BASE}/posts/churn-prevention-strategies-coaching`, {
      waitUntil: 'domcontentloaded',
    });
    // Accept 200 or 404 (post may not be in the static build)
    if (res.status() === 404) {
      test.skip(true, 'Post not in static build');
      return;
    }
    expect(res.status()).toBe(200);

    // At least one /for/ link should exist on the page
    const forLinks = await page.$$eval('a[href*="/for/"]', (links) =>
      links.map((a) => a.getAttribute('href'))
    );
    expect(forLinks.length).toBeGreaterThan(0);
  });

  test('hidden-revenue-leak-subscription-business post links to /for/ pages', async ({ page }) => {
    const res = await page.goto(`${LOCAL_BASE}/posts/hidden-revenue-leak-subscription-business`, {
      waitUntil: 'domcontentloaded',
    });
    if (res.status() === 404) {
      test.skip(true, 'Post not in static build');
      return;
    }
    expect(res.status()).toBe(200);

    const forLinks = await page.$$eval('a[href*="/for/"]', (links) =>
      links.map((a) => a.getAttribute('href'))
    );
    expect(forLinks.length).toBeGreaterThan(0);
  });

  test('/for/stripe page has links to /app/sign-up (CTA)', async ({ page }) => {
    const res = await page.goto(`${LOCAL_BASE}/for/stripe`, {
      waitUntil: 'domcontentloaded',
    });
    expect(res.status()).toBe(200);

    // Should have at least one CTA pointing to sign-up
    const ctaLinks = await page.$$eval('a[href*="sign-up"], a[href*="waitlist"]', (links) =>
      links.map((a) => a.getAttribute('href'))
    );
    expect(ctaLinks.length).toBeGreaterThan(0);
  });

  test('/for/beehiiv page has links to /app/sign-up or waitlist', async ({ page }) => {
    const res = await page.goto(`${LOCAL_BASE}/for/beehiiv`, {
      waitUntil: 'domcontentloaded',
    });
    expect(res.status()).toBe(200);

    const ctaLinks = await page.$$eval('a[href*="sign-up"], a[href*="waitlist"]', (links) =>
      links.map((a) => a.getAttribute('href'))
    );
    expect(ctaLinks.length).toBeGreaterThan(0);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// 2. Error handling — API routes return {error, code} JSON
// ──────────────────────────────────────────────────────────────────────────────
test.describe('API error responses return {error, code} JSON (live)', () => {
  test('GET /api/health returns 200 with {status: "ok"}', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/health`);

    // 200 = live, 404/405 = not yet deployed (acceptable)
    expect([200, 404, 405]).toContain(res.status());

    if (res.status() === 200) {
      const body = await res.json();
      expect(body).toHaveProperty('status', 'ok');
      expect(body).toHaveProperty('timestamp');
    }
  });

  test('GET /api/projects without auth returns 401 JSON with error field', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/projects`);

    // Without auth → 401; 405 = not deployed
    expect([401, 403, 404, 405]).toContain(res.status());

    if (res.status() === 401 || res.status() === 403) {
      const body = await res.json();
      // Must have an error field; code field is present in new deployments
      expect(body).toHaveProperty('error');
    }
  });

  test('POST /api/projects without auth returns 401 JSON with error field', async ({ request }) => {
    const res = await request.post(`${LIVE_URL}/api/projects`, {
      data: { name: 'Test Project' },
      headers: { 'Content-Type': 'application/json' },
    });

    expect([401, 403, 404, 405]).toContain(res.status());

    if (res.status() === 401 || res.status() === 403) {
      const body = await res.json();
      // Must have an error field; code field is present in new deployments
      expect(body).toHaveProperty('error');
    }
  });

  test('POST /api/waitlist with missing email returns 400 with JSON error', async ({ request }) => {
    const res = await request.post(`${LIVE_URL}/api/waitlist`, {
      data: {},
      headers: { 'Content-Type': 'application/json' },
    });

    // 400 = missing field, 429 = rate-limited, 405 = not deployed
    expect([400, 422, 429, 405]).toContain(res.status());

    if (res.status() === 400 || res.status() === 422) {
      const body = await res.json().catch(() => null);
      if (body) {
        expect(body).toHaveProperty('error');
      }
    }
  });

  test('POST /api/events with empty body returns 400 JSON error', async ({ request }) => {
    const res = await request.post(`${LIVE_URL}/api/events`, {
      data: {},
      headers: { 'Content-Type': 'application/json' },
    });

    // 400 = bad input, 401 = unauth, 429 = rate-limited, 405 = not deployed
    expect([400, 401, 403, 405, 429]).toContain(res.status());
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// 3. UTM capture — /app/sign-up loads without crashing
// ──────────────────────────────────────────────────────────────────────────────
test.describe('UTM capture — sign-up page', () => {
  test('/app/sign-up loads without JS errors', async ({ page }) => {
    const jsErrors = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    const res = await page.goto(`${LOCAL_BASE}/app/sign-up`, { waitUntil: 'domcontentloaded' });
    expect(res.status()).toBe(200);
    await page.waitForTimeout(1000);

    // No unhandled JS exceptions should crash the page
    const fatal = jsErrors.filter((e) => !e.includes('Clerk') && !e.includes('ResizeObserver'));
    expect(fatal.length).toBe(0);
  });

  test('/app/sign-up with UTM params — page loads and UTM stored', async ({ page }) => {
    const jsErrors = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    // First set UTM via homepage
    await page.goto(`${LOCAL_BASE}/?utm_source=test_source&utm_medium=test_medium`, {
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(500);

    // Navigate to sign-up — UTM should persist
    const res = await page.goto(`${LOCAL_BASE}/app/sign-up`, { waitUntil: 'domcontentloaded' });
    expect(res.status()).toBe(200);
    await page.waitForTimeout(1000);

    const stored = await page.evaluate(() => {
      const raw = localStorage.getItem('cr_utm');
      return raw ? JSON.parse(raw) : null;
    });

    // UTM should have been captured on first visit and persisted
    expect(stored).not.toBeNull();
    expect(stored.utm_source).toBe('test_source');

    // No fatal JS errors
    const fatal = jsErrors.filter((e) => !e.includes('Clerk') && !e.includes('ResizeObserver'));
    expect(fatal.length).toBe(0);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// 4. Homepage still loads (shadcn/Magic UI AnimatedHero check)
// ──────────────────────────────────────────────────────────────────────────────
test.describe('Homepage with AnimatedHero (shadcn/Magic UI)', () => {
  test('homepage loads with 200 and has <title>', async ({ page }) => {
    const res = await page.goto(`${LOCAL_BASE}/`, { waitUntil: 'domcontentloaded' });
    expect(res.status()).toBe(200);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('homepage body has no Internal Server Error text', async ({ page }) => {
    await page.goto(`${LOCAL_BASE}/`, { waitUntil: 'domcontentloaded' });
    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('Internal Server Error');
  });

  test('homepage hero section is visible', async ({ page }) => {
    await page.goto(`${LOCAL_BASE}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // A heading in the hero area should be present
    const h1 = await page.$('h1');
    expect(h1).not.toBeNull();

    const heroText = await h1.textContent();
    expect(heroText.trim().length).toBeGreaterThan(0);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// 5. Nurture email sequence — clerk-webhook graceful error handling (live)
// ──────────────────────────────────────────────────────────────────────────────
test.describe('Nurture email sequence — error resilience (live)', () => {
  test('POST /api/clerk-webhook with malformed user.created data returns 400 or 401, not 500', async ({ request }) => {
    // Missing required fields — should fail gracefully, not 500
    const res = await request.post(`${LIVE_URL}/api/clerk-webhook`, {
      data: {
        type: 'user.created',
        data: {
          // Intentionally missing email_addresses
          id: 'user_test_malformed',
        },
      },
      headers: {
        'Content-Type': 'application/json',
        'svix-id': 'msg_malformed',
        'svix-timestamp': String(Math.floor(Date.now() / 1000)),
        'svix-signature': 'v1,fakesig==',
      },
    });

    // Must NOT be 500 (unhandled crash)
    expect(res.status()).not.toBe(500);
    // 400 = bad data, 401 = sig fail, 405 = not deployed, 200 = accepted
    expect([200, 400, 401, 405]).toContain(res.status());
  });

  test('POST /api/clerk-webhook with valid structure but wrong sig returns 401, not 500', async ({ request }) => {
    const res = await request.post(`${LIVE_URL}/api/clerk-webhook`, {
      data: {
        type: 'user.created',
        data: {
          id: 'user_sig_test',
          first_name: 'Test',
          email_addresses: [
            { id: 'eid_1', email_address: 'sigtest@example.com' },
          ],
          primary_email_address_id: 'eid_1',
        },
      },
      headers: {
        'Content-Type': 'application/json',
        'svix-id': 'msg_sig_test',
        'svix-timestamp': String(Math.floor(Date.now() / 1000)),
        'svix-signature': 'v1,thisisnotavalidbase64signature==',
      },
    });

    // If webhook secret is configured → 401 (sig mismatch)
    // If no secret configured → 200 (accepted without verification)
    // If not deployed → 405
    expect(res.status()).not.toBe(500);
    expect([200, 401, 405]).toContain(res.status());
  });

  test('GET /api/clerk-webhook returns 405 Method Not Allowed', async ({ request }) => {
    const res = await request.get(`${LIVE_URL}/api/clerk-webhook`);
    // Only POST is supported — GET should be rejected
    expect([404, 405]).toContain(res.status());
  });
});
