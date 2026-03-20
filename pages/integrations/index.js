import Head from 'next/head'
import Link from 'next/link'
import { integrations } from '../../lib/integrations'

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
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

export default function IntegrationsIndex() {
  const processors = integrations.filter(i => i.category === 'Payment Processor')
  const management = integrations.filter(i => i.category === 'Subscription Management')

  return (
    <div style={{ background: t.bg, minHeight: '100vh', fontFamily: t.fontSans }}>
      <Head>
        <title>Integrations — ChurnRecovery Works With Every Payment Stack</title>
        <meta name="description" content="ChurnRecovery integrates with Stripe, Paddle, Braintree, Chargebee, Recurly, and Lemon Squeezy. Free churn recovery for every payment processor." />
        <meta property="og:title" content="ChurnRecovery Integrations — Stripe, Paddle, Braintree & More" />
        <meta property="og:description" content="Free churn recovery that works with your existing payment stack. Stripe, Paddle, Braintree, Chargebee, Recurly, Lemon Squeezy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://churnrecovery.com/integrations" />
        <meta property="og:image" content="https://churnrecovery.com/og/integrations.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://churnrecovery.com/integrations" />
      </Head>

      {/* Hero */}
      <div style={{ borderBottom: `1px solid ${t.border}`, background: t.white }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 32px 64px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', background: t.greenLight, color: t.green,
            borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 600,
            marginBottom: 20, letterSpacing: '0.02em'
          }}>
            Works with your stack
          </div>
          <h1 style={{ fontFamily: t.fontSerif, fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: t.text, margin: '0 0 20px', lineHeight: 1.15 }}>
            Every payment processor.<br />
            <span style={{ color: t.accent }}>One churn recovery tool.</span>
          </h1>
          <p style={{ fontSize: 19, color: t.gray, maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.65, fontFamily: t.fontSerif }}>
            ChurnRecovery integrates with Stripe, Paddle, Braintree, Chargebee, Recurly, and Lemon Squeezy — at no cost, with full cancel flow and payment recovery features.
          </p>
          {/* Logo strip */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`,
            margin: '0 auto', maxWidth: 720, width: '100%'
          }} className="logo-strip">
            {integrations.map((integration, i) => (
              <Link key={integration.slug} href={`/integrations/${integration.slug}`} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '16px 20px',
                textDecoration: 'none', color: t.text, fontWeight: 600, fontSize: 15,
                borderRight: i % 3 < 2 ? `1px solid ${t.border}` : 'none',
                borderBottom: i < 3 ? `1px solid ${t.border}` : 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#F0EDE8'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontSize: 22 }}>{integration.logo}</span>
                {integration.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Processors */}
      <div style={{ maxWidth: 1100, margin: '64px auto 0', padding: '0 32px' }}>
        <h2 style={{ fontFamily: t.fontSerif, fontSize: 26, color: t.text, marginBottom: 8 }}>
          Payment Processors
        </h2>
        <p style={{ color: t.gray, marginBottom: 36, fontSize: 15 }}>
          Direct billing integrations with native webhook support.
        </p>
        <div className="integrations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {processors.map(integration => (
            <IntegrationCard key={integration.slug} integration={integration} />
          ))}
        </div>
      </div>

      {/* Subscription Management */}
      <div style={{ maxWidth: 1100, margin: '56px auto 0', padding: '0 32px' }}>
        <h2 style={{ fontFamily: t.fontSerif, fontSize: 26, color: t.text, marginBottom: 8 }}>
          Subscription Management Platforms
        </h2>
        <p style={{ color: t.gray, marginBottom: 36, fontSize: 15 }}>
          Full-stack billing platforms with subscription lifecycle management.
        </p>
        <div className="integrations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {management.map(integration => (
            <IntegrationCard key={integration.slug} integration={integration} />
          ))}
        </div>
      </div>

      {/* Custom/Webhook */}
      <div style={{ maxWidth: 1100, margin: '56px auto 0', padding: '0 32px' }}>
        <div style={{
          background: t.white, border: `1px solid ${t.border}`, borderRadius: 12,
          padding: '40px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40,
          alignItems: 'center'
        }} className="custom-grid">
          <div>
            <div style={{ fontSize: 36, marginBottom: 16 }}>🔌</div>
            <h3 style={{ fontFamily: t.fontSerif, fontSize: 22, color: t.text, marginBottom: 12 }}>
              Using something else?
            </h3>
            <p style={{ color: t.gray, fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
              ChurnRecovery works with any subscription billing system through our generic webhook API. If your platform can send webhook events, we can intercept cancellations and recover failed payments.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Generic webhook endpoint', 'REST API for subscription actions', 'JavaScript SDK for custom flows', 'Works with any backend language'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: t.text }}>
                  <span style={{ color: t.green, fontWeight: 700 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#1A1A1A', borderRadius: 8, padding: '24px', overflow: 'auto' }}>
            <pre style={{ color: '#E5E5E5', fontSize: 13, margin: 0, fontFamily: 'monospace', lineHeight: 1.6 }}>{`// Any billing platform via webhooks
const churnrecovery = require('@churnrecovery/node')

app.post('/webhooks/billing', (req, res) => {
  // Forward the event to ChurnRecovery
  const event = churnrecovery.parseEvent(req.body)
  
  if (event.type === 'subscription.cancelled') {
    // ChurnRecovery handles the rest
    churnrecovery.handleCancellation(event)
  }
  
  res.sendStatus(200)
})`}</pre>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1100, margin: '64px auto', padding: '0 32px' }}>
        <div style={{
          background: t.text, borderRadius: 16, padding: '56px 40px',
          textAlign: 'center', color: t.white
        }}>
          <h2 style={{ fontFamily: t.fontSerif, fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, marginBottom: 16 }}>
            Start recovering churn — free
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', marginBottom: 36, maxWidth: 500, margin: '0 auto 36px', fontFamily: t.fontSerif }}>
            No monthly fees. No per-recovery charges. Works with your existing payment stack.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#waitlist" style={{
              background: t.accent, color: t.white, padding: '14px 32px',
              borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16
            }}>
              Get early access →
            </Link>
            <Link href="/docs" style={{
              background: 'rgba(255,255,255,0.1)', color: t.white, padding: '14px 32px',
              borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 16,
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              View integration docs
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .integrations-grid { grid-template-columns: 1fr !important; }
          .custom-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .logo-strip { grid-template-columns: repeat(2, 1fr) !important; }
          .logo-strip a { justify-content: center !important; }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  )
}

function IntegrationCard({ integration }) {
  return (
    <Link href={`/integrations/${integration.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: t.white, border: `1px solid ${t.border}`, borderRadius: 12,
        padding: '28px', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s',
        height: '100%', display: 'flex', flexDirection: 'column'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = integration.color
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = t.border
        e.currentTarget.style.boxShadow = 'none'
      }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 10,
              background: integration.colorLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24
            }}>
              {integration.logo}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, color: t.text }}>{integration.name}</div>
              <div style={{ fontSize: 12, color: t.grayLight, marginTop: 2 }}>{integration.category}</div>
            </div>
          </div>
          {integration.popularity === 'Most popular' && (
            <div style={{
              background: t.greenLight, color: t.green, borderRadius: 20,
              padding: '3px 10px', fontSize: 11, fontWeight: 700
            }}>
              ⭐ Most popular
            </div>
          )}
        </div>
        <p style={{ fontSize: 14, color: t.gray, lineHeight: 1.6, margin: '0 0 20px', fontFamily: t.fontSerif, flexGrow: 1 }}>
          {integration.tagline}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 13, color: t.grayLight }}>
            ⏱ Setup: <span style={{ color: t.text, fontWeight: 600 }}>{integration.setupTime}</span>
          </div>
          <span style={{ fontSize: 13, color: integration.color, fontWeight: 600 }}>
            View guide →
          </span>
        </div>
      </div>
    </Link>
  )
}
