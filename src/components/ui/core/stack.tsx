import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

export const stackVariants = cva('', {
  variants: {
    display: {
      flex: 'flex',
      grid: 'grid',
      none: 'hidden',
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
    pt: {
      none: 'pt-0',
      xs: 'pt-1',
      sm: 'pt-2',
      md: 'pt-4',
      lg: 'pt-6',
      xl: 'pt-8',
    },
    pb: {
      none: 'pb-0',
      xs: 'pb-1',
      sm: 'pb-2',
      md: 'pb-4',
      lg: 'pb-6',
      xl: 'pb-8',
    },
    px: {
      none: 'px-0',
      xs: 'px-1',
      sm: 'px-2',
      md: 'px-4',
      lg: 'px-6',
      xl: 'px-8',
    },
    py: {
      none: 'py-0',
      xs: 'py-1',
      sm: 'py-2',
      md: 'py-4',
      lg: 'py-6',
      xl: 'py-8',
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
      '5xl': 'max-w-5xl',
      full: 'max-w-full',
      prose: 'max-w-prose',
    },
    mx: {
      none: '',
      auto: 'mx-auto',
    },
    minHeight: {
      zero: 'min-h-0',
      none: '',
      screen: 'min-h-screen',
      dvh: 'min-h-dvh',
      full: 'min-h-full',
    },
    minWidth: {
      zero: 'min-w-0',
      none: '',
      full: 'min-w-full',
    },
    height: {
      auto: 'h-auto',
      full: 'h-full',
      creation: 'h-[480px]',
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
    minHeight: 'none',
    minWidth: 'none',
    height: 'auto',
  },
})

// Static maps to ensure Tailwind scanner detects the classes
const responsiveMaps = {
  display: {
    flex: { sm: 'sm:flex', md: 'md:flex', lg: 'lg:flex', xl: 'xl:flex' },
    grid: { sm: 'sm:grid', md: 'md:grid', lg: 'lg:grid', xl: 'xl:grid' },
    none: { sm: 'sm:hidden', md: 'md:hidden', lg: 'lg:hidden', xl: 'xl:hidden' },
  },
  direction: {
    row: { sm: 'sm:flex-row', md: 'md:flex-row', lg: 'lg:flex-row', xl: 'xl:flex-row' },
    col: { sm: 'sm:flex-col', md: 'md:flex-col', lg: 'lg:flex-col', xl: 'xl:flex-col' },
  },
  cols: {
    '1': { sm: 'sm:grid-cols-1', md: 'md:grid-cols-1', lg: 'lg:grid-cols-1', xl: 'xl:grid-cols-1' },
    '2': { sm: 'sm:grid-cols-2', md: 'md:grid-cols-2', lg: 'lg:grid-cols-2', xl: 'xl:grid-cols-2' },
    '3': { sm: 'sm:grid-cols-3', md: 'md:grid-cols-3', lg: 'lg:grid-cols-3', xl: 'xl:grid-cols-3' },
    '4': { sm: 'sm:grid-cols-4', md: 'md:grid-cols-4', lg: 'lg:grid-cols-4', xl: 'xl:grid-cols-4' },
  },
  align: {
    start: {
      sm: 'sm:items-start',
      md: 'md:items-start',
      lg: 'lg:items-start',
      xl: 'xl:items-start',
    },
    center: {
      sm: 'sm:items-center',
      md: 'md:items-center',
      lg: 'lg:items-center',
      xl: 'xl:items-center',
    },
    end: { sm: 'sm:items-end', md: 'md:items-end', lg: 'lg:items-end', xl: 'xl:items-end' },
    baseline: {
      sm: 'sm:items-baseline',
      md: 'md:items-baseline',
      lg: 'lg:items-baseline',
      xl: 'xl:items-baseline',
    },
    stretch: {
      sm: 'sm:items-stretch',
      md: 'md:items-stretch',
      lg: 'lg:items-stretch',
      xl: 'xl:items-stretch',
    },
  },
  justify: {
    start: {
      sm: 'sm:justify-start',
      md: 'md:justify-start',
      lg: 'lg:justify-start',
      xl: 'xl:justify-start',
    },
    center: {
      sm: 'sm:justify-center',
      md: 'md:justify-center',
      lg: 'lg:justify-center',
      xl: 'xl:justify-center',
    },
    end: { sm: 'sm:justify-end', md: 'md:justify-end', lg: 'lg:justify-end', xl: 'xl:justify-end' },
    between: {
      sm: 'sm:justify-between',
      md: 'md:justify-between',
      lg: 'lg:justify-between',
      xl: 'xl:justify-between',
    },
    around: {
      sm: 'sm:justify-around',
      md: 'md:justify-around',
      lg: 'lg:justify-around',
      xl: 'xl:justify-around',
    },
  },
  gap: {
    none: { sm: 'sm:gap-0', md: 'md:gap-0', lg: 'lg:gap-0', xl: 'xl:gap-0' },
    xs: { sm: 'sm:gap-1', md: 'md:gap-1', lg: 'lg:gap-1', xl: 'xl:gap-1' },
    sm: { sm: 'sm:gap-2', md: 'md:gap-2', lg: 'lg:gap-2', xl: 'xl:gap-2' },
    md: { sm: 'sm:gap-4', md: 'md:gap-4', lg: 'lg:gap-4', xl: 'xl:gap-4' },
    lg: { sm: 'sm:gap-6', md: 'md:gap-6', lg: 'lg:gap-6', xl: 'xl:gap-6' },
    xl: { sm: 'sm:gap-8', md: 'md:gap-8', lg: 'lg:gap-8', xl: 'xl:gap-8' },
    xxl: { sm: 'sm:gap-12', md: 'md:gap-12', lg: 'lg:gap-12', xl: 'xl:gap-12' },
  },
  p: {
    none: { sm: 'sm:p-0', md: 'md:p-0', lg: 'lg:p-0', xl: 'xl:p-0' },
    xs: { sm: 'sm:p-1', md: 'md:p-1', lg: 'lg:p-1', xl: 'xl:p-1' },
    sm: { sm: 'sm:p-2', md: 'md:p-2', lg: 'lg:p-2', xl: 'xl:p-2' },
    md: { sm: 'sm:p-3', md: 'md:p-3', lg: 'lg:p-3', xl: 'xl:p-3' },
    lg: { sm: 'sm:p-4', md: 'md:p-4', lg: 'lg:p-4', xl: 'xl:p-4' },
    xl: { sm: 'sm:p-6', md: 'md:p-6', lg: 'lg:p-6', xl: 'xl:p-6' },
  },
  pt: {
    none: { sm: 'sm:pt-0', md: 'md:pt-0', lg: 'lg:pt-0', xl: 'xl:pt-0' },
    xs: { sm: 'sm:pt-1', md: 'md:pt-1', lg: 'lg:pt-1', xl: 'xl:pt-1' },
    sm: { sm: 'sm:pt-2', md: 'md:pt-2', lg: 'lg:pt-2', xl: 'xl:pt-2' },
    md: { sm: 'sm:pt-4', md: 'md:pt-4', lg: 'lg:pt-4', xl: 'xl:pt-4' },
    lg: { sm: 'sm:pt-6', md: 'md:pt-6', lg: 'lg:pt-6', xl: 'xl:pt-6' },
    xl: { sm: 'sm:pt-8', md: 'md:pt-8', lg: 'lg:pt-8', xl: 'xl:pt-8' },
  },
  pb: {
    none: { sm: 'sm:pb-0', md: 'md:pb-0', lg: 'lg:pb-0', xl: 'xl:pb-0' },
    xs: { sm: 'sm:pb-1', md: 'md:pb-1', lg: 'lg:pb-1', xl: 'xl:pb-1' },
    sm: { sm: 'sm:pb-2', md: 'md:pb-2', lg: 'lg:pb-2', xl: 'xl:pb-2' },
    md: { sm: 'sm:pb-4', md: 'md:pb-4', lg: 'lg:pb-4', xl: 'xl:pb-4' },
    lg: { sm: 'sm:pb-6', md: 'md:pb-6', lg: 'lg:pb-6', xl: 'xl:pb-6' },
    xl: { sm: 'sm:pb-8', md: 'md:pb-8', lg: 'lg:pb-8', xl: 'xl:pb-8' },
  },
  px: {
    none: { sm: 'sm:px-0', md: 'md:px-0', lg: 'lg:px-0', xl: 'xl:px-0' },
    xs: { sm: 'sm:px-1', md: 'md:px-1', lg: 'lg:px-1', xl: 'xl:px-1' },
    sm: { sm: 'sm:px-2', md: 'md:px-2', lg: 'lg:px-2', xl: 'xl:px-2' },
    md: { sm: 'sm:px-4', md: 'md:px-4', lg: 'lg:px-4', xl: 'xl:px-4' },
    lg: { sm: 'sm:px-6', md: 'md:px-6', lg: 'lg:px-6', xl: 'xl:px-6' },
    xl: { sm: 'sm:px-8', md: 'md:px-8', lg: 'lg:px-8', xl: 'xl:px-8' },
  },
  py: {
    none: { sm: 'sm:py-0', md: 'md:py-0', lg: 'lg:py-0', xl: 'xl:py-0' },
    xs: { sm: 'sm:py-1', md: 'md:py-1', lg: 'lg:py-1', xl: 'xl:py-1' },
    sm: { sm: 'sm:py-2', md: 'md:py-2', lg: 'lg:py-2', xl: 'xl:py-2' },
    md: { sm: 'sm:py-4', md: 'md:py-4', lg: 'lg:py-4', xl: 'xl:py-4' },
    lg: { sm: 'sm:py-6', md: 'md:py-6', lg: 'lg:py-6', xl: 'xl:py-6' },
    xl: { sm: 'sm:py-8', md: 'md:py-8', lg: 'lg:py-8', xl: 'xl:py-8' },
  },
  flex: {
    '1': { sm: 'sm:flex-1', md: 'md:flex-1', lg: 'lg:flex-1', xl: 'xl:flex-1' },
    auto: { sm: 'sm:flex-auto', md: 'md:flex-auto', lg: 'lg:flex-auto', xl: 'xl:flex-auto' },
    none: { sm: 'sm:flex-none', md: 'md:flex-none', lg: 'lg:flex-none', xl: 'xl:flex-none' },
  },
  maxWidth: {
    none: { sm: 'sm:max-w-none', md: 'md:max-w-none', lg: 'lg:max-w-none', xl: 'xl:max-w-none' },
    xs: { sm: 'sm:max-w-xs', md: 'md:max-w-xs', lg: 'lg:max-w-xs', xl: 'xl:max-w-xs' },
    sm: { sm: 'sm:max-w-sm', md: 'md:max-w-sm', lg: 'lg:max-w-sm', xl: 'xl:max-w-sm' },
    md: { sm: 'sm:max-w-md', md: 'md:max-w-md', lg: 'lg:max-w-md', xl: 'xl:max-w-md' },
    lg: { sm: 'sm:max-w-lg', md: 'md:max-w-lg', lg: 'lg:max-w-lg', xl: 'xl:max-w-lg' },
    xl: { sm: 'sm:max-w-xl', md: 'md:max-w-xl', lg: 'lg:max-w-xl', xl: 'xl:max-w-xl' },
    '2xl': { sm: 'sm:max-w-2xl', md: 'md:max-w-2xl', lg: 'lg:max-w-2xl', xl: 'xl:max-w-2xl' },
    '3xl': { sm: 'sm:max-w-3xl', md: 'md:max-w-3xl', lg: 'lg:max-w-3xl', xl: 'xl:max-w-3xl' },
    '5xl': { sm: 'sm:max-w-5xl', md: 'md:max-w-5xl', lg: 'lg:max-w-5xl', xl: 'xl:max-w-5xl' },
    full: { sm: 'sm:max-w-full', md: 'md:max-w-full', lg: 'lg:max-w-full', xl: 'xl:max-w-full' },
    prose: {
      sm: 'sm:max-w-prose',
      md: 'md:max-w-prose',
      lg: 'lg:max-w-prose',
      xl: 'xl:max-w-prose',
    },
  },
  mx: {
    none: { sm: 'sm:mx-0', md: 'md:mx-0', lg: 'lg:mx-0', xl: 'xl:mx-0' },
    auto: { sm: 'sm:mx-auto', md: 'md:mx-auto', lg: 'lg:mx-auto', xl: 'xl:mx-auto' },
  },
  minHeight: {
    zero: { sm: 'sm:min-h-0', md: 'md:min-h-0', lg: 'lg:min-h-0', xl: 'xl:min-h-0' },
    none: { sm: 'sm:min-h-none', md: 'md:min-h-none', lg: 'lg:min-h-none', xl: 'xl:min-h-none' },
    screen: {
      sm: 'sm:min-h-screen',
      md: 'md:min-h-screen',
      lg: 'lg:min-h-screen',
      xl: 'xl:min-h-screen',
    },
    dvh: { sm: 'sm:min-h-dvh', md: 'md:min-h-dvh', lg: 'lg:min-h-dvh', xl: 'xl:min-h-dvh' },
    full: { sm: 'sm:min-h-full', md: 'md:min-h-full', lg: 'lg:min-h-full', xl: 'xl:min-h-full' },
  },
  minWidth: {
    zero: { sm: 'sm:min-w-0', md: 'md:min-w-0', lg: 'lg:min-w-0', xl: 'xl:min-w-0' },
    none: { sm: 'sm:min-w-none', md: 'md:min-w-none', lg: 'lg:min-w-none', xl: 'xl:min-w-none' },
    full: { sm: 'sm:min-w-full', md: 'md:min-w-full', lg: 'lg:min-w-full', xl: 'xl:min-w-full' },
  },
  height: {
    auto: { sm: 'sm:h-auto', md: 'md:h-auto', lg: 'lg:h-auto', xl: 'xl:h-auto' },
    full: { sm: 'sm:h-full', md: 'md:h-full', lg: 'lg:h-full', xl: 'xl:h-full' },
    creation: {
      sm: 'sm:h-[480px]',
      md: 'md:h-[480px]',
      lg: 'lg:h-[480px]',
      xl: 'xl:h-[480px]',
    },
  },
}

type BreakpointValue = {
  display?: keyof typeof responsiveMaps.display
  direction?: keyof typeof responsiveMaps.direction
  cols?: keyof typeof responsiveMaps.cols
  align?: keyof typeof responsiveMaps.align
  justify?: keyof typeof responsiveMaps.justify
  gap?: keyof typeof responsiveMaps.gap
  p?: keyof typeof responsiveMaps.p
  pt?: keyof typeof responsiveMaps.pt
  pb?: keyof typeof responsiveMaps.pb
  px?: keyof typeof responsiveMaps.px
  py?: keyof typeof responsiveMaps.py
  flex?: keyof typeof responsiveMaps.flex
  maxWidth?: keyof typeof responsiveMaps.maxWidth
  mx?: keyof typeof responsiveMaps.mx
  minHeight?: keyof typeof responsiveMaps.minHeight
  minWidth?: keyof typeof responsiveMaps.minWidth
  height?: keyof typeof responsiveMaps.height
  fullWidth?: boolean
  fullHeight?: boolean
  wrap?: boolean
}

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'

export function getResponsiveClasses(breakpoint: Breakpoint, value?: BreakpointValue) {
  if (!value) return ''

  const classes: string[] = []

  // @ts-ignore - indexing complex responsive maps
  if (value.display) classes.push(responsiveMaps.display[value.display][breakpoint])
  // @ts-ignore
  if (value.direction) classes.push(responsiveMaps.direction[value.direction][breakpoint])
  // @ts-ignore
  if (value.cols) classes.push(responsiveMaps.cols[value.cols][breakpoint])
  // @ts-ignore
  if (value.align) classes.push(responsiveMaps.align[value.align][breakpoint])
  // @ts-ignore
  if (value.justify) classes.push(responsiveMaps.justify[value.justify][breakpoint])
  // @ts-ignore
  if (value.gap) classes.push(responsiveMaps.gap[value.gap][breakpoint])
  // @ts-ignore
  if (value.p) classes.push(responsiveMaps.p[value.p][breakpoint])
  // @ts-ignore
  if (value.pt) classes.push(responsiveMaps.pt[value.pt][breakpoint])
  // @ts-ignore
  if (value.pb) classes.push(responsiveMaps.pb[value.pb][breakpoint])
  // @ts-ignore
  if (value.px) classes.push(responsiveMaps.px[value.px][breakpoint])
  // @ts-ignore
  if (value.py) classes.push(responsiveMaps.py[value.py][breakpoint])
  // @ts-ignore
  if (value.flex) classes.push(responsiveMaps.flex[value.flex][breakpoint])
  // @ts-ignore
  if (value.maxWidth) classes.push(responsiveMaps.maxWidth[value.maxWidth][breakpoint])
  // @ts-ignore
  if (value.mx) classes.push(responsiveMaps.mx[value.mx][breakpoint])
  // @ts-ignore
  if (value.minHeight) classes.push(responsiveMaps.minHeight[value.minHeight][breakpoint])
  // @ts-ignore
  if (value.minWidth) classes.push(responsiveMaps.minWidth[value.minWidth][breakpoint])
  // @ts-ignore
  if (value.height) classes.push(responsiveMaps.height[value.height][breakpoint])

  if (value.fullWidth !== undefined) {
    classes.push(`${breakpoint}:${value.fullWidth ? 'w-full' : 'w-auto'}`)
  }

  if (value.fullHeight !== undefined) {
    classes.push(`${breakpoint}:${value.fullHeight ? 'h-full' : 'h-auto'}`)
  }

  if (value.wrap !== undefined) {
    classes.push(`${breakpoint}:${value.wrap ? 'flex-wrap' : 'flex-nowrap'}`)
  }

  return classes.join(' ')
}

export interface StackProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'style'>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType
  sm?: BreakpointValue
  md?: BreakpointValue
  lg?: BreakpointValue
  xl?: BreakpointValue
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
      pt,
      pb,
      px,
      py,
      flex,
      maxWidth,
      mx,
      minHeight,
      minWidth,
      height,
      sm,
      md,
      lg,
      xl,
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
            pt,
            pb,
            px,
            py,
            flex,
            maxWidth,
            mx,
            minHeight,
            minWidth,
            height,
          }),
          getResponsiveClasses('sm', sm),
          getResponsiveClasses('md', md),
          getResponsiveClasses('lg', lg),
          getResponsiveClasses('xl', xl)
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
