import Head from 'next/head'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
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

function StatCard({ label, value, change, changeLabel, color }) {
  const isPositive = change >= 0
  return (
    <div style={{
      background: t.white,
      border: `1px solid ${t.border}`,
      borderRadius: '12px',
      padding: '24px',
    }}>
      <div style={{ fontSize: '0.78rem', color: t.grayLight, fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: color || t.text, letterSpacing: '-0.04em', marginBottom: '4px' }}>
        {value}
      </div>
      {change !== undefined && (
        <div style={{ fontSize: '0.78rem', color: isPositive ? t.green : t.red, fontWeight: 500 }}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}% {changeLabel || 'vs last month'}
        </div>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div style={{
      background: t.white,
      border: `2px dashed ${t.border}`,
      borderRadius: '12px',
      padding: '60px 40px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚀</div>
      <h2 style={{ fontFamily: t.fontSans, fontSize: '1.3rem', fontWeight: 700, color: t.text, margin: '0 0 8px' }}>
        Welcome to ChurnRecovery
      </h2>
      <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.7, margin: '0 0 24px', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}>
        Set up your first cancel flow to start recovering churned customers. It takes less than 5 minutes.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/app/cancel-flow" style={{
          background: t.accent, color: t.white, padding: '10px 24px',
          borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
        }}>
          Create Cancel Flow
        </Link>
        <Link href="/app/install" style={{
          background: t.white, color: t.text, padding: '10px 24px',
          borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
          border: `1px solid ${t.border}`,
        }}>
          Install Widget
        </Link>
      </div>
    </div>
  )
}

function RecentEventRow({ event }) {
  const outcomeColors = {
    saved: { bg: t.greenLight, text: t.green, label: 'Saved' },
    cancelled: { bg: t.redLight, text: t.red, label: 'Cancelled' },
    paused: { bg: t.blueLight, text: t.blue, label: 'Paused' },
    downgraded: { bg: '#FFF7ED', text: '#EA580C', label: 'Downgraded' },
  }
  const outcome = outcomeColors[event.outcome] || outcomeColors.cancelled

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: `1px solid ${t.border}`,
    }}>
      <div>
        <div style={{ fontSize: '0.88rem', fontWeight: 500, color: t.text }}>{event.customer}</div>
        <div style={{ fontSize: '0.78rem', color: t.grayLight }}>{event.reason}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{
          fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: '20px',
          background: outcome.bg, color: outcome.text,
        }}>
          {outcome.label}
        </span>
        <span style={{ fontSize: '0.75rem', color: t.grayLight }}>{event.time}</span>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [projects, setProjects] = useState([])
  const [hasData, setHasData] = useState(false)

  // Mock data for demo — will be replaced with real API calls
  const mockStats = {
    saveRate: '34%',
    savedRevenue: '$12,450',
    cancelEvents: '847',
    avgSaveValue: '$49',
  }

  const mockEvents = [
    { customer: 'john@startup.com', reason: 'Too expensive', outcome: 'saved', time: '2m ago' },
    { customer: 'sarah@saas.io', reason: 'Not using enough', outcome: 'paused', time: '15m ago' },
    { customer: 'mike@agency.co', reason: 'Switching competitor', outcome: 'cancelled', time: '1h ago' },
    { customer: 'lisa@corp.com', reason: 'Missing feature', outcome: 'saved', time: '2h ago' },
    { customer: 'dave@tech.dev', reason: 'Too expensive', outcome: 'downgraded', time: '3h ago' },
  ]

  // Show empty state if no projects, mock data otherwise
  useEffect(() => {
    // TODO: Fetch real projects from API
    setHasData(true) // For demo, show mock data
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard — ChurnRecovery</title>
      </Head>
      <AppLayout title="Dashboard">
        <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 32px', lineHeight: 1.7 }}>
          {isLoaded && user ? `Welcome back, ${user.firstName || 'there'}` : 'Loading..'}. Here&apos;s your churn recovery overview.
        </p>

        {!hasData ? (
          <EmptyState />
        ) : (
          <>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
              <StatCard label="Save Rate" value={mockStats.saveRate} change={8} color={t.green} />
              <StatCard label="Revenue Saved" value={mockStats.savedRevenue} change={23} color={t.accent} />
              <StatCard label="Cancel Events" value={mockStats.cancelEvents} change={-5} />
              <StatCard label="Avg Save Value" value={mockStats.avgSaveValue} change={12} />
            </div>

            {/* Two Column: Recent Events + Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
              {/* Recent Events */}
              <div style={{
                background: t.white, border: `1px solid ${t.border}`,
                borderRadius: '12px', padding: '24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: 0 }}>
                    Recent Events
                  </h2>
                  <Link href="/app/analytics" style={{ fontSize: '0.78rem', color: t.accent, textDecoration: 'none', fontWeight: 500 }}>
                    View all →
                  </Link>
                </div>
                {mockEvents.map((event, i) => (
                  <RecentEventRow key={i} event={event} />
                ))}
              </div>

              {/* Quick Actions */}
              <div style={{
                background: t.white, border: `1px solid ${t.border}`,
                borderRadius: '12px', padding: '24px',
              }}>
                <h2 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 16px' }}>
                  Quick Actions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { href: '/app/cancel-flow', icon: '🚪', label: 'Edit Cancel Flow' },
                    { href: '/app/install', icon: '📦', label: 'Get Install Code' },
                    { href: '/app/settings', icon: '💳', label: 'Connect Stripe' },
                    { href: '/app/analytics', icon: '📈', label: 'View Analytics' },
                    { href: '/docs', icon: '📖', label: 'Read Docs' },
                  ].map(action => (
                    <Link
                      key={action.href}
                      href={action.href}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 12px', borderRadius: '8px',
                        textDecoration: 'none', fontSize: '0.85rem',
                        color: t.text, border: `1px solid ${t.border}`,
                        transition: 'background 0.15s',
                      }}
                    >
                      <span>{action.icon}</span>
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </AppLayout>
    </>
  )
}

DashboardPage.isAppPage = true
