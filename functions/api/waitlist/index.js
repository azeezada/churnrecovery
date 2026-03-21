import { jsonResponse, handleCors, rateLimit, rateLimitResponse, sanitizeString } from '../_shared.js'

// Map source param to ConvertKit tag names
const SOURCE_TAG_MAP = {
  'product-hunt': 'product-hunt-waitlist',
  'producthunt': 'product-hunt-waitlist',
  'reddit': 'reddit-waitlist',
  'alternativeto': 'alternativeto-waitlist',
  'betalist': 'betalist-waitlist',
  'organic': 'organic-waitlist',
  // /for/ landing page sources → mapped to most relevant tag
  'convertkit-lp': 'organic-waitlist',
  'substack-lp': 'organic-waitlist',
  'kajabi-lp': 'organic-waitlist',
  'teachable-lp': 'organic-waitlist',
  'ghost-lp': 'organic-waitlist',
  'podia-lp': 'organic-waitlist',
  'thinkific-lp': 'organic-waitlist',
  'circle-lp': 'organic-waitlist',
  'patreon-lp': 'organic-waitlist',
  'beehiiv-lp': 'organic-waitlist',
}

/**
 * Subscribe email to ConvertKit form + apply source tag + referral tag.
 * Errors are caught and logged — never block the D1 save.
 */
async function subscribeToConvertKit(email, source, env, referralCode = null) {
  const apiKey = env.CONVERTKIT_API_KEY
  const formId = env.CONVERTKIT_FORM_ID

  if (!apiKey || !formId) {
    // ConvertKit not configured — skip silently
    return
  }

  const tagName = SOURCE_TAG_MAP[source] || 'organic-waitlist'
  const tags = [tagName]

  // Add referral tag so ConvertKit automation can segment referred users
  if (referralCode) {
    tags.push(`referred-by-${referralCode.toLowerCase().replace(/[^a-z0-9-]/g, '-')}`)
  }

  try {
    const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        email,
        tags,
        // Pass referral_code as a ConvertKit custom field
        ...(referralCode ? { fields: { referral_code: referralCode } } : {}),
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error(`ConvertKit API error ${res.status}: ${body}`)
    }
  } catch (err) {
    // Network error or timeout — log but don't throw
    console.error('ConvertKit subscribe failed (non-fatal):', err?.message || err)
  }
}

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
    const referralCode = sanitizeString(body.referral_code, 100) || null

    let duplicate = false
    try {
      if (referralCode) {
        // Try inserting with referral_code column (migration 0002 adds it)
        try {
          await env.DB.prepare('INSERT INTO waitlist (email, source, referral_code) VALUES (?, ?, ?)')
            .bind(email, source, referralCode)
            .run()
        } catch (colErr) {
          // Column doesn't exist yet — fall back to encoding referral in source field
          if (colErr.message && (colErr.message.includes('no column') || colErr.message.includes('table waitlist has no column'))) {
            await env.DB.prepare('INSERT INTO waitlist (email, source) VALUES (?, ?)')
              .bind(email, `${source}|ref:${referralCode}`)
              .run()
          } else {
            throw colErr
          }
        }
      } else {
        await env.DB.prepare('INSERT INTO waitlist (email, source) VALUES (?, ?)').bind(email, source).run()
      }
    } catch (e) {
      if (e.message && e.message.includes('UNIQUE')) {
        duplicate = true
      } else {
        throw e
      }
    }

    if (duplicate) {
      return jsonResponse({ message: 'Already on the waitlist!', duplicate: true }, 200, request, { allowAnyOrigin: true })
    }

    // Fire-and-forget ConvertKit subscription (errors won't break waitlist)
    await subscribeToConvertKit(email, source, env, referralCode)

    const countResult = await env.DB.prepare('SELECT COUNT(*) as count FROM waitlist').first()
    return jsonResponse({ message: "You're on the list!", count: countResult?.count || 0 }, 201, request, { allowAnyOrigin: true })
  } catch (e) {
    console.error('Waitlist error:', e)
    return jsonResponse({ error: 'Something went wrong. Please try again.' }, 500, request, { allowAnyOrigin: true })
  }
}
