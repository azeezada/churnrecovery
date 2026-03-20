import { jsonResponse, handleCors, getUserId, generateId, defaultFlow } from './_shared.js'

export async function onRequestOptions() {
  return handleCors()
}

export async function onRequestGet(context) {
  const { request, env } = context
  const url = new URL(request.url)
  let projectId = url.searchParams.get('projectId')
  const apiKey = url.searchParams.get('apiKey')

  if (!projectId && apiKey) {
    const project = await env.DB.prepare('SELECT id FROM projects WHERE api_key = ?').bind(apiKey).first()
    if (!project) return jsonResponse({ error: 'Project not found' }, 404)
    projectId = project.id
  }

  if (!projectId) {
    return jsonResponse({ error: 'projectId or apiKey required' }, 400)
  }

  const flow = await env.DB.prepare(
    'SELECT * FROM cancel_flows WHERE project_id = ? AND active = 1 ORDER BY updated_at DESC LIMIT 1'
  ).bind(projectId).first()

  if (!flow) return jsonResponse(defaultFlow)

  try {
    return jsonResponse({ ...flow, config: JSON.parse(flow.config) })
  } catch {
    return jsonResponse(defaultFlow)
  }
}

export async function onRequestPost(context) {
  const { request, env } = context
  const userId = getUserId(request)
  if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401)

  const body = await request.json().catch(() => ({}))
  const { projectId, reasons } = body

  if (!projectId) return jsonResponse({ error: 'projectId required' }, 400)

  // Verify project ownership
  const project = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId).first()
  if (!project || project.user_id !== userId) {
    return jsonResponse({ error: 'Project not found' }, 404)
  }

  const config = {
    reasons: reasons || defaultFlow.reasons,
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

  return jsonResponse({ saved: true, flow: parsedFlow })
}
