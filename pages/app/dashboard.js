import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import AppLayout from '../../components/AppLayout'
import { useAuthUser } from '../../lib/useAuthUser'

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
        <div style={{ height: '2rem', background: t.border, borderRadius: '4px', width: '60%', marginBottom: '4px' }} />
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
        <button
          onClick={onCreateProject}
          disabled={creating}
          style={{
            background: t.accent, color: t.white, padding: '10px 24px',
            borderRadius: '8px', border: 'none', cursor: creating ? 'not-allowed' : 'pointer',
            fontWeight: 600, fontSize: '0.9rem', opacity: creating ? 0.7 : 1,
          }}
        >
          {creating ? 'Creating...' : 'Create First Project'}
        </button>
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
    flow_started: { bg: '#F5F3FF', text: '#7C3AED', label: 'Started' },
  }
  const outcome = outcomeColors[event.outcome] || { bg: '#F5F5F5', text: t.gray, label: event.outcome }

  // Format relative time
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
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState(null)

  // Load projects
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/projects')
        if (!res.ok) throw new Error('Failed to load projects')
        const data = await res.json()
        setProjects(data.projects || [])
        if (data.projects && data.projects.length > 0) {
          setActiveProject(data.projects[0])
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Load events + analytics when project is selected
  useEffect(() => {
    if (!activeProject) return

    async function loadProjectData() {
      try {
        const [eventsRes, analyticsRes] = await Promise.all([
          fetch(`/api/events?projectId=${activeProject.id}&limit=10`),
          fetch(`/api/analytics?projectId=${activeProject.id}&days=30`),
        ])
        const eventsData = await eventsRes.json()
        const analyticsData = await analyticsRes.json()
        setEvents(eventsData.events || [])
        setAnalytics(analyticsData)
      } catch (err) {
        console.error('Failed to load project data:', err)
      }
    }

    loadProjectData()
  }, [activeProject])

  async function handleCreateProject() {
    setCreating(true)
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'My Project' }),
      })
      const project = await res.json()
      setProjects([project])
      setActiveProject(project)
    } catch (err) {
      setError(err.message)
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
      <AppLayout title="Dashboard">
        <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 32px', lineHeight: 1.7 }}>
          {isLoaded && user ? `Welcome back, ${user.firstName || user.emailAddresses?.[0]?.emailAddress || 'there'}` : 'Loading..'}. Here&apos;s your churn recovery overview.
        </p>

        {error && (
          <div style={{ background: t.redLight, border: `1px solid ${t.red}`, borderRadius: '8px', padding: '12px 16px', marginBottom: '24px', color: t.red, fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: t.grayLight, fontFamily: t.fontSans }}>
            Loading your dashboard...
          </div>
        ) : !activeProject ? (
          <EmptyState onCreateProject={handleCreateProject} creating={creating} />
        ) : (
          <>
            {/* Project selector bar */}
            {projects.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span style={{ fontSize: '0.78rem', color: t.grayLight, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project:</span>
                <select
                  value={activeProject?.id}
                  onChange={e => setActiveProject(projects.find(p => p.id === e.target.value))}
                  style={{
                    padding: '6px 12px', borderRadius: '6px', border: `1px solid ${t.border}`,
                    fontFamily: t.fontSans, fontSize: '0.85rem', background: t.white, color: t.text,
                  }}
                >
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <button
                  onClick={handleCreateProject}
                  disabled={creating}
                  style={{
                    padding: '6px 12px', borderRadius: '6px', border: `1px solid ${t.border}`,
                    background: t.white, color: t.text, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500,
                  }}
                >
                  + New Project
                </button>
              </div>
            )}

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
              <StatCard
                label="Save Rate"
                value={analytics ? `${analytics.saveRate}%` : '—'}
                color={t.green}
              />
              <StatCard
                label="Revenue Saved"
                value={analytics ? formatCurrency(analytics.revenueSavedCents) : '—'}
                color={t.accent}
              />
              <StatCard
                label="Cancel Events"
                value={analytics ? analytics.totalEvents.toLocaleString() : '—'}
              />
              <StatCard
                label="Saves (30d)"
                value={analytics ? analytics.savedEvents.toLocaleString() : '—'}
                color={t.green}
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
                {events.length === 0 ? (
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
