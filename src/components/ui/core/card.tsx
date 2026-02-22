import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { CardTitle } from '@/components/ui/prefabs/typography/card'

import { StackProps, getResponsiveClasses, stackVariants } from './stack'

const cardVariants = cva('flex transition-all backdrop-blur-md shadow-lg shadow-black/40', {
  variants: {
    variant: {
      primary: 'border border-(--color-primary) bg-black/80 shadow-xl',
      secondary: 'border border-(--color-secondary)/40 bg-black/60',
      subtle: 'border border-(--color-secondary)/20 bg-black/40 shadow-none',
      ghost: 'border-none bg-transparent shadow-none backdrop-blur-none',
      ornamental: 'border-2 border-(--color-secondary)/40 bg-black/80 shadow-xl ring-1 ring-white/5',
    },
    rounded: {
      lg: 'rounded-lg',
      md: 'rounded-md',
      base: 'rounded',
      full: 'rounded-full',
      none: 'rounded-none',
    },
  },
  defaultVariants: {
    variant: 'subtle',
    rounded: 'lg',
  },
})

interface CardRootProps extends Omit<StackProps, 'rounded'>, VariantProps<typeof cardVariants> {
  /** Map padding to Stack's p prop for backward compatibility */
  padding?: StackProps['p']
}

const CardRoot = React.forwardRef<HTMLElement, CardRootProps>(
  (
    {
      variant,
      rounded,
      padding,
      gap,
      direction,
      as: Component = 'div',
      fullHeight,
      children,
      display,
      cols,
      align,
      justify,
      wrap,
      p,
      flex,
      sm,
      md,
      lg,
      xl,
      height,
      minHeight,
      ...props
    },
    ref
  ) => {
    // Map padding to p if not explicitly provided
    const finalPadding = p || padding || 'lg'

    return (
      <Component
        data-slot="card"
        ref={ref}
        className={cn(
          cardVariants({ variant, rounded }),
          stackVariants({
            display,
            direction: direction || 'col',
            gap: gap || 'md',
            fullHeight,
            cols,
            align,
            justify,
            wrap,
            p: finalPadding,
            flex,
            height,
            minHeight,
          }),
          getResponsiveClasses('sm', sm),
          getResponsiveClasses('md', md),
          getResponsiveClasses('lg', lg),
          getResponsiveClasses('xl', xl)
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

CardRoot.displayName = 'Card'

type CardHeaderProps = Omit<StackProps, 'className'>

const CardHeader = React.forwardRef<HTMLElement, CardHeaderProps>(
  (
    {
      display,
      direction,
      cols,
      align,
      justify,
      gap,
      fullWidth,
      fullHeight,
      wrap,
      p,
      flex,
      sm,
      md,
      lg,
      xl,
      height,
      minHeight,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        data-slot="card-header"
        ref={ref}
        className={cn(
          'border-b-2 border-(--color-secondary)/20 pb-2 last:mb-0 last:border-0 last:pb-0',
          stackVariants({
            display: display || 'flex',
            direction: direction || 'row',
            align: align || 'center',
            justify: justify || 'between',
            gap: gap || 'none',
            cols,
            fullWidth,
            fullHeight,
            wrap,
            p,
            flex,
            height,
            minHeight,
          }),
          getResponsiveClasses('sm', sm),
          getResponsiveClasses('md', md),
          getResponsiveClasses('lg', lg),
          getResponsiveClasses('xl', xl)
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

CardHeader.displayName = 'CardHeader'

type CardContentProps = Omit<StackProps, 'className'>

const CardContent = React.forwardRef<HTMLElement, CardContentProps>(
  (
    {
      display,
      direction,
      cols,
      align,
      justify,
      gap,
      fullWidth,
      fullHeight,
      wrap,
      p,
      flex,
      sm,
      md,
      lg,
      xl,
      height,
      minHeight,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        data-slot="card-content"
        ref={ref}
        className={cn(
          'text-(--color-ivory)/90',
          stackVariants({
            display,
            direction: direction || 'col',
            cols,
            align: align || 'stretch',
            justify: justify || 'start',
            gap: gap || 'none',
            fullWidth,
            fullHeight,
            wrap,
            p,
            flex,
            height,
            minHeight,
          }),
          getResponsiveClasses('sm', sm),
          getResponsiveClasses('md', md),
          getResponsiveClasses('lg', lg),
          getResponsiveClasses('xl', xl)
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

CardContent.displayName = 'CardContent'

type CardFooterProps = Omit<StackProps, 'className'>

const CardFooter = React.forwardRef<HTMLElement, CardFooterProps>(
  (
    {
      display,
      direction,
      cols,
      align,
      justify,
      gap,
      fullWidth,
      fullHeight,
      wrap,
      p,
      flex,
      sm,
      md,
      lg,
      xl,
      height,
      minHeight,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        data-slot="card-footer"
        ref={ref}
        className={cn(
          'border-t border-(--color-secondary)/20 pt-4',
          stackVariants({
            display: display || 'flex',
            direction: direction || 'row',
            align: align || 'center',
            justify: justify || 'end',
            gap: gap || 'none',
            cols,
            fullWidth,
            fullHeight,
            wrap,
            p,
            flex,
            height,
            minHeight,
          }),
          getResponsiveClasses('sm', sm),
          getResponsiveClasses('md', md),
          getResponsiveClasses('lg', lg),
          getResponsiveClasses('xl', xl)
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

CardFooter.displayName = 'CardFooter'

const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
  Footer: CardFooter,
})

export { Card, cardVariants }
