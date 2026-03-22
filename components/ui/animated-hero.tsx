import * as React from "react"
import { cn } from "../../lib/utils"

interface AnimatedHeroTextProps {
  children: React.ReactNode
  className?: string
}

const shimmerStyle: React.CSSProperties = {
  backgroundImage: "linear-gradient(90deg, #D97757 0%, #E8956B 25%, #D97757 50%, #C4603D 75%, #D97757 100%)",
  backgroundSize: "200% 100%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "hero-shimmer 3s ease-in-out infinite",
}

/**
 * AnimatedHeroText — shimmer/gradient text animation for hero sections.
 * Wraps text in a shimmering gradient effect using CSS animations.
 */
export function AnimatedHeroText({ children, className }: AnimatedHeroTextProps) {
  return (
    <span className={cn("inline-block", className)} style={shimmerStyle}>
      {children}
    </span>
  )
}

interface AnimatedHeroProps {
  eyebrow?: React.ReactNode
  headline: React.ReactNode
  subheadline?: React.ReactNode
  cta?: React.ReactNode
  className?: string
}

const animBase: React.CSSProperties = {
  opacity: 0,
  animation: "hero-fade-up 0.7s ease forwards",
}

/**
 * AnimatedHero — full hero section with entrance animations.
 * Fades in and slides up each element with staggered delays.
 */
export function AnimatedHero({ eyebrow, headline, subheadline, cta, className }: AnimatedHeroProps) {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      {eyebrow && (
        <div style={{ ...animBase, animationDelay: "0.1s" }} className="mb-8">
          {eyebrow}
        </div>
      )}
      <div style={{ ...animBase, animationDelay: "0.25s" }} className="mb-6">
        {headline}
      </div>
      {subheadline && (
        <div style={{ ...animBase, animationDelay: "0.4s" }} className="mb-10">
          {subheadline}
        </div>
      )}
      {cta && (
        <div style={{ ...animBase, animationDelay: "0.55s" }}>
          {cta}
        </div>
      )}
    </div>
  )
}
