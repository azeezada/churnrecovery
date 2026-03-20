import { getAuth } from '@clerk/nextjs/server'

// In-memory store for MVP — will be replaced with D1
const cancelFlows = new Map()

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

export default async function handler(req, res) {
  // GET: Public endpoint for widget to fetch flow config (no auth needed)
  if (req.method === 'GET') {
    const { projectId } = req.query
    if (!projectId) {
      return res.status(400).json({ error: 'projectId required' })
    }
    const flow = cancelFlows.get(projectId) || defaultFlow
    // Set CORS headers for widget access
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    return res.status(200).json(flow)
  }

  // POST: Save flow config (auth required)
  if (req.method === 'POST') {
    const { userId } = getAuth(req)
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { projectId, reasons } = req.body || {}
    const flow = {
      reasons: reasons || defaultFlow.reasons,
      active: true,
      updatedAt: new Date().toISOString(),
      updatedBy: userId,
    }
    cancelFlows.set(projectId || 'default', flow)
    return res.status(200).json({ saved: true, flow })
  }

  // OPTIONS: CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return res.status(200).end()
  }

  res.setHeader('Allow', 'GET, POST, OPTIONS')
  return res.status(405).json({ error: 'Method not allowed' })
}
