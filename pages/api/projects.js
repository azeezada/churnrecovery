import { getServerAuth } from '../../lib/server-auth'
import {
  getProjectsByUser,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../../lib/db'

function generateId() {
  return 'proj_' + Math.random().toString(36).substring(2, 14)
}

function generateApiKey() {
  return 'cr_live_' + Array.from({ length: 32 }, () => Math.random().toString(36)[2]).join('')
}

export default async function handler(req, res) {
  const { userId } = getServerAuth(req)

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const projects = getProjectsByUser(userId)
    return res.status(200).json({ projects })
  }

  if (req.method === 'POST') {
    const { name } = req.body || {}
    const id = generateId()
    const apiKey = generateApiKey()
    const project = createProject({ id, userId, name: name || 'My Project', apiKey })
    return res.status(201).json(project)
  }

  if (req.method === 'PUT') {
    const { projectId, name, stripe_secret_key, stripe_webhook_secret, webhook_url } = req.body || {}
    const project = getProjectById(projectId)
    if (!project || project.user_id !== userId) {
      return res.status(404).json({ error: 'Project not found' })
    }
    const updated = updateProject(projectId, { name, stripe_secret_key, stripe_webhook_secret, webhook_url })
    return res.status(200).json(updated)
  }

  if (req.method === 'DELETE') {
    const { projectId } = req.body || {}
    const project = getProjectById(projectId)
    if (!project || project.user_id !== userId) {
      return res.status(404).json({ error: 'Project not found' })
    }
    deleteProject(projectId)
    return res.status(200).json({ deleted: true })
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE')
  return res.status(405).json({ error: 'Method not allowed' })
}
