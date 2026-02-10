import * as React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const stackVariants = cva('', {
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
  },
})

export interface StackProps
  extends React.HTMLAttributes<HTMLElement>,
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
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          stackVariants({ 
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
            flex
          }),
          className
        )}
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
