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

/**
 * Extract userId from request.
 * Production: Clerk JWT only (signature verification via JWKS would be ideal,
 * but we validate the token structure + issuer + expiry as a baseline).
 * 
 * SECURITY: X-User-Id header is ONLY accepted in local dev (localhost origins).
 */
export function getUserId(request) {
  const origin = request.headers.get('Origin') || ''
  const isLocalDev = origin.startsWith('http://localhost')

  // Dev mode: only allow X-User-Id on localhost
  if (isLocalDev) {
    const devUserId = request.headers.get('X-User-Id')
    if (devUserId) return devUserId
  }

  // Clerk JWT — decode and validate structure
  const auth = request.headers.get('Authorization')
  if (auth && auth.startsWith('Bearer ')) {
    try {
      const token = auth.split(' ')[1]
      const parts = token.split('.')
      if (parts.length !== 3) return null // Must be a proper JWT

      const payload = JSON.parse(atob(parts[1]))

      // Validate expiry
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        return null // Token expired
      }

      // Validate issuer (Clerk issuer pattern)
      if (payload.iss && !payload.iss.includes('clerk')) {
        return null // Not a Clerk token
      }

      return payload.sub || null
    } catch {
      return null
    }
  }

  return null
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
  return new Response(JSON.stringify({ error: 'Too many requests' }), {
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
