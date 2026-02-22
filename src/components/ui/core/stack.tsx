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
    gap: { none: '', xxs: 'gap-0.5', xs: 'gap-1', sm: 'gap-2', md: 'gap-4', lg: 'gap-6', xl: 'gap-8', xxl: 'gap-12' },
    fullWidth: { true: 'w-full', false: '' },
    fullHeight: { true: 'h-full', false: '' },
    wrap: { true: 'flex-wrap', false: 'flex-nowrap' },
    p: { none: '', xxs: 'p-0.5', xs: 'p-1', sm: 'p-2', md: 'p-4', lg: 'p-6', xl: 'p-8' },
    pt: { none: '', xxs: 'pt-0.5', xs: 'pt-1', sm: 'pt-2', md: 'pt-4', lg: 'pt-6', xl: 'pt-8' },
    pb: { none: '', xxs: 'pb-0.5', xs: 'pb-1', sm: 'pb-2', md: 'pb-4', lg: 'pb-6', xl: 'pb-8' },
    px: { none: '', xxs: 'px-0.5', xs: 'px-1', sm: 'px-2', md: 'px-4', lg: 'px-6', xl: 'px-8' },
    py: { none: '', xxs: 'py-0.5', xs: 'py-1', sm: 'py-2', md: 'py-4', lg: 'py-6', xl: 'py-8' },
    flex: { '1': 'flex-1', auto: 'flex-auto', none: 'flex-none' },
    maxWidth: { none: '', xs: 'max-w-xs', sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl', '2xl': 'max-w-2xl', '3xl': 'max-w-3xl', '5xl': 'max-w-5xl', full: 'max-w-full', prose: 'max-w-prose' },
    maxHeight: { none: '', '70dvh': 'max-h-[70dvh]', '90dvh': 'max-h-[90dvh]', screen: 'max-h-screen' },
    m: { none: '', xxs: 'm-0.5', xs: 'm-1', sm: 'm-2', md: 'm-4', lg: 'm-6', xl: 'm-8' },
    mx: { none: '', auto: 'mx-auto' },
    minHeight: { zero: 'min-h-0', none: '', screen: 'min-h-screen', dvh: 'min-h-dvh', full: 'min-h-full', character: 'min-h-[160px]' },
    minWidth: { zero: 'min-w-0', none: '', full: 'min-w-full' },
    height: { auto: 'h-auto', full: 'h-full', px: 'h-px', creation: 'h-[480px]', avatar: 'h-20', 'avatar-sm': 'h-16', 'avatar-xs': 'h-12', 'vitals-label': 'h-4', 'vitals-progress': 'h-2', 'vitals-progress-md': 'h-3', 'vitals-footer': 'h-6' },
    width: { auto: 'w-auto', full: 'w-full', avatar: 'w-20', 'avatar-sm': 'w-16', 'avatar-xs': 'w-12' },
    position: { relative: 'relative', absolute: 'absolute', fixed: 'fixed', sticky: 'sticky', static: 'static' },
    top: { '0': 'top-0', '4': 'top-4', '16': 'top-16', '20': 'top-20', '24': 'top-24', auto: 'top-auto' },
    bottom: { '0': 'bottom-0', '4': 'bottom-4', '6': 'bottom-6', '20': 'bottom-20', auto: 'bottom-auto' },
    left: { '0': 'left-0', md: 'left-4', lg: 'left-6', auto: 'left-auto' },
    right: { '0': 'right-0', '4': 'right-4', md: 'right-4', lg: 'right-6', auto: 'right-auto' },
    inset: { none: '', zero: 'inset-0', xs: '-right-1 -bottom-1', base: '-right-2 -bottom-2' },
    rounded: { none: '', md: 'rounded-md', lg: 'rounded-lg', full: 'rounded-full' },
    border: { none: '', base: 'border', '2': 'border-2' },
    borderColor: { none: '', secondary: 'border-(--color-secondary)/40' },
    bgColor: { none: '', black: 'bg-black/40', secondary: 'bg-(--color-secondary)' },
    opacity: { none: '', '10': 'opacity-10', '20': 'opacity-20', '50': 'opacity-50' },
    overflow: { none: '', auto: 'overflow-auto', hidden: 'overflow-hidden' },
    scrollbar: { none: 'scrollbar-none' },
    shadow: { none: '', inner: 'shadow-inner' },
    zIndex: { '0': 'z-0', '10': 'z-10', '50': 'z-50', '600': 'z-600', auto: 'z-auto' },
    pointerEvents: { none: 'pointer-events-none', auto: 'pointer-events-auto' },
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
    p: { none: 'sm:p-0', xs: 'sm:p-1', sm: 'sm:p-2', md: 'sm:p-4', lg: 'sm:p-6', xl: 'sm:p-8' },
    gap: { none: 'sm:gap-0', xs: 'sm:gap-1', sm: 'sm:gap-2', md: 'sm:gap-4', lg: 'sm:gap-6', xl: 'sm:gap-8', xxl: 'sm:gap-12' },
    flex: { '1': 'sm:flex-1', auto: 'sm:flex-auto', none: 'sm:flex-none' },
    maxWidth: { sm: 'sm:max-w-sm', md: 'sm:max-w-md', lg: 'sm:max-w-lg', xl: 'sm:max-w-xl', '5xl': 'sm:max-w-5xl' },
    height: { auto: 'sm:h-auto', full: 'sm:h-full', creation: 'sm:h-[480px]' },
    top: { '24': 'sm:top-24', auto: 'sm:top-auto' },
    bottom: { '6': 'sm:bottom-6', auto: 'sm:bottom-auto' },
    right: { md: 'sm:right-4', lg: 'sm:right-6', auto: 'sm:right-auto' },
    fullWidth: 'sm:w-full', fullHeight: 'sm:h-full', wrap: 'sm:flex-wrap', nowrap: 'sm:flex-nowrap'
  },
  md: {
    display: { flex: 'md:flex', grid: 'md:grid', none: 'md:hidden' },
    direction: { row: 'md:flex-row', col: 'md:flex-col' },
    cols: { '1': 'md:grid-cols-1', '2': 'md:grid-cols-2', '3': 'md:grid-cols-3', '4': 'md:grid-cols-4' },
    align: { start: 'md:items-start', center: 'md:items-center', end: 'md:items-end', stretch: 'md:items-stretch' },
    justify: { start: 'md:justify-start', center: 'md:justify-center', end: 'md:justify-end', between: 'md:justify-between' },
    p: { none: 'md:p-0', xs: 'md:p-1', sm: 'md:p-2', md: 'md:p-4', lg: 'md:p-6', xl: 'md:p-8' },
    gap: { none: 'md:gap-0', xs: 'md:gap-1', sm: 'md:gap-2', md: 'md:gap-4', lg: 'md:gap-6', xl: 'md:gap-8', xxl: 'md:gap-12' },
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
    p: { none: 'lg:p-0', xs: 'lg:p-1', sm: 'lg:p-2', md: 'lg:p-4', lg: 'lg:p-6', xl: 'lg:p-8' },
    gap: { none: 'lg:gap-0', xs: 'lg:gap-1', sm: 'lg:gap-2', md: 'lg:gap-4', lg: 'lg:gap-6', xl: 'lg:gap-8', xxl: 'lg:gap-12' },
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
    p: { none: 'xl:p-0', xs: 'xl:p-1', sm: 'xl:p-2', md: 'xl:p-4', lg: 'xl:p-6', xl: 'xl:p-8' },
    gap: { none: 'xl:gap-0', xs: 'xl:gap-1', sm: 'xl:gap-2', md: 'xl:gap-4', lg: 'xl:gap-6', xl: 'xl:gap-8', xxl: 'xl:gap-12' },
  }
}

// Simple and stable responsive class generator
// Note: We use explicit mapping here so Tailwind JIT can find them.
export function getResponsiveClasses(breakpoint: Breakpoint, val?: BreakpointValue) {
  if (!val) return ''
  const classes: string[] = []
  const bp = RESPONSIVE_LOOKUP[breakpoint] as Record<string, Record<string, string> | string>
  if (!bp) return ''

  const fw = bp.fullWidth
  const fh = bp.fullHeight
  const wrap = bp.wrap
  const nowrap = bp.nowrap

  if (val.fullWidth && typeof fw === 'string') classes.push(fw)
  if (val.fullHeight && typeof fh === 'string') classes.push(fh)
  if (val.wrap === true && typeof wrap === 'string') classes.push(wrap)
  if (val.wrap === false && typeof nowrap === 'string') classes.push(nowrap)

  Object.keys(val).forEach((key) => {
    const v = (val as Record<string, unknown>)[key]
    if (v === undefined || typeof v === 'boolean') return
    const group = bp[key]
    if (typeof group === 'object' && group !== null && typeof v === 'string' && group[v]) {
      classes.push(group[v])
    }
  })

  return classes.join(' ')
}

export interface StackProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color' | 'width' | 'height'>,
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
    const variantProps: Record<string, unknown> = {}
    const elementProps: Record<string, unknown> = { ...props }
    
    // Simple extraction of variants
    const keys = ['display', 'direction', 'cols', 'align', 'justify', 'gap', 'fullWidth', 'fullHeight', 'wrap', 'p', 'pt', 'pb', 'px', 'py', 'flex', 'maxWidth', 'maxHeight', 'm', 'mx', 'minHeight', 'minWidth', 'height', 'width', 'position', 'top', 'bottom', 'left', 'right', 'inset', 'rounded', 'border', 'borderColor', 'bgColor', 'overflow', 'scrollbar', 'shadow', 'zIndex', 'pointerEvents']
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
