import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { useAuthUser } from '../../lib/useAuthUser'
import { getProjects, getSettings, saveSettings } from '../../lib/localStore'

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
  blue: '#2563EB',
  blueLight: '#EFF6FF',
  red: '#DC2626',
  redLight: '#FEF2F2',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

function ConnectedState({ stripeAccount, onDisconnect, loading }) {
  return (
    <div style={{
      background: t.greenLight,
      border: `1px solid ${t.green}`,
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: t.green,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          flexShrink: 0
        }}>
          ✓
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontFamily: t.fontSans, 
            fontSize: '1.1rem', 
            fontWeight: 700, 
            color: t.green, 
            margin: '0 0 8px' 
          }}>
            Stripe Connected
          </h3>
          <p style={{ 
            fontSize: '0.9rem', 
            color: t.green, 
            margin: '0 0 16px', 
            lineHeight: 1.6 
          }}>
            Your Stripe account is connected! ChurnRecovery can now automatically apply discounts 
            and manage subscription changes when users accept your offers.
          </p>
          
          <div style={{
            background: 'rgba(255,255,255,0.6)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px'
          }}>
            <div style={{ fontSize: '0.8rem', color: t.green, fontWeight: 600, marginBottom: '4px' }}>
              Connected Account
            </div>
            <div style={{ fontSize: '0.85rem', color: t.green, fontFamily: 'monospace' }}>
              {stripeAccount?.account_id || 'acct_1234567890abcdef'}
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.6)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <h4 style={{ 
              fontSize: '0.9rem', 
              fontWeight: 600, 
              color: t.green, 
              margin: '0 0 8px',
              fontFamily: t.fontSans
            }}>
              Now You Can:
            </h4>
            <ul style={{ 
              fontSize: '0.85rem', 
              color: t.green, 
              margin: 0, 
              paddingLeft: '16px',
              lineHeight: 1.6
            }}>
              <li>Apply discounts automatically when users accept offers</li>
              <li>Pause and resume subscriptions</li>
              <li>Track revenue saved through retention offers</li>
              <li>Sync failed payment events for recovery campaigns</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link
              href="/app/dashboard"
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                background: t.green,
                color: t.white,
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 500,
                fontFamily: t.fontSans
              }}
            >
              Go to Dashboard
            </Link>
            <button
              onClick={onDisconnect}
              disabled={loading}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.8)',
                color: t.green,
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
                fontFamily: t.fontSans,
                opacity: loading ? 0.6 : 1
              }}
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
        <div style={{
          background: t.redLight,
          border: `1px solid ${t.red}`,
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '24px'
        }}>
          <div style={{ fontSize: '0.85rem', color: t.red, fontWeight: 600, marginBottom: '4px' }}>
            Connection Failed
          </div>
          <div style={{ fontSize: '0.8rem', color: t.red }}>
            {error}
          </div>
        </div>
      )}

      <div style={{
        background: t.white,
        border: `1px solid ${t.border}`,
        borderRadius: '12px',
        padding: '32px',
        textAlign: 'center',
        marginBottom: '24px'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>💳</div>
        
        <h2 style={{ 
          fontFamily: t.fontSans, 
          fontSize: '1.5rem', 
          fontWeight: 700, 
          color: t.text, 
          margin: '0 0 12px' 
        }}>
          Connect Your Stripe Account
        </h2>
        
        <p style={{ 
          fontFamily: t.fontSerif, 
          fontSize: '0.95rem', 
          color: t.gray, 
          margin: '0 0 32px', 
          lineHeight: 1.7,
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Connect your Stripe account to automatically apply retention offers and track revenue impact. 
          Your data stays secure and we only access what's necessary for churn recovery.
        </p>

        <button
          onClick={onConnect}
          disabled={loading}
          style={{
            padding: '16px 32px',
            borderRadius: '8px',
            background: loading ? t.grayLight : t.accent,
            color: t.white,
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '1rem',
            fontFamily: t.fontSans,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading && (
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderTop: '2px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          )}
          {loading ? 'Connecting...' : 'Connect with Stripe'}
        </button>

        <div style={{ 
          fontSize: '0.8rem', 
          color: t.grayLight, 
          marginTop: '16px',
          lineHeight: 1.5
        }}>
          Secure connection via Stripe Connect • No sensitive data stored
        </div>
      </div>

      {/* Benefits section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
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
            style={{
              background: t.white,
              border: `1px solid ${t.border}`,
              borderRadius: '8px',
              padding: '20px'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{benefit.icon}</div>
            <h3 style={{ 
              fontFamily: t.fontSans, 
              fontSize: '0.95rem', 
              fontWeight: 600, 
              color: t.text, 
              margin: '0 0 8px' 
            }}>
              {benefit.title}
            </h3>
            <p style={{ 
              fontSize: '0.8rem', 
              color: t.gray, 
              margin: 0, 
              lineHeight: 1.6 
            }}>
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      {/* Manual alternative */}
      <div style={{
        background: t.blueLight,
        border: `1px solid ${t.blue}`,
        borderRadius: '8px',
        padding: '16px'
      }}>
        <div style={{ fontSize: '0.85rem', color: t.blue, fontWeight: 600, marginBottom: '4px' }}>
          💡 Not using Stripe?
        </div>
        <div style={{ fontSize: '0.8rem', color: t.blue }}>
          You can still collect cancel reasons and show retention offers. Just handle the fulfillment manually when users accept.{' '}
          <Link href="/app/dashboard" style={{ color: t.blue, fontWeight: 500 }}>
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
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '0.9rem', color: t.gray }}>Loading...</div>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.8rem', color: t.grayLight, fontWeight: 500 }}>Project:</span>
            <select
              value={activeProject?.id || ''}
              onChange={e => {
                const project = projects.find(p => p.id === e.target.value)
                setActiveProject(project)
                if (project) {
                  setSettings(getSettings(project.id))
                }
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: `1px solid ${t.border}`,
                fontFamily: t.fontSans,
                fontSize: '0.85rem',
                background: t.white,
                color: t.text
              }}
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        )}

        <div style={{ maxWidth: '700px' }}>
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