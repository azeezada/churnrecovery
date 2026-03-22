import Head from 'next/head'
import { useState, useEffect } from 'react'
import AppLayout from '../../components/AppLayout'
import { getProjects } from '../../lib/localStore'
import { apiFetch } from '../../lib/useApi'

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
    recovered: { bg: 'bg-brand-green-light', text: 'text-brand-green', label: '✓ Recovered' },
    pending: { bg: 'bg-[#FFFBEB]', text: 'text-brand-amber', label: '↻ Retrying' },
    lost: { bg: 'bg-[#FEF2F2]', text: 'text-brand-red', label: '✗ Lost' },
  }
  const cfg = configs[status] || configs.pending
  return (
    <span className={`px-2 py-[2px] rounded-[20px] text-[0.72rem] font-semibold whitespace-nowrap ${cfg.bg} ${cfg.text}`}>
      {cfg.label}
    </span>
  )
}

function MetricCard({ label, value, sub, color }) {
  const colorClass = !color || color === '#191919' ? 'text-brand-text'
    : color === '#2D7A4F' ? 'text-brand-green'
    : color === '#D97706' ? 'text-brand-amber'
    : color === '#D97757' ? 'text-brand-accent'
    : 'text-brand-text'
  return (
    <div className="bg-brand-white border border-brand-border rounded-xl p-6">
      <div className="text-[0.72rem] text-brand-gray-light font-semibold mb-[10px] uppercase tracking-[0.06em]">
        {label}
      </div>
      <div className={`text-[2rem] font-extrabold tracking-[-0.04em] leading-none ${colorClass}`}>
        {value}
      </div>
      {sub && <div className="text-[0.78rem] text-brand-gray mt-[6px]">{sub}</div>}
    </div>
  )
}

function DunningProgress({ sent, max = 4 }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded text-[0.6rem] flex items-center justify-center font-bold ${
            i < sent ? 'bg-brand-accent text-brand-white' : 'bg-brand-border text-brand-gray-light'
          }`}
        >
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
    <tr className="border-b border-brand-border">
      <td className="px-4 py-[14px] align-middle">
        <div className="font-semibold text-[0.85rem] text-brand-text">
          {payment.customer_name || payment.customer_email}
        </div>
        <div className="text-xs text-brand-gray mt-[2px]">
          {payment.customer_email}
        </div>
      </td>
      <td className="px-4 py-[14px] align-middle">
        <div className="font-bold text-[0.9rem] text-brand-text">
          {formatAmount(payment.amount_cents)}
        </div>
        <div className="text-[0.7rem] text-brand-gray mt-[2px]">
          {payment.failure_reason}
        </div>
      </td>
      <td className="px-4 py-[14px] align-middle">
        <StatusBadge status={payment.recovery_status} />
      </td>
      <td className="px-4 py-[14px] align-middle">
        <DunningProgress sent={payment.dunning_emails_sent} />
        <div className="text-[0.7rem] text-brand-gray mt-1">
          {payment.dunning_emails_sent}/4 emails sent
        </div>
      </td>
      <td className="px-4 py-[14px] align-middle text-[0.8rem] text-brand-gray">
        {isPending && payment.next_retry_at ? (
          <div>
            <div className="text-brand-amber font-semibold text-xs">
              Next retry
            </div>
            {formatDate(payment.next_retry_at)}
          </div>
        ) : (
          formatDate(payment.updated_at)
        )}
      </td>
      <td className="px-4 py-[14px] align-middle">
        <button
          onClick={() => onViewDetails(payment)}
          className="bg-transparent border border-brand-border rounded-[6px] px-3 py-1 text-xs text-brand-gray cursor-pointer font-medium font-sans"
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

  const statusBgClass = payment.recovery_status === 'recovered' ? 'bg-brand-green-light'
    : payment.recovery_status === 'pending' ? 'bg-[#FFFBEB]' : 'bg-[#FEF2F2]'

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[1000] p-5" onClick={onClose}>
      <div className="bg-brand-white rounded-2xl max-w-[520px] w-full p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-sans text-[1.1rem] font-bold m-0 mb-1 text-brand-text">
              Payment Recovery Details
            </h2>
            <div className="text-[0.8rem] text-brand-gray">
              Invoice {payment.stripe_invoice_id}
            </div>
          </div>
          <button onClick={onClose} className="bg-transparent border-none cursor-pointer text-[1.2rem] text-brand-gray p-0">✕</button>
        </div>

        {/* Customer + Amount */}
        <div className="bg-brand-bg rounded-[10px] p-4 mb-5 grid grid-cols-2 gap-3">
          <div>
            <div className="text-[0.7rem] text-brand-gray-light uppercase tracking-[0.05em] mb-1">Customer</div>
            <div className="font-semibold text-[0.85rem] text-brand-text">{payment.customer_name}</div>
            <div className="text-xs text-brand-gray">{payment.customer_email}</div>
          </div>
          <div>
            <div className="text-[0.7rem] text-brand-gray-light uppercase tracking-[0.05em] mb-1">Amount</div>
            <div className="font-bold text-[1.2rem] text-brand-text">{formatAmount(payment.amount_cents)}</div>
          </div>
          <div>
            <div className="text-[0.7rem] text-brand-gray-light uppercase tracking-[0.05em] mb-1">Status</div>
            <StatusBadge status={payment.recovery_status} />
          </div>
          <div>
            <div className="text-[0.7rem] text-brand-gray-light uppercase tracking-[0.05em] mb-1">Failure Reason</div>
            <div className="text-[0.82rem] text-brand-red font-semibold">{payment.failure_reason}</div>
          </div>
        </div>

        {/* Status message */}
        <div className={`rounded-lg px-[14px] py-3 mb-5 text-[0.82rem] text-brand-text leading-[1.5] ${statusBgClass}`}>
          {statusMessages[payment.recovery_status]}
        </div>

        {/* Dunning email sequence */}
        <h3 className="font-sans text-[0.85rem] font-bold text-brand-text mb-3">
          Dunning Email Sequence
        </h3>
        <div className="flex flex-col gap-2 mb-6">
          {dunningEmails.map((email, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-3 py-[10px] rounded-lg border ${
                email.sent
                  ? 'bg-brand-green-light border-[#BBF7D0]'
                  : 'bg-brand-bg border-brand-border'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-bold text-brand-white shrink-0 ${
                email.sent ? 'bg-brand-green' : 'bg-brand-border'
              }`}>
                {email.sent ? '✓' : i + 1}
              </div>
              <div className="flex-1">
                <div className={`text-[0.78rem] font-semibold ${email.sent ? 'text-brand-green' : 'text-brand-gray'}`}>
                  {email.day}
                </div>
                <div className="text-[0.72rem] text-brand-gray mt-[1px]">
                  {email.subject}
                </div>
              </div>
              <div className={`text-[0.7rem] font-medium ${email.sent ? 'text-brand-green' : 'text-brand-gray-light'}`}>
                {email.sent ? 'Sent' : 'Pending'}
              </div>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="w-full py-[10px] bg-brand-text text-brand-white border-none rounded-lg cursor-pointer font-sans font-semibold text-[0.9rem]">
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

  // Load projects — try API first, fall back to localStore
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await apiFetch('/api/projects')
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects)
          setSelectedProject(data.projects[0])
          setLoading(false)
          return
        }
      } catch {
        // API unavailable
      }
      // Fall back to localStore
      const ps = getProjects()
      setProjects(ps)
      if (ps.length > 0) setSelectedProject(ps[0])
      setLoading(false)
    }
    loadProjects()
  }, [])

  useEffect(() => {
    if (selectedProject) {
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

      <div className="max-w-[1100px] mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <p className="font-serif text-[0.88rem] text-brand-gray m-0 leading-relaxed">
                Automated dunning recovers 20–40% of failed payments without manual effort.
              </p>
            </div>
            {projects.length > 1 && (
              <select
                value={selectedProject?.id || ''}
                onChange={e => setSelectedProject(projects.find(p => p.id === e.target.value))}
                className="px-3 py-2 rounded-lg border border-brand-border font-sans text-[0.85rem] bg-brand-white text-brand-text"
              >
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            )}
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-8">
          <MetricCard
            label="Total at Risk"
            value={formatAmount(totalAtRisk)}
            sub={`${payments.length} failed payments`}
          />
          <MetricCard
            label="Recovered"
            value={formatAmount(recoveredAmount)}
            sub={`${recovered.length} payments recovered`}
            color={recoveredAmount > 0 ? '#2D7A4F' : '#191919'}
          />
          <MetricCard
            label="In Dunning"
            value={formatAmount(pendingAmount)}
            sub={`${pending.length} actively retrying`}
            color={pendingAmount > 0 ? '#D97706' : '#191919'}
          />
          <MetricCard
            label="Recovery Rate"
            value={`${recoveryRate}%`}
            sub="vs. industry avg 28%"
            color={recoveryRate >= 28 ? '#2D7A4F' : '#D97757'}
          />
        </div>

        {/* Stripe Connect CTA (if not connected) */}
        {(!selectedProject?.stripeConnected) && (
          <div className="bg-brand-blue-light border border-[#BFDBFE] rounded-xl px-6 py-5 mb-7 flex items-center gap-4 flex-wrap">
            <div className="flex-1">
              <div className="font-bold text-[0.9rem] text-brand-blue mb-1">
                🔗 Connect Stripe to enable live dunning
              </div>
              <div className="text-[0.82rem] text-brand-gray leading-[1.5]">
                ChurnRecovery automatically retries failed payments and sends dunning emails on your behalf.
                You're viewing demo data below.
              </div>
            </div>
            <a href="/app/connect-stripe" className="bg-brand-blue text-brand-white px-5 py-[10px] rounded-lg no-underline font-semibold text-[0.85rem] whitespace-nowrap font-sans">
              Connect Stripe
            </a>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-1 mb-4 border-b border-brand-border pb-0">
          {filterTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 bg-transparent border-none cursor-pointer font-sans text-[0.82rem] font-semibold -mb-[1px] transition-all duration-150 border-b-2 ${
                filter === tab.key
                  ? 'text-brand-accent border-b-brand-accent'
                  : 'text-brand-gray border-b-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Payments Table */}
        <div className="bg-brand-white border border-brand-border rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-[60px] text-center text-brand-gray">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-[60px] text-center">
              <div className="text-[2.5rem] mb-3">🎉</div>
              <div className="font-bold text-brand-text mb-[6px]">No payments in this category</div>
              <div className="text-brand-gray text-[0.85rem]">
                {filter === 'recovered' ? 'Connect Stripe to start recovering failed payments.' : 'Nothing to show here.'}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-brand-bg border-b border-brand-border">
                    {['Customer', 'Amount / Reason', 'Status', 'Dunning Progress', 'Next Action', ''].map((h, i) => (
                      <th key={i} className="px-4 py-3 text-left text-[0.72rem] font-bold text-brand-gray-light uppercase tracking-[0.06em]">
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
        <div className="mt-10">
          <h2 className="font-sans text-base font-bold text-brand-text mb-4">
            How Automated Dunning Works
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
            {[
              { step: '1', icon: '⚡', title: 'Payment Fails', desc: 'Stripe fires a webhook. ChurnRecovery logs the event immediately.' },
              { step: '2', icon: '📧', title: 'Email Day 1', desc: 'Customer gets a friendly payment update email with a direct link to update their card.' },
              { step: '3', icon: '🔄', title: 'Smart Retry', desc: 'We retry the payment on days 3, 7, and 14 while sending follow-up emails.' },
              { step: '4', icon: '💰', title: 'Recovery', desc: 'If the payment succeeds, the account is restored and the event is logged as recovered.' },
            ].map(item => (
              <div key={item.step} className="bg-brand-white border border-brand-border rounded-[10px] p-5">
                <div className="text-[1.5rem] mb-[10px]">{item.icon}</div>
                <div className="font-bold text-[0.85rem] text-brand-text mb-1">
                  {item.title}
                </div>
                <div className="text-[0.78rem] text-brand-gray leading-relaxed">
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
