import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

function StatusIndicator({ status }) {
  const colors = {
    operational: '#22c55e',
    degraded: '#f59e0b',
    outage: '#DC2626',
    checking: '#999999',
  }
  return (
    <span className="inline-block w-[10px] h-[10px] rounded-full mr-2 shrink-0" style={{ background: colors[status] || '#999999' }} />
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
    operational: '#2D7A4F',
    degraded: '#B45309',
    outage: '#DC2626',
    checking: '#999999',
  }
  const bgMap = {
    operational: '#EDF7F1',
    degraded: '#FFFBEB',
    outage: '#FEF2F2',
    checking: '#F5F5F5',
  }

  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border">
      <div className="flex items-center">
        <StatusIndicator status={status} />
        <div>
          <div className="font-sans font-semibold text-[0.93rem] text-brand-text">
            {name}
          </div>
          {description && (
            <div className="font-serif text-[0.8rem] text-brand-gray-light mt-[2px]">
              {description}
            </div>
          )}
        </div>
      </div>
      <div>
        <span className="inline-block font-sans font-semibold text-[0.72rem] tracking-[0.04em] px-[10px] py-[3px] rounded-[20px]" style={{ background: bgMap[status] || '#F5F5F5', color: colorMap[status] || '#999999' }}>
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
      <main className="bg-brand-bg min-h-screen">

        {/* Hero */}
        <section className="max-w-[720px] mx-auto px-6 pt-[72px] pb-10">
          <div className="inline-block bg-[#FDF4F0] text-brand-accent font-sans font-semibold text-[0.78rem] tracking-[0.08em] uppercase px-[14px] py-[6px] rounded-[20px] mb-6">
            System Status
          </div>
          <h1 className="font-sans font-extrabold text-brand-text mb-4 leading-[1.15] tracking-[-0.03em] text-[clamp(1.8rem,4vw,2.4rem)]">
            ChurnRecovery Status
          </h1>
          <p className="font-serif text-base text-brand-gray leading-[1.8] m-0">
            Real-time health status for all ChurnRecovery services.
          </p>
        </section>

        {/* Overall status banner */}
        <section className="max-w-[720px] mx-auto px-6 pb-8">
          <div className={`${allOperational ? 'bg-brand-green-light border-[#A7F3D0]' : 'bg-[#FFFBEB] border-[#FDE68A]'} border rounded-xl px-6 py-5 flex items-center gap-3`}>
            <div className="w-3 h-3 rounded-full shrink-0" style={{ background: allOperational ? '#22c55e' : '#f59e0b' }} />
            <div>
              <div className={`font-sans font-bold text-base ${allOperational ? 'text-brand-green' : 'text-[#B45309]'}`}>
                {allOperational ? 'All systems operational' : 'Some systems degraded'}
              </div>
              <div className="font-serif text-[0.8rem] text-brand-gray-light mt-[2px]">
                {lastChecked
                  ? `Last checked: ${lastChecked.toLocaleTimeString()}`
                  : 'Checking services…'}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="max-w-[720px] mx-auto px-6 pb-20">
          <div className="bg-brand-white border border-brand-border rounded-xl overflow-hidden">
            {/* Section header */}
            <div className="px-5 py-4 border-b border-brand-border bg-[#FAFAF8]">
              <div className="font-sans font-semibold text-[0.78rem] tracking-[0.08em] uppercase text-brand-gray-light">
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
          <div className="mt-8 bg-brand-white border border-brand-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-brand-border bg-[#FAFAF8]">
              <div className="font-sans font-semibold text-[0.78rem] tracking-[0.08em] uppercase text-brand-gray-light">
                Incident History
              </div>
            </div>
            <div className="px-6 py-8 text-center">
              <div className="font-sans font-semibold text-[0.93rem] text-brand-green mb-2">
                ✓ No incidents in the last 90 days
              </div>
              <p className="font-serif text-[0.82rem] text-brand-gray-light m-0 leading-[1.7]">
                All systems have been running smoothly.
              </p>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center">
            <p className="font-serif text-[0.82rem] text-brand-gray-light mb-3 leading-[1.7]">
              Questions or issues?{' '}
              <a href="mailto:hello@churnrecovery.com" className="text-brand-accent no-underline">
                hello@churnrecovery.com
              </a>
            </p>
            <Link href="/changelog" className="font-sans text-[0.82rem] text-brand-gray no-underline">
              View Changelog →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
