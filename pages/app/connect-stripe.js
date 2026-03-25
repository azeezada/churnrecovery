import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { useAuthUser } from '../../lib/useAuthUser'
import { getProjects } from '../../lib/localStore'
import { apiFetch } from '../../lib/useApi'

function ConnectedState({ accountId, connectedAt, livemode, onDisconnect, loading }) {
  return (
    <div className="bg-brand-green-light border border-brand-green rounded-xl p-6 mb-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center text-[1.5rem] shrink-0">
          ✓
        </div>
        <div className="flex-1">
          <h3 className="font-sans text-[1.1rem] font-bold text-brand-green m-0 mb-2">
            Stripe Connected
          </h3>
          <p className="text-[0.9rem] text-brand-green m-0 mb-4 leading-[1.6]">
            Your Stripe account is connected! ChurnRecovery can now automatically apply discounts
            and manage subscription changes when users accept your offers.
          </p>

          <div className="bg-white/60 rounded-lg px-4 py-3 mb-2">
            <div className="text-[0.8rem] text-brand-green font-semibold mb-1">
              Connected Account
            </div>
            <div className="text-[0.85rem] text-brand-green font-mono">
              {accountId || 'acct_...'}
            </div>
          </div>

          {connectedAt && (
            <div className="text-[0.75rem] text-brand-green opacity-70 mb-4 pl-1">
              Connected {new Date(connectedAt).toLocaleDateString()} •{' '}
              {livemode ? '🟢 Live mode' : '🟡 Test mode'}
            </div>
          )}

          <div className="bg-white/60 rounded-lg p-4 mb-4">
            <h4 className="text-[0.9rem] font-semibold text-brand-green m-0 mb-2 font-sans">
              Now You Can:
            </h4>
            <ul className="text-[0.85rem] text-brand-green m-0 pl-4 leading-[1.6]">
              <li>Apply discounts automatically when users accept offers</li>
              <li>Pause and resume subscriptions</li>
              <li>Track revenue saved through retention offers</li>
              <li>Sync failed payment events for recovery campaigns</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Link
              href="/app/dashboard"
              className="px-4 py-2 rounded-md bg-brand-green text-brand-white no-underline text-[0.85rem] font-medium font-sans"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={onDisconnect}
              disabled={loading}
              className={`px-4 py-2 rounded-md bg-white/80 text-brand-green border-none text-[0.85rem] font-medium font-sans ${
                loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer opacity-100'
              }`}
            >
              {loading ? 'Disconnecting...' : 'Disconnect'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DisconnectedState({ onConnect, loading, error }) {
  return (
    <>
      {error && (
        <div className="bg-[#FEF2F2] border border-brand-red rounded-lg px-4 py-3 mb-6">
          <div className="text-[0.85rem] text-brand-red font-semibold mb-1">
            Connection Failed
          </div>
          <div className="text-[0.8rem] text-brand-red">
            {error}
          </div>
        </div>
      )}

      <div className="bg-brand-white border border-brand-border rounded-xl p-8 text-center mb-6">
        <div className="text-[4rem] mb-4">💳</div>

        <h2 className="font-sans text-[1.5rem] font-bold text-brand-text m-0 mb-3">
          Connect Your Stripe Account
        </h2>

        <p className="font-serif text-[0.95rem] text-brand-gray m-0 mb-8 leading-[1.7] max-w-[500px] mx-auto">
          Connect your Stripe account to automatically apply retention offers and track revenue impact.
          Your data stays secure and we only access what&apos;s necessary for churn recovery.
        </p>

        <button
          onClick={onConnect}
          disabled={loading}
          className={`px-8 py-4 rounded-lg text-brand-white border-none font-semibold text-[1rem] font-sans inline-flex items-center gap-2 ${
            loading ? 'bg-brand-gray-light cursor-not-allowed opacity-70' : 'bg-brand-accent cursor-pointer opacity-100'
          }`}
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-2 border-t-white rounded-full animate-spin" />
          )}
          {loading ? 'Connecting...' : 'Connect with Stripe'}
        </button>

        <div className="text-[0.8rem] text-brand-gray-light mt-4 leading-[1.5]">
          Secure connection via Stripe Connect • No sensitive data stored
        </div>
      </div>

      {/* Benefits section */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 mb-6">
        {[
          {
            icon: '⚡',
            title: 'Automatic Offers',
            description: 'Apply discounts and pauses instantly when users accept retention offers'
          },
          {
            icon: '📊',
            title: 'Revenue Tracking',
            description: 'See exactly how much revenue you\'re saving with detailed analytics'
          },
          {
            icon: '🔄',
            title: 'Failed Payment Recovery',
            description: 'Automatically detect failed payments and trigger recovery flows'
          },
          {
            icon: '🔒',
            title: 'Secure & Compliant',
            description: 'Bank-level security with PCI compliance through Stripe Connect'
          }
        ].map((benefit, i) => (
          <div
            key={i}
            className="bg-brand-white border border-brand-border rounded-lg p-5"
          >
            <div className="text-[2rem] mb-3">{benefit.icon}</div>
            <h3 className="font-sans text-[0.95rem] font-semibold text-brand-text m-0 mb-2">
              {benefit.title}
            </h3>
            <p className="text-[0.8rem] text-brand-gray m-0 leading-[1.6]">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      {/* Manual alternative */}
      <div className="bg-brand-blue-light border border-brand-blue rounded-lg p-4">
        <div className="text-[0.85rem] text-brand-blue font-semibold mb-1">
          💡 Not using Stripe?
        </div>
        <div className="text-[0.8rem] text-brand-blue">
          You can still collect cancel reasons and show retention offers. Just handle the fulfillment manually when users accept.{' '}
          <Link href="/app/dashboard" className="text-brand-blue font-medium">
            Skip to dashboard →
          </Link>
        </div>
      </div>
    </>
  )
}

export default function ConnectStripePage() {
  const { isLoaded } = useAuthUser()
  const [projects, setProjects] = useState([])
  const [activeProject, setActiveProject] = useState(null)
  const [connectState, setConnectState] = useState(null) // { connected, account_id, connected_at, livemode }
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const callbackProcessed = useRef(false)

  // Load projects from API, fall back to localStore
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await apiFetch('/api/projects')
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects)
          setActiveProject(data.projects[0])
          return
        }
      } catch {
        // fall through to localStore
      }
      const local = getProjects()
      setProjects(local)
      if (local.length > 0) setActiveProject(local[0])
    }
    loadProjects()
  }, [])

  // When project is selected, fetch Stripe Connect status from API
  useEffect(() => {
    if (!activeProject) return
    async function loadConnectStatus() {
      try {
        const data = await apiFetch(`/api/stripe-connect?project_id=${activeProject.id}`)
        setConnectState({
          connected: data.connected,
          account_id: data.account_id,
          connected_at: data.connected_at,
          livemode: data.livemode,
        })
      } catch {
        // API not available — fall back to not connected
        setConnectState({ connected: false, account_id: null, connected_at: null, livemode: false })
      }
    }
    loadConnectStatus()
  }, [activeProject])

  // Handle OAuth callback (code + state in URL)
  useEffect(() => {
    if (!activeProject || callbackProcessed.current) return

    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const state = urlParams.get('state')
    const errorParam = urlParams.get('error')
    const errorDesc = urlParams.get('error_description')

    // Clean up URL immediately
    if (code || errorParam) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    if (errorParam) {
      setError(`Stripe connection failed: ${errorDesc || errorParam}`)
      return
    }

    if (code && state) {
      callbackProcessed.current = true
      handleOAuthCallback(code, state)
    }
  }, [activeProject]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleOAuthCallback = async (code, state) => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiFetch('/api/stripe-connect', {
        method: 'POST',
        body: { code, state },
      })
      setConnectState({
        connected: true,
        account_id: data.account_id,
        connected_at: data.connected_at,
        livemode: data.livemode,
      })
    } catch (err) {
      setError(err.message || 'Failed to connect Stripe account')
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async () => {
    if (!activeProject) return
    setLoading(true)
    setError(null)
    try {
      const data = await apiFetch(`/api/stripe-connect?project_id=${activeProject.id}`)
      if (data.oauth_url) {
        // Redirect to Stripe's OAuth page
        window.location.href = data.oauth_url
      } else {
        setError('Could not start Stripe connection. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      setError(err.message || 'Failed to start Stripe connection')
      setLoading(false)
    }
  }

  const handleDisconnect = async () => {
    if (!confirm('Are you sure you want to disconnect Stripe? This will disable automatic offer fulfillment.')) {
      return
    }
    if (!activeProject) return
    setLoading(true)
    setError(null)
    try {
      await apiFetch('/api/stripe-connect', {
        method: 'DELETE',
        body: { project_id: activeProject.id },
      })
      setConnectState({ connected: false, account_id: null, connected_at: null, livemode: false })
    } catch (err) {
      setError(err.message || 'Failed to disconnect Stripe account')
    } finally {
      setLoading(false)
    }
  }

  const isReady = isLoaded && activeProject && connectState !== null

  if (!isReady) {
    return (
      <>
        <Head>
          <title>Connect Stripe — ChurnRecovery</title>
        </Head>
        <AppLayout title="Connect Stripe">
          <div className="text-center p-[60px]">
            <div className="text-[0.9rem] text-brand-gray">Loading...</div>
          </div>
        </AppLayout>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Connect Stripe — ChurnRecovery</title>
      </Head>
      <AppLayout title="Connect Stripe">
        {projects.length > 1 && (
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[0.8rem] text-brand-gray-light font-medium">Project:</span>
            <select
              value={activeProject?.id || ''}
              onChange={e => {
                const project = projects.find(p => p.id === e.target.value)
                setActiveProject(project)
                setConnectState(null)
              }}
              className="px-3 py-1.5 rounded-md border border-brand-border font-sans text-[0.85rem] bg-brand-white text-brand-text"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="max-w-[700px]">
          {connectState.connected ? (
            <ConnectedState
              accountId={connectState.account_id}
              connectedAt={connectState.connected_at}
              livemode={connectState.livemode}
              onDisconnect={handleDisconnect}
              loading={loading}
            />
          ) : (
            <DisconnectedState
              onConnect={handleConnect}
              loading={loading}
              error={error}
            />
          )}
        </div>

        <style jsx global>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </AppLayout>
    </>
  )
}

ConnectStripePage.isAppPage = true
