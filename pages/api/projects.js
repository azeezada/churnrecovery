import { getAuth } from '@clerk/nextjs/server'

// In-memory store for MVP — will be replaced with D1
const projects = new Map()

function generateId() {
  return 'proj_' + Math.random().toString(36).substring(2, 14)
}

function generateApiKey() {
  return 'cr_live_' + Array.from({ length: 32 }, () => Math.random().toString(36)[2]).join('')
}

export default async function handler(req, res) {
  const { userId } = getAuth(req)
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    // List projects for user
    const userProjects = []
    for (const [id, project] of projects) {
      if (project.userId === userId) {
        userProjects.push({ id, ...project })
      }
    }
    return res.status(200).json({ projects: userProjects })
  }

  if (req.method === 'POST') {
    // Create project
    const { name } = req.body || {}
    const id = generateId()
    const project = {
      userId,
      name: name || 'My Project',
      apiKey: generateApiKey(),
      stripeWebhookSecret: null,
      createdAt: new Date().toISOString(),
    }
    projects.set(id, project)
    return res.status(201).json({ id, ...project })
  }

  if (req.method === 'PUT') {
    // Update project
    const { projectId, name, stripeWebhookSecret } = req.body || {}
    const project = projects.get(projectId)
    if (!project || project.userId !== userId) {
      return res.status(404).json({ error: 'Project not found' })
    }
    if (name) project.name = name
    if (stripeWebhookSecret) project.stripeWebhookSecret = stripeWebhookSecret
    projects.set(projectId, project)
    return res.status(200).json({ id: projectId, ...project })
  }

  if (req.method === 'DELETE') {
    const { projectId } = req.body || {}
    const project = projects.get(projectId)
    if (!project || project.userId !== userId) {
      return res.status(404).json({ error: 'Project not found' })
    }
    projects.delete(projectId)
    return res.status(200).json({ deleted: true })
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE')
  return res.status(405).json({ error: 'Method not allowed' })
}
