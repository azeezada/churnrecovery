import Link from 'next/link'
import Head from 'next/head'

// Option C: Data / Dashboard — numbers-first, analytical
const t = {
  bg: '#F8FAFC',
  bgWhite: '#FFFFFF',
  bgDark: '#0F172A',
  text: '#0F172A',
  textMuted: '#64748B',
  accent: '#0EA5E9',
  accentDark: '#0284C7',
  green: '#10B981',
  red: '#EF4444',
  border: '#E2E8F0',
  font: '"Instrument Sans", "Inter", system-ui, sans-serif',
  mono: '"SF Mono", "Fira Code", monospace',
}

function MetricCard({ value, label, trend, trendLabel }) {
  const isPositive = trend > 0
  return (
    <div style={{
      background: t.bgWhite,
      border: `1px solid ${t.border}`,
      borderRadius: '12px',
      padding: '24px',
    }}>
      <div style={{
        fontFamily: t.font,
        fontSize: '0.75rem',
        fontWeight: 500,
        color: t.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: '8px',
      }}>{label}</div>
      <div style={{
        fontFamily: t.mono,
        fontSize: '2rem',
        fontWeight: 700,
        color: t.text,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        marginBottom: '8px',
      }}>{value}</div>
      {trend !== undefined && (
        <div style={{
          fontFamily: t.font,
          fontSize: '0.8rem',
          fontWeight: 500,
          color: isPositive ? t.green : t.red,
        }}>
          {isPositive ? '↑' : '↓'} {Math.abs(trend)}% {trendLabel || 'vs last month'}
        </div>
      )}
    </div>
  )
}

function ChartBar({ label, value, max, color }) {
  const pct = (value / max) * 100
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
      <span style={{
        fontFamily: t.font,
        fontSize: '0.8rem',
        color: t.textMuted,
        width: '80px',
        textAlign: 'right',
        flexShrink: 0,
      }}>{label}</span>
      <div style={{
        flex: 1,
        height: '28px',
        background: '#F1F5F9',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: color || t.accent,
          borderRadius: '4px',
          transition: 'width 0.3s ease',
        }} />
      </div>
      <span style={{
        fontFamily: t.mono,
        fontSize: '0.8rem',
        fontWeight: 600,
        color: t.text,
        width: '48px',
        flexShrink: 0,
      }}>{value}%</span>
    </div>
  )
}

function ComparisonRow({ feature, us, them }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 100px 100px',
      gap: '16px',
      padding: '14px 0',
      borderBottom: `1px solid ${t.border}`,
      alignItems: 'center',
    }}>
      <span style={{
        fontFamily: t.font,
        fontSize: '0.9rem',
        color: t.text,
        fontWeight: 500,
      }}>{feature}</span>
      <span style={{
        fontFamily: t.font,
        fontSize: '0.85rem',
        color: us ? t.green : t.red,
        fontWeight: 600,
        textAlign: 'center',
      }}>{us ? '✓' : '✗'}</span>
      <span style={{
        fontFamily: t.font,
        fontSize: '0.85rem',
        color: them ? t.green : t.red,
        fontWeight: 600,
        textAlign: 'center',
      }}>{them ? '✓' : '✗'}</span>
    </div>
  )
}

export default function DataForwardStyle() {
  return (
    <>
      <Head>
        <title>ChurnRecovery — Data-Forward Style (Option C)</title>
        <meta name="description" content="Data-driven, analytics-focused homepage concept for ChurnRecovery." />
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
              letterSpacing: '-0.01em',
            }}>
              📊 ChurnRecovery
            </span>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              {['Product', 'Analytics', 'Docs', 'Pricing'].map(item => (
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
                color: t.bgWhite,
                background: t.accent,
                padding: '8px 18px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}>Start Free</span>
            </div>
          </div>
        </nav>

        {/* Hero with data */}
        <section style={{ paddingTop: '140px' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '60px 24px 40px',
          }}>
            <div style={{
              fontFamily: t.mono,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: t.accent,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              DATA-DRIVEN CHURN RECOVERY
            </div>
            <h1 style={{
              fontFamily: t.font,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.04em',
              lineHeight: 1.08,
              margin: '0 0 20px 0',
              maxWidth: '700px',
            }}>
              5–10% of your charges fail every month.
              <span style={{ color: t.accent }}> We recover 70% of them.</span>
            </h1>
            <p style={{
              fontFamily: t.font,
              fontSize: '1.1rem',
              color: t.textMuted,
              margin: '0 0 40px 0',
              maxWidth: '560px',
              lineHeight: 1.5,
            }}>
              Free churn recovery platform. Cancel flows, dunning, payment retries,
              and analytics — all backed by data, not guesswork.
            </p>

            {/* Metrics row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '64px',
            }}>
              <MetricCard value="73%" label="Recovery Rate" trend={12} trendLabel="avg improvement" />
              <MetricCard value="$0" label="Monthly Cost" />
              <MetricCard value="<5min" label="Setup Time" />
              <MetricCard value="MIT" label="License" />
            </div>
          </div>
        </section>

        {/* Chart section */}
        <section style={{ borderTop: `1px solid ${t.border}` }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '64px 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
          }}>
            {/* Recovery rates */}
            <div style={{
              background: t.bgWhite,
              border: `1px solid ${t.border}`,
              borderRadius: '12px',
              padding: '32px',
            }}>
              <h3 style={{
                fontFamily: t.font,
                fontSize: '1rem',
                fontWeight: 600,
                color: t.text,
                margin: '0 0 24px 0',
              }}>Recovery rates by method</h3>
              <ChartBar label="Smart retry" value={68} max={100} color={t.accent} />
              <ChartBar label="Email seq." value={45} max={100} color="#6366F1" />
              <ChartBar label="In-app" value={72} max={100} color={t.green} />
              <ChartBar label="Cancel flow" value={38} max={100} color="#F59E0B" />
            </div>

            {/* Churn breakdown */}
            <div style={{
              background: t.bgWhite,
              border: `1px solid ${t.border}`,
              borderRadius: '12px',
              padding: '32px',
            }}>
              <h3 style={{
                fontFamily: t.font,
                fontSize: '1rem',
                fontWeight: 600,
                color: t.text,
                margin: '0 0 24px 0',
              }}>Typical churn breakdown</h3>
              <ChartBar label="Involuntary" value={40} max={100} color={t.red} />
              <ChartBar label="Voluntary" value={35} max={100} color="#F59E0B" />
              <ChartBar label="Downgrade" value={15} max={100} color={t.accent} />
              <ChartBar label="Other" value={10} max={100} color="#94A3B8" />
              <p style={{
                fontFamily: t.font,
                fontSize: '0.78rem',
                color: t.textMuted,
                marginTop: '16px',
                marginBottom: 0,
              }}>
                Industry avg. ~70% of involuntary churn is recoverable with proper dunning.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section style={{ borderTop: `1px solid ${t.border}` }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '64px 24px',
          }}>
            <h2 style={{
              fontFamily: t.font,
              fontSize: '1.8rem',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.03em',
              margin: '0 0 32px 0',
            }}>Feature comparison</h2>

            <div style={{
              background: t.bgWhite,
              border: `1px solid ${t.border}`,
              borderRadius: '12px',
              padding: '24px 32px',
            }}>
              {/* Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 100px 100px',
                gap: '16px',
                padding: '0 0 14px 0',
                borderBottom: `2px solid ${t.border}`,
              }}>
                <span style={{
                  fontFamily: t.font,
                  fontSize: '0.8rem',
                  color: t.textMuted,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>Feature</span>
                <span style={{
                  fontFamily: t.font,
                  fontSize: '0.8rem',
                  color: t.accent,
                  fontWeight: 600,
                  textAlign: 'center',
                }}>Us</span>
                <span style={{
                  fontFamily: t.font,
                  fontSize: '0.8rem',
                  color: t.textMuted,
                  fontWeight: 600,
                  textAlign: 'center',
                }}>Churnkey</span>
              </div>
              <ComparisonRow feature="Cancel flow builder" us={true} them={true} />
              <ComparisonRow feature="Dunning / payment retry" us={true} them={true} />
              <ComparisonRow feature="Exit surveys & analytics" us={true} them={true} />
              <ComparisonRow feature="Self-hosted option" us={true} them={false} />
              <ComparisonRow feature="Open source (MIT)" us={true} them={false} />
              <ComparisonRow feature="Free tier" us={true} them={false} />

              {/* Price row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 100px 100px',
                gap: '16px',
                padding: '16px 0 0 0',
                marginTop: '8px',
                borderTop: `2px solid ${t.border}`,
              }}>
                <span style={{
                  fontFamily: t.font,
                  fontSize: '0.9rem',
                  color: t.text,
                  fontWeight: 700,
                }}>Price</span>
                <span style={{
                  fontFamily: t.mono,
                  fontSize: '1.1rem',
                  color: t.green,
                  fontWeight: 700,
                  textAlign: 'center',
                }}>$0</span>
                <span style={{
                  fontFamily: t.mono,
                  fontSize: '0.9rem',
                  color: t.textMuted,
                  fontWeight: 600,
                  textAlign: 'center',
                }}>$250+</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: t.bgDark }}>
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            padding: '72px 24px',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontFamily: t.font,
              fontSize: '2rem',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              margin: '0 0 12px 0',
            }}>Start recovering revenue today</h2>
            <p style={{
              fontFamily: t.font,
              fontSize: '1rem',
              color: '#94A3B8',
              margin: '0 0 32px 0',
              lineHeight: 1.5,
            }}>
              Free setup. Free forever. See results in your first week.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <span style={{
                fontFamily: t.font,
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#FFFFFF',
                background: t.accent,
                padding: '13px 28px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}>Get Started Free →</span>
              <span style={{
                fontFamily: t.font,
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#94A3B8',
                padding: '13px 24px',
                borderRadius: '8px',
                border: '1px solid #334155',
                cursor: 'pointer',
              }}>View Docs</span>
            </div>
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
