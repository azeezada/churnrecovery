/**
 * BenefitCard — horizontal icon+text card used in benefit/feature lists on /for/* pages.
 *
 * Props:
 *   icon        {string}  Emoji or icon character
 *   title       {string}  Card heading
 *   description {string}  Body copy
 *   theme       {object}  (optional) Partial theme override. Merged with defaults.
 */
export default function BenefitCard({ icon, title, description, theme = {} }) {
  const t = {
    text: '#191919',
    gray: '#666666',
    border: '#E5E5E5',
    white: '#FFFFFF',
    fontSans: '"Instrument Sans", sans-serif',
    fontSerif: '"Merriweather", serif',
    ...theme,
  }

  return (
    <div style={{
      display: 'flex', gap: '14px', alignItems: 'flex-start',
      background: t.white, border: `1px solid ${t.border}`,
      borderRadius: '10px', padding: '20px',
    }}>
      <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{icon}</span>
      <div>
        <h4 style={{
          fontFamily: t.fontSans, fontSize: '0.92rem',
          fontWeight: 700, color: t.text, margin: '0 0 4px',
        }}>
          {title}
        </h4>
        <p style={{
          fontFamily: t.fontSerif, fontSize: '0.82rem',
          color: t.gray, margin: 0, lineHeight: 1.55,
        }}>
          {description}
        </p>
      </div>
    </div>
  )
}
