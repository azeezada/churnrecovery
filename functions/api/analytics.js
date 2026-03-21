import { jsonResponse, handleCors, getUserId } from './_shared.js'

export async function onRequestOptions(context) {
  return handleCors(context.request)
}

export async function onRequestGet(context) {
  const { request, env } = context
  const userId = getUserId(request)
  if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401, request)

  const url = new URL(request.url)
  const projectId = url.searchParams.get('projectId')
  const days = Math.min(Math.max(parseInt(url.searchParams.get('days') || '30') || 30, 1), 365)

  if (!projectId) return jsonResponse({ error: 'projectId required' }, 400, request)

  const project = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId).first()
  if (!project || project.user_id !== userId) {
    return jsonResponse({ error: 'Forbidden' }, 403, request)
  }

  const daysStr = `-${days} days`

  // Total events
  const totalEvents = await env.DB.prepare(
    "SELECT COUNT(*) as count FROM cancel_events WHERE project_id = ? AND created_at >= datetime('now', ?)"
  ).bind(projectId, daysStr).first()

  // Outcome breakdown
  const { results: outcomeBreakdown } = await env.DB.prepare(
    "SELECT outcome, COUNT(*) as count FROM cancel_events WHERE project_id = ? AND created_at >= datetime('now', ?) GROUP BY outcome"
  ).bind(projectId, daysStr).all()

  // Reason breakdown
  const { results: reasonBreakdown } = await env.DB.prepare(
    "SELECT reason, COUNT(*) as count FROM cancel_events WHERE project_id = ? AND reason IS NOT NULL AND created_at >= datetime('now', ?) GROUP BY reason ORDER BY count DESC"
  ).bind(projectId, daysStr).all()

  const savedEvents = outcomeBreakdown.find(r => r.outcome === 'saved')?.count || 0
  const cancelledEvents = outcomeBreakdown.find(r => r.outcome === 'cancelled')?.count || 0
  const flowStarts = outcomeBreakdown.find(r => r.outcome === 'flow_started')?.count || 0
  const total = totalEvents?.count || 0
  const saveRate = flowStarts > 0 ? Math.round((savedEvents / flowStarts) * 100) : 0

  // Revenue saved
  const revenueSaved = await env.DB.prepare(
    "SELECT COALESCE(SUM(mrr_cents), 0) as total FROM cancel_events WHERE project_id = ? AND outcome = 'saved' AND mrr_cents IS NOT NULL AND created_at >= datetime('now', ?)"
  ).bind(projectId, daysStr).first()

  // Daily event counts
  const { results: dailyEvents } = await env.DB.prepare(
    "SELECT date(created_at) as date, COUNT(*) as count FROM cancel_events WHERE project_id = ? AND created_at >= datetime('now', ?) GROUP BY date(created_at) ORDER BY date"
  ).bind(projectId, daysStr).all()

  return jsonResponse({
    totalEvents: total,
    savedEvents,
    cancelledEvents,
    flowStarts,
    saveRate,
    revenueSavedCents: revenueSaved?.total || 0,
    outcomeBreakdown,
    reasonBreakdown,
    dailyEvents,
  }, 200, request)
}
