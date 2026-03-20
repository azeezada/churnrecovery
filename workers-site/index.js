import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import manifestJSON from '__STATIC_CONTENT_MANIFEST'
const assetManifest = JSON.parse(manifestJSON)

// CORS headers for API routes
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}

function generateId(prefix = 'proj') {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, '').substring(0, 12)}`
}

function generateApiKey() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let key = 'cr_live_'
  for (let i = 0; i < 32; i++) {
    key += chars[Math.floor(Math.random() * chars.length)]
  }
  return key
}

// -------------------------------------------------------------------
// Auth helper: extract userId from Clerk JWT or return null
// For MVP, we also support a simple demo mode via X-User-Id header
// -------------------------------------------------------------------
function getUserId(request) {
  // Demo/dev mode: trust X-User-Id header
  const devUserId = request.headers.get('X-User-Id')
  if (devUserId) return devUserId

  // TODO: In production, verify Clerk JWT from Authorization header
  // For now, check if there's a bearer token and decode the sub claim
  const auth = request.headers.get('Authorization')
  if (auth && auth.startsWith('Bearer ')) {
    try {
      const token = auth.split(' ')[1]
      // Decode JWT payload (not verifying signature here — Clerk middleware should do that)
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.sub || null
    } catch {
      return null
    }
  }

  return null
}

// -------------------------------------------------------------------
// Default cancel flow config
// -------------------------------------------------------------------
const defaultFlow = {
  reasons: [
    { id: 'too-expensive', label: 'Too expensive', icon: '💰', offerType: 'discount', offerValue: 30, offerDuration: 3 },
    { id: 'not-using', label: 'Not using it enough', icon: '😴', offerType: 'pause', offerValue: 2, offerDuration: null },
    { id: 'switching', label: 'Switching to competitor', icon: '👋', offerType: 'discount', offerValue: 50, offerDuration: 6 },
    { id: 'missing-feature', label: 'Missing a feature', icon: '🔧', offerType: 'human', offerValue: null, offerDuration: null },
    { id: 'too-complex', label: 'Too complex to use', icon: '🤯', offerType: 'human', offerValue: null, offerDuration: null },
    { id: 'other', label: 'Something else', icon: '💬', offerType: 'feedback', offerValue: null, offerDuration: null },
  ],
  active: true,
}

// ===================================================================
// API Route Handlers
// ===================================================================

// --- /api/waitlist ---

async function handleWaitlistPost(request, env) {
  try {
    const body = await request.json()
    const email = (body.email || '').trim().toLowerCase()

    if (!email || !email.includes('@') || !email.includes('.')) {
      return jsonResponse({ error: 'Invalid email address' }, 400)
    }

    const source = body.source || 'website'

    try {
      await env.DB.prepare('INSERT INTO waitlist (email, source) VALUES (?, ?)').bind(email, source).run()
    } catch (e) {
      if (e.message && e.message.includes('UNIQUE')) {
        return jsonResponse({ message: 'Already on the waitlist!', duplicate: true })
      }
      throw e
    }

    const countResult = await env.DB.prepare('SELECT COUNT(*) as count FROM waitlist').first()
    return jsonResponse({ message: "You're on the list!", count: countResult?.count || 0 }, 201)
  } catch (e) {
    console.error('Waitlist error:', e)
    return jsonResponse({ error: 'Something went wrong. Please try again.' }, 500)
  }
}

async function handleWaitlistCount(env) {
  try {
    const result = await env.DB.prepare('SELECT COUNT(*) as count FROM waitlist').first()
    return jsonResponse({ count: result?.count || 0 })
  } catch {
    return jsonResponse({ count: 0 })
  }
}

// --- /api/projects ---

async function handleProjects(request, env) {
  const userId = getUserId(request)
  if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401)

  const method = request.method

  if (method === 'GET') {
    const { results } = await env.DB.prepare(
      'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC'
    ).bind(userId).all()
    return jsonResponse({ projects: results })
  }

  if (method === 'POST') {
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

  if (method === 'PUT') {
    const body = await request.json().catch(() => ({}))
    const { projectId, name, stripe_secret_key, stripe_webhook_secret, webhook_url } = body

    const project = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId || '').first()
    if (!project || project.user_id !== userId) {
      return jsonResponse({ error: 'Project not found' }, 404)
    }

    // Build dynamic update
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

  if (method === 'DELETE') {
    const body = await request.json().catch(() => ({}))
    const { projectId } = body

    const project = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId || '').first()
    if (!project || project.user_id !== userId) {
      return jsonResponse({ error: 'Project not found' }, 404)
    }

    await env.DB.prepare('DELETE FROM projects WHERE id = ?').bind(projectId).run()
    return jsonResponse({ deleted: true })
  }

  return jsonResponse({ error: 'Method not allowed' }, 405)
}

// --- /api/cancel-flow ---

async function handleCancelFlow(request, env) {
  const method = request.method

  // GET: Public endpoint for widget to fetch flow config
  if (method === 'GET') {
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

  // POST: Save flow config (auth required)
  if (method === 'POST') {
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

    // Upsert: check if flow exists
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

    // Return saved flow
    const saved = await env.DB.prepare(
      'SELECT * FROM cancel_flows WHERE project_id = ? AND active = 1 ORDER BY updated_at DESC LIMIT 1'
    ).bind(projectId).first()

    let parsedFlow = saved
    if (saved) {
      try { parsedFlow = { ...saved, config: JSON.parse(saved.config) } } catch {}
    }

    return jsonResponse({ saved: true, flow: parsedFlow })
  }

  return jsonResponse({ error: 'Method not allowed' }, 405)
}

// --- /api/events ---

async function handleEvents(request, env) {
  const method = request.method

  // POST: Record a cancel event (from widget — uses API key auth)
  if (method === 'POST') {
    const body = await request.json().catch(() => ({}))
    const apiKey = request.headers.get('X-API-Key') || body.apiKey
    const { projectId: bodyProjectId, sessionId, customerId, reason, offerShown, outcome, feedback, mrrCents } = body

    let resolvedProjectId = bodyProjectId

    if (!resolvedProjectId && apiKey) {
      const project = await env.DB.prepare('SELECT id FROM projects WHERE api_key = ?').bind(apiKey).first()
      if (!project) return jsonResponse({ error: 'Invalid API key' }, 403)
      resolvedProjectId = project.id
    }

    if (!resolvedProjectId) {
      return jsonResponse({ error: 'projectId or API key required' }, 400)
    }

    const result = await env.DB.prepare(`
      INSERT INTO cancel_events (project_id, session_id, customer_id, reason, offer_shown, outcome, feedback, mrr_cents)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      resolvedProjectId,
      sessionId || null,
      customerId || null,
      reason || null,
      offerShown || null,
      outcome || null,
      feedback || null,
      mrrCents ? parseInt(mrrCents) : null
    ).run()

    return jsonResponse({ id: result.meta?.last_row_id, recorded: true }, 201)
  }

  // GET: List events for a project (dashboard — uses auth)
  if (method === 'GET') {
    const userId = getUserId(request)
    if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401)

    const url = new URL(request.url)
    const projectId = url.searchParams.get('projectId')
    const limit = parseInt(url.searchParams.get('limit') || '50')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    if (!projectId) return jsonResponse({ error: 'projectId required' }, 400)

    // Verify ownership
    const project = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId).first()
    if (!project || project.user_id !== userId) {
      return jsonResponse({ error: 'Forbidden' }, 403)
    }

    const { results } = await env.DB.prepare(`
      SELECT * FROM cancel_events WHERE project_id = ?
      ORDER BY created_at DESC LIMIT ? OFFSET ?
    `).bind(projectId, limit, offset).all()

    return jsonResponse({ events: results })
  }

  return jsonResponse({ error: 'Method not allowed' }, 405)
}

// --- /api/analytics ---

async function handleAnalytics(request, env) {
  if (request.method !== 'GET') return jsonResponse({ error: 'Method not allowed' }, 405)

  const userId = getUserId(request)
  if (!userId) return jsonResponse({ error: 'Unauthorized' }, 401)

  const url = new URL(request.url)
  const projectId = url.searchParams.get('projectId')
  const days = parseInt(url.searchParams.get('days') || '30')

  if (!projectId) return jsonResponse({ error: 'projectId required' }, 400)

  const project = await env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId).first()
  if (!project || project.user_id !== userId) {
    return jsonResponse({ error: 'Forbidden' }, 403)
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
  })
}

// --- /api/stripe-webhook ---

async function handleStripeWebhook(request, env) {
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405)

  try {
    const rawBody = await request.text()
    const event = JSON.parse(rawBody)

    // TODO: In production, verify Stripe webhook signature
    // const sig = request.headers.get('stripe-signature')

    switch (event.type) {
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        console.log('[Stripe] Subscription deleted:', subscription.id)

        // Find project by looking up customer metadata or matching stripe config
        // For now, log if we can identify the project
        if (subscription.metadata?.churnrecovery_project_id) {
          await env.DB.prepare(`
            INSERT INTO cancel_events (project_id, customer_id, outcome, reason)
            VALUES (?, ?, 'cancelled', 'stripe_churn')
          `).bind(subscription.metadata.churnrecovery_project_id, subscription.customer).run()
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        console.log('[Stripe] Payment failed:', invoice.id, 'Amount:', invoice.amount_due)

        if (invoice.metadata?.churnrecovery_project_id) {
          await env.DB.prepare(`
            INSERT INTO failed_payments (project_id, customer_id, stripe_invoice_id, amount_cents)
            VALUES (?, ?, ?, ?)
          `).bind(
            invoice.metadata.churnrecovery_project_id,
            invoice.customer,
            invoice.id,
            invoice.amount_due
          ).run()
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object
        if (invoice.billing_reason === 'subscription_cycle') {
          console.log('[Stripe] Payment recovered:', invoice.id)

          // Update matching failed_payment record to 'recovered'
          await env.DB.prepare(`
            UPDATE failed_payments SET recovery_status = 'recovered', updated_at = datetime('now')
            WHERE stripe_invoice_id = ? AND recovery_status = 'pending'
          `).bind(invoice.id).run()
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object
        const previousAttributes = event.data.previous_attributes

        if (previousAttributes?.cancel_at_period_end === false && subscription.cancel_at_period_end === true) {
          console.log('[Stripe] Subscription marked for cancellation:', subscription.id)
        }

        if (subscription.pause_collection && subscription.metadata?.churnrecovery_project_id) {
          await env.DB.prepare(`
            INSERT INTO cancel_events (project_id, customer_id, outcome)
            VALUES (?, ?, 'paused')
          `).bind(subscription.metadata.churnrecovery_project_id, subscription.customer).run()
        }
        break
      }

      default:
        console.log('[Stripe] Unhandled event type:', event.type)
    }

    return jsonResponse({ received: true })
  } catch (err) {
    console.error('[Stripe] Webhook error:', err.message)
    return jsonResponse({ error: 'Webhook error: ' + err.message }, 400)
  }
}

// ===================================================================
// Main Router
// ===================================================================

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    // Handle CORS preflight for all API routes
    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    // --- API Routes ---
    try {
      // Waitlist
      if (url.pathname === '/api/waitlist' && request.method === 'POST') {
        return await handleWaitlistPost(request, env)
      }
      if (url.pathname === '/api/waitlist/count' && request.method === 'GET') {
        return await handleWaitlistCount(env)
      }

      // Projects CRUD
      if (url.pathname === '/api/projects') {
        return await handleProjects(request, env)
      }

      // Cancel Flow
      if (url.pathname === '/api/cancel-flow') {
        return await handleCancelFlow(request, env)
      }

      // Events
      if (url.pathname === '/api/events') {
        return await handleEvents(request, env)
      }

      // Analytics
      if (url.pathname === '/api/analytics') {
        return await handleAnalytics(request, env)
      }

      // Stripe Webhook
      if (url.pathname === '/api/stripe-webhook') {
        return await handleStripeWebhook(request, env)
      }
    } catch (err) {
      console.error('API Error:', err)
      return jsonResponse({ error: 'Internal server error' }, 500)
    }

    // --- Static Asset Serving ---
    const event = {
      request,
      waitUntil: (promise) => ctx.waitUntil(promise),
    }

    const options = {
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      ASSET_MANIFEST: assetManifest,
    }

    try {
      return await getAssetFromKV(event, options)
    } catch (e) {
      try {
        return await getAssetFromKV(event, {
          ...options,
          mapRequestToAsset: req => new Request(new URL(req.url).origin + '/index.html', req),
        })
      } catch (err) {
        return new Response('Not found', { status: 404 })
      }
    }
  },
}
