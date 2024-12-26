import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "border border-input bg-background shadow-sm inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-20 disabled:border-none",
  {
    variants: {
      variant: {
        default:
          "hover:bg-yellow-500/20",
        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success/70",
        warning:
          "bg-warning text-warning-foreground shadow-sm hover:bg-warning/70",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/70",
        info:
          "bg-info text-info-foreground shadow-sm hover:bg-info/70",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/70",
      },
      size: {
        default: "h-9 px-4 py-2",
        ['shrink-sm']: "w-fit min-h-8 rounded-md px-3 text-xs",
        ['shrink-lg']: "w-fit min-h-10 rounded-md px-8",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        ['icon-lg']: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
