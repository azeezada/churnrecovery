import { useState, useEffect } from 'react'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#999999',
  accent: '#D97757',
  accentHover: '#C4603D',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenLight: '#EDF7F1',
  blue: '#2563EB',
  blueLight: '#EFF6FF',
  purple: '#7C3AED',
  purpleLight: '#F5F3FF',
  red: '#DC2626',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

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
    <div style={{
      position: 'relative',
      background: '#F8F8FC',
      borderRadius: '0 0 16px 16px',
      overflow: 'hidden',
      filter: blurred ? 'blur(3px)' : 'none',
      transition: 'filter 0.3s ease',
      userSelect: 'none',
      pointerEvents: 'none',
    }}>
      {/* Top bar */}
      <div style={{
        background: t.white,
        borderBottom: `1px solid ${t.border}`,
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 24, height: 24, background: '#E8E0FF', borderRadius: '6px' }} />
          <span style={{ fontFamily: t.fontSans, fontWeight: 700, fontSize: '0.85rem', color: t.text }}>MyApp</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 80, height: 8, background: '#EEE', borderRadius: 4 }} />
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#D97757,#C4603D)', opacity: 0.7 }} />
        </div>
      </div>
      {/* Sidebar + content */}
      <div style={{ display: 'flex', minHeight: 220 }}>
        <div style={{ width: 140, background: t.white, borderRight: `1px solid ${t.border}`, padding: '12px 0' }}>
          {['Dashboard', 'Members', 'Revenue', 'Settings'].map((item, i) => (
            <div key={item} style={{
              padding: '8px 16px',
              fontFamily: t.fontSans,
              fontSize: '0.75rem',
              color: i === 0 ? t.accent : t.grayLight,
              fontWeight: i === 0 ? 600 : 400,
              background: i === 0 ? '#FDF8F5' : 'transparent',
              borderRight: i === 0 ? `2px solid ${t.accent}` : 'none',
            }}>{item}</div>
          ))}
        </div>
        <div style={{ flex: 1, padding: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
            {[
              { label: 'Active Members', value: '2,847', color: t.green },
              { label: 'MRR', value: '$14,320', color: t.blue },
              { label: 'Churn Rate', value: '3.2%', color: t.accent },
            ].map(card => (
              <div key={card.label} style={{
                background: t.white,
                border: `1px solid ${t.border}`,
                borderRadius: '8px',
                padding: '10px 12px',
              }}>
                <div style={{ fontFamily: t.fontSans, fontSize: '0.65rem', color: t.grayLight, marginBottom: '4px' }}>{card.label}</div>
                <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '1rem', color: card.color }}>{card.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: t.white, border: `1px solid ${t.border}`, borderRadius: '8px', padding: '10px 12px' }}>
            <div style={{ fontFamily: t.fontSans, fontSize: '0.65rem', color: t.grayLight, marginBottom: '8px', fontWeight: 600 }}>Recent Activity</div>
            {[
              { name: 'Sarah K.', action: 'upgraded plan', time: '2m ago' },
              { name: 'Marcus L.', action: 'payment failed', time: '14m ago' },
              { name: 'Priya S.', action: 'started trial', time: '1h ago' },
            ].map(row => (
              <div key={row.name} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0',
                borderBottom: `1px solid ${t.border}`,
                fontFamily: t.fontSans,
                fontSize: '0.7rem',
              }}>
                <span style={{ color: t.text, fontWeight: 600 }}>{row.name}</span>
                <span style={{ color: t.gray }}>{row.action}</span>
                <span style={{ color: t.grayLight }}>{row.time}</span>
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
    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '20px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current ? 20 : 7,
          height: 7,
          borderRadius: 4,
          background: i === current ? t.accent : i < current ? '#F0D5CC' : t.border,
          transition: 'all 0.3s ease',
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
    <div style={{ maxWidth: 680, margin: '0 auto', width: '100%' }}>
      {/* Browser chrome */}
      <div style={{
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
        border: `1px solid ${t.border}`,
      }}>
        {/* Address bar */}
        <div style={{
          background: '#1E1E2E',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }} />
          </div>
          <div style={{
            flex: 1,
            background: '#2C2C3E',
            borderRadius: 6,
            padding: '4px 12px',
            fontFamily: 'monospace',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.4)',
          }}>
            🔒 app.mysite.com/account/billing
          </div>
        </div>

        {/* App content with optional modal overlay */}
        <div style={{ position: 'relative' }}>
          <FakeDashboard blurred={showModal} />

          {/* Modal overlay */}
          {showModal && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              zIndex: 10,
            }}>
              <div style={{
                background: t.white,
                borderRadius: 16,
                width: '100%',
                maxWidth: 440,
                boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? 'scale(0.97)' : 'scale(1)',
                transition: 'opacity 0.18s ease, transform 0.18s ease',
                overflow: 'hidden',
              }}>
                {/* Colored top strip */}
                <div style={{
                  height: 4,
                  background: step === 'saved' ? t.green : step === 'lost' ? t.gray : t.accent,
                  transition: 'background 0.3s ease',
                }} />

                <div style={{ padding: compact ? '20px 22px 22px' : '24px 28px 28px' }}>
                  {/* ── STEP 1: Cancel intent ── */}
                  {step === 'step1' && (
                    <div>
                      <StepDots current={0} total={4} />
                      <div style={{ textAlign: 'center', marginBottom: 20 }}>
                        <div style={{ fontSize: '2rem', marginBottom: 8 }}>⚠️</div>
                        <h3 style={{
                          fontFamily: t.fontSans,
                          fontSize: '1.15rem',
                          fontWeight: 800,
                          color: t.text,
                          margin: '0 0 8px',
                          letterSpacing: '-0.02em',
                        }}>
                          Wait — before you go...
                        </h3>
                        <p style={{
                          fontFamily: t.fontSerif,
                          fontSize: '0.83rem',
                          color: t.gray,
                          lineHeight: 1.6,
                          margin: 0,
                        }}>
                          Your account has saved <strong style={{ color: t.text }}>847 hours</strong> this year. We'd hate to see you go — but first, why are you leaving?
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                        {CANCEL_REASONS.map(reason => (
                          <button
                            key={reason.id}
                            onClick={() => {
                              setSelectedReason(reason.id)
                              transition(() => setStep('step2'))
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              padding: '11px 14px',
                              border: `1.5px solid ${t.border}`,
                              borderRadius: 9,
                              background: t.white,
                              cursor: 'pointer',
                              fontFamily: t.fontSans,
                              fontSize: '0.85rem',
                              fontWeight: 500,
                              color: t.text,
                              textAlign: 'left',
                              transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.background = '#FDF8F5' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.white }}
                          >
                            <span style={{ fontSize: '1rem', flexShrink: 0 }}>{reason.icon}</span>
                            {reason.label}
                            <span style={{ marginLeft: 'auto', color: t.grayLight, fontSize: '0.75rem' }}>→</span>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => transition(() => setStep('lost'))}
                        style={{
                          marginTop: 14,
                          width: '100%',
                          padding: '8px',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: t.fontSans,
                          fontSize: '0.78rem',
                          color: t.grayLight,
                          textDecoration: 'underline',
                        }}
                      >
                        Skip and cancel immediately
                      </button>
                    </div>
                  )}

                  {/* ── STEP 2: Pause offer ── */}
                  {step === 'step2' && (
                    <div>
                      <StepDots current={1} total={4} />
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        background: '#EFF6FF',
                        color: t.blue,
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontFamily: t.fontSans,
                        fontWeight: 700,
                        fontSize: '0.68rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: 16,
                      }}>
                        💡 Pause option
                      </div>
                      <h3 style={{
                        fontFamily: t.fontSans,
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        color: t.text,
                        margin: '0 0 10px',
                        letterSpacing: '-0.02em',
                      }}>
                        Pause for 1 month — no charge
                      </h3>
                      <p style={{
                        fontFamily: t.fontSerif,
                        fontSize: '0.83rem',
                        color: t.gray,
                        lineHeight: 1.65,
                        margin: '0 0 20px',
                      }}>
                        Life gets busy. Put your account on pause for a full month — zero charge, your data stays safe, and you can resume with one click whenever you're ready.
                      </p>
                      <div style={{
                        background: '#F0F7FF',
                        border: `1px solid #BFDBFE`,
                        borderRadius: 10,
                        padding: '14px 16px',
                        marginBottom: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 7,
                      }}>
                        {[
                          '✓ No charge for 30 days',
                          '✓ All your data stays exactly as-is',
                          '✓ Resume anytime in one click',
                          '✓ No cancellation emails or hassle',
                        ].map(item => (
                          <div key={item} style={{ fontFamily: t.fontSans, fontSize: '0.8rem', color: '#1D4ED8', fontWeight: 500 }}>{item}</div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                        <button
                          onClick={() => transition(() => setStep('saved'))}
                          style={{
                            padding: '13px 20px',
                            background: t.blue,
                            color: t.white,
                            border: 'none',
                            borderRadius: 9,
                            fontFamily: t.fontSans,
                            fontWeight: 700,
                            fontSize: '0.92rem',
                            cursor: 'pointer',
                            letterSpacing: '-0.01em',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#1D4ED8'}
                          onMouseLeave={e => e.currentTarget.style.background = t.blue}
                        >
                          ⏸️ Pause my account for free
                        </button>
                        <button
                          onClick={() => transition(() => setStep('step3'))}
                          style={{
                            padding: '11px 20px',
                            background: 'transparent',
                            color: t.gray,
                            border: `1px solid ${t.border}`,
                            borderRadius: 9,
                            fontFamily: t.fontSans,
                            fontWeight: 500,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                          }}
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
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        background: '#FFF7ED',
                        color: t.accent,
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontFamily: t.fontSans,
                        fontWeight: 700,
                        fontSize: '0.68rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: 16,
                      }}>
                        🎁 Special offer — just for you
                      </div>
                      <h3 style={{
                        fontFamily: t.fontSans,

                        fontSize: '1.1rem',
                        fontWeight: 800,
                        color: t.text,
                        margin: '0 0 10px',
                        letterSpacing: '-0.02em',
                      }}>
                        What if we gave you 30% off?
                      </h3>
                      <p style={{
                        fontFamily: t.fontSerif,
                        fontSize: '0.83rem',
                        color: t.gray,
                        lineHeight: 1.65,
                        margin: '0 0 18px',
                      }}>
                        We want you to stay. Get <strong style={{ color: t.accent }}>30% off for the next 3 months</strong> — no strings attached. Your plan, features, and data stay exactly the same.
                      </p>

                      {/* Price comparison */}
                      <div style={{
                        background: '#FDF8F5',
                        border: `1px solid #F5E6DD`,
                        borderRadius: 10,
                        padding: '14px 16px',
                        marginBottom: 20,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                      }}>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                          <div style={{ fontFamily: t.fontSans, fontSize: '0.65rem', color: t.grayLight, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Normal price</div>
                          <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.3rem', color: t.grayLight, textDecoration: 'line-through' }}>$99/mo</div>
                        </div>
                        <div style={{ fontSize: '1.2rem' }}>→</div>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                          <div style={{ fontFamily: t.fontSans, fontSize: '0.65rem', color: t.accent, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4, fontWeight: 700 }}>Your price</div>
                          <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.3rem', color: t.accent }}>$69/mo</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                        <button
                          onClick={() => transition(() => setStep('saved'))}
                          style={{
                            padding: '13px 20px',
                            background: t.accent,
                            color: t.white,
                            border: 'none',
                            borderRadius: 9,
                            fontFamily: t.fontSans,
                            fontWeight: 700,
                            fontSize: '0.92rem',
                            cursor: 'pointer',
                            letterSpacing: '-0.01em',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = t.accentHover}
                          onMouseLeave={e => e.currentTarget.style.background = t.accent}
                        >
                          🎉 Accept 30% off — keep my account
                        </button>
                        <button
                          onClick={() => transition(() => setStep('step4'))}
                          style={{
                            padding: '11px 20px',
                            background: 'transparent',
                            color: t.gray,
                            border: `1px solid ${t.border}`,
                            borderRadius: 9,
                            fontFamily: t.fontSans,
                            fontWeight: 500,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                          }}
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
                      <div style={{ textAlign: 'center', marginBottom: 18 }}>
                        <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>📝</div>
                        <h3 style={{
                          fontFamily: t.fontSans,
                          fontSize: '1.05rem',
                          fontWeight: 800,
                          color: t.text,
                          margin: '0 0 8px',
                          letterSpacing: '-0.02em',
                        }}>
                          One last thing — help us improve
                        </h3>
                        <p style={{
                          fontFamily: t.fontSerif,
                          fontSize: '0.8rem',
                          color: t.gray,
                          lineHeight: 1.6,
                          margin: 0,
                        }}>
                          Your account will be canceled after this. What's the real reason you're leaving?
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
                        {EXIT_REASONS.map(reason => (
                          <button
                            key={reason}
                            onClick={() => setSelectedExitReason(reason)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              padding: '10px 14px',
                              border: `1.5px solid ${selectedExitReason === reason ? t.accent : t.border}`,
                              borderRadius: 8,
                              background: selectedExitReason === reason ? '#FDF8F5' : t.white,
                              cursor: 'pointer',
                              fontFamily: t.fontSans,
                              fontSize: '0.8rem',
                              color: t.text,
                              textAlign: 'left',
                              transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => { if (selectedExitReason !== reason) { e.currentTarget.style.borderColor = '#DDD' } }}
                            onMouseLeave={e => { if (selectedExitReason !== reason) { e.currentTarget.style.borderColor = t.border } }}
                          >
                            <div style={{
                              width: 16,
                              height: 16,
                              borderRadius: '50%',
                              border: `1.5px solid ${selectedExitReason === reason ? t.accent : '#CCC'}`,
                              background: selectedExitReason === reason ? t.accent : 'transparent',
                              flexShrink: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              {selectedExitReason === reason && (
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.white }} />
                              )}
                            </div>
                            {reason}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => transition(() => setStep('lost'))}
                        style={{
                          width: '100%',
                          padding: '12px 20px',
                          background: selectedExitReason ? t.text : '#CCC',
                          color: t.white,
                          border: 'none',
                          borderRadius: 9,
                          fontFamily: t.fontSans,
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          cursor: selectedExitReason ? 'pointer' : 'not-allowed',
                          letterSpacing: '-0.01em',
                          transition: 'background 0.2s',
                        }}
                      >
                        Confirm cancellation
                      </button>
                    </div>
                  )}

                  {/* ── SAVED ── */}
                  {step === 'saved' && (
                    <div style={{ textAlign: 'center', padding: '6px 0' }}>
                      <div style={{ fontSize: '2.8rem', marginBottom: 12 }}>🎉</div>
                      <div style={{
                        display: 'inline-block',
                        background: t.greenLight,
                        color: t.green,
                        padding: '4px 16px',
                        borderRadius: 20,
                        fontFamily: t.fontSans,
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: 14,
                      }}>
                        Customer Saved ✓
                      </div>
                      <h3 style={{
                        fontFamily: t.fontSans,
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        color: t.text,
                        margin: '0 0 10px',
                        letterSpacing: '-0.02em',
                      }}>
                        They stayed!
                      </h3>
                      <p style={{
                        fontFamily: t.fontSerif,
                        fontSize: '0.82rem',
                        color: t.gray,
                        lineHeight: 1.65,
                        margin: '0 0 20px',
                        maxWidth: 320,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}>
                        ChurnRecovery automatically applied the offer and logged the save. Your dashboard updates in real time.
                      </p>
                      <div style={{
                        background: '#F0FAF4',
                        border: `1px solid #C3E6D0`,
                        borderRadius: 10,
                        padding: '14px',
                        marginBottom: 20,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 10,
                      }}>
                        {[
                          { value: '+$297', label: 'Revenue saved' },
                          { value: '3 mo', label: 'LTV extended' },
                          { value: '< 1s', label: 'Response time' },
                        ].map(stat => (
                          <div key={stat.label} style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.05rem', color: t.green, letterSpacing: '-0.02em' }}>{stat.value}</div>
                            <div style={{ fontFamily: t.fontSans, fontSize: '0.65rem', color: t.gray, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>{stat.label}</div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => transition(() => { setStep('step1'); setSelectedReason(null); setSelectedExitReason(null) })}
                        style={{
                          padding: '10px 24px',
                          background: t.text,
                          color: t.white,
                          border: 'none',
                          borderRadius: 8,
                          fontFamily: t.fontSans,
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        Try another scenario →
                      </button>
                    </div>
                  )}

                  {/* ── LOST ── */}
                  {step === 'lost' && (
                    <div style={{ textAlign: 'center', padding: '6px 0' }}>
                      <div style={{ fontSize: '2.8rem', marginBottom: 12 }}>📊</div>
                      <div style={{
                        display: 'inline-block',
                        background: '#F5F4F0',
                        color: t.gray,
                        padding: '4px 16px',
                        borderRadius: 20,
                        fontFamily: t.fontSans,
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: 14,
                      }}>
                        Cancellation Logged
                      </div>
                      <h3 style={{
                        fontFamily: t.fontSans,
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        color: t.text,
                        margin: '0 0 10px',
                        letterSpacing: '-0.02em',
                      }}>
                        Customer canceled — data captured
                      </h3>
                      <p style={{
                        fontFamily: t.fontSerif,
                        fontSize: '0.82rem',
                        color: t.gray,
                        lineHeight: 1.65,
                        margin: '0 0 18px',
                        maxWidth: 320,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}>
                        Reason logged. ChurnRecovery automatically schedules win-back emails and updates your churn analytics.
                      </p>
                      <div style={{
                        background: '#F5F4F0',
                        borderRadius: 10,
                        padding: '13px 16px',
                        marginBottom: 20,
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}>
                        {[
                          selectedReason ? `✓ Reason: "${CANCEL_REASONS.find(r => r.id === selectedReason)?.label || 'Other'}"` : '✓ Reason: skipped by customer',
                          selectedExitReason ? `✓ Feedback: "${selectedExitReason}"` : null,
                          '✓ Webhook fired to your backend',
                          '✓ Added to churn analytics dashboard',
                          '✓ Win-back email queued for day 7, 14, 30',
                        ].filter(Boolean).map(item => (
                          <div key={item} style={{ fontFamily: t.fontSans, fontSize: '0.78rem', color: t.gray }}>{item}</div>
                        ))}
                      </div>
                      <button
                        onClick={() => transition(() => { setStep('step1'); setSelectedReason(null); setSelectedExitReason(null) })}
                        style={{
                          padding: '10px 24px',
                          background: t.text,
                          color: t.white,
                          border: 'none',
                          borderRadius: 8,
                          fontFamily: t.fontSans,
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          letterSpacing: '-0.01em',
                        }}
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
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.15)',
              backdropFilter: 'blur(1px)',
              borderRadius: '0 0 16px 16px',
            }}>
              <button
                onClick={() => setStep('step1')}
                style={{
                  background: t.accent,
                  color: t.white,
                  border: 'none',
                  borderRadius: 12,
                  padding: '16px 32px',
                  fontFamily: t.fontSans,
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                  boxShadow: '0 8px 24px rgba(217,119,87,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = t.accentHover; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(217,119,87,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.background = t.accent; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(217,119,87,0.4)' }}
              >
                <span style={{ fontSize: '1.2rem' }}>▶</span>
                Click to start the demo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Step indicator labels */}
      {showModal && !isDone && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 0,
          marginTop: 20,
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'Cancel intent', active: step === 'step1', done: ['step2', 'step3', 'step4', 'saved', 'lost'].includes(step) },
            { label: 'Pause offer', active: step === 'step2', done: ['step3', 'step4', 'saved', 'lost'].includes(step) },
            { label: 'Discount offer', active: step === 'step3', done: ['step4', 'saved', 'lost'].includes(step) },
            { label: 'Exit survey', active: step === 'step4', done: false },
          ].map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                fontFamily: t.fontSans,
                fontSize: '0.72rem',
                fontWeight: s.active ? 700 : 400,
                color: s.active ? t.accent : s.done ? t.green : t.grayLight,
                padding: '4px 10px',
                letterSpacing: '-0.01em',
              }}>
                {s.done ? '✓ ' : ''}{s.label}
              </div>
              {i < 3 && <span style={{ color: t.border, fontSize: '0.7rem' }}>›</span>}
            </div>
          ))}
        </div>
      )}

      {/* CTA after demo completes */}
      {isDone && (
        <div style={{
          marginTop: 28,
          background: t.text,
          borderRadius: 14,
          padding: '28px 32px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: t.fontSans,
            fontWeight: 800,
            fontSize: '1.05rem',
            color: t.white,
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
          }}>
            Want this on your site?
          </p>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.65)',
            margin: '0 0 20px',
            lineHeight: 1.6,
          }}>
            ChurnRecovery is free. Add this cancel flow to your subscription business in under a day.
          </p>
          <a
            href="https://tally.so/r/churnrecovery"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: t.accent,
              color: t.white,
              padding: '12px 28px',
              borderRadius: 9,
              fontFamily: t.fontSans,
              fontWeight: 700,
              fontSize: '0.92rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            Add this to your site — Join waitlist →
          </a>
        </div>
      )}
    </div>
  )
}
