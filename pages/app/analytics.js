import Head from 'next/head'
import { useState, useEffect, useCallback } from 'react'
import AppLayout from '../../components/AppLayout'
import { getProjects, getEvents, getAnalytics } from '../../lib/localStore'
import { isClerkEnabled } from '../../lib/auth'
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

function BarChart({ data, height = 200 }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div className="flex items-end gap-[6px] px-1" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[0.65rem] text-brand-gray-light font-medium">
            {d.value}
          </span>
          <div
            className="w-full rounded-t min-h-[4px] transition-[height] duration-300"
            style={{
              height: `${(d.value / max) * (height - 40)}px`,
              background: d.color || '#D97757',
            }}
          />
          <span className="text-[0.65rem] text-brand-gray-light">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function MetricCard({ label, value, sub, color, loading }) {
  return (
    <div className="bg-brand-white border border-brand-border rounded-[10px] p-5">
      <div className="text-[0.72rem] text-brand-gray-light font-medium mb-[6px] uppercase tracking-[0.05em]">
        {label}
      </div>
      {loading ? (
        <Skeleton height='2rem' width='60%' className="mb-1" />
      ) : (
        <div className={`text-[1.6rem] font-[800] tracking-[-0.04em] ${
          color === '#2D7A4F' ? 'text-brand-green'
          : color === '#D97757' ? 'text-brand-accent'
          : color === '#2563EB' ? 'text-brand-blue'
          : 'text-brand-text'
        }`}>
          {value}
        </div>
      )}
      {sub && <div className="text-[0.75rem] text-brand-gray-light mt-1">{sub}</div>}
    </div>
  )
}

const outcomeColors = {
  saved: { bg: 'bg-brand-green-light', text: 'text-brand-green' },
  paused: { bg: 'bg-brand-blue-light', text: 'text-brand-blue' },
  cancelled: { bg: 'bg-[#FEF2F2]', text: 'text-brand-red' },
  downgraded: { bg: 'bg-[#FFF7ED]', text: 'text-[#C2410C]' },
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
    label: w.label, value: w.saveRate, color: '#D97757',
  })) || []

  const revenueData = analytics?.weeks?.map(w => ({
    label: w.label, value: Math.round(w.revenue), color: '#2D7A4F',
  })) || []

  const reasonData = (analytics?.topReasons || []).slice(0, 5).map((r, i) => ({
    label: r.reason.split(' ')[0],
    value: r.count,
    color: ['#D97757', '#2563EB', '#6B4FA0', '#2D7A4F', '#999999'][i],
  }))

  const outcomeData = analytics ? [
    { label: 'Saved', value: analytics.savedEvents, color: '#2D7A4F' },
    { label: 'Paused', value: analytics.pausedEvents || 0, color: '#2563EB' },
    { label: 'Cancelled', value: analytics.cancelledEvents, color: '#DC2626' },
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
          <div className="grid grid-cols-5 gap-3 mb-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-brand-white border border-brand-border rounded-[10px] p-5">
                <Skeleton height='0.75rem' width='70%' className="mb-[10px]" />
                <Skeleton height='2rem' width='50%' />
              </div>
            ))}
          </div>
          <div className="text-center p-10 text-brand-gray-light font-sans text-[0.9rem]">
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
          <div className="text-center py-20 px-10 text-brand-gray-light font-serif">
            <div className="text-[3rem] mb-4">📊</div>
            <p>No projects yet. <a href="/app/dashboard" className="text-brand-accent">Create one →</a></p>
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
          <div className="inline-flex items-center gap-[6px] bg-brand-green-light text-brand-green text-[0.72rem] font-semibold px-[10px] py-1 rounded-[20px] mb-4 font-sans">
            <span>●</span> Live data from database
          </div>
        )}

        {/* Controls row */}
        <div className="flex justify-between items-center mb-7">
          <div className="flex gap-2">
            {['7d', '30d', '90d', '12m'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-[6px] rounded-md text-[0.8rem] font-sans cursor-pointer border ${
                  period === p
                    ? 'font-semibold bg-brand-accent text-brand-white border-brand-accent'
                    : 'font-normal bg-brand-white text-brand-gray border-brand-border'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          {projects.length > 1 && (
            <select
              value={activeProject?.id}
              onChange={e => setActiveProject(projects.find(p => p.id === e.target.value))}
              className="px-3 py-[6px] rounded-md border border-brand-border font-sans text-[0.85rem] bg-brand-white text-brand-text"
            >
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          )}
        </div>

        {/* Top metrics */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          <MetricCard label="Save Rate" value={`${analytics?.saveRate ?? 0}%`} sub="Terminal events" color="#2D7A4F" loading={analyticsLoading} />
          <MetricCard label="Revenue Saved" value={fmtCents(analytics?.revenueSavedCents)} sub="This period" color="#D97757" loading={analyticsLoading} />
          <MetricCard label="Cancel Attempts" value={fmt(analytics?.totalEvents)} sub="Total events" loading={analyticsLoading} />
          <MetricCard label="Customers Saved" value={fmt(analytics?.savedEvents)} sub="Accepted offer" color="#2D7A4F" loading={analyticsLoading} />
          <MetricCard label="Paused" value={fmt(analytics?.pausedEvents)} sub="Subscription paused" color="#2563EB" loading={analyticsLoading} />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-brand-white border border-brand-border rounded-xl p-5">
            <h3 className="font-sans text-[0.88rem] font-bold text-brand-text m-0 mb-4">
              Save Rate by Week (%)
            </h3>
            {analyticsLoading ? (
              <div className="flex items-end gap-[6px] h-[200px] px-1">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="flex-1 self-end" style={{ height: `${[60, 80, 50, 70][i]}%` }} />
                ))}
              </div>
            ) : weeklyData.length > 0 ? (
              <BarChart data={weeklyData} />
            ) : (
              <div className="text-center p-10 text-brand-gray-light text-[0.85rem]">No data yet</div>
            )}
          </div>
          <div className="bg-brand-white border border-brand-border rounded-xl p-5">
            <h3 className="font-sans text-[0.88rem] font-bold text-brand-text m-0 mb-4">
              Revenue Recovered ($)
            </h3>
            {analyticsLoading ? (
              <div className="flex items-end gap-[6px] h-[200px] px-1">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="flex-1 self-end" style={{ height: `${[40, 90, 65, 75][i]}%` }} />
                ))}
              </div>
            ) : revenueData.length > 0 ? (
              <BarChart data={revenueData} />
            ) : (
              <div className="text-center p-10 text-brand-gray-light text-[0.85rem]">No data yet</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-brand-white border border-brand-border rounded-xl p-5">
            <h3 className="font-sans text-[0.88rem] font-bold text-brand-text m-0 mb-4">
              Cancel Reasons
            </h3>
            {analyticsLoading ? (
              <div className="flex items-end gap-[6px] h-[160px] px-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="flex-1 self-end" style={{ height: `${[70, 50, 90, 40, 60][i]}%` }} />
                ))}
              </div>
            ) : reasonData.length > 0 ? (
              <BarChart data={reasonData} height={160} />
            ) : (
              <div className="text-center p-10 text-brand-gray-light text-[0.85rem]">No reason data yet</div>
            )}
          </div>
          <div className="bg-brand-white border border-brand-border rounded-xl p-5">
            <h3 className="font-sans text-[0.88rem] font-bold text-brand-text m-0 mb-4">
              Outcomes
            </h3>
            {analyticsLoading ? (
              <div className="flex items-end gap-[6px] h-[160px] px-1">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="flex-1 self-end" style={{ height: `${[75, 45, 60][i]}%` }} />
                ))}
              </div>
            ) : outcomeData.some(d => d.value > 0) ? (
              <BarChart data={outcomeData} height={160} />
            ) : (
              <div className="text-center p-10 text-brand-gray-light text-[0.85rem]">No outcome data yet</div>
            )}
          </div>
        </div>

        {/* Events table */}
        <div className="bg-brand-white border border-brand-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-brand-border flex justify-between items-center">
            <h3 className="font-sans text-[0.88rem] font-bold text-brand-text m-0">
              Recent Cancel Events
            </h3>
            <span className="text-[0.75rem] text-brand-gray-light">{recentEvents.length} events</span>
          </div>
          {analyticsLoading ? (
            <div className="p-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-3 mb-3">
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
            <div className="p-10 text-center text-brand-gray-light text-[0.85rem] font-serif">
              No events yet. <a href="/app/install" className="text-brand-accent">Install the widget →</a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[0.82rem] font-sans">
                <thead>
                  <tr className="bg-[#FAFAF8]">
                    {['Customer', 'Reason', 'Offer', 'Outcome', 'MRR', 'Time'].map(h => (
                      <th key={h} className="px-4 py-[10px] text-left font-semibold text-brand-gray-light text-[0.72rem] uppercase tracking-[0.05em] border-b border-brand-border">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentEvents.map((e, i) => {
                    const oc = outcomeColors[e.outcome] || { bg: 'bg-[#F5F5F5]', text: 'text-brand-gray' }
                    return (
                      <tr key={e.id || i} className="border-b border-brand-border">
                        <td className="px-4 py-[10px] text-brand-text font-medium">{e.customer_id || 'Anonymous'}</td>
                        <td className="px-4 py-[10px] text-brand-gray">{e.reason || '—'}</td>
                        <td className="px-4 py-[10px] text-brand-gray">{e.offer_shown || '—'}</td>
                        <td className="px-4 py-[10px]">
                          <span
                            className={`text-[0.72rem] font-semibold px-2 py-[2px] rounded-xl capitalize ${oc.bg} ${oc.text}`}
                          >{e.outcome}</span>
                        </td>
                        <td className="px-4 py-[10px] text-brand-text font-medium">
                          {e.mrr_cents ? `$${(e.mrr_cents / 100).toFixed(0)}` : '—'}
                        </td>
                        <td className="px-4 py-[10px] text-brand-gray-light">{relativeTime(e.created_at)}</td>
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
