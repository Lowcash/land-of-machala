import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '../../../lib/utils'

const badgeVariants = cva(
  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 shadow-sm backdrop-blur-md transition-all',
  {
    variants: {
      variant: {
        primary:
          'border-(--color-primary) bg-black/80 text-(--color-primary)',
        secondary:
          'border-(--color-secondary) bg-black/60 text-(--color-ivory)',
        outline:
          'border-(--color-primary)/40 bg-transparent text-(--color-primary) shadow-none group-hover:border-(--color-primary)/60',
        'outline-secondary':
          'border-(--color-secondary)/30 bg-transparent text-(--color-ivory) shadow-none group-hover:border-(--color-ivory)/40 group-hover:text-(--color-ivory)',
        ghost: 'border-transparent bg-transparent text-inherit shadow-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, variant, className }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {children}
    </span>
  )
}


