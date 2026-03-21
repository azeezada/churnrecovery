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
 */
export default function HowStep({
  number,
  icon,
  title,
  description,
  callout,
  accentColor,
}) {
  const accent = accentColor || '#D97757'

  return (
    <div className="bg-brand-white border border-brand-border rounded-xl px-6 py-7">
      <div className="flex gap-4 items-start mb-4">
        <div
          className="w-12 h-12 rounded-full bg-[#FDF4F0] flex items-center justify-center font-sans font-extrabold text-[1.1rem] shrink-0"
          style={{ border: `2px solid ${accent}`, color: accent }}
        >
          {number}
        </div>
        <div>
          <div className="text-[1.6rem] mb-1">{icon}</div>
          <h3 className="font-sans text-[1.05rem] font-bold text-brand-text m-0">
            {title}
          </h3>
        </div>
      </div>
      <p className="font-serif text-[0.9rem] text-brand-gray mb-3 leading-[1.7]">
        {description}
      </p>
      {callout && (
        <div
          className="bg-[#FDF4F0] rounded-lg px-3.5 py-2.5 font-sans text-[0.8rem] text-brand-orange"
          style={{ border: `1px solid ${accent}30` }}
        >
          {callout}
        </div>
      )}
    </div>
  )
}
