/**
 * /api/webhook-subscriptions
 *
 * REST Hooks pattern — allows Zapier, Make.com, and custom integrations to
 * register callback URLs for ChurnRecovery events.
 *
 * Supported event types:
 *   - cancellation_attempt  (subscriber started cancel flow)
 *   - subscriber_retained   (subscriber accepted a retention offer)
 *   - subscriber_cancelled  (subscriber completed cancellation)
 *   - payment_failed        (Stripe payment failure recorded)
 *   - subscriber_paused     (subscription paused)
 *
 * Webhook payload shape (POST to target_url):
 *   {
 *     "event": "cancellation_attempt",
 *     "timestamp": "2026-03-23T18:26:00Z",
 *     "projectId": "proj_abc123",
 *     "data": { ...event fields... }
 *   }
 *
 * Authentication: HMAC-SHA256 signature in X-ChurnRecovery-Signature header
 *   Format: sha256=<hex>
 *   Signed payload: JSON.stringify(body)
 */

import {
  jsonResponse,
  handleCors,
  getUserId,
  generateId,
  sanitizeString,
  rateLimit,
  rateLimitResponse,
  withErrorHandling,
} from './_shared.js'

const VALID_EVENT_TYPES = [
  'cancellation_attempt',
  'subscriber_retained',
  'subscriber_cancelled',
  'payment_failed',
  'subscriber_paused',
  '*', // wildcard — all events
]

const MAX_SUBSCRIPTIONS_PER_PROJECT = 20

export async function onRequestOptions(context) {
  return handleCors(context.request)
}

/**
 * GET /api/webhook-subscriptions?projectId=...
 * List all webhook subscriptions for a project.
 */
export const onRequestGet = withErrorHandling(async (context) => {
  const { request, env } = context
  const userId = await getUserId(request, env)
  if (!userId) return jsonResponse({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, 401, request)

  const rl = rateLimit(request, { maxRequests: 60, windowMs: 60000 })
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

  const url = new URL(request.url)
  const projectId = url.searchParams.get('projectId')
  if (!projectId) return jsonResponse({ error: 'projectId required', code: 'VALIDATION_ERROR' }, 400, request)

  // Verify project ownership
  const project = await env.DB.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').bind(projectId, userId).first()
  if (!project) return jsonResponse({ error: 'Project not found', code: 'NOT_FOUND' }, 404, request)

  const { results } = await env.DB.prepare(
    'SELECT id, project_id, event_type, target_url, active, created_at, last_triggered_at, last_status_code, failure_count FROM webhook_subscriptions WHERE project_id = ? ORDER BY created_at DESC'
  ).bind(projectId).all()

  return jsonResponse({ subscriptions: results }, 200, request)
})

/**
 * POST /api/webhook-subscriptions
 * Register a new webhook subscription.
 * Body: { projectId, targetUrl, eventType }
 */
export const onRequestPost = withErrorHandling(async (context) => {
  const { request, env } = context
  const userId = await getUserId(request, env)
  if (!userId) return jsonResponse({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, 401, request)

  const rl = rateLimit(request, { maxRequests: 20, windowMs: 60000 })
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

  const body = await request.json().catch(() => ({}))
  const { projectId, targetUrl, eventType = '*' } = body

  if (!projectId) return jsonResponse({ error: 'projectId required', code: 'VALIDATION_ERROR' }, 400, request)
  if (!targetUrl) return jsonResponse({ error: 'targetUrl required', code: 'VALIDATION_ERROR' }, 400, request)

  // Validate targetUrl
  const sanitizedUrl = sanitizeString(targetUrl, 2048)
  if (!sanitizedUrl || !sanitizedUrl.match(/^https:\/\//)) {
    return jsonResponse({ error: 'targetUrl must be a valid HTTPS URL', code: 'VALIDATION_ERROR' }, 400, request)
  }

  // Validate eventType
  const sanitizedEventType = sanitizeString(eventType, 50) || '*'
  if (!VALID_EVENT_TYPES.includes(sanitizedEventType)) {
    return jsonResponse({
      error: `Invalid event type. Must be one of: ${VALID_EVENT_TYPES.join(', ')}`,
      code: 'VALIDATION_ERROR',
    }, 400, request)
  }

  // Verify project ownership
  const project = await env.DB.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').bind(projectId, userId).first()
  if (!project) return jsonResponse({ error: 'Project not found', code: 'NOT_FOUND' }, 404, request)

  // Enforce per-project limit
  const { results: existing } = await env.DB.prepare(
    'SELECT id FROM webhook_subscriptions WHERE project_id = ? AND active = 1'
  ).bind(projectId).all()

  if (existing.length >= MAX_SUBSCRIPTIONS_PER_PROJECT) {
    return jsonResponse({
      error: `Maximum of ${MAX_SUBSCRIPTIONS_PER_PROJECT} active webhook subscriptions per project`,
      code: 'LIMIT_EXCEEDED',
    }, 422, request)
  }

  // Check for duplicate (same project + url + event type)
  const duplicate = await env.DB.prepare(
    'SELECT id FROM webhook_subscriptions WHERE project_id = ? AND target_url = ? AND event_type = ? AND active = 1'
  ).bind(projectId, sanitizedUrl, sanitizedEventType).first()

  if (duplicate) {
    return jsonResponse({
      error: 'A subscription for this URL and event type already exists',
      code: 'DUPLICATE',
    }, 409, request)
  }

  // Generate a signing secret for this subscription
  const secretBytes = new Uint8Array(32)
  crypto.getRandomValues(secretBytes)
  const secret = 'whsec_' + Array.from(secretBytes, b => b.toString(16).padStart(2, '0')).join('')

  const id = generateId('wsub')
  await env.DB.prepare(
    'INSERT INTO webhook_subscriptions (id, project_id, user_id, target_url, event_type, secret) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(id, projectId, userId, sanitizedUrl, sanitizedEventType, secret).run()

  return jsonResponse({
    id,
    projectId,
    targetUrl: sanitizedUrl,
    eventType: sanitizedEventType,
    secret,  // Only returned on creation — store it securely, it won't be shown again
    active: true,
    createdAt: new Date().toISOString(),
  }, 201, request)
})

/**
 * DELETE /api/webhook-subscriptions
 * Unregister a webhook subscription.
 * Body: { subscriptionId }
 */
export const onRequestDelete = withErrorHandling(async (context) => {
  const { request, env } = context
  const userId = await getUserId(request, env)
  if (!userId) return jsonResponse({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, 401, request)

  const rl = rateLimit(request, { maxRequests: 20, windowMs: 60000 })
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

  const body = await request.json().catch(() => ({}))
  const { subscriptionId } = body

  if (!subscriptionId) return jsonResponse({ error: 'subscriptionId required', code: 'VALIDATION_ERROR' }, 400, request)

  // Verify ownership via join
  const sub = await env.DB.prepare(
    'SELECT ws.id FROM webhook_subscriptions ws JOIN projects p ON p.id = ws.project_id WHERE ws.id = ? AND p.user_id = ?'
  ).bind(subscriptionId, userId).first()

  if (!sub) return jsonResponse({ error: 'Subscription not found', code: 'NOT_FOUND' }, 404, request)

  // Soft delete (set active=0) — preserves audit history
  await env.DB.prepare(
    "UPDATE webhook_subscriptions SET active = 0, last_triggered_at = datetime('now') WHERE id = ?"
  ).bind(subscriptionId).run()

  return jsonResponse({ deleted: true }, 200, request)
})

/**
 * POST /api/webhook-subscriptions/test
 * Send a test event to a registered webhook subscription.
 * Body: { subscriptionId }
 */
export async function onRequestPut(context) {
  return withErrorHandling(async (ctx) => {
    const { request, env } = ctx
    const userId = await getUserId(request, env)
    if (!userId) return jsonResponse({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, 401, request)

    const rl = rateLimit(request, { maxRequests: 5, windowMs: 60000 })
    if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

    const body = await request.json().catch(() => ({}))
    const { subscriptionId } = body

    if (!subscriptionId) return jsonResponse({ error: 'subscriptionId required', code: 'VALIDATION_ERROR' }, 400, request)

    const sub = await env.DB.prepare(
      'SELECT ws.* FROM webhook_subscriptions ws JOIN projects p ON p.id = ws.project_id WHERE ws.id = ? AND p.user_id = ? AND ws.active = 1'
    ).bind(subscriptionId, userId).first()

    if (!sub) return jsonResponse({ error: 'Subscription not found or inactive', code: 'NOT_FOUND' }, 404, request)

    const testPayload = {
      event: sub.event_type === '*' ? 'cancellation_attempt' : sub.event_type,
      timestamp: new Date().toISOString(),
      projectId: sub.project_id,
      test: true,
      data: {
        sessionId: 'test_session_001',
        customerId: 'test_customer_001',
        reason: 'too-expensive',
        offerShown: 'discount_30',
        outcome: 'saved',
        mrrCents: 2900,
      },
    }

    const result = await fireWebhook(sub, testPayload)

    return jsonResponse({
      sent: true,
      statusCode: result.statusCode,
      success: result.success,
    }, 200, request)
  })(context)
}

/**
 * Fire a webhook delivery.
 * Signs the payload with HMAC-SHA256 and POSTs to the target URL.
 * Returns { success, statusCode }.
 */
export async function fireWebhook(subscription, payload) {
  const body = JSON.stringify(payload)
  const encoder = new TextEncoder()

  // Generate signature
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(subscription.secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(body))
  const signature = 'sha256=' + Array.from(new Uint8Array(sigBuffer), b => b.toString(16).padStart(2, '0')).join('')

  let statusCode = 0
  let success = false

  try {
    const response = await fetch(subscription.target_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ChurnRecovery-Signature': signature,
        'X-ChurnRecovery-Event': payload.event,
        'X-ChurnRecovery-Delivery': crypto.randomUUID(),
        'User-Agent': 'ChurnRecovery-Webhooks/1.0',
      },
      body,
      signal: AbortSignal.timeout(10000), // 10-second timeout
    })
    statusCode = response.status
    success = response.ok
  } catch (err) {
    console.error('[webhook] Delivery failed:', subscription.id, err.message)
  }

  return { success, statusCode }
}

/**
 * Fan-out to all active webhook subscriptions for a given project + event type.
 * Called from events.js after recording a cancel event.
 * Runs fire-and-forget (no await on individual deliveries).
 *
 * @param {D1Database} db
 * @param {string} projectId
 * @param {string} eventType - one of the VALID_EVENT_TYPES (except '*')
 * @param {object} data - event-specific payload
 */
export async function notifyWebhooks(db, projectId, eventType, data) {
  try {
    // Fetch subscriptions for this exact event type OR wildcard
    const { results } = await db.prepare(
      "SELECT * FROM webhook_subscriptions WHERE project_id = ? AND active = 1 AND (event_type = ? OR event_type = '*')"
    ).bind(projectId, eventType).all()

    if (!results || results.length === 0) return

    const payload = {
      event: eventType,
      timestamp: new Date().toISOString(),
      projectId,
      data,
    }

    // Fire all webhooks in parallel (best-effort, no retries in this version)
    const deliveries = results.map(sub => fireWebhook(sub, payload))
    const outcomes = await Promise.allSettled(deliveries)

    // Update last_triggered_at and status for each subscription
    for (let i = 0; i < results.length; i++) {
      const sub = results[i]
      const outcome = outcomes[i]
      const statusCode = outcome.status === 'fulfilled' ? outcome.value.statusCode : 0
      const failureIncrement = (outcome.status === 'rejected' || !outcome.value?.success) ? 1 : 0

      // Disable subscription after 10 consecutive failures (circuit breaker)
      if (sub.failure_count + failureIncrement >= 10) {
        await db.prepare(
          "UPDATE webhook_subscriptions SET active = 0, last_triggered_at = datetime('now'), last_status_code = ?, failure_count = failure_count + ? WHERE id = ?"
        ).bind(statusCode, failureIncrement, sub.id).run()
        console.warn('[webhook] Subscription disabled after 10 failures:', sub.id)
      } else {
        await db.prepare(
          "UPDATE webhook_subscriptions SET last_triggered_at = datetime('now'), last_status_code = ?, failure_count = failure_count + ? WHERE id = ?"
        ).bind(statusCode, failureIncrement, sub.id).run()
      }
    }
  } catch (err) {
    // Never let webhook fan-out block the main event recording path
    console.error('[webhook] Fan-out error:', err.message)
  }
}
