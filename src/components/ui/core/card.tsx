import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

const cardVariants = cva(
  'flex transition-all backdrop-blur-md rounded-lg shadow-lg shadow-black/40',
  {
    variants: {
      variant: {
        default: 'border border-(--color-secondary)/40 bg-black/60',
        primary: 'border border-(--color-secondary) bg-black/80 shadow-xl',
        subtle: 'border border-(--color-secondary)/30 bg-black/40 shadow-none',
      },
      padding: {
        none: '',
        sm: 'p-2',
        md: 'p-3',
        lg: 'p-4',
        xl: 'p-6',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
      direction: {
        row: 'flex-row',
        col: 'flex-col',
      },
      fullHeight: {
        true: 'h-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      gap: 'none',
      direction: 'col',
      fullHeight: false,
    },
  }
)

interface CardRootProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'>,
    VariantProps<typeof cardVariants> {}

function CardRoot({
  variant,
  padding,
  gap,
  direction,
  fullHeight,
  children,
  ...props
}: CardRootProps) {
  return (
    <div
      data-slot="card"
      className={cardVariants({ variant, padding, gap, direction, fullHeight })}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between border-b border-(--color-secondary)/20 pb-2 last:mb-0 last:border-0 last:pb-0">
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: React.ReactNode
  icon?: React.ReactNode
}

function CardTitle({ children, icon }: CardTitleProps) {
  return (
    <h3 className="font-fantasy flex items-center gap-2 text-xl font-bold text-(--color-primary)">
      {icon && <span className="flex h-6 w-6 items-center justify-center">{icon}</span>}
      {children}
    </h3>
  )
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-(--color-ivory)/90">{children}</div>
}

function CardFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex items-center justify-end border-t border-(--color-secondary)/20 pt-4">
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
