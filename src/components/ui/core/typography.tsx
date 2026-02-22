import * as React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { getResponsiveClasses, type BreakpointValue } from './stack'

const headingVariants = cva('font-fantasy font-bold tracking-tight', {
  variants: {
    level: {
      1: 'text-4xl text-(--color-primary)',
      2: 'text-3xl text-(--color-primary)',
      3: 'text-2xl text-(--color-primary)',
      4: 'text-xl text-(--color-primary)',
      5: 'text-lg text-(--color-primary)',
      6: 'text-base text-(--color-primary)',
    },
    font: {
      body: 'font-body',
      fantasy: 'font-fantasy',
      medieval: 'font-medieval',
    },
    color: {
      primary: 'text-(--color-primary)',
      secondary: 'text-(--color-secondary)',
      gold: 'text-(--color-gold)',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    level: 1,
    font: 'fantasy',
    color: 'primary',
  },
})

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function Heading({
  level,
  font,
  color,
  align,
  className,
  as,
  ...props
}: HeadingProps) {
  const Component = as || (`h${level || 1}` as const)
  return (
    <Component
      className={cn(headingVariants({ level, font, color, align }), className)}
      {...props}
    />
  )
}

const textVariants = cva('transition-colors', {
  variants: {
    variant: {
      primary: 'text-(--color-primary)',
      lead: 'text-xl font-fantasy text-(--color-primary)',
      large: 'text-lg text-(--color-primary)',
      base: 'text-base text-(--color-primary)',
      small: 'text-sm text-(--color-secondary)',
      muted: 'text-sm text-(--color-secondary) opacity-60',
      detail: 'text-xs text-(--color-secondary) opacity-70 italic',
      bonus: 'text-xs font-fantasy text-(--color-success)',
      'fantasy-value': 'font-fantasy text-lg text-(--color-gold)',
      decoration: 'font-medieval text-xl text-(--color-gold) opacity-20',
      tiny: 'text-[10px] uppercase tracking-wider text-(--color-secondary)/60',
    },
    font: {
      body: 'font-body',
      fantasy: 'font-fantasy',
      medieval: 'font-medieval',
    },
    color: {
      primary: 'text-(--color-primary)',
      secondary: 'text-(--color-secondary)',
      ivory: 'text-(--color-ivory)',
      success: 'text-(--color-success)',
      danger: 'text-(--color-danger)',
      magic: 'text-purple-500',
      gold: 'text-(--color-gold)',
      info: 'text-(--color-info)',
      hp: 'text-(--color-stat-hp)',
      mana: 'text-(--color-stat-mana)',
      strength: 'text-(--color-stat-strength)',
      intelligence: 'text-(--color-stat-intelligence)',
      agility: 'text-(--color-stat-agility)',
      stamina: 'text-(--color-stat-stamina)',
      inherit: 'text-inherit',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    truncate: {
      true: 'truncate',
    },
    shrink: {
      true: 'shrink',
      false: 'shrink-0',
    },
    grow: {
      true: 'grow',
      false: 'grow-0',
    },
    bold: {
      true: 'font-bold',
    },
    italic: {
      true: 'italic',
    },
    tabularNums: {
      true: 'tabular-nums',
    },
    opacity: {
      '10': 'opacity-10',
      '20': 'opacity-20',
      '30': 'opacity-30',
      '40': 'opacity-40',
      '50': 'opacity-50',
      '60': 'opacity-60',
      '70': 'opacity-70',
      '80': 'opacity-80',
      '90': 'opacity-90',
      '100': 'opacity-100',
    },
  },
  defaultVariants: {
    variant: 'base',
    font: 'body',
    color: 'primary',
  },
})

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  sm?: BreakpointValue
  md?: BreakpointValue
  lg?: BreakpointValue
  xl?: BreakpointValue
}

export function Text({
  variant,
  font,
  color,
  align,
  truncate,
  shrink,
  grow,
  bold,
  italic,
  tabularNums,
  opacity,
  className,
  as: Component = 'p',
  sm,
  md,
  lg,
  xl,
  ...props
}: TextProps) {
  const responsiveClasses = React.useMemo(() => {
    return [
      sm && getResponsiveClasses('sm', sm),
      md && getResponsiveClasses('md', md),
      lg && getResponsiveClasses('lg', lg),
      xl && getResponsiveClasses('xl', xl),
    ].filter(Boolean).join(' ')
  }, [sm, md, lg, xl])

  return (
    <Component
      className={cn(
        textVariants({
          variant,
          font,
          color,
          align,
          truncate,
          shrink,
          grow,
          bold,
          italic,
          tabularNums,
          opacity,
        }),
        responsiveClasses,
        className
      )}
      {...props}
    />
  )
}
