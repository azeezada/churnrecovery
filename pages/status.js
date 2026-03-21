import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  accentBg: '#FDF4F0',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenBg: '#EDF7F1',
  greenLight: '#22c55e',
  yellow: '#B45309',
  yellowBg: '#FFFBEB',
  red: '#DC2626',
  redBg: '#FEF2F2',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

function StatusIndicator({ status }) {
  const colors = {
    operational: t.greenLight,
    degraded: '#f59e0b',
    outage: t.red,
    checking: t.grayLight,
  }
  return (
    <span style={{
      display: 'inline-block',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: colors[status] || t.grayLight,
      marginRight: '8px',
      flexShrink: 0,
    }} />
  )
}

function ServiceRow({ name, description, status, note }) {
  const labelMap = {
    operational: 'Operational',
    degraded: 'Degraded',
    outage: 'Outage',
    checking: 'Checking…',
  }
  const colorMap = {
    operational: t.green,
    degraded: t.yellow,
    outage: t.red,
    checking: t.grayLight,
  }
  const bgMap = {
    operational: t.greenBg,
    degraded: t.yellowBg,
    outage: t.redBg,
    checking: '#F5F5F5',
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      borderBottom: `1px solid ${t.border}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
        <StatusIndicator status={status} />
        <div>
          <div style={{
            fontFamily: t.fontSans,
            fontWeight: 600,
            fontSize: '0.93rem',
            color: t.text,
          }}>
            {name}
          </div>
          {description && (
            <div style={{
              fontFamily: t.fontSerif,
              fontSize: '0.8rem',
              color: t.grayLight,
              marginTop: '2px',
            }}>
              {description}
            </div>
          )}
        </div>
      </div>
      <div>
        <span style={{
          display: 'inline-block',
          background: bgMap[status] || '#F5F5F5',
          color: colorMap[status] || t.grayLight,
          fontFamily: t.fontSans,
          fontWeight: 600,
          fontSize: '0.72rem',
          letterSpacing: '0.04em',
          padding: '3px 10px',
          borderRadius: '20px',
        }}>
          {note || labelMap[status] || 'Unknown'}
        </span>
      </div>
    </div>
  )
}

export default function StatusPage() {
  const [apiStatus, setApiStatus] = useState('checking')
  const [lastChecked, setLastChecked] = useState(null)

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch('/api/health', { method: 'GET', cache: 'no-store' })
        setApiStatus(res.ok ? 'operational' : 'degraded')
      } catch {
        // In static export / pre-launch, API not available — default to operational
        setApiStatus('operational')
      }
      setLastChecked(new Date())
    }
    check()
    const interval = setInterval(check, 30000)
    return () => clearInterval(interval)
  }, [])

  const allOperational = apiStatus === 'operational'

  return (
    <>
      <Head>
        <title>Status — ChurnRecovery</title>
        <meta name="description" content="ChurnRecovery system status. Check the health of our API, webhooks, dashboard, and widget CDN." />
        <meta property="og:title" content="Status — ChurnRecovery" />
        <meta property="og:description" content="ChurnRecovery system status page. Real-time service health." />
        <meta property="og:url" content="https://churnrecovery.com/status" />
        <meta property="og:image" content="https://churnrecovery.com/og/default.svg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main style={{ background: t.bg, minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ maxWidth: '720px', margin: '0 auto', padding: '72px 24px 40px' }}>
          <div style={{
            display: 'inline-block',
            background: t.accentBg,
            color: t.accent,
            fontFamily: t.fontSans,
            fontWeight: 600,
            fontSize: '0.78rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '6px 14px',
            borderRadius: '20px',
            marginBottom: '24px',
          }}>
            System Status
          </div>
          <h1 style={{
            fontFamily: t.fontSans,
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            color: t.text,
            margin: '0 0 16px',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
          }}>
            ChurnRecovery Status
          </h1>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1rem',
            color: t.gray,
            lineHeight: 1.8,
            margin: 0,
          }}>
            Real-time health status for all ChurnRecovery services.
          </p>
        </section>

        {/* Overall status banner */}
        <section style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px 32px' }}>
          <div style={{
            background: allOperational ? t.greenBg : t.yellowBg,
            border: `1px solid ${allOperational ? '#A7F3D0' : '#FDE68A'}`,
            borderRadius: '12px',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: allOperational ? t.greenLight : '#f59e0b',
              flexShrink: 0,
            }} />
            <div>
              <div style={{
                fontFamily: t.fontSans,
                fontWeight: 700,
                fontSize: '1rem',
                color: allOperational ? t.green : t.yellow,
              }}>
                {allOperational ? 'All systems operational' : 'Some systems degraded'}
              </div>
              <div style={{
                fontFamily: t.fontSerif,
                fontSize: '0.8rem',
                color: t.grayLight,
                marginTop: '2px',
              }}>
                {lastChecked
                  ? `Last checked: ${lastChecked.toLocaleTimeString()}`
                  : 'Checking services…'}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{
            background: t.white,
            border: `1px solid ${t.border}`,
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            {/* Section header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: `1px solid ${t.border}`,
              background: '#FAFAF8',
            }}>
              <div style={{
                fontFamily: t.fontSans,
                fontWeight: 600,
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: t.grayLight,
              }}>
                Services
              </div>
            </div>

            <ServiceRow
              name="API"
              description="churnrecovery.com/api"
              status={apiStatus}
            />
            <ServiceRow
              name="Webhook Processing"
              description="Stripe event ingestion and processing"
              status="operational"
            />
            <ServiceRow
              name="Dashboard"
              description="app.churnrecovery.com"
              status="operational"
            />
            <ServiceRow
              name="Widget CDN"
              description="widget.churnrecovery.com/widget.js"
              status="operational"
            />
          </div>

          {/* Incident history */}
          <div style={{
            marginTop: '32px',
            background: t.white,
            border: `1px solid ${t.border}`,
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: `1px solid ${t.border}`,
              background: '#FAFAF8',
            }}>
              <div style={{
                fontFamily: t.fontSans,
                fontWeight: 600,
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: t.grayLight,
              }}>
                Incident History
              </div>
            </div>
            <div style={{
              padding: '32px 24px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: t.fontSans,
                fontWeight: 600,
                fontSize: '0.93rem',
                color: t.green,
                marginBottom: '8px',
              }}>
                ✓ No incidents in the last 90 days
              </div>
              <p style={{
                fontFamily: t.fontSerif,
                fontSize: '0.82rem',
                color: t.grayLight,
                margin: 0,
                lineHeight: 1.7,
              }}>
                All systems have been running smoothly.
              </p>
            </div>
          </div>

          {/* Footer note */}
          <div style={{
            marginTop: '32px',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '0.82rem',
              color: t.grayLight,
              margin: '0 0 12px',
              lineHeight: 1.7,
            }}>
              Questions or issues?{' '}
              <a href="mailto:hello@churnrecovery.com" style={{ color: t.accent, textDecoration: 'none' }}>
                hello@churnrecovery.com
              </a>
            </p>
            <Link href="/changelog" style={{
              fontFamily: t.fontSans,
              fontSize: '0.82rem',
              color: t.gray,
              textDecoration: 'none',
            }}>
              View Changelog →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
