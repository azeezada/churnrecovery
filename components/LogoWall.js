/**
 * LogoWall.js — "Trusted by" social proof section
 *
 * Usage:
 *   import LogoWall from '../components/LogoWall'
 *   <LogoWall logos={logos} />
 *
 * logos array shape:
 *   [{ name: 'Acme Corp', src: '/logos/acme.png', href: 'https://acme.com', type: 'Newsletter Creator' }]
 *
 * If logos is empty, the component renders nothing (no placeholder, no empty section).
 * When logos have no src (placeholder mode), show greyed-out industry type labels.
 */

// Placeholder slots shown before real logos come in
const PLACEHOLDER_SLOTS = [
  { type: 'Newsletter Creator' },
  { type: 'Course Seller' },
  { type: 'SaaS Founder' },
  { type: 'Business Coach' },
  { type: 'Membership Site' },
]

function PlaceholderLogo({ type }) {
  return (
    <div
      title={`Spot reserved for a ${type}`}
      className="flex items-center justify-center w-[140px] h-12 rounded-lg border-[1.5px] border-dashed border-[#C0C0C0] bg-brand-white px-4"
    >
      <span className="font-sans text-[0.72rem] font-semibold text-[#C0C0C0] tracking-[0.04em] uppercase text-center leading-tight">
        {type}
      </span>
    </div>
  )
}

function RealLogo({ name, src, href }) {
  const img = (
    <img
      src={src}
      alt={`${name} logo`}
      className="max-h-10 max-w-[140px] w-auto block object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-[filter,opacity] duration-200"
    />
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${name}`}
        className="flex items-center justify-center"
      >
        {img}
      </a>
    )
  }

  return (
    <div className="flex items-center justify-center">
      {img}
    </div>
  )
}

export default function LogoWall({ logos = [], showPlaceholders = false }) {
  const hasRealLogos = logos && logos.length > 0

  if (!hasRealLogos && !showPlaceholders) return null

  const items = hasRealLogos ? logos : PLACEHOLDER_SLOTS

  return (
    <section aria-label="Trusted by" className="bg-brand-bg border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-6 py-12 text-center">
        <p className="font-sans text-[0.75rem] font-semibold text-brand-gray tracking-[0.08em] uppercase mb-7">
          {hasRealLogos ? 'Trusted by' : 'Built for businesses like yours'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-y-6 gap-x-10">
          {hasRealLogos
            ? items.map((logo, i) => (
                <RealLogo key={i} name={logo.name} src={logo.src} href={logo.href} />
              ))
            : PLACEHOLDER_SLOTS.map((slot, i) => (
                <PlaceholderLogo key={i} type={slot.type} />
              ))}
        </div>

        {!hasRealLogos && (
          <p className="font-sans text-[0.82rem] text-brand-gray mt-5">
            <a href="/app/sign-up" className="text-brand-accent no-underline font-semibold">Start your free trial</a> — your logo could be here soon.
          </p>
        )}
      </div>
    </section>
  )
}
