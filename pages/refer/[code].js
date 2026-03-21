import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import WaitlistForm from '../../components/WaitlistForm'

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  accent: '#D97757',
  border: '#E5E5E5',
  white: '#FFFFFF',
  fontSans: '"Instrument Sans", sans-serif',
  fontSerif: '"Merriweather", serif',
}

// Map known referral codes to display names
const CODE_NAMES = {
  dawood: 'Dawood',
}

function getDisplayName(code) {
  if (!code) return null
  const normalized = code.toLowerCase().replace(/[^a-z0-9-]/g, '')
  return CODE_NAMES[normalized] || null
}

function setReferralCookie(code) {
  if (typeof document === 'undefined') return
  const normalized = code.toLowerCase().replace(/[^a-z0-9-]/g, '')
  const expires = new Date()
  expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days
  document.cookie = `cr_referral=${encodeURIComponent(normalized)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

export default function ReferralPage() {
  const router = useRouter()
  const { code } = router.query
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!code) return
    // Store referral cookie
    setReferralCookie(code)
    setReady(true)
  }, [code])

  const displayName = getDisplayName(code)
  const inviterText = displayName
    ? `${displayName} thinks you'd love ChurnRecovery.`
    : 'A friend thinks you\'d love ChurnRecovery.'

  return (
    <>
      <Head>
        <title>You've been invited to ChurnRecovery</title>
        <meta name="description" content="Join the ChurnRecovery waitlist and get Founding Member perks when we launch." />
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
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          textAlign: 'center',
        }}>
          {/* Emoji */}
          <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🎉</div>

          <h1 style={{
            fontFamily: t.fontSans,
            fontSize: '1.5rem',
            fontWeight: 700,
            color: t.text,
            margin: '0 0 12px',
            lineHeight: 1.3,
          }}>
            You've been invited to ChurnRecovery
          </h1>

          <p style={{
            fontFamily: t.fontSerif,
            fontSize: '1rem',
            color: t.gray,
            lineHeight: 1.7,
            margin: '0 0 32px',
          }}>
            {inviterText} Join the waitlist and we'll give you{' '}
            <strong style={{ color: t.accent }}>Founding Member perks</strong>{' '}
            when we launch.
          </p>

          {/* Referral code badge */}
          {code && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFF5F0',
              border: '1px solid #FDDDD4',
              borderRadius: '20px',
              padding: '6px 14px',
              marginBottom: '28px',
              fontSize: '0.78rem',
              color: t.accent,
              fontFamily: t.fontSans,
              fontWeight: 600,
            }}>
              <span>🔗</span>
              Referred by: {code}
            </div>
          )}

          {/* Waitlist form */}
          <div style={{ textAlign: 'left' }}>
            <WaitlistForm source="referral" referralCode={code} />
          </div>

          {/* Perks list */}
          <div style={{
            marginTop: '28px',
            paddingTop: '24px',
            borderTop: `1px solid ${t.border}`,
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
              Founding Member perks
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
                '✓ Free forever plan — no credit card ever',
                '✓ Priority access before public launch',
                '✓ Direct line to the founder',
                '✓ Shape the product with your feedback',
              ].map((perk, i) => (
                <li key={i} style={{
                  fontFamily: t.fontSerif,
                  fontSize: '0.85rem',
                  color: t.gray,
                  textAlign: 'left',
                }}>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <p style={{
          marginTop: '24px',
          fontFamily: t.fontSans,
          fontSize: '0.75rem',
          color: '#999',
          textAlign: 'center',
        }}>
          ChurnRecovery helps subscription businesses save canceling members — for free.{' '}
          <a href="/" style={{ color: t.accent, textDecoration: 'none' }}>Learn more →</a>
        </p>
      </div>
    </>
  )
}
