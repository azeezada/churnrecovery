import Head from 'next/head'
import Link from 'next/link'
import { integrations, getIntegration, getAllIntegrationSlugs } from '../../lib/integrations'

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

export default function IntegrationPage({ integration }) {
  if (!integration) return null

  const others = integrations.filter(i => i.slug !== integration.slug).slice(0, 3)

  return (
    <div style={{ background: t.bg, minHeight: '100vh', fontFamily: t.fontSans }}>
      <Head>
        <title>ChurnRecovery + {integration.name} Integration — Free Churn Recovery</title>
        <meta name="description" content={`Integrate ChurnRecovery with ${integration.name} in ${integration.setupTime}. Free cancel flow interception and payment recovery for ${integration.name} subscriptions.`} />
        <meta property="og:title" content={`ChurnRecovery + ${integration.name} Integration`} />
        <meta property="og:description" content={`Free churn recovery for ${integration.name} — cancel flows, dunning, analytics.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://churnrecovery.com/integrations/${integration.slug}`} />
        <meta property="og:image" content="https://churnrecovery.com/og/integrations.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://churnrecovery.com/integrations/${integration.slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": `How to integrate ChurnRecovery with ${integration.name}`,
          "description": `Set up ChurnRecovery churn recovery for ${integration.name} subscriptions`,
          "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
          "totalTime": `PT${integration.setupTime.replace(' minutes', 'M').replace(' hour', 'H').replace('s', '')}`,
        })}} />
      </Head>

      {/* Breadcrumb */}
      <div style={{ borderBottom: `1px solid ${t.border}`, background: t.white }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 32px' }}>
          <nav style={{ fontSize: 13, color: t.grayLight }}>
            <Link href="/" style={{ color: t.grayLight, textDecoration: 'none' }}>Home</Link>
            {' / '}
            <Link href="/integrations" style={{ color: t.grayLight, textDecoration: 'none' }}>Integrations</Link>
            {' / '}
            <span style={{ color: t.text }}>{integration.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: t.white, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 14,
              background: integration.colorLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, flexShrink: 0,
              border: `2px solid ${integration.color}20`
            }}>
              {integration.logo}
            </div>
            <div>
              <div style={{ fontSize: 13, color: t.grayLight, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                Integration Guide
              </div>
              <h1 style={{ fontFamily: t.fontSerif, fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: t.text, margin: 0, lineHeight: 1.2 }}>
                ChurnRecovery + {integration.name}
              </h1>
            </div>
          </div>
          <p style={{ fontSize: 18, color: t.gray, maxWidth: 640, margin: '0 0 32px', lineHeight: 1.7, fontFamily: t.fontSerif }}>
            {integration.description}
          </p>
          <div className="meta-bar" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              <span style={{ color: t.green }}>⏱</span>
              <span style={{ color: t.gray }}>Setup time:</span>
              <strong style={{ color: t.text }}>{integration.setupTime}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              <span>📦</span>
              <span style={{ color: t.gray }}>Category:</span>
              <strong style={{ color: t.text }}>{integration.category}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              <span>💰</span>
              <span style={{ color: t.gray }}>Cost:</span>
              <strong style={{ color: t.green }}>Free</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 32px 0' }}>
        <div className="integration-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'start' }}>

          {/* Left — main content */}
          <div>
            {/* What's supported */}
            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: t.fontSerif, fontSize: 22, color: t.text, marginBottom: 24 }}>
                What's included
              </h2>
              <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {integration.features.map(feature => (
                  <div key={feature.name} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: t.white, border: `1px solid ${t.border}`,
                    borderRadius: 8, padding: '12px 16px', fontSize: 14
                  }}>
                    <span style={{ color: feature.supported ? t.green : '#CCC', fontWeight: 700, fontSize: 16 }}>
                      {feature.supported ? '✓' : '✕'}
                    </span>
                    <span style={{ color: feature.supported ? t.text : t.grayLight }}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: t.fontSerif, fontSize: 22, color: t.text, marginBottom: 20 }}>
                Integration highlights
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {integration.highlights.map(highlight => (
                  <li key={highlight} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: t.text }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: integration.colorLight, color: integration.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1
                    }}>✓</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>

            {/* Code example */}
            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: t.fontSerif, fontSize: 22, color: t.text, marginBottom: 16 }}>
                Quick start
              </h2>
              <p style={{ color: t.gray, fontSize: 14, lineHeight: 1.65, marginBottom: 20, fontFamily: t.fontSerif }}>
                Get ChurnRecovery running with {integration.name} in {integration.setupTime}. Copy the snippet below and replace the placeholder values with your credentials.
              </p>
              <div style={{ background: '#1A1A1A', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ background: '#2A2A2A', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
                      <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                    ))}
                  </div>
                  <span style={{ color: '#888', fontSize: 12, marginLeft: 8 }}>
                    {integration.name.toLowerCase()}-integration.js
                  </span>
                </div>
                <pre style={{ color: '#E5E5E5', fontSize: 13, margin: 0, padding: '24px', fontFamily: 'monospace', lineHeight: 1.65, overflowX: 'auto' }}>
                  {integration.codeExample}
                </pre>
              </div>
            </section>

            {/* SEO content */}
            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: t.fontSerif, fontSize: 22, color: t.text, marginBottom: 16 }}>
                About {integration.name}
              </h2>
              <p style={{ color: t.gray, fontSize: 15, lineHeight: 1.75, fontFamily: t.fontSerif }}>
                {integration.seoContent}
              </p>
              <p style={{ color: t.gray, fontSize: 15, lineHeight: 1.75, fontFamily: t.fontSerif, marginTop: 16 }}>
                ChurnRecovery is free churn recovery software that works alongside {integration.name} to reduce voluntary churn (cancel flows) and involuntary churn (failed payments). Unlike Churnkey ($250–$825/month) or ProfitWell Retain ($149–$499/month), ChurnRecovery has zero monthly fees — making it ideal for bootstrapped SaaS companies and teams looking to maximize their LTV without additional tooling costs.
              </p>
            </section>
          </div>

          {/* Right — sidebar */}
          <div className="integration-sidebar" style={{ minWidth: 0, overflow: 'hidden' }}>
            {/* CTA card */}
            <div style={{
              background: t.accent, borderRadius: 12, padding: '28px',
              color: t.white, marginBottom: 24, boxSizing: 'border-box',
              overflow: 'hidden', wordBreak: 'break-word', maxWidth: '100%',
              width: '100%'
            }}>
              <div style={{ fontSize: 22, marginBottom: 12 }}>🚀</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
                Start free today
              </h3>
              <p style={{ fontSize: 14, opacity: 0.9, marginBottom: 20, lineHeight: 1.6, fontFamily: t.fontSerif }}>
                Add ChurnRecovery to your {integration.name} stack. Free forever, no credit card required.
              </p>
              <Link href="/#waitlist" style={{
                display: 'block', background: t.white, color: t.accent,
                padding: '12px 20px', borderRadius: 8, fontWeight: 700,
                textDecoration: 'none', fontSize: 15, textAlign: 'center'
              }}>
                Get early access →
              </Link>
            </div>

            {/* Quick facts */}
            <div style={{
              background: t.white, border: `1px solid ${t.border}`,
              borderRadius: 12, padding: '24px', marginBottom: 24
            }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: t.grayLight, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                Quick facts
              </h4>
              {[
                { label: 'Setup time', value: integration.setupTime },
                { label: 'Pricing', value: 'Free' },
                { label: 'Cancel flows', value: 'Included' },
                { label: 'Dunning', value: 'Included' },
                { label: 'Analytics', value: 'Included' },
              ].map(fact => (
                <div key={fact.label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '10px 0', borderBottom: `1px solid ${t.border}`,
                  fontSize: 14
                }}>
                  <span style={{ color: t.gray }}>{fact.label}</span>
                  <span style={{ fontWeight: 600, color: fact.value === 'Free' || fact.value === 'Included' ? t.green : t.text }}>{fact.value}</span>
                </div>
              ))}
            </div>

            {/* Docs link */}
            <div style={{
              background: t.white, border: `1px solid ${t.border}`,
              borderRadius: 12, padding: '24px'
            }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: t.grayLight, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                Resources
              </h4>
              {[
                { label: '📚 Full documentation', href: '/docs' },
                { label: '🎮 Interactive demo', href: '/demo' },
                { label: '🧮 Churn calculator', href: '/tools/churn-calculator' },
                { label: '📦 All integrations', href: '/integrations' },
              ].map(link => (
                <Link key={link.href} href={link.href} style={{
                  display: 'block', padding: '10px 0',
                  borderBottom: `1px solid ${t.border}`,
                  textDecoration: 'none', color: t.text, fontSize: 14,
                  transition: 'color 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = t.accent}
                onMouseLeave={e => e.currentTarget.style.color = t.text}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Other integrations */}
      <div style={{ maxWidth: 1100, margin: '64px auto', padding: '0 32px' }}>
        <h2 style={{ fontFamily: t.fontSerif, fontSize: 24, color: t.text, marginBottom: 24 }}>
          Other integrations
        </h2>
        <div className="integrations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {others.map(other => (
            <Link key={other.slug} href={`/integrations/${other.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: t.white, border: `1px solid ${t.border}`, borderRadius: 10,
                padding: '20px', display: 'flex', alignItems: 'center', gap: 14,
                transition: 'border-color 0.15s', cursor: 'pointer'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = other.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: other.colorLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0
                }}>
                  {other.logo}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: t.text }}>{other.name}</div>
                  <div style={{ fontSize: 13, color: t.grayLight, marginTop: 2 }}>Setup: {other.setupTime}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: t.grayLight, fontSize: 18 }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .integration-layout { grid-template-columns: 1fr !important; }
          .integration-sidebar { order: -1; }
        }
        @media (max-width: 600px) {
          .integrations-grid { grid-template-columns: 1fr !important; }
          .feature-grid { grid-template-columns: 1fr !important; }
          .meta-bar { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
        }
        .integration-sidebar > div { max-width: 100%; overflow: hidden; }
        * { box-sizing: border-box; }
        html, body { overflow-x: hidden; }
      `}</style>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: getAllIntegrationSlugs(),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const integration = getIntegration(params.slug)
  return { props: { integration: integration || null } }
}
