import Link from 'next/link'
import Head from 'next/head'

// Option A: Developer / Stripe-inspired dark theme
const t = {
  bg: '#0A0A0A',
  bgCard: '#141414',
  bgCode: '#1A1A2E',
  text: '#F5F5F5',
  textMuted: '#A0A0A0',
  accent: '#635BFF',
  accentHover: '#7C75FF',
  green: '#00D4AA',
  border: '#2A2A2A',
  font: '"Instrument Sans", "SF Mono", monospace',
}

function CodeBlock({ children }) {
  return (
    <pre style={{
      background: t.bgCode,
      border: `1px solid ${t.border}`,
      borderRadius: '8px',
      padding: '20px 24px',
      fontFamily: '"SF Mono", "Fira Code", monospace',
      fontSize: '0.85rem',
      color: t.textMuted,
      lineHeight: 1.7,
      overflowX: 'auto',
      margin: 0,
    }}>
      <code>{children}</code>
    </pre>
  )
}

function TerminalLine({ prompt, command, output }) {
  return (
    <div style={{ marginBottom: '4px' }}>
      <span style={{ color: t.green }}>{prompt || '$'}</span>{' '}
      <span style={{ color: t.text }}>{command}</span>
      {output && <div style={{ color: t.textMuted, marginTop: '2px' }}>{output}</div>}
    </div>
  )
}

function FeatureRow({ icon, title, desc }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '48px 1fr',
      gap: '16px',
      alignItems: 'start',
      padding: '24px 0',
      borderBottom: `1px solid ${t.border}`,
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '10px',
        background: `${t.accent}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.3rem',
      }}>{icon}</div>
      <div>
        <h3 style={{
          fontFamily: t.font,
          fontSize: '1rem',
          fontWeight: 600,
          color: t.text,
          margin: '0 0 6px 0',
        }}>{title}</h3>
        <p style={{
          fontFamily: t.font,
          fontSize: '0.9rem',
          color: t.textMuted,
          margin: 0,
          lineHeight: 1.5,
        }}>{desc}</p>
      </div>
    </div>
  )
}

export default function DeveloperStyle() {
  return (
    <>
      <Head>
        <title>ChurnRecovery — Developer Style (Option A)</title>
        <meta name="description" content="Developer-focused dark theme homepage concept for ChurnRecovery." />
      </Head>

      <div style={{ background: t.bg, minHeight: '100vh' }}>
        {/* Nav */}
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: `${t.bg}E6`,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${t.border}`,
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{
              fontFamily: t.font,
              fontSize: '1rem',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.02em',
            }}>
              <span style={{ color: t.accent }}>{'>'}</span> churnrecovery
            </span>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              {['Docs', 'Pricing', 'GitHub'].map(item => (
                <span key={item} style={{
                  fontFamily: t.font,
                  fontSize: '0.85rem',
                  color: t.textMuted,
                  cursor: 'pointer',
                }}>{item}</span>
              ))}
              <span style={{
                fontFamily: t.font,
                fontSize: '0.85rem',
                fontWeight: 600,
                color: t.bg,
                background: t.accent,
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}>Get Started</span>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ paddingTop: '160px' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px 80px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}>
            <div>
              <div style={{
                fontFamily: t.font,
                fontSize: '0.75rem',
                fontWeight: 600,
                color: t.green,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                ● OPEN SOURCE · FREE FOREVER
              </div>
              <h1 style={{
                fontFamily: t.font,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: t.text,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                margin: '0 0 20px 0',
              }}>
                Recover churned revenue<br />
                <span style={{ color: t.accent }}>with one line of code.</span>
              </h1>
              <p style={{
                fontFamily: t.font,
                fontSize: '1.1rem',
                color: t.textMuted,
                margin: '0 0 32px 0',
                lineHeight: 1.5,
                maxWidth: '480px',
              }}>
                Cancel flows, dunning, payment recovery — all free.
                Drop in the script, configure your flows, ship.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{
                  fontFamily: t.font,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#fff',
                  background: t.accent,
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}>npm install churnrecovery</span>
                <span style={{
                  fontFamily: t.font,
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: t.textMuted,
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: `1px solid ${t.border}`,
                  cursor: 'pointer',
                }}>Read Docs →</span>
              </div>
            </div>

            {/* Terminal */}
            <div style={{
              background: t.bgCode,
              border: `1px solid ${t.border}`,
              borderRadius: '12px',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '12px 16px',
                borderBottom: `1px solid ${t.border}`,
                display: 'flex',
                gap: '8px',
              }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FEBC2E' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28C840' }} />
              </div>
              <div style={{
                padding: '20px 24px',
                fontFamily: '"SF Mono", "Fira Code", monospace',
                fontSize: '0.82rem',
                lineHeight: 1.8,
              }}>
                <TerminalLine command="npm install churnrecovery" />
                <TerminalLine prompt=" " command="" output="✓ added 3 packages in 1.2s" />
                <br />
                <TerminalLine command="cat app.js" />
                <div style={{ color: t.textMuted, marginTop: '4px' }}>
                  <span style={{ color: '#C678DD' }}>import</span>{' '}
                  <span style={{ color: t.text }}>{'{ CancelFlow }'}</span>{' '}
                  <span style={{ color: '#C678DD' }}>from</span>{' '}
                  <span style={{ color: '#98C379' }}>'churnrecovery'</span>
                </div>
                <div style={{ color: t.textMuted, marginTop: '2px' }}>
                  <span style={{ color: t.text }}>CancelFlow</span>
                  <span style={{ color: '#E5C07B' }}>.init</span>
                  <span style={{ color: t.textMuted }}>({'{'} </span>
                  <span style={{ color: '#E06C75' }}>apiKey</span>
                  <span style={{ color: t.textMuted }}>: </span>
                  <span style={{ color: '#98C379' }}>'cr_live_...'</span>
                  <span style={{ color: t.textMuted }}> {'}'})</span>
                </div>
                <br />
                <TerminalLine prompt=" " command="" output="✓ Cancel flow active — recovering revenue 🚀" />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ borderTop: `1px solid ${t.border}` }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '72px 24px',
          }}>
            <h2 style={{
              fontFamily: t.font,
              fontSize: '1.8rem',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.03em',
              margin: '0 0 8px 0',
            }}>Built for developers.</h2>
            <p style={{
              fontFamily: t.font,
              fontSize: '1rem',
              color: t.textMuted,
              margin: '0 0 32px 0',
            }}>Everything you need. Nothing you don't.</p>

            <FeatureRow icon="⚡" title="Cancel Flow Builder" desc="Visual editor or code config. Show offers, collect feedback, retain customers — all customizable." />
            <FeatureRow icon="💳" title="Payment Recovery" desc="Smart retry logic, email sequences, in-app prompts. Recovers failed payments automatically." />
            <FeatureRow icon="📊" title="Analytics" desc="Exit surveys, cancellation reasons, cohort analysis. Know why customers leave." />
            <FeatureRow icon="🔌" title="One-Line Integration" desc="Works with Stripe, Paddle, Lemon Squeezy. Add a script tag and you're live." />
            <FeatureRow icon="🆓" title="$0 Forever" desc="No per-recovery fees. No tiers. No gotchas. Free because we believe churn tooling should be accessible." />
            <FeatureRow icon="🔓" title="Open Source (MIT)" desc="Read the code. Fork it. Self-host. Contribute. Full transparency." />
          </div>
        </section>

        {/* Code example */}
        <section style={{ borderTop: `1px solid ${t.border}` }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '72px 24px',
          }}>
            <h2 style={{
              fontFamily: t.font,
              fontSize: '1.5rem',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.02em',
              margin: '0 0 24px 0',
            }}>Quick start</h2>
            <CodeBlock>{`// 1. Install
npm install churnrecovery

// 2. Initialize
import { ChurnRecovery } from 'churnrecovery'

ChurnRecovery.init({
  apiKey: 'cr_live_...',
  cancelFlow: {
    offers: ['pause', 'discount_20', 'downgrade'],
    exitSurvey: true,
  },
  dunning: {
    retrySchedule: [1, 3, 5, 7],
    emailSequence: true,
  }
})

// 3. That's it. You're recovering revenue.`}</CodeBlock>
          </div>
        </section>

        {/* Back link */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '40px 24px 80px',
        }}>
          <Link href="/styles" style={{
            fontFamily: t.font,
            fontSize: '0.85rem',
            color: t.accent,
            textDecoration: 'none',
          }}>← Back to style explorer</Link>
        </div>
      </div>
    </>
  )
}
