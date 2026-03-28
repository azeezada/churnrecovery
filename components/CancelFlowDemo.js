import { useState, useEffect } from 'react'

const CANCEL_REASONS = [
  { id: 'too_expensive', label: "It's too expensive", icon: '💸' },
  { id: 'not_using', label: "I'm not using it enough", icon: '😴' },
  { id: 'missing_features', label: 'Missing features I need', icon: '🔧' },
  { id: 'switching', label: 'Switching to another tool', icon: '↩️' },
  { id: 'pausing', label: 'Just taking a break', icon: '⏸️' },
  { id: 'other', label: 'Something else', icon: '💬' },
]

const EXIT_REASONS = [
  "The product didn't deliver what I expected",
  "It was too complicated to use",
  "I found a better alternative",
  "Price wasn't worth it for me",
  "I only needed it short-term",
]

// Fake SaaS Dashboard Background
function FakeDashboard({ blurred }) {
  return (
    <div
      className="relative bg-[#F8F8FC] rounded-b-2xl overflow-hidden select-none pointer-events-none transition-[filter] duration-300"
      style={{ filter: blurred ? 'blur(3px)' : 'none' }}
    >
      {/* Top bar */}
      <div className="bg-brand-white border-b border-brand-border py-3 px-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#E8E0FF] rounded-[6px]" />
          <span className="font-sans font-bold text-[0.85rem] text-brand-text">MyApp</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-[80px] h-2 bg-[#EEE] rounded" />
          <div className="w-7 h-7 rounded-full opacity-70" style={{ background: 'linear-gradient(135deg,#D97757,#C4603D)' }} />
        </div>
      </div>
      {/* Sidebar + content */}
      <div className="flex min-h-[220px]">
        <div className="w-[140px] bg-brand-white border-r border-brand-border py-3">
          {['Dashboard', 'Members', 'Revenue', 'Settings'].map((item, i) => (
            <div key={item} className={`py-2 px-4 font-sans text-[0.75rem] ${i === 0 ? 'text-brand-accent font-semibold bg-[#FDF8F5] border-r-2 border-brand-accent' : 'text-brand-gray-light'}`}>
              {item}
            </div>
          ))}
        </div>
        <div className="flex-1 p-4">
          <div className="grid grid-cols-3 gap-2.5 mb-3.5">
            {[
              { label: 'Active Members', value: '2,847', color: 'text-brand-green' },
              { label: 'MRR', value: '$14,320', color: 'text-brand-blue' },
              { label: 'Churn Rate', value: '3.2%', color: 'text-brand-accent' },
            ].map(card => (
              <div key={card.label} className="bg-brand-white border border-brand-border rounded-lg py-2.5 px-3">
                <div className="font-sans text-[0.65rem] text-brand-gray-light mb-1">{card.label}</div>
                <div className={`font-sans font-extrabold text-base ${card.color}`}>{card.value}</div>
              </div>
            ))}
          </div>
          <div className="bg-brand-white border border-brand-border rounded-lg py-2.5 px-3">
            <div className="font-sans text-[0.65rem] text-brand-gray-light mb-2 font-semibold">Recent Activity</div>
            {[
              { name: 'Sarah K.', action: 'upgraded plan', time: '2m ago' },
              { name: 'Marcus L.', action: 'payment failed', time: '14m ago' },
              { name: 'Priya S.', action: 'started trial', time: '1h ago' },
            ].map(row => (
              <div key={row.name} className="flex justify-between py-[5px] border-b border-brand-border font-sans text-[0.7rem]">
                <span className="text-brand-text font-semibold">{row.name}</span>
                <span className="text-brand-gray">{row.action}</span>
                <span className="text-brand-gray-light">{row.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Step indicator
function StepDots({ current, total }) {
  return (
    <div className="flex justify-center gap-1.5 mb-5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="h-[7px] rounded transition-all duration-300" style={{
          width: i === current ? 20 : 7,
          background: i === current ? '#D97757' : i < current ? '#F0D5CC' : '#E5E5E5',
        }} />
      ))}
    </div>
  )
}

export default function CancelFlowDemo({ compact = false }) {
  const [step, setStep] = useState('dashboard') // dashboard | step1 | step2 | step3 | step4 | saved | lost
  const [selectedReason, setSelectedReason] = useState(null)
  const [selectedExitReason, setSelectedExitReason] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const transition = (fn, delay = 180) => {
    setIsAnimating(true)
    setTimeout(() => {
      fn()
      setIsAnimating(false)
    }, delay)
  }

  const showModal = step !== 'dashboard'
  const isDone = step === 'saved' || step === 'lost'

  return (
    <div className="max-w-[680px] mx-auto w-full" style={{ WebkitTapHighlightColor: 'transparent' }}>
      {/* Browser chrome */}
      <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-brand-border">
        {/* Address bar */}
        <div className="bg-[#1E1E2E] py-2.5 px-4 flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
            <div className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
            <div className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 bg-[#2C2C3E] rounded-[6px] py-1 px-3 font-mono text-[0.72rem] text-white/40">
            🔒 app.mysite.com/account/billing
          </div>
        </div>

        {/* App content with optional modal overlay */}
        <div className="relative overflow-hidden">
          <FakeDashboard blurred={showModal} />

          {/* Modal overlay */}
          {showModal && (
            <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-4 z-10">
              <div
                className="bg-brand-white rounded-2xl w-full max-w-[440px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden transition-all duration-[180ms]"
                style={{
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? 'scale(0.97)' : 'scale(1)',
                  maxHeight: '100%',
                  overflowY: 'auto',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {/* Colored top strip */}
                <div className="h-1 transition-colors duration-300" style={{
                  background: step === 'saved' ? '#2D7A4F' : step === 'lost' ? '#666666' : '#D97757',
                }} />

                <div className={compact ? 'py-5 px-[22px] pb-[22px]' : 'py-6 px-7 pb-7'}>
                  {/* ── STEP 1: Cancel intent ── */}
                  {step === 'step1' && (
                    <div>
                      <StepDots current={0} total={4} />
                      <div className="text-center mb-5">
                        <div className="text-[2rem] mb-2">⚠️</div>
                        <h3 className="font-sans text-[1.15rem] font-extrabold text-brand-text m-0 mb-2 tracking-[-0.02em]">
                          Wait — before you go...
                        </h3>
                        <p className="font-serif text-[0.83rem] text-brand-gray leading-[1.6] m-0">
                          Your account has saved <strong className="text-brand-text">847 hours</strong> this year. We'd hate to see you go — but first, why are you leaving?
                        </p>
                      </div>
                      <div className="flex flex-col gap-[7px]">
                        {CANCEL_REASONS.map(reason => (
                          <button
                            key={reason.id}
                            onClick={() => {
                              setSelectedReason(reason.id)
                              transition(() => setStep('step2'))
                            }}
                            className="flex items-center gap-2.5 py-[11px] px-3.5 border-[1.5px] border-brand-border rounded-[9px] bg-brand-white cursor-pointer font-sans text-[0.85rem] font-medium text-brand-text text-left transition-all duration-150 hover:border-brand-accent hover:bg-[#FDF8F5]"
                          style={{ minHeight: '44px' }}
                          >
                            <span className="text-base shrink-0">{reason.icon}</span>
                            {reason.label}
                            <span className="ml-auto text-brand-gray-light text-[0.75rem]">→</span>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => transition(() => setStep('lost'))}
                        className="mt-3.5 w-full py-2 bg-transparent border-none cursor-pointer font-sans text-[0.78rem] text-brand-gray-light underline"
                      >
                        Skip and cancel immediately
                      </button>
                    </div>
                  )}

                  {/* ── STEP 2: Pause offer ── */}
                  {step === 'step2' && (
                    <div>
                      <StepDots current={1} total={4} />
                      <div className="inline-flex items-center gap-1.5 bg-brand-blue-light text-brand-blue py-1 px-3 rounded-[20px] font-sans font-bold text-[0.68rem] uppercase tracking-[0.08em] mb-4">
                        💡 Pause option
                      </div>
                      <h3 className="font-sans text-[1.1rem] font-extrabold text-brand-text m-0 mb-2.5 tracking-[-0.02em]">
                        Pause for 1 month — no charge
                      </h3>
                      <p className="font-serif text-[0.83rem] text-brand-gray leading-[1.65] m-0 mb-5">
                        Life gets busy. Put your account on pause for a full month — zero charge, your data stays safe, and you can resume with one click whenever you&apos;re ready.
                      </p>
                      <div className="bg-[#F0F7FF] border border-[#BFDBFE] rounded-[10px] py-3.5 px-4 mb-5 flex flex-col gap-[7px]">
                        {[
                          '✓ No charge for 30 days',
                          '✓ All your data stays exactly as-is',
                          '✓ Resume anytime in one click',
                          '✓ No cancellation emails or hassle',
                        ].map(item => (
                          <div key={item} className="font-sans text-[0.8rem] text-[#1D4ED8] font-medium">{item}</div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-[9px]">
                        <button
                          onClick={() => transition(() => setStep('saved'))}
                          className="py-[13px] px-5 bg-brand-blue text-brand-white border-none rounded-[9px] font-sans font-bold text-[0.92rem] cursor-pointer tracking-[-0.01em] hover:bg-[#1D4ED8]"
                          style={{ minHeight: '44px' }}
                        >
                          ⏸️ Pause my account for free
                        </button>
                        <button
                          onClick={() => transition(() => setStep('step3'))}
                          className="py-[11px] px-5 bg-transparent text-brand-gray border border-brand-border rounded-[9px] font-sans font-medium text-[0.85rem] cursor-pointer"
                        >
                          No thanks, continue canceling
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 3: Discount offer ── */}
                  {step === 'step3' && (
                    <div>
                      <StepDots current={2} total={4} />
                      <div className="inline-flex items-center gap-1.5 bg-[#FFF7ED] text-brand-accent py-1 px-3 rounded-[20px] font-sans font-bold text-[0.68rem] uppercase tracking-[0.08em] mb-4">
                        🎁 Special offer — just for you
                      </div>
                      <h3 className="font-sans text-[1.1rem] font-extrabold text-brand-text m-0 mb-2.5 tracking-[-0.02em]">
                        What if we gave you 30% off?
                      </h3>
                      <p className="font-serif text-[0.83rem] text-brand-gray leading-[1.65] m-0 mb-[18px]">
                        We want you to stay. Get <strong className="text-brand-accent">30% off for the next 3 months</strong> — no strings attached. Your plan, features, and data stay exactly the same.
                      </p>

                      {/* Price comparison */}
                      <div className="bg-[#FDF8F5] border border-[#F5E6DD] rounded-[10px] py-3.5 px-4 mb-5 flex items-center gap-4">
                        <div className="text-center flex-1">
                          <div className="font-sans text-[0.65rem] text-brand-gray-light uppercase tracking-[0.06em] mb-1">Normal price</div>
                          <div className="font-sans font-extrabold text-[1.3rem] text-brand-gray-light line-through">$99/mo</div>
                        </div>
                        <div className="text-[1.2rem]">→</div>
                        <div className="text-center flex-1">
                          <div className="font-sans text-[0.65rem] text-brand-accent uppercase tracking-[0.06em] mb-1 font-bold">Your price</div>
                          <div className="font-sans font-extrabold text-[1.3rem] text-brand-accent">$69/mo</div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-[9px]">
                        <button
                          onClick={() => transition(() => setStep('saved'))}
                          className="py-[13px] px-5 bg-brand-accent text-brand-white border-none rounded-[9px] font-sans font-bold text-[0.92rem] cursor-pointer tracking-[-0.01em] hover:bg-brand-accent-hover"
                          style={{ minHeight: '44px' }}
                        >
                          🎉 Accept 30% off — keep my account
                        </button>
                        <button
                          onClick={() => transition(() => setStep('step4'))}
                          className="py-[11px] px-5 bg-transparent text-brand-gray border border-brand-border rounded-[9px] font-sans font-medium text-[0.85rem] cursor-pointer"
                        >
                          No thanks, I still want to cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 4: Exit survey ── */}
                  {step === 'step4' && (
                    <div>
                      <StepDots current={3} total={4} />
                      <div className="text-center mb-[18px]">
                        <div className="text-[1.8rem] mb-2">📝</div>
                        <h3 className="font-sans text-[1.05rem] font-extrabold text-brand-text m-0 mb-2 tracking-[-0.02em]">
                          One last thing — help us improve
                        </h3>
                        <p className="font-serif text-[0.8rem] text-brand-gray leading-[1.6] m-0">
                          Your account will be canceled after this. What&apos;s the real reason you&apos;re leaving?
                        </p>
                      </div>
                      <div className="flex flex-col gap-[7px] mb-4">
                        {EXIT_REASONS.map(reason => (
                          <button
                            key={reason}
                            onClick={() => setSelectedExitReason(reason)}
                            className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-lg bg-brand-white cursor-pointer font-sans text-[0.8rem] text-brand-text text-left transition-all duration-150"
                            style={{
                              border: `1.5px solid ${selectedExitReason === reason ? '#D97757' : '#E5E5E5'}`,
                              background: selectedExitReason === reason ? '#FDF8F5' : '#FFFFFF',
                            }}
                          >
                            <div className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center" style={{
                              border: `1.5px solid ${selectedExitReason === reason ? '#D97757' : '#CCC'}`,
                              background: selectedExitReason === reason ? '#D97757' : 'transparent',
                            }}>
                              {selectedExitReason === reason && (
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-white" />
                              )}
                            </div>
                            {reason}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => transition(() => setStep('lost'))}
                        className="w-full py-3 px-5 text-brand-white border-none rounded-[9px] font-sans font-bold text-[0.88rem] tracking-[-0.01em] transition-colors duration-200"
                        style={{
                          background: selectedExitReason ? '#191919' : '#CCC',
                          cursor: selectedExitReason ? 'pointer' : 'not-allowed',
                        }}
                      >
                        Confirm cancellation
                      </button>
                    </div>
                  )}

                  {/* ── SAVED ── */}
                  {step === 'saved' && (
                    <div className="text-center py-1.5">
                      <div className="text-[2.8rem] mb-3">🎉</div>
                      <div className="inline-block bg-brand-green-light text-brand-green py-1 px-4 rounded-[20px] font-sans font-bold text-[0.72rem] uppercase tracking-[0.08em] mb-3.5">
                        Customer Saved ✓
                      </div>
                      <h3 className="font-sans text-[1.1rem] font-extrabold text-brand-text m-0 mb-2.5 tracking-[-0.02em]">
                        They stayed!
                      </h3>
                      <p className="font-serif text-[0.82rem] text-brand-gray leading-[1.65] m-0 mb-5 max-w-[320px] mx-auto">
                        ChurnRecovery automatically applied the offer and logged the save. Your dashboard updates in real time.
                      </p>
                      <div className="bg-[#F0FAF4] border border-[#C3E6D0] rounded-[10px] p-3.5 mb-5 grid grid-cols-3 gap-2.5">
                        {[
                          { value: '+$297', label: 'Revenue saved' },
                          { value: '3 mo', label: 'LTV extended' },
                          { value: '< 1s', label: 'Response time' },
                        ].map(stat => (
                          <div key={stat.label} className="text-center">
                            <div className="font-sans font-extrabold text-[1.05rem] text-brand-green tracking-[-0.02em]">{stat.value}</div>
                            <div className="font-sans text-[0.65rem] text-brand-gray uppercase tracking-[0.04em] mt-0.5">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => transition(() => { setStep('step1'); setSelectedReason(null); setSelectedExitReason(null) })}
                        className="py-2.5 px-6 bg-brand-text text-brand-white border-none rounded-lg font-sans font-semibold text-[0.85rem] cursor-pointer tracking-[-0.01em]"
                      >
                        Try another scenario →
                      </button>
                    </div>
                  )}

                  {/* ── LOST ── */}
                  {step === 'lost' && (
                    <div className="text-center py-1.5">
                      <div className="text-[2.8rem] mb-3">📊</div>
                      <div className="inline-block bg-[#F5F4F0] text-brand-gray py-1 px-4 rounded-[20px] font-sans font-bold text-[0.72rem] uppercase tracking-[0.08em] mb-3.5">
                        Cancellation Logged
                      </div>
                      <h3 className="font-sans text-[1.1rem] font-extrabold text-brand-text m-0 mb-2.5 tracking-[-0.02em]">
                        Customer canceled — data captured
                      </h3>
                      <p className="font-serif text-[0.82rem] text-brand-gray leading-[1.65] m-0 mb-[18px] max-w-[320px] mx-auto">
                        Reason logged. ChurnRecovery automatically schedules win-back emails and updates your churn analytics.
                      </p>
                      <div className="bg-[#F5F4F0] rounded-[10px] py-[13px] px-4 mb-5 text-left flex flex-col gap-1.5">
                        {[
                          selectedReason ? `✓ Reason: "${CANCEL_REASONS.find(r => r.id === selectedReason)?.label || 'Other'}"` : '✓ Reason: skipped by customer',
                          selectedExitReason ? `✓ Feedback: "${selectedExitReason}"` : null,
                          '✓ Webhook fired to your backend',
                          '✓ Added to churn analytics dashboard',
                          '✓ Win-back email queued for day 7, 14, 30',
                        ].filter(Boolean).map(item => (
                          <div key={item} className="font-sans text-[0.78rem] text-brand-gray">{item}</div>
                        ))}
                      </div>
                      <button
                        onClick={() => transition(() => { setStep('step1'); setSelectedReason(null); setSelectedExitReason(null) })}
                        className="py-2.5 px-6 bg-brand-text text-brand-white border-none rounded-lg font-sans font-semibold text-[0.85rem] cursor-pointer tracking-[-0.01em]"
                      >
                        Try another scenario →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Dashboard "Click to start" trigger */}
          {!showModal && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/15 backdrop-blur-[1px] rounded-b-2xl">
              <button
                onClick={() => setStep('step1')}
                className="bg-brand-accent text-brand-white border-none rounded-xl py-4 px-8 font-sans font-bold text-base cursor-pointer tracking-[-0.01em] shadow-[0_8px_24px_rgba(217,119,87,0.4)] flex items-center gap-2.5 hover:bg-brand-accent-hover hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(217,119,87,0.5)] transition-all duration-150"
              >
                <span className="text-[1.2rem]">▶</span>
                Click to start the demo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Step indicator labels */}
      {showModal && !isDone && (
        <div className="flex justify-center gap-0 mt-5 flex-wrap">
          {[
            { label: 'Cancel intent', active: step === 'step1', done: ['step2', 'step3', 'step4', 'saved', 'lost'].includes(step) },
            { label: 'Pause offer', active: step === 'step2', done: ['step3', 'step4', 'saved', 'lost'].includes(step) },
            { label: 'Discount offer', active: step === 'step3', done: ['step4', 'saved', 'lost'].includes(step) },
            { label: 'Exit survey', active: step === 'step4', done: false },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div className={`font-sans text-[0.72rem] py-1 px-2.5 tracking-[-0.01em] ${s.active ? 'font-bold text-brand-accent' : s.done ? 'text-brand-green' : 'text-brand-gray-light'}`}>
                {s.done ? '✓ ' : ''}{s.label}
              </div>
              {i < 3 && <span className="text-brand-border text-[0.7rem]">›</span>}
            </div>
          ))}
        </div>
      )}

      {/* CTA after demo completes */}
      {isDone && (
        <div className="mt-7 bg-brand-text rounded-[14px] py-7 px-8 text-center">
          <p className="font-sans font-extrabold text-[1.05rem] text-brand-white m-0 mb-2 tracking-[-0.02em]">
            Want this on your site?
          </p>
          <p className="font-serif text-[0.85rem] text-white/65 m-0 mb-5 leading-[1.6]">
            Add this cancel flow to your subscription business in under a day. $20/month after a 30-day free trial.
          </p>
          <a
            href="/app/sign-up"
            className="inline-block bg-brand-accent text-brand-white py-3 px-7 rounded-[9px] font-sans font-bold text-[0.92rem] no-underline tracking-[-0.01em]"
          >
            Start Free Trial →
          </a>
        </div>
      )}
    </div>
  )
}
