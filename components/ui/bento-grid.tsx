import * as React from "react"
import { cn } from "../../lib/utils"

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

/**
 * BentoGrid — responsive bento grid layout for feature sections.
 * Use with BentoCard components as children.
 */
export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[180px]",
        className
      )}
    >
      {children}
    </div>
  )
}

interface BentoCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  className?: string
  /** Spans 2 columns on lg screens */
  colSpan2?: boolean
  /** Spans 2 rows */
  rowSpan2?: boolean
  /** Decorative background element */
  background?: React.ReactNode
}

/**
 * BentoCard — individual cell in a BentoGrid.
 */
export function BentoCard({
  icon,
  title,
  description,
  className,
  colSpan2,
  rowSpan2,
  background,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-brand-border bg-white p-6",
        "transition-shadow duration-200 hover:shadow-md",
        colSpan2 && "lg:col-span-2",
        rowSpan2 && "row-span-2",
        className
      )}
    >
      {background && (
        <div className="pointer-events-none absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30">
          {background}
        </div>
      )}
      <div className="relative z-10 flex flex-col h-full">
        {icon && (
          <div className="mb-3 text-2xl">{icon}</div>
        )}
        <h3 className="font-sans font-semibold text-brand-text text-base mb-1.5">
          {title}
        </h3>
        <p className="font-sans text-sm text-brand-gray leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
