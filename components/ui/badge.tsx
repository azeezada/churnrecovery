import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand-accent text-white",
        secondary: "border-transparent bg-brand-border text-brand-text",
        destructive: "border-transparent bg-red-100 text-red-700",
        outline: "border-brand-border text-brand-gray",
        success: "border-transparent bg-brand-green-light text-brand-green",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
