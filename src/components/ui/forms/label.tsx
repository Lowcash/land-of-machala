import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../../lib/utils'

const labelVariants = cva(
  'font-fantasy text-sm font-medium leading-none select-none transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        default: 'text-[var(--color-ivory)]/80',
        highlight: 'text-[var(--color-primary)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Label({
  className,
  variant,
  ...props
}: React.ComponentProps<'label'> & VariantProps<typeof labelVariants>) {
  return (
    <label
      data-slot="label"
      className={cn(labelVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Label }
