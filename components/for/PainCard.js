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
 */
export default function PainCard({
  icon,
  title,
  stat,
  statLabel,
  description,
  accentColor,
}) {
  const accent = accentColor || '#D97706'

  return (
    <div className="bg-brand-white border border-brand-border rounded-xl px-6 py-7" style={{ borderTop: `3px solid ${accent}` }}>
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="font-sans text-base font-bold text-brand-text mb-2">
        {title}
      </h3>
      {stat && (
        <div className="font-sans font-extrabold text-[2rem] my-1" style={{ color: accent }}>
          {stat}
        </div>
      )}
      {statLabel && (
        <div className="font-sans text-[0.8rem] text-brand-orange mb-2">
          {statLabel}
        </div>
      )}
      <p className="font-serif text-[0.88rem] text-brand-gray m-0 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
