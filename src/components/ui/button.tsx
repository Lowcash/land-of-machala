import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'font-fantasy text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'w-full rounded-lg border-2 border-[#d4a574] p-2 text-center text-[#ffd700] hover:scale-[1.02] hover:bg-[#d4a574]/10 disabled:hover:scale-100 disabled:hover:bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

function Button({
  className,
  variant,
  asChild = false,
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {children}
        </div>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
