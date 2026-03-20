import { jsonResponse, handleCors } from './_shared.js'

export async function onRequestOptions() {
  return handleCors()
}

export async function onRequestPost(context) {
  const { request, env } = context
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
