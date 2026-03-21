import { jsonResponse, handleCors, rateLimit, rateLimitResponse } from '../_shared.js'

export async function onRequestOptions(context) {
  return handleCors(context.request, { allowAnyOrigin: true })
}

export async function onRequestGet(context) {
  const { request, env } = context

  // Rate limit: 30 per minute
  const rl = rateLimit(request, { maxRequests: 30, windowMs: 60000 })
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

  try {
    const result = await env.DB.prepare('SELECT COUNT(*) as count FROM waitlist').first()
    return jsonResponse({ count: result?.count || 0 }, 200, request, { allowAnyOrigin: true })
  } catch {
    return jsonResponse({ count: 0 }, 200, request, { allowAnyOrigin: true })
  }
}
