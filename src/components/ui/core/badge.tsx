import * as React from 'react'
import { cn } from '@/lib/utils'

import { type VariantProps, cva } from 'class-variance-authority'

const badgeVariants = cva(
  'flex h-6 w-min px-2 shrink-0 items-center justify-center rounded-full border shadow-sm backdrop-blur-md transition-all font-fantasy text-[10px] uppercase tracking-wider',
  {
    variants: {
      variant: {
        primary: 'border-(--color-primary) text-(--color-primary)',
        secondary: 'border-(--color-secondary) text-(--color-ivory)',
        ghost: 'border-transparent text-inherit shadow-none',
        success: 'border-green-500/50 text-green-500',
        magic: 'border-purple-500/50 text-purple-500',
        danger: 'border-red-500/50 text-red-500',
        info: 'border-blue-500/50 text-blue-500',
        gold: 'border-[#ffd700]/50 text-[#ffd700]',
        copper: 'border-[#8b6f47]/50 text-[#8b6f47]',
      },
      mode: {
        solid: 'bg-black/60',
        outline: 'bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'primary',
      mode: 'solid',
    },
  }
)

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ children, variant, mode, className, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, mode }), className)} {...props}>
      {children}
    </span>
  )
}
