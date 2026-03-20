// Public endpoint — widget posts events here (no auth, but requires project ID)

// In-memory store for MVP — will be replaced with D1
const events = []

export default async function handler(req, res) {
  // CORS headers for widget access
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'POST') {
    const { projectId, customerId, reason, offerShown, outcome, feedback, sessionId } = req.body || {}

    if (!projectId) {
      return res.status(400).json({ error: 'projectId required' })
    }

    const event = {
      id: events.length + 1,
      projectId,
      customerId: customerId || 'anonymous',
      reason: reason || null,
      offerShown: offerShown || null,
      outcome: outcome || null, // 'saved', 'cancelled', 'paused', 'downgraded'
      feedback: feedback || null,
      sessionId: sessionId || null,
      createdAt: new Date().toISOString(),
    }

    events.push(event)
    return res.status(201).json({ success: true, eventId: event.id })
  }

  if (req.method === 'GET') {
    // For dashboard — return recent events (would be auth-protected in production)
    const { projectId, limit = 50 } = req.query
    const filtered = projectId
      ? events.filter(e => e.projectId === projectId).slice(-parseInt(limit))
      : events.slice(-parseInt(limit))
    return res.status(200).json({ events: filtered })
  }

  res.setHeader('Allow', 'GET, POST, OPTIONS')
  return res.status(405).json({ error: 'Method not allowed' })
}
