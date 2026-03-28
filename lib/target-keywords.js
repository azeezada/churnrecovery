/**
 * Target Keywords — Central keyword tracking config for ChurnRecovery.
 *
 * Used by /site-analytics, /seo-audit, /content-pipeline, and /seo-optimize skills.
 * Sources: research/seo_strategy.md (55+ keywords), docs/seo-content-gap-analysis.md (35 keywords)
 */

export const targetKeywords = {
  // Tier 1: High-intent, bottom-of-funnel — must own these
  primary: [
    'churn recovery',
    'cancel flow software',
    'churn recovery saas',
    'affordable churn recovery software',
    'free dunning management software',
    'churn deflection software',
    'subscription cancellation flow platform',
    'churn prevention software',
    'customer retention tool',
    'churn management software',
    'saas retention software',
  ],

  // Tier 2: Problem-aware, mid-funnel — build authority
  secondary: [
    'reduce voluntary churn',
    'reduce involuntary churn',
    'failed payment recovery saas',
    'dunning management best practices',
    'subscription churn prevention',
    'how to build a cancel flow',
    'exit survey best practices saas',
    'subscription pause vs cancel',
    'payment retry optimization',
    'smart payment retries',
    'cancellation flow examples',
    'win-back email templates saas',
    'customer offboarding software',
    'a/b test cancellation flows',
  ],

  // Tier 3: Top-of-funnel, informational — drive organic traffic
  longTail: [
    'how to reduce saas churn',
    'saas churn rate benchmark 2026',
    'average saas churn rate',
    'customer retention strategies saas',
    'what is a cancel flow',
    'churn rate calculator',
    'stripe cancel flow',
    'cancel flow best practices',
    'dunning email templates',
    'failed payment recovery best practices',
    'churn rate for saas',
    'b2b saas churn vs b2c churn',
    'saas churn rate by company size',
    'involuntary churn rate benchmark',
    'voluntary churn rate benchmark',
    'best time to retry failed payment',
    'stripe failed payment recovery',
    'how to stop subscribers cancelling',
  ],

  // Competitor comparison terms
  competitor: [
    'churnkey alternative',
    'churnkey pricing',
    'profitwell alternative',
    'profitwell retain alternative',
    'brightback alternative',
    'paddle retain alternative',
    'chargebee retain alternative',
    'churn buster alternative',
    'prosperstack alternative',
    'raaft alternative',
    'churnkey alternatives free',
    'baremetrics recover alternative',
  ],

  // Platform-specific content gaps (from seo-content-gap-analysis.md)
  platform: [
    'shopify subscription churn',
    'woocommerce subscription churn',
    'kajabi churn rate',
    'substack churn rate',
    'teachable subscription churn',
    'ghost membership churn',
    'patreon churn rate',
    'beehiiv paid subscribers churn',
    'memberful churn rate',
    'circle community churn',
  ],

  // Niche cancel flow terms
  niche: [
    'podcast subscription cancel flow',
    'fitness app cancel flow',
    'membership site cancel flow',
    'newsletter cancel flow',
    'saas cancel flow examples',
    'stripe cancel flow',
    'online course cancel flow',
    'cancel flow templates',
    'subscription box cancel flow',
  ],

  // Competitors to monitor in SERP tracking
  competitors: [
    { name: 'Churnkey', domain: 'churnkey.co' },
    { name: 'ProfitWell/Paddle', domain: 'profitwell.com' },
    { name: 'Brightback', domain: 'brightback.com' },
    { name: 'Chargebee Retain', domain: 'chargebee.com' },
    { name: 'Paddle Retain', domain: 'paddle.com' },
    { name: 'Baremetrics', domain: 'baremetrics.com' },
    { name: 'ChurnZero', domain: 'churnzero.com' },
    { name: 'Raaft', domain: 'raaft.io' },
    { name: 'ProsperStack', domain: 'prosperstack.com' },
  ],

  // Programmatic SEO patterns — template-driven page generation at scale
  programmatic: [
    { pattern: '{platform} churn rate', path: '/churn-rate/{platform}' },
    { pattern: '{competitor} alternative', path: '/alternatives/{competitor}' },
    { pattern: '{competitor} vs ChurnRecovery', path: '/compare/{competitor}' },
    { pattern: 'how to reduce churn {niche}', path: '/guides/{niche}' },
    { pattern: '{platform} cancel flow', path: '/for/{platform}' },
    { pattern: '{platform} failed payment recovery', path: '/guides/{platform}-payment-recovery' },
    { pattern: 'cancel flow template {industry}', path: '/templates/{industry}' },
    { pattern: 'dunning email template {platform}', path: '/guides/{platform}-dunning' },
  ],
}
