import { getServerAuth } from '../../lib/server-auth'
import { getProjectById, getAnalyticsByProject } from '../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { userId } = getServerAuth(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const { projectId, days = 30 } = req.query
  if (!projectId) return res.status(400).json({ error: 'projectId required' })

  const project = getProjectById(projectId)
  if (!project || project.user_id !== userId) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const analytics = getAnalyticsByProject(projectId, { days: parseInt(days) })
  return res.status(200).json(analytics)
}
