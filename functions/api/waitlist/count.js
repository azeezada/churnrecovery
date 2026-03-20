import { jsonResponse, handleCors } from '../_shared.js'

export async function onRequestOptions() {
  return handleCors()
}

export async function onRequestGet(context) {
  const { env } = context
  try {
    const result = await env.DB.prepare('SELECT COUNT(*) as count FROM waitlist').first()
    return jsonResponse({ count: result?.count || 0 })
  } catch {
    return jsonResponse({ count: 0 })
  }
}
