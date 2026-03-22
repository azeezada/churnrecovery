import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthUser } from '../../lib/useAuthUser'
import AppLayout from '../../components/AppLayout'
import {
  getProjects,
  updateProject,
  deleteProject,
  getSettings,
  saveSettings,
} from '../../lib/localStore'
import { apiFetch } from '../../lib/useApi'

function Section({ title, description, children }) {
  return (
    <div className="bg-brand-white border border-brand-border rounded-xl mb-5 overflow-hidden">
      <div className="px-6 py-5 border-b border-brand-border">
        <h2 className="font-sans text-base font-bold text-brand-text mb-1">
          {title}
        </h2>
        {description && (
          <p className="text-[0.82rem] text-brand-gray-light m-0">{description}</p>
        )}
      </div>
      <div className="px-6 py-5">
        {children}
      </div>
    </div>
  )
}

function InputField({ label, value, onChange, type = 'text', placeholder, readOnly, mono }) {
  return (
    <div className="mb-4">
      <label className="text-[0.75rem] text-brand-gray-light font-medium block mb-1 uppercase tracking-[0.05em] font-sans">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-[0.88rem] text-brand-text outline-none box-border ${
          mono ? 'font-mono' : 'font-sans'
        } ${readOnly ? 'bg-[#F5F4F0]' : 'bg-brand-white'}`}
      />
    </div>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const { user } = useAuthUser()
  const [project, setProject] = useState(null)
  const [projectName, setProjectName] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [stripeConnected, setStripeConnected] = useState(false)
  const [stripeKey, setStripeKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState(null)
  const [usingRealData, setUsingRealData] = useState(false)

  // Load project — try API first, fall back to localStore
  useEffect(() => {
    async function loadProject() {
      try {
        const data = await apiFetch('/api/projects')
        if (data.projects && data.projects.length > 0) {
          const p = data.projects[0]
          setProject(p)
          setProjectName(p.name || 'My Project')
          // D1 projects return webhook_url and has_stripe_key from sanitizeProject()
          setWebhookUrl(p.webhook_url || '')
          setStripeConnected(p.has_stripe_key || false)
          setUsingRealData(true)
          return
        }
      } catch {
        // API unavailable
      }
      // Fall back to localStore
      const projects = getProjects()
      if (projects.length > 0) {
        const p = projects[0]
        setProject(p)
        setProjectName(p.name || 'My Project')
        const s = getSettings(p.id)
        setWebhookUrl(s.webhookUrl || '')
        setStripeConnected(s.stripeConnected || false)
      }
    }
    loadProject()
  }, [])

  const copyApiKey = () => {
    if (!project) return
    navigator.clipboard.writeText(project.api_key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Save project name + webhook URL via PUT /api/projects
  const handleSave = async () => {
    if (!project) return
    setSaving(true)
    setSaveMsg(null)
    try {
      if (usingRealData) {
        const updated = await apiFetch('/api/projects', {
          method: 'PUT',
          body: {
            projectId: project.id,
            name: projectName,
            webhook_url: webhookUrl || null,
          },
        })
        setProject(updated)
        setProjectName(updated.name || 'My Project')
        setWebhookUrl(updated.webhook_url || '')
        setSaveMsg({ type: 'success', text: 'Settings saved!' })
      } else {
        updateProject(project.id, { name: projectName })
        saveSettings(project.id, { webhookUrl, stripeConnected })
        setSaveMsg({ type: 'success', text: 'Settings saved!' })
      }
    } catch (err) {
      setSaveMsg({ type: 'error', text: err.message || 'Failed to save settings.' })
    } finally {
      setSaving(false)
      setTimeout(() => setSaveMsg(null), 3000)
    }
  }

  // Connect Stripe via PUT /api/projects with stripe_secret_key
  const handleStripeConnect = async () => {
    if (!stripeKey) return
    setSaving(true)
    setSaveMsg(null)
    try {
      if (usingRealData) {
        const updated = await apiFetch('/api/projects', {
          method: 'PUT',
          body: {
            projectId: project.id,
            stripe_secret_key: stripeKey,
          },
        })
        setProject(updated)
        setStripeConnected(updated.has_stripe_key || false)
        setStripeKey('')
        setSaveMsg({ type: 'success', text: 'Stripe connected successfully!' })
      } else {
        setStripeConnected(true)
        if (project) saveSettings(project.id, { webhookUrl, stripeConnected: true })
        setSaveMsg({ type: 'success', text: 'Stripe connected (local only).' })
      }
    } catch (err) {
      setSaveMsg({ type: 'error', text: err.message || 'Failed to connect Stripe.' })
    } finally {
      setSaving(false)
      setTimeout(() => setSaveMsg(null), 3000)
    }
  }

  // Disconnect Stripe via PUT /api/projects with stripe_secret_key: null
  const handleStripeDisconnect = async () => {
    setSaving(true)
    setSaveMsg(null)
    try {
      if (usingRealData) {
        const updated = await apiFetch('/api/projects', {
          method: 'PUT',
          body: {
            projectId: project.id,
            stripe_secret_key: null,
          },
        })
        setProject(updated)
        setStripeConnected(updated.has_stripe_key || false)
        setSaveMsg({ type: 'success', text: 'Stripe disconnected.' })
      } else {
        setStripeConnected(false)
        if (project) saveSettings(project.id, { webhookUrl, stripeConnected: false })
        setSaveMsg({ type: 'success', text: 'Stripe disconnected.' })
      }
    } catch (err) {
      setSaveMsg({ type: 'error', text: err.message || 'Failed to disconnect Stripe.' })
    } finally {
      setSaving(false)
      setTimeout(() => setSaveMsg(null), 3000)
    }
  }

  // Delete project via DELETE /api/projects with body { projectId }
  const handleDelete = async () => {
    if (!project) return
    if (!confirm(`Delete project "${project.name}"? This cannot be undone.`)) return
    try {
      if (usingRealData) {
        await apiFetch('/api/projects', {
          method: 'DELETE',
          body: { projectId: project.id },
        })
      } else {
        deleteProject(project.id)
      }
    } catch {
      // Fall back to local delete on error
      deleteProject(project.id)
    }
    router.push('/app/dashboard')
  }

  if (!project) {
    return (
      <>
        <Head><title>Settings — ChurnRecovery</title></Head>
        <AppLayout title="Settings">
          <div className="text-center py-20 px-10 text-brand-gray-light font-serif">
            <p>No project found. <a href="/app/dashboard" className="text-brand-accent">Create one →</a></p>
          </div>
        </AppLayout>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Settings — ChurnRecovery</title>
      </Head>
      <AppLayout title="Settings">
        <p className="font-serif text-[0.9rem] text-brand-gray mb-7 leading-[1.7]">
          Manage your project settings, API keys, and integrations.
        </p>

        {/* Project Settings */}
        <Section title="Project" description="Basic project configuration">
          <InputField
            label="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="My SaaS App"
          />
          <InputField
            label="Project ID"
            value={project?.id || '—'}
            readOnly
            mono
          />
        </Section>

        {/* API Keys */}
        <Section title="API Keys" description="Use these keys to authenticate SDK and API requests">
          <div className="mb-4">
            <label className="text-[0.75rem] text-brand-gray-light font-medium block mb-1 uppercase tracking-[0.05em] font-sans">
              API Key
            </label>
            <div className="flex gap-2">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={project?.api_key || ''}
                readOnly
                className="flex-1 px-3.5 py-2.5 rounded-lg border border-brand-border text-[0.88rem] font-mono text-brand-text bg-[#F5F4F0] outline-none box-border"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="px-3.5 py-2.5 rounded-lg border border-brand-border bg-brand-white cursor-pointer text-[0.82rem] font-sans text-brand-gray"
              >
                {showApiKey ? '🙈 Hide' : '👁 Show'}
              </button>
              <button
                onClick={copyApiKey}
                className={`px-3.5 py-2.5 rounded-lg border border-brand-border cursor-pointer text-[0.82rem] font-sans ${
                  copied
                    ? 'bg-brand-green-light text-brand-green'
                    : 'bg-brand-white text-brand-gray'
                }`}
              >
                {copied ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
          </div>
          <div className="px-4 py-3 rounded-lg bg-[#FFF7ED] border-l-[3px] border-l-brand-orange text-[0.8rem] text-brand-gray leading-[1.6] font-serif">
            ⚠️ Keep your API key secret. Never expose it in client-side code. Use the public project ID for frontend integrations.
          </div>
        </Section>

        {/* Stripe */}
        <Section title="Stripe Integration" description="Connect Stripe to auto-apply discount and pause offers">
          {stripeConnected ? (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-brand-green-light">
              <span className="text-[1.2rem]">✅</span>
              <div>
                <div className="text-[0.88rem] font-semibold text-brand-green">
                  Stripe Connected
                </div>
                <div className="text-[0.78rem] text-brand-gray">
                  Offers will be automatically applied to Stripe subscriptions.
                </div>
              </div>
              <button
                onClick={handleStripeDisconnect}
                disabled={saving}
                className="ml-auto px-3.5 py-1.5 rounded-md border border-brand-border bg-brand-white cursor-pointer text-[0.78rem] text-brand-red font-sans disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <>
              <InputField
                label="Stripe Secret Key"
                value={stripeKey}
                onChange={(e) => setStripeKey(e.target.value)}
                type="password"
                placeholder="sk_live_..."
                mono
              />
              <button
                onClick={handleStripeConnect}
                disabled={saving || !stripeKey}
                className="px-6 py-2.5 rounded-lg bg-[#635BFF] text-brand-white border-none cursor-pointer font-semibold text-[0.88rem] font-sans flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                💳 Connect Stripe
              </button>
            </>
          )}
          {saveMsg && (
            <div className={`mt-3 px-3 py-2 rounded-md text-[0.82rem] font-sans ${
              saveMsg.type === 'success'
                ? 'bg-brand-green-light text-brand-green'
                : 'bg-[#FEF2F2] text-brand-red'
            }`}>
              {saveMsg.text}
            </div>
          )}
        </Section>

        {/* Webhooks */}
        <Section title="Webhooks" description="Receive real-time events when customers interact with the cancel flow">
          <InputField
            label="Webhook URL"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://yourapp.com/webhooks/churnrecovery"
          />
          <div className="text-[0.78rem] text-brand-gray-light mb-3">
            Events: cancel_flow.started, cancel_flow.completed, cancel_flow.offer_accepted
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-5 py-2.5 rounded-lg bg-brand-accent text-brand-white border-none font-semibold text-[0.85rem] font-sans ${
              saving ? 'cursor-not-allowed opacity-70' : 'cursor-pointer opacity-100'
            }`}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {saveMsg && (
            <div className={`mt-3 px-3 py-2 rounded-md text-[0.82rem] font-sans ${
              saveMsg.type === 'success'
                ? 'bg-brand-green-light text-brand-green'
                : 'bg-[#FEF2F2] text-brand-red'
            }`}>
              {saveMsg.text}
            </div>
          )}
        </Section>

        {/* Danger Zone */}
        <Section title="Danger Zone" description="Irreversible actions">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[0.88rem] font-medium text-brand-text mb-1">
                Delete Project
              </div>
              <div className="text-[0.78rem] text-brand-gray-light">
                Permanently delete this project and all associated data.
              </div>
            </div>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-md bg-brand-white border border-brand-red text-brand-red cursor-pointer font-semibold text-[0.82rem] font-sans"
            >
              Delete Project
            </button>
          </div>
        </Section>
      </AppLayout>
    </>
  )
}

SettingsPage.isAppPage = true
