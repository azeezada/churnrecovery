import Link from 'next/link'
import Head from 'next/head'

// Option C: Data / Dashboard — analytical, numbers-first, credibility through data
const t = {
  bg: '#F8FAFC',
  bgCard: '#FFFFFF',
  bgDark: '#0F172A',
  bgNavy: '#1E293B',
  text: '#0F172A',
  textMuted: '#64748B',
  textLight: '#94A3B8',
  accent: '#0EA5E9',
  accentDark: '#0284C7',
  accentSoft: '#E0F2FE',
  green: '#10B981',
  greenSoft: '#D1FAE5',
  red: '#EF4444',
  redSoft: '#FEE2E2',
  border: '#E2E8F0',
  borderDark: '#334155',
  font: '"Instrument Sans", "Inter", sans-serif',
}

function MetricCard({ label, value, change, changeType, subtitle }) {
  const isPositive = changeType === 'positive'
  return (
    <div style={{
      background: t.bgCard,
      border: `1px solid ${t.border}`,
      borderRadius: '12px',
      padding: '24px',
    }}>
      <div style={{
        fontFamily: t.font,
        fontSize: '0.75rem',
        fontWeight: 600,
        color: t.textMuted,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        marginBottom: '12px',
      }}>{label}</div>
      <div style={{
        fontFamily: t.font,
        fontSize: '2.4rem',
        fontWeight: 700,
        color: t.text,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        marginBottom: '8px',
      }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{
          fontFamily: t.font,
          fontSize: '0.8rem',
          fontWeight: 600,
          color: isPositive ? t.green : t.red,
          background: isPositive ? t.greenSoft : t.redSoft,
          padding: '2px 8px',
          borderRadius: '6px',
        }}>{change}</span>
        {subtitle && (
          <span style={{
            fontFamily: t.font,
            fontSize: '0.8rem',
            color: t.textLight,
          }}>{subtitle}</span>
        )}
      </div>
    </div>
  )
}

function TableRow({ feature, churnrecovery, churnkey, isHighlighted }) {
  return (
    <tr style={{ background: isHighlighted ? t.accentSoft : 'transparent' }}>
      <td style={{
        padding: '14px 20px',
        fontFamily: t.font,
        fontSize: '0.9rem',
        color: t.text,
        fontWeight: isHighlighted ? 600 : 400,
        borderBottom: `1px solid ${t.border}`,
      }}>{feature}</td>
      <td style={{
        padding: '14px 20px',
        fontFamily: t.font,
        fontSize: '0.9rem',
        color: t.green,
        fontWeight: 600,
        borderBottom: `1px solid ${t.border}`,
        textAlign: 'center',
      }}>{churnrecovery}</td>
      <td style={{
        padding: '14px 20px',
        fontFamily: t.font,
        fontSize: '0.9rem',
        color: t.textMuted,
        borderBottom: `1px solid ${t.border}`,
        textAlign: 'center',
      }}>{churnkey}</td>
    </tr>
  )
}

function DataBar({ label, value, percentage, color }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '6px',
      }}>
        <span style={{
          fontFamily: t.font,
          fontSize: '0.85rem',
          color: t.text,
        }}>{label}</span>
        <span style={{
          fontFamily: t.font,
          fontSize: '0.85rem',
          fontWeight: 600,
          color: t.text,
        }}>{value}</span>
      </div>
      <div style={{
        height: '8px',
        background: t.border,
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${percentage}%`,
          background: color || t.accent,
          borderRadius: '4px',
          transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  )
}

export default function DataForwardStyle() {
  return (
    <>
      <Head>
        <title>ChurnRecovery — Data-Forward Style (Option C)</title>
        <meta name="description" content="Data-driven, analytical homepage concept for ChurnRecovery — for growth teams who want proof before they integrate." />
      </Head>

      <div style={{ background: t.bg, minHeight: '100vh' }}>
        {/* Nav */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: t.bgDark,
          borderBottom: `1px solid ${t.borderDark}`,
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                background: t.accent,
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 700 }}>CR</span>
              </div>
              <span style={{
                fontFamily: t.font,
                fontSize: '1rem',
                fontWeight: 600,
                color: '#F1F5F9',
              }}>ChurnRecovery</span>
            </div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              {['Features', 'Integrations', 'Docs', 'Blog'].map(item => (
                <span key={item} style={{
                  fontFamily: t.font,
                  fontSize: '0.85rem',
                  color: '#94A3B8',
                  cursor: 'pointer',
                }}>{item}</span>
              ))}
              <span style={{
                fontFamily: t.font,
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#fff',
                background: t.accent,
                padding: '8px 18px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}>Get Started</span>
            </div>
          </div>
        </nav>

        {/* Hero — data dashboard style */}
        <section style={{
          background: `linear-gradient(180deg, ${t.bgDark} 0%, ${t.bgNavy} 40%, ${t.bg} 100%)`,
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '80px 24px 48px',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(14,165,233,0.15)',
              border: '1px solid rgba(14,165,233,0.3)',
              color: t.accent,
              fontFamily: t.font,
              fontSize: '0.8rem',
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: '100px',
              marginBottom: '28px',
              letterSpacing: '0.04em',
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: t.green,
                display: 'inline-block',
              }} />
              LIVE PLATFORM · 2,400+ companies tracking churn
            </div>

            <h1 style={{
              fontFamily: t.font,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              color: '#F1F5F9',
              letterSpacing: '-0.04em',
              lineHeight: 1.08,
              margin: '0 0 20px 0',
              maxWidth: '700px',
            }}>
              The churn recovery platform<br />
              <span style={{ color: t.accent }}>with data that proves it works.</span>
            </h1>
            <p style={{
              fontFamily: t.font,
              fontSize: '1.1rem',
              color: '#94A3B8',
              margin: '0 0 48px 0',
              maxWidth: '560px',
              lineHeight: 1.6,
            }}>
              Don't take our word for it. The numbers speak: 34% average cancellation save rate,
              $8.2M in recovered revenue, and it costs you exactly $0.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '60px' }}>
              <span style={{
                fontFamily: t.font,
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#fff',
                background: t.accent,
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}>Start for free →</span>
              <span style={{
                fontFamily: t.font,
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#94A3B8',
                padding: '12px 24px',
                borderRadius: '8px',
                border: `1px solid ${t.borderDark}`,
                cursor: 'pointer',
              }}>View live dashboard</span>
            </div>

            {/* Dashboard preview — metric cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '48px',
            }}>
              <MetricCard label="Cancellations Saved" value="34.2%" change="+6.1%" changeType="positive" subtitle="vs last month" />
              <MetricCard label="Revenue Recovered" value="$8.2M" change="+$1.4M" changeType="positive" subtitle="this year" />
              <MetricCard label="Avg Save Value" value="$124" change="+$18" changeType="positive" subtitle="per saved customer" />
              <MetricCard label="Voluntary Churn" value="2.8%" change="-0.9%" changeType="positive" subtitle="down from 3.7%" />
            </div>
          </div>
        </section>

        {/* Recovery Breakdown */}
        <section>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '80px 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'start',
          }}>
            <div>
              <span style={{
                fontFamily: t.font,
                fontSize: '0.75rem',
                fontWeight: 700,
                color: t.accent,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '16px',
              }}>Recovery breakdown</span>
              <h2 style={{
                fontFamily: t.font,
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 700,
                color: t.text,
                letterSpacing: '-0.03em',
                margin: '0 0 16px 0',
                lineHeight: 1.2,
              }}>Understand exactly where your revenue goes</h2>
              <p style={{
                fontFamily: t.font,
                fontSize: '1rem',
                color: t.textMuted,
                margin: '0 0 32px 0',
                lineHeight: 1.6,
              }}>
                ChurnRecovery breaks down your churn into voluntary (customers who choose to leave)
                and involuntary (failed payments). Different problems, different solutions.
              </p>

              <div style={{
                background: t.bgCard,
                border: `1px solid ${t.border}`,
                borderRadius: '12px',
                padding: '28px',
              }}>
                <div style={{
                  fontFamily: t.font,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: t.textMuted,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}>Cancellation save rates by offer type</div>
                <DataBar label="Pause subscription (1-3 months)" value="51%" percentage={51} color={t.green} />
                <DataBar label="Discount offer (20% off)" value="38%" percentage={38} color={t.accent} />
                <DataBar label="Plan downgrade option" value="28%" percentage={28} color="#8B5CF6" />
                <DataBar label="No offer (control)" value="12%" percentage={12} color={t.textLight} />
              </div>
            </div>

            {/* Comparison table */}
            <div>
              <span style={{
                fontFamily: t.font,
                fontSize: '0.75rem',
                fontWeight: 700,
                color: t.accent,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '16px',
              }}>Feature comparison</span>
              <h2 style={{
                fontFamily: t.font,
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 700,
                color: t.text,
                letterSpacing: '-0.03em',
                margin: '0 0 24px 0',
                lineHeight: 1.2,
              }}>vs Churnkey</h2>

              <div style={{
                background: t.bgCard,
                border: `1px solid ${t.border}`,
                borderRadius: '12px',
                overflow: 'hidden',
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: t.bg }}>
                      <th style={{
                        padding: '14px 20px',
                        fontFamily: t.font,
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: t.textMuted,
                        textAlign: 'left',
                        borderBottom: `2px solid ${t.border}`,
                      }}>Feature</th>
                      <th style={{
                        padding: '14px 20px',
                        fontFamily: t.font,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: t.accent,
                        textAlign: 'center',
                        borderBottom: `2px solid ${t.border}`,
                      }}>ChurnRecovery</th>
                      <th style={{
                        padding: '14px 20px',
                        fontFamily: t.font,
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: t.textMuted,
                        textAlign: 'center',
                        borderBottom: `2px solid ${t.border}`,
                      }}>Churnkey</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableRow feature="Cancel flow builder" churnrecovery="✓ Free" churnkey="✓ $250/mo+" />
                    <TableRow feature="Exit surveys" churnrecovery="✓ Free" churnkey="✓ $250/mo+" />
                    <TableRow feature="Smart offers" churnrecovery="✓ Free" churnkey="✓ $250/mo+" />
                    <TableRow feature="Dunning management" churnrecovery="✓ Free" churnkey="✓ $250/mo+" />
                    <TableRow feature="Recovery analytics" churnrecovery="✓ Free" churnkey="✓ $250/mo+" />
                    <TableRow feature="A/B testing" churnrecovery="✓ Free" churnkey="✗ Enterprise only" />
                    <TableRow feature="API access" churnrecovery="✓ Free" churnkey="✗ Enterprise only" />
                    <TableRow feature="Open source (MIT)" churnrecovery="✓ Yes" churnkey="✗ No" isHighlighted={true} />
                    <TableRow feature="Monthly cost" churnrecovery="$0 forever" churnkey="$250–$825/mo" isHighlighted={true} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Integration strip */}
        <section style={{
          background: t.bgCard,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '48px 24px',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '48px',
            alignItems: 'center',
          }}>
            <div>
              <div style={{
                fontFamily: t.font,
                fontSize: '0.8rem',
                fontWeight: 700,
                color: t.textMuted,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>Integrates with</div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['Stripe', 'Paddle', 'Lemon Squeezy', 'Recurly', 'Chargebee'].map(name => (
                  <span key={name} style={{
                    fontFamily: t.font,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: t.text,
                    background: t.bg,
                    border: `1px solid ${t.border}`,
                    padding: '8px 16px',
                    borderRadius: '8px',
                  }}>{name}</span>
                ))}
              </div>
            </div>
            <div style={{
              fontFamily: t.font,
              fontSize: '0.9rem',
              color: t.textMuted,
              lineHeight: 1.6,
              maxWidth: '440px',
            }}>
              Connect to your billing provider in minutes. No webhooks to configure manually —
              our SDK handles everything automatically.
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: t.bgDark }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '80px 24px',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: t.font,
              fontSize: '0.8rem',
              fontWeight: 700,
              color: t.accent,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>Get started in 10 minutes</div>
            <h2 style={{
              fontFamily: t.font,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#F1F5F9',
              letterSpacing: '-0.03em',
              margin: '0 0 16px',
            }}>Start recovering revenue</h2>
            <p style={{
              fontFamily: t.font,
              fontSize: '1rem',
              color: '#94A3B8',
              margin: '0 auto 36px',
              maxWidth: '480px',
              lineHeight: 1.6,
            }}>
              Free forever. No credit card. Works with your existing Stripe setup.
              2,400+ SaaS companies trust ChurnRecovery.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <span style={{
                fontFamily: t.font,
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#fff',
                background: t.accent,
                padding: '14px 28px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}>Create free account →</span>
              <span style={{
                fontFamily: t.font,
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#94A3B8',
                padding: '14px 24px',
                borderRadius: '8px',
                border: `1px solid ${t.borderDark}`,
                cursor: 'pointer',
              }}>View docs</span>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 24px',
        }}>
          <Link href="/styles" style={{
            fontFamily: t.font,
            fontSize: '0.9rem',
            color: t.accent,
            textDecoration: 'none',
            fontWeight: 500,
          }}>← Back to style explorer</Link>
        </div>
      </div>
    </>
  )
}
