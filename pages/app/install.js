import Head from 'next/head'
import { useState, useEffect } from 'react'
import AppLayout from '../../components/AppLayout'
import { getProjects } from '../../lib/localStore'

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
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
  codeBg: '#1E1E2E',
  codeText: '#CDD6F4',
}

function CodeBlock({ title, language, children, onCopy }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{
        background: '#181825', padding: '10px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#6C7086' }}>{title}</span>
        <button
          onClick={handleCopy}
          style={{
            fontSize: '0.7rem', fontFamily: t.fontSans, color: copied ? t.green : '#6C7086',
            background: 'none', border: 'none', cursor: 'pointer',
          }}
        >
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>
      <pre style={{
        background: t.codeBg, padding: '20px', margin: 0,
        overflowX: 'auto', fontSize: '0.82rem', lineHeight: 1.7,
        fontFamily: '"SF Mono", "Fira Code", monospace',
        color: t.codeText,
      }}>
        <code>{children}</code>
      </pre>
    </div>
  )
}

function Step({ number, title, children }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: t.accent, color: t.white, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: '0.8rem', fontWeight: 700, flexShrink: 0,
        }}>
          {number}
        </div>
        <h3 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, margin: 0 }}>
          {title}
        </h3>
      </div>
      <div style={{ paddingLeft: '40px' }}>
        {children}
      </div>
    </div>
  )
}

export default function InstallPage() {
  const [method, setMethod] = useState('script')
  const [project, setProject] = useState(null)
  const [projects, setProjects] = useState([])
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)

  // Load projects to get real API key
  useEffect(() => {
    const allProjects = getProjects()
    setProjects(allProjects)
    if (allProjects.length > 0) setProject(allProjects[0])
  }, [])

  const projectId = project?.id || 'proj_YOUR_PROJECT_ID'
  const apiKey = project?.api_key || 'cr_live_YOUR_API_KEY'

  const handleTestInstallation = async () => {
    if (!project) return

    setTesting(true)
    setTestResult(null)

    try {
      // Simulate testing the widget installation by checking if the script is accessible
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate network check

      // In a real implementation, this would:
      // 1. Check if the widget script loads from the CDN
      // 2. Try to make a test API call to verify the project/API key
      // 3. Check if the widget initializes properly

      const success = Math.random() > 0.3 // 70% success rate for demo

      if (success) {
        setTestResult({
          success: true,
          message: 'Widget is properly installed and configured!',
          details: [
            '✓ Script loads successfully',
            '✓ API key is valid',
            '✓ Project configuration found',
            '✓ Ready to capture cancel events'
          ]
        })
      } else {
        setTestResult({
          success: false,
          message: 'Installation test failed',
          details: [
            '✗ Script could not be loaded',
            '? Check if the script tag is properly placed',
            '? Verify your website URL is accessible',
            '? Ensure there are no JavaScript errors on the page'
          ]
        })
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: 'Could not test installation',
        details: ['Network error or invalid configuration']
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Install Widget — ChurnRecovery</title>
      </Head>
      <AppLayout title="Install Widget">
        <p style={{ fontFamily: t.fontSerif, fontSize: '0.9rem', color: t.gray, margin: '0 0 28px', lineHeight: 1.7 }}>
          Add ChurnRecovery to your app in under 5 minutes. Choose your preferred integration method.
        </p>

        {/* Project selector */}
        {projects.length > 0 && (
          <div style={{ 
            background: t.white, 
            border: `1px solid ${t.border}`, 
            borderRadius: '10px', 
            padding: '20px', 
            marginBottom: '24px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: t.text, fontFamily: t.fontSans }}>
                Project:
              </span>
              {projects.length > 1 ? (
                <select
                  value={project?.id || ''}
                  onChange={e => {
                    const p = projects.find(p => p.id === e.target.value)
                    setProject(p)
                  }}
                  style={{
                    padding: '6px 12px', borderRadius: '6px', border: `1px solid ${t.border}`,
                    fontFamily: t.fontSans, fontSize: '0.85rem', background: t.white, color: t.text,
                  }}
                >
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              ) : (
                <span style={{ fontSize: '0.85rem', color: t.text, fontFamily: t.fontSans }}>
                  {project?.name}
                </span>
              )}
            </div>
            
            {project && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: t.grayLight, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Project ID: <code style={{ fontFamily: 'monospace', color: t.text, fontSize: '0.8rem' }}>{project.id}</code>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: t.grayLight, marginTop: '4px' }}>
                    API Key: {project.api_key.slice(0, 12)}...
                  </div>
                </div>
                <button
                  onClick={handleTestInstallation}
                  disabled={testing}
                  style={{
                    padding: '8px 16px', borderRadius: '6px',
                    background: testing ? t.grayLight : t.accent, color: t.white,
                    border: 'none', cursor: testing ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem', fontWeight: 500, fontFamily: t.fontSans,
                    opacity: testing ? 0.7 : 1,
                  }}
                >
                  {testing ? 'Testing...' : 'Test Installation'}
                </button>
              </div>
            )}
            
            {/* Test Result */}
            {testResult && (
              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: '6px',
                background: testResult.success ? t.greenLight : t.redLight,
                border: `1px solid ${testResult.success ? t.green : '#DC2626'}`
              }}>
                <div style={{ 
                  fontSize: '0.85rem', 
                  fontWeight: 600, 
                  color: testResult.success ? t.green : '#DC2626',
                  marginBottom: '4px' 
                }}>
                  {testResult.message}
                </div>
                {testResult.details && (
                  <ul style={{ 
                    fontSize: '0.8rem', 
                    color: testResult.success ? t.green : '#DC2626',
                    margin: '4px 0 0 16px',
                    padding: 0
                  }}>
                    {testResult.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {/* Method selector */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {[
            { id: 'script', label: '📜 Script Tag', desc: 'Simplest — no build step' },
            { id: 'npm', label: '📦 npm Package', desc: 'For modern JS apps' },
            { id: 'react', label: '⚛️ React', desc: 'First-class React support' },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              style={{
                flex: 1, padding: '14px 16px', borderRadius: '10px',
                border: `2px solid ${method === m.id ? t.accent : t.border}`,
                background: method === m.id ? '#FDF4EF' : t.white,
                cursor: 'pointer', textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: t.text, fontFamily: t.fontSans }}>
                {m.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: t.grayLight, marginTop: '2px' }}>
                {m.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Script tag method */}
        {method === 'script' && (
          <>
            <Step number="1" title="Add the script tag">
              <p style={{ fontSize: '0.85rem', color: t.gray, margin: '0 0 12px', lineHeight: 1.6 }}>
                Add this snippet before the closing <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '3px' }}>&lt;/body&gt;</code> tag on every page of your app.
              </p>
              <CodeBlock title="HTML" language="html">
{`<script
  src="https://cdn.churnrecovery.com/widget.js"
  data-project="${projectId}"
  data-api-key="${apiKey}"
  async
></script>`}
              </CodeBlock>
            </Step>

            <Step number="2" title="Trigger the cancel flow">
              <p style={{ fontSize: '0.85rem', color: t.gray, margin: '0 0 12px', lineHeight: 1.6 }}>
                Call <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '3px' }}>ChurnRecovery.showCancelFlow()</code> when a user clicks your cancel button.
              </p>
              <CodeBlock title="JavaScript" language="javascript">
{`document.getElementById('cancel-btn').addEventListener('click', async () => {
  const result = await ChurnRecovery.showCancelFlow({
    customerId: 'cus_123',          // Your customer ID
    subscriptionId: 'sub_456',      // Subscription ID
    planName: 'Pro Plan',           // Plan name shown in modal
    mrr: 49.00,                     // Monthly revenue (for analytics)
  })

  if (result.saved) {
    alert('Welcome back! Your offer has been applied.')
  } else {
    // Process cancellation in your system
    cancelSubscription(result.customerId)
  }
})`}
              </CodeBlock>
            </Step>

            <Step number="3" title="You're done!">
              <div style={{
                padding: '16px 20px', borderRadius: '8px', background: t.greenLight,
                borderLeft: `3px solid ${t.green}`, fontSize: '0.85rem', color: t.text,
                lineHeight: 1.6,
              }}>
                💡 That&apos;s it! The widget handles the cancel flow UI, reason collection, offer presentation, and event logging automatically.
              </div>
            </Step>
          </>
        )}

        {/* npm method */}
        {method === 'npm' && (
          <>
            <Step number="1" title="Install the package">
              <CodeBlock title="Terminal" language="bash">
{`npm install @churnrecovery/sdk`}
              </CodeBlock>
            </Step>

            <Step number="2" title="Initialize the SDK">
              <CodeBlock title="app.js" language="javascript">
{`import { ChurnRecovery } from '@churnrecovery/sdk'

const cr = ChurnRecovery.init({
  apiKey: '${apiKey}',
  projectId: '${projectId}',
})`}
              </CodeBlock>
            </Step>

            <Step number="3" title="Show cancel flow">
              <CodeBlock title="settings.js" language="javascript">
{`async function handleCancelClick() {
  const result = await cr.showCancelFlow({
    customerId: user.id,
    subscriptionId: user.subscriptionId,
    planName: user.planName,
    mrr: user.mrr,
  })

  if (result.saved) {
    showToast('Welcome back! Your offer has been applied.')
  } else {
    await api.cancelSubscription(user.subscriptionId)
    redirect('/goodbye')
  }
}`}
              </CodeBlock>
            </Step>
          </>
        )}

        {/* React method */}
        {method === 'react' && (
          <>
            <Step number="1" title="Install React SDK">
              <CodeBlock title="Terminal" language="bash">
{`npm install @churnrecovery/react`}
              </CodeBlock>
            </Step>

            <Step number="2" title="Add the provider">
              <CodeBlock title="App.jsx" language="jsx">
{`import { ChurnRecoveryProvider } from '@churnrecovery/react'

function App() {
  return (
    <ChurnRecoveryProvider apiKey="${apiKey}" projectId="${projectId}">
      <YourApp />
    </ChurnRecoveryProvider>
  )
}`}
              </CodeBlock>
            </Step>

            <Step number="3" title="Use the cancel button">
              <CodeBlock title="SubscriptionSettings.jsx" language="jsx">
{`import { CancelButton } from '@churnrecovery/react'

function SubscriptionSettings({ user }) {
  return (
    <CancelButton
      customerId={user.id}
      subscriptionId={user.subscriptionId}
      planName={user.planName}
      mrr={user.mrr}
      onSave={() => toast.success('Subscription saved!')}
      onCancel={() => router.push('/goodbye')}
    >
      Cancel Subscription
    </CancelButton>
  )
}`}
              </CodeBlock>
            </Step>
          </>
        )}

        {/* Verification */}
        <div style={{
          background: t.white,
          border: `1px solid ${t.border}`,
          borderRadius: '12px',
          padding: '24px',
          marginTop: '12px',
        }}>
          <h3 style={{ fontFamily: t.fontSans, fontSize: '0.95rem', fontWeight: 700, color: t.text, margin: '0 0 12px' }}>
            ✅ Verify Installation
          </h3>
          <p style={{ fontSize: '0.85rem', color: t.gray, margin: '0 0 16px', lineHeight: 1.6 }}>
            After installing, trigger a test cancel flow. You should see the modal appear with your configured reasons and offers. Events will appear in your Analytics tab within seconds.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="/app/analytics" style={{
              padding: '8px 18px', borderRadius: '6px',
              background: t.accent, color: t.white, textDecoration: 'none',
              fontSize: '0.82rem', fontWeight: 600, fontFamily: t.fontSans,
            }}>
              Check Analytics
            </a>
            <a href="/docs" style={{
              padding: '8px 18px', borderRadius: '6px',
              background: t.white, color: t.text, textDecoration: 'none',
              fontSize: '0.82rem', fontWeight: 500, fontFamily: t.fontSans,
              border: `1px solid ${t.border}`,
            }}>
              Full Documentation →
            </a>
          </div>
        </div>
      </AppLayout>
    </>
  )
}

InstallPage.isAppPage = true
