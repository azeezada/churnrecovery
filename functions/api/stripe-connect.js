/**
 * Stripe Connect OAuth handler
 *
 * Endpoints:
 *   GET  /api/stripe-connect?project_id=xxx   → returns OAuth authorize URL
 *   POST /api/stripe-connect                   → exchanges code, saves account
 *   DELETE /api/stripe-connect                 → disconnects Stripe account
 *
 * Environment variables required:
 *   STRIPE_CLIENT_ID        — Stripe Connect application client_id (ca_xxx)
 *   STRIPE_SECRET_KEY       — Your platform Stripe secret key (for token exchange)
 *   NEXT_PUBLIC_APP_URL     — Base URL (https://churnrecovery.com)
 */
import {
  jsonResponse,
  handleCors,
  getUserId,
  rateLimit,
  rateLimitResponse,
  withErrorHandling,
} from './_shared.js'

export async function onRequestOptions(context) {
  return handleCors(context.request)
}

/**
 * GET /api/stripe-connect?project_id=xxx
 * Returns the Stripe OAuth authorization URL for this project.
 */
export const onRequestGet = withErrorHandling(async (context) => {
  const { request, env } = context

  const userId = await getUserId(request, env)
  if (!userId) return jsonResponse({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, 401, request)

  const rl = rateLimit(request, { maxRequests: 30, windowMs: 60000 })
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

  const url = new URL(request.url)
  const projectId = url.searchParams.get('project_id')

  if (!projectId) {
    return jsonResponse({ error: 'project_id is required', code: 'MISSING_PARAM' }, 400, request)
  }

  // Verify project belongs to this user
  const project = await env.DB.prepare(
    'SELECT id, stripe_connect_account_id, stripe_connected_at FROM projects WHERE id = ? AND user_id = ?'
  ).bind(projectId, userId).first()

  if (!project) {
    return jsonResponse({ error: 'Project not found', code: 'NOT_FOUND' }, 404, request)
  }

  const clientId = env.STRIPE_CLIENT_ID
  if (!clientId) {
    return jsonResponse(
      { error: 'Stripe Connect not configured', code: 'STRIPE_NOT_CONFIGURED' },
      503,
      request
    )
  }

  const appUrl = env.NEXT_PUBLIC_APP_URL || 'https://churnrecovery.com'
  const redirectUri = `${appUrl}/app/connect-stripe`

  // State encodes projectId + a random nonce to prevent CSRF
  const nonce = crypto.randomUUID().replace(/-/g, '').slice(0, 16)
  const state = btoa(JSON.stringify({ projectId, nonce }))

  const oauthUrl =
    `https://connect.stripe.com/oauth/authorize` +
    `?response_type=code` +
    `&client_id=${encodeURIComponent(clientId)}` +
    `&scope=read_write` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&state=${encodeURIComponent(state)}` +
    `&stripe_user[business_type]=company`

  return jsonResponse(
    {
      oauth_url: oauthUrl,
      connected: !!project.stripe_connect_account_id,
      account_id: project.stripe_connect_account_id || null,
      connected_at: project.stripe_connected_at || null,
    },
    200,
    request
  )
})

/**
 * POST /api/stripe-connect
 * Body: { code, state }
 * Exchanges the OAuth code for a Stripe access token and saves to D1.
 */
export const onRequestPost = withErrorHandling(async (context) => {
  const { request, env } = context

  const userId = await getUserId(request, env)
  if (!userId) return jsonResponse({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, 401, request)

  const rl = rateLimit(request, { maxRequests: 10, windowMs: 60000 })
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

  const body = await request.json().catch(() => ({}))
  const { code, state } = body

  if (!code || !state) {
    return jsonResponse(
      { error: 'Missing code or state', code: 'MISSING_PARAMS' },
      400,
      request
    )
  }

  // Decode state to get projectId
  let projectId
  try {
    const decoded = JSON.parse(atob(state))
    projectId = decoded.projectId
    if (!projectId) throw new Error('No projectId in state')
  } catch {
    return jsonResponse({ error: 'Invalid state parameter', code: 'INVALID_STATE' }, 400, request)
  }

  // Verify project belongs to this user
  const project = await env.DB.prepare(
    'SELECT id FROM projects WHERE id = ? AND user_id = ?'
  ).bind(projectId, userId).first()

  if (!project) {
    return jsonResponse({ error: 'Project not found', code: 'NOT_FOUND' }, 404, request)
  }

  const secretKey = env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return jsonResponse(
      { error: 'Stripe not configured on server', code: 'STRIPE_NOT_CONFIGURED' },
      503,
      request
    )
  }

  // Exchange code for access token via Stripe OAuth token endpoint
  const tokenResponse = await fetch('https://connect.stripe.com/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
    }),
  })

  if (!tokenResponse.ok) {
    const err = await tokenResponse.json().catch(() => ({}))
    console.error('[StripeConnect] Token exchange failed:', err)
    return jsonResponse(
      {
        error: err.error_description || 'Failed to connect Stripe account',
        code: 'STRIPE_OAUTH_FAILED',
      },
      400,
      request
    )
  }

  const token = await tokenResponse.json()
  // token.stripe_user_id = connected account ID (acct_xxx)
  // token.access_token   = platform access token for acting on behalf of this account
  // token.scope          = what scopes were granted
  // token.livemode       = boolean

  const {
    stripe_user_id: accountId,
    access_token: accessToken,
    scope,
    livemode,
  } = token

  if (!accountId || !accessToken) {
    return jsonResponse(
      { error: 'Invalid token response from Stripe', code: 'STRIPE_INVALID_TOKEN' },
      502,
      request
    )
  }

  // Store in D1
  const nowIso = new Date().toISOString()
  await env.DB.prepare(`
    UPDATE projects
    SET stripe_connect_account_id = ?,
        stripe_connect_access_token = ?,
        stripe_connect_scope = ?,
        stripe_connect_livemode = ?,
        stripe_connected_at = ?
    WHERE id = ?
  `).bind(
    accountId,
    accessToken,
    scope || 'read_write',
    livemode ? 1 : 0,
    nowIso,
    projectId
  ).run()

  console.log('[StripeConnect] Account connected:', accountId, 'project:', projectId)

  return jsonResponse(
    {
      success: true,
      account_id: accountId,
      livemode: !!livemode,
      scope: scope || 'read_write',
      connected_at: nowIso,
    },
    200,
    request
  )
})

/**
 * DELETE /api/stripe-connect
 * Body: { project_id }
 * Disconnects (deauthorizes) a Stripe Connect account.
 */
export const onRequestDelete = withErrorHandling(async (context) => {
  const { request, env } = context

  const userId = await getUserId(request, env)
  if (!userId) return jsonResponse({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, 401, request)

  const rl = rateLimit(request, { maxRequests: 10, windowMs: 60000 })
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

  const body = await request.json().catch(() => ({}))
  const { project_id: projectId } = body

  if (!projectId) {
    return jsonResponse({ error: 'project_id is required', code: 'MISSING_PARAM' }, 400, request)
  }

  const project = await env.DB.prepare(
    'SELECT id, stripe_connect_account_id, stripe_connect_access_token FROM projects WHERE id = ? AND user_id = ?'
  ).bind(projectId, userId).first()

  if (!project) {
    return jsonResponse({ error: 'Project not found', code: 'NOT_FOUND' }, 404, request)
  }

  if (!project.stripe_connect_account_id) {
    return jsonResponse(
      { error: 'No Stripe account connected', code: 'NOT_CONNECTED' },
      400,
      request
    )
  }

  // Attempt to deauthorize with Stripe (best-effort — don't fail if Stripe is down)
  const secretKey = env.STRIPE_SECRET_KEY
  if (secretKey && project.stripe_connect_account_id) {
    const clientId = env.STRIPE_CLIENT_ID
    if (clientId) {
      try {
        await fetch('https://connect.stripe.com/oauth/deauthorize', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${secretKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: clientId,
            stripe_user_id: project.stripe_connect_account_id,
          }),
        })
      } catch (err) {
        // Non-fatal — still clear local tokens
        console.warn('[StripeConnect] Deauthorize request failed (non-fatal):', err.message)
      }
    }
  }

  // Clear tokens in D1
  await env.DB.prepare(`
    UPDATE projects
    SET stripe_connect_account_id = NULL,
        stripe_connect_access_token = NULL,
        stripe_connect_scope = NULL,
        stripe_connect_livemode = 0,
        stripe_connected_at = NULL
    WHERE id = ?
  `).bind(projectId).run()

  console.log('[StripeConnect] Account disconnected for project:', projectId)

  return jsonResponse({ success: true }, 200, request)
})
