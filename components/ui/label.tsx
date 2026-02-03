import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

const labelVariants = cva(
  'text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 transition-colors',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        game: 'font-fantasy text-[#d4a574] tracking-wide',
        muted: 'text-[#8b7355] text-[10px] uppercase tracking-tight font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export function Label({
  variant,
  ref,
  ...props
}: Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'className'> &
  VariantProps<typeof labelVariants> & {
    ref?: React.Ref<HTMLLabelElement>
  }) {
  return <label ref={ref} className={labelVariants({ variant })} {...props} />
}
