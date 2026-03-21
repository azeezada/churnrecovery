import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { useAuthUser } from '../../lib/useAuthUser'
import { getProjects, getSettings, saveSettings } from '../../lib/localStore'

function ConnectedState({ stripeAccount, onDisconnect, loading }) {
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

          <div className="bg-white/60 rounded-lg px-4 py-3 mb-4">
            <div className="text-[0.8rem] text-brand-green font-semibold mb-1">
              Connected Account
            </div>
            <div className="text-[0.85rem] text-brand-green font-mono">
              {stripeAccount?.account_id || 'acct_1234567890abcdef'}
            </div>
          </div>

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
          Your data stays secure and we only access what's necessary for churn recovery.
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
  const { user, isLoaded } = useAuthUser()
  const router = useRouter()
  const [projects, setProjects] = useState([])
  const [activeProject, setActiveProject] = useState(null)
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Handle OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const state = urlParams.get('state')
    const errorParam = urlParams.get('error')

    if (errorParam) {
      setError(`Stripe connection failed: ${errorParam}`)
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
      return
    }

    if (code && state && activeProject) {
      handleOAuthCallback(code, state)
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [activeProject])

  // Load projects and settings
  useEffect(() => {
    const allProjects = getProjects()
    setProjects(allProjects)

    if (allProjects.length > 0) {
      const project = allProjects[0] // Use first project for now
      setActiveProject(project)
      const projectSettings = getSettings(project.id)
      setSettings(projectSettings)
    }
  }, [])

  const handleOAuthCallback = async (code, state) => {
    if (!activeProject) return

    setLoading(true)
    setError(null)

    try {
      // In a real implementation, this would call your backend API
      // For now, we'll simulate a successful connection
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call

      const mockStripeAccount = {
        account_id: 'acct_' + Math.random().toString(36).slice(2, 16),
        connected_at: new Date().toISOString(),
        charges_enabled: true,
        details_submitted: true,
        display_name: 'Demo Business'
      }

      const updatedSettings = {
        ...settings,
        stripeConnected: true,
        stripeAccount: mockStripeAccount
      }

      saveSettings(activeProject.id, updatedSettings)
      setSettings(updatedSettings)

    } catch (err) {
      setError(err.message || 'Failed to connect Stripe account')
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = () => {
    if (!activeProject) return

    setLoading(true)
    setError(null)

    // Generate OAuth state for security
    const state = Math.random().toString(36).slice(2, 16)

    // In a real implementation, you'd redirect to Stripe's OAuth URL
    const stripeOAuthUrl = `https://connect.stripe.com/oauth/authorize?` +
      `response_type=code&` +
      `client_id=${process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID || 'ca_demo123'}&` +
      `scope=read_write&` +
      `redirect_uri=${encodeURIComponent(window.location.origin + '/app/connect-stripe')}&` +
      `state=${state}`

    // For demo purposes, we'll simulate the OAuth flow
    setTimeout(() => {
      const searchParams = new URLSearchParams({
        code: 'ac_' + Math.random().toString(36).slice(2, 16),
        state: state
      })
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`
      window.history.pushState({}, '', newUrl)

      // Trigger the callback handler
      handleOAuthCallback(searchParams.get('code'), searchParams.get('state'))
    }, 1000)

    // In production, you'd use:
    // window.location.href = stripeOAuthUrl
  }

  const handleDisconnect = () => {
    if (!confirm('Are you sure you want to disconnect Stripe? This will disable automatic offer fulfillment.')) {
      return
    }

    setLoading(true)

    setTimeout(() => {
      const updatedSettings = {
        ...settings,
        stripeConnected: false,
        stripeAccount: null
      }
      saveSettings(activeProject.id, updatedSettings)
      setSettings(updatedSettings)
      setLoading(false)
    }, 1000)
  }

  if (!isLoaded || !activeProject || !settings) {
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
                if (project) {
                  setSettings(getSettings(project.id))
                }
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
          {settings.stripeConnected ? (
            <ConnectedState
              stripeAccount={settings.stripeAccount}
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
