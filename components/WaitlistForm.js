import { useState, useEffect, useRef } from 'react'
import { useABTest } from '../lib/useABTest'

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
  red: '#DC2626',
  redLight: '#FEF2F2',
  redBorder: '#FECACA',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

// RFC 5322-ish email validation — covers real-world emails without being overly strict
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateEmail(email) {
  if (!email || !email.trim()) return 'Please enter your email address'
  if (!EMAIL_REGEX.test(email.trim())) return 'Please enter a valid email address'
  return null
}

/*
 * A/B TEST: CTA button copy — "Join Waitlist" (A) vs "Get Early Access Free" (B)
 * Variant assigned via useABTest hook (localStorage key: cr_ab_cta).
 * Variant is sent in the form submission body so we can track conversion rate per variant.
 * See lib/useABTest.js for full details on hypothesis, measurement, and winner criteria.
 */
function getReferralCookie() {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)cr_referral=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}

export default function WaitlistForm({ source = 'homepage', dark = false, compact = false, referralCode = null }) {
  const { variant: abVariant, cta: abCta } = useABTest()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | duplicate | error
  const [count, setCount] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [validationError, setValidationError] = useState('')
  const [touched, setTouched] = useState(false)
  const [cookieReferral, setCookieReferral] = useState(null)
  const inputRef = useRef(null)

  // Fetch current count on mount + read referral cookie
  useEffect(() => {
    fetch('/api/waitlist/count')
      .then(r => r.json())
      .then(data => {
        if (data.count > 0) setCount(data.count)
      })
      .catch(() => {})

    // Read referral from cookie (set by /refer/[code] page)
    const cookieCode = getReferralCookie()
    if (cookieCode) setCookieReferral(cookieCode)
  }, [])

  // Clear validation error as user types (after first submit attempt)
  useEffect(() => {
    if (touched && email) {
      const err = validateEmail(email)
      // Only clear the error when valid; don't show new errors while typing
      if (!err) setValidationError('')
    }
  }, [email, touched])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched(true)

    const err = validateEmail(email)
    if (err) {
      setValidationError(err)
      inputRef.current?.focus()
      return
    }

    setValidationError('')
    setStatus('loading')
    setErrorMessage('')

    try {
      // Include referral code: prefer explicit prop, then cookie
      const effectiveReferral = referralCode || cookieReferral || undefined

      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          source,
          variant: abVariant,
          ...(effectiveReferral ? { referral_code: effectiveReferral } : {}),
        }),
      })

      const data = await res.json()

      if (res.status === 201) {
        setStatus('success')
        if (data.count) setCount(data.count)
      } else if (data.duplicate) {
        setStatus('duplicate')
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  const hasValidationError = touched && validationError
  const bgColor = dark ? 'rgba(255,255,255,0.08)' : t.white
  const borderColor = hasValidationError
    ? (dark ? '#F87171' : t.red)
    : (dark ? 'rgba(255,255,255,0.15)' : t.border)
  const textColor = dark ? t.white : t.text
  const subtextColor = dark ? 'rgba(255,255,255,0.6)' : t.gray
  const errorId = `waitlist-error-${source}`

  if (status === 'success' || status === 'duplicate') {
    return (
      <div style={{
        textAlign: 'center',
        padding: compact ? '16px' : '24px',
        borderRadius: '10px',
        background: dark ? 'rgba(45, 122, 79, 0.15)' : t.greenLight,
        border: `1px solid ${dark ? 'rgba(45, 122, 79, 0.3)' : '#C6E6D4'}`,
      }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
          {status === 'duplicate' ? '👋' : '🎉'}
        </div>
        <p style={{
          fontFamily: t.fontSans, fontSize: '0.95rem', fontWeight: 600,
          color: dark ? t.white : t.text, margin: '0 0 4px',
        }}>
          {status === 'duplicate' ? "You're already on the list!" : "You're in!"}
        </p>
        <p style={{
          fontFamily: t.fontSerif, fontSize: '0.82rem',
          color: subtextColor, margin: 0,
        }}>
          {status === 'duplicate'
            ? "We've got your email — we'll reach out soon."
            : "We'll email you when we're ready to launch."}
        </p>
        {count && (
          <p style={{
            fontFamily: t.fontSans, fontSize: '0.75rem',
            color: subtextColor, margin: '8px 0 0', opacity: 0.8,
          }}>
            {count.toLocaleString()} {count === 1 ? 'person' : 'people'} on the waitlist
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{
        display: 'flex', gap: '8px',
        flexDirection: compact ? 'column' : 'row',
      }}>
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            if (touched && email) {
              const err = validateEmail(email)
              if (err) setValidationError(err)
            }
          }}
          placeholder="you@company.com"
          required
          inputMode="email"
          autoComplete="email"
          aria-label="Email address"
          aria-invalid={hasValidationError ? 'true' : 'false'}
          aria-describedby={hasValidationError ? errorId : undefined}
          style={{
            flex: 1,
            padding: compact ? '10px 14px' : '12px 16px',
            borderRadius: '8px',
            border: `1px solid ${borderColor}`,
            background: hasValidationError ? (dark ? 'rgba(220,38,38,0.1)' : t.redLight) : bgColor,
            fontFamily: t.fontSans,
            fontSize: '0.9rem',
            color: textColor,
            outline: 'none',
            minWidth: compact ? '100%' : '240px',
            transition: 'border-color 0.15s, background 0.15s',
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            padding: compact ? '10px 20px' : '12px 24px',
            borderRadius: '8px',
            border: 'none',
            background: status === 'loading' ? t.grayLight : t.accent,
            color: t.white,
            fontFamily: t.fontSans,
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background 0.15s',
          }}
        >
          {status === 'loading' ? 'Joining...' : abCta}
        </button>
      </form>

      {hasValidationError && (
        <p
          id={errorId}
          role="alert"
          style={{
            fontFamily: t.fontSans, fontSize: '0.8rem', color: dark ? '#F87171' : t.red,
            margin: '8px 0 0', display: 'flex', alignItems: 'center', gap: '4px',
          }}
        >
          <span aria-hidden="true">⚠</span> {validationError}
        </p>
      )}

      {status === 'error' && (
        <p
          role="alert"
          style={{
            fontFamily: t.fontSans, fontSize: '0.8rem', color: dark ? '#F87171' : t.red,
            margin: '8px 0 0', display: 'flex', alignItems: 'center', gap: '4px',
          }}
        >
          <span aria-hidden="true">⚠</span> {errorMessage}
        </p>
      )}

      <div style={{
        display: 'flex', gap: '16px', alignItems: 'center',
        marginTop: '10px', flexWrap: 'wrap',
      }}>
        <span style={{
          fontFamily: t.fontSans, fontSize: '0.75rem', color: subtextColor,
        }}>
          Free forever · No credit card required
        </span>
        {count && (
          <span style={{
            fontFamily: t.fontSans, fontSize: '0.75rem', color: subtextColor,
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <span style={{ color: t.green }}>●</span>
            {count.toLocaleString()} on the waitlist
          </span>
        )}
      </div>
    </div>
  )
}
