import { insertCancelEvent, getCancelEventsByProject, getProjectByApiKey, getProjectById } from '../../lib/db'
import { getServerAuth } from '../../lib/server-auth'

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key')
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res)
    return res.status(200).end()
  }

  // POST: Record a cancel event (from widget — uses API key auth)
  if (req.method === 'POST') {
    setCorsHeaders(res)

    const apiKey = req.headers['x-api-key'] || req.body?.apiKey
    const { projectId: bodyProjectId, sessionId, customerId, reason, offerShown, outcome, feedback, mrrCents } = req.body || {}

    let resolvedProjectId = bodyProjectId

    if (!resolvedProjectId && apiKey) {
      const project = getProjectByApiKey(apiKey)
      if (!project) return res.status(403).json({ error: 'Invalid API key' })
      resolvedProjectId = project.id
    }

    if (!resolvedProjectId) {
      return res.status(400).json({ error: 'projectId or API key required' })
    }

    const id = insertCancelEvent({
      projectId: resolvedProjectId,
      sessionId,
      customerId,
      reason,
      offerShown,
      outcome,
      feedback,
      mrrCents: mrrCents ? parseInt(mrrCents) : null,
    })

    return res.status(201).json({ id, recorded: true })
  }

  // GET: List events for a project (dashboard — uses Clerk auth)
  if (req.method === 'GET') {
    const { userId } = getServerAuth(req)
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    const { projectId, limit = 50, offset = 0 } = req.query
    if (!projectId) return res.status(400).json({ error: 'projectId required' })

    // Verify ownership
    const project = getProjectById(projectId)
    if (!project || project.user_id !== userId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const events = getCancelEventsByProject(projectId, { limit: parseInt(limit), offset: parseInt(offset) })
    return res.status(200).json({ events })
  }

  res.setHeader('Allow', 'GET, POST, OPTIONS')
  return res.status(405).json({ error: 'Method not allowed' })
}
