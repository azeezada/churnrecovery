/**
 * localStore.js — Client-side data layer for ChurnRecovery dashboard.
 *
 * Uses localStorage to persist projects, cancel flows, and events.
 * This is the primary data layer when Clerk/API keys aren't set up —
 * it makes the dashboard fully functional as a client-side app.
 *
 * In production with a real backend, these would be replaced by API calls.
 */

const PREFIX = 'cr_'

function get(key) {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function set(key, value) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {}
}

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

function apiKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let key = 'cr_'
  for (let i = 0; i < 32; i++) key += chars[Math.floor(Math.random() * chars.length)]
  return key
}

// ─── Default cancel flow config ────────────────────────────────────────────

const DEFAULT_REASONS = [
  { id: 'too-expensive', label: 'Too expensive', icon: '💰', offerType: 'discount', offerValue: 30, offerDuration: 3 },
  { id: 'not-using', label: 'Not using it enough', icon: '😴', offerType: 'pause', offerValue: 2, offerDuration: null },
  { id: 'switching', label: 'Switching to competitor', icon: '👋', offerType: 'discount', offerValue: 50, offerDuration: 6 },
  { id: 'missing-feature', label: 'Missing a feature', icon: '🔧', offerType: 'human', offerValue: null, offerDuration: null },
  { id: 'too-complex', label: 'Too complex to use', icon: '🤯', offerType: 'human', offerValue: null, offerDuration: null },
  { id: 'other', label: 'Something else', icon: '💬', offerType: 'feedback', offerValue: null, offerDuration: null },
]

// ─── Demo events (realistic-looking seed data) ──────────────────────────────

function makeDemoEvents(projectId) {
  const reasons = ['Too expensive', 'Not using enough', 'Switching to competitor', 'Missing a feature', 'Too complex', 'Something else']
  const outcomes = ['saved', 'saved', 'saved', 'cancelled', 'cancelled', 'paused']
  const offers = ['30% discount for 3mo', '2-month pause', '50% discount for 6mo', 'Talk to support', null, 'Pause for 1mo']
  const customers = [
    'john@acme.io', 'sarah@growthco.com', 'mike@devtools.io', 'lisa@startup.co',
    'dave@techhq.com', 'amy@saaslab.io', 'tom@founders.co', 'nina@cloudapp.io',
    'alex@basecamp.co', 'jay@productlab.io', 'kim@earlystage.io', 'rob@b2bsaas.com',
  ]

  const now = Date.now()
  const events = []

  for (let i = 0; i < 12; i++) {
    const ri = Math.floor(Math.random() * reasons.length)
    const oi = Math.floor(Math.random() * outcomes.length)
    const mrr = [29, 49, 79, 99, 149, 199, 299][Math.floor(Math.random() * 7)]
    const hoursAgo = Math.floor(Math.random() * 72)

    events.push({
      id: uid(),
      project_id: projectId,
      customer_id: customers[i % customers.length],
      reason: reasons[ri],
      offer_shown: offers[ri],
      outcome: outcomes[oi],
      mrr_cents: mrr * 100,
      created_at: new Date(now - hoursAgo * 3600000).toISOString(),
    })
  }

  // Sort by most recent
  return events.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}

// ─── Projects ───────────────────────────────────────────────────────────────

export function getProjects() {
  return get('projects') || []
}

export function createProject(name = 'My Project') {
  const projects = getProjects()
  const project = {
    id: uid(),
    name,
    api_key: apiKey(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    // Seed with demo events
    _seeded: true,
  }
  projects.push(project)
  set('projects', projects)

  // Seed demo events for this project
  const existingEvents = get('events') || []
  const demoEvents = makeDemoEvents(project.id)
  set('events', [...existingEvents, ...demoEvents])

  // Seed default cancel flow
  set(`flow_${project.id}`, { reasons: DEFAULT_REASONS, active: true })

  return project
}

export function updateProject(id, patch) {
  const projects = getProjects()
  const idx = projects.findIndex(p => p.id === id)
  if (idx === -1) return null
  projects[idx] = { ...projects[idx], ...patch, updated_at: new Date().toISOString() }
  set('projects', projects)
  return projects[idx]
}

export function deleteProject(id) {
  const projects = getProjects().filter(p => p.id !== id)
  set('projects', projects)
  // Clean up related data
  localStorage.removeItem(PREFIX + `flow_${id}`)
}

// ─── Cancel Flows ────────────────────────────────────────────────────────────

export function getCancelFlow(projectId) {
  return get(`flow_${projectId}`) || { reasons: DEFAULT_REASONS, active: true }
}

export function saveCancelFlow(projectId, reasons) {
  const flow = {
    reasons,
    active: true,
    updatedAt: new Date().toISOString(),
  }
  set(`flow_${projectId}`, flow)
  return flow
}

// ─── Events ──────────────────────────────────────────────────────────────────

export function getEvents(projectId, limit = 20) {
  const all = get('events') || []
  return all
    .filter(e => e.project_id === projectId)
    .slice(0, limit)
}

export function recordEvent(event) {
  const all = get('events') || []
  const newEvent = {
    id: uid(),
    created_at: new Date().toISOString(),
    ...event,
  }
  all.unshift(newEvent)
  set('events', all.slice(0, 500)) // cap at 500 events
  return newEvent
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export function getAnalytics(projectId, days = 30) {
  const cutoff = new Date(Date.now() - days * 86400000)
  const all = get('events') || []
  const events = all.filter(e =>
    e.project_id === projectId && new Date(e.created_at) >= cutoff
  )

  const terminal = events.filter(e =>
    ['saved', 'cancelled', 'paused', 'downgraded'].includes(e.outcome)
  )
  const saved = events.filter(e => e.outcome === 'saved')
  const paused = events.filter(e => e.outcome === 'paused')
  const cancelled = events.filter(e => e.outcome === 'cancelled')

  const saveRate = terminal.length > 0 ? Math.round((saved.length / terminal.length) * 100) : 0
  const revenueSavedCents = saved.reduce((sum, e) => sum + (e.mrr_cents || 0), 0) +
    paused.reduce((sum, e) => sum + Math.round((e.mrr_cents || 0) * 0.5), 0)

  // Reason breakdown
  const reasonCounts = {}
  events.forEach(e => {
    if (e.reason) reasonCounts[e.reason] = (reasonCounts[e.reason] || 0) + 1
  })
  const topReasons = Object.entries(reasonCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([reason, count]) => ({ reason, count, pct: Math.round(count / events.length * 100) }))

  // Weekly breakdown (last 4 weeks)
  const weeks = []
  for (let w = 3; w >= 0; w--) {
    const wStart = new Date(Date.now() - (w + 1) * 7 * 86400000)
    const wEnd = new Date(Date.now() - w * 7 * 86400000)
    const wEvents = events.filter(e => {
      const d = new Date(e.created_at)
      return d >= wStart && d < wEnd
    })
    const wTerminal = wEvents.filter(e => ['saved', 'cancelled', 'paused'].includes(e.outcome))
    const wSaved = wEvents.filter(e => e.outcome === 'saved')
    weeks.push({
      label: `W${4 - w}`,
      attempts: wEvents.length,
      saved: wSaved.length,
      saveRate: wTerminal.length > 0 ? Math.round(wSaved.length / wTerminal.length * 100) : 0,
      revenue: wSaved.reduce((s, e) => s + (e.mrr_cents || 0) / 100, 0),
    })
  }

  return {
    totalEvents: events.length,
    terminalEvents: terminal.length,
    savedEvents: saved.length,
    pausedEvents: paused.length,
    cancelledEvents: cancelled.length,
    saveRate,
    revenueSavedCents,
    topReasons,
    weeks,
    period: days,
  }
}

// ─── Settings ────────────────────────────────────────────────────────────────

export function getSettings(projectId) {
  return get(`settings_${projectId}`) || {
    stripeConnected: false,
    webhookUrl: '',
    emailNotifications: true,
    slackWebhook: '',
  }
}

export function saveSettings(projectId, settings) {
  set(`settings_${projectId}`, settings)
  return settings
}
