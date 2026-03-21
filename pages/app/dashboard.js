import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import AppLayout from '../../components/AppLayout'
import { useAuthUser } from '../../lib/useAuthUser'
import {
  getProjects,
  createProject,
  getEvents,
  getAnalytics,
} from '../../lib/localStore'
import { apiFetch } from '../../lib/useApi'

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

function Skeleton({ width = '100%', height = '1rem', style = {} }) {
  return (
    <div style={{
      background: 'linear-gradient(90deg, #E5E5E5 25%, #EBEBEB 50%, #E5E5E5 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      borderRadius: '4px',
      width,
      height,
      ...style,
    }} />
  )
}

function StatCard({ label, value, change, changeLabel, color, loading }) {
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
      {loading ? (
        <Skeleton height='2rem' width='60%' style={{ marginBottom: '4px' }} />
      ) : (
        <div style={{ fontSize: '2rem', fontWeight: 800, color: color || t.text, letterSpacing: '-0.04em', marginBottom: '4px' }}>
          {value}
        </div>
      )}
      {change !== undefined && !loading && (
        <div style={{ fontSize: '0.78rem', color: isPositive ? t.green : t.red, fontWeight: 500 }}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}% {changeLabel || 'vs last month'}
        </div>
      )}
    </div>
  )
}

function EmptyState({ onCreateProject, creating }) {
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
        <Link href="/app/onboarding" style={{
          background: t.accent, color: t.white, padding: '10px 24px',
          borderRadius: '8px', border: 'none', cursor: 'pointer',
          fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center'
        }}>
          Start Setup Wizard
        </Link>
        <button
          onClick={onCreateProject}
          disabled={creating}
          style={{
            background: 'transparent', color: t.gray, padding: '10px 24px',
            borderRadius: '8px', border: `1px solid ${t.border}`, cursor: creating ? 'not-allowed' : 'pointer',
            fontWeight: 500, fontSize: '0.9rem', opacity: creating ? 0.7 : 1,
          }}
        >
          {creating ? 'Creating...' : 'Quick Create'}
        </button>
        <Link href="/app/install" style={{
          padding: '10px 24px', borderRadius: '8px', border: `1px solid ${t.border}`,
          textDecoration: 'none', color: t.gray, fontSize: '0.9rem', fontWeight: 500,
        }}>
          Install Guide
        </Link>
      </div>
    </div>
  )
}

const outcomeColors = {
  saved: { bg: '#EDF7F1', text: '#2D7A4F', label: 'Saved ✓' },
  paused: { bg: '#EFF6FF', text: '#2563EB', label: 'Paused' },
  cancelled: { bg: '#FEF2F2', text: '#DC2626', label: 'Cancelled' },
  downgraded: { bg: '#FFF7ED', text: '#C2410C', label: 'Downgraded' },
  flow_started: { bg: '#F5F5F5', text: '#666', label: 'Started' },
}

function RecentEventRow({ event }) {
  const outcome = outcomeColors[event.outcome] || { bg: '#F5F5F5', text: t.gray, label: event.outcome }

  const relativeTime = (created_at) => {
    const diff = Date.now() - new Date(created_at).getTime()
    const mins = Math.floor(diff / 60000)
    const hrs = Math.floor(mins / 60)
    const days = Math.floor(hrs / 24)
    if (days > 0) return `${days}d ago`
    if (hrs > 0) return `${hrs}h ago`
    if (mins > 0) return `${mins}m ago`
    return 'just now'
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: `1px solid ${t.border}`,
    }}>
      <div>
        <div style={{ fontSize: '0.88rem', fontWeight: 500, color: t.text }}>
          {event.customer_id || 'Anonymous'}
        </div>
        <div style={{ fontSize: '0.78rem', color: t.grayLight }}>{event.reason || '—'}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{
          fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: '20px',
          background: outcome.bg, color: outcome.text,
        }}>
          {outcome.label}
        </span>
        <span style={{ fontSize: '0.75rem', color: t.grayLight }}>{relativeTime(event.created_at)}</span>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user, isLoaded } = useAuthUser()
  const [projects, setProjects] = useState([])
  const [activeProject, setActiveProject] = useState(null)
  const [events, setEvents] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [usingRealData, setUsingRealData] = useState(false)

  // Load projects — try real API first, fall back to localStore
  useEffect(() => {
    async function loadProjects() {
      setLoading(true)
      try {
        const data = await apiFetch('/api/projects')
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects)
          setActiveProject(data.projects[0])
          setUsingRealData(true)
        } else {
          // No real projects — fall back to localStore
          const stored = getProjects()
          setProjects(stored)
          if (stored.length > 0) setActiveProject(stored[0])
          setUsingRealData(false)
        }
      } catch {
        // API unavailable — fall back to localStore
        const stored = getProjects()
        setProjects(stored)
        if (stored.length > 0) setActiveProject(stored[0])
        setUsingRealData(false)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  // Load events + analytics when project changes
  useEffect(() => {
    if (!activeProject) return

    async function loadAnalytics() {
      setAnalyticsLoading(true)
      if (usingRealData) {
        try {
          const [analyticsData, eventsData] = await Promise.all([
            apiFetch(`/api/analytics?projectId=${activeProject.id}&days=30`),
            apiFetch(`/api/events?projectId=${activeProject.id}&limit=10`),
          ])
          setAnalytics(analyticsData)
          setEvents(eventsData.events || [])
        } catch {
          // Fall back to localStore on error
          const ev = getEvents(activeProject.id, 10)
          const an = getAnalytics(activeProject.id, 30)
          setEvents(ev)
          setAnalytics(an)
        }
      } else {
        const ev = getEvents(activeProject.id, 10)
        const an = getAnalytics(activeProject.id, 30)
        setEvents(ev)
        setAnalytics(an)
      }
      setAnalyticsLoading(false)
    }

    loadAnalytics()
  }, [activeProject, usingRealData])

  async function handleCreateProject() {
    setCreating(true)
    try {
      if (usingRealData) {
        const project = await apiFetch('/api/projects', {
          method: 'POST',
          body: { name: 'My Project' },
        })
        setProjects([project])
        setActiveProject(project)
      } else {
        const project = createProject('My Project')
        setProjects([project])
        setActiveProject(project)
      }
    } catch {
      // Fall back to localStore on API error
      const project = createProject('My Project')
      setProjects([project])
      setActiveProject(project)
    } finally {
      setCreating(false)
    }
  }

  const formatCurrency = (cents) => {
    if (!cents) return '$0'
    return '$' + (cents / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })
  }

  return (
    <>
      <Head>
        <title>Dashboard — ChurnRecovery</title>
      </Head>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <AppLayout title="Dashboard">
        <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 32px', lineHeight: 1.7 }}>
          {isLoaded && user ? `Welcome back, ${user.firstName || user.emailAddresses?.[0]?.emailAddress || 'there'}` : 'Loading..'}. Here&apos;s your churn recovery overview.
        </p>

        {loading ? (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '24px' }}>
                  <Skeleton height='0.78rem' width='60%' style={{ marginBottom: '12px' }} />
                  <Skeleton height='2rem' width='45%' />
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', padding: '60px', color: t.grayLight, fontFamily: t.fontSans }}>
              Loading your dashboard...
            </div>
          </div>
        ) : !activeProject ? (
          <EmptyState onCreateProject={handleCreateProject} creating={creating} />
        ) : (
          <>
            {/* Data source + project selector bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              {usingRealData && (
                <span style={{
                  fontSize: '0.7rem', fontWeight: 600, padding: '3px 8px',
                  borderRadius: '10px', background: '#EDF7F1', color: '#2D7A4F',
                }}>● Live</span>
              )}
              <span style={{ fontSize: '0.78rem', color: t.grayLight, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project:</span>
              <select
                value={activeProject?.id}
                onChange={e => {
                  const p = projects.find(p => p.id === e.target.value)
                  setActiveProject(p)
                }}
                style={{
                  padding: '6px 12px', borderRadius: '6px', border: `1px solid ${t.border}`,
                  fontFamily: t.fontSans, fontSize: '0.85rem', background: t.white, color: t.text,
                }}
              >
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <button
                onClick={async () => {
                  const name = prompt('Project name:')
                  if (!name) return
                  setCreating(true)
                  try {
                    if (usingRealData) {
                      const project = await apiFetch('/api/projects', {
                        method: 'POST',
                        body: { name },
                      })
                      setProjects([...projects, project])
                    } else {
                      const project = createProject(name)
                      setProjects([...projects, project])
                    }
                  } catch {
                    const project = createProject(name)
                    setProjects([...projects, project])
                  } finally {
                    setCreating(false)
                  }
                }}
                style={{
                  padding: '6px 12px', borderRadius: '6px', border: `1px solid ${t.border}`,
                  background: t.white, color: t.text, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500,
                }}
              >
                + New Project
              </button>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
              <StatCard
                label="Save Rate"
                value={analytics ? `${analytics.saveRate}%` : '—'}
                color={t.green}
                loading={analyticsLoading}
              />
              <StatCard
                label="Revenue Saved"
                value={analytics ? formatCurrency(analytics.revenueSavedCents) : '—'}
                color={t.accent}
                loading={analyticsLoading}
              />
              <StatCard
                label="Cancel Events"
                value={analytics ? analytics.totalEvents.toLocaleString() : '—'}
                loading={analyticsLoading}
              />
              <StatCard
                label="Saves (30d)"
                value={analytics ? analytics.savedEvents.toLocaleString() : '—'}
                color={t.green}
                loading={analyticsLoading}
              />
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
                {analyticsLoading ? (
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${t.border}` }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <Skeleton width='140px' height='0.88rem' />
                          <Skeleton width='100px' height='0.75rem' />
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <Skeleton width='60px' height='1.2rem' style={{ borderRadius: '20px' }} />
                          <Skeleton width='50px' height='0.75rem' />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : events.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: t.grayLight, fontSize: '0.85rem', fontFamily: t.fontSerif }}>
                    No events yet. Install the widget to start tracking.{' '}
                    <Link href="/app/install" style={{ color: t.accent }}>Get the code →</Link>
                  </div>
                ) : (
                  events.map((event, i) => <RecentEventRow key={event.id || i} event={event} />)
                )}
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
                      }}
                    >
                      <span>{action.icon}</span>
                      {action.label}
                    </Link>
                  ))}
                </div>

                {/* API Key */}
                {activeProject && (
                  <div style={{ marginTop: '20px', padding: '16px', background: t.bg, borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: t.grayLight, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                      API Key
                    </div>
                    <code style={{
                      fontSize: '0.7rem', color: t.text, wordBreak: 'break-all',
                      fontFamily: 'monospace', lineHeight: 1.5,
                    }}>
                      {activeProject.api_key}
                    </code>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </AppLayout>
    </>
  )
}

DashboardPage.isAppPage = true
