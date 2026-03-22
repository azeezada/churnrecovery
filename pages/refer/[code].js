import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

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
        <meta name="description" content="Sign up for ChurnRecovery free and get Founding Member perks as an early user." />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-[40px_20px] font-sans">
        {/* Logo */}
        <div className="mb-8 text-center">
          <a href="/" className="no-underline">
            <span className="font-sans font-extrabold text-[1.4rem] text-brand-accent tracking-[-0.02em]">
              ChurnRecovery
            </span>
          </a>
        </div>

        {/* Card */}
        <div className="bg-brand-white border border-brand-border rounded-2xl p-[48px_40px] max-w-[520px] w-full shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-center">
          {/* Emoji */}
          <div className="text-[2.5rem] mb-4">🎉</div>

          <h1 className="font-sans text-2xl font-bold text-brand-text mb-3 leading-[1.3]">
            You've been invited to ChurnRecovery
          </h1>

          <p className="font-serif text-base text-brand-gray leading-[1.7] mb-8">
            {inviterText} Sign up free and get{' '}
            <strong className="text-brand-accent">Founding Member perks</strong>{' '}
            as an early user.
          </p>

          {/* Referral code badge */}
          {code && (
            <div className="inline-flex items-center gap-[6px] bg-[#FFF5F0] border border-[#FDDDD4] rounded-[20px] px-[14px] py-[6px] mb-7 text-[0.78rem] text-brand-accent font-sans font-semibold">
              <span>🔗</span>
              Referred by: {code}
            </div>
          )}

          {/* Sign up CTA */}
          <div className="text-left">
            <Link
              href={code ? `/app/sign-up?ref=${code}` : '/app/sign-up'}
              className="inline-block bg-brand-accent text-brand-white px-7 py-3.5 rounded-lg font-sans font-bold text-[0.95rem] no-underline"
            >
              Get Started Free →
            </Link>
          </div>

          {/* Perks list */}
          <div className="mt-7 pt-6 border-t border-brand-border">
            <p className="font-sans text-[0.8rem] font-semibold text-brand-text mb-3 uppercase tracking-[0.05em]">
              Founding Member perks
            </p>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {[
                '✓ Free forever plan — no credit card ever',
                '✓ Priority access before public launch',
                '✓ Direct line to the founder',
                '✓ Shape the product with your feedback',
              ].map((perk, i) => (
                <li key={i} className="font-serif text-[0.85rem] text-brand-gray text-left">
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 font-sans text-[0.75rem] text-[#999] text-center">
          ChurnRecovery helps subscription businesses save canceling members — for free.{' '}
          <a href="/" className="text-brand-accent no-underline">Learn more →</a>
        </p>
      </div>
    </>
  )
}
