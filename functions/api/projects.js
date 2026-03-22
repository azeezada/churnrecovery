import { jsonResponse, handleCors, getUserId, generateId, generateApiKey, sanitizeProject, sanitizeString, rateLimit, rateLimitResponse } from './_shared.js'

export async function onRequestOptions(context) {
  return handleCors(context.request)
}

export async function onRequestGet(context) {
  const { request, env } = context
  const userId = await getUserId(request, env)
  if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401, request)

  const { results } = await env.DB.prepare(
    'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC'
  ).bind(userId).all()

  // Strip sensitive fields from response
  return jsonResponse({ projects: results.map(sanitizeProject) }, 200, request)
}

export async function onRequestPost(context) {
  const { request, env } = context
  const userId = await getUserId(request, env)
  if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401, request)

  // Rate limit project creation: 5 per minute
  const rl = rateLimit(request, { maxRequests: 5, windowMs: 60000 })
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

  const body = await request.json().catch(() => ({}))
  const id = generateId('proj')
  const apiKey = generateApiKey()
  const name = sanitizeString(body.name, 100) || 'My Project'

  await env.DB.prepare(
    'INSERT INTO projects (id, user_id, name, api_key) VALUES (?, ?, ?, ?)'
  ).bind(id, userId, name, apiKey).run()

  const project = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(id).first()
  return jsonResponse(sanitizeProject({ ...project, api_key: apiKey }), 201, request)
}

export async function onRequestPut(context) {
  const { request, env } = context
  const userId = await getUserId(request, env)
  if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401, request)

  const body = await request.json().catch(() => ({}))
  const { projectId } = body

  const project = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId || '').first()
  if (!project || project.user_id !== userId) {
    return jsonResponse({ error: 'Project not found' }, 404, request)
  }

  const fields = []
  const values = []

  // Validate and sanitize each field
  if (body.name !== undefined) {
    fields.push('name = ?')
    values.push(sanitizeString(body.name, 100) || project.name)
  }
  if (body.stripe_secret_key !== undefined) {
    // Validate Stripe key format
    const key = body.stripe_secret_key
    if (key && !key.match(/^(sk_test_|sk_live_|rk_test_|rk_live_)/)) {
      return jsonResponse({ error: 'Invalid Stripe key format' }, 400, request)
    }
    fields.push('stripe_secret_key = ?')
    values.push(sanitizeString(key, 255) || null)
  }
  if (body.stripe_webhook_secret !== undefined) {
    const secret = body.stripe_webhook_secret
    if (secret && !secret.startsWith('whsec_')) {
      return jsonResponse({ error: 'Invalid webhook secret format' }, 400, request)
    }
    fields.push('stripe_webhook_secret = ?')
    values.push(sanitizeString(secret, 255) || null)
  }
  if (body.webhook_url !== undefined) {
    const url = body.webhook_url
    if (url && !url.match(/^https:\/\//)) {
      return jsonResponse({ error: 'Webhook URL must use HTTPS' }, 400, request)
    }
    fields.push('webhook_url = ?')
    values.push(sanitizeString(url, 500) || null)
  }

  if (fields.length > 0) {
    fields.push("updated_at = datetime('now')")
    values.push(projectId)
    await env.DB.prepare(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run()
  }

  const updated = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId).first()
  return jsonResponse(sanitizeProject(updated), 200, request)
}

export async function onRequestDelete(context) {
  const { request, env } = context
  const userId = await getUserId(request, env)
  if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401, request)

  const body = await request.json().catch(() => ({}))
  const { projectId } = body

  const project = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId || '').first()
  if (!project || project.user_id !== userId) {
    return jsonResponse({ error: 'Project not found' }, 404, request)
  }

  await env.DB.prepare('DELETE FROM projects WHERE id = ?').bind(projectId).run()
  return jsonResponse({ deleted: true }, 200, request)
}
