// Competitor comparison data for /compare/ and /alternatives/ pages

export const competitors = {
  churnkey: {
    name: 'Churnkey',
    slug: 'churnkey',
    tagline: 'AI-powered cancel flows',
    website: 'https://churnkey.co',
    pricing: {
      label: '$250–$825/mo',
      entry: 250,
      notes: 'Based on MRR. Free trial available.',
    },
    founded: '2021',
    description: 'Churnkey is a popular churn prevention platform offering AI-powered cancel flows, pause offers, and failed payment recovery. It integrates with Stripe and a handful of other payment processors.',
    strengths: [
      'Polished UI and onboarding',
      'AI-generated cancel flow suggestions',
      'Good Stripe integration',
      'Established customer base',
    ],
    weaknesses: [
      'Expensive — starts at $250/mo',
      'Per-MRR pricing scales poorly',
      'Closed source, black-box logic',
      'Limited customization for developers',
      'No free tier',
    ],
    features: {
      cancelFlows: { churnrecovery: true, them: true },
      pauseOffers: { churnrecovery: true, them: true },
      failedPaymentRecovery: { churnrecovery: true, them: true },
      aiSuggestions: { churnrecovery: true, them: true },
      customBranding: { churnrecovery: true, them: 'Paid plans only' },
      openSource: { churnrecovery: true, them: false },
      freeTier: { churnrecovery: true, them: false },
      developerAPI: { churnrecovery: true, them: 'Limited' },
      analytics: { churnrecovery: true, them: true },
      multiplePaymentProcessors: { churnrecovery: true, them: 'Stripe only' },
      a_bTesting: { churnrecovery: true, them: 'Higher tier only' },
      webhooks: { churnrecovery: true, them: true },
    },
    verdict: 'Churnkey is a solid product, but its pricing makes it inaccessible for early-stage SaaS companies. ChurnRecovery delivers comparable cancel flow intelligence at $0/month — keeping your margins intact while you grow.',
  },

  profitwell: {
    name: 'ProfitWell Retain',
    slug: 'profitwell',
    tagline: 'Failed payment recovery + churn reduction',
    website: 'https://www.profitwell.com/retain',
    pricing: {
      label: 'Performance-based (% of recovered revenue)',
      entry: 0,
      notes: 'ProfitWell Retain charges a percentage of recovered revenue. No fixed price.',
    },
    founded: '2012',
    description: 'ProfitWell Retain (now part of Paddle) is a churn reduction tool focused on dunning and failed payment recovery. It uses benchmarked messaging sequences to recover failed charges.',
    strengths: [
      'Performance-based pricing (no fixed cost)',
      'Large dataset for benchmarking',
      'Strong dunning capabilities',
      'Part of Paddle ecosystem',
    ],
    weaknesses: [
      'Takes % of every recovered dollar — cost scales up',
      'Less focus on voluntary cancel flows',
      'Complex pricing model',
      'Limited developer customization',
      'Paddle ecosystem lock-in',
    ],
    features: {
      cancelFlows: { churnrecovery: true, them: 'Basic' },
      pauseOffers: { churnrecovery: true, them: false },
      failedPaymentRecovery: { churnrecovery: true, them: true },
      aiSuggestions: { churnrecovery: true, them: 'Benchmark-based' },
      customBranding: { churnrecovery: true, them: 'Limited' },
      openSource: { churnrecovery: true, them: false },
      freeTier: { churnrecovery: true, them: false },
      developerAPI: { churnrecovery: true, them: 'Limited' },
      analytics: { churnrecovery: true, them: true },
      multiplePaymentProcessors: { churnrecovery: true, them: 'Paddle-first' },
      a_bTesting: { churnrecovery: true, them: false },
      webhooks: { churnrecovery: true, them: true },
    },
    verdict: 'ProfitWell Retain excels at dunning but charges a percentage of every recovered dollar — meaning your cost grows as you succeed. ChurnRecovery keeps 100% of your recovered revenue in your pocket, with no performance tax.',
  },

  churnbuster: {
    name: 'Churn Buster',
    slug: 'churnbuster',
    tagline: 'Failed payment recovery for Stripe',
    website: 'https://churnbuster.io',
    pricing: {
      label: '$149–$299/mo',
      entry: 149,
      notes: 'Fixed monthly pricing based on Stripe MRR.',
    },
    founded: '2016',
    description: 'Churn Buster is a Stripe-focused dunning tool that specializes in recovering failed payments through smart retry logic and email sequences. It is narrowly focused on involuntary churn.',
    strengths: [
      'Best-in-class Stripe dunning',
      'Smart retry logic',
      'Clean email sequences',
      'Simple setup',
    ],
    weaknesses: [
      'Stripe-only',
      'No voluntary cancel flow tools',
      'No pause or discount offers',
      'Relatively expensive for what it does',
      'No developer API',
    ],
    features: {
      cancelFlows: { churnrecovery: true, them: false },
      pauseOffers: { churnrecovery: true, them: false },
      failedPaymentRecovery: { churnrecovery: true, them: true },
      aiSuggestions: { churnrecovery: true, them: false },
      customBranding: { churnrecovery: true, them: 'Limited' },
      openSource: { churnrecovery: true, them: false },
      freeTier: { churnrecovery: true, them: false },
      developerAPI: { churnrecovery: true, them: false },
      analytics: { churnrecovery: true, them: 'Basic' },
      multiplePaymentProcessors: { churnrecovery: true, them: false },
      a_bTesting: { churnrecovery: true, them: false },
      webhooks: { churnrecovery: true, them: 'Basic' },
    },
    verdict: 'Churn Buster is focused and does dunning well — but it starts at $149/mo and does nothing about voluntary cancellations. ChurnRecovery handles both voluntary churn and failed payments, completely free.',
  },

  stunning: {
    name: 'Stunning',
    slug: 'stunning',
    tagline: 'Dunning and failed payment recovery',
    website: 'https://stunning.co',
    pricing: {
      label: '$50–$200/mo',
      entry: 50,
      notes: 'Tiered pricing based on recovered revenue or subscriber count.',
    },
    founded: '2014',
    description: 'Stunning is a dunning tool for Stripe-based businesses that helps recover failed payments through smart email sequences and in-app messaging. It is one of the older tools in this space.',
    strengths: [
      'Affordable entry price',
      'Good email templates',
      'SMS notifications',
      'Long track record',
    ],
    weaknesses: [
      'Stripe-only',
      'No cancel flow features',
      'Dated UI',
      'Limited analytics',
      'Still costs money',
    ],
    features: {
      cancelFlows: { churnrecovery: true, them: false },
      pauseOffers: { churnrecovery: true, them: false },
      failedPaymentRecovery: { churnrecovery: true, them: true },
      aiSuggestions: { churnrecovery: true, them: false },
      customBranding: { churnrecovery: true, them: 'Limited' },
      openSource: { churnrecovery: true, them: false },
      freeTier: { churnrecovery: true, them: false },
      developerAPI: { churnrecovery: true, them: 'Basic' },
      analytics: { churnrecovery: true, them: 'Basic' },
      multiplePaymentProcessors: { churnrecovery: true, them: false },
      a_bTesting: { churnrecovery: true, them: false },
      webhooks: { churnrecovery: true, them: false },
    },
    verdict: 'Stunning handles dunning at an accessible price point, but it lacks any cancel flow tools and is Stripe-only. For comprehensive churn recovery across voluntary and involuntary churn — at $0 — ChurnRecovery is the clear choice.',
  },

  baremetrics: {
    name: 'Baremetrics',
    slug: 'baremetrics',
    tagline: 'SaaS analytics + churn recovery',
    website: 'https://baremetrics.com',
    pricing: {
      label: '$108–$469/mo',
      entry: 108,
      notes: 'Recover is an add-on. Priced based on MRR.',
    },
    founded: '2013',
    description: 'Baremetrics is primarily a SaaS analytics platform. It offers "Recover" — a dunning and cancel flow tool as an add-on. It is best known for its metrics dashboard, not churn recovery.',
    strengths: [
      'Excellent SaaS metrics dashboard',
      'Good Stripe integration',
      'Established brand',
      'Recover includes basic cancel flows',
    ],
    weaknesses: [
      'Expensive if you only want churn recovery',
      'Analytics platform first — churn recovery is secondary',
      'Recover is a paid add-on',
      'No developer API for cancel flows',
      'Limited customization',
    ],
    features: {
      cancelFlows: { churnrecovery: true, them: 'Add-on cost' },
      pauseOffers: { churnrecovery: true, them: 'Limited' },
      failedPaymentRecovery: { churnrecovery: true, them: 'Add-on' },
      aiSuggestions: { churnrecovery: true, them: false },
      customBranding: { churnrecovery: true, them: 'Limited' },
      openSource: { churnrecovery: true, them: false },
      freeTier: { churnrecovery: true, them: false },
      developerAPI: { churnrecovery: true, them: 'Analytics only' },
      analytics: { churnrecovery: true, them: true },
      multiplePaymentProcessors: { churnrecovery: true, them: 'Stripe-first' },
      a_bTesting: { churnrecovery: true, them: false },
      webhooks: { churnrecovery: true, them: true },
    },
    verdict: 'Baremetrics is an analytics tool first. If you need churn recovery, you pay extra for a tacked-on feature. ChurnRecovery is purpose-built for churn prevention and completely free — a better choice for teams that want to stop churn, not just measure it.',
  },
}

export const featureLabels = {
  cancelFlows: 'Cancel flow builder',
  pauseOffers: 'Pause / snooze offers',
  failedPaymentRecovery: 'Failed payment recovery',
  aiSuggestions: 'AI-powered suggestions',
  customBranding: 'Custom branding',
  openSource: 'Open source',
  freeTier: 'Free tier',
  developerAPI: 'Developer API',
  analytics: 'Analytics dashboard',
  multiplePaymentProcessors: 'Multiple payment processors',
  a_bTesting: 'A/B testing',
  webhooks: 'Webhooks',
}

export function getCompetitor(slug) {
  return competitors[slug] || null
}

export function getAllCompetitorSlugs() {
  return Object.keys(competitors)
}

export function getFeatureValue(val) {
  if (val === true) return { type: 'yes', label: 'Yes' }
  if (val === false) return { type: 'no', label: 'No' }
  return { type: 'partial', label: val }
}
