import { jsonResponse, handleCors, rateLimit, rateLimitResponse, sanitizeString } from '../_shared.js'

export async function onRequestOptions(context) {
  return handleCors(context.request, { allowAnyOrigin: true })
}

export async function onRequestPost(context) {
  const { request, env } = context

  // Rate limit: 3 signups per hour per IP (prevent abuse/spam)
  const rl = rateLimit(request, { maxRequests: 3, windowMs: 3600000 })
  if (rl.limited) return rateLimitResponse(rl.retryAfter, request)

  try {
    const body = await request.json()
    const email = sanitizeString((body.email || ''), 254)?.trim().toLowerCase()

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return jsonResponse({ error: 'Invalid email address' }, 400, request, { allowAnyOrigin: true })
    }

    const source = sanitizeString(body.source, 50) || 'website'

    try {
      await env.DB.prepare('INSERT INTO waitlist (email, source) VALUES (?, ?)').bind(email, source).run()
    } catch (e) {
      if (e.message && e.message.includes('UNIQUE')) {
        return jsonResponse({ message: 'Already on the waitlist!', duplicate: true }, 200, request, { allowAnyOrigin: true })
      }
      throw e
    }

    const countResult = await env.DB.prepare('SELECT COUNT(*) as count FROM waitlist').first()
    return jsonResponse({ message: "You're on the list!", count: countResult?.count || 0 }, 201, request, { allowAnyOrigin: true })
  } catch (e) {
    console.error('Waitlist error:', e)
    return jsonResponse({ error: 'Something went wrong. Please try again.' }, 500, request, { allowAnyOrigin: true })
  }
}
