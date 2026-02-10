import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../lib/utils'

const headingVariants = cva('font-fantasy font-bold tracking-tight text-(--color-primary)', {
  variants: {
    level: {
      h1: 'text-4xl lg:text-5xl',
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-2xl lg:text-3xl',
      h4: 'text-xl lg:text-2xl',
    },
  },
  defaultVariants: {
    level: 'h1',
  },
})

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
}

export function Heading({ level, as, className, ...props }: HeadingProps) {
  const Component = as || level || 'h1'
  return <Component className={cn(headingVariants({ level }), className)} {...props} />
}

const textVariants = cva('text-(--color-ivory)/90 leading-relaxed', {
  variants: {
    variant: {
      default: 'text-base',
      lead: 'text-xl text-(--color-ivory)',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-(--color-secondary)/80',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div'
}

export function Text({ variant, as: Component = 'p', className, ...props }: TextProps) {
  return <Component className={cn(textVariants({ variant }), className)} {...props} />
}
