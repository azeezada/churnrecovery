// @ts-check
const { test, expect } = require('@playwright/test');
const { mockSignedIn, mockSignedOut } = require('../helpers/mock-auth');

/**
 * Comprehensive link checker — crawls every page and validates every internal link.
 * Runs for both signed-in and signed-out states.
 */

// Known missing pages (linked but not yet built)
const KNOWN_MISSING = ['/privacy', '/terms', '/rss.xml'];

// Skip patterns (not real pages)
const SKIP_PATTERNS = [
  /^#/,            // anchor links
  /^mailto:/,      // email links
  /^tel:/,         // phone links
  /^javascript:/,  // JS links
  /\[\[/,          // Next.js catch-all patterns like [[...index]]
];

// All crawlable pages in the static export
const ALL_PAGES = [
  '/',
  '/about',
  '/features',
  '/pricing',
  '/integrations',
  '/demo',
  '/docs',
  '/blog',
  '/changelog',
  '/status',
  '/templates',
  '/use-cases',
  '/social-proof',
  '/press',
  '/refer',
  '/styles',
  '/app/sign-in',
  '/app/sign-up',
  '/app/dashboard',
  '/app/analytics',
  '/app/cancel-flow',
  '/app/connect-stripe',
  '/app/install',
  '/app/onboarding',
  '/app/projects',
  '/app/settings',
  '/app/recovery',
  // Blog posts
  '/posts/B2B-SaaS-Churn-Benchmarks-2025',
  '/posts/Cancel-Flow-Examples',
  '/posts/Ultimate-Guide-SaaS-Churn',
  '/posts/Why-Churn-Recovery-Is-Free',
  '/posts/SaaS-Pricing-Psychology',
  '/posts/Subscription-Revenue',
  '/posts/Involuntary-Churn-Recovery',
  '/posts/Payment-Failure-Recovery',
  // Compare pages
  '/compare/baremetrics',
  '/compare/churnbuster',
  '/compare/churnkey',
  '/compare/profitwell',
  '/compare/raaft',
  '/compare/stunning',
  // Alternatives
  '/alternatives/baremetrics',
  '/alternatives/churnbuster',
  '/alternatives/churnkey',
  '/alternatives/profitwell',
  '/alternatives/raaft',
  '/alternatives/stunning',
  // Integrations
  '/integrations/braintree',
  '/integrations/chargebee',
  '/integrations/custom',
  '/integrations/paddle',
  '/integrations/recurly',
  '/integrations/stripe',
  // Templates
  '/templates/aggressive-save',
  '/templates/ecommerce-subscription',
  '/templates/feedback-first',
  '/templates/freemium-upgrade',
  '/templates/high-ticket',
  '/templates/saas-standard',
  // Use cases
  '/use-cases/b2b-saas',
  '/use-cases/developer-tools',
  '/use-cases/ecommerce-subscriptions',
  '/use-cases/fintech',
  '/use-cases/media-subscriptions',
  '/use-cases/professional-services',
  // Tools
  '/tools/churn-calculator',
  '/tools/roi-calculator',
  '/tools/churn-rate-calculator',
];

function shouldSkipLink(href) {
  if (!href) return true;
  return SKIP_PATTERNS.some(pattern => pattern.test(href));
}

function normalizePath(href) {
  return href.split('#')[0].split('?')[0];
}

test.describe('all links — signed out', () => {
  // Crawl a representative set of high-traffic pages
  const pagesToCrawl = [
    '/', '/features', '/pricing', '/demo', '/blog', '/docs',
    '/integrations', '/templates', '/use-cases', '/about',
    '/tools/churn-calculator', '/tools/roi-calculator',
  ];

  for (const sourcePage of pagesToCrawl) {
    test(`all internal links on ${sourcePage} return 200`, async ({ page }) => {
      await mockSignedOut(page);
      await page.goto(sourcePage, { waitUntil: 'domcontentloaded' });

      const links = await page.$$eval('a[href^="/"]', (anchors) =>
        [...new Set(anchors.map(a => a.getAttribute('href')).filter(Boolean))]
      );

      const brokenLinks = [];

      for (const href of links) {
        if (shouldSkipLink(href)) continue;
        const path = normalizePath(href);
        if (!path || path === '/') continue;
        if (KNOWN_MISSING.includes(path)) continue;
        if (path.includes('[[')) continue; // Next.js catch-all

        const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
        if (!response || response.status() !== 200) {
          brokenLinks.push({ href, status: response?.status() || 'no response' });
        }
      }

      if (brokenLinks.length > 0) {
        console.log(`Broken links on ${sourcePage}:`, JSON.stringify(brokenLinks, null, 2));
      }
      expect(brokenLinks, `Broken links found on ${sourcePage}`).toHaveLength(0);
    });
  }
});

test.describe('all links — signed in', () => {
  const pagesToCrawl = [
    '/app/dashboard', '/app/analytics', '/app/cancel-flow',
    '/app/settings', '/app/install', '/app/projects',
  ];

  for (const sourcePage of pagesToCrawl) {
    test(`all internal links on ${sourcePage} return 200`, async ({ page }) => {
      await mockSignedIn(page);
      await page.goto(sourcePage, { waitUntil: 'domcontentloaded' });

      const links = await page.$$eval('a[href^="/"]', (anchors) =>
        [...new Set(anchors.map(a => a.getAttribute('href')).filter(Boolean))]
      );

      const brokenLinks = [];

      for (const href of links) {
        if (shouldSkipLink(href)) continue;
        const path = normalizePath(href);
        if (!path || path === '/') continue;
        if (KNOWN_MISSING.includes(path)) continue;
        if (path.includes('[[')) continue;

        const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
        if (!response || response.status() !== 200) {
          brokenLinks.push({ href, status: response?.status() || 'no response' });
        }
      }

      if (brokenLinks.length > 0) {
        console.log(`Broken links on ${sourcePage} (signed in):`, JSON.stringify(brokenLinks, null, 2));
      }
      expect(brokenLinks, `Broken links found on ${sourcePage}`).toHaveLength(0);
    });
  }
});
