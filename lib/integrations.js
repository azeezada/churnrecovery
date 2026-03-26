// Integration data for /integrations pages

export const integrations = {
  stripe: {
    name: 'Stripe',
    slug: 'stripe',
    tagline: 'The most popular payment processor for SaaS',
    logo: '💳',
    color: '#635BFF',
    setupTime: '5 minutes',
    difficulty: 'Easy',
    popularity: 'Most popular',
    description: 'Stripe is the gold standard for SaaS billing. ChurnRecovery has the deepest Stripe integration in the market — native webhooks, Radar support, card updater, and Stripe Checkout compatibility out of the box.',
    longDescription: `Stripe powers billing for millions of SaaS companies worldwide. ChurnRecovery's Stripe integration is the most comprehensive available — built by developers who've worked with Stripe's API extensively.

When a customer clicks "Cancel" in your app, ChurnRecovery intercepts the request, shows a smart cancel flow, and handles everything automatically. Successful saves are logged, subscriptions are modified, and revenue is recovered — all without you writing a line of subscription management code.`,
    features: [
      'Automatic subscription pause / downgrade / discount',
      'Smart cancel flow triggered on any cancellation event',
      'Stripe Radar card updater for failed payments',
      'Webhook-native — no polling required',
      'Stripe Checkout and Payment Links compatible',
      'Test mode support for safe development',
      'Works with Stripe Billing, Subscriptions, and Customer Portal',
    ],
    useCases: [
      { title: 'Cancel Flow', desc: 'Intercept cancellations with targeted offers before the subscription ends' },
      { title: 'Failed Payment Recovery', desc: 'Automatically retry failed charges and prompt card updates' },
      { title: 'Downgrade Instead of Cancel', desc: 'Offer a lower plan to at-risk customers instead of losing them entirely' },
      { title: 'Pause Subscriptions', desc: 'Let customers pause instead of cancel — keeps LTV intact' },
    ],
    codeSnippets: [
      {
        title: 'Install the SDK',
        language: 'bash',
        code: `npm install @churnrecovery/stripe`,
      },
      {
        title: 'Initialize ChurnRecovery',
        language: 'javascript',
        code: `import ChurnRecovery from '@churnrecovery/stripe'

const cr = new ChurnRecovery({
  apiKey: process.env.CHURNRECOVERY_API_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
})`,
      },
      {
        title: 'Handle cancellation webhook',
        language: 'javascript',
        code: `// pages/api/stripe-webhook.js
import { buffer } from 'micro'
import ChurnRecovery from '@churnrecovery/stripe'

const cr = new ChurnRecovery({ apiKey: process.env.CHURNRECOVERY_API_KEY })

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature']
  const body = await buffer(req)
  
  const event = cr.stripe.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  
  if (event.type === 'customer.subscription.deleted') {
    await cr.handleCancellation(event.data.object)
  }
  
  res.json({ received: true })
}`,
      },
      {
        title: 'Embed the cancel flow widget',
        language: 'jsx',
        code: `import { CancelFlowWidget } from '@churnrecovery/react'

function CancelButton({ subscriptionId }) {
  return (
    <CancelFlowWidget
      subscriptionId={subscriptionId}
      apiKey={process.env.NEXT_PUBLIC_CHURNRECOVERY_KEY}
      onSaved={() => console.log('Customer retained!')}
      onCanceled={() => console.log('Customer churned')}
    />
  )
}`,
      },
    ],
    setupSteps: [
      'Install @churnrecovery/stripe via npm',
      'Connect your Stripe account in the ChurnRecovery dashboard',
      'Configure your webhook endpoint in Stripe Dashboard',
      'Embed the cancel flow widget where users would cancel',
      'Test with Stripe test mode — full flow in under 5 minutes',
    ],
    stats: { customers: '10,000+', avgSaveRate: '28%', setupTime: '5 min' },
  },

  paddle: {
    name: 'Paddle',
    slug: 'paddle',
    tagline: 'The merchant of record for global SaaS',
    logo: '🏓',
    color: '#44CF6C',
    setupTime: '30 minutes',
    difficulty: 'Medium',
    popularity: 'Popular for international',
    description: 'Paddle handles global tax compliance as your merchant of record. ChurnRecovery integrates with Paddle\'s subscription API and webhook system to bring cancel flows and failed payment recovery to Paddle-powered SaaS.',
    longDescription: `Paddle is the preferred billing solution for SaaS companies selling internationally — they handle VAT, GST, and global tax compliance so you don't have to. ChurnRecovery supports both Paddle Classic and Paddle Billing (the new API).

Our Paddle integration hooks into the subscription lifecycle at the right moments: before cancellation is confirmed, when a payment fails, and when a subscription is about to expire. The result is a complete retention layer built on top of Paddle's infrastructure.`,
    features: [
      'Supports Paddle Classic and Paddle Billing (v2)',
      'Cancel flow triggered before subscription ends',
      'Pause and downgrade via Paddle subscription API',
      'Failed payment detection and retry logic',
      'Email dunning sequences for past-due subscribers',
      'Webhook-based — works with Paddle\'s event system',
      'Handles Paddle\'s unique MoR billing model',
    ],
    useCases: [
      { title: 'Pre-Cancellation Intervention', desc: 'Catch customers before Paddle processes the cancellation' },
      { title: 'Tax-Compliant Discounts', desc: 'Apply discounts through Paddle\'s API to retain subscribers' },
      { title: 'Global Payment Retry', desc: 'Smart retry logic that accounts for cross-border payment failures' },
      { title: 'Dunning Sequences', desc: 'Automated email sequences for past-due Paddle subscribers' },
    ],
    codeSnippets: [
      {
        title: 'Install',
        language: 'bash',
        code: `npm install @churnrecovery/paddle`,
      },
      {
        title: 'Configure Paddle integration',
        language: 'javascript',
        code: `import ChurnRecovery from '@churnrecovery/paddle'

const cr = new ChurnRecovery({
  apiKey: process.env.CHURNRECOVERY_API_KEY,
  paddleApiKey: process.env.PADDLE_API_KEY,
  paddleEnvironment: 'production', // or 'sandbox'
})`,
      },
      {
        title: 'Handle Paddle webhook',
        language: 'javascript',
        code: `// pages/api/paddle-webhook.js
import ChurnRecovery from '@churnrecovery/paddle'

const cr = new ChurnRecovery({ apiKey: process.env.CHURNRECOVERY_API_KEY })

export default async function handler(req, res) {
  const { alert_name, subscription_id, passthrough } = req.body
  
  if (alert_name === 'subscription_cancelled') {
    await cr.handleCancellation({ subscriptionId: subscription_id })
  }
  
  if (alert_name === 'subscription_payment_failed') {
    await cr.handleFailedPayment({ subscriptionId: subscription_id })
  }
  
  res.json({ success: true })
}`,
      },
    ],
    setupSteps: [
      'Install @churnrecovery/paddle via npm',
      'Add your Paddle API key to ChurnRecovery dashboard',
      'Configure webhook URL in Paddle Developer Portal',
      'Choose which events to intercept (cancel, failed payment)',
      'Test with Paddle sandbox environment',
    ],
    stats: { customers: '2,000+', avgSaveRate: '22%', setupTime: '30 min' },
  },

  braintree: {
    name: 'Braintree',
    slug: 'braintree',
    tagline: 'PayPal\'s developer-friendly payment platform',
    logo: '🌿',
    color: '#009CDE',
    setupTime: '45 minutes',
    difficulty: 'Medium',
    popularity: 'Enterprise favorite',
    description: 'Braintree (a PayPal company) powers billing for many established SaaS businesses. ChurnRecovery\'s Braintree integration brings modern cancel flow capabilities to the Braintree ecosystem.',
    longDescription: `Braintree is a robust payment platform trusted by mid-market and enterprise SaaS companies. If you're on Braintree, you've probably been missing the cancel flow tooling that Stripe-native companies take for granted — until now.

ChurnRecovery bridges that gap. Our Braintree integration uses webhooks and the Braintree subscription API to catch cancellations, retry failed payments, and show targeted retention offers — all while keeping your existing Braintree setup intact.`,
    features: [
      'Full Braintree Subscription API integration',
      'Cancel flow before subscription termination',
      'Smart dunning for failed transactions',
      'Discount and plan-change via Braintree API',
      'PayPal payment method update support',
      'Sandbox environment for safe testing',
      'Works with existing Braintree customer data',
    ],
    useCases: [
      { title: 'Cancel Flow Widget', desc: 'Branded retention widget that hooks into Braintree subscription lifecycle' },
      { title: 'Failed Transaction Recovery', desc: 'Retry logic tuned for Braintree\'s transaction retry windows' },
      { title: 'PayPal Subscription Retention', desc: 'Retain PayPal-paying subscribers with targeted offers' },
      { title: 'Discount Application', desc: 'Apply Braintree discounts programmatically to save at-risk subscribers' },
    ],
    codeSnippets: [
      {
        title: 'Install',
        language: 'bash',
        code: `npm install @churnrecovery/braintree`,
      },
      {
        title: 'Initialize with Braintree credentials',
        language: 'javascript',
        code: `import ChurnRecovery from '@churnrecovery/braintree'

const cr = new ChurnRecovery({
  apiKey: process.env.CHURNRECOVERY_API_KEY,
  braintree: {
    environment: 'Production', // or 'Sandbox'
    merchantId: process.env.BT_MERCHANT_ID,
    publicKey: process.env.BT_PUBLIC_KEY,
    privateKey: process.env.BT_PRIVATE_KEY,
  }
})`,
      },
      {
        title: 'Handle subscription cancellation',
        language: 'javascript',
        code: `// pages/api/braintree-webhook.js
export default async function handler(req, res) {
  const notification = await cr.braintree.parseWebhookNotification(
    req.body.bt_signature,
    req.body.bt_payload
  )

  if (notification.kind === 'subscription_canceled') {
    await cr.handleCancellation({ 
      subscriptionId: notification.subscription.id 
    })
  }
  
  res.json({ ok: true })
}`,
      },
    ],
    setupSteps: [
      'Install @churnrecovery/braintree via npm',
      'Add Braintree credentials (merchant ID, public/private key)',
      'Configure webhook in Braintree Control Panel',
      'Subscribe to subscription_canceled and subscription_went_past_due events',
      'Test with Braintree sandbox',
    ],
    stats: { customers: '500+', avgSaveRate: '19%', setupTime: '45 min' },
  },

  chargebee: {
    name: 'Chargebee',
    slug: 'chargebee',
    tagline: 'Subscription management for scaling SaaS',
    logo: '🔶',
    color: '#FF6633',
    setupTime: '30 minutes',
    difficulty: 'Easy',
    popularity: 'B2B favorite',
    description: 'Chargebee is a subscription management platform that thousands of B2B SaaS companies rely on. ChurnRecovery integrates natively with Chargebee\'s event system and subscription APIs.',
    longDescription: `Chargebee is much more than a payment processor — it's a full subscription lifecycle platform with invoicing, dunning, revenue recognition, and more. ChurnRecovery sits alongside Chargebee to add the cancel flow and retention layer that Chargebee doesn't offer natively.

Our Chargebee integration hooks into Chargebee's robust webhook system to catch subscription cancellations and payment failures at exactly the right moment. We use Chargebee's own API to apply discounts, change plans, and pause subscriptions — keeping your subscription data in sync.`,
    features: [
      'Native Chargebee event webhook support',
      'Cancel flow via Chargebee subscription events',
      'Coupon and discount application through Chargebee API',
      'Plan downgrade instead of cancel',
      'Chargebee Retention (formerly Brightback) replacement',
      'Failed payment dunning sequences',
      'Revenue recognition-safe operations',
    ],
    useCases: [
      { title: 'Replace Chargebee Retention', desc: 'Drop-in replacement for Chargebee Retention at $20/mo vs $400+/mo' },
      { title: 'B2B Cancel Flow', desc: 'Enterprise-friendly cancel flows with account manager escalation option' },
      { title: 'Coupon-Based Saves', desc: 'Automatically apply Chargebee coupons to at-risk customers' },
      { title: 'Annual Plan Upsell', desc: 'Offer annual plan discount to monthly subscribers who try to cancel' },
    ],
    codeSnippets: [
      {
        title: 'Install',
        language: 'bash',
        code: `npm install @churnrecovery/chargebee`,
      },
      {
        title: 'Initialize',
        language: 'javascript',
        code: `import ChurnRecovery from '@churnrecovery/chargebee'

const cr = new ChurnRecovery({
  apiKey: process.env.CHURNRECOVERY_API_KEY,
  chargebee: {
    site: process.env.CHARGEBEE_SITE,
    apiKey: process.env.CHARGEBEE_API_KEY,
  }
})`,
      },
      {
        title: 'Handle Chargebee webhook',
        language: 'javascript',
        code: `// pages/api/chargebee-webhook.js
export default async function handler(req, res) {
  const event = req.body
  
  if (event.event_type === 'subscription_cancellation_scheduled') {
    await cr.handleCancellation({
      subscriptionId: event.content.subscription.id,
      customerId: event.content.customer.id,
    })
  }
  
  if (event.event_type === 'payment_failed') {
    await cr.handleFailedPayment({
      subscriptionId: event.content.subscription.id,
    })
  }
  
  res.json({ received: true })
}`,
      },
    ],
    setupSteps: [
      'Install @churnrecovery/chargebee via npm',
      'Add Chargebee site name and API key to ChurnRecovery',
      'Configure webhook endpoint in Chargebee → Settings → Webhooks',
      'Select subscription_cancellation_scheduled and payment_failed events',
      'Test in Chargebee test environment',
    ],
    stats: { customers: '1,500+', avgSaveRate: '25%', setupTime: '30 min' },
  },

  recurly: {
    name: 'Recurly',
    slug: 'recurly',
    tagline: 'Subscription billing for enterprise SaaS',
    logo: '🔁',
    color: '#9B59B6',
    setupTime: '45 minutes',
    difficulty: 'Medium',
    popularity: 'Enterprise / media',
    description: 'Recurly is a mature subscription billing platform popular with media and enterprise SaaS companies. ChurnRecovery extends Recurly with modern cancel flow and retention capabilities.',
    longDescription: `Recurly handles complex subscription scenarios at enterprise scale — volume discounts, gift cards, trial management, and sophisticated dunning. ChurnRecovery complements Recurly by adding the human-facing cancel flow layer that converts would-be churners into retained customers.

Our integration uses Recurly's Push Notifications (webhooks) to detect cancellation intent and payment failures, then applies targeted retention offers via Recurly's subscription API before the churn becomes permanent.`,
    features: [
      'Recurly Push Notification (webhook) support',
      'Cancel flow on subscription_canceled events',
      'Coupon application through Recurly API',
      'Plan change and downgrade support',
      'Dunning email sequences for failed invoices',
      'Account hierarchy support for B2B',
      'Works with Recurly\'s advanced trial logic',
    ],
    useCases: [
      { title: 'Media Subscription Retention', desc: 'Specialized flows for media/content subscriptions with pause offers' },
      { title: 'Enterprise Account Saves', desc: 'Escalate enterprise cancellations to account managers automatically' },
      { title: 'Volume Discount Offers', desc: 'Offer volume pricing via Recurly coupons to at-risk customers' },
      { title: 'Trial-to-Paid Conversion', desc: 'Rescue trial users who cancel before converting' },
    ],
    codeSnippets: [
      {
        title: 'Install',
        language: 'bash',
        code: `npm install @churnrecovery/recurly`,
      },
      {
        title: 'Initialize',
        language: 'javascript',
        code: `import ChurnRecovery from '@churnrecovery/recurly'

const cr = new ChurnRecovery({
  apiKey: process.env.CHURNRECOVERY_API_KEY,
  recurly: {
    apiKey: process.env.RECURLY_PRIVATE_KEY,
    subdomain: process.env.RECURLY_SUBDOMAIN,
  }
})`,
      },
      {
        title: 'Handle Recurly webhook',
        language: 'javascript',
        code: `// pages/api/recurly-webhook.js
import { parseStringPromise } from 'xml2js'

export default async function handler(req, res) {
  const parsed = await parseStringPromise(req.body)
  const eventType = Object.keys(parsed)[0]
  
  if (eventType === 'canceled_subscription_notification') {
    const sub = parsed[eventType].subscription[0]
    await cr.handleCancellation({ subscriptionId: sub.uuid[0] })
  }
  
  if (eventType === 'failed_payment_notification') {
    const sub = parsed[eventType].subscription[0]
    await cr.handleFailedPayment({ subscriptionId: sub.uuid[0] })
  }
  
  res.json({ ok: true })
}`,
      },
    ],
    setupSteps: [
      'Install @churnrecovery/recurly via npm',
      'Add Recurly API key and subdomain to ChurnRecovery',
      'Configure Push Notification URL in Recurly → Integrations → Push Notifications',
      'Enable canceled_subscription and failed_payment notifications',
      'Test with Recurly sandbox',
    ],
    stats: { customers: '400+', avgSaveRate: '20%', setupTime: '45 min' },
  },

  custom: {
    name: 'Custom / Webhook',
    slug: 'custom',
    tagline: 'Works with any billing system via webhooks',
    logo: '🔌',
    color: '#191919',
    setupTime: '1 hour',
    difficulty: 'Advanced',
    popularity: 'Built in-house billing',
    description: 'Running a custom billing system or an unsupported processor? ChurnRecovery\'s universal webhook API works with anything that can send an HTTP request.',
    longDescription: `Not everyone uses Stripe or Chargebee. If you've built your own billing system, run on a niche processor, or have a hybrid setup, ChurnRecovery's generic webhook API has you covered.

Any event — subscription cancellation, payment failure, trial expiry — can be sent to ChurnRecovery as a JSON webhook. We'll handle the cancel flow logic, retention offers, and analytics, and send results back via webhook callback to your system.`,
    features: [
      'Generic JSON webhook receiver',
      'Bring your own subscription IDs and customer data',
      'Webhook callback when save/lost decision is made',
      'REST API for programmatic flow triggering',
      'Custom cancel flow logic via API config',
      'No dependency on specific payment processors',
      'Works with Zuora, Avalara, Maxio, and more',
    ],
    useCases: [
      { title: 'Custom Billing Systems', desc: 'Built your own billing? Use our webhook API to add cancel flows' },
      { title: 'Multi-Processor Setup', desc: 'Stripe + Paddle hybrid? One unified cancel flow for both' },
      { title: 'Zuora / Maxio Integration', desc: 'Enterprise billing platforms not natively supported' },
      { title: 'Legacy System Migration', desc: 'Add cancel flows to legacy billing while you migrate' },
    ],
    codeSnippets: [
      {
        title: 'Trigger a cancel flow via REST API',
        language: 'bash',
        code: `curl -X POST https://api.churnrecovery.com/v1/flows/trigger \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_id": "cust_123",
    "subscription_id": "sub_456",
    "plan_name": "Pro Plan",
    "mrr": 99,
    "cancellation_reason": "user_initiated",
    "callback_url": "https://yourapp.com/webhooks/churnrecovery"
  }'`,
      },
      {
        title: 'Handle callback webhook',
        language: 'javascript',
        code: `// pages/api/churnrecovery-callback.js
export default async function handler(req, res) {
  const { event, subscription_id, outcome, offer_accepted } = req.body
  
  if (event === 'flow_completed') {
    if (outcome === 'saved') {
      // Customer retained! Apply offer to your billing system
      await applyOffer(subscription_id, offer_accepted)
    } else {
      // Customer churned — proceed with cancellation
      await processCancellation(subscription_id)
    }
  }
  
  res.json({ received: true })
}`,
      },
    ],
    setupSteps: [
      'Get your API key from the ChurnRecovery dashboard',
      'Send a POST to /v1/flows/trigger when cancellation is requested',
      'Set up a callback URL to receive the save/lost outcome',
      'Apply the offer outcome (discount, pause, plan change) in your system',
      'Optional: install @churnrecovery/react for the frontend widget',
    ],
    stats: { customers: '200+', avgSaveRate: '17%', setupTime: '1 hr' },
  },
}

export function getIntegration(slug) {
  return integrations[slug] || null
}

export function getAllIntegrationSlugs() {
  return Object.keys(integrations)
}

export function getAllIntegrations() {
  return Object.values(integrations)
}
