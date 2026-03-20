/**
 * Shared utilities for Cloudflare Pages Functions
 * Import with: import { ... } from './_shared.js'
 */

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
}

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}

export function generateId(prefix = 'proj') {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, '').substring(0, 12)}`
}

export function generateApiKey() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let key = 'cr_live_'
  for (let i = 0; i < 32; i++) {
    key += chars[Math.floor(Math.random() * chars.length)]
  }
  return key
}

/**
 * Extract userId from request.
 * Supports: X-User-Id header (dev), Bearer JWT (Clerk)
 */
export function getUserId(request) {
  // Dev mode
  const devUserId = request.headers.get('X-User-Id')
  if (devUserId) return devUserId

  // Clerk JWT
  const auth = request.headers.get('Authorization')
  if (auth && auth.startsWith('Bearer ')) {
    try {
      const token = auth.split(' ')[1]
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.sub || null
    } catch {
      return null
    }
  }

  return null
}

export function handleCors() {
  return new Response(null, { status: 204, headers: corsHeaders })
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
