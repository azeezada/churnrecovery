import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { getProjects, createProject, deleteProject } from '../../lib/localStore'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenLight: '#EDF7F1',
  red: '#DC2626',
  redLight: '#FEF2F2',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

function ProjectCard({ project, onDelete }) {
  const [deleting, setDeleting] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleDelete = () => {
    if (!confirm(`Delete project "${project.name}"? This cannot be undone.`)) return
    setDeleting(true)
    deleteProject(project.id)
    onDelete(project.id)
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
    <div style={{
      background: t.white,
      border: `1px solid ${t.border}`,
      borderRadius: '12px',
      padding: '24px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontFamily: t.fontSans, fontSize: '1.1rem', fontWeight: 700, color: t.text, margin: '0 0 4px' }}>
            {project.name}
          </h3>
          <div style={{ fontSize: '0.75rem', color: t.grayLight, fontFamily: 'monospace' }}>
            {project.id}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link
            href="/app/settings"
            style={{
              padding: '6px 14px', borderRadius: '6px',
              border: `1px solid ${t.border}`, background: t.white,
              fontSize: '0.78rem', color: t.text, textDecoration: 'none', fontFamily: t.fontSans,
            }}
          >
            Settings
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              padding: '6px 14px', borderRadius: '6px',
              border: `1px solid ${t.red}`, background: t.white,
              fontSize: '0.78rem', color: t.red, cursor: 'pointer', fontFamily: t.fontSans,
              opacity: deleting ? 0.5 : 1,
            }}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {/* API Key */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '0.7rem', color: t.grayLight, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
          API Key
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type={showKey ? 'text' : 'password'}
            value={project.api_key}
            readOnly
            style={{
              flex: 1, padding: '8px 12px', borderRadius: '6px',
              border: `1px solid ${t.border}`, fontFamily: 'monospace',
              fontSize: '0.82rem', color: t.text, background: t.bg, outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={() => setShowKey(!showKey)}
            style={{
              padding: '8px 12px', borderRadius: '6px',
              border: `1px solid ${t.border}`, background: t.white,
              cursor: 'pointer', fontSize: '0.75rem', fontFamily: t.fontSans, color: t.gray,
            }}
          >
            {showKey ? '🙈' : '👁'}
          </button>
          <button
            onClick={copyKey}
            style={{
              padding: '8px 12px', borderRadius: '6px',
              border: `1px solid ${t.border}`,
              background: copied ? t.greenLight : t.white,
              cursor: 'pointer', fontSize: '0.75rem', fontFamily: t.fontSans,
              color: copied ? t.green : t.gray,
            }}
          >
            {copied ? '✓' : '📋'}
          </button>
        </div>
      </div>

      {/* Quick links */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {[
          { href: '/app/cancel-flow', label: '🚪 Edit Flow' },
          { href: '/app/analytics', label: '📊 Analytics' },
          { href: '/app/install', label: '📦 Install' },
        ].map(link => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              padding: '5px 12px', borderRadius: '20px',
              border: `1px solid ${t.border}`, background: t.bg,
              fontSize: '0.75rem', color: t.gray, textDecoration: 'none', fontFamily: t.fontSans,
            }}
          >
            {link.label}
          </Link>
        ))}
        <span style={{ fontSize: '0.7rem', color: t.grayLight, padding: '5px 0', marginLeft: 'auto', fontFamily: t.fontSans }}>
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

  useEffect(() => {
    setProjects(getProjects())
    setLoading(false)
  }, [])

  const handleCreate = (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    setCreating(true)
    const project = createProject(newName.trim())
    setProjects(prev => [...prev, project])
    setNewName('')
    setShowForm(false)
    setCreating(false)
  }

  const handleDelete = (id) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  return (
    <>
      <Head>
        <title>Projects — ChurnRecovery</title>
      </Head>
      <AppLayout title="Projects">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: 0, lineHeight: 1.7 }}>
            Each project maps to one of your products or apps. Every project has its own API key and cancel flow.
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '10px 20px', borderRadius: '8px',
              background: t.accent, color: t.white, border: 'none',
              cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem',
              fontFamily: t.fontSans, whiteSpace: 'nowrap', marginLeft: '24px',
            }}
          >
            + New Project
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleCreate}
            style={{
              background: t.white, border: `1px solid ${t.border}`,
              borderRadius: '12px', padding: '24px', marginBottom: '20px',
            }}
          >
            <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 16px' }}>
              New Project
            </h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. My SaaS App"
                autoFocus
                style={{
                  flex: 1, padding: '10px 14px', borderRadius: '8px',
                  border: `1px solid ${t.border}`, fontFamily: t.fontSans,
                  fontSize: '0.88rem', color: t.text, outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="submit"
                disabled={creating || !newName.trim()}
                style={{
                  padding: '10px 24px', borderRadius: '8px',
                  background: t.accent, color: t.white, border: 'none',
                  cursor: creating ? 'not-allowed' : 'pointer', fontWeight: 600,
                  fontSize: '0.88rem', fontFamily: t.fontSans,
                  opacity: creating || !newName.trim() ? 0.7 : 1,
                }}
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setNewName('') }}
                style={{
                  padding: '10px 16px', borderRadius: '8px',
                  border: `1px solid ${t.border}`, background: t.white,
                  cursor: 'pointer', fontFamily: t.fontSans, color: t.gray, fontSize: '0.88rem',
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {error && (
          <div style={{ background: t.redLight, border: `1px solid ${t.red}`, borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', color: t.red, fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: t.grayLight, fontFamily: t.fontSans }}>
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div style={{
            background: t.white, border: `2px dashed ${t.border}`,
            borderRadius: '12px', padding: '60px 40px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📂</div>
            <h2 style={{ fontFamily: t.fontSans, fontSize: '1.3rem', fontWeight: 700, color: t.text, margin: '0 0 8px' }}>
              No projects yet
            </h2>
            <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, lineHeight: 1.7, margin: '0 0 24px' }}>
              Create your first project to get an API key and set up a cancel flow.
            </p>
            <button
              onClick={() => setShowForm(true)}
              style={{
                background: t.accent, color: t.white, padding: '10px 24px',
                borderRadius: '8px', border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '0.9rem', fontFamily: t.fontSans,
              }}
            >
              Create Project
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
