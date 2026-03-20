export const integrations = [
  {
    slug: 'stripe',
    name: 'Stripe',
    tagline: 'The gold standard for SaaS billing',
    description: 'ChurnRecovery\'s deepest integration. Connect in 5 minutes via OAuth. Automatic subscription sync, webhook listener for failed payments, and card updater support for recovering declined cards.',
    logo: '💳',
    color: '#635BFF',
    colorLight: '#F5F4FF',
    category: 'Payment Processor',
    setupTime: '5 minutes',
    popularity: 'Most popular',
    highlights: [
      'OAuth connect — no API keys to manage',
      'Real-time webhook sync for payment events',
      'Automatic subscription status updates',
      'Card updater support (Stripe Radar)',
      'Coupon / discount code creation from cancel flows',
      'Revenue metrics pulled directly from Stripe MRR',
    ],
    codeExample: `// Install the ChurnRecovery React SDK
npm install @churnrecovery/react

// Add to your billing cancel button
import { useCancelFlow } from '@churnrecovery/react'

function CancelSubscriptionButton({ subscriptionId }) {
  const { openCancelFlow } = useCancelFlow()
  
  return (
    <button onClick={() => openCancelFlow({
      subscriptionId,
      provider: 'stripe',
    })}>
      Cancel subscription
    </button>
  )
}`,
    features: [
      { name: 'Cancel flow interception', supported: true },
      { name: 'Failed payment recovery', supported: true },
      { name: 'Card updater', supported: true },
      { name: 'Coupon creation', supported: true },
      { name: 'Subscription pause', supported: true },
      { name: 'Downgrade offers', supported: true },
    ],
    seoContent: 'Stripe is the most common payment processor for SaaS companies. ChurnRecovery\'s Stripe integration is the fastest setup path — connect via OAuth in 5 minutes and start recovering churn today.',
  },
  {
    slug: 'paddle',
    name: 'Paddle',
    tagline: 'The merchant of record for global SaaS',
    description: 'Paddle handles tax compliance globally. ChurnRecovery integrates via Paddle\'s subscription API and webhook events to intercept cancellations and recover failed payments across 200+ countries.',
    logo: '🌊',
    color: '#4CAF50',
    colorLight: '#F1F8F1',
    category: 'Payment Processor',
    setupTime: '30 minutes',
    popularity: 'Popular',
    highlights: [
      'Webhook-based cancel interception',
      'Subscription update API for pause/downgrade',
      'Dunning sequence integration',
      'Global tax handling preserved',
      'Paddle Billing and Classic supported',
      'Multi-currency cancel flow support',
    ],
    codeExample: `// Initialize with Paddle credentials
import { ChurnRecovery } from '@churnrecovery/js'

ChurnRecovery.init({
  apiKey: process.env.CHURNRECOVERY_API_KEY,
  provider: 'paddle',
})

// On cancel click
document.getElementById('cancel-btn').addEventListener('click', (e) => {
  e.preventDefault()
  ChurnRecovery.openFlow({
    subscriptionId: currentSubscription.id,
    customerId: currentUser.id,
  })
})`,
    features: [
      { name: 'Cancel flow interception', supported: true },
      { name: 'Failed payment recovery', supported: true },
      { name: 'Card updater', supported: false },
      { name: 'Coupon creation', supported: true },
      { name: 'Subscription pause', supported: true },
      { name: 'Downgrade offers', supported: true },
    ],
    seoContent: 'Paddle is popular with European SaaS companies and teams who want a full merchant-of-record solution. ChurnRecovery\'s Paddle integration supports both Paddle Billing (new) and Paddle Classic.',
  },
  {
    slug: 'braintree',
    name: 'Braintree',
    tagline: 'PayPal\'s developer-friendly billing platform',
    description: 'Braintree (by PayPal) supports a wide range of payment methods including PayPal, Venmo, and Apple Pay. ChurnRecovery integrates via Braintree\'s subscription webhooks and management API.',
    logo: '🌿',
    color: '#1A75BB',
    colorLight: '#EEF6FC',
    category: 'Payment Processor',
    setupTime: '45 minutes',
    popularity: 'Supported',
    highlights: [
      'Subscription webhook listener',
      'Payment method update prompts',
      'PayPal payment recovery support',
      'Apple Pay / Google Pay recovery flows',
      'Sandbox testing environment',
      'REST API integration path',
    ],
    codeExample: `// Braintree integration via REST API
// 1. Set up webhook listener in ChurnRecovery dashboard
// 2. Point Braintree webhooks to ChurnRecovery endpoint

// Configure in your backend
const churnrecovery = require('@churnrecovery/node')

churnrecovery.configure({
  apiKey: process.env.CHURNRECOVERY_API_KEY,
  provider: 'braintree',
  webhookSecret: process.env.CHURNRECOVERY_WEBHOOK_SECRET,
})

// Handle incoming webhook
app.post('/webhooks/braintree', (req, res) => {
  churnrecovery.handleWebhook(req.body)
  res.sendStatus(200)
})`,
    features: [
      { name: 'Cancel flow interception', supported: true },
      { name: 'Failed payment recovery', supported: true },
      { name: 'Card updater', supported: false },
      { name: 'Coupon creation', supported: false },
      { name: 'Subscription pause', supported: true },
      { name: 'Downgrade offers', supported: true },
    ],
    seoContent: 'Braintree is owned by PayPal and is common among mid-market SaaS companies. ChurnRecovery supports Braintree through webhook-based integration with subscription management API calls.',
  },
  {
    slug: 'chargebee',
    name: 'Chargebee',
    tagline: 'Revenue operations for scaling SaaS',
    description: 'Chargebee is a full-stack subscription management platform. ChurnRecovery integrates with Chargebee\'s event system and subscription API to provide cancel flow interception and dunning enhancements.',
    logo: '⚡',
    color: '#FF6B35',
    colorLight: '#FFF2EC',
    category: 'Subscription Management',
    setupTime: '60 minutes',
    popularity: 'Supported',
    highlights: [
      'Chargebee Events API integration',
      'Subscription lifecycle webhook support',
      'Dunning sequence enhancement (on top of Chargebee dunning)',
      'Custom field mapping for cancel reasons',
      'Chargebee Retention integration pathway',
      'Multi-site / multi-currency support',
    ],
    codeExample: `// Chargebee integration
import { ChurnRecovery } from '@churnrecovery/js'

// Initialize with Chargebee site
ChurnRecovery.init({
  apiKey: process.env.CHURNRECOVERY_API_KEY,
  provider: 'chargebee',
  chargebeeSite: 'your-site.chargebee.com',
})

// Mount cancel flow on your cancel button
ChurnRecovery.mount('#cancel-subscription', {
  subscriptionId: subscription.id,
  planId: subscription.plan_id,
  customerId: customer.id,
})`,
    features: [
      { name: 'Cancel flow interception', supported: true },
      { name: 'Failed payment recovery', supported: true },
      { name: 'Card updater', supported: false },
      { name: 'Coupon creation', supported: true },
      { name: 'Subscription pause', supported: true },
      { name: 'Downgrade offers', supported: true },
    ],
    seoContent: 'Chargebee is used by companies like Freshworks and Crisp. ChurnRecovery enhances Chargebee\'s built-in retention features with better cancel flow UI and smarter offer logic.',
  },
  {
    slug: 'recurly',
    name: 'Recurly',
    tagline: 'Enterprise subscription management',
    description: 'Recurly is the subscription billing platform for enterprise SaaS. ChurnRecovery connects via Recurly\'s webhook system and REST API to intercept cancellations and enhance the default dunning flow.',
    logo: '🔄',
    color: '#9B59B6',
    colorLight: '#F5EEF8',
    category: 'Subscription Management',
    setupTime: '60 minutes',
    popularity: 'Supported',
    highlights: [
      'Recurly Push Notifications (webhooks)',
      'Subscription lifecycle event handling',
      'Invoice recovery and retry enhancement',
      'Account update flows for failed cards',
      'Multi-currency cancel flow support',
      'Enterprise SSO passthrough supported',
    ],
    codeExample: `// Recurly integration via webhooks
const churnrecovery = require('@churnrecovery/node')

// Configure the integration
churnrecovery.configure({
  apiKey: process.env.CHURNRECOVERY_API_KEY,
  provider: 'recurly',
})

// Recurly sends push notifications to this endpoint
app.post('/webhooks/recurly', 
  churnrecovery.parseWebhook(),
  (req, res) => {
    // ChurnRecovery handles the event automatically
    res.sendStatus(200)
  }
)`,
    features: [
      { name: 'Cancel flow interception', supported: true },
      { name: 'Failed payment recovery', supported: true },
      { name: 'Card updater', supported: false },
      { name: 'Coupon creation', supported: false },
      { name: 'Subscription pause', supported: true },
      { name: 'Downgrade offers', supported: true },
    ],
    seoContent: 'Recurly is the enterprise choice for subscription billing, used by companies with complex billing models. ChurnRecovery integrates via Recurly\'s robust webhook system.',
  },
  {
    slug: 'lemon-squeezy',
    name: 'Lemon Squeezy',
    tagline: 'The modern merchant of record for indie hackers',
    description: 'Lemon Squeezy is loved by indie hackers and small SaaS teams. ChurnRecovery integrates via webhooks to provide cancel flow overlays and basic payment recovery for failed subscription renewals.',
    logo: '🍋',
    color: '#FFC107',
    colorLight: '#FFFBEC',
    category: 'Payment Processor',
    setupTime: '20 minutes',
    popularity: 'Supported',
    highlights: [
      'Webhook-based cancel interception',
      'Subscription update API support',
      'Discount code creation via API',
      'Simple setup — 20 minutes to go live',
      'Perfect for bootstrapped / indie SaaS',
      'License key product support',
    ],
    codeExample: `// Lemon Squeezy — simplest setup path
import { ChurnRecovery } from '@churnrecovery/js'

ChurnRecovery.init({
  apiKey: 'cr_live_your_key_here',
  provider: 'lemon-squeezy',
})

// That's it — mount on your cancel button
ChurnRecovery.mount('[data-cancel]')`,
    features: [
      { name: 'Cancel flow interception', supported: true },
      { name: 'Failed payment recovery', supported: true },
      { name: 'Card updater', supported: false },
      { name: 'Coupon creation', supported: true },
      { name: 'Subscription pause', supported: false },
      { name: 'Downgrade offers', supported: false },
    ],
    seoContent: 'Lemon Squeezy is the go-to merchant of record for indie SaaS founders. ChurnRecovery\'s lightweight integration takes under 20 minutes and works with both subscriptions and one-time products.',
  },
]

export function getIntegration(slug) {
  return integrations.find(i => i.slug === slug)
}

export function getAllIntegrationSlugs() {
  return integrations.map(i => ({ params: { slug: i.slug } }))
}
