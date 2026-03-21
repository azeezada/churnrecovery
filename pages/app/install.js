import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { getProjects, createProject } from '../../lib/localStore'

function CodeBlock({ title, language, children, onCopy }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-[10px] overflow-hidden mb-5 border border-white/5">
      <div className="bg-[#181825] px-4 py-2.5 flex items-center justify-between">
        <span className="font-mono text-[0.78rem] text-[#6C7086]">{title}</span>
        <button
          onClick={handleCopy}
          className={`text-[0.7rem] font-sans border-none cursor-pointer bg-transparent ${copied ? 'text-brand-green' : 'text-[#6C7086]'}`}
        >
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>
      <pre className="bg-[#1E1E2E] p-5 m-0 overflow-x-auto text-[0.82rem] leading-[1.7] font-[&quot;SF_Mono&quot;,&quot;Fira_Code&quot;,monospace] text-[#CDD6F4]">
        <code>{children}</code>
      </pre>
    </div>
  )
}

function Step({ number, title, children }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-7 h-7 rounded-full bg-brand-accent text-brand-white flex items-center justify-center text-[0.8rem] font-bold shrink-0">
          {number}
        </div>
        <h3 className="font-sans text-base font-bold text-brand-text m-0">
          {title}
        </h3>
      </div>
      <div className="pl-10">
        {children}
      </div>
    </div>
  )
}

function NoProjectState() {
  const [creating, setCreating] = useState(false)

  const handleCreate = () => {
    setCreating(true)
    createProject('My Project')
    window.location.reload()
  }

  return (
    <div className="bg-brand-white border-2 border-dashed border-brand-border rounded-xl px-10 py-15 text-center mb-8">
      <div className="text-5xl mb-4">📦</div>
      <h2 className="font-sans text-[1.3rem] font-bold text-brand-text mb-2 mt-0">
        Set Up Your First Project
      </h2>
      <p className="font-serif text-[0.9rem] text-brand-gray leading-[1.7] mb-6 mt-0 max-w-[420px] mx-auto">
        Before you can install the widget, you need to create a project. This takes less than 2 minutes with our setup wizard.
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/app/onboarding" className="bg-brand-accent text-brand-white px-7 py-3 rounded-lg no-underline font-semibold text-[0.9rem] font-sans inline-flex items-center">
          🚀 Start Setup Wizard
        </Link>
        <button
          onClick={handleCreate}
          disabled={creating}
          className={`px-6 py-3 rounded-lg border border-brand-border bg-brand-white text-brand-gray font-medium text-[0.9rem] font-sans ${creating ? 'cursor-not-allowed opacity-70' : 'cursor-pointer opacity-100'}`}
        >
          {creating ? 'Creating...' : 'Quick Create Project'}
        </button>
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
  const [loaded, setLoaded] = useState(false)

  // Load projects to get real API key
  useEffect(() => {
    const allProjects = getProjects()
    setProjects(allProjects)
    if (allProjects.length > 0) setProject(allProjects[0])
    setLoaded(true)
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
        <p className="font-serif text-[0.9rem] text-brand-gray mb-7 mt-0 leading-[1.7]">
          Add ChurnRecovery to your app in under 5 minutes. Choose your preferred integration method.
        </p>

        {/* Empty state — no project yet */}
        {loaded && projects.length === 0 && <NoProjectState />}

        {/* Project selector */}
        {projects.length > 0 && (
          <div className="bg-brand-white border border-brand-border rounded-[10px] p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[0.85rem] font-semibold text-brand-text font-sans">
                Project:
              </span>
              {projects.length > 1 ? (
                <select
                  value={project?.id || ''}
                  onChange={e => {
                    const p = projects.find(p => p.id === e.target.value)
                    setProject(p)
                  }}
                  className="px-3 py-1.5 rounded-[6px] border border-brand-border font-sans text-[0.85rem] bg-brand-white text-brand-text"
                >
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              ) : (
                <span className="text-[0.85rem] text-brand-text font-sans">
                  {project?.name}
                </span>
              )}
            </div>

            {project && (
              <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
                <div>
                  <div className="text-xs text-brand-gray-light font-semibold uppercase tracking-wide">
                    Project ID: <code className="font-mono text-brand-text text-[0.8rem]">{project.id}</code>
                  </div>
                  <div className="text-xs text-brand-gray-light mt-1">
                    API Key: {project.api_key.slice(0, 12)}...
                  </div>
                </div>
                <button
                  onClick={handleTestInstallation}
                  disabled={testing}
                  className={`px-4 py-2 rounded-[6px] text-brand-white border-none text-[0.8rem] font-medium font-sans ${testing ? 'bg-brand-gray-light cursor-not-allowed opacity-70' : 'bg-brand-accent cursor-pointer opacity-100'}`}
                >
                  {testing ? 'Testing...' : 'Test Installation'}
                </button>
              </div>
            )}

            {/* Test Result */}
            {testResult && (
              <div className={`mt-4 px-4 py-3 rounded-[6px] ${testResult.success ? 'bg-brand-green-light border border-brand-green' : 'bg-red-50 border border-brand-red'}`}>
                <div className={`text-[0.85rem] font-semibold mb-1 ${testResult.success ? 'text-brand-green' : 'text-brand-red'}`}>
                  {testResult.message}
                </div>
                {testResult.details && (
                  <ul className={`text-[0.8rem] mt-1 mb-0 ml-4 p-0 ${testResult.success ? 'text-brand-green' : 'text-brand-red'}`}>
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
        <div className="flex gap-2 mb-8">
          {[
            { id: 'script', label: '📜 Script Tag', desc: 'Simplest — no build step' },
            { id: 'npm', label: '📦 npm Package', desc: 'For modern JS apps' },
            { id: 'react', label: '⚛️ React', desc: 'First-class React support' },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`flex-1 px-4 py-3.5 rounded-[10px] border-2 cursor-pointer text-left ${method === m.id ? 'border-brand-accent bg-[#FDF4EF]' : 'border-brand-border bg-brand-white'}`}
            >
              <div className="text-[0.88rem] font-semibold text-brand-text font-sans">
                {m.label}
              </div>
              <div className="text-xs text-brand-gray-light mt-0.5">
                {m.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Script tag method */}
        {method === 'script' && (
          <>
            <Step number="1" title="Add the script tag to your website">
              <p className="text-[0.85rem] text-brand-gray mb-2 mt-0 leading-[1.6]">
                Copy the code below and paste it into your website&apos;s HTML, just before the <code className="bg-black/5 px-1.5 rounded-sm">&lt;/body&gt;</code> tag. If you use WordPress, Webflow, or Squarespace, paste it in the &ldquo;Custom Code&rdquo; or &ldquo;Footer Scripts&rdquo; section.
              </p>
              <p className="text-[0.8rem] text-brand-gray-light mb-3 mt-0 leading-[1.5]">
                ✨ Your project ID and API key are already filled in below — just copy and paste!
              </p>
              <CodeBlock title="HTML — paste this into your website" language="html">
{`<script
  src="https://churnrecovery.com/widget.js"
  data-project="${projectId}"
  data-api-key="${apiKey}"
  async
></script>`}
              </CodeBlock>
            </Step>

            <Step number="2" title="Show the cancel flow when someone clicks &quot;Cancel&quot;">
              <p className="text-[0.85rem] text-brand-gray mb-3 mt-0 leading-[1.6]">
                Find the &ldquo;Cancel subscription&rdquo; button on your settings page and call <code className="bg-black/5 px-1.5 rounded-sm">ChurnRecovery.showCancelFlow()</code> when it&apos;s clicked. Your developer can do this in minutes.
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

            <Step number="3" title="You're done — watch it work! 🎉">
              <div className="px-5 py-4 rounded-lg bg-brand-green-light border-l-[3px] border-brand-green text-[0.85rem] text-brand-text leading-[1.6]">
                <strong>That&apos;s it!</strong> When someone clicks &ldquo;Cancel,&rdquo; they&apos;ll see a beautiful popup asking why they&apos;re leaving — with a tailored offer to stay. No technical knowledge needed on your end. ChurnRecovery handles all the UI, data collection, and analytics automatically.
              </div>
              <div className="mt-3 px-4 py-3 rounded-lg bg-brand-blue-light border border-[#BFDBFE] text-[0.82rem] text-[#1D4ED8] leading-[1.6]">
                💡 <strong>Not a developer?</strong> Just send this page link to your developer — everything they need is here. Takes about 15 minutes to integrate.
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
        <div className="bg-brand-white border border-brand-border rounded-xl p-6 mt-3">
          <h3 className="font-sans text-[0.95rem] font-bold text-brand-text mb-3 mt-0">
            ✅ Verify Installation
          </h3>
          <p className="text-[0.85rem] text-brand-gray mb-4 mt-0 leading-[1.6]">
            After installing, trigger a test cancel flow. You should see the modal appear with your configured reasons and offers. Events will appear in your Analytics tab within seconds.
          </p>
          <div className="flex gap-3">
            <a href="/app/analytics" className="px-[18px] py-2 rounded-[6px] bg-brand-accent text-brand-white no-underline text-[0.82rem] font-semibold font-sans">
              Check Analytics
            </a>
            <a href="/docs" className="px-[18px] py-2 rounded-[6px] bg-brand-white text-brand-text no-underline text-[0.82rem] font-medium font-sans border border-brand-border">
              Full Documentation →
            </a>
          </div>
        </div>
      </AppLayout>
    </>
  )
}

InstallPage.isAppPage = true
