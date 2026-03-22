import Link from 'next/link'

/**
 * SignUpCTA — replaces WaitlistForm across the site.
 * Simple CTA that links to /app/sign-up (Clerk auth).
 * Props:
 *   - dark: boolean — dark background variant
 *   - compact: boolean — smaller padding
 *   - source: string — tracking source (added as query param)
 *   - heading: string — optional heading text
 *   - subtext: string — optional subtext
 */
export default function SignUpCTA({ source = 'homepage', dark = false, compact = false, heading, subtext }) {
  const signUpUrl = source ? `/app/sign-up?source=${encodeURIComponent(source)}` : '/app/sign-up'

  return (
    <div className={compact ? '' : 'text-center'}>
      {heading && (
        <p className={`font-sans text-[1rem] font-semibold mb-3 mt-0 ${dark ? 'text-brand-white' : 'text-brand-text'}`}>
          {heading}
        </p>
      )}
      <div className={`flex gap-3 ${compact ? 'flex-col' : 'flex-row justify-center'} items-center flex-wrap`}>
        <Link
          href={signUpUrl}
          className={`${compact ? 'px-5 py-2.5 text-[0.88rem]' : 'px-7 py-3.5 text-[0.95rem]'} rounded-lg border-none font-sans font-bold text-brand-white bg-brand-accent no-underline inline-flex items-center gap-2 transition-opacity hover:opacity-90`}
        >
          Get Started Free →
        </Link>
        <Link
          href="/demo"
          className={`${compact ? 'px-5 py-2.5 text-[0.88rem]' : 'px-6 py-3 text-[0.9rem]'} rounded-lg border font-sans font-medium no-underline inline-flex items-center gap-2 ${
            dark ? 'border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.8)]' : 'border-brand-border text-brand-gray'
          }`}
        >
          See Demo
        </Link>
      </div>
      <p className={`font-sans text-xs mt-3 mb-0 ${dark ? 'text-[rgba(255,255,255,0.6)]' : 'text-brand-gray'}`}>
        {subtext || 'Free forever · No credit card · Set up in 5 minutes'}
      </p>
    </div>
  )
}
