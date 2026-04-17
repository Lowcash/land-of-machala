import { type HTMLAttributes, forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { type Breakpoint } from './box'

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

type ProgressVariantKeys = keyof VariantProps<typeof progressVariants>
type ProgressVariantValue = {
  [K in ProgressVariantKeys]?: VariantProps<typeof progressVariants>[K]
}

const PROGRESS_RESPONSIVE_LOOKUP = {
  sm: {
    size: { sm: 'sm:h-2', md: 'sm:h-3', lg: 'sm:h-4' },
  },
  md: {
    size: { sm: 'md:h-2', md: 'md:h-3', lg: 'md:h-4' },
  },
  lg: {
    size: { sm: 'lg:h-2', md: 'lg:h-3', lg: 'lg:h-4' },
  },
  xl: {
    size: { sm: 'xl:h-2', md: 'xl:h-3', lg: 'xl:h-4' },
  },
}

function getProgressResponsiveClasses(breakpoint: Breakpoint, val?: ProgressVariantValue) {
  const bp = PROGRESS_RESPONSIVE_LOOKUP[breakpoint]
  if (!bp) return ''

  return val?.size ? bp.size[val.size] ?? '' : ''
}

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
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  sm?: ProgressVariantValue
  md?: ProgressVariantValue
  lg?: ProgressVariantValue
  xl?: ProgressVariantValue
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ children, value = 0, max = 100, variant, size, sm, md, lg, xl, className, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(
          progressVariants({ variant, size }),
          getProgressResponsiveClasses('sm', sm),
          getProgressResponsiveClasses('md', md),
          getProgressResponsiveClasses('lg', lg),
          getProgressResponsiveClasses('xl', xl),
          className
        )}
        {...props}
      >
        <div
          className={cn(indicatorVariants({ variant }))}
          style={{ width: `${percentage}%`, height: '100%' }}
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
