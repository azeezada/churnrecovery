import { jsonResponse, handleCors, getUserId, rateLimit, rateLimitResponse, sanitizeString } from './_shared.js'

export async function onRequestOptions(context) {
  return handleCors(context.request, { allowAnyOrigin: true })
}

export async function onRequestPost(context) {
  const { request, env } = context

  // Rate limit: 30 events per minute per IP (widget traffic)
  const rl = rateLimit(request, { maxRequests: 30, windowMs: 60000 })
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

  try {
    const body = await request.json().catch(() => ({}))
    const apiKey = request.headers.get('X-API-Key') || body.apiKey
    const {
      projectId: bodyProjectId,
      sessionId,
      customerId,
      reason,
      offerShown,
      outcome,
      feedback,
      mrrCents,
    } = body

    let resolvedProjectId = bodyProjectId

    if (!resolvedProjectId && apiKey) {
      const project = await env.DB.prepare('SELECT id FROM projects WHERE api_key = ?').bind(apiKey).first()
      if (!project) return jsonResponse({ error: 'Invalid API key' }, 403, request, { allowAnyOrigin: true })
      resolvedProjectId = project.id
    }

    if (!resolvedProjectId) {
      return jsonResponse({ error: 'projectId or API key required' }, 400, request, { allowAnyOrigin: true })
    }

    // Validate outcome values
    const validOutcomes = ['flow_started', 'reason_selected', 'saved', 'cancelled', 'paused', 'downgraded', 'feedback_submitted']
    const sanitizedOutcome = validOutcomes.includes(outcome) ? outcome : null

    const result = await env.DB.prepare(`
      INSERT INTO cancel_events (project_id, session_id, customer_id, reason, offer_shown, outcome, feedback, mrr_cents)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      sanitizeString(resolvedProjectId, 50),
      sanitizeString(sessionId, 50) || null,
      sanitizeString(customerId, 255) || null,
      sanitizeString(reason, 100) || null,
      sanitizeString(offerShown, 50) || null,
      sanitizedOutcome,
      sanitizeString(feedback, 2000) || null,
      mrrCents ? parseInt(mrrCents) || null : null
    ).run()

    return jsonResponse({ id: result.meta?.last_row_id, recorded: true }, 201, request, { allowAnyOrigin: true })
  } catch (e) {
    console.error('[events] POST error:', e)
    return jsonResponse({ error: 'Failed to record event. Please try again.' }, 500, request, { allowAnyOrigin: true })
  }
}

export async function onRequestGet(context) {
  const { request, env } = context
  const userId = await getUserId(request, env)
  if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401, request)

  const url = new URL(request.url)
  const projectId = url.searchParams.get('projectId')
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50') || 50, 200)
  const offset = Math.max(parseInt(url.searchParams.get('offset') || '0') || 0, 0)

  if (!projectId) return jsonResponse({ error: 'projectId required' }, 400, request)

  const project = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId).first()
  if (!project || project.user_id !== userId) {
    return jsonResponse({ error: 'Forbidden' }, 403, request)
  }

  const { results } = await env.DB.prepare(`
    SELECT * FROM cancel_events WHERE project_id = ?
    ORDER BY created_at DESC LIMIT ? OFFSET ?
  `).bind(projectId, limit, offset).all()

  return jsonResponse({ events: results }, 200, request)
}
