import { useState, useEffect } from 'react'

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

function formatCurrency(n) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
  return `$${Math.round(n).toLocaleString()}`
}

function formatNumber(n) {
  return Math.round(n).toLocaleString()
}

function SliderInput({ label, value, min, max, step, onChange, format, hint }) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '8px',
      }}>
        <label style={{
          fontFamily: t.fontSans,
          fontSize: '0.88rem',
          fontWeight: 600,
          color: t.text,
        }}>
          {label}
        </label>
        <span style={{
          fontFamily: t.fontSans,
          fontSize: '1.1rem',
          fontWeight: 800,
          color: t.accent,
          letterSpacing: '-0.02em',
        }}>
          {format(value)}
        </span>
      </div>
      <div style={{ position: 'relative', height: '6px' }}>
        {/* Track */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          borderRadius: '3px',
          background: t.border,
        }} />
        {/* Fill */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${pct}%`,
          height: '6px',
          borderRadius: '3px',
          background: t.accent,
          transition: 'width 0.1s ease',
        }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: 'absolute',
            top: '-5px',
            left: 0,
            right: 0,
            width: '100%',
            height: '16px',
            opacity: 0,
            cursor: 'pointer',
            margin: 0,
          }}
        />
        {/* Thumb */}
        <div style={{
          position: 'absolute',
          top: '-5px',
          left: `calc(${pct}% - 8px)`,
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: t.accent,
          border: '2px solid white',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          pointerEvents: 'none',
          transition: 'left 0.1s ease',
        }} />
      </div>
      {hint && (
        <div style={{
          fontFamily: t.fontSans,
          fontSize: '0.75rem',
          color: t.grayLight,
          marginTop: '6px',
        }}>
          {hint}
        </div>
      )}
    </div>
  )
}

function ResultCard({ label, value, sublabel, highlight = false, green = false }) {
  return (
    <div style={{
      border: highlight ? `2px solid ${t.accent}` : `1px solid ${t.border}`,
      borderRadius: '12px',
      padding: '20px 24px',
      background: highlight ? '#FDF8F5' : t.white,
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: t.fontSans,
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: highlight ? t.accent : t.grayLight,
        marginBottom: '8px',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: t.fontSans,
        fontWeight: 800,
        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
        color: green ? t.green : highlight ? t.accent : t.text,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        marginBottom: '6px',
      }}>
        {value}
      </div>
      {sublabel && (
        <div style={{
          fontFamily: t.fontSans,
          fontSize: '0.75rem',
          color: t.grayLight,
          lineHeight: 1.4,
        }}>
          {sublabel}
        </div>
      )}
    </div>
  )
}

export default function ChurnCalculator() {
  const [mrr, setMrr] = useState(10000)
  const [churnRate, setChurnRate] = useState(5)
  const [saveRate, setSaveRate] = useState(30)

  // Calculate metrics
  const monthlyChurnedRevenue = mrr * (churnRate / 100)
  const annualChurnedRevenue = monthlyChurnedRevenue * 12
  const monthlySaved = monthlyChurnedRevenue * (saveRate / 100)
  const annualSaved = monthlySaved * 12
  const annualSavedWithChurnRecovery = annualSaved // ChurnRecovery is free
  const costOfCompetitor = 250 * 12 // Churnkey entry price * 12 months
  const netBenefit = annualSaved // Since ChurnRecovery is free
  const netBenefitVsCompetitor = annualSaved - costOfCompetitor

  // LTV impact (assuming 24 month avg LTV)
  const avgRevenuePerCustomer = mrr > 0 && churnRate > 0 ? mrr / (mrr / 100) : 200 // simplified
  const customersChurningMonthly = Math.round(monthlyChurnedRevenue / 100) // rough estimate
  const ltvPerCustomer = churnRate > 0 ? (100 / churnRate) * (mrr / Math.max(1, mrr / 100)) : 0

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
      {/* Inputs */}
      <div style={{
        background: t.white,
        border: `1px solid ${t.border}`,
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        <h3 style={{
          fontFamily: t.fontSans,
          fontSize: '1rem',
          fontWeight: 700,
          color: t.text,
          margin: '0 0 24px',
          letterSpacing: '-0.01em',
        }}>
          Your numbers
        </h3>

        <SliderInput
          label="Monthly Recurring Revenue (MRR)"
          value={mrr}
          min={1000}
          max={500000}
          step={1000}
          onChange={setMrr}
          format={formatCurrency}
          hint="Your current total MRR"
        />
        <SliderInput
          label="Monthly Churn Rate"
          value={churnRate}
          min={0.5}
          max={20}
          step={0.5}
          onChange={setChurnRate}
          format={v => `${v}%`}
          hint="Industry average for B2B SaaS is 2-7%"
        />
        <SliderInput
          label="Expected Cancel Flow Save Rate"
          value={saveRate}
          min={5}
          max={70}
          step={5}
          onChange={setSaveRate}
          format={v => `${v}%`}
          hint="ChurnRecovery customers typically achieve 25-45% save rates"
        />
      </div>

      {/* Results */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        marginBottom: '12px',
      }}>
        <ResultCard
          label="Monthly revenue at risk"
          value={formatCurrency(monthlyChurnedRevenue)}
          sublabel="Lost every month without action"
        />
        <ResultCard
          label="Annual revenue at risk"
          value={formatCurrency(annualChurnedRevenue)}
          sublabel="Per year if churn goes unchecked"
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        marginBottom: '12px',
      }}>
        <ResultCard
          label="Monthly revenue recoverable"
          value={formatCurrency(monthlySaved)}
          sublabel={`At ${saveRate}% save rate`}
          highlight
        />
        <ResultCard
          label="Annual revenue recoverable"
          value={formatCurrency(annualSaved)}
          sublabel="With ChurnRecovery — free"
          highlight
        />
      </div>

      {/* Comparison banner */}
      <div style={{
        background: t.greenLight,
        border: `1px solid #B8DFC9`,
        borderRadius: '12px',
        padding: '20px 24px',
        marginBottom: '12px',
      }}>
        <div style={{
          fontFamily: t.fontSans,
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: t.green,
          marginBottom: '10px',
        }}>
          ChurnRecovery vs. paying $250/mo for Churnkey
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}>
          <div>
            <div style={{
              fontFamily: t.fontSans,
              fontWeight: 800,
              fontSize: '1.5rem',
              color: t.green,
              letterSpacing: '-0.03em',
            }}>
              {formatCurrency(annualSaved)}
            </div>
            <div style={{
              fontFamily: t.fontSans,
              fontSize: '0.78rem',
              color: t.green,
              marginTop: '3px',
            }}>
              Net gain with ChurnRecovery (free)
            </div>
          </div>
          <div>
            <div style={{
              fontFamily: t.fontSans,
              fontWeight: 800,
              fontSize: '1.5rem',
              color: netBenefitVsCompetitor >= 0 ? t.green : '#C0392B',
              letterSpacing: '-0.03em',
            }}>
              {formatCurrency(Math.abs(netBenefitVsCompetitor))}
              {netBenefitVsCompetitor < 0 ? ' loss' : ' ahead'}
            </div>
            <div style={{
              fontFamily: t.fontSans,
              fontSize: '0.78rem',
              color: t.gray,
              marginTop: '3px',
            }}>
              vs. paying $250/mo for Churnkey
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', paddingTop: '8px' }}>
        <p style={{
          fontFamily: t.fontSerif,
          fontSize: '0.88rem',
          color: t.gray,
          margin: '0 0 16px',
          lineHeight: 1.6,
        }}>
          {formatCurrency(annualSaved)} per year — completely free with ChurnRecovery.
        </p>
        <a
          href="https://tally.so/r/churnrecovery"
          style={{
            display: 'inline-block',
            background: t.accent,
            color: t.white,
            padding: '12px 28px',
            borderRadius: '8px',
            fontFamily: t.fontSans,
            fontWeight: 700,
            fontSize: '0.92rem',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          Start Recovering Revenue — Free
        </a>
      </div>
    </div>
  )
}
