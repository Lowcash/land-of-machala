import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { CardTitle } from '@/components/ui/prefabs/typography/card'

import { Stack, type StackProps, splitLayoutProps } from './stack'

const cardVariants = cva('flex transition-all backdrop-blur-md shadow-lg shadow-black/40', {
  variants: {
    variant: {
      primary: 'border border-(--color-primary) bg-black/80 shadow-xl',
      secondary: 'border border-(--color-secondary)/40 bg-black/60',
      subtle: 'border border-(--color-secondary)/20 bg-black/40 shadow-none',
      ghost: 'border-none bg-transparent shadow-none backdrop-blur-none',
      ornamental:
        'border-2 border-(--color-secondary)/40 bg-black/80 shadow-xl ring-1 ring-white/5',
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

interface CardRootProps
  extends
    Omit<StackProps, 'rounded' | 'border' | 'borderColor' | 'opacity' | 'shadow' | 'color'>,
    VariantProps<typeof cardVariants> {
  /** Map padding to Stack's p prop for backward compatibility */
  padding?: StackProps['p']
}

const CardRoot = React.forwardRef<HTMLElement, CardRootProps>((props, ref) => {
  const { layoutProps, restProps } = splitLayoutProps(props)
  const {
    variant,
    rounded: cardRounded,
    padding,
    direction: cardDirection,
    gap: cardGap,
    p: cardP,
    as: Component = 'div',
    children,
    className,
    ...otherProps
  } = restProps as any

  const finalPadding = layoutProps.p ?? padding ?? 'lg'

  return (
    <Stack
      as={Component as any}
      data-slot="card"
      ref={ref}
      className={cn(cardVariants({ variant, rounded: cardRounded }), className)}
      direction="col"
      gap="md"
      {...layoutProps}
      p={finalPadding}
      {...otherProps}
    >
      {children}
    </Stack>
  )
})

CardRoot.displayName = 'Card'

interface CardHeaderProps extends StackProps {}

const CardHeader = React.forwardRef<HTMLElement, CardHeaderProps>((props, ref) => {
  const { layoutProps, restProps } = splitLayoutProps(props)
  const {
    as: Component = 'div',
    children,
    direction,
    align,
    justify,
    gap,
    className,
    ...otherProps
  } = restProps as any

  return (
    <Stack
      as={Component as any}
      data-slot="card-header"
      ref={ref}
      className={cn(
        'border-b-2 border-(--color-secondary)/20 pb-2 last:mb-0 last:border-0 last:pb-0',
        className
      )}
      direction="row"
      align="center"
      justify="between"
      gap="none"
      {...layoutProps}
      {...otherProps}
    >
      {children}
    </Stack>
  )
})

CardHeader.displayName = 'CardHeader'

type CardContentProps = StackProps

const CardContent = React.forwardRef<HTMLElement, CardContentProps>((props, ref) => {
  const { layoutProps, restProps } = splitLayoutProps(props)
  const {
    as: Component = 'div',
    children,
    direction,
    align,
    justify,
    gap,
    className,
    ...otherProps
  } = restProps as any

  return (
    <Stack
      as={Component as any}
      data-slot="card-content"
      ref={ref}
      className={cn('text-(--color-ivory)/90', className)}
      direction="col"
      align="stretch"
      justify="start"
      gap="none"
      {...layoutProps}
      {...otherProps}
    >
      {children}
    </Stack>
  )
})

CardContent.displayName = 'CardContent'

interface CardFooterProps extends StackProps {}

const CardFooter = React.forwardRef<HTMLElement, CardFooterProps>((props, ref) => {
  const { layoutProps, restProps } = splitLayoutProps(props)
  const {
    as: Component = 'div',
    children,
    direction,
    align,
    justify,
    gap,
    className,
    ...otherProps
  } = restProps as any

  return (
    <Stack
      as={Component as any}
      data-slot="card-footer"
      ref={ref}
      className={cn('border-t border-(--color-secondary)/20 pt-4', className)}
      direction="row"
      align="center"
      justify="end"
      gap="none"
      {...layoutProps}
      {...otherProps}
    >
      {children}
    </Stack>
  )
})

CardFooter.displayName = 'CardFooter'

const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
  Footer: CardFooter,
})

export { Card, cardVariants }
