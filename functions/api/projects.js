import { jsonResponse, handleCors, getUserId, generateId, generateApiKey } from './_shared.js'

export async function onRequestOptions() {
  return handleCors()
}

export async function onRequestGet(context) {
  const { request, env } = context
  const userId = getUserId(request)
  if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401)

  const { results } = await env.DB.prepare(
    'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC'
  ).bind(userId).all()
  return jsonResponse({ projects: results })
}

export async function onRequestPost(context) {
  const { request, env } = context
  const userId = getUserId(request)
  if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401)

  const body = await request.json().catch(() => ({}))
  const id = generateId('proj')
  const apiKey = generateApiKey()
  const name = body.name || 'My Project'

  await env.DB.prepare(
    'INSERT INTO projects (id, user_id, name, api_key) VALUES (?, ?, ?, ?)'
  ).bind(id, userId, name, apiKey).run()

  const project = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(id).first()
  return jsonResponse(project, 201)
}

export async function onRequestPut(context) {
  const { request, env } = context
  const userId = getUserId(request)
  if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401)

  const body = await request.json().catch(() => ({}))
  const { projectId, name, stripe_secret_key, stripe_webhook_secret, webhook_url } = body

  const project = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId || '').first()
  if (!project || project.user_id !== userId) {
    return jsonResponse({ error: 'Project not found' }, 404)
  }

  const fields = []
  const values = []
  if (name !== undefined) { fields.push('name = ?'); values.push(name) }
  if (stripe_secret_key !== undefined) { fields.push('stripe_secret_key = ?'); values.push(stripe_secret_key) }
  if (stripe_webhook_secret !== undefined) { fields.push('stripe_webhook_secret = ?'); values.push(stripe_webhook_secret) }
  if (webhook_url !== undefined) { fields.push('webhook_url = ?'); values.push(webhook_url) }

  if (fields.length > 0) {
    fields.push("updated_at = datetime('now')")
    values.push(projectId)
    await env.DB.prepare(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run()
  }

  const updated = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId).first()
  return jsonResponse(updated)
}

export async function onRequestDelete(context) {
  const { request, env } = context
  const userId = getUserId(request)
  if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401)

  const body = await request.json().catch(() => ({}))
  const { projectId } = body

  const project = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId || '').first()
  if (!project || project.user_id !== userId) {
    return jsonResponse({ error: 'Project not found' }, 404)
  }

  await env.DB.prepare('DELETE FROM projects WHERE id = ?').bind(projectId).run()
  return jsonResponse({ deleted: true })
}
