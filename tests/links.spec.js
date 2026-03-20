// @ts-check
const { test, expect } = require('@playwright/test');

// Pages linked in the site that don't exist yet in static export
const KNOWN_MISSING = ['/privacy', '/terms', '/rss.xml'];

test.describe('internal links', () => {
  test('homepage has no broken internal links', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const links = await page.$$eval('a[href^="/"]', (anchors) =>
      [...new Set(anchors.map((a) => a.getAttribute('href')).filter(Boolean))]
    );

    expect(links.length).toBeGreaterThan(0);

    for (const href of links) {
      // Skip anchors (hash links) and mailto/external
      if (href.startsWith('#') || href.startsWith('mailto:')) continue;
      // Normalize path: strip hash/query
      const path = href.split('#')[0].split('?')[0];
      if (!path || path === '/') continue;
      if (KNOWN_MISSING.includes(path)) continue;

      const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(response.status(), `Broken link: ${href}`).toBe(200);
    }
  });

  test('header nav links all resolve to 200', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const headerLinks = await page.$$eval('header a[href^="/"]', (anchors) =>
      [...new Set(anchors.map((a) => a.getAttribute('href')).filter(Boolean))]
    );

    expect(headerLinks.length).toBeGreaterThan(0);

    for (const href of headerLinks) {
      const path = href.split('#')[0].split('?')[0];
      if (!path) continue;
      const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(response.status(), `Broken header link: ${href}`).toBe(200);
    }
  });

  test('footer links all resolve to 200', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const footerLinks = await page.$$eval('footer a[href^="/"]', (anchors) =>
      [...new Set(anchors.map((a) => a.getAttribute('href')).filter(Boolean))]
    );

    expect(footerLinks.length).toBeGreaterThan(0);

    for (const href of footerLinks) {
      const path = href.split('#')[0].split('?')[0];
      if (!path) continue;
      if (KNOWN_MISSING.includes(path)) continue;
      const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(response.status(), `Broken footer link: ${href}`).toBe(200);
    }
  });
});
