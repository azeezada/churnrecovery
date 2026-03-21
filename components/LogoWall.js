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

const t = {
  bg: '#FAF9F5',
  text: '#191919',
  gray: '#666666',
  grayLight: '#C0C0C0',
  accent: '#D97757',
  border: '#E5E5E5',
  white: '#FFFFFF',
  fontSans: '"Instrument Sans", sans-serif',
}

// Placeholder slots shown before real logos come in
// Remove these once you have 3+ real logos
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
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '140px',
        height: '48px',
        borderRadius: '8px',
        border: `1.5px dashed ${t.grayLight}`,
        background: t.white,
        padding: '0 16px',
      }}
    >
      <span
        style={{
          fontFamily: t.fontSans,
          fontSize: '0.72rem',
          fontWeight: 600,
          color: t.grayLight,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
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
      style={{
        maxHeight: '40px',
        maxWidth: '140px',
        width: 'auto',
        display: 'block',
        filter: 'grayscale(100%) opacity(0.6)',
        transition: 'filter 0.2s ease',
        objectFit: 'contain',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0%) opacity(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(100%) opacity(0.6)')}
    />
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${name}`}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {img}
      </a>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {img}
    </div>
  )
}

/**
 * LogoWall
 *
 * @param {Object[]} logos - Array of real logo objects. If empty, renders nothing.
 * @param {boolean}  showPlaceholders - If true AND logos is empty, show placeholder slots
 *                                      (useful during development / pre-launch)
 */
export default function LogoWall({ logos = [], showPlaceholders = false }) {
  const hasRealLogos = logos && logos.length > 0

  // If no real logos and placeholders disabled → render nothing
  if (!hasRealLogos && !showPlaceholders) return null

  const items = hasRealLogos ? logos : PLACEHOLDER_SLOTS

  return (
    <section
      aria-label="Trusted by"
      style={{
        background: t.bg,
        borderBottom: `1px solid ${t.border}`,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '48px 24px',
          textAlign: 'center',
        }}
      >
        {/* Label */}
        <p
          style={{
            fontFamily: t.fontSans,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: t.gray,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '28px',
          }}
        >
          {hasRealLogos ? 'Trusted by' : 'Built for businesses like yours'}
        </p>

        {/* Logo grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px 40px',
          }}
        >
          {hasRealLogos
            ? items.map((logo, i) => (
                <RealLogo
                  key={i}
                  name={logo.name}
                  src={logo.src}
                  href={logo.href}
                />
              ))
            : PLACEHOLDER_SLOTS.map((slot, i) => (
                <PlaceholderLogo key={i} type={slot.type} />
              ))}
        </div>

        {/* Sub-label (placeholder mode only) */}
        {!hasRealLogos && (
          <p
            style={{
              fontFamily: t.fontSans,
              fontSize: '0.82rem',
              color: t.gray,
              marginTop: '20px',
            }}
          >
            Join the waitlist — your logo could be here soon.
          </p>
        )}
      </div>
    </section>
  )
}
