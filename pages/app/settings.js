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
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

function Section({ title, description, children }) {
  return (
    <div style={{
      background: t.white,
      border: `1px solid ${t.border}`,
      borderRadius: '12px',
      marginBottom: '20px',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${t.border}` }}>
        <h2 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: '0 0 4px' }}>
          {title}
        </h2>
        {description && (
          <p style={{ fontSize: '0.82rem', color: t.grayLight, margin: 0 }}>{description}</p>
        )}
      </div>
      <div style={{ padding: '20px 24px' }}>
        {children}
      </div>
    </div>
  )
}

function InputField({ label, value, onChange, type = 'text', placeholder, readOnly, mono }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        fontSize: '0.75rem', color: t.grayLight, fontWeight: 500,
        display: 'block', marginBottom: '4px', textTransform: 'uppercase',
        letterSpacing: '0.05em', fontFamily: t.fontSans,
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        style={{
          width: '100%', padding: '10px 14px', borderRadius: '8px',
          border: `1px solid ${t.border}`, fontSize: '0.88rem',
          fontFamily: mono ? 'monospace' : t.fontSans,
          color: t.text, background: readOnly ? '#F5F4F0' : t.white,
          outline: 'none', boxSizing: 'border-box',
        }}
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

  useEffect(() => {
    const projects = getProjects()
    if (projects.length > 0) {
      const p = projects[0]
      setProject(p)
      setProjectName(p.name || 'My Project')
      const s = getSettings(p.id)
      setWebhookUrl(s.webhookUrl || '')
      setStripeConnected(s.stripeConnected || false)
    }
  }, [])

  const copyApiKey = () => {
    if (!project) return
    navigator.clipboard.writeText(project.api_key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    if (!project) return
    setSaving(true)
    setSaveMsg(null)
    updateProject(project.id, { name: projectName })
    saveSettings(project.id, { webhookUrl, stripeConnected })
    setTimeout(() => {
      setSaving(false)
      setSaveMsg({ type: 'success', text: 'Settings saved!' })
      setTimeout(() => setSaveMsg(null), 3000)
    }, 400)
  }

  const handleStripeConnect = () => {
    setStripeConnected(true)
    if (project) saveSettings(project.id, { webhookUrl, stripeConnected: true })
  }

  const handleDelete = () => {
    if (!project) return
    if (!confirm(`Delete project "${project.name}"? This cannot be undone.`)) return
    deleteProject(project.id)
    router.push('/app/dashboard')
  }

  if (!project) {
    return (
      <>
        <Head><title>Settings — ChurnRecovery</title></Head>
        <AppLayout title="Settings">
          <div style={{ textAlign: 'center', padding: '80px 40px', color: t.grayLight, fontFamily: t.fontSerif }}>
            <p>No project found. <a href="/app/dashboard" style={{ color: t.accent }}>Create one →</a></p>
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
        <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 28px', lineHeight: 1.7 }}>
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
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              fontSize: '0.75rem', color: t.grayLight, fontWeight: 500,
              display: 'block', marginBottom: '4px', textTransform: 'uppercase',
              letterSpacing: '0.05em', fontFamily: t.fontSans,
            }}>
              API Key
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type={showApiKey ? 'text' : 'password'}
                value={project?.api_key || ''}
                readOnly
                style={{
                  flex: 1, padding: '10px 14px', borderRadius: '8px',
                  border: `1px solid ${t.border}`, fontSize: '0.88rem',
                  fontFamily: 'monospace', color: t.text, background: '#F5F4F0',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                style={{
                  padding: '10px 14px', borderRadius: '8px',
                  border: `1px solid ${t.border}`, background: t.white,
                  cursor: 'pointer', fontSize: '0.82rem', fontFamily: t.fontSans,
                  color: t.gray,
                }}
              >
                {showApiKey ? '🙈 Hide' : '👁 Show'}
              </button>
              <button
                onClick={copyApiKey}
                style={{
                  padding: '10px 14px', borderRadius: '8px',
                  border: `1px solid ${t.border}`,
                  background: copied ? t.greenLight : t.white,
                  cursor: 'pointer', fontSize: '0.82rem', fontFamily: t.fontSans,
                  color: copied ? t.green : t.gray,
                }}
              >
                {copied ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
          </div>
          <div style={{
            padding: '12px 16px', borderRadius: '8px', background: '#FFF7ED',
            borderLeft: `3px solid #EA580C`, fontSize: '0.8rem', color: t.gray,
            lineHeight: 1.6, fontFamily: t.fontSerif,
          }}>
            ⚠️ Keep your API key secret. Never expose it in client-side code. Use the public project ID for frontend integrations.
          </div>
        </Section>

        {/* Stripe */}
        <Section title="Stripe Integration" description="Connect Stripe to auto-apply discount and pause offers">
          {stripeConnected ? (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '16px', borderRadius: '8px', background: t.greenLight,
            }}>
              <span style={{ fontSize: '1.2rem' }}>✅</span>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: t.green }}>
                  Stripe Connected
                </div>
                <div style={{ fontSize: '0.78rem', color: t.gray }}>
                  Offers will be automatically applied to Stripe subscriptions.
                </div>
              </div>
              <button
                onClick={() => {
                  setStripeConnected(false)
                  if (project) saveSettings(project.id, { webhookUrl, stripeConnected: false })
                }}
                style={{
                  marginLeft: 'auto', padding: '6px 14px', borderRadius: '6px',
                  border: `1px solid ${t.border}`, background: t.white,
                  cursor: 'pointer', fontSize: '0.78rem', color: t.red,
                  fontFamily: t.fontSans,
                }}
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
                style={{
                  padding: '10px 24px', borderRadius: '8px',
                  background: '#635BFF', color: t.white, border: 'none',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem',
                  fontFamily: t.fontSans, display: 'flex', alignItems: 'center', gap: '8px',
                }}
              >
                💳 Connect Stripe
              </button>
            </>
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
          <div style={{ fontSize: '0.78rem', color: t.grayLight, marginBottom: '12px' }}>
            Events: cancel_flow.started, cancel_flow.completed, cancel_flow.offer_accepted
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '10px 20px', borderRadius: '8px',
              background: t.accent, color: t.white, border: 'none',
              cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '0.85rem',
              fontFamily: t.fontSans, opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {saveMsg && (
            <div style={{
              marginTop: '12px', padding: '8px 12px', borderRadius: '6px',
              background: saveMsg.type === 'success' ? t.greenLight : '#FEF2F2',
              color: saveMsg.type === 'success' ? t.green : t.red,
              fontSize: '0.82rem', fontFamily: t.fontSans,
            }}>
              {saveMsg.text}
            </div>
          )}
        </Section>

        {/* Danger Zone */}
        <Section title="Danger Zone" description="Irreversible actions">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 500, color: t.text, marginBottom: '4px' }}>
                Delete Project
              </div>
              <div style={{ fontSize: '0.78rem', color: t.grayLight }}>
                Permanently delete this project and all associated data.
              </div>
            </div>
            <button
              onClick={handleDelete}
              style={{
                padding: '8px 16px', borderRadius: '6px',
                background: t.white, color: t.red,
                border: `1px solid ${t.red}`,
                cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem',
                fontFamily: t.fontSans,
              }}
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
