import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { CardTitle } from '@/components/ui/prefabs/typography/card'

import { StackProps, stackVariants } from './stack'

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
        })
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({
  children,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>) {
  return (
    <div
      className="mb-4 flex items-center justify-between border-b border-(--color-secondary)/20 pb-2 last:mb-0 last:border-0 last:pb-0"
      {...props}
    >
      {children}
    </div>
  )
}

function CardContent({
  children,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>) {
  return (
    <div className="text-(--color-ivory)/90" {...props}>
      {children}
    </div>
  )
}

function CardFooter({
  children,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>) {
  return (
    <div
      className="mt-4 flex items-center justify-end border-t border-(--color-secondary)/20 pt-4"
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
