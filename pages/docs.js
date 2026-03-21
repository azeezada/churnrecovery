import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

const sections = [
  { id: 'quickstart', label: 'Quick Start', icon: '⚡' },
  { id: 'installation', label: 'Installation', icon: '📦' },
  { id: 'cancel-flow', label: 'Cancel Flow', icon: '🚪' },
  { id: 'configuration', label: 'Configuration', icon: '⚙️' },
  { id: 'offers', label: 'Offer Types', icon: '🎁' },
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'webhooks', label: 'Webhooks', icon: '🔗' },
  { id: 'rest-api', label: 'REST API', icon: '🌐' },
  { id: 'stripe', label: 'Stripe Integration', icon: '💳' },
  { id: 'react', label: 'React SDK', icon: '⚛️' },
  { id: 'faq', label: 'FAQ', icon: '❓' },
]

function CodeBlock({ language, title, children }) {
  return (
    <div className="rounded-[10px] overflow-hidden mb-5 border border-white/5">
      {title && (
        <div className="bg-[#181825] px-4 py-2.5 flex items-center justify-between">
          <span className="font-mono text-[0.78rem] text-[#6C7086]">{title}</span>
          <span className="text-[0.65rem] font-['Instrument_Sans',sans-serif] text-[#6C7086] uppercase tracking-[0.08em]">{language}</span>
        </div>
      )}
      <pre className="bg-[#1E1E2E] p-5 m-0 overflow-x-auto text-[0.85rem] leading-[1.7] font-mono text-[#CDD6F4]">
        <code>{children}</code>
      </pre>
    </div>
  )
}

function Callout({ type = 'info', children }) {
  const styles = {
    info: { bg: '#EFF6FF', border: '#2563EB', icon: 'ℹ️' },
    tip: { bg: '#EDF7F1', border: '#2D7A4F', icon: '💡' },
    warning: { bg: '#FFF7ED', border: '#EA580C', icon: '⚠️' },
  }
  const s = styles[type]
  return (
    <div
      className="px-5 py-4 rounded-lg flex gap-2.5 items-start mb-6"
      style={{ background: s.bg, borderLeft: `3px solid ${s.border}` }}
    >
      <span className="text-base shrink-0">{s.icon}</span>
      <div className="font-['Merriweather',serif] text-[0.88rem] text-[#191919] leading-[1.7]">{children}</div>
    </div>
  )
}

function Nav() {
  return (
    <nav className="border-b border-[#E5E5E5] bg-white px-5 h-[60px] flex items-center justify-between sticky top-0 z-[100]">
      <Link href="/" className="font-['Instrument_Sans',sans-serif] font-bold text-[1.1rem] text-[#191919] no-underline tracking-[-0.01em]">
        ChurnRecovery
      </Link>
      <div className="nav-links flex gap-6 items-center">
        <Link href="/features" className="text-[#666666] no-underline text-[0.9rem] font-['Instrument_Sans',sans-serif]">Features</Link>
        <Link href="/docs" className="text-[#D97757] no-underline text-[0.9rem] font-['Instrument_Sans',sans-serif] font-semibold">Docs</Link>
        <Link href="/demo" className="text-[#666666] no-underline text-[0.9rem] font-['Instrument_Sans',sans-serif]">Demo</Link>
        <Link href="/blog" className="text-[#666666] no-underline text-[0.9rem] font-['Instrument_Sans',sans-serif]">Blog</Link>
        <a href="/#waitlist" className="bg-[#D97757] text-white px-[18px] py-2 rounded-md no-underline text-[0.85rem] font-semibold font-['Instrument_Sans',sans-serif]">Join Waitlist</a>
      </div>
    </nav>
  )
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('quickstart')
  const title = 'Developer Docs — ChurnRecovery Integration Guide'
  const description = 'Complete developer documentation for ChurnRecovery. Install the SDK, configure cancel flows, set up Stripe integration, and start recovering churned customers in under 10 minutes.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://churnrecovery.com/docs" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href="https://churnrecovery.com/docs" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TechArticle',
              name: title,
              description,
              url: 'https://churnrecovery.com/docs',
              publisher: { '@type': 'Organization', name: 'ChurnRecovery', url: 'https://churnrecovery.com' },
            }),
          }}
        />
      </Head>

      <div className="bg-[#FAF9F5] min-h-screen font-['Instrument_Sans',sans-serif]">
        <Nav />

        <div className="flex max-w-[1200px] mx-auto px-6">
          {/* Sidebar */}
          <aside className="docs-sidebar w-[220px] shrink-0 py-8 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto border-r border-[#E5E5E5] flex flex-col gap-0.5">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActiveSection(s.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-md no-underline text-[0.85rem] transition-all duration-150"
                style={{
                  fontWeight: activeSection === s.id ? 600 : 400,
                  color: activeSection === s.id ? '#D97757' : '#666666',
                  background: activeSection === s.id ? '#FDF4EF' : 'transparent',
                }}
              >
                <span className="text-[0.8rem]">{s.icon}</span>
                {s.label}
              </a>
            ))}
          </aside>

          {/* Main content */}
          <main className="docs-main flex-1 pt-10 pb-20 pl-12 max-w-[780px]">
            {/* Quick Start */}
            <section id="quickstart" className="mb-16">
              <h1 className="font-['Instrument_Sans',sans-serif] text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold text-[#191919] tracking-[-0.04em] mb-3 mt-0 leading-[1.1]">
                Developer Documentation
              </h1>
              <p className="font-['Merriweather',serif] text-[1.1rem] text-[#666666] leading-[1.7] mt-0 mb-8">
                Get ChurnRecovery running in your app in under 10 minutes. One package, two function calls, zero backend work.
              </p>

              <Callout type="tip">
                <strong>Fastest path:</strong> Install the SDK, initialize with your API key, and call <code className="bg-black/[0.06] px-1.5 py-0.5 rounded text-[0.82rem]">showCancelFlow()</code> when a user clicks your cancel button. That&apos;s it.
              </Callout>

              <h2 className="font-['Instrument_Sans',sans-serif] text-[1.3rem] font-bold text-[#191919] mt-0 mb-4 tracking-[-0.02em]">
                ⚡ 3-Minute Integration
              </h2>

              <CodeBlock language="bash" title="1. Install the SDK">
{`npm install @churnrecovery/sdk`}
              </CodeBlock>

              <CodeBlock language="javascript" title="2. Initialize + trigger cancel flow">
{`import { ChurnRecovery } from '@churnrecovery/sdk'

// Initialize once (usually in your app entry point)
const cr = ChurnRecovery.init({
  apiKey: 'cr_live_xxxxxxxxxxxxxxxx',
  stripeCustomerId: user.stripeId, // optional but recommended
})

// When user clicks "Cancel Subscription"
document.getElementById('cancel-btn').addEventListener('click', async () => {
  const result = await cr.showCancelFlow({
    customerId: user.id,
    subscriptionId: user.subscriptionId,
    planName: 'Pro Plan',
    mrr: 49.00,
  })

  if (result.saved) {
    console.log('Customer saved!', result.offer)
    // Update your UI — subscription is still active
  } else {
    console.log('Customer canceled', result.reason)
    // Process the cancellation in your system
  }
})`}
              </CodeBlock>

              <p className="font-['Merriweather',serif] text-[0.9rem] text-[#666666] leading-[1.7] mt-0 mb-6">
                That&apos;s the entire integration. ChurnRecovery handles the cancel flow UI, reason collection, offer presentation, and analytics — all from that single <code className="bg-black/[0.06] px-1.5 py-0.5 rounded text-[0.82rem]">showCancelFlow()</code> call.
              </p>
            </section>

            {/* Installation */}
            <section id="installation" className="mb-16">
              <h2 className="font-['Instrument_Sans',sans-serif] text-[1.5rem] font-bold text-[#191919] mt-0 mb-2 tracking-[-0.03em]">
                📦 Installation
              </h2>
              <p className="font-['Merriweather',serif] text-[0.9rem] text-[#666666] leading-[1.7] mt-0 mb-6">
                Choose your preferred method. The npm package includes TypeScript types and tree-shakes to ~8KB gzipped.
              </p>

              <h3 className="font-['Instrument_Sans',sans-serif] text-base font-bold text-[#191919] mt-0 mb-3">
                npm / yarn / pnpm
              </h3>
              <CodeBlock language="bash" title="Package manager">
{`# npm
npm install @churnrecovery/sdk

# yarn
yarn add @churnrecovery/sdk

# pnpm
pnpm add @churnrecovery/sdk`}
              </CodeBlock>

              <h3 className="font-['Instrument_Sans',sans-serif] text-base font-bold text-[#191919] mt-0 mb-3">
                CDN Script Tag
              </h3>
              <CodeBlock language="html" title="Script tag (no build step)">
{`<script src="https://cdn.churnrecovery.com/sdk/v1.js"></script>
<script>
  const cr = ChurnRecovery.init({ apiKey: 'cr_live_xxx' })
</script>`}
              </CodeBlock>

              <Callout type="info">
                The CDN version is identical to the npm package. Use whichever fits your stack. The SDK auto-detects your environment and loads the minimal CSS needed for the cancel flow modal.
              </Callout>
            </section>

            {/* Cancel Flow */}
            <section id="cancel-flow" className="mb-16">
              <h2 className="font-['Instrument_Sans',sans-serif] text-[1.5rem] font-bold text-[#191919] mt-0 mb-2 tracking-[-0.03em]">
                🚪 Cancel Flow
              </h2>
              <p className="font-['Merriweather',serif] text-[0.9rem] text-[#666666] leading-[1.7] mt-0 mb-6">
                The cancel flow is the core of ChurnRecovery. It intercepts the cancel action, collects the reason, presents a personalized retention offer, and reports the outcome.
              </p>

              <h3 className="font-['Instrument_Sans',sans-serif] text-base font-bold text-[#191919] mt-0 mb-3">
                How it works
              </h3>
              <div className="cancel-flow-steps grid grid-cols-4 gap-3 mb-7">
                {[
                  { step: '1', label: 'User clicks cancel', desc: 'Your app calls showCancelFlow()' },
                  { step: '2', label: 'Reason picker', desc: 'Customer selects why they\'re leaving' },
                  { step: '3', label: 'Smart offer', desc: 'Personalized offer based on the reason' },
                  { step: '4', label: 'Outcome', desc: 'Customer saved or cancellation confirmed' },
                ].map(s => (
                  <div key={s.step} className="p-4 rounded-lg bg-white border border-[#E5E5E5] text-center">
                    <div className="w-7 h-7 rounded-full bg-[#D97757] text-white flex items-center justify-center text-[0.8rem] font-bold mx-auto mb-2.5">{s.step}</div>
                    <div className="font-['Instrument_Sans',sans-serif] text-[0.82rem] font-semibold text-[#191919] mb-1">{s.label}</div>
                    <div className="font-['Instrument_Sans',sans-serif] text-[0.75rem] text-[#666666]">{s.desc}</div>
                  </div>
                ))}
              </div>

              <h3 className="font-['Instrument_Sans',sans-serif] text-base font-bold text-[#191919] mt-0 mb-3">
                showCancelFlow() Options
              </h3>
              <CodeBlock language="typescript" title="Full options interface">
{`interface CancelFlowOptions {
  // Required
  customerId: string          // Your internal customer ID
  subscriptionId: string      // Subscription to cancel

  // Recommended
  planName?: string           // e.g. "Pro Plan" — shown in the modal
  mrr?: number                // Monthly revenue — used for analytics
  stripeCustomerId?: string   // Enables auto-apply offers in Stripe

  // Customization
  reasons?: CancelReason[]    // Override default cancel reasons
  offers?: OfferConfig[]      // Override default offers per reason
  theme?: ThemeConfig         // Custom colors, fonts, branding
  locale?: string             // 'en' | 'es' | 'fr' | 'de' | 'pt' | 'ja'

  // Callbacks
  onReasonSelected?: (reason: CancelReason) => void
  onOfferPresented?: (offer: Offer) => void
  onSave?: (result: SaveResult) => void
  onCancel?: (result: CancelResult) => void
}

interface CancelFlowResult {
  saved: boolean
  reason: string
  offer?: {
    type: 'discount' | 'pause' | 'human' | 'feedback'
    accepted: boolean
    details: Record<string, any>
  }
  feedback?: string
  sessionId: string           // For analytics correlation
}`}
              </CodeBlock>

              <h3 className="font-['Instrument_Sans',sans-serif] text-base font-bold text-[#191919] mt-0 mb-3">
                Custom cancel reasons
              </h3>
              <CodeBlock language="javascript" title="Custom reasons + offer routing">
{`const result = await cr.showCancelFlow({
  customerId: user.id,
  subscriptionId: user.subId,
  reasons: [
    {
      id: 'too-expensive',
      label: 'Too expensive',
      icon: '💰',
      offer: { type: 'discount', percent: 30, duration: 3 }
    },
    {
      id: 'not-using',
      label: "I'm not using it enough",
      icon: '😴',
      offer: { type: 'pause', months: 2 }
    },
    {
      id: 'switching',
      label: 'Switching to a competitor',
      icon: '👋',
      offer: { type: 'discount', percent: 50, duration: 6 }
    },
    {
      id: 'missing-feature',
      label: 'Missing a feature I need',
      icon: '🔧',
      offer: { type: 'human', message: 'Let us know — we might already be building it.' }
    },
    {
      id: 'other',
      label: 'Something else',
      icon: '💬',
      offer: { type: 'feedback' }
    },
  ]
})`}
              </CodeBlock>
            </section>

            {/* Configuration */}
            <section id="configuration" className="mb-16">
              <h2 className="font-['Instrument_Sans',sans-serif] text-[1.5rem] font-bold text-[#191919] mt-0 mb-2 tracking-[-0.03em]">
                ⚙️ Configuration
              </h2>
              <p className="font-['Merriweather',serif] text-[0.9rem] text-[#666666] leading-[1.7] mt-0 mb-6">
                Configure ChurnRecovery globally at initialization or per cancel flow call.
              </p>

              <CodeBlock language="javascript" title="Full initialization options">
{`const cr = ChurnRecovery.init({
  // Required
  apiKey: 'cr_live_xxxxxxxxxxxxxxxx',

  // Optional: Stripe integration
  stripeCustomerId: user.stripeId,

  // Optional: Theme customization
  theme: {
    primaryColor: '#6B4FA0',        // Your brand color
    backgroundColor: '#FFFFFF',      // Modal background
    fontFamily: 'Inter, sans-serif', // Your brand font
    borderRadius: '12px',            // Modal corners
    logo: 'https://yourapp.com/logo.svg',
  },

  // Optional: Behavior
  locale: 'en',                      // UI language
  testMode: false,                   // true = no real actions, console logs
  closeOnOverlayClick: true,         // Allow dismiss by clicking outside
  showPoweredBy: true,               // "Powered by ChurnRecovery" badge

  // Optional: Analytics
  onEvent: (event) => {
    // Forward all events to your analytics
    analytics.track(event.type, event.data)
  },
})`}
              </CodeBlock>

              <h3 className="font-['Instrument_Sans',sans-serif] text-base font-bold text-[#191919] mt-0 mb-3">
                Environment variables
              </h3>
              <CodeBlock language="bash" title=".env">
{`# Your API key (get it from the dashboard)
CHURNRECOVERY_API_KEY=cr_live_xxxxxxxxxxxxxxxx

# Optional: Stripe secret for server-side operations
CHURNRECOVERY_STRIPE_SECRET=sk_live_xxx

# Optional: Webhook signing secret
CHURNRECOVERY_WEBHOOK_SECRET=whsec_xxx`}
              </CodeBlock>
            </section>

            {/* Offer Types */}
            <section id="offers" className="mb-16">
              <h2 className="font-['Instrument_Sans',sans-serif] text-[1.5rem] font-bold text-[#191919] mt-0 mb-2 tracking-[-0.03em]">
                🎁 Offer Types
              </h2>
              <p className="font-['Merriweather',serif] text-[0.9rem] text-[#666666] leading-[1.7] mt-0 mb-6">
                Four built-in offer types handle the vast majority of cancel scenarios.
              </p>

              <div className="grid gap-4 mb-7">
                {[
                  { type: 'Discount', icon: '💰', desc: 'Reduce the subscription price for a set number of months. Best for price-sensitive customers.', code: `{ type: 'discount', percent: 30, duration: 3 } // 30% off for 3 months` },
                  { type: 'Pause', icon: '⏸️', desc: 'Pause the subscription instead of canceling. Best for customers who plan to return.', code: `{ type: 'pause', months: 2 } // Pause for 2 months, auto-resume` },
                  { type: 'Human Escalation', icon: '💬', desc: 'Route the customer to live chat or support. Best for complex cases or enterprise accounts.', code: `{ type: 'human', url: '/support/chat', message: 'Talk to us first' }` },
                  { type: 'Feedback Only', icon: '📝', desc: 'Just collect the feedback, no counter-offer. Best for customers you know won\'t stay.', code: `{ type: 'feedback', prompt: 'Any feedback for us?' }` },
                ].map(o => (
                  <div key={o.type} className="border border-[#E5E5E5] rounded-[10px] p-6 bg-white">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-[1.2rem]">{o.icon}</span>
                      <h3 className="font-['Instrument_Sans',sans-serif] text-base font-bold text-[#191919] m-0">{o.type}</h3>
                    </div>
                    <p className="font-['Merriweather',serif] text-[0.85rem] text-[#666666] leading-[1.7] mt-0 mb-3">{o.desc}</p>
                    <code className="block bg-[#1E1E2E] text-[#CDD6F4] px-3.5 py-2.5 rounded-md text-[0.8rem] font-mono overflow-x-auto">{o.code}</code>
                  </div>
                ))}
              </div>

              <Callout type="tip">
                <strong>Pro tip:</strong> Combine offers with A/B testing. Route 50% of &quot;too expensive&quot; customers to 20% off and 50% to 30% off — then measure which save rate is better.
              </Callout>
            </section>

            {/* Analytics */}
            <section id="analytics" className="mb-16">
              <h2 className="font-['Instrument_Sans',sans-serif] text-[1.5rem] font-bold text-[#191919] mt-0 mb-2 tracking-[-0.03em]">
                📊 Analytics API
              </h2>
              <p className="font-['Merriweather',serif] text-[0.9rem] text-[#666666] leading-[1.7] mt-0 mb-6">
                Query your churn recovery data programmatically.
              </p>

              <CodeBlock language="javascript" title="Fetch analytics from the SDK">
{`// Save rate over the last 30 days
const stats = await cr.analytics.getSaveRate({
  period: '30d',
  groupBy: 'reason', // or 'plan', 'country', 'week'
})
// → { overall: 0.34, byReason: { 'too-expensive': 0.52, ... } }

// Revenue recovered
const revenue = await cr.analytics.getRevenueRecovered({
  period: '30d',
})
// → { total: 12450, byMonth: [...], bySaveType: { discount: 8200, pause: 4250 } }

// Churn reason breakdown
const reasons = await cr.analytics.getChurnReasons({
  period: '90d',
  plan: 'pro',
})
// → [{ reason: 'too-expensive', count: 142, pct: 0.38 }, ...]`}
              </CodeBlock>
            </section>

            {/* Webhooks */}
            <section id="webhooks" className="mb-16">
              <h2 className="font-['Instrument_Sans',sans-serif] text-[1.5rem] font-bold text-[#191919] mt-0 mb-2 tracking-[-0.03em]">
                🔗 Webhooks
              </h2>
              <p className="font-['Merriweather',serif] text-[0.9rem] text-[#666666] leading-[1.7] mt-0 mb-6">
                Receive real-time notifications when customers interact with the cancel flow.
              </p>

              <h3 className="font-['Instrument_Sans',sans-serif] text-base font-bold text-[#191919] mt-0 mb-3">
                Events
              </h3>
              <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden mb-6">
                {[
                  { event: 'cancel_flow.started', desc: 'Customer opened the cancel flow' },
                  { event: 'cancel_flow.reason_selected', desc: 'Customer selected a cancel reason' },
                  { event: 'cancel_flow.offer_presented', desc: 'A retention offer was shown' },
                  { event: 'cancel_flow.offer_accepted', desc: 'Customer accepted the offer (saved!)' },
                  { event: 'cancel_flow.completed', desc: 'Flow ended (saved or canceled)' },
                  { event: 'winback.email_sent', desc: 'Win-back email was sent to a churned customer' },
                  { event: 'winback.reactivated', desc: 'Churned customer reactivated via win-back' },
                ].map((e, i) => (
                  <div
                    key={e.event}
                    className="flex items-center gap-4 px-4 py-3"
                    style={{
                      borderBottom: i < 6 ? '1px solid #E5E5E5' : 'none',
                      background: i % 2 === 0 ? '#FFFFFF' : '#FAF9F5',
                    }}
                  >
                    <code className="font-mono text-[0.8rem] text-[#D97757] bg-[#FDF4EF] px-2 py-[3px] rounded whitespace-nowrap">{e.event}</code>
                    <span className="font-['Instrument_Sans',sans-serif] text-[0.83rem] text-[#666666]">{e.desc}</span>
                  </div>
                ))}
              </div>

              <CodeBlock language="javascript" title="Webhook handler (Node.js / Express)">
{`import { verifyWebhook } from '@churnrecovery/sdk'

app.post('/webhooks/churnrecovery', (req, res) => {
  const event = verifyWebhook(req.body, req.headers, process.env.WEBHOOK_SECRET)

  switch (event.type) {
    case 'cancel_flow.offer_accepted':
      // Customer was saved — update your records
      db.subscriptions.update(event.data.subscriptionId, { status: 'active' })
      slack.notify(\`🎉 Saved \${event.data.customerEmail} — \${event.data.offer.type}\`)
      break

    case 'cancel_flow.completed':
      if (!event.data.saved) {
        // Customer churned — trigger your internal offboarding
        offboarding.start(event.data.customerId)
      }
      break
  }

  res.json({ received: true })
})`}
              </CodeBlock>
            </section>

            {/* REST API */}
            <section id="rest-api" className="mb-16">
              <h2 className="font-['Instrument_Sans',sans-serif] text-[1.5rem] font-bold text-[#191919] mt-0 mb-2 tracking-[-0.03em]">
                🌐 REST API
              </h2>
              <p className="font-['Merriweather',serif] text-[0.9rem] text-[#666666] leading-[1.7] mt-0 mb-6">
                Full REST API for server-side integrations. All endpoints are versioned and return JSON.
              </p>

              <CodeBlock language="bash" title="Base URL">
{`https://api.churnrecovery.com/v1`}
              </CodeBlock>

              <h3 className="font-['Instrument_Sans',sans-serif] text-base font-bold text-[#191919] mt-0 mb-3">
                Authentication
              </h3>
              <CodeBlock language="bash" title="API key header">
{`curl https://api.churnrecovery.com/v1/analytics/save-rate \\
  -H "Authorization: Bearer cr_live_xxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json"`}
              </CodeBlock>

              <h3 className="font-['Instrument_Sans',sans-serif] text-base font-bold text-[#191919] mt-0 mb-3">
                Key Endpoints
              </h3>
              <div className="border border-[#E5E5E5] rounded-[10px] overflow-hidden mb-6">
                {[
                  { method: 'GET', path: '/v1/analytics/save-rate', desc: 'Get save rate statistics' },
                  { method: 'GET', path: '/v1/analytics/revenue', desc: 'Revenue recovered data' },
                  { method: 'GET', path: '/v1/analytics/reasons', desc: 'Churn reason breakdown' },
                  { method: 'GET', path: '/v1/customers', desc: 'List customers with churn data' },
                  { method: 'GET', path: '/v1/customers/:id', desc: 'Get customer churn profile' },
                  { method: 'POST', path: '/v1/cancel-flows', desc: 'Trigger a cancel flow (server-side)' },
                  { method: 'GET', path: '/v1/offers', desc: 'List configured offers' },
                  { method: 'PUT', path: '/v1/offers/:id', desc: 'Update an offer configuration' },
                  { method: 'POST', path: '/v1/webhooks', desc: 'Register a webhook endpoint' },
                ].map((e, i) => (
                  <div
                    key={e.path + e.method}
                    className="flex items-center gap-3 px-4 py-2.5"
                    style={{
                      borderBottom: i < 8 ? '1px solid #E5E5E5' : 'none',
                      background: i % 2 === 0 ? '#FFFFFF' : '#FAF9F5',
                    }}
                  >
                    <span
                      className="font-mono text-[0.72rem] font-bold px-2 py-0.5 rounded min-w-[40px] text-center"
                      style={{
                        background: e.method === 'GET' ? '#EDF7F1' : e.method === 'POST' ? '#EFF6FF' : '#F5F0FF',
                        color: e.method === 'GET' ? '#2D7A4F' : e.method === 'POST' ? '#2563EB' : '#6B4FA0',
                      }}
                    >{e.method}</span>
                    <code className="font-mono text-[0.82rem] text-[#191919]">{e.path}</code>
                    <span className="font-['Instrument_Sans',sans-serif] text-[0.8rem] text-[#999999] ml-auto">{e.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Stripe */}
            <section id="stripe" className="mb-16">
              <h2 className="font-['Instrument_Sans',sans-serif] text-[1.5rem] font-bold text-[#191919] mt-0 mb-2 tracking-[-0.03em]">
                💳 Stripe Integration
              </h2>
              <p className="font-['Merriweather',serif] text-[0.9rem] text-[#666666] leading-[1.7] mt-0 mb-6">
                Connect Stripe in 30 seconds. ChurnRecovery reads your plans, customers, and subscriptions — and automatically applies retention offers (discounts, pauses) directly in Stripe.
              </p>

              <CodeBlock language="javascript" title="Connect Stripe">
{`// Option A: OAuth (recommended — connect in your dashboard)
// Just click "Connect Stripe" in your ChurnRecovery dashboard

// Option B: API key (for server-side setups)
const cr = ChurnRecovery.init({
  apiKey: 'cr_live_xxx',
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  }
})`}
              </CodeBlock>

              <Callout type="info">
                When Stripe is connected, ChurnRecovery automatically applies accepted discount offers as Stripe coupons and pause offers as subscription pauses. No additional code needed.
              </Callout>

              <CodeBlock language="javascript" title="Stripe webhook handler for failed payments">
{`// ChurnRecovery automatically handles dunning if Stripe is connected
// But you can also set up manual webhook forwarding:

import { handleStripeWebhook } from '@churnrecovery/sdk'

app.post('/webhooks/stripe', async (req, res) => {
  await handleStripeWebhook(req.body, req.headers['stripe-signature'])
  res.json({ ok: true })
})

// ChurnRecovery will automatically:
// 1. Detect invoice.payment_failed events
// 2. Send smart dunning emails with card update links
// 3. Retry payment at optimal intervals
// 4. Track recovery in your analytics`}
              </CodeBlock>
            </section>

            {/* React SDK */}
            <section id="react" className="mb-16">
              <h2 className="font-['Instrument_Sans',sans-serif] text-[1.5rem] font-bold text-[#191919] mt-0 mb-2 tracking-[-0.03em]">
                ⚛️ React SDK
              </h2>
              <p className="font-['Merriweather',serif] text-[0.9rem] text-[#666666] leading-[1.7] mt-0 mb-6">
                First-class React support with hooks and components.
              </p>

              <CodeBlock language="jsx" title="React integration">
{`import { ChurnRecoveryProvider, useCancelFlow } from '@churnrecovery/react'

// Wrap your app
function App() {
  return (
    <ChurnRecoveryProvider apiKey="cr_live_xxx">
      <YourApp />
    </ChurnRecoveryProvider>
  )
}

// Use the hook in any component
function SubscriptionSettings({ user }) {
  const { showCancelFlow, isLoading } = useCancelFlow()

  const handleCancel = async () => {
    const result = await showCancelFlow({
      customerId: user.id,
      subscriptionId: user.subscriptionId,
      planName: user.planName,
      mrr: user.mrr,
    })

    if (result.saved) {
      toast.success('Welcome back! Your offer has been applied.')
    } else {
      router.push('/goodbye')
    }
  }

  return (
    <button onClick={handleCancel} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Cancel Subscription'}
    </button>
  )
}`}
              </CodeBlock>

              <CodeBlock language="jsx" title="Pre-built CancelButton component">
{`import { CancelButton } from '@churnrecovery/react'

// Drop-in button — handles everything
<CancelButton
  customerId={user.id}
  subscriptionId={user.subId}
  planName="Pro Plan"
  mrr={49}
  onSave={() => toast.success('Subscription saved!')}
  onCancel={() => router.push('/goodbye')}
  className="your-button-class"
>
  Cancel Subscription
</CancelButton>`}
              </CodeBlock>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-16">
              <h2 className="font-['Instrument_Sans',sans-serif] text-[1.5rem] font-bold text-[#191919] mt-0 mb-2 tracking-[-0.03em]">
                ❓ Frequently Asked Questions
              </h2>

              <div className="grid gap-4 mt-6">
                {[
                  { q: 'Is it really free?', a: 'Yes. ChurnRecovery is completely free — no usage limits, no feature gates, no hidden fees. We monetize through optional premium add-ons (custom branding removal, SLA guarantees, dedicated support) that most teams won\'t need.' },
                  { q: 'What billing providers do you support?', a: 'Stripe is natively integrated with automatic offer application. Paddle support is in beta. For other providers (Chargebee, Recurly, Braintree), you can use our REST API and webhooks for manual integration.' },
                  { q: 'Does it work with server-side rendering?', a: 'Yes. The SDK detects the environment automatically. On the server, initialization is a no-op. The cancel flow modal only renders client-side. Full support for Next.js, Nuxt, Remix, and SvelteKit.' },
                  { q: 'How does the A/B testing work?', a: 'Define multiple offers per cancel reason, and ChurnRecovery automatically splits traffic and tracks acceptance rates. Results are statistically validated — we\'ll tell you when a variant reaches significance.' },
                  { q: 'Can I customize the cancel flow UI?', a: 'Fully. Pass a theme object with your brand colors, fonts, logo, and border radius. For deeper customization, use the headless mode — we handle the logic, you handle the UI.' },
                  { q: 'What about GDPR?', a: 'ChurnRecovery is GDPR-compliant. We process data as your data processor, store minimal customer data, and provide full data export and deletion APIs. We don\'t sell data. Period.' },
                ].map(faq => (
                  <div key={faq.q} className="px-6 py-5 border border-[#E5E5E5] rounded-[10px] bg-white">
                    <h3 className="font-['Instrument_Sans',sans-serif] text-[0.95rem] font-bold text-[#191919] mt-0 mb-2">{faq.q}</h3>
                    <p className="font-['Merriweather',serif] text-[0.85rem] text-[#666666] leading-[1.7] m-0">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-[#191919] rounded-xl p-10 text-center">
              <h2 className="font-['Instrument_Sans',sans-serif] text-[1.4rem] font-bold text-white tracking-[-0.03em] mt-0 mb-3">
                Ready to integrate?
              </h2>
              <p className="font-['Merriweather',serif] text-[0.9rem] text-white/65 mt-0 mb-6 leading-[1.7]">
                Join the waitlist to get your API key. Most teams are live in under an hour.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <a href="https://tally.so/r/churnrecovery" className="inline-block bg-[#D97757] text-white px-7 py-3 rounded-lg font-['Instrument_Sans',sans-serif] font-bold text-[0.95rem] no-underline">
                  Get API Key — Free
                </a>
                <Link href="/demo" className="inline-block bg-transparent text-white/70 px-7 py-3 rounded-lg font-['Instrument_Sans',sans-serif] font-semibold text-[0.95rem] no-underline border border-white/20">
                  Try the Demo →
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}
