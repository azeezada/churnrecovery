/**
 * Shared utilities for Cloudflare Pages Functions
 * Import with: import { ... } from './_shared.js'
 */

// Allowed CORS origins — restrict to our domains
const ALLOWED_ORIGINS = [
  'https://churnrecovery.com',
  'https://www.churnrecovery.com',
  'http://localhost:3000',
  'http://localhost:8788',
]

/**
 * Get CORS headers with origin validation.
 * Widget endpoints need permissive CORS (any customer site embeds it),
 * but dashboard/admin endpoints are restricted to our domains.
 */
export function getCorsHeaders(request, { allowAnyOrigin = false } = {}) {
  const origin = request?.headers?.get('Origin') || ''
  let allowedOrigin = ''

  if (allowAnyOrigin) {
    // Widget endpoints: allow any origin (customers embed on their sites)
    allowedOrigin = origin || '*'
  } else if (ALLOWED_ORIGINS.includes(origin)) {
    allowedOrigin = origin
  }

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
    ...(allowAnyOrigin ? {} : { 'Vary': 'Origin' }),
  }
}

// Backwards-compatible: restricted by default
export const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://churnrecovery.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
}

export function jsonResponse(data, status = 200, request = null, { allowAnyOrigin = false } = {}) {
  const headers = request
    ? { 'Content-Type': 'application/json', ...getCorsHeaders(request, { allowAnyOrigin }) }
    : { 'Content-Type': 'application/json', ...corsHeaders }
  return new Response(JSON.stringify(data), { status, headers })
}

export function generateId(prefix = 'proj') {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, '').substring(0, 12)}`
}

/**
 * Generate a cryptographically secure API key.
 * Uses crypto.getRandomValues instead of Math.random.
 */
export function generateApiKey() {
  const bytes = new Uint8Array(24)
  crypto.getRandomValues(bytes)
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
  return `cr_live_${hex}`
}

// ─── JWKS Cache ───────────────────────────────────────────────────────────────
// Module-level cache — survives for the lifetime of a Worker instance.
// Cloudflare Workers recycle periodically, so JWKS is re-fetched at most every
// few hours naturally. We also enforce a 1-hour TTL.
let jwksCache = null
let jwksCacheAt = 0
const JWKS_TTL_MS = 60 * 60 * 1000 // 1 hour

/**
 * Fetch Clerk JWKS from the issuer's well-known endpoint.
 * CLERK_JWKS_URL env var should be set to your Clerk instance's JWKS URL, e.g.:
 *   https://<your-clerk-domain>/.well-known/jwks.json
 *
 * Falls back to NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY-derived issuer if env not set.
 */
async function getJwks(env) {
  const now = Date.now()
  if (jwksCache && now - jwksCacheAt < JWKS_TTL_MS) return jwksCache

  // Derive JWKS URL from CLERK_JWKS_URL env var (preferred) or CLERK_ISSUER
  const jwksUrl = env?.CLERK_JWKS_URL
  if (!jwksUrl) {
    throw new Error('CLERK_JWKS_URL env var not set')
  }

  const res = await fetch(jwksUrl, {
    headers: { 'Accept': 'application/json' },
    cf: { cacheTtl: 3600, cacheEverything: true },
  })
  if (!res.ok) throw new Error(`JWKS fetch failed: ${res.status}`)

  jwksCache = await res.json()
  jwksCacheAt = now
  return jwksCache
}

/**
 * Decode base64url to ArrayBuffer (Web Crypto friendly).
 */
function base64urlToBuffer(b64url) {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/')
  const padded = b64.padEnd(b64.length + (4 - (b64.length % 4)) % 4, '=')
  const binary = atob(padded)
  const buf = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) buf[i] = binary.charCodeAt(i)
  return buf.buffer
}

/**
 * Verify a JWT using the JWKS endpoint.
 * Returns the decoded payload if valid, throws if invalid.
 *
 * Supported algorithms: RS256, RS384, RS512, ES256, ES384, ES512
 */
async function verifyJwt(token, env) {
  const parts = token.split('.')
  if (parts.length !== 3) throw new Error('Malformed JWT')

  const headerJson = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')))
  const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))

  // ── 1. Basic claim validation (before crypto — fast fail) ──────────────────
  const now = Math.floor(Date.now() / 1000)
  if (payload.exp && payload.exp < now) throw new Error('Token expired')
  if (payload.nbf && payload.nbf > now) throw new Error('Token not yet valid')
  if (!payload.sub) throw new Error('Missing sub claim')

  // Validate issuer is a Clerk instance
  if (!payload.iss || !payload.iss.includes('clerk')) {
    throw new Error('Invalid issuer')
  }

  // ── 2. Find the matching JWK by kid ───────────────────────────────────────
  const jwks = await getJwks(env)
  const kid = headerJson.kid
  const jwk = kid
    ? jwks.keys?.find(k => k.kid === kid)
    : jwks.keys?.[0] // fallback: single-key setup

  if (!jwk) throw new Error(`JWK not found for kid: ${kid}`)

  // ── 3. Import the public key ───────────────────────────────────────────────
  const alg = headerJson.alg || 'RS256'
  let cryptoAlg

  if (alg.startsWith('RS')) {
    const hashBits = alg.slice(2) // '256', '384', '512'
    cryptoAlg = { name: 'RSASSA-PKCS1-v1_5', hash: `SHA-${hashBits}` }
  } else if (alg.startsWith('ES')) {
    const hashBits = alg.slice(2)
    cryptoAlg = { name: 'ECDSA', namedCurve: `P-${hashBits}`, hash: `SHA-${hashBits}` }
  } else {
    throw new Error(`Unsupported algorithm: ${alg}`)
  }

  const publicKey = await crypto.subtle.importKey(
    'jwk',
    jwk,
    cryptoAlg,
    false,
    ['verify']
  )

  // ── 4. Verify the signature ────────────────────────────────────────────────
  const encoder = new TextEncoder()
  const signingInput = encoder.encode(`${parts[0]}.${parts[1]}`)
  const signature = base64urlToBuffer(parts[2])

  const valid = await crypto.subtle.verify(
    cryptoAlg,
    publicKey,
    signature,
    signingInput
  )

  if (!valid) throw new Error('Signature verification failed')

  return payload
}

/**
 * Extract userId from request.
 *
 * Production path: Full RS256/ES256 JWKS signature verification against Clerk.
 * Dev path: X-User-Id header accepted ONLY on localhost origins.
 *
 * All callers must await this function.
 */
export async function getUserId(request, env) {
  const origin = request.headers.get('Origin') || ''
  const isLocalDev = origin.startsWith('http://localhost')

  // Dev mode: only allow X-User-Id on localhost
  if (isLocalDev) {
    const devUserId = request.headers.get('X-User-Id')
    if (devUserId) return devUserId
  }

  // Clerk JWT — full JWKS signature verification
  const auth = request.headers.get('Authorization')
  if (!auth || !auth.startsWith('Bearer ')) return null

  const token = auth.slice(7)

  try {
    // If CLERK_JWKS_URL is configured: full verification
    if (env?.CLERK_JWKS_URL) {
      const payload = await verifyJwt(token, env)
      return payload.sub
    }

    // Security: No CLERK_JWKS_URL configured — deny ALL requests.
    // Accepting unverified JWTs is a critical auth bypass vulnerability.
    // Set CLERK_JWKS_URL in Cloudflare Pages environment variables.
    console.error('[AUTH] CLERK_JWKS_URL not set — denying all JWT auth. Configure this env var in CF Pages.')
    return null
  } catch (err) {
    console.error('[AUTH] JWT verification failed:', err.message)
    return null
  }
}

export function handleCors(request, { allowAnyOrigin = false } = {}) {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request, { allowAnyOrigin }),
  })
}

/**
 * Simple in-memory rate limiter for Cloudflare Workers.
 * Uses a Map with IP keys. Resets naturally when worker recycles.
 * For production at scale, use Cloudflare Rate Limiting rules instead.
 */
const rateLimitMap = new Map()

export function rateLimit(request, { maxRequests = 60, windowMs = 60000 } = {}) {
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown'
  const now = Date.now()
  const key = ip

  let entry = rateLimitMap.get(key)
  if (!entry || now - entry.start > windowMs) {
    entry = { count: 0, start: now }
    rateLimitMap.set(key, entry)
  }

  entry.count++

  if (entry.count > maxRequests) {
    return { limited: true, retryAfter: Math.ceil((entry.start + windowMs - now) / 1000) }
  }

  return { limited: false }
}

export function rateLimitResponse(retryAfter, request) {
  return new Response(JSON.stringify({ error: 'Too many requests', code: 'RATE_LIMITED' }), {
    status: 429,
    headers: {
      'Content-Type': 'application/json',
      'Retry-After': String(retryAfter),
      ...getCorsHeaders(request),
    },
  })
}

/**
 * Sanitize and validate string input.
 * Prevents excessively long strings and strips control characters.
 */
export function sanitizeString(str, maxLength = 1000) {
  if (typeof str !== 'string') return null
  // Strip control characters except newlines/tabs
  const cleaned = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
  return cleaned.substring(0, maxLength)
}

/**
 * Strip sensitive fields from a project object before returning to client.
 */
export function sanitizeProject(project) {
  if (!project) return project
  const { stripe_secret_key, stripe_webhook_secret, ...safe } = project
  return {
    ...safe,
    has_stripe_key: !!stripe_secret_key,
    has_webhook_secret: !!stripe_webhook_secret,
  }
}

/**
 * Wrap a Cloudflare Pages Function handler with consistent error handling.
 * Catches unhandled errors and returns a standard JSON error response.
 *
 * Usage:
 *   export const onRequestGet = withErrorHandling(async (context) => { ... })
 */
export function withErrorHandling(handler) {
  return async (context) => {
    try {
      return await handler(context)
    } catch (err) {
      console.error(`[API] Unhandled error in ${context.request.method} ${new URL(context.request.url).pathname}:`, err.message || err)
      return jsonResponse(
        { error: 'Internal server error', code: 'INTERNAL_ERROR' },
        500,
        context.request
      )
    }
  }
}

export const defaultFlow = {
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
