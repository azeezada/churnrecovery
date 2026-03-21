/**
 * BenefitCard — horizontal icon+text card used in benefit/feature lists on /for/* pages.
 *
 * Props:
 *   icon        {string}  Emoji or icon character
 *   title       {string}  Card heading
 *   description {string}  Body copy
 */
export default function BenefitCard({ icon, title, description }) {
  return (
    <div className="flex gap-3.5 items-start bg-brand-white border border-brand-border rounded-[10px] p-5">
      <span className="text-[1.4rem] shrink-0">{icon}</span>
      <div>
        <h4 className="font-sans text-[0.92rem] font-bold text-brand-text mb-1">
          {title}
        </h4>
        <p className="font-serif text-[0.82rem] text-brand-gray m-0 leading-[1.55]">
          {description}
        </p>
      </div>
    </div>
  )
}
