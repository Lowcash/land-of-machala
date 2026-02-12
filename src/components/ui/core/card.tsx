import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { CardTitle } from '@/components/ui/prefabs/typography/card'

import { StackProps, getResponsiveClasses, stackVariants } from './stack'

const cardVariants = cva(
  'flex transition-all backdrop-blur-md rounded-lg shadow-lg shadow-black/40',
  {
    variants: {
      variant: {
        primary: 'border border-(--color-secondary) bg-black/80 shadow-xl',
        secondary: 'border border-(--color-secondary)/40 bg-black/60',
        subtle: 'border border-(--color-secondary)/30 bg-black/40 shadow-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

interface CardRootProps extends StackProps, VariantProps<typeof cardVariants> {
  /** Map padding to Stack's p prop for backward compatibility */
  padding?: StackProps['p']
}

function CardRoot({
  variant,
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
  ...props
}: CardRootProps) {
  // Map padding to p if not explicitly provided
  const finalPadding = p || padding || 'md'

  return (
    <div
      data-slot="card"
      className={cn(
        cardVariants({ variant }),
        stackVariants({
          display,
          direction: direction || 'col',
          gap: gap || 'none',
          fullHeight,
          cols,
          align,
          justify,
          wrap,
          p: finalPadding,
          flex,
        }),
        getResponsiveClasses('sm', sm),
        getResponsiveClasses('md', md),
        getResponsiveClasses('lg', lg),
        getResponsiveClasses('xl', xl)
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends Omit<StackProps, 'className'> {}

function CardHeader({
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
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'mb-4 border-b border-(--color-secondary)/20 pb-2 last:mb-0 last:border-0 last:pb-0',
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
        }),
        getResponsiveClasses('sm', sm),
        getResponsiveClasses('md', md),
        getResponsiveClasses('lg', lg),
        getResponsiveClasses('xl', xl)
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardContentProps extends Omit<StackProps, 'className'> {}

function CardContent({
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
  children,
  ...props
}: CardContentProps) {
  return (
    <div
      data-slot="card-content"
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
        }),
        getResponsiveClasses('sm', sm),
        getResponsiveClasses('md', md),
        getResponsiveClasses('lg', lg),
        getResponsiveClasses('xl', xl)
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardFooterProps extends Omit<StackProps, 'className'> {}

function CardFooter({
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
  children,
  ...props
}: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'mt-4 border-t border-(--color-secondary)/20 pt-4',
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
        }),
        getResponsiveClasses('sm', sm),
        getResponsiveClasses('md', md),
        getResponsiveClasses('lg', lg),
        getResponsiveClasses('xl', xl)
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
  Footer: CardFooter,
})

export { Card, cardVariants }
