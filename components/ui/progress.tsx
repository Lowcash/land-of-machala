'use client'

import * as React from 'react'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import { type VariantProps, cva } from 'class-variance-authority'

const progressVariants = cva(
  'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full ring-1 ring-white/10',
  {
    variants: {
      variant: {
        default: 'h-2',
        hp: 'h-4',
        mana: 'h-4',
        xp: 'h-3',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const indicatorVariants = cva('h-full w-full flex-1 transition-all', {
  variants: {
    variant: {
      default: 'bg-primary',
      hp: 'bg-linear-to-r from-red-900 via-red-700 to-red-600',
      mana: 'bg-linear-to-r from-blue-900 via-blue-700 to-blue-500',
      xp: 'bg-linear-to-r from-[#8b6f47] via-[#d4a574] to-[#ffd700]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface ProgressProps
  extends
    Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, 'className'>,
    VariantProps<typeof progressVariants> {}

export function Progress({
  variant,
  value,
  ref,
  ...props
}: ProgressProps & { ref?: React.Ref<React.ElementRef<typeof ProgressPrimitive.Root>> }) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress"
      className={progressVariants({ variant })}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={indicatorVariants({ variant })}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}
