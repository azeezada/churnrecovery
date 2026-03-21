/**
 * Health check endpoint — useful for uptime monitoring and deployment verification.
 * GET /api/health → { status: "ok", timestamp: <ms> }
 */

export async function onRequestGet(context) {
  return new Response(JSON.stringify({ status: 'ok', timestamp: Date.now() }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
