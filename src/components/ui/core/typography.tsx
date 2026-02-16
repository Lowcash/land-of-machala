import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const headingVariants = cva('font-fantasy font-bold tracking-tight', {
  variants: {
    level: {
      h1: 'text-4xl',
      h2: 'text-3xl',
      h3: 'text-2xl',
      h4: 'text-xl',
    },
    font: {
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
      copper: 'text-(--color-secondary)',
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
  },
  defaultVariants: {
    level: 'h1',
    font: 'fantasy',
    color: 'primary',
  },
})

interface HeadingProps
  extends
    Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
}

export function Heading({ level, font, color, align, className, as, ...props }: HeadingProps) {
  if (!props.children) return null
  const Component = as || level || 'h1'
  return (
    <Component
      className={cn(headingVariants({ level, font, color: color as any, align }), className)}
      {...props}
    />
  )
}

const textVariants = cva('leading-relaxed', {
  variants: {
    variant: {
      primary: 'text-base',
      lead: 'text-xl',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm opacity-80',
      'fantasy-value': 'text-lg',
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
      copper: 'text-(--color-secondary)',
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
  },
  defaultVariants: {
    variant: 'primary',
    font: 'body',
    color: 'ivory',
  },
})

export interface TextProps
  extends
    Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div'
}

export function Text({
  variant,
  font,
  color,
  align,
  className,
  as: Component = 'p',
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants({ variant, font, color: color as any, align }), className)}
      {...props}
    />
  )
}
