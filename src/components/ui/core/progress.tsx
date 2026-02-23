import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const progressVariants = cva(
  'progress-bar relative w-full overflow-hidden rounded bg-black/60 ring-1 ring-white/10 shadow-inner border border-white/5 min-h-2',
  {
    variants: {
      variant: {
        hp: 'bg-black/80',
        mana: 'bg-black/80',
        xp: 'bg-black/80 border border-(--color-secondary)/20',
        energy: 'bg-black/80',
        gold: 'bg-black/80',
      },
      size: {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
      },
    },
    defaultVariants: {
      variant: 'hp',
      size: 'md',
    },
  }
)

const indicatorVariants = cva('h-full block transition-all duration-300 ease-in-out', {
  variants: {
    variant: {
      hp: 'bg-linear-to-r from-red-900 via-red-700 to-red-600',
      mana: 'bg-linear-to-r from-blue-900 via-blue-700 to-blue-500',
      xp: 'bg-linear-to-r from-(--color-gold)/60 via-(--color-gold) to-(--color-gold)/80',
      energy: 'bg-linear-to-r from-yellow-900 via-yellow-700 to-yellow-600',
      gold: 'bg-linear-to-r from-yellow-600 via-yellow-500 to-yellow-400',
    },
  },
  defaultVariants: {
    variant: 'hp',
  },
})

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ children, value = 0, max = 100, variant, size, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(progressVariants({ variant, size }))}
        {...props}
      >
        <div
          className={cn(indicatorVariants({ variant }))}
          style={{ width: `${percentage}%` }}
        />
        {/* Shimmer/Highlights */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/10 to-transparent" />

        {/* Internal Content (Text/Values) */}
        {children && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {children}
          </div>
        )}
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export { Progress }
