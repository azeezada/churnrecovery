// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('header navigation', () => {
  const navLinks = [
    { text: 'Features', path: '/features' },
    { text: 'Pricing', path: '/pricing' },
    { text: 'Integrations', path: '/integrations' },
    { text: 'Demo', path: '/demo' },
    { text: 'ROI Calculator', path: '/tools/roi-calculator' },
    { text: 'Blog', path: '/blog' },
  ];

  for (const { text, path } of navLinks) {
    test(`clicking "${text}" navigates to ${path}`, async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // Click the nav link in the desktop nav
      const link = page.locator(`header nav.desktop-nav a[href="${path}"]`);
      await link.click();
      await page.waitForURL(`**${path}`);

      expect(page.url()).toContain(path);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
    });
  }
});

test.describe('footer navigation', () => {
  const footerLinks = [
    { text: 'Features', path: '/features' },
    { text: 'Integrations', path: '/integrations' },
    { text: 'Cancel Flow Demo', path: '/demo' },
    { text: 'Churn Calculator', path: '/tools/churn-calculator' },
    { text: 'Templates', path: '/templates' },
    { text: 'Pricing', path: '/pricing' },
    { text: 'Blog', path: '/blog' },
    { text: 'Documentation', path: '/docs' },
    { text: 'Use Cases', path: '/use-cases' },
    { text: 'About', path: '/about' },
  ];

  for (const { text, path } of footerLinks) {
    test(`footer link "${text}" navigates to ${path}`, async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      const link = page.locator(`footer a[href="${path}"]`).first();
      await link.click();
      await page.waitForURL(`**${path}`);

      expect(page.url()).toContain(path);
    });
  }
});
