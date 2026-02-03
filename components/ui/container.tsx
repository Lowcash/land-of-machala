import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

const containerVariants = cva('w-full', {
  variants: {
    size: {
      none: '',
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      full: 'max-w-full',
    },
    centered: {
      true: 'mx-auto',
      false: '',
    },
    px: {
      none: 'px-0',
      sm: 'px-4',
      md: 'px-6',
      lg: 'px-8',
    },
  },
  defaultVariants: {
    size: 'full',
    centered: true,
    px: 'none',
  },
})

export interface ContainerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType
}

export function Container({ size, centered, px, as: Component = 'div', ...props }: ContainerProps) {
  return <Component className={containerVariants({ size, centered, px })} {...props} />
}
