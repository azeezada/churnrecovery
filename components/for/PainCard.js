/**
 * PainCard — used in /for/* landing pages to highlight pain points.
 *
 * Props:
 *   icon        {string}  Emoji or icon character
 *   title       {string}  Card heading
 *   stat        {string}  (optional) Large stat number, e.g. "3–8%"
 *   statLabel   {string}  (optional) Small label under the stat
 *   description {string}  Body copy
 *   accentColor {string}  (optional) Color for the top border + stat. Defaults to amber.
 *   theme       {object}  (optional) Partial theme override. Merged with defaults.
 */
export default function PainCard({
  icon,
  title,
  stat,
  statLabel,
  description,
  accentColor,
  theme = {},
}) {
  const t = {
    bg: '#FAF9F5',
    text: '#191919',
    gray: '#666666',
    border: '#E5E5E5',
    white: '#FFFFFF',
    amber: '#D97706',
    orange: '#EA580C',
    fontSans: '"Instrument Sans", sans-serif',
    fontSerif: '"Merriweather", serif',
    ...theme,
  }

  const accent = accentColor || t.amber

  return (
    <div style={{
      background: t.white,
      border: `1px solid ${t.border}`,
      borderRadius: '12px',
      padding: '28px 24px',
      borderTop: `3px solid ${accent}`,
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{icon}</div>
      <h3 style={{
        fontFamily: t.fontSans, fontSize: '1rem', fontWeight: 700,
        color: t.text, margin: '0 0 8px',
      }}>
        {title}
      </h3>
      {stat && (
        <div style={{
          fontFamily: t.fontSans, fontWeight: 800,
          fontSize: '2rem', color: accent, margin: '4px 0',
        }}>
          {stat}
        </div>
      )}
      {statLabel && (
        <div style={{
          fontFamily: t.fontSans, fontSize: '0.8rem',
          color: t.orange, marginBottom: '8px',
        }}>
          {statLabel}
        </div>
      )}
      <p style={{
        fontFamily: t.fontSerif, fontSize: '0.88rem',
        color: t.gray, margin: 0, lineHeight: 1.6,
      }}>
        {description}
      </p>
    </div>
  )
}
