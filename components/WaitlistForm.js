import { useState, useEffect, useRef } from 'react'
import { useABTest } from '../lib/useABTest'

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
  const errorId = `waitlist-error-${source}`

  // Dynamic class helpers for dark/compact/error states
  const subtextColor = dark ? 'text-[rgba(255,255,255,0.6)]' : 'text-brand-gray'
  const errorColor = dark ? 'text-[#F87171]' : 'text-brand-red'

  const inputBorderBg = hasValidationError
    ? (dark ? 'border-[#F87171] bg-[rgba(220,38,38,0.1)]' : 'border-brand-red bg-[#FEF2F2]')
    : (dark ? 'border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.08)]' : 'border-brand-border bg-brand-white')

  if (status === 'success' || status === 'duplicate') {
    return (
      <div className={`text-center ${compact ? 'p-4' : 'p-6'} rounded-[10px] ${
        dark ? 'bg-[rgba(45,122,79,0.15)] border border-[rgba(45,122,79,0.3)]' : 'bg-brand-green-light border border-[#C6E6D4]'
      }`}>
        <div className="text-2xl mb-2">
          {status === 'duplicate' ? '👋' : '🎉'}
        </div>
        <p className={`font-sans text-[0.95rem] font-semibold mb-1 mt-0 ${dark ? 'text-brand-white' : 'text-brand-text'}`}>
          {status === 'duplicate' ? "You're already on the list!" : "You're in!"}
        </p>
        <p className={`font-serif text-[0.82rem] m-0 ${subtextColor}`}>
          {status === 'duplicate'
            ? "We've got your email — we'll reach out soon."
            : "We'll email you when we're ready to launch."}
        </p>
        {count && (
          <p className={`font-sans text-xs mt-2 mb-0 opacity-80 ${subtextColor}`}>
            {count.toLocaleString()} {count === 1 ? 'person' : 'people'} on the waitlist
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={`flex gap-2 ${compact ? 'flex-col' : 'flex-row'}`}>
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
          className={`flex-1 ${compact ? 'px-3.5 py-2.5 min-w-full' : 'px-4 py-3 min-w-[240px]'} rounded-lg border font-sans text-[0.9rem] outline-none transition-[border-color,background] duration-150 ${inputBorderBg} ${dark ? 'text-brand-white' : 'text-brand-text'}`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`${compact ? 'px-5 py-2.5' : 'px-6 py-3'} rounded-lg border-none font-sans font-bold text-[0.9rem] text-brand-white whitespace-nowrap transition-[background] duration-150 ${
            status === 'loading' ? 'bg-brand-gray-light cursor-not-allowed' : 'bg-brand-accent cursor-pointer'
          }`}
        >
          {status === 'loading' ? 'Joining...' : abCta}
        </button>
      </form>

      {hasValidationError && (
        <p
          id={errorId}
          role="alert"
          className={`font-sans text-[0.8rem] ${errorColor} mt-2 mb-0 flex items-center gap-1`}
        >
          <span aria-hidden="true">⚠</span> {validationError}
        </p>
      )}

      {status === 'error' && (
        <p
          role="alert"
          className={`font-sans text-[0.8rem] ${errorColor} mt-2 mb-0 flex items-center gap-1`}
        >
          <span aria-hidden="true">⚠</span> {errorMessage}
        </p>
      )}

      <div className="flex gap-4 items-center mt-2.5 flex-wrap">
        <span className={`font-sans text-xs ${subtextColor}`}>
          Free forever · No credit card required
        </span>
        {count && (
          <span className={`font-sans text-xs ${subtextColor} flex items-center gap-1`}>
            <span className="text-brand-green">●</span>
            {count.toLocaleString()} on the waitlist
          </span>
        )}
      </div>
    </div>
  )
}
