import Head from 'next/head'
import Link from 'next/link'
import { useState, useCallback } from 'react'

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
  red: '#DC2626',
  redLight: '#FEF2F2',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

function fmt(n) {
  return Math.round(n).toLocaleString('en-US')
}

function fmtDollar(n) {
  if (n >= 1000) return '$' + (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return '$' + Math.round(n).toLocaleString('en-US')
}

function InputRow({ label, value, onChange, min, max, step, prefix, suffix, helpText }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
        <label style={{
          fontFamily: t.fontSans,
          fontSize: '0.9rem',
          fontWeight: 600,
          color: t.text,
        }}>{label}</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {prefix && <span style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.accent }}>{prefix}</span>}
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={e => onChange(parseFloat(e.target.value) || 0)}
            style={{
              fontFamily: t.fontSans,
              fontSize: '1rem',
              fontWeight: 700,
              color: t.accent,
              background: 'transparent',
              border: 'none',
              borderBottom: `2px solid ${t.accent}`,
              outline: 'none',
              width: '90px',
              textAlign: 'right',
              padding: '2px 0',
            }}
          />
          {suffix && <span style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.accent }}>{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: t.accent, cursor: 'pointer' }}
      />
      {helpText && (
        <p style={{
          fontFamily: t.fontSans,
          fontSize: '0.78rem',
          color: t.grayLight,
          margin: '6px 0 0',
          lineHeight: 1.5,
        }}>{helpText}</p>
      )}
    </div>
  )
}

function ResultCard({ label, value, sub, highlight, positive }) {
  return (
    <div style={{
      padding: '24px',
      borderRadius: '12px',
      border: highlight ? `2px solid ${t.accent}` : `1px solid ${t.border}`,
      background: highlight ? `${t.accent}08` : t.white,
      flex: 1,
      minWidth: '160px',
    }}>
      <div style={{
        fontFamily: t.fontSans,
        fontSize: '0.75rem',
        fontWeight: 600,
        color: highlight ? t.accent : t.grayLight,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: '8px',
      }}>{label}</div>
      <div style={{
        fontFamily: t.fontSans,
        fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
        fontWeight: 800,
        color: positive === false ? t.red : positive === true ? t.green : highlight ? t.accent : t.text,
        letterSpacing: '-0.04em',
        lineHeight: 1,
      }}>{value}</div>
      {sub && (
        <div style={{
          fontFamily: t.fontSans,
          fontSize: '0.78rem',
          color: t.gray,
          marginTop: '6px',
          lineHeight: 1.4,
        }}>{sub}</div>
      )}
    </div>
  )
}

export default function ROICalculatorPage() {
  const [subscribers, setSubscribers] = useState(500)
  const [churnRate, setChurnRate] = useState(5)
  const [arpu, setArpu] = useState(25)
  const [toolCost, setToolCost] = useState(0)
  const [recoveryRate, setRecoveryRate] = useState(15)

  // Calculations
  const subscribersLost = subscribers * (churnRate / 100)
  const revenueLostMonthly = subscribersLost * arpu
  const revenueLostAnnual = revenueLostMonthly * 12
  const revenueRecoveredMonthly = revenueLostMonthly * (recoveryRate / 100)
  const revenueRecoveredAnnual = revenueRecoveredMonthly * 12

  // vs doing nothing (paying nothing, recovering nothing)
  const netVsNothingAnnual = revenueRecoveredAnnual // ChurnRecovery is free

  // vs Churnkey at $250/mo
  const churnkeyCostAnnual = 250 * 12 // $3,000/year
  const netVsChurnkeyAnnual = revenueRecoveredAnnual - churnkeyCostAnnual + (toolCost * 12)

  // vs current tool
  const currentToolAnnual = toolCost * 12
  const netVsCurrentToolAnnual = revenueRecoveredAnnual - 0 + currentToolAnnual // savings from switching + recovered revenue

  const verdict = netVsChurnkeyAnnual > 0
    ? `ChurnRecovery saves you ${fmtDollar(netVsChurnkeyAnnual)}/year vs. Churnkey`
    : `ChurnRecovery recovers ${fmtDollar(revenueRecoveredAnnual)}/year — free`

  const title = 'Churn Recovery ROI Calculator — Does Your Tool Actually Pay For Itself?'
  const description = 'Find out if your cancel-flow tool is worth the cost — or if you\'re paying $250/mo to recover $300. Real numbers, instant results. Free calculator.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://churnrecovery.com/tools/roi-calculator" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href="https://churnrecovery.com/tools/roi-calculator" />
      </Head>

      <div style={{ background: t.bg, minHeight: '100vh', fontFamily: t.fontSans }}>
        {/* Nav */}
        <nav style={{
          borderBottom: `1px solid ${t.border}`,
          background: t.white,
          padding: '0 20px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <Link href="/" style={{
            fontFamily: t.fontSans,
            fontWeight: 700,
            fontSize: '1.1rem',
            color: t.text,
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}>
            ChurnRecovery
          </Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/tools/churn-calculator" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem' }}>Churn Calculator</Link>
            <Link href="/demo" style={{ color: t.gray, textDecoration: 'none', fontSize: '0.9rem' }}>Demo</Link>
            <a href="/#waitlist" style={{
              background: t.accent,
              color: t.white,
              padding: '8px 18px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}>Join Waitlist</a>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px 48px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            background: '#F0EBE5',
            color: t.accent,
            padding: '4px 14px',
            borderRadius: '4px',
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '20px',
          }}>
            Free Tool
          </div>
          <h1 style={{
            fontFamily: t.fontSans,
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 800,
            color: t.text,
            letterSpacing: '-0.04em',
            margin: '0 0 16px',
            lineHeight: 1.15,
          }}>
            Does your churn tool actually pay for itself?
          </h1>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1.1rem',
            color: t.gray,
            lineHeight: 1.7,
            maxWidth: '540px',
            margin: '0 auto 16px',
          }}>
            Small businesses often pay $250/month for tools that recover $180/month in revenue. 
            Plug in your numbers and find out if you're coming out ahead — or getting ripped off.
          </p>
          <p style={{
            fontFamily: t.fontSans,
            fontSize: '0.82rem',
            color: t.grayLight,
          }}>
            Takes 30 seconds. Updates in real time.
          </p>
        </section>

        {/* Calculator */}
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
          }} className="calculator-grid">

            {/* Inputs */}
            <div style={{
              background: t.white,
              borderRadius: '16px',
              border: `1px solid ${t.border}`,
              padding: '32px',
            }}>
              <h2 style={{
                fontFamily: t.fontSans,
                fontSize: '1rem',
                fontWeight: 700,
                color: t.text,
                margin: '0 0 28px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontSize: '0.78rem',
                color: t.grayLight,
              }}>Your Numbers</h2>

              <InputRow
                label="Monthly subscribers / customers"
                value={subscribers}
                onChange={setSubscribers}
                min={10}
                max={10000}
                step={10}
                suffix=" subs"
                helpText="How many paying subscribers do you have right now?"
              />

              <InputRow
                label="Monthly churn rate"
                value={churnRate}
                onChange={setChurnRate}
                min={0.5}
                max={30}
                step={0.5}
                suffix="%"
                helpText="What % of subscribers cancel each month? Industry avg is 5%."
              />

              <InputRow
                label="Average revenue per subscriber / month"
                value={arpu}
                onChange={setArpu}
                min={1}
                max={500}
                step={1}
                prefix="$"
                helpText="What does a typical subscriber pay per month?"
              />

              <InputRow
                label="Current churn tool cost / month"
                value={toolCost}
                onChange={setToolCost}
                min={0}
                max={1000}
                step={10}
                prefix="$"
                helpText="What do you currently pay for a cancel-flow tool? (0 if none)"
              />

              <InputRow
                label="Expected cancel-flow save rate"
                value={recoveryRate}
                onChange={setRecoveryRate}
                min={1}
                max={50}
                step={1}
                suffix="%"
                helpText="What % of at-risk subscribers does your cancel flow save? 15% is a conservative estimate."
              />
            </div>

            {/* Results */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* The problem */}
              <div style={{
                background: t.redLight,
                borderRadius: '16px',
                border: `1px solid #FECACA`,
                padding: '24px',
              }}>
                <h2 style={{
                  fontFamily: t.fontSans,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: t.red,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  margin: '0 0 16px',
                }}>Without a cancel flow</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <ResultCard
                    label="Subscribers lost / month"
                    value={fmt(subscribersLost)}
                    sub="people walking out the door"
                    positive={false}
                  />
                  <ResultCard
                    label="Revenue lost / month"
                    value={fmtDollar(revenueLostMonthly)}
                    sub={`= ${fmtDollar(revenueLostAnnual)}/year down the drain`}
                    positive={false}
                  />
                </div>
              </div>

              {/* ChurnRecovery results */}
              <div style={{
                background: t.greenLight,
                borderRadius: '16px',
                border: `1px solid #A7F3D0`,
                padding: '24px',
              }}>
                <h2 style={{
                  fontFamily: t.fontSans,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: t.green,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  margin: '0 0 16px',
                }}>With ChurnRecovery (free)</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <ResultCard
                    label="Revenue recovered / month"
                    value={fmtDollar(revenueRecoveredMonthly)}
                    sub="recovered vs. doing nothing"
                    positive={true}
                  />
                  <ResultCard
                    label="Net annual savings"
                    value={fmtDollar(netVsNothingAnnual)}
                    sub="vs. no cancel flow at all"
                    positive={true}
                    highlight={false}
                  />
                </div>
              </div>

              {/* Vs Churnkey */}
              <div style={{
                background: netVsChurnkeyAnnual > 0 ? `${t.accent}08` : '#FFF',
                borderRadius: '16px',
                border: `2px solid ${t.accent}`,
                padding: '24px',
              }}>
                <h2 style={{
                  fontFamily: t.fontSans,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: t.accent,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  margin: '0 0 8px',
                }}>vs. Churnkey at $250/month</h2>
                <p style={{
                  fontFamily: t.fontSans,
                  fontSize: '0.8rem',
                  color: t.gray,
                  margin: '0 0 16px',
                }}>
                  Churnkey costs ${fmt(250 * 12)}/year. 
                  {toolCost > 0 && ` You're currently paying $${fmt(toolCost * 12)}/year on tools.`}
                  {' '}ChurnRecovery costs $0.
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{
                    fontFamily: t.fontSans,
                    fontSize: 'clamp(2rem, 6vw, 3rem)',
                    fontWeight: 800,
                    color: netVsChurnkeyAnnual > 0 ? t.green : t.red,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}>
                    {netVsChurnkeyAnnual > 0 ? '+' : ''}{fmtDollar(Math.abs(netVsChurnkeyAnnual))}/yr
                  </div>
                  <div style={{
                    fontFamily: t.fontSans,
                    fontSize: '0.85rem',
                    color: t.gray,
                    marginTop: '4px',
                  }}>
                    {netVsChurnkeyAnnual > 0
                      ? 'more money in your pocket vs. Churnkey'
                      : 'Churnkey costs more than it recovers at your scale'}
                  </div>
                </div>

                {/* Verdict */}
                <div style={{
                  background: netVsChurnkeyAnnual > 0 ? t.green : t.red,
                  color: t.white,
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontFamily: t.fontSans,
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  lineHeight: 1.4,
                }}>
                  {verdict}
                </div>

                {toolCost > 0 && (
                  <p style={{
                    fontFamily: t.fontSans,
                    fontSize: '0.78rem',
                    color: t.gray,
                    margin: '12px 0 0',
                  }}>
                    Switching to ChurnRecovery also saves you ${fmt(toolCost * 12)}/yr in tool costs.
                    Combined: {fmtDollar(netVsCurrentToolAnnual)}/year better off.
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* CTA */}
          <div style={{
            background: t.text,
            borderRadius: '16px',
            padding: '48px 40px',
            textAlign: 'center',
            marginTop: '32px',
          }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
              fontWeight: 800,
              color: t.white,
              letterSpacing: '-0.03em',
              margin: '0 0 12px',
            }}>
              Start recovering subscribers free
            </h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.65)',
              margin: '0 0 28px',
              lineHeight: 1.7,
            }}>
              No monthly fee. No per-subscriber charges. No hidden costs.
              Just a cancel flow that saves subscribers — and keeps 100% of recovered revenue in your pocket.
            </p>
            <a
              href="https://tally.so/r/churnrecovery"
              style={{
                display: 'inline-block',
                background: t.accent,
                color: t.white,
                padding: '15px 36px',
                borderRadius: '8px',
                fontFamily: t.fontSans,
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              Join Waitlist — Free →
            </a>
            <p style={{
              fontFamily: t.fontSans,
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.4)',
              marginTop: '16px',
            }}>
              Already using a churn tool?{' '}
              <Link href="/compare/churnkey" style={{ color: t.accent, textDecoration: 'none' }}>
                See how we compare →
              </Link>
            </p>
          </div>
        </section>

        {/* Explainer section */}
        <section style={{
          background: t.white,
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: '72px 24px',
        }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: t.fontSans,
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}>
              Why small businesses lose money on churn tools
            </h2>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '1rem',
              color: t.gray,
              lineHeight: 1.8,
              marginBottom: '32px',
            }}>
              The math is brutal for small subscription businesses. A newsletter creator with 300 paid subscribers 
              at $15/month and 5% churn loses about $225/month to voluntary churn. If a cancel-flow tool 
              recovers 15% of that, they get back ~$34/month. But if the tool costs $250/month... 
              <strong style={{ color: t.text }}> they're paying $216/month to recover $34.</strong>
            </p>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '1rem',
              color: t.gray,
              lineHeight: 1.8,
              marginBottom: '32px',
            }}>
              This is the business model of enterprise churn tools sold down-market. They price for 
              million-dollar MRR companies, and smaller businesses pay the same rate while recovering 
              a tiny fraction of what the tool costs.
            </p>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '1rem',
              color: t.gray,
              lineHeight: 1.8,
              marginBottom: '0',
            }}>
              ChurnRecovery is free because we believe the tool should serve the business — 
              not the other way around. Every dollar you recover stays with you.
            </p>
          </div>
        </section>

        {/* Related links */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px' }}>
          <h2 style={{
            fontFamily: t.fontSans,
            fontSize: '1.1rem',
            fontWeight: 700,
            color: t.text,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}>
            More tools & resources
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {[
              { href: '/tools/churn-calculator', label: '→ Churn Revenue Calculator' },
              { href: '/demo', label: '→ See the cancel flow demo' },
              { href: '/compare/churnkey', label: '→ ChurnRecovery vs Churnkey' },
              { href: '/pricing', label: '→ See our pricing (it\'s $0)' },
              { href: '/posts/Ultimate-Guide-SaaS-Churn', label: '→ Ultimate churn guide' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{
                display: 'block',
                padding: '12px 16px',
                border: `1px solid ${t.border}`,
                borderRadius: '8px',
                fontFamily: t.fontSans,
                fontSize: '0.85rem',
                color: t.text,
                textDecoration: 'none',
                fontWeight: 500,
              }}>
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        @media (max-width: 700px) {
          .calculator-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
