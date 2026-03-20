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
  red: '#DC2626',
  redLight: '#FEF2F2',
  blue: '#2563EB',
  blueLight: '#EFF6FF',
  yellow: '#D97706',
  yellowLight: '#FFFBEB',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

// Generate realistic-looking demo failed payment data
function makeDemoPayments() {
  const customers = [
    { email: 'john@acme.io', name: 'John Mercer', amount: 9900 },
    { email: 'sarah@growthco.com', name: 'Sarah Chen', amount: 24900 },
    { email: 'mike@devtools.io', name: 'Mike Patel', amount: 4900 },
    { email: 'lisa@startup.co', name: 'Lisa Wang', amount: 9900 },
    { email: 'dave@techhq.com', name: 'Dave Okafor', amount: 49900 },
    { email: 'amy@saaslab.io', name: 'Amy Kowalski', amount: 9900 },
    { email: 'tom@founders.co', name: 'Tom Nakamura', amount: 29900 },
    { email: 'nina@cloudapp.io', name: 'Nina Eriksson', amount: 4900 },
    { email: 'alex@basecamp.co', name: 'Alex Rossi', amount: 24900 },
    { email: 'jay@productlab.io', name: 'Jay Flores', amount: 9900 },
    { email: 'kim@earlystage.io', name: 'Kim Osei', amount: 14900 },
    { email: 'rob@b2bsaas.com', name: 'Rob Müller', amount: 49900 },
  ]

  const statuses = ['recovered', 'recovered', 'recovered', 'pending', 'pending', 'lost']
  const reasons = [
    'Card expired', 'Insufficient funds', 'Card declined', 'Bank declined',
    'Invalid card number', 'Lost or stolen card', 'Do not honor',
  ]

  const now = Date.now()
  return customers.map((c, i) => {
    const daysAgo = Math.floor(Math.random() * 28) + 1
    const status = statuses[i % statuses.length]
    const emailsSent = status === 'recovered' ? Math.floor(Math.random() * 3) + 1
      : status === 'lost' ? 4
      : Math.floor(Math.random() * 2) + 1
    return {
      id: `fp_${i + 1}`,
      customer_email: c.email,
      customer_name: c.name,
      amount_cents: c.amount,
      stripe_invoice_id: `in_${Math.random().toString(36).slice(2, 16)}`,
      recovery_status: status,
      failure_reason: reasons[i % reasons.length],
      dunning_emails_sent: emailsSent,
      next_retry_at: status === 'pending'
        ? new Date(now + (3 - emailsSent) * 24 * 3600 * 1000).toISOString()
        : null,
      created_at: new Date(now - daysAgo * 86400000).toISOString(),
      updated_at: new Date(now - Math.floor(daysAgo * 0.5) * 86400000).toISOString(),
    }
  })
}

function StatusBadge({ status }) {
  const configs = {
    recovered: { bg: t.greenLight, color: t.green, label: '✓ Recovered' },
    pending: { bg: t.yellowLight, color: t.yellow, label: '↻ Retrying' },
    lost: { bg: t.redLight, color: t.red, label: '✗ Lost' },
  }
  const cfg = configs[status] || configs.pending
  return (
    <span style={{
      background: cfg.bg, color: cfg.color,
      padding: '2px 8px', borderRadius: '20px',
      fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap',
    }}>
      {cfg.label}
    </span>
  )
}

function MetricCard({ label, value, sub, color }) {
  return (
    <div style={{
      background: t.white, border: `1px solid ${t.border}`,
      borderRadius: '12px', padding: '24px',
    }}>
      <div style={{ fontSize: '0.72rem', color: t.grayLight, fontWeight: 600, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: color || t.text, letterSpacing: '-0.04em', lineHeight: 1 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: '0.78rem', color: t.gray, marginTop: '6px' }}>{sub}</div>}
    </div>
  )
}

function DunningProgress({ sent, max = 4 }) {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} style={{
          width: '16px', height: '16px', borderRadius: '4px',
          background: i < sent ? t.accent : t.border,
          fontSize: '0.6rem', color: i < sent ? t.white : t.grayLight,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700,
        }}>
          {i + 1}
        </div>
      ))}
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatAmount(cents) {
  return '$' + (cents / 100).toFixed(2)
}

function RecoveryRow({ payment, onViewDetails }) {
  const isPending = payment.recovery_status === 'pending'
  return (
    <tr style={{ borderBottom: `1px solid ${t.border}` }}>
      <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: t.text }}>
          {payment.customer_name || payment.customer_email}
        </div>
        <div style={{ fontSize: '0.75rem', color: t.gray, marginTop: '2px' }}>
          {payment.customer_email}
        </div>
      </td>
      <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: t.text }}>
          {formatAmount(payment.amount_cents)}
        </div>
        <div style={{ fontSize: '0.7rem', color: t.gray, marginTop: '2px' }}>
          {payment.failure_reason}
        </div>
      </td>
      <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
        <StatusBadge status={payment.recovery_status} />
      </td>
      <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
        <DunningProgress sent={payment.dunning_emails_sent} />
        <div style={{ fontSize: '0.7rem', color: t.gray, marginTop: '4px' }}>
          {payment.dunning_emails_sent}/4 emails sent
        </div>
      </td>
      <td style={{ padding: '14px 16px', verticalAlign: 'middle', fontSize: '0.8rem', color: t.gray }}>
        {isPending && payment.next_retry_at ? (
          <div>
            <div style={{ color: t.yellow, fontWeight: 600, fontSize: '0.75rem' }}>
              Next retry
            </div>
            {formatDate(payment.next_retry_at)}
          </div>
        ) : (
          formatDate(payment.updated_at)
        )}
      </td>
      <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
        <button
          onClick={() => onViewDetails(payment)}
          style={{
            background: 'none', border: `1px solid ${t.border}`,
            borderRadius: '6px', padding: '4px 12px',
            fontSize: '0.75rem', color: t.gray, cursor: 'pointer',
            fontWeight: 500, fontFamily: t.fontSans,
          }}
        >
          Details
        </button>
      </td>
    </tr>
  )
}

function DetailModal({ payment, onClose }) {
  if (!payment) return null

  const statusMessages = {
    recovered: 'This payment was successfully recovered via dunning email sequence.',
    pending: `Our automated dunning sequence is actively retrying this payment. Next retry scheduled for ${formatDate(payment.next_retry_at)}.`,
    lost: 'All 4 dunning attempts were exhausted without recovery. The customer was downgraded.',
  }

  const dunningEmails = [
    { day: 'Day 1', subject: 'Action required: Payment failed', sent: payment.dunning_emails_sent >= 1 },
    { day: 'Day 3', subject: 'Reminder: Update your payment method', sent: payment.dunning_emails_sent >= 2 },
    { day: 'Day 7', subject: 'Final notice: Account will be suspended', sent: payment.dunning_emails_sent >= 3 },
    { day: 'Day 14', subject: 'Your account has been suspended', sent: payment.dunning_emails_sent >= 4 },
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '20px',
    }} onClick={onClose}>
      <div style={{
        background: t.white, borderRadius: '16px', maxWidth: '520px', width: '100%',
        padding: '32px', maxHeight: '90vh', overflowY: 'auto',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontFamily: t.fontSans, fontSize: '1.1rem', fontWeight: 700, margin: '0 0 4px', color: t.text }}>
              Payment Recovery Details
            </h2>
            <div style={{ fontSize: '0.8rem', color: t.gray }}>
              Invoice {payment.stripe_invoice_id}
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.2rem', color: t.gray, padding: '0',
          }}>✕</button>
        </div>

        {/* Customer + Amount */}
        <div style={{
          background: t.bg, borderRadius: '10px', padding: '16px', marginBottom: '20px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px',
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: t.grayLight, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Customer</div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: t.text }}>{payment.customer_name}</div>
            <div style={{ fontSize: '0.75rem', color: t.gray }}>{payment.customer_email}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: t.grayLight, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Amount</div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', color: t.text }}>{formatAmount(payment.amount_cents)}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: t.grayLight, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Status</div>
            <StatusBadge status={payment.recovery_status} />
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: t.grayLight, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Failure Reason</div>
            <div style={{ fontSize: '0.82rem', color: t.red, fontWeight: 600 }}>{payment.failure_reason}</div>
          </div>
        </div>

        {/* Status message */}
        <div style={{
          background: payment.recovery_status === 'recovered' ? t.greenLight
            : payment.recovery_status === 'pending' ? t.yellowLight : t.redLight,
          borderRadius: '8px', padding: '12px 14px', marginBottom: '20px',
          fontSize: '0.82rem', color: t.text, lineHeight: 1.5,
        }}>
          {statusMessages[payment.recovery_status]}
        </div>

        {/* Dunning email sequence */}
        <h3 style={{ fontFamily: t.fontSans, fontSize: '0.85rem', fontWeight: 700, color: t.text, marginBottom: '12px' }}>
          Dunning Email Sequence
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
          {dunningEmails.map((email, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 12px', borderRadius: '8px',
              background: email.sent ? t.greenLight : t.bg,
              border: `1px solid ${email.sent ? '#BBF7D0' : t.border}`,
            }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%',
                background: email.sent ? t.green : t.border,
                color: t.white, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700,
                flexShrink: 0,
              }}>
                {email.sent ? '✓' : i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: email.sent ? t.green : t.gray }}>
                  {email.day}
                </div>
                <div style={{ fontSize: '0.72rem', color: t.gray, marginTop: '1px' }}>
                  {email.subject}
                </div>
              </div>
              <div style={{ fontSize: '0.7rem', color: email.sent ? t.green : t.grayLight, fontWeight: 500 }}>
                {email.sent ? 'Sent' : 'Pending'}
              </div>
            </div>
          ))}
        </div>

        <button onClick={onClose} style={{
          width: '100%', padding: '10px', background: t.text, color: t.white,
          border: 'none', borderRadius: '8px', cursor: 'pointer',
          fontFamily: t.fontSans, fontWeight: 600, fontSize: '0.9rem',
        }}>
          Close
        </button>
      </div>
    </div>
  )
}

export default function RecoveryPage() {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [payments, setPayments] = useState([])
  const [filter, setFilter] = useState('all') // all | pending | recovered | lost
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ps = getProjects()
    setProjects(ps)
    if (ps.length > 0) setSelectedProject(ps[0])
    setLoading(false)
  }, [])

  useEffect(() => {
    if (selectedProject) {
      // In production: fetch from /api/recovery?projectId=...
      // For demo: generate deterministic seed data
      setPayments(makeDemoPayments())
    }
  }, [selectedProject])

  const filtered = payments.filter(p => filter === 'all' || p.recovery_status === filter)

  const totalAtRisk = payments.reduce((s, p) => s + p.amount_cents, 0)
  const recovered = payments.filter(p => p.recovery_status === 'recovered')
  const pending = payments.filter(p => p.recovery_status === 'pending')
  const lost = payments.filter(p => p.recovery_status === 'lost')
  const recoveredAmount = recovered.reduce((s, p) => s + p.amount_cents, 0)
  const pendingAmount = pending.reduce((s, p) => s + p.amount_cents, 0)
  const recoveryRate = payments.length > 0
    ? Math.round((recovered.length / (recovered.length + lost.length)) * 100) || 0
    : 0

  const filterTabs = [
    { key: 'all', label: `All (${payments.length})` },
    { key: 'pending', label: `Retrying (${pending.length})` },
    { key: 'recovered', label: `Recovered (${recovered.length})` },
    { key: 'lost', label: `Lost (${lost.length})` },
  ]

  return (
    <AppLayout title="Failed Payment Recovery">
      <Head>
        <title>Failed Payment Recovery — ChurnRecovery</title>
        <meta name="description" content="Recover failed payments with automated dunning sequences. See which customers need attention and track recovery status." />
      </Head>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{ fontFamily: t.fontSerif, fontSize: '0.88rem', color: t.gray, margin: 0, lineHeight: 1.6 }}>
                Automated dunning recovers 20–40% of failed payments without manual effort.
              </p>
            </div>
            {projects.length > 1 && (
              <select
                value={selectedProject?.id || ''}
                onChange={e => setSelectedProject(projects.find(p => p.id === e.target.value))}
                style={{
                  padding: '8px 12px', borderRadius: '8px', border: `1px solid ${t.border}`,
                  fontFamily: t.fontSans, fontSize: '0.85rem', background: t.white, color: t.text,
                }}
              >
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            )}
          </div>
        </div>

        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <MetricCard
            label="Total at Risk"
            value={formatAmount(totalAtRisk)}
            sub={`${payments.length} failed payments`}
          />
          <MetricCard
            label="Recovered"
            value={formatAmount(recoveredAmount)}
            sub={`${recovered.length} payments recovered`}
            color={recoveredAmount > 0 ? t.green : t.text}
          />
          <MetricCard
            label="In Dunning"
            value={formatAmount(pendingAmount)}
            sub={`${pending.length} actively retrying`}
            color={pendingAmount > 0 ? t.yellow : t.text}
          />
          <MetricCard
            label="Recovery Rate"
            value={`${recoveryRate}%`}
            sub="vs. industry avg 28%"
            color={recoveryRate >= 28 ? t.green : t.accent}
          />
        </div>

        {/* Stripe Connect CTA (if not connected) */}
        {(!selectedProject?.stripeConnected) && (
          <div style={{
            background: t.blueLight, border: `1px solid #BFDBFE`,
            borderRadius: '12px', padding: '20px 24px', marginBottom: '28px',
            display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: t.blue, marginBottom: '4px' }}>
                🔗 Connect Stripe to enable live dunning
              </div>
              <div style={{ fontSize: '0.82rem', color: t.gray, lineHeight: 1.5 }}>
                ChurnRecovery automatically retries failed payments and sends dunning emails on your behalf.
                You're viewing demo data below.
              </div>
            </div>
            <a href="/app/connect-stripe" style={{
              background: t.blue, color: t.white, padding: '10px 20px',
              borderRadius: '8px', textDecoration: 'none', fontWeight: 600,
              fontSize: '0.85rem', whiteSpace: 'nowrap', fontFamily: t.fontSans,
            }}>
              Connect Stripe
            </a>
          </div>
        )}

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', borderBottom: `1px solid ${t.border}`, paddingBottom: '0' }}>
          {filterTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: '8px 16px', background: 'none',
                border: 'none', cursor: 'pointer',
                fontFamily: t.fontSans, fontSize: '0.82rem', fontWeight: 600,
                color: filter === tab.key ? t.accent : t.gray,
                borderBottom: filter === tab.key ? `2px solid ${t.accent}` : '2px solid transparent',
                marginBottom: '-1px', transition: 'all 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Payments Table */}
        <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '12px', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: t.gray }}>Loading...</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎉</div>
              <div style={{ fontWeight: 700, color: t.text, marginBottom: '6px' }}>No payments in this category</div>
              <div style={{ color: t.gray, fontSize: '0.85rem' }}>
                {filter === 'recovered' ? 'Connect Stripe to start recovering failed payments.' : 'Nothing to show here.'}
              </div>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                <thead>
                  <tr style={{ background: t.bg, borderBottom: `1px solid ${t.border}` }}>
                    {['Customer', 'Amount / Reason', 'Status', 'Dunning Progress', 'Next Action', ''].map((h, i) => (
                      <th key={i} style={{
                        padding: '12px 16px', textAlign: 'left',
                        fontSize: '0.72rem', fontWeight: 700, color: t.grayLight,
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <RecoveryRow key={p.id} payment={p} onViewDetails={setSelectedPayment} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* How it works */}
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700, color: t.text, marginBottom: '16px' }}>
            How Automated Dunning Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { step: '1', icon: '⚡', title: 'Payment Fails', desc: 'Stripe fires a webhook. ChurnRecovery logs the event immediately.' },
              { step: '2', icon: '📧', title: 'Email Day 1', desc: 'Customer gets a friendly payment update email with a direct link to update their card.' },
              { step: '3', icon: '🔄', title: 'Smart Retry', desc: 'We retry the payment on days 3, 7, and 14 while sending follow-up emails.' },
              { step: '4', icon: '💰', title: 'Recovery', desc: 'If the payment succeeds, the account is restored and the event is logged as recovered.' },
            ].map(item => (
              <div key={item.step} style={{
                background: t.white, border: `1px solid ${t.border}`,
                borderRadius: '10px', padding: '20px',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: t.text, marginBottom: '4px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: t.gray, lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPayment && (
        <DetailModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />
      )}
    </AppLayout>
  )
}

RecoveryPage.isAppPage = true
