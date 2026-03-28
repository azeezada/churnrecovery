// @ts-check
const { test, expect } = require('@playwright/test');

/*
 * Every page in out/ returns 200, has a <title>, and has no error text in body.
 * Grouped by section.
 */

const pages = {
  marketing: [
    ['/', 'Homepage'],
    ['/about', 'About'],
    ['/features', 'Features'],
    ['/pricing', 'Pricing'],
    ['/integrations', 'Integrations'],
    ['/demo', 'Demo'],
    ['/docs', 'Docs'],
    ['/blog', 'Blog'],
    ['/status', 'Status'],
    ['/templates', 'Templates'],
    ['/use-cases', 'Use Cases'],
  ],
  app: [
    ['/app/sign-in', 'Sign In'],
    ['/app/sign-up', 'Sign Up'],
    ['/app/dashboard', 'Dashboard'],
    ['/app/analytics', 'Analytics'],
    ['/app/cancel-flow', 'Cancel Flow'],
    ['/app/connect-stripe', 'Connect Stripe'],
    ['/app/install', 'Install'],
    ['/app/onboarding', 'Onboarding'],
    ['/app/projects', 'Projects'],
    ['/app/settings', 'Settings'],
  ],
  blog: [
    ['/posts/B2B-SaaS-Churn-Benchmarks-2025', 'B2B SaaS Churn Benchmarks'],
    ['/posts/Cancel-Flow-Examples', 'Cancel Flow Examples'],
    ['/posts/Churnkey-Pricing-2026-Is-It-Worth-250-Month', 'Churnkey Pricing'],
    ['/posts/How-to-Build-Cancel-Flow-That-Saves-30-Percent-Churning-Customers', 'Cancel Flow Guide'],
    ['/posts/Involuntary-Churn-Recovery', 'Involuntary Churn'],
    ['/posts/Payment-Failure-Recovery', 'Payment Failure Recovery'],
    ['/posts/SaaS-Pricing-Psychology', 'SaaS Pricing Psychology'],
    ['/posts/Subscription-Revenue', 'Subscription Revenue'],
    ['/posts/Ultimate-Guide-SaaS-Churn', 'Ultimate Guide SaaS Churn'],
    ['/posts/Why-Churn-Recovery-Is-Free', 'Why Churn Recovery Is Free'],
  ],
  compare: [
    ['/compare/baremetrics', 'vs Baremetrics'],
    ['/compare/churnbuster', 'vs Churnbuster'],
    ['/compare/churnkey', 'vs Churnkey'],
    ['/compare/profitwell', 'vs ProfitWell'],
    ['/compare/raaft', 'vs Raaft'],
    ['/compare/stunning', 'vs Stunning'],
    ['/compare/brightback', 'vs Brightback'],
    ['/compare/paddle-retain', 'vs Paddle Retain'],
    ['/compare/stripe-billing', 'vs Stripe Billing'],
    ['/compare/recurly', 'vs Recurly'],
    ['/compare/zuora', 'vs Zuora'],
  ],
  alternatives: [
    ['/alternatives/baremetrics', 'Baremetrics Alternative'],
    ['/alternatives/churnbuster', 'Churnbuster Alternative'],
    ['/alternatives/churnkey', 'Churnkey Alternative'],
    ['/alternatives/profitwell', 'ProfitWell Alternative'],
    ['/alternatives/raaft', 'Raaft Alternative'],
    ['/alternatives/stunning', 'Stunning Alternative'],
  ],
  integrations: [
    ['/integrations/braintree', 'Braintree'],
    ['/integrations/chargebee', 'Chargebee'],
    ['/integrations/custom', 'Custom'],
    ['/integrations/paddle', 'Paddle'],
    ['/integrations/recurly', 'Recurly'],
    ['/integrations/stripe', 'Stripe'],
  ],
  templates: [
    ['/templates/aggressive-save', 'Aggressive Save'],
    ['/templates/ecommerce-subscription', 'Ecommerce Subscription'],
    ['/templates/feedback-first', 'Feedback First'],
    ['/templates/freemium-upgrade', 'Freemium Upgrade'],
    ['/templates/high-ticket', 'High Ticket'],
    ['/templates/saas-standard', 'SaaS Standard'],
  ],
  useCases: [
    ['/use-cases/b2b-saas', 'B2B SaaS'],
    ['/use-cases/developer-tools', 'Developer Tools'],
    ['/use-cases/ecommerce-subscriptions', 'Ecommerce Subscriptions'],
    ['/use-cases/fintech', 'Fintech'],
    ['/use-cases/media-subscriptions', 'Media Subscriptions'],
    ['/use-cases/professional-services', 'Professional Services'],
  ],
  tools: [
    ['/tools/churn-calculator', 'Churn Calculator'],
    ['/tools/roi-calculator', 'ROI Calculator'],
    ['/tools/churn-rate-calculator', 'Churn Rate Calculator'],
  ],
  for: [
    ['/for/substack', 'Substack'],
    ['/for/memberful', 'Memberful'],
    ['/for/stan-store', 'Stan Store'],
    ['/for/payhip', 'Payhip'],
    ['/for/stripe', 'Stripe'],
    ['/for/squarespace', 'Squarespace'],
    ['/for/chargebee', 'Chargebee'],
    ['/for/lemon-squeezy', 'Lemon Squeezy'],
    ['/for/beehiiv', 'Beehiiv'],
    ['/for/convertkit', 'ConvertKit'],
  ],
  legal: [
    ['/privacy', 'Privacy'],
    ['/terms', 'Terms'],
  ],
};

for (const [section, pageList] of Object.entries(pages)) {
  test.describe(`${section} pages`, () => {
    for (const [path, label] of pageList) {
      test(`${label} (${path}) loads correctly`, async ({ page }) => {
        const response = await page.goto(path, { waitUntil: 'domcontentloaded' });

        // Assert HTTP 200
        expect(response.status()).toBe(200);

        // Assert page has a <title>
        const title = await page.title();
        expect(title.length).toBeGreaterThan(0);

        // Assert no error text in body
        const bodyText = await page.textContent('body');
        expect(bodyText).not.toContain('Internal Server Error');
        // Don't check for bare "500" since pages legitimately contain "$500", "500,000", etc.
      });
    }
  });
}
