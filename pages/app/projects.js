import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { getProjects, createProject, deleteProject } from '../../lib/localStore'
import { apiFetch } from '../../lib/useApi'

function ProjectCard({ project, onDelete }) {
  const [deleting, setDeleting] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Delete project "${project.name}"? This cannot be undone.`)) return
    setDeleting(true)
    await onDelete(project.id)
    setDeleting(false)
  }

  const copyKey = () => {
    navigator.clipboard.writeText(project.api_key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const createdAt = new Date(project.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })

  return (
    <div className="bg-brand-white border border-brand-border rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-sans text-[1.1rem] font-bold text-brand-text m-0 mb-1">
            {project.name}
          </h3>
          <div className="text-[0.75rem] text-brand-gray-light font-mono">
            {project.id}
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/app/settings"
            className="px-[14px] py-1.5 rounded-md border border-brand-border bg-brand-white text-[0.78rem] text-brand-text no-underline font-sans"
          >
            Settings
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`px-[14px] py-1.5 rounded-md border border-brand-red bg-brand-white text-[0.78rem] text-brand-red cursor-pointer font-sans ${
              deleting ? 'opacity-50' : 'opacity-100'
            }`}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {/* API Key */}
      <div className="mb-4">
        <label className="text-[0.7rem] text-brand-gray-light font-semibold uppercase tracking-[0.05em] block mb-1.5">
          API Key
        </label>
        <div className="flex gap-2">
          <input
            type={showKey ? 'text' : 'password'}
            value={project.api_key}
            readOnly
            className="flex-1 px-3 py-2 rounded-md border border-brand-border font-mono text-[0.82rem] text-brand-text bg-brand-bg outline-none box-border"
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="px-3 py-2 rounded-md border border-brand-border bg-brand-white cursor-pointer text-[0.75rem] font-sans text-brand-gray"
          >
            {showKey ? '🙈' : '👁'}
          </button>
          <button
            onClick={copyKey}
            className={`px-3 py-2 rounded-md border border-brand-border cursor-pointer text-[0.75rem] font-sans ${
              copied ? 'bg-brand-green-light text-brand-green' : 'bg-brand-white text-brand-gray'
            }`}
          >
            {copied ? '✓' : '📋'}
          </button>
        </div>
      </div>

      {/* Quick links */}
      <div className="flex gap-2 flex-wrap">
        {[
          { href: '/app/cancel-flow', label: '🚪 Edit Flow' },
          { href: '/app/analytics', label: '📊 Analytics' },
          { href: '/app/install', label: '📦 Install' },
        ].map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 py-[5px] rounded-[20px] border border-brand-border bg-brand-bg text-[0.75rem] text-brand-gray no-underline font-sans"
          >
            {link.label}
          </Link>
        ))}
        <span className="text-[0.7rem] text-brand-gray-light py-[5px] ml-auto font-sans">
          Created {createdAt}
        </span>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState(null)
  const [usingRealData, setUsingRealData] = useState(false)

  // Load projects — try API first, fall back to localStore
  useEffect(() => {
    async function loadProjects() {
      setLoading(true)
      try {
        const data = await apiFetch('/api/projects')
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects)
          setUsingRealData(true)
        } else {
          setProjects(getProjects())
          setUsingRealData(false)
        }
      } catch {
        setProjects(getProjects())
        setUsingRealData(false)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    setCreating(true)
    try {
      if (usingRealData) {
        const project = await apiFetch('/api/projects', {
          method: 'POST',
          body: { name: newName.trim() },
        })
        setProjects(prev => [...prev, project])
      } else {
        const project = createProject(newName.trim())
        setProjects(prev => [...prev, project])
      }
    } catch {
      // Fall back to localStore on API error
      const project = createProject(newName.trim())
      setProjects(prev => [...prev, project])
    }
    setNewName('')
    setShowForm(false)
    setCreating(false)
  }

  const handleDelete = async (id) => {
    if (usingRealData) {
      try {
        await apiFetch(`/api/projects?id=${id}`, { method: 'DELETE' })
      } catch {
        // Fall back to localStore on API error
        deleteProject(id)
      }
    } else {
      deleteProject(id)
    }
    setProjects(projects.filter(p => p.id !== id))
  }

  return (
    <>
      <Head>
        <title>Projects — ChurnRecovery</title>
      </Head>
      <AppLayout title="Projects">
        <div className="flex justify-between items-center mb-8">
          <p className="font-serif text-[0.9rem] text-brand-gray m-0 leading-[1.7]">
            Each project maps to one of your products or apps. Every project has its own API key and cancel flow.
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-[10px] rounded-lg bg-brand-accent text-brand-white border-none cursor-pointer font-semibold text-[0.88rem] font-sans whitespace-nowrap ml-6"
          >
            + New Project
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleCreate}
            className="bg-brand-white border border-brand-border rounded-xl p-6 mb-5"
          >
            <h3 className="font-sans text-[1rem] font-bold text-brand-text m-0 mb-4">
              New Project
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. My SaaS App"
                autoFocus
                className="flex-1 px-[14px] py-[10px] rounded-lg border border-brand-border font-sans text-[0.88rem] text-brand-text outline-none box-border"
              />
              <button
                type="submit"
                disabled={creating || !newName.trim()}
                className={`px-6 py-[10px] rounded-lg bg-brand-accent text-brand-white border-none font-semibold text-[0.88rem] font-sans ${
                  creating || !newName.trim() ? 'cursor-not-allowed opacity-70' : 'cursor-pointer opacity-100'
                }`}
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setNewName('') }}
                className="px-4 py-[10px] rounded-lg border border-brand-border bg-brand-white cursor-pointer font-sans text-brand-gray text-[0.88rem]"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {error && (
          <div className="bg-[#FEF2F2] border border-brand-red rounded-lg px-4 py-3 mb-5 text-brand-red text-[0.85rem]">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center p-[60px] text-brand-gray-light font-sans">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-brand-white border-2 border-dashed border-brand-border rounded-xl py-[60px] px-10 text-center">
            <div className="text-[3rem] mb-4">📂</div>
            <h2 className="font-sans text-[1.3rem] font-bold text-brand-text m-0 mb-2">
              No projects yet
            </h2>
            <p className="font-serif text-[0.9rem] text-brand-gray leading-[1.7] m-0 mb-6">
              Create your first project to get an API key and set up a cancel flow.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-brand-accent text-brand-white px-6 py-[10px] rounded-lg border-none cursor-pointer font-semibold text-[0.9rem] font-sans"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </AppLayout>
    </>
  )
}

ProjectsPage.isAppPage = true
