export const templates = [
  {
    slug: 'saas-standard',
    name: 'SaaS Standard',
    description: 'The most popular cancel flow template. Covers price objections, feature gaps, and low usage with smart offers tailored to each reason.',
    category: 'General',
    saveRate: '28-35%',
    bestFor: 'B2B SaaS with $20-200/mo plans',
    preview: {
      reasons: [
        { id: 'too-expensive', label: 'Too expensive', icon: '💰', offer: 'discount' },
        { id: 'not-using', label: "Not using it enough", icon: '😴', offer: 'pause' },
        { id: 'missing-feature', label: 'Missing a feature', icon: '🔧', offer: 'human' },
        { id: 'switching', label: 'Switching to competitor', icon: '👋', offer: 'discount' },
        { id: 'temporary', label: 'Just need a break', icon: '⏸️', offer: 'pause' },
        { id: 'other', label: 'Other reason', icon: '💬', offer: 'feedback' },
      ],
      offers: {
        discount: { type: 'discount', percent: 30, duration: 3, headline: 'How about 30% off for 3 months?' },
        pause: { type: 'pause', months: 2, headline: "We'll pause your subscription — come back anytime" },
        human: { type: 'human', headline: "We'd love to hear what you need", message: 'Chat with our product team about your feature request.' },
        feedback: { type: 'feedback', headline: 'Before you go...', prompt: 'Any feedback that could help us improve?' },
      },
    },
    code: `const result = await cr.showCancelFlow({
  customerId: user.id,
  subscriptionId: user.subId,
  reasons: [
    { id: 'too-expensive', label: 'Too expensive', icon: '💰',
      offer: { type: 'discount', percent: 30, duration: 3 } },
    { id: 'not-using', label: "Not using it enough", icon: '😴',
      offer: { type: 'pause', months: 2 } },
    { id: 'missing-feature', label: 'Missing a feature', icon: '🔧',
      offer: { type: 'human' } },
    { id: 'switching', label: 'Switching to competitor', icon: '👋',
      offer: { type: 'discount', percent: 30, duration: 3 } },
    { id: 'temporary', label: 'Just need a break', icon: '⏸️',
      offer: { type: 'pause', months: 2 } },
    { id: 'other', label: 'Other reason', icon: '💬',
      offer: { type: 'feedback' } },
  ]
})`,
  },
  {
    slug: 'high-ticket',
    name: 'High-Ticket Enterprise',
    description: 'Designed for enterprise and high-ARPU products. Prioritizes human escalation and generous discounts to save high-value accounts.',
    category: 'Enterprise',
    saveRate: '35-45%',
    bestFor: 'Enterprise SaaS with $500+/mo plans',
    preview: {
      reasons: [
        { id: 'budget-cuts', label: 'Budget cuts', icon: '📉', offer: 'discount' },
        { id: 'not-enough-value', label: 'Not enough value for the price', icon: '⚖️', offer: 'human' },
        { id: 'switching', label: 'Evaluating alternatives', icon: '🔄', offer: 'human' },
        { id: 'technical-issues', label: 'Technical issues', icon: '🐛', offer: 'human' },
        { id: 'team-change', label: 'Team reorganization', icon: '👥', offer: 'pause' },
        { id: 'other', label: 'Other', icon: '💬', offer: 'human' },
      ],
      offers: {
        discount: { type: 'discount', percent: 40, duration: 6, headline: "Let's make it work — 40% off for 6 months" },
        pause: { type: 'pause', months: 3, headline: 'Pause while your team settles in' },
        human: { type: 'human', headline: "Let's get you to the right person", message: 'Your account manager will reach out within 2 hours.' },
      },
    },
    code: `const result = await cr.showCancelFlow({
  customerId: user.id,
  subscriptionId: user.subId,
  reasons: [
    { id: 'budget-cuts', label: 'Budget cuts', icon: '📉',
      offer: { type: 'discount', percent: 40, duration: 6 } },
    { id: 'not-enough-value', label: 'Not enough value', icon: '⚖️',
      offer: { type: 'human', message: 'Account manager will reach out in 2h' } },
    { id: 'switching', label: 'Evaluating alternatives', icon: '🔄',
      offer: { type: 'human' } },
    { id: 'technical-issues', label: 'Technical issues', icon: '🐛',
      offer: { type: 'human', url: '/support/priority' } },
    { id: 'team-change', label: 'Team reorganization', icon: '👥',
      offer: { type: 'pause', months: 3 } },
    { id: 'other', label: 'Other', icon: '💬',
      offer: { type: 'human' } },
  ]
})`,
  },
  {
    slug: 'freemium-upgrade',
    name: 'Freemium Downgrade',
    description: 'Instead of full cancellation, offer a free tier downgrade. Perfect for products with freemium models where keeping users in the ecosystem matters.',
    category: 'Consumer',
    saveRate: '40-55%',
    bestFor: 'Freemium products, consumer SaaS, mobile apps',
    preview: {
      reasons: [
        { id: 'too-expensive', label: "It's too expensive", icon: '💰', offer: 'downgrade' },
        { id: 'not-using-premium', label: "Don't use premium features", icon: '🤷', offer: 'downgrade' },
        { id: 'found-free-alt', label: 'Found a free alternative', icon: '🆓', offer: 'discount' },
        { id: 'temporary', label: "Don't need it right now", icon: '📅', offer: 'pause' },
        { id: 'other', label: 'Something else', icon: '💬', offer: 'feedback' },
      ],
      offers: {
        downgrade: { type: 'discount', percent: 100, duration: 0, headline: 'How about switching to our Free plan?', subtext: 'Keep access to core features at no cost' },
        discount: { type: 'discount', percent: 50, duration: 3, headline: '50% off for 3 months?' },
        pause: { type: 'pause', months: 1, headline: 'Pause for a month — no charge' },
        feedback: { type: 'feedback', headline: 'Help us improve', prompt: 'What would make the premium plan worth it?' },
      },
    },
    code: `const result = await cr.showCancelFlow({
  customerId: user.id,
  subscriptionId: user.subId,
  reasons: [
    { id: 'too-expensive', label: "It's too expensive", icon: '💰',
      offer: { type: 'downgrade', plan: 'free' } },
    { id: 'not-using-premium', label: "Don't use premium features", icon: '🤷',
      offer: { type: 'downgrade', plan: 'free' } },
    { id: 'found-free-alt', label: 'Found a free alternative', icon: '🆓',
      offer: { type: 'discount', percent: 50, duration: 3 } },
    { id: 'temporary', label: "Don't need it right now", icon: '📅',
      offer: { type: 'pause', months: 1 } },
    { id: 'other', label: 'Something else', icon: '💬',
      offer: { type: 'feedback' } },
  ]
})`,
  },
  {
    slug: 'feedback-first',
    name: 'Feedback-First',
    description: 'Prioritizes collecting detailed feedback over saving customers. Ideal for early-stage products where understanding churn reasons matters more than retention.',
    category: 'Early Stage',
    saveRate: '15-22%',
    bestFor: 'Pre-PMF startups, beta products, products iterating rapidly',
    preview: {
      reasons: [
        { id: 'not-what-expected', label: 'Not what I expected', icon: '😕', offer: 'feedback' },
        { id: 'too-complex', label: 'Too hard to use', icon: '🤯', offer: 'human' },
        { id: 'missing-feature', label: 'Missing key feature', icon: '🔧', offer: 'feedback' },
        { id: 'too-expensive', label: 'Too expensive for what I get', icon: '💰', offer: 'discount' },
        { id: 'bugs', label: 'Too many bugs', icon: '🐛', offer: 'human' },
        { id: 'other', label: 'Something else', icon: '💬', offer: 'feedback' },
      ],
      offers: {
        feedback: { type: 'feedback', headline: 'Your feedback shapes our roadmap', prompt: 'What would need to change for you to stay? Be as specific as you can.' },
        human: { type: 'human', headline: 'Talk to our founder', message: 'Our founder wants to hear from you directly. Schedule a 10-min call.' },
        discount: { type: 'discount', percent: 50, duration: 2, headline: 'Stay while we improve — 50% off for 2 months' },
      },
    },
    code: `const result = await cr.showCancelFlow({
  customerId: user.id,
  subscriptionId: user.subId,
  reasons: [
    { id: 'not-what-expected', label: 'Not what I expected', icon: '😕',
      offer: { type: 'feedback', prompt: 'What did you expect vs what you got?' } },
    { id: 'too-complex', label: 'Too hard to use', icon: '🤯',
      offer: { type: 'human', message: 'Talk to our founder' } },
    { id: 'missing-feature', label: 'Missing key feature', icon: '🔧',
      offer: { type: 'feedback', prompt: 'What feature would change your mind?' } },
    { id: 'too-expensive', label: 'Too expensive', icon: '💰',
      offer: { type: 'discount', percent: 50, duration: 2 } },
    { id: 'bugs', label: 'Too many bugs', icon: '🐛',
      offer: { type: 'human', url: '/report-bug' } },
    { id: 'other', label: 'Something else', icon: '💬',
      offer: { type: 'feedback' } },
  ]
})`,
  },
  {
    slug: 'ecommerce-subscription',
    name: 'E-Commerce Subscription',
    description: 'Built for subscription boxes and recurring e-commerce. Offers skip-a-month, swap products, and flexible delivery changes instead of traditional SaaS offers.',
    category: 'E-Commerce',
    saveRate: '32-42%',
    bestFor: 'Subscription boxes, recurring e-commerce, DTC brands',
    preview: {
      reasons: [
        { id: 'too-much-product', label: 'I have too much product', icon: '📦', offer: 'skip' },
        { id: 'dont-like-items', label: "Don't like recent items", icon: '👎', offer: 'swap' },
        { id: 'too-expensive', label: 'Too expensive', icon: '💰', offer: 'discount' },
        { id: 'delivery-issues', label: 'Delivery problems', icon: '🚚', offer: 'human' },
        { id: 'temporary', label: 'Going on vacation', icon: '✈️', offer: 'skip' },
        { id: 'other', label: 'Other reason', icon: '💬', offer: 'feedback' },
      ],
      offers: {
        skip: { type: 'pause', months: 1, headline: 'Skip your next delivery — no charge' },
        swap: { type: 'human', headline: "Let's customize your next box", message: 'Pick exactly what you want in your next delivery.' },
        discount: { type: 'discount', percent: 25, duration: 2, headline: '25% off your next 2 deliveries' },
        human: { type: 'human', headline: "We'll fix this", message: 'Our team will resolve your delivery issue ASAP.' },
        feedback: { type: 'feedback', headline: 'Help us do better', prompt: 'What would make our subscription perfect for you?' },
      },
    },
    code: `const result = await cr.showCancelFlow({
  customerId: user.id,
  subscriptionId: user.subId,
  reasons: [
    { id: 'too-much-product', label: 'I have too much product', icon: '📦',
      offer: { type: 'pause', months: 1 } },
    { id: 'dont-like-items', label: "Don't like recent items", icon: '👎',
      offer: { type: 'human', message: 'Customize your next box' } },
    { id: 'too-expensive', label: 'Too expensive', icon: '💰',
      offer: { type: 'discount', percent: 25, duration: 2 } },
    { id: 'delivery-issues', label: 'Delivery problems', icon: '🚚',
      offer: { type: 'human' } },
    { id: 'temporary', label: 'Going on vacation', icon: '✈️',
      offer: { type: 'pause', months: 1 } },
    { id: 'other', label: 'Other reason', icon: '💬',
      offer: { type: 'feedback' } },
  ]
})`,
  },
  {
    slug: 'aggressive-save',
    name: 'Aggressive Save',
    description: 'Maximizes save rate with generous offers at every step. Best for high-LTV products where saving even a few more customers justifies deeper discounts.',
    category: 'High LTV',
    saveRate: '45-55%',
    bestFor: 'High-LTV products, annual plans, products with strong retention after month 3',
    preview: {
      reasons: [
        { id: 'too-expensive', label: 'Too expensive', icon: '💰', offer: 'big-discount' },
        { id: 'not-using', label: 'Not using it', icon: '😴', offer: 'pause-long' },
        { id: 'switching', label: 'Found something better', icon: '👋', offer: 'big-discount' },
        { id: 'missing-feature', label: 'Missing features', icon: '🔧', offer: 'human-priority' },
        { id: 'other', label: 'Other', icon: '💬', offer: 'discount' },
      ],
      offers: {
        'big-discount': { type: 'discount', percent: 50, duration: 6, headline: '50% off for the next 6 months' },
        'pause-long': { type: 'pause', months: 3, headline: 'Take 3 months off — on us' },
        'human-priority': { type: 'human', headline: 'Priority feature request', message: "We'll fast-track your request. Our PM will reach out today." },
        discount: { type: 'discount', percent: 30, duration: 3, headline: '30% off for 3 months while we improve' },
      },
    },
    code: `const result = await cr.showCancelFlow({
  customerId: user.id,
  subscriptionId: user.subId,
  reasons: [
    { id: 'too-expensive', label: 'Too expensive', icon: '💰',
      offer: { type: 'discount', percent: 50, duration: 6 } },
    { id: 'not-using', label: 'Not using it', icon: '😴',
      offer: { type: 'pause', months: 3 } },
    { id: 'switching', label: 'Found something better', icon: '👋',
      offer: { type: 'discount', percent: 50, duration: 6 } },
    { id: 'missing-feature', label: 'Missing features', icon: '🔧',
      offer: { type: 'human', message: "PM will reach out today" } },
    { id: 'other', label: 'Other', icon: '💬',
      offer: { type: 'discount', percent: 30, duration: 3 } },
  ]
})`,
  },
]

export function getTemplateBySlug(slug) {
  return templates.find(t => t.slug === slug)
}

export function getAllTemplateSlugs() {
  return templates.map(t => t.slug)
}
