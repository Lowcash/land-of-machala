import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { HStack } from './stack'

const badgeVariants = cva(
  'inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold font-fantasy uppercase tracking-wider transition-colors border',
  {
    variants: {
      variant: {
        default: 'border-game-copper/50 bg-game-copper/10 text-game-copper-muted',
        gold: 'border-game-gold/50 bg-game-gold/10 text-game-gold',
        copper: 'border-game-copper-muted/50 bg-game-copper-muted/10 text-game-copper-muted',
        cold: 'border-game-info/50 bg-game-info/10 text-game-info',
        nature: 'border-game-success/50 bg-game-success/10 text-game-success',
        magic: 'border-game-magic/50 bg-game-magic/10 text-game-magic',
        danger: 'border-game-danger/50 bg-game-danger/10 text-game-danger',
        success: 'border-game-success/50 bg-game-success/10 text-game-success',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <HStack
      align="center"
      _internalClassName={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
