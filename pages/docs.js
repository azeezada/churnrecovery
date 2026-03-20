import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  accentHover: '#C4603D',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenLight: '#EDF7F1',
  blue: '#2563EB',
  blueLight: '#EFF6FF',
  purple: '#6B4FA0',
  purpleLight: '#F5F0FF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
  codeBg: '#1E1E2E',
  codeText: '#CDD6F4',
  codeGreen: '#A6E3A1',
  codeBlue: '#89B4FA',
  codePurple: '#CBA6F7',
  codeOrange: '#FAB387',
  codeYellow: '#F9E2AF',
  codeComment: '#6C7086',
}

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
    <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
      {title && (
        <div style={{
          background: '#181825', padding: '10px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: t.codeComment }}>{title}</span>
          <span style={{
            fontSize: '0.65rem', fontFamily: t.fontSans, color: t.codeComment,
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>{language}</span>
        </div>
      )}
      <pre style={{
        background: t.codeBg, padding: '20px', margin: 0,
        overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.7,
        fontFamily: '"SF Mono", "Fira Code", "JetBrains Mono", monospace',
        color: t.codeText,
      }}>
        <code>{children}</code>
      </pre>
    </div>
  )
}

function Callout({ type = 'info', children }) {
  const styles = {
    info: { bg: t.blueLight, border: t.blue, icon: 'ℹ️' },
    tip: { bg: t.greenLight, border: t.green, icon: '💡' },
    warning: { bg: '#FFF7ED', border: '#EA580C', icon: '⚠️' },
  }
  const s = styles[type]
  return (
    <div style={{
      padding: '16px 20px', borderRadius: '8px', background: s.bg,
      borderLeft: `3px solid ${s.border}`, marginBottom: '24px',
      display: 'flex', gap: '10px', alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
      <div style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.text, lineHeight: 1.7 }}>{children}</div>
    </div>
  )
}

function Nav() {
  return (
    <nav style={{
      borderBottom: `1px solid ${t.border}`, background: t.white,
      padding: '0 20px', height: '60px', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link href="/" style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '1.1rem', color: t.text, textDecoration: 'none', letterSpacing: '-0.01em' }}>
        ChurnRecovery
      </Link>
      <div className="nav-links" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link href="/features" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem', fontFamily: t.fontSans }}>Features</Link>
        <Link href="/docs" style={{ color: t.accent, textDecoration: 'none', fontSize: '0.9rem', fontFamily: t.fontSans, fontWeight: 600 }}>Docs</Link>
        <Link href="/demo" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem', fontFamily: t.fontSans }}>Demo</Link>
        <Link href="/blog" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem', fontFamily: t.fontSans }}>Blog</Link>
        <a href="https://tally.so/r/churnrecovery" style={{
          background: t.accent, color: t.white, padding: '8px 18px', borderRadius: '6px',
          textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, fontFamily: t.fontSans,
        }}>Get Early Access</a>
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

      <div style={{ background: t.bg, minHeight: '100vh', fontFamily: t.fontSans }}>
        <Nav />

        <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Sidebar */}
          <aside className="docs-sidebar" style={{
            width: '220px', flexShrink: 0, padding: '32px 0',
            position: 'sticky', top: '60px', height: 'calc(100vh - 60px)',
            overflowY: 'auto', borderRight: `1px solid ${t.border}`,
            display: 'flex', flexDirection: 'column', gap: '2px',
          }}>
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActiveSection(s.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px', borderRadius: '6px',
                  textDecoration: 'none', fontSize: '0.85rem',
                  fontWeight: activeSection === s.id ? 600 : 400,
                  color: activeSection === s.id ? t.accent : t.gray,
                  background: activeSection === s.id ? '#FDF4EF' : 'transparent',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '0.8rem' }}>{s.icon}</span>
                {s.label}
              </a>
            ))}
          </aside>

          {/* Main content */}
          <main className="docs-main" style={{ flex: 1, padding: '40px 0 80px 48px', maxWidth: '780px' }}>
            {/* Quick Start */}
            <section id="quickstart" style={{ marginBottom: '64px' }}>
              <h1 style={{
                fontFamily: t.fontSans, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800,
                color: t.text, letterSpacing: '-0.04em', margin: '0 0 12px', lineHeight: 1.1,
              }}>
                Developer Documentation
              </h1>
              <p style={{ fontFamily: t.fontSerif, fontSize: '1.1rem', color: t.gray, lineHeight: 1.7, margin: '0 0 32px' }}>
                Get ChurnRecovery running in your app in under 10 minutes. One package, two function calls, zero backend work.
              </p>

              <Callout type="tip">
                <strong>Fastest path:</strong> Install the SDK, initialize with your API key, and call <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '3px', fontSize: '0.82rem' }}>showCancelFlow()</code> when a user clicks your cancel button. That&apos;s it.
              </Callout>

              <h2 style={{ fontFamily: t.fontSans, fontSize: '1.3rem', fontWeight: 700, color: t.text, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
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

              <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.7, margin: '0 0 24px' }}>
                That&apos;s the entire integration. ChurnRecovery handles the cancel flow UI, reason collection, offer presentation, and analytics — all from that single <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '3px', fontSize: '0.82rem' }}>showCancelFlow()</code> call.
              </p>
            </section>

            {/* Installation */}
            <section id="installation" style={{ marginBottom: '64px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
                📦 Installation
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.7, margin: '0 0 24px' }}>
                Choose your preferred method. The npm package includes TypeScript types and tree-shakes to ~8KB gzipped.
              </p>

              <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 12px' }}>
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

              <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 12px' }}>
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
            <section id="cancel-flow" style={{ marginBottom: '64px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
                🚪 Cancel Flow
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.7, margin: '0 0 24px' }}>
                The cancel flow is the core of ChurnRecovery. It intercepts the cancel action, collects the reason, presents a personalized retention offer, and reports the outcome.
              </p>

              <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 12px' }}>
                How it works
              </h3>
              <div className="cancel-flow-steps" style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px',
                marginBottom: '28px',
              }}>
                {[
                  { step: '1', label: 'User clicks cancel', desc: 'Your app calls showCancelFlow()' },
                  { step: '2', label: 'Reason picker', desc: 'Customer selects why they\'re leaving' },
                  { step: '3', label: 'Smart offer', desc: 'Personalized offer based on the reason' },
                  { step: '4', label: 'Outcome', desc: 'Customer saved or cancellation confirmed' },
                ].map(s => (
                  <div key={s.step} style={{
                    padding: '16px', borderRadius: '8px', background: t.white,
                    border: `1px solid ${t.border}`, textAlign: 'center',
                  }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: t.accent, color: t.white, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', fontWeight: 700, margin: '0 auto 10px',
                    }}>{s.step}</div>
                    <div style={{ fontFamily: t.fontSans, fontSize: '0.82rem', fontWeight: 600, color: t.text, marginBottom: '4px' }}>{s.label}</div>
                    <div style={{ fontFamily: t.fontSans, fontSize: '0.75rem', color: t.gray }}>{s.desc}</div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 12px' }}>
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

              <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 12px' }}>
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
            <section id="configuration" style={{ marginBottom: '64px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
                ⚙️ Configuration
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.7, margin: '0 0 24px' }}>
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

              <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 12px' }}>
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
            <section id="offers" style={{ marginBottom: '64px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
                🎁 Offer Types
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.7, margin: '0 0 24px' }}>
                Four built-in offer types handle the vast majority of cancel scenarios.
              </p>

              <div style={{ display: 'grid', gap: '16px', marginBottom: '28px' }}>
                {[
                  { type: 'Discount', icon: '💰', desc: 'Reduce the subscription price for a set number of months. Best for price-sensitive customers.', code: `{ type: 'discount', percent: 30, duration: 3 } // 30% off for 3 months` },
                  { type: 'Pause', icon: '⏸️', desc: 'Pause the subscription instead of canceling. Best for customers who plan to return.', code: `{ type: 'pause', months: 2 } // Pause for 2 months, auto-resume` },
                  { type: 'Human Escalation', icon: '💬', desc: 'Route the customer to live chat or support. Best for complex cases or enterprise accounts.', code: `{ type: 'human', url: '/support/chat', message: 'Talk to us first' }` },
                  { type: 'Feedback Only', icon: '📝', desc: 'Just collect the feedback, no counter-offer. Best for customers you know won\'t stay.', code: `{ type: 'feedback', prompt: 'Any feedback for us?' }` },
                ].map(o => (
                  <div key={o.type} style={{
                    border: `1px solid ${t.border}`, borderRadius: '10px',
                    padding: '24px', background: t.white,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{o.icon}</span>
                      <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: 0 }}>{o.type}</h3>
                    </div>
                    <p style={{ fontFamily: t.fontSerif, fontSize: '0.85rem', color: t.gray, lineHeight: 1.7, margin: '0 0 12px' }}>{o.desc}</p>
                    <code style={{
                      display: 'block', background: t.codeBg, color: t.codeText,
                      padding: '10px 14px', borderRadius: '6px', fontSize: '0.8rem',
                      fontFamily: 'monospace', overflowX: 'auto',
                    }}>{o.code}</code>
                  </div>
                ))}
              </div>

              <Callout type="tip">
                <strong>Pro tip:</strong> Combine offers with A/B testing. Route 50% of &quot;too expensive&quot; customers to 20% off and 50% to 30% off — then measure which save rate is better.
              </Callout>
            </section>

            {/* Analytics */}
            <section id="analytics" style={{ marginBottom: '64px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
                📊 Analytics API
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.7, margin: '0 0 24px' }}>
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
            <section id="webhooks" style={{ marginBottom: '64px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
                🔗 Webhooks
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.7, margin: '0 0 24px' }}>
                Receive real-time notifications when customers interact with the cancel flow.
              </p>

              <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 12px' }}>
                Events
              </h3>
              <div style={{
                border: `1px solid ${t.border}`, borderRadius: '10px',
                overflow: 'hidden', marginBottom: '24px',
              }}>
                {[
                  { event: 'cancel_flow.started', desc: 'Customer opened the cancel flow' },
                  { event: 'cancel_flow.reason_selected', desc: 'Customer selected a cancel reason' },
                  { event: 'cancel_flow.offer_presented', desc: 'A retention offer was shown' },
                  { event: 'cancel_flow.offer_accepted', desc: 'Customer accepted the offer (saved!)' },
                  { event: 'cancel_flow.completed', desc: 'Flow ended (saved or canceled)' },
                  { event: 'winback.email_sent', desc: 'Win-back email was sent to a churned customer' },
                  { event: 'winback.reactivated', desc: 'Churned customer reactivated via win-back' },
                ].map((e, i) => (
                  <div key={e.event} style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '12px 16px',
                    borderBottom: i < 6 ? `1px solid ${t.border}` : 'none',
                    background: i % 2 === 0 ? t.white : t.bg,
                  }}>
                    <code style={{
                      fontFamily: 'monospace', fontSize: '0.8rem', color: t.accent,
                      background: '#FDF4EF', padding: '3px 8px', borderRadius: '4px',
                      whiteSpace: 'nowrap',
                    }}>{e.event}</code>
                    <span style={{ fontFamily: t.fontSans, fontSize: '0.83rem', color: t.gray }}>{e.desc}</span>
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
            <section id="rest-api" style={{ marginBottom: '64px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
                🌐 REST API
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.7, margin: '0 0 24px' }}>
                Full REST API for server-side integrations. All endpoints are versioned and return JSON.
              </p>

              <CodeBlock language="bash" title="Base URL">
{`https://api.churnrecovery.com/v1`}
              </CodeBlock>

              <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 12px' }}>
                Authentication
              </h3>
              <CodeBlock language="bash" title="API key header">
{`curl https://api.churnrecovery.com/v1/analytics/save-rate \\
  -H "Authorization: Bearer cr_live_xxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json"`}
              </CodeBlock>

              <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 12px' }}>
                Key Endpoints
              </h3>
              <div style={{
                border: `1px solid ${t.border}`, borderRadius: '10px',
                overflow: 'hidden', marginBottom: '24px',
              }}>
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
                  <div key={e.path + e.method} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 16px',
                    borderBottom: i < 8 ? `1px solid ${t.border}` : 'none',
                    background: i % 2 === 0 ? t.white : t.bg,
                  }}>
                    <span style={{
                      fontFamily: 'monospace', fontSize: '0.72rem', fontWeight: 700,
                      padding: '2px 8px', borderRadius: '4px',
                      background: e.method === 'GET' ? t.greenLight : e.method === 'POST' ? t.blueLight : t.purpleLight,
                      color: e.method === 'GET' ? t.green : e.method === 'POST' ? t.blue : t.purple,
                      minWidth: '40px', textAlign: 'center',
                    }}>{e.method}</span>
                    <code style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: t.text }}>{e.path}</code>
                    <span style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: t.grayLight, marginLeft: 'auto' }}>{e.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Stripe */}
            <section id="stripe" style={{ marginBottom: '64px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
                💳 Stripe Integration
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.7, margin: '0 0 24px' }}>
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
            <section id="react" style={{ marginBottom: '64px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
                ⚛️ React SDK
              </h2>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.7, margin: '0 0 24px' }}>
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
            <section id="faq" style={{ marginBottom: '64px' }}>
              <h2 style={{ fontFamily: t.fontSans, fontSize: '1.5rem', fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
                ❓ Frequently Asked Questions
              </h2>

              <div style={{ display: 'grid', gap: '16px', marginTop: '24px' }}>
                {[
                  { q: 'Is it really free?', a: 'Yes. ChurnRecovery is completely free — no usage limits, no feature gates, no hidden fees. We monetize through optional premium add-ons (custom branding removal, SLA guarantees, dedicated support) that most teams won\'t need.' },
                  { q: 'What billing providers do you support?', a: 'Stripe is natively integrated with automatic offer application. Paddle support is in beta. For other providers (Chargebee, Recurly, Braintree), you can use our REST API and webhooks for manual integration.' },
                  { q: 'Does it work with server-side rendering?', a: 'Yes. The SDK detects the environment automatically. On the server, initialization is a no-op. The cancel flow modal only renders client-side. Full support for Next.js, Nuxt, Remix, and SvelteKit.' },
                  { q: 'How does the A/B testing work?', a: 'Define multiple offers per cancel reason, and ChurnRecovery automatically splits traffic and tracks acceptance rates. Results are statistically validated — we\'ll tell you when a variant reaches significance.' },
                  { q: 'Can I customize the cancel flow UI?', a: 'Fully. Pass a theme object with your brand colors, fonts, logo, and border radius. For deeper customization, use the headless mode — we handle the logic, you handle the UI.' },
                  { q: 'What about GDPR?', a: 'ChurnRecovery is GDPR-compliant. We process data as your data processor, store minimal customer data, and provide full data export and deletion APIs. We don\'t sell data. Period.' },
                ].map(faq => (
                  <div key={faq.q} style={{
                    padding: '20px 24px', border: `1px solid ${t.border}`,
                    borderRadius: '10px', background: t.white,
                  }}>
                    <h3 style={{
                      fontFamily: t.fontSans, fontSize: '0.95rem', fontWeight: 700,
                      color: t.text, margin: '0 0 8px',
                    }}>{faq.q}</h3>
                    <p style={{
                      fontFamily: t.fontSerif, fontSize: '0.85rem', color: t.gray,
                      lineHeight: 1.7, margin: 0,
                    }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom CTA */}
            <section style={{
              background: t.text, borderRadius: '12px', padding: '40px',
              textAlign: 'center',
            }}>
              <h2 style={{
                fontFamily: t.fontSans, fontSize: '1.4rem', fontWeight: 700,
                color: t.white, letterSpacing: '-0.03em', margin: '0 0 12px',
              }}>
                Ready to integrate?
              </h2>
              <p style={{
                fontFamily: t.fontSerif, fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)',
                margin: '0 0 24px', lineHeight: 1.7,
              }}>
                Join the waitlist to get your API key. Most teams are live in under an hour.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://tally.so/r/churnrecovery" style={{
                  display: 'inline-block', background: t.accent, color: t.white,
                  padding: '12px 28px', borderRadius: '8px', fontFamily: t.fontSans,
                  fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
                }}>
                  Get API Key — Free
                </a>
                <Link href="/demo" style={{
                  display: 'inline-block', background: 'transparent', color: 'rgba(255,255,255,0.7)',
                  padding: '12px 28px', borderRadius: '8px', fontFamily: t.fontSans,
                  fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}>
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
