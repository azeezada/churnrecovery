import { useState } from 'react'

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
  red: '#C0392B',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

// Demo scenario: SaaS customer trying to cancel
const CANCEL_REASONS = [
  { id: 'too_expensive', label: 'It\'s too expensive', icon: '💸' },
  { id: 'not_using', label: 'I\'m not using it enough', icon: '😴' },
  { id: 'missing_features', label: 'Missing features I need', icon: '🔧' },
  { id: 'switching', label: 'Switching to another tool', icon: '↩️' },
  { id: 'pausing', label: 'Just need a break', icon: '⏸️' },
  { id: 'other', label: 'Something else', icon: '💬' },
]

const OFFERS = {
  too_expensive: {
    type: 'discount',
    headline: 'Wait — here\'s 30% off for 3 months',
    body: 'We know budgets are tight. Keep your data and workflows with a 30% discount for the next 3 months, then back to normal.',
    cta: 'Accept 30% Off',
    ctaDismiss: 'Cancel anyway',
    icon: '🎁',
    badge: '30% OFF',
    badgeColor: '#D97757',
  },
  not_using: {
    type: 'pause',
    headline: 'How about a 3-month pause instead?',
    body: 'Life gets busy. Pause your account for up to 3 months — your data stays safe, your integrations stay connected, and you can resume anytime.',
    cta: 'Pause for 3 Months',
    ctaDismiss: 'Cancel anyway',
    icon: '⏸️',
    badge: 'PAUSE OPTION',
    badgeColor: '#4A90D9',
  },
  missing_features: {
    type: 'feedback',
    headline: 'Tell us what\'s missing',
    body: 'You\'re exactly who we\'re building for. What features would make this a no-brainer? We\'d love to build them. Share your feedback and we\'ll reach out directly.',
    cta: 'Share Feedback',
    ctaDismiss: 'Cancel anyway',
    icon: '🛠️',
    badge: 'HELP US IMPROVE',
    badgeColor: '#2D7A4F',
  },
  switching: {
    type: 'discount',
    headline: 'Before you go — 50% off for 2 months',
    body: 'Give us one more chance to prove our value. Stay for 2 months at 50% off. If it\'s still not the right fit, we\'ll cancel with no hard feelings.',
    cta: 'Stay for 50% Off',
    ctaDismiss: 'Cancel anyway',
    icon: '🤝',
    badge: '50% OFF',
    badgeColor: '#D97757',
  },
  pausing: {
    type: 'pause',
    headline: 'We\'ll hold your spot — pause for free',
    body: 'Take the time you need. Pause for up to 6 months, completely free. Your data, settings, and integrations will be waiting when you come back.',
    cta: 'Pause My Account',
    ctaDismiss: 'Cancel anyway',
    icon: '🔒',
    badge: 'FREE PAUSE',
    badgeColor: '#4A90D9',
  },
  other: {
    type: 'human',
    headline: 'Can we help?',
    body: 'Before you go, we\'d love to understand what went wrong. Sometimes a quick 15-minute call can fix what emails can\'t.',
    cta: 'Talk to a Human',
    ctaDismiss: 'Cancel anyway',
    icon: '🙋',
    badge: 'SUPPORT',
    badgeColor: '#6B4FA0',
  },
}

// Step: 1=reason, 2=offer, 3=result
export default function CancelFlowDemo({ compact = false }) {
  const [step, setStep] = useState(1)
  const [selectedReason, setSelectedReason] = useState(null)
  const [outcome, setOutcome] = useState(null) // 'saved' | 'lost'
  const [isAnimating, setIsAnimating] = useState(false)

  const offer = selectedReason ? OFFERS[selectedReason] : null

  const transition = (fn) => {
    setIsAnimating(true)
    setTimeout(() => {
      fn()
      setIsAnimating(false)
    }, 200)
  }

  const handleReasonSelect = (id) => {
    setSelectedReason(id)
    transition(() => setStep(2))
  }

  const handleAccept = () => {
    transition(() => {
      setOutcome('saved')
      setStep(3)
    })
  }

  const handleDismiss = () => {
    transition(() => {
      setOutcome('lost')
      setStep(3)
    })
  }

  const handleReset = () => {
    transition(() => {
      setStep(1)
      setSelectedReason(null)
      setOutcome(null)
    })
  }

  const containerStyle = {
    background: t.white,
    border: `1px solid ${t.border}`,
    borderRadius: compact ? '16px' : '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    maxWidth: compact ? '480px' : '560px',
    width: '100%',
    margin: '0 auto',
    opacity: isAnimating ? 0 : 1,
    transition: 'opacity 0.2s ease',
  }

  const mockAppBar = (
    <div style={{
      background: '#1A1A2E',
      padding: '10px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      <div style={{ display: 'flex', gap: '6px' }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
      </div>
      <div style={{
        flex: 1,
        background: '#2A2A3E',
        borderRadius: '4px',
        padding: '3px 10px',
        fontFamily: t.fontSans,
        fontSize: '0.72rem',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: '0.02em',
      }}>
        app.yoursaas.com/account/cancel
      </div>
    </div>
  )

  const progressBar = (
    <div style={{
      height: '3px',
      background: '#F0EFEB',
      display: 'flex',
    }}>
      {[1, 2, 3].map(s => (
        <div key={s} style={{
          flex: 1,
          background: step >= s ? t.accent : 'transparent',
          transition: 'background 0.3s ease',
        }} />
      ))}
    </div>
  )

  return (
    <div style={containerStyle}>
      {mockAppBar}
      {progressBar}

      <div style={{ padding: compact ? '24px' : '32px' }}>
        {/* Step 1: Reason Selection */}
        {step === 1 && (
          <div>
            <div style={{
              fontSize: compact ? '0.7rem' : '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: t.grayLight,
              fontFamily: t.fontSans,
              marginBottom: '12px',
            }}>
              Step 1 of 2
            </div>
            <h3 style={{
              fontFamily: t.fontSans,
              fontSize: compact ? '1.15rem' : '1.3rem',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-0.02em',
              margin: '0 0 8px',
            }}>
              Before you go — why are you canceling?
            </h3>
            <p style={{
              fontFamily: t.fontSerif,
              fontSize: '0.88rem',
              color: t.gray,
              margin: '0 0 24px',
              lineHeight: 1.6,
            }}>
              This helps us improve. Your feedback goes straight to the product team.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {CANCEL_REASONS.map(reason => (
                <button
                  key={reason.id}
                  onClick={() => handleReasonSelect(reason.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    border: `1px solid ${t.border}`,
                    borderRadius: '8px',
                    background: t.white,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    fontFamily: t.fontSans,
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    color: t.text,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = t.accent
                    e.currentTarget.style.background = '#FDF8F5'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = t.border
                    e.currentTarget.style.background = t.white
                  }}
                >
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{reason.icon}</span>
                  {reason.label}
                  <span style={{ marginLeft: 'auto', color: t.grayLight, fontSize: '0.8rem' }}>→</span>
                </button>
              ))}
            </div>
            <button
              style={{
                marginTop: '16px',
                width: '100%',
                padding: '10px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: t.fontSans,
                fontSize: '0.82rem',
                color: t.grayLight,
                textDecoration: 'underline',
              }}
            >
              Skip and cancel immediately
            </button>
          </div>
        )}

        {/* Step 2: Offer */}
        {step === 2 && offer && (
          <div>
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: t.grayLight,
              fontFamily: t.fontSans,
              marginBottom: '12px',
            }}>
              Step 2 of 2 — Exclusive offer
            </div>

            {/* Offer card */}
            <div style={{
              background: '#FDF8F5',
              border: `1px solid #F0E8E0`,
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '20px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Badge */}
              <div style={{
                display: 'inline-block',
                background: offer.badgeColor,
                color: t.white,
                padding: '3px 10px',
                borderRadius: '4px',
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                fontFamily: t.fontSans,
                marginBottom: '16px',
              }}>
                {offer.badge}
              </div>

              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{offer.icon}</div>

              <h3 style={{
                fontFamily: t.fontSans,
                fontSize: compact ? '1.1rem' : '1.25rem',
                fontWeight: 700,
                color: t.text,
                letterSpacing: '-0.02em',
                margin: '0 0 12px',
              }}>
                {offer.headline}
              </h3>
              <p style={{
                fontFamily: t.fontSerif,
                fontSize: '0.88rem',
                color: t.gray,
                lineHeight: 1.7,
                margin: 0,
              }}>
                {offer.body}
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleAccept}
                style={{
                  padding: '14px 24px',
                  background: t.accent,
                  color: t.white,
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: t.fontSans,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => e.currentTarget.style.background = t.accentHover}
                onMouseLeave={e => e.currentTarget.style.background = t.accent}
              >
                {offer.cta}
              </button>
              <button
                onClick={handleDismiss}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  color: t.grayLight,
                  border: `1px solid ${t.border}`,
                  borderRadius: '8px',
                  fontFamily: t.fontSans,
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                {offer.ctaDismiss}
              </button>
            </div>

            <button
              onClick={() => transition(() => setStep(1))}
              style={{
                marginTop: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: t.fontSans,
                fontSize: '0.8rem',
                color: t.grayLight,
                padding: '4px 0',
              }}
            >
              ← Back
            </button>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
            {outcome === 'saved' ? (
              <>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
                <div style={{
                  display: 'inline-block',
                  background: t.greenLight,
                  color: t.green,
                  padding: '4px 14px',
                  borderRadius: '20px',
                  fontFamily: t.fontSans,
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '16px',
                }}>
                  Customer Saved ✓
                </div>
                <h3 style={{
                  fontFamily: t.fontSans,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: t.text,
                  letterSpacing: '-0.02em',
                  margin: '0 0 10px',
                }}>
                  Offer accepted!
                </h3>
                <p style={{
                  fontFamily: t.fontSerif,
                  fontSize: '0.88rem',
                  color: t.gray,
                  lineHeight: 1.7,
                  margin: '0 0 24px',
                  maxWidth: '340px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                  This customer stayed. ChurnRecovery automatically applied the offer and logged the save in your analytics dashboard.
                </p>
                <div style={{
                  background: '#F5F4F0',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '24px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '12px',
                  textAlign: 'center',
                }}>
                  {[
                    { value: '+$99', label: 'Revenue saved' },
                    { value: '3 mo', label: 'Extended LTV' },
                    { value: '67%', label: 'Avg save rate' },
                  ].map(stat => (
                    <div key={stat.label}>
                      <div style={{ fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.1rem', color: t.green, letterSpacing: '-0.02em' }}>
                        {stat.value}
                      </div>
                      <div style={{ fontFamily: t.fontSans, fontSize: '0.72rem', color: t.grayLight, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📊</div>
                <div style={{
                  display: 'inline-block',
                  background: '#F5F4F0',
                  color: t.gray,
                  padding: '4px 14px',
                  borderRadius: '20px',
                  fontFamily: t.fontSans,
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '16px',
                }}>
                  Cancellation Logged
                </div>
                <h3 style={{
                  fontFamily: t.fontSans,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: t.text,
                  letterSpacing: '-0.02em',
                  margin: '0 0 10px',
                }}>
                  Customer canceled — feedback captured
                </h3>
                <p style={{
                  fontFamily: t.fontSerif,
                  fontSize: '0.88rem',
                  color: t.gray,
                  lineHeight: 1.7,
                  margin: '0 0 24px',
                  maxWidth: '340px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                  Cancellation reason logged. ChurnRecovery will trigger a failed payment recovery sequence if applicable, and add this to your churn analysis.
                </p>
                <div style={{
                  background: '#F5F4F0',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  marginBottom: '24px',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                  fontFamily: t.fontSans,
                  color: t.gray,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}>
                  <div>✓ Reason: "{CANCEL_REASONS.find(r => r.id === selectedReason)?.label}"</div>
                  <div>✓ Webhook fired to your backend</div>
                  <div>✓ Added to churn analytics dashboard</div>
                  <div>✓ Win-back email scheduled for day 7</div>
                </div>
              </>
            )}
            <button
              onClick={handleReset}
              style={{
                display: 'inline-block',
                padding: '10px 24px',
                background: t.text,
                color: t.white,
                border: 'none',
                borderRadius: '8px',
                fontFamily: t.fontSans,
                fontWeight: 600,
                fontSize: '0.88rem',
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
  )
}
