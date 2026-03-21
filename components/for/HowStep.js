/**
 * HowStep — numbered step card used in "How It Works" sections of /for/* pages.
 *
 * Props:
 *   number      {string|number}  Step number (displayed in circle badge)
 *   icon        {string}         Emoji/icon
 *   title       {string}         Step heading
 *   description {string}         Body copy
 *   callout     {string}         (optional) Highlighted callout text shown below description
 *   accentColor {string}         (optional) Accent color for badge border + callout. Defaults to #D97757.
 *   theme       {object}         (optional) Partial theme override. Merged with defaults.
 */
export default function HowStep({
  number,
  icon,
  title,
  description,
  callout,
  accentColor,
  theme = {},
}) {
  const t = {
    text: '#191919',
    gray: '#666666',
    border: '#E5E5E5',
    white: '#FFFFFF',
    accent: '#D97757',
    accentBg: '#FDF4F0',
    orange: '#EA580C',
    fontSans: '"Instrument Sans", sans-serif',
    fontSerif: '"Merriweather", serif',
    ...theme,
  }

  const accent = accentColor || t.accent

  return (
    <div style={{
      background: t.white,
      border: `1px solid ${t.border}`,
      borderRadius: '12px',
      padding: '28px 24px',
    }}>
      <div style={{
        display: 'flex', gap: '16px',
        alignItems: 'flex-start', marginBottom: '16px',
      }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: t.accentBg, border: `2px solid ${accent}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: t.fontSans, fontWeight: 800, fontSize: '1.1rem',
          color: accent, flexShrink: 0,
        }}>
          {number}
        </div>
        <div>
          <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{icon}</div>
          <h3 style={{
            fontFamily: t.fontSans, fontSize: '1.05rem',
            fontWeight: 700, color: t.text, margin: 0,
          }}>
            {title}
          </h3>
        </div>
      </div>
      <p style={{
        fontFamily: t.fontSerif, fontSize: '0.9rem',
        color: t.gray, margin: '0 0 12px', lineHeight: 1.7,
      }}>
        {description}
      </p>
      {callout && (
        <div style={{
          background: t.accentBg,
          border: `1px solid ${accent}30`,
          borderRadius: '8px', padding: '10px 14px',
          fontFamily: t.fontSans, fontSize: '0.8rem', color: t.orange,
        }}>
          {callout}
        </div>
      )}
    </div>
  )
}
