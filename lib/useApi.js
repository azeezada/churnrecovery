/**
 * useApi — utility to make authenticated API calls to Cloudflare Pages Functions.
 *
 * When Clerk is enabled, attaches JWT token as Authorization: Bearer.
 * When Clerk is not configured (demo mode), uses X-User-Id: demo_user header
 * (only works on localhost).
 */
import { isClerkEnabled } from './auth'

/**
 * Get auth headers for API requests.
 * In Clerk mode: get the token from useAuth().getToken()
 * In demo mode: use X-User-Id header (localhost only)
 */
export function useApiHeaders() {
  if (isClerkEnabled()) {
    // Caller must get token via Clerk's useAuth hook
    return null // signal: need Clerk token
  }
  // Demo mode — use X-User-Id (only works on localhost)
  return { 'X-User-Id': 'demo_user' }
}

/**
 * Make an authenticated fetch to the API.
 * Pass getToken from Clerk's useAuth() hook when Clerk is enabled.
 * Falls back to demo mode headers.
 */
export async function apiFetch(path, { getToken, method = 'GET', body, signal } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (isClerkEnabled() && getToken) {
    try {
      const token = await getToken()
      if (token) headers['Authorization'] = `Bearer ${token}`
    } catch {
      // Token fetch failed — proceed without auth
    }
  } else {
    // Demo mode: X-User-Id header (accepted by API only on localhost)
    headers['X-User-Id'] = 'demo_user'
  }

  const opts = { method, headers, signal }
  if (body) opts.body = JSON.stringify(body)

  const res = await fetch(path, opts)
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw Object.assign(new Error(err.error || 'API error'), { status: res.status, data: err })
  }
  return res.json()
}
