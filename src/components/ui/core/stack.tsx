import * as React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const stackVariants = cva('', {
  variants: {
    display: { flex: 'flex', grid: 'grid', none: 'hidden' },
    direction: { row: 'flex-row', col: 'flex-col' },
    cols: { '1': 'grid-cols-1', '2': 'grid-cols-2', '3': 'grid-cols-3', '4': 'grid-cols-4' },
    align: { start: 'items-start', center: 'items-center', end: 'items-end', baseline: 'items-baseline', stretch: 'items-stretch' },
    justify: { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between', around: 'justify-around' },
    gap: { none: 'gap-0', xs: 'gap-1', sm: 'gap-2', md: 'gap-4', lg: 'gap-6', xl: 'gap-8', xxl: 'gap-12' },
    fullWidth: { true: 'w-full', false: '' },
    fullHeight: { true: 'h-full', false: '' },
    wrap: { true: 'flex-wrap', false: 'flex-nowrap' },
    p: { none: 'p-0', xs: 'p-1', sm: 'p-2', md: 'p-3', lg: 'p-4', xl: 'p-6' },
    pt: { none: 'pt-0', xs: 'pt-1', sm: 'pt-2', md: 'pt-4', lg: 'pt-6', xl: 'pt-8' },
    pb: { none: 'pb-0', xs: 'pb-1', sm: 'pb-2', md: 'pb-4', lg: 'pb-6', xl: 'pb-8' },
    px: { none: 'px-0', xs: 'px-1', sm: 'px-2', md: 'px-4', lg: 'px-6', xl: 'px-8' },
    py: { none: 'py-0', xs: 'py-1', sm: 'py-2', md: 'py-4', lg: 'py-6', xl: 'py-8' },
    flex: { '1': 'flex-1', auto: 'flex-auto', none: 'flex-none' },
    maxWidth: { none: '', xs: 'max-w-xs', sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl', '2xl': 'max-w-2xl', '3xl': 'max-w-3xl', '5xl': 'max-w-5xl', full: 'max-w-full', prose: 'max-w-prose' },
    mx: { none: '', auto: 'mx-auto' },
    minHeight: { zero: 'min-h-0', none: '', screen: 'min-h-screen', dvh: 'min-h-dvh', full: 'min-h-full' },
    minWidth: { zero: 'min-w-0', none: '', full: 'min-w-full' },
    height: { auto: 'h-auto', full: 'h-full', creation: 'h-[480px]' },
  },
  defaultVariants: {
    display: 'flex', direction: 'col', align: 'stretch', justify: 'start',
    gap: 'none', fullWidth: false, fullHeight: false, wrap: false,
    maxWidth: 'none', mx: 'none', minHeight: 'none', minWidth: 'none', height: 'auto',
  },
})

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'
type StackVariantKeys = keyof VariantProps<typeof stackVariants>

type BreakpointValue = {
  [K in StackVariantKeys]?: string | boolean
}

/**
 * Tailwind JIT needs to see the full class names literally in the source code.
 */
const RESPONSIVE_LOOKUP = {
  sm: {
    display: { flex: 'sm:flex', grid: 'sm:grid', none: 'sm:hidden' },
    direction: { row: 'sm:flex-row', col: 'sm:flex-col' },
    cols: { '1': 'sm:grid-cols-1', '2': 'sm:grid-cols-2', '3': 'sm:grid-cols-3', '4': 'sm:grid-cols-4' },
    align: { start: 'sm:items-start', center: 'sm:items-center', end: 'sm:items-end', stretch: 'sm:items-stretch' },
    justify: { start: 'sm:justify-start', center: 'sm:justify-center', end: 'sm:justify-end', between: 'sm:justify-between' },
    gap: { none: 'sm:gap-0', xs: 'sm:gap-1', sm: 'sm:gap-2', md: 'sm:gap-4', lg: 'sm:gap-6', xl: 'sm:gap-8', xxl: 'sm:gap-12' },
    p: { none: 'sm:p-0', xs: 'sm:p-1', sm: 'sm:p-2', md: 'sm:p-3', lg: 'sm:p-4', xl: 'sm:p-6' },
    flex: { '1': 'sm:flex-1', auto: 'sm:flex-auto', none: 'sm:flex-none' },
    maxWidth: { sm: 'sm:max-w-sm', md: 'sm:max-w-md', lg: 'sm:max-w-lg', xl: 'sm:max-w-xl', '5xl': 'sm:max-w-5xl' },
    height: { auto: 'sm:h-auto', full: 'sm:h-full', creation: 'sm:h-[480px]' },
    fullWidth: 'sm:w-full', fullHeight: 'sm:h-full', wrap: 'sm:flex-wrap', nowrap: 'sm:flex-nowrap'
  },
  md: {
    display: { flex: 'md:flex', grid: 'md:grid', none: 'md:hidden' },
    direction: { row: 'md:flex-row', col: 'md:flex-col' },
    cols: { '1': 'md:grid-cols-1', '2': 'md:grid-cols-2', '3': 'md:grid-cols-3', '4': 'md:grid-cols-4' },
    align: { start: 'md:items-start', center: 'md:items-center', end: 'md:items-end', stretch: 'md:items-stretch' },
    justify: { start: 'md:justify-start', center: 'md:justify-center', end: 'md:justify-end', between: 'md:justify-between' },
    gap: { none: 'md:gap-0', xs: 'md:gap-1', sm: 'md:gap-2', md: 'md:gap-4', lg: 'md:gap-6', xl: 'md:gap-8', xxl: 'md:gap-12' },
    p: { none: 'md:p-0', xs: 'md:p-1', sm: 'md:p-2', md: 'md:p-3', lg: 'md:p-4', xl: 'md:p-6' },
    flex: { '1': 'md:flex-1', auto: 'md:flex-auto', none: 'md:flex-none' },
    maxWidth: { sm: 'md:max-w-sm', md: 'md:max-w-md', lg: 'md:max-w-lg', xl: 'md:max-w-xl', '5xl': 'md:max-w-5xl' },
    height: { auto: 'md:h-auto', full: 'md:h-full', creation: 'md:h-[480px]' },
    fullWidth: 'md:w-full', fullHeight: 'md:h-full', wrap: 'md:flex-wrap', nowrap: 'md:flex-nowrap'
  },
  lg: {
    display: { flex: 'lg:flex', grid: 'lg:grid', none: 'lg:hidden' },
    direction: { row: 'lg:flex-row', col: 'lg:flex-col' },
    cols: { '1': 'lg:grid-cols-1', '2': 'lg:grid-cols-2', '3': 'lg:grid-cols-3', '4': 'lg:grid-cols-4' },
    align: { start: 'lg:items-start', center: 'lg:items-center', end: 'lg:items-end', stretch: 'lg:items-stretch' },
    justify: { start: 'lg:justify-start', center: 'lg:justify-center', end: 'lg:justify-end', between: 'lg:justify-between' },
    gap: { none: 'lg:gap-0', xs: 'lg:gap-1', sm: 'lg:gap-2', md: 'lg:gap-4', lg: 'lg:gap-6', xl: 'lg:gap-8', xxl: 'lg:gap-12' },
    p: { none: 'lg:p-0', xs: 'lg:p-1', sm: 'lg:p-2', md: 'lg:p-3', lg: 'lg:p-4', xl: 'lg:p-6' },
    flex: { '1': 'lg:flex-1', auto: 'lg:flex-auto', none: 'lg:flex-none' },
    maxWidth: { sm: 'lg:max-w-sm', md: 'lg:max-w-md', lg: 'lg:max-w-lg', xl: 'lg:max-w-xl', '5xl': 'lg:max-w-5xl' },
    height: { auto: 'lg:h-auto', full: 'lg:h-full', creation: 'lg:h-[480px]' },
    fullWidth: 'lg:w-full', fullHeight: 'lg:h-full', wrap: 'lg:flex-wrap', nowrap: 'lg:flex-nowrap'
  },
  xl: {
    display: { flex: 'xl:flex', grid: 'xl:grid', none: 'xl:hidden' },
    direction: { row: 'xl:flex-row', col: 'xl:flex-col' },
    cols: { '1': 'xl:grid-cols-1', '2': 'xl:grid-cols-2', '3': 'xl:grid-cols-3', '4': 'xl:grid-cols-4' },
    align: { start: 'xl:items-start', center: 'xl:items-center', end: 'xl:items-end', stretch: 'xl:items-stretch' },
    justify: { start: 'xl:justify-start', center: 'xl:justify-center', end: 'xl:justify-end', between: 'xl:justify-between' },
    gap: { none: 'xl:gap-0', xs: 'xl:gap-1', sm: 'xl:gap-2', md: 'xl:gap-4', lg: 'xl:gap-6', xl: 'xl:gap-8', xxl: 'xl:gap-12' },
    p: { none: 'xl:p-0', xs: 'xl:p-1', sm: 'xl:p-2', md: 'xl:p-3', lg: 'xl:p-4', xl: 'xl:p-6' },
  }
}

// Simple and stable responsive class generator
// Note: We use explicit mapping here so Tailwind JIT can find them.
export function getResponsiveClasses(breakpoint: Breakpoint, val?: BreakpointValue) {
  if (!val) return ''
  const classes: string[] = []
  const bp = RESPONSIVE_LOOKUP[breakpoint] as any
  if (!bp) return ''

  if (val.fullWidth) classes.push(bp.fullWidth)
  if (val.fullHeight) classes.push(bp.fullHeight)
  if (val.wrap === true) classes.push(bp.wrap)
  if (val.wrap === false) classes.push(bp.nowrap)

  Object.keys(val).forEach((key) => {
    const v = (val as any)[key]
    if (v === undefined || typeof v === 'boolean') return
    if (bp[key] && bp[key][v]) {
      classes.push(bp[key][v])
    }
  })

  return classes.join(' ')
}

export interface StackProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'style'>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType
  sm?: BreakpointValue
  md?: BreakpointValue
  lg?: BreakpointValue
  xl?: BreakpointValue
}

export const Stack = React.forwardRef<HTMLElement, StackProps>(
  ({ as: Component = 'div', sm, md, lg, xl, ...props }, ref) => {
    // Separate variant props from HTML props
    const variantProps: any = {}
    const elementProps: any = { ...props }
    
    // Simple extraction of variants
    const keys = ['display', 'direction', 'cols', 'align', 'justify', 'gap', 'fullWidth', 'fullHeight', 'wrap', 'p', 'pt', 'pb', 'px', 'py', 'flex', 'maxWidth', 'mx', 'minHeight', 'minWidth', 'height']
    keys.forEach(key => {
      if (key in elementProps) {
        variantProps[key] = elementProps[key]
        delete elementProps[key]
      }
    })

    return (
      <Component
        ref={ref}
        className={cn(
          stackVariants(variantProps),
          getResponsiveClasses('sm', sm),
          getResponsiveClasses('md', md),
          getResponsiveClasses('lg', lg),
          getResponsiveClasses('xl', xl)
        )}
        {...elementProps}
      />
    )
  }
)

Stack.displayName = 'Stack'

export const HStack = React.forwardRef<HTMLElement, Omit<StackProps, 'direction'>>((props, ref) => (
  <Stack ref={ref} direction="row" {...props} />
))
HStack.displayName = 'HStack'

export const VStack = React.forwardRef<HTMLElement, Omit<StackProps, 'direction'>>((props, ref) => (
  <Stack ref={ref} direction="col" {...props} />
))
VStack.displayName = 'VStack'
