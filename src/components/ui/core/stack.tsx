import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

export const stackVariants = cva('', {
  variants: {
    display: {
      flex: 'flex',
      grid: 'grid',
    },
    direction: {
      row: 'flex-row',
      col: 'flex-col',
    },
    cols: {
      '1': 'grid-cols-1',
      '2': 'grid-cols-2',
      '3': 'grid-cols-3',
      '4': 'grid-cols-4',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      xxl: 'gap-12',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
    fullHeight: {
      true: 'h-full',
      false: '',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
    p: {
      none: 'p-0',
      xs: 'p-1',
      sm: 'p-2',
      md: 'p-3',
      lg: 'p-4',
      xl: 'p-6',
    },
    flex: {
      '1': 'flex-1',
      auto: 'flex-auto',
      none: 'flex-none',
    },
    maxWidth: {
      none: '',
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      full: 'max-w-full',
      prose: 'max-w-prose',
    },
    mx: {
      none: '',
      auto: 'mx-auto',
    },
  },
  defaultVariants: {
    display: 'flex',
    direction: 'col',
    align: 'stretch',
    justify: 'start',
    gap: 'none',
    fullWidth: false,
    fullHeight: false,
    wrap: false,
    maxWidth: 'none',
    mx: 'none',
  },
})

export interface StackProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'style'>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType
}

export const Stack = React.forwardRef<HTMLElement, StackProps>(
  (
    {
      display,
      direction,
      cols,
      as: Component = 'div',
      align,
      justify,
      gap,
      fullWidth,
      fullHeight,
      wrap,
      p,
      flex,
      maxWidth,
      mx,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={stackVariants({
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
          maxWidth,
          mx,
        })}
        {...props}
      />
    )
  }
)

Stack.displayName = 'Stack'

export const HStack = React.forwardRef<HTMLElement, Omit<StackProps, 'direction'>>((props, ref) => {
  return <Stack ref={ref} direction="row" {...props} />
})
HStack.displayName = 'HStack'

export const VStack = React.forwardRef<HTMLElement, Omit<StackProps, 'direction'>>((props, ref) => {
  return <Stack ref={ref} direction="col" {...props} />
})
VStack.displayName = 'VStack'
