import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Game Specific Variants
        'game-primary':
          'border-2 border-[#8b6f47] bg-linear-to-br from-[#1a1408] to-[#2a1f10] text-[#d4a574] hover:border-[#d4a574] hover:text-[#ffd700] hover:shadow-[0_0_10px_rgba(212,165,116,0.2)]',
        'game-secondary':
          'border border-[#8b6f47]/50 bg-black/40 text-[#8b7355] hover:border-[#8b6f47] hover:text-[#d4a574]',
        'game-action':
          'bg-linear-to-r from-[#8b6f47] to-[#6d5a3e] text-[#f5e6d3] border border-[#d4a574]/30 hover:brightness-110 shadow-md',
        'game-danger':
          'border border-red-900/50 bg-red-950/30 text-red-400 hover:bg-red-950/50 hover:border-red-500/50 hover:text-red-300',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
        // Game Specific Sizes
        'game-sm': 'h-7 px-2 text-xs',
        'game-md': 'h-10 px-4',
        'game-lg': 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  disabled,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
