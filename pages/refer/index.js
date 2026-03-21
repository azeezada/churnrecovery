import { useState } from 'react'
import Head from 'next/head'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  accent: '#D97757',
  accentHover: '#C4603D',
  border: '#E5E5E5',
  white: '#FFFFFF',
  green: '#2D7A4F',
  greenLight: '#EDF7F1',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function ReferralGenerator() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const slug = slugify(input)
  const referralUrl = slug ? `https://churnrecovery.com/refer/${slug}` : ''

  const handleCopy = async () => {
    if (!referralUrl) return
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = referralUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      <Head>
        <title>Generate Your Referral Link — ChurnRecovery</title>
        <meta name="description" content="Generate your personal ChurnRecovery referral link to share with your audience." />
        <meta name="robots" content="noindex" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: t.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        fontFamily: t.fontSans,
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: t.fontSans,
              fontWeight: 800,
              fontSize: '1.4rem',
              color: t.accent,
              letterSpacing: '-0.02em',
            }}>
              ChurnRecovery
            </span>
          </a>
        </div>

        {/* Card */}
        <div style={{
          background: t.white,
          border: `1px solid ${t.border}`,
          borderRadius: '16px',
          padding: '48px 40px',
          maxWidth: '540px',
          width: '100%',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          <h1 style={{
            fontFamily: t.fontSans,
            fontSize: '1.5rem',
            fontWeight: 700,
            color: t.text,
            margin: '0 0 8px',
          }}>
            Your Referral Link
          </h1>
          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '0.9rem',
            color: t.gray,
            margin: '0 0 32px',
            lineHeight: 1.6,
          }}>
            Enter your name or a custom code to generate your shareable link.
            Anyone who signs up through it will be tagged as referred by you.
          </p>

          {/* Input */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontFamily: t.fontSans,
              fontSize: '0.82rem',
              fontWeight: 600,
              color: t.text,
              marginBottom: '6px',
            }}>
              Your name or code
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. dawood, john-smith, newsletter-pro"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: `1px solid ${t.border}`,
                background: t.white,
                fontFamily: t.fontSans,
                fontSize: '0.9rem',
                color: t.text,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Generated URL */}
          {slug && (
            <div style={{
              background: '#F5F5F0',
              border: `1px solid ${t.border}`,
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '16px',
            }}>
              <p style={{
                fontFamily: t.fontSans,
                fontSize: '0.75rem',
                fontWeight: 600,
                color: t.gray,
                margin: '0 0 6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Your referral link
              </p>
              <p style={{
                fontFamily: t.fontSans,
                fontSize: '0.9rem',
                color: t.accent,
                margin: 0,
                wordBreak: 'break-all',
                fontWeight: 600,
              }}>
                {referralUrl}
              </p>
            </div>
          )}

          {/* Copy button */}
          <button
            onClick={handleCopy}
            disabled={!slug}
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: !slug ? '#ccc' : copied ? t.green : t.accent,
              color: t.white,
              fontFamily: t.fontSans,
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: !slug ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
              marginBottom: '24px',
            }}
          >
            {copied ? '✓ Copied!' : 'Copy Link'}
          </button>

          {/* How to use */}
          <div style={{
            borderTop: `1px solid ${t.border}`,
            paddingTop: '24px',
          }}>
            <p style={{
              fontFamily: t.fontSans,
              fontSize: '0.8rem',
              fontWeight: 600,
              color: t.text,
              margin: '0 0 12px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              How it works
            </p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              {[
                '1. Share your link with your audience',
                '2. When they sign up, they\'re tagged as referred by you',
                '3. You get credit — and they get Founding Member perks',
              ].map((step, i) => (
                <li key={i} style={{
                  fontFamily: t.fontSerif,
                  fontSize: '0.85rem',
                  color: t.gray,
                  lineHeight: 1.5,
                }}>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {slug && (
            <div style={{
              marginTop: '20px',
              padding: '14px 16px',
              background: t.greenLight,
              border: '1px solid #C6E6D4',
              borderRadius: '8px',
            }}>
              <p style={{
                fontFamily: t.fontSans,
                fontSize: '0.82rem',
                color: t.green,
                margin: 0,
              }}>
                💡 <strong>Share tip:</strong> "Check out ChurnRecovery — it's free and saves canceling subscribers automatically. Sign up through my link: {referralUrl}"
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p style={{
          marginTop: '24px',
          fontFamily: t.fontSans,
          fontSize: '0.75rem',
          color: '#999',
          textAlign: 'center',
        }}>
          <a href="/" style={{ color: t.accent, textDecoration: 'none' }}>← Back to ChurnRecovery</a>
        </p>
      </div>
    </>
  )
}
