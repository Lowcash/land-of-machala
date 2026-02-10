import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../../lib/utils'

const cardVariants = cva(
  'rounded-lg border-2 shadow-lg shadow-black/40 backdrop-blur-md transition-all',
  {
    variants: {
      variant: {
        default: 'border-[var(--color-secondary)]/40 bg-black/60',
        primary: 'border-[var(--color-primary)] bg-black/80',
      },
      padding: {
        none: '',
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
)

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function Card({ variant, padding, children, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, padding }))}
      {...props}
    >
      {children}
    </div>
  )
}

export { Card, cardVariants }
