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

function Skeleton({ width = '100%', height = '1rem', className = '', style = {} }) {
  return (
    <div
      className={`rounded ${className}`}
      style={{
        background: 'linear-gradient(90deg, #E5E5E5 25%, #EBEBEB 50%, #E5E5E5 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        width,
        height,
        ...style,
      }}
    />
  )
}

function StatCard({ label, value, change, changeLabel, color, loading }) {
  const isPositive = change >= 0
  const colorClass = color === '#2D7A4F' ? 'text-brand-green'
    : color === '#D97757' ? 'text-brand-accent'
    : 'text-brand-text'
  return (
    <div className="bg-brand-white border border-brand-border rounded-xl p-6">
      <div className="text-[0.78rem] text-brand-gray-light font-medium mb-2 uppercase tracking-[0.05em]">
        {label}
      </div>
      {loading ? (
        <Skeleton height='2rem' width='60%' className="mb-1" />
      ) : (
        <div className={`text-[2rem] font-[800] tracking-[-0.04em] mb-1 ${color ? colorClass : 'text-brand-text'}`}>
          {value}
        </div>
      )}
      {change !== undefined && !loading && (
        <div className={`text-[0.78rem] font-medium ${isPositive ? 'text-brand-green' : 'text-brand-red'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}% {changeLabel || 'vs last month'}
        </div>
      )}
    </div>
  )
}

function EmptyState({ onCreateProject, creating }) {
  return (
    <div className="bg-brand-white border-2 border-dashed border-brand-border rounded-xl py-[60px] px-[40px] text-center">
      <div className="text-[3rem] mb-4">🚀</div>
      <h2 className="font-sans text-[1.3rem] font-bold text-brand-text m-0 mb-2">
        Welcome to ChurnRecovery
      </h2>
      <p className="font-serif text-[0.9rem] text-brand-gray leading-[1.7] m-0 mb-6 max-w-[420px] mx-auto">
        Set up your first cancel flow to start recovering churned customers. It takes less than 5 minutes.
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/app/onboarding" className="bg-brand-accent text-brand-white py-[10px] px-6 rounded-lg border-none cursor-pointer font-semibold text-[0.9rem] no-underline inline-flex items-center">
          Start Setup Wizard
        </Link>
        <button
          onClick={onCreateProject}
          disabled={creating}
          className={`bg-transparent text-brand-gray py-[10px] px-6 rounded-lg border border-brand-border font-medium text-[0.9rem] ${creating ? 'cursor-not-allowed opacity-70' : 'cursor-pointer opacity-100'}`}
        >
          {creating ? 'Creating...' : 'Quick Create'}
        </button>
        <Link href="/app/install" className="py-[10px] px-6 rounded-lg border border-brand-border no-underline text-brand-gray text-[0.9rem] font-medium">
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
  const outcome = outcomeColors[event.outcome] || { bg: '#F5F5F5', text: '#666', label: event.outcome }

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
    <div className="flex items-center justify-between py-3 border-b border-brand-border">
      <div>
        <div className="text-[0.88rem] font-medium text-brand-text">
          {event.customer_id || 'Anonymous'}
        </div>
        <div className="text-[0.78rem] text-brand-gray-light">{event.reason || '—'}</div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className="text-[0.72rem] font-semibold py-[3px] px-[10px] rounded-[20px]"
          style={{ background: outcome.bg, color: outcome.text }}
        >
          {outcome.label}
        </span>
        <span className="text-[0.75rem] text-brand-gray-light">{relativeTime(event.created_at)}</span>
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
        <p className="font-serif text-[0.9rem] text-brand-gray m-0 mb-8 leading-[1.7]">
          {isLoaded && user ? `Welcome back, ${user.firstName || user.emailAddresses?.[0]?.emailAddress || 'there'}` : 'Loading..'}. Here&apos;s your churn recovery overview.
        </p>

        {loading ? (
          <div>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-brand-white border border-brand-border rounded-xl p-6">
                  <Skeleton height='0.78rem' width='60%' className="mb-3" />
                  <Skeleton height='2rem' width='45%' />
                </div>
              ))}
            </div>
            <div className="text-center p-[60px] text-brand-gray-light font-sans">
              Loading your dashboard...
            </div>
          </div>
        ) : !activeProject ? (
          <EmptyState onCreateProject={handleCreateProject} creating={creating} />
        ) : (
          <>
            {/* Data source + project selector bar */}
            <div className="flex items-center gap-3 mb-6">
              {usingRealData && (
                <span className="text-[0.7rem] font-semibold py-[3px] px-2 rounded-[10px] bg-[#EDF7F1] text-[#2D7A4F]">● Live</span>
              )}
              <span className="text-[0.78rem] text-brand-gray-light font-medium uppercase tracking-[0.05em]">Project:</span>
              <select
                value={activeProject?.id}
                onChange={e => {
                  const p = projects.find(p => p.id === e.target.value)
                  setActiveProject(p)
                }}
                className="py-1.5 px-3 rounded-md border border-brand-border font-sans text-[0.85rem] bg-brand-white text-brand-text"
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
                className="py-1.5 px-3 rounded-md border border-brand-border bg-brand-white text-brand-text cursor-pointer text-[0.78rem] font-medium"
              >
                + New Project
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <StatCard
                label="Save Rate"
                value={analytics ? `${analytics.saveRate}%` : '—'}
                color="#2D7A4F"
                loading={analyticsLoading}
              />
              <StatCard
                label="Revenue Saved"
                value={analytics ? formatCurrency(analytics.revenueSavedCents) : '—'}
                color="#D97757"
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
                color="#2D7A4F"
                loading={analyticsLoading}
              />
            </div>

            {/* Two Column: Recent Events + Quick Actions */}
            <div className="grid grid-cols-[2fr_1fr] gap-6">
              {/* Recent Events */}
              <div className="bg-brand-white border border-brand-border rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-sans text-[1rem] font-bold text-brand-text m-0">
                    Recent Events
                  </h2>
                  <Link href="/app/analytics" className="text-[0.78rem] text-brand-accent no-underline font-medium">
                    View all →
                  </Link>
                </div>
                {analyticsLoading ? (
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex justify-between py-3 border-b border-brand-border">
                        <div className="flex flex-col gap-1.5">
                          <Skeleton width='140px' height='0.88rem' />
                          <Skeleton width='100px' height='0.75rem' />
                        </div>
                        <div className="flex gap-2 items-center">
                          <Skeleton width='60px' height='1.2rem' className="rounded-[20px]" />
                          <Skeleton width='50px' height='0.75rem' />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : events.length === 0 ? (
                  <div className="text-center py-8 text-brand-gray-light text-[0.85rem] font-serif">
                    No events yet. Install the widget to start tracking.{' '}
                    <Link href="/app/install" className="text-brand-accent">Get the code →</Link>
                  </div>
                ) : (
                  events.map((event, i) => <RecentEventRow key={event.id || i} event={event} />)
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-brand-white border border-brand-border rounded-xl p-6">
                <h2 className="font-sans text-[1rem] font-bold text-brand-text m-0 mb-4">
                  Quick Actions
                </h2>
                <div className="flex flex-col gap-2">
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
                      className="flex items-center gap-[10px] py-[10px] px-3 rounded-lg no-underline text-[0.85rem] text-brand-text border border-brand-border"
                    >
                      <span>{action.icon}</span>
                      {action.label}
                    </Link>
                  ))}
                </div>

                {/* API Key */}
                {activeProject && (
                  <div className="mt-5 p-4 bg-brand-bg rounded-lg">
                    <div className="text-[0.72rem] font-semibold text-brand-gray-light uppercase tracking-[0.05em] mb-1.5">
                      API Key
                    </div>
                    <code className="text-[0.7rem] text-brand-text break-all font-mono leading-[1.5]">
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
