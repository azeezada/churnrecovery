import { getServerAuth } from '../../lib/server-auth'
import { getCancelFlowByProject, upsertCancelFlow, getProjectByApiKey } from '../../lib/db'

const defaultFlow = {
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

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key')
}

export default async function handler(req, res) {
  // OPTIONS: CORS preflight
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res)
    return res.status(200).end()
  }

  // GET: Public endpoint for widget to fetch flow config
  if (req.method === 'GET') {
    setCorsHeaders(res)
    const { projectId, apiKey } = req.query

    let resolvedProjectId = projectId

    // Allow lookup by API key (for widget)
    if (!resolvedProjectId && apiKey) {
      const project = getProjectByApiKey(apiKey)
      if (!project) return res.status(404).json({ error: 'Project not found' })
      resolvedProjectId = project.id
    }

    if (!resolvedProjectId) {
      return res.status(400).json({ error: 'projectId or apiKey required' })
    }

    const flow = getCancelFlowByProject(resolvedProjectId)
    return res.status(200).json(flow || defaultFlow)
  }

  // POST: Save flow config (auth required)
  if (req.method === 'POST') {
    const { userId } = getServerAuth(req)
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { projectId, reasons } = req.body || {}
    if (!projectId) {
      return res.status(400).json({ error: 'projectId required' })
    }

    const config = {
      reasons: reasons || defaultFlow.reasons,
      active: true,
      updatedAt: new Date().toISOString(),
    }
    const saved = upsertCancelFlow({ projectId, config })
    return res.status(200).json({ saved: true, flow: saved })
  }

  res.setHeader('Allow', 'GET, POST, OPTIONS')
  return res.status(405).json({ error: 'Method not allowed' })
}
