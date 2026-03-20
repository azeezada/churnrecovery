import Head from 'next/head'
import { useState } from 'react'
import AppLayout from '../../components/AppLayout'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenLight: '#EDF7F1',
  red: '#DC2626',
  redLight: '#FEF2F2',
  blue: '#2563EB',
  blueLight: '#EFF6FF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

// Simple bar chart using div heights
function BarChart({ data, height = 200 }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height, padding: '0 4px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '0.65rem', color: t.grayLight, fontWeight: 500 }}>
            {d.value}
          </span>
          <div style={{
            width: '100%',
            height: `${(d.value / max) * (height - 40)}px`,
            background: d.color || t.accent,
            borderRadius: '4px 4px 0 0',
            minHeight: '4px',
            transition: 'height 0.3s',
          }} />
          <span style={{ fontSize: '0.65rem', color: t.grayLight }}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function MetricCard({ label, value, sub, color }) {
  return (
    <div style={{
      background: t.white,
      border: `1px solid ${t.border}`,
      borderRadius: '10px',
      padding: '20px',
    }}>
      <div style={{ fontSize: '0.72rem', color: t.grayLight, fontWeight: 500, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </div>
      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: color || t.text, letterSpacing: '-0.04em' }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: '0.75rem', color: t.grayLight, marginTop: '4px' }}>{sub}</div>}
    </div>
  )
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30d')

  // Mock analytics data
  const saveRateByWeek = [
    { label: 'W1', value: 28, color: t.accent },
    { label: 'W2', value: 32, color: t.accent },
    { label: 'W3', value: 35, color: t.accent },
    { label: 'W4', value: 34, color: t.accent },
  ]

  const reasonBreakdown = [
    { label: 'Price', value: 38, color: '#D97757' },
    { label: 'Usage', value: 24, color: '#2563EB' },
    { label: 'Switch', value: 18, color: '#6B4FA0' },
    { label: 'Feature', value: 12, color: '#2D7A4F' },
    { label: 'Other', value: 8, color: '#999' },
  ]

  const outcomeBreakdown = [
    { label: 'Saved', value: 34, color: t.green },
    { label: 'Paused', value: 12, color: t.blue },
    { label: 'Down', value: 8, color: '#EA580C' },
    { label: 'Lost', value: 46, color: t.red },
  ]

  const revenueByWeek = [
    { label: 'W1', value: 2800, color: t.green },
    { label: 'W2', value: 3400, color: t.green },
    { label: 'W3', value: 4100, color: t.green },
    { label: 'W4', value: 3900, color: t.green },
  ]

  const recentEvents = [
    { customer: 'john@startup.com', reason: 'Too expensive', outcome: 'saved', offer: '30% discount', revenue: '$49', time: '2m ago' },
    { customer: 'sarah@saas.io', reason: 'Not using enough', outcome: 'paused', offer: '2mo pause', revenue: '$29', time: '15m ago' },
    { customer: 'mike@agency.co', reason: 'Switching', outcome: 'cancelled', offer: '50% discount', revenue: '$99', time: '1h ago' },
    { customer: 'lisa@corp.com', reason: 'Missing feature', outcome: 'saved', offer: 'Support call', revenue: '$149', time: '2h ago' },
    { customer: 'dave@tech.dev', reason: 'Too expensive', outcome: 'cancelled', offer: '30% discount', revenue: '$49', time: '3h ago' },
    { customer: 'amy@finance.io', reason: 'Not using', outcome: 'paused', offer: '1mo pause', revenue: '$79', time: '4h ago' },
    { customer: 'tom@dev.co', reason: 'Too complex', outcome: 'saved', offer: 'Support call', revenue: '$199', time: '5h ago' },
    { customer: 'nina@edu.org', reason: 'Other', outcome: 'cancelled', offer: 'Feedback', revenue: '$29', time: '6h ago' },
  ]

  const outcomeColors = {
    saved: { bg: t.greenLight, text: t.green },
    paused: { bg: t.blueLight, text: t.blue },
    cancelled: { bg: t.redLight, text: t.red },
  }

  return (
    <>
      <Head>
        <title>Analytics — ChurnRecovery</title>
      </Head>
      <AppLayout title="Analytics">
        {/* Period selector */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          {['7d', '30d', '90d', '12m'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: '6px 16px', borderRadius: '6px', fontSize: '0.8rem',
                fontFamily: t.fontSans, fontWeight: period === p ? 600 : 400,
                background: period === p ? t.accent : t.white,
                color: period === p ? t.white : t.gray,
                border: `1px solid ${period === p ? t.accent : t.border}`,
                cursor: 'pointer',
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Top metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
          <MetricCard label="Save Rate" value="34%" sub="↑ 8% vs prior" color={t.green} />
          <MetricCard label="Revenue Saved" value="$14.2K" sub="This period" color={t.accent} />
          <MetricCard label="Cancel Attempts" value="847" sub="↓ 5% vs prior" />
          <MetricCard label="Customers Saved" value="288" sub="34% of attempts" color={t.green} />
          <MetricCard label="Failed Payments" value="23" sub="78% recovered" color={t.blue} />
        </div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontFamily: t.fontSans, fontSize: '0.88rem', fontWeight: 700, color: t.text, margin: '0 0 16px' }}>
              Save Rate by Week
            </h3>
            <BarChart data={saveRateByWeek} />
          </div>
          <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontFamily: t.fontSans, fontSize: '0.88rem', fontWeight: 700, color: t.text, margin: '0 0 16px' }}>
              Revenue Recovered ($)
            </h3>
            <BarChart data={revenueByWeek} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontFamily: t.fontSans, fontSize: '0.88rem', fontWeight: 700, color: t.text, margin: '0 0 16px' }}>
              Cancel Reasons (%)
            </h3>
            <BarChart data={reasonBreakdown} height={160} />
          </div>
          <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontFamily: t.fontSans, fontSize: '0.88rem', fontWeight: 700, color: t.text, margin: '0 0 16px' }}>
              Outcomes (%)
            </h3>
            <BarChart data={outcomeBreakdown} height={160} />
          </div>
        </div>

        {/* Events table */}
        <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.border}` }}>
            <h3 style={{ fontFamily: t.fontSans, fontSize: '0.88rem', fontWeight: 700, color: t.text, margin: 0 }}>
              Recent Cancel Events
            </h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', fontFamily: t.fontSans }}>
              <thead>
                <tr style={{ background: '#FAFAF8' }}>
                  {['Customer', 'Reason', 'Offer', 'Outcome', 'MRR', 'Time'].map(h => (
                    <th key={h} style={{
                      padding: '10px 16px', textAlign: 'left', fontWeight: 600,
                      color: t.grayLight, fontSize: '0.72rem', textTransform: 'uppercase',
                      letterSpacing: '0.05em', borderBottom: `1px solid ${t.border}`,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((e, i) => {
                  const oc = outcomeColors[e.outcome] || outcomeColors.cancelled
                  return (
                    <tr key={i} style={{ borderBottom: `1px solid ${t.border}` }}>
                      <td style={{ padding: '10px 16px', color: t.text, fontWeight: 500 }}>{e.customer}</td>
                      <td style={{ padding: '10px 16px', color: t.gray }}>{e.reason}</td>
                      <td style={{ padding: '10px 16px', color: t.gray }}>{e.offer}</td>
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{
                          fontSize: '0.72rem', fontWeight: 600, padding: '2px 8px',
                          borderRadius: '12px', background: oc.bg, color: oc.text,
                          textTransform: 'capitalize',
                        }}>{e.outcome}</span>
                      </td>
                      <td style={{ padding: '10px 16px', color: t.text, fontWeight: 500 }}>{e.revenue}</td>
                      <td style={{ padding: '10px 16px', color: t.grayLight }}>{e.time}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </AppLayout>
    </>
  )
}

AnalyticsPage.isAppPage = true
