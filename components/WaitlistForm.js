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
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

export default function WaitlistForm({ source = 'homepage', dark = false, compact = false }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | duplicate | error
  const [count, setCount] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  // Fetch current count on mount
  useEffect(() => {
    fetch('/api/waitlist/count')
      .then(r => r.json())
      .then(data => {
        if (data.count > 0) setCount(data.count)
      })
      .catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })

      const data = await res.json()

      if (res.status === 201) {
        setStatus('success')
        if (data.count) setCount(data.count)
      } else if (data.duplicate) {
        setStatus('duplicate')
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  const bgColor = dark ? 'rgba(255,255,255,0.08)' : t.white
  const borderColor = dark ? 'rgba(255,255,255,0.15)' : t.border
  const textColor = dark ? t.white : t.text
  const subtextColor = dark ? 'rgba(255,255,255,0.6)' : t.gray

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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          style={{
            flex: 1,
            padding: compact ? '10px 14px' : '12px 16px',
            borderRadius: '8px',
            border: `1px solid ${borderColor}`,
            background: bgColor,
            fontFamily: t.fontSans,
            fontSize: '0.9rem',
            color: textColor,
            outline: 'none',
            minWidth: compact ? '100%' : '240px',
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
          {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
        </button>
      </form>

      {status === 'error' && (
        <p style={{
          fontFamily: t.fontSans, fontSize: '0.8rem', color: '#DC2626',
          margin: '8px 0 0',
        }}>
          {errorMessage}
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
