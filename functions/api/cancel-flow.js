import { jsonResponse, handleCors, getUserId, generateId, defaultFlow, rateLimit, rateLimitResponse, sanitizeString } from './_shared.js'

export async function onRequestOptions(context) {
  // GET is public (widget), POST is authenticated — allow any origin for OPTIONS
  return handleCors(context.request, { allowAnyOrigin: true })
}

export async function onRequestGet(context) {
  const { request, env } = context

  // Rate limit: 60 per minute (widget config fetches)
  const rl = rateLimit(request, { maxRequests: 60, windowMs: 60000 })
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

  const url = new URL(request.url)
  let projectId = url.searchParams.get('projectId')
  const apiKey = url.searchParams.get('apiKey')

  if (!projectId && apiKey) {
    const project = await env.DB.prepare('SELECT id FROM projects WHERE api_key = ?').bind(apiKey).first()
    if (!project) return jsonResponse({ error: 'Project not found' }, 404, request, { allowAnyOrigin: true })
    projectId = project.id
  }

  if (!projectId) {
    return jsonResponse({ error: 'projectId or apiKey required' }, 400, request, { allowAnyOrigin: true })
  }

  const flow = await env.DB.prepare(
    'SELECT * FROM cancel_flows WHERE project_id = ? AND active = 1 ORDER BY updated_at DESC LIMIT 1'
  ).bind(projectId).first()

  if (!flow) return jsonResponse(defaultFlow, 200, request, { allowAnyOrigin: true })

  try {
    return jsonResponse({ ...flow, config: JSON.parse(flow.config) }, 200, request, { allowAnyOrigin: true })
  } catch {
    return jsonResponse(defaultFlow, 200, request, { allowAnyOrigin: true })
  }
}

export async function onRequestPost(context) {
  const { request, env } = context
  const userId = getUserId(request)
  if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401, request)

  const body = await request.json().catch(() => ({}))
  const { projectId, reasons } = body

  if (!projectId) return jsonResponse({ error: 'projectId required' }, 400, request)

  // Verify project ownership
  const project = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId).first()
  if (!project || project.user_id !== userId) {
    return jsonResponse({ error: 'Project not found' }, 404, request)
  }

  // Validate and sanitize reasons
  let sanitizedReasons = defaultFlow.reasons
  if (Array.isArray(reasons) && reasons.length <= 20) {
    sanitizedReasons = reasons.map(r => ({
      id: sanitizeString(r.id, 50) || 'unknown',
      label: sanitizeString(r.label, 200) || 'Unknown',
      icon: sanitizeString(r.icon, 10) || '❓',
      offerType: ['discount', 'pause', 'human', 'feedback'].includes(r.offerType) ? r.offerType : 'feedback',
      offerValue: typeof r.offerValue === 'number' ? Math.min(Math.max(r.offerValue, 0), 100) : null,
      offerDuration: typeof r.offerDuration === 'number' ? Math.min(Math.max(r.offerDuration, 0), 24) : null,
    }))
  }

  const config = {
    reasons: sanitizedReasons,
    active: true,
    updatedAt: new Date().toISOString(),
  }
  const configStr = JSON.stringify(config)

  const existing = await env.DB.prepare('SELECT id FROM cancel_flows WHERE project_id = ?').bind(projectId).first()

  if (existing) {
    await env.DB.prepare(
      "UPDATE cancel_flows SET config = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(configStr, existing.id).run()
  } else {
    const id = generateId('cf')
    await env.DB.prepare(
      'INSERT INTO cancel_flows (id, project_id, config) VALUES (?, ?, ?)'
    ).bind(id, projectId, configStr).run()
  }

  const saved = await env.DB.prepare(
    'SELECT * FROM cancel_flows WHERE project_id = ? AND active = 1 ORDER BY updated_at DESC LIMIT 1'
  ).bind(projectId).first()

  let parsedFlow = saved
  if (saved) {
    try { parsedFlow = { ...saved, config: JSON.parse(saved.config) } } catch {}
  }

  return jsonResponse({ saved: true, flow: parsedFlow }, 200, request)
}
