import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

const badgeVariants = cva(
  'flex h-6 w-min px-2 shrink-0 items-center justify-center rounded-full border shadow-sm backdrop-blur-md transition-all font-fantasy text-[10px] uppercase tracking-wider',
  {
    variants: {
      variant: {
        primary: 'border-(--color-primary) bg-black/80 text-(--color-primary)',
        secondary: 'border-(--color-secondary) bg-black/60 text-(--color-ivory)',
        ghost: 'border-transparent bg-transparent text-inherit shadow-none',
        success: 'border-green-500/50 bg-green-500/10 text-green-500',
        magic: 'border-purple-500/50 bg-purple-500/10 text-purple-500',
        danger: 'border-red-500/50 bg-red-500/10 text-red-500',
        info: 'border-blue-500/50 bg-blue-500/10 text-blue-500',
        gold: 'border-[#ffd700]/50 bg-[#ffd700]/10 text-[#ffd700]',
        copper: 'border-[#8b6f47]/50 bg-[#8b6f47]/10 text-[#8b6f47]',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

interface BadgeProps extends Omit<VariantProps<typeof badgeVariants>, 'className'> {
  children: React.ReactNode
}

export function Badge({ children, variant }: BadgeProps) {
  return <span className={badgeVariants({ variant })}>{children}</span>
}
