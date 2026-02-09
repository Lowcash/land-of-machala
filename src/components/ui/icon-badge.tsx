import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const iconBadgeVariants = cva(
  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 shadow-sm backdrop-blur-sm transition-all',
  {
    variants: {
      variant: {
        primary: 'border-[#d4a574] bg-black/80 text-[#ffd700]',
        secondary: 'border-[#8b6f47] bg-black/60 text-[#f8f5f2]',
        'outline-secondary':
          'border-[#8b6f47]/30 bg-transparent text-[#f8f5f2] shadow-none group-hover:border-[#f8f5f2]/40 group-hover:text-[#f8f5f2]',
        ghost: 'border-transparent bg-transparent text-inherit shadow-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

interface IconBadgeProps extends VariantProps<typeof iconBadgeVariants> {
  children: React.ReactNode
}

export function IconBadge({ children, variant }: IconBadgeProps) {
  return (
    <span className={cn(iconBadgeVariants({ variant }))}>
      {children}
    </span>
  )
}


