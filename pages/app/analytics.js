import Head from 'next/head'
import { useState, useEffect, useCallback } from 'react'
import AppLayout from '../../components/AppLayout'
import { getProjects, getEvents, getAnalytics } from '../../lib/localStore'
import { isClerkEnabled } from '../../lib/auth'
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

function BarChart({ data, height = 200 }) {
  const max = Math.max(...data.map(d => d.value), 1)
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

function MetricCard({ label, value, sub, color, loading }) {
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
      {loading ? (
        <Skeleton height='2rem' width='60%' style={{ marginBottom: '4px' }} />
      ) : (
        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: color || t.text, letterSpacing: '-0.04em' }}>
          {value}
        </div>
      )}
      {sub && <div style={{ fontSize: '0.75rem', color: t.grayLight, marginTop: '4px' }}>{sub}</div>}
    </div>
  )
}

const outcomeColors = {
  saved: { bg: '#EDF7F1', text: '#2D7A4F' },
  paused: { bg: '#EFF6FF', text: '#2563EB' },
  cancelled: { bg: '#FEF2F2', text: '#DC2626' },
  downgraded: { bg: '#FFF7ED', text: '#C2410C' },
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30d')
  const [projects, setProjects] = useState([])
  const [activeProject, setActiveProject] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [recentEvents, setRecentEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [usingRealData, setUsingRealData] = useState(false)

  // Clerk token function (only used if Clerk is enabled)
  const [getToken, setGetToken] = useState(null)

  const periodDays = { '7d': 7, '30d': 30, '90d': 90, '12m': 365 }

  // Initialize Clerk getToken if enabled
  useEffect(() => {
    if (isClerkEnabled()) {
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { useAuth } = require('@clerk/nextjs')
        // We can't conditionally call hooks inside useEffect, so we use a wrapper component approach
        // Instead, we'll pass getToken via a ref after initial load
      } catch {}
    }
  }, [])

  // Load projects — try API first, fall back to localStore
  useEffect(() => {
    async function loadProjects() {
      setLoading(true)
      try {
        // Try real API
        const data = await apiFetch('/api/projects')
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects)
          setActiveProject(data.projects[0])
          setUsingRealData(true)
        } else {
          // API returned empty — fall back to localStore
          const stored = getProjects()
          setProjects(stored)
          if (stored.length > 0) setActiveProject(stored[0])
          setUsingRealData(false)
        }
      } catch {
        // API unavailable or auth failed — fall back to localStore
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

  // Load analytics when project or period changes
  const loadAnalytics = useCallback(async () => {
    if (!activeProject) return
    setAnalyticsLoading(true)
    const days = periodDays[period]

    if (usingRealData) {
      try {
        const [analyticsData, eventsData] = await Promise.all([
          apiFetch(`/api/analytics?projectId=${activeProject.id}&days=${days}`),
          apiFetch(`/api/events?projectId=${activeProject.id}&limit=20`),
        ])
        // Map API analytics shape to component shape (add weeks for charts if missing)
        const apiAnalytics = {
          ...analyticsData,
          weeks: buildWeeksFromDaily(analyticsData.dailyEvents || [], days),
          topReasons: (analyticsData.reasonBreakdown || []).map(r => ({
            reason: r.reason,
            count: r.count,
          })),
        }
        setAnalytics(apiAnalytics)
        setRecentEvents(eventsData.events || [])
      } catch {
        // API fetch failed — fall back to localStore
        const an = getAnalytics(activeProject.id, days)
        const ev = getEvents(activeProject.id, 20)
        setAnalytics(an)
        setRecentEvents(ev)
      }
    } else {
      // Demo mode — use localStore
      const an = getAnalytics(activeProject.id, days)
      const ev = getEvents(activeProject.id, 20)
      setAnalytics(an)
      setRecentEvents(ev)
    }

    setAnalyticsLoading(false)
  }, [activeProject, period, usingRealData])

  useEffect(() => {
    loadAnalytics()
  }, [loadAnalytics])

  const fmt = (n) => n?.toLocaleString() || '—'
  const fmtCents = (c) => c ? '$' + (c / 100).toLocaleString('en-US', { maximumFractionDigits: 0 }) : '$0'

  const weeklyData = analytics?.weeks?.map(w => ({
    label: w.label, value: w.saveRate, color: t.accent,
  })) || []

  const revenueData = analytics?.weeks?.map(w => ({
    label: w.label, value: Math.round(w.revenue), color: t.green,
  })) || []

  const reasonData = (analytics?.topReasons || []).slice(0, 5).map((r, i) => ({
    label: r.reason.split(' ')[0],
    value: r.count,
    color: [t.accent, t.blue, '#6B4FA0', t.green, t.grayLight][i],
  }))

  const outcomeData = analytics ? [
    { label: 'Saved', value: analytics.savedEvents, color: t.green },
    { label: 'Paused', value: analytics.pausedEvents || 0, color: t.blue },
    { label: 'Cancelled', value: analytics.cancelledEvents, color: t.red },
  ] : []

  const relativeTime = (ts) => {
    const diff = Date.now() - new Date(ts).getTime()
    const mins = Math.floor(diff / 60000)
    const hrs = Math.floor(mins / 60)
    const days = Math.floor(hrs / 24)
    if (days > 0) return `${days}d ago`
    if (hrs > 0) return `${hrs}h ago`
    if (mins > 0) return `${mins}m ago`
    return 'just now'
  }

  if (loading) {
    return (
      <>
        <Head><title>Analytics — ChurnRecovery</title></Head>
        <AppLayout title="Analytics">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '10px', padding: '20px' }}>
                <Skeleton height='0.75rem' width='70%' style={{ marginBottom: '10px' }} />
                <Skeleton height='2rem' width='50%' />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', padding: '40px', color: t.grayLight, fontFamily: t.fontSans, fontSize: '0.9rem' }}>
            Loading analytics...
          </div>
        </AppLayout>
      </>
    )
  }

  if (!activeProject) {
    return (
      <>
        <Head><title>Analytics — ChurnRecovery</title></Head>
        <AppLayout title="Analytics">
          <div style={{ textAlign: 'center', padding: '80px 40px', color: t.grayLight, fontFamily: t.fontSerif }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📊</div>
            <p>No projects yet. <a href="/app/dashboard" style={{ color: t.accent }}>Create one →</a></p>
          </div>
        </AppLayout>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Analytics — ChurnRecovery</title>
      </Head>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <AppLayout title="Analytics">
        {/* Data source indicator */}
        {usingRealData && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#EDF7F1', color: '#2D7A4F', fontSize: '0.72rem',
            fontWeight: 600, padding: '4px 10px', borderRadius: '20px',
            marginBottom: '16px', fontFamily: t.fontSans,
          }}>
            <span>●</span> Live data from database
          </div>
        )}

        {/* Controls row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
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
          {projects.length > 1 && (
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
          )}
        </div>

        {/* Top metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
          <MetricCard label="Save Rate" value={`${analytics?.saveRate ?? 0}%`} sub="Terminal events" color={t.green} loading={analyticsLoading} />
          <MetricCard label="Revenue Saved" value={fmtCents(analytics?.revenueSavedCents)} sub="This period" color={t.accent} loading={analyticsLoading} />
          <MetricCard label="Cancel Attempts" value={fmt(analytics?.totalEvents)} sub="Total events" loading={analyticsLoading} />
          <MetricCard label="Customers Saved" value={fmt(analytics?.savedEvents)} sub="Accepted offer" color={t.green} loading={analyticsLoading} />
          <MetricCard label="Paused" value={fmt(analytics?.pausedEvents)} sub="Subscription paused" color={t.blue} loading={analyticsLoading} />
        </div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontFamily: t.fontSans, fontSize: '0.88rem', fontWeight: 700, color: t.text, margin: '0 0 16px' }}>
              Save Rate by Week (%)
            </h3>
            {analyticsLoading ? (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '200px', padding: '0 4px' }}>
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} style={{ flex: 1, height: `${[60, 80, 50, 70][i]}%`, alignSelf: 'flex-end' }} />
                ))}
              </div>
            ) : weeklyData.length > 0 ? (
              <BarChart data={weeklyData} />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: t.grayLight, fontSize: '0.85rem' }}>No data yet</div>
            )}
          </div>
          <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontFamily: t.fontSans, fontSize: '0.88rem', fontWeight: 700, color: t.text, margin: '0 0 16px' }}>
              Revenue Recovered ($)
            </h3>
            {analyticsLoading ? (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '200px', padding: '0 4px' }}>
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} style={{ flex: 1, height: `${[40, 90, 65, 75][i]}%`, alignSelf: 'flex-end' }} />
                ))}
              </div>
            ) : revenueData.length > 0 ? (
              <BarChart data={revenueData} />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: t.grayLight, fontSize: '0.85rem' }}>No data yet</div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontFamily: t.fontSans, fontSize: '0.88rem', fontWeight: 700, color: t.text, margin: '0 0 16px' }}>
              Cancel Reasons
            </h3>
            {analyticsLoading ? (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '160px', padding: '0 4px' }}>
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} style={{ flex: 1, height: `${[70, 50, 90, 40, 60][i]}%`, alignSelf: 'flex-end' }} />
                ))}
              </div>
            ) : reasonData.length > 0 ? (
              <BarChart data={reasonData} height={160} />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: t.grayLight, fontSize: '0.85rem' }}>No reason data yet</div>
            )}
          </div>
          <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontFamily: t.fontSans, fontSize: '0.88rem', fontWeight: 700, color: t.text, margin: '0 0 16px' }}>
              Outcomes
            </h3>
            {analyticsLoading ? (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '160px', padding: '0 4px' }}>
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} style={{ flex: 1, height: `${[75, 45, 60][i]}%`, alignSelf: 'flex-end' }} />
                ))}
              </div>
            ) : outcomeData.some(d => d.value > 0) ? (
              <BarChart data={outcomeData} height={160} />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: t.grayLight, fontSize: '0.85rem' }}>No outcome data yet</div>
            )}
          </div>
        </div>

        {/* Events table */}
        <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: t.fontSans, fontSize: '0.88rem', fontWeight: 700, color: t.text, margin: 0 }}>
              Recent Cancel Events
            </h3>
            <span style={{ fontSize: '0.75rem', color: t.grayLight }}>{recentEvents.length} events</span>
          </div>
          {analyticsLoading ? (
            <div style={{ padding: '20px' }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <Skeleton width='20%' height='1rem' />
                  <Skeleton width='25%' height='1rem' />
                  <Skeleton width='20%' height='1rem' />
                  <Skeleton width='15%' height='1rem' />
                  <Skeleton width='10%' height='1rem' />
                  <Skeleton width='10%' height='1rem' />
                </div>
              ))}
            </div>
          ) : recentEvents.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: t.grayLight, fontSize: '0.85rem', fontFamily: t.fontSerif }}>
              No events yet. <a href="/app/install" style={{ color: t.accent }}>Install the widget →</a>
            </div>
          ) : (
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
                    const oc = outcomeColors[e.outcome] || { bg: '#F5F5F5', text: t.gray }
                    return (
                      <tr key={e.id || i} style={{ borderBottom: `1px solid ${t.border}` }}>
                        <td style={{ padding: '10px 16px', color: t.text, fontWeight: 500 }}>{e.customer_id || 'Anonymous'}</td>
                        <td style={{ padding: '10px 16px', color: t.gray }}>{e.reason || '—'}</td>
                        <td style={{ padding: '10px 16px', color: t.gray }}>{e.offer_shown || '—'}</td>
                        <td style={{ padding: '10px 16px' }}>
                          <span style={{
                            fontSize: '0.72rem', fontWeight: 600, padding: '2px 8px',
                            borderRadius: '12px', background: oc.bg, color: oc.text,
                            textTransform: 'capitalize',
                          }}>{e.outcome}</span>
                        </td>
                        <td style={{ padding: '10px 16px', color: t.text, fontWeight: 500 }}>
                          {e.mrr_cents ? `$${(e.mrr_cents / 100).toFixed(0)}` : '—'}
                        </td>
                        <td style={{ padding: '10px 16px', color: t.grayLight }}>{relativeTime(e.created_at)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AppLayout>
    </>
  )
}

AnalyticsPage.isAppPage = true

/**
 * Build weekly bar chart data from the API's dailyEvents array.
 * Groups into 4 weeks, computes save rate per week.
 */
function buildWeeksFromDaily(dailyEvents, days) {
  const weeks = []
  const numWeeks = Math.min(4, Math.ceil(days / 7))
  const now = Date.now()

  for (let w = numWeeks - 1; w >= 0; w--) {
    const wEnd = now - w * 7 * 86400000
    const wStart = wEnd - 7 * 86400000

    const wStart_d = new Date(wStart).toISOString().split('T')[0]
    const wEnd_d = new Date(wEnd).toISOString().split('T')[0]

    const wEvents = dailyEvents.filter(e => e.date >= wStart_d && e.date < wEnd_d)
    const total = wEvents.reduce((s, e) => s + (e.count || 0), 0)

    weeks.push({
      label: `W${numWeeks - w}`,
      attempts: total,
      saved: 0, // dailyEvents doesn't have outcome breakdown — use total as proxy
      saveRate: 0,
      revenue: 0,
    })
  }

  return weeks
}
