import { type ElementType, forwardRef } from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { BOX_KEYS, Box, type BoxProps } from './box'

export const stackVariants = cva('', {
  variants: {
    display: { flex: 'flex', grid: 'grid', none: 'hidden' },
    direction: { row: 'flex-row', col: 'flex-col' },
    cols: { '1': 'grid-cols-1', '2': 'grid-cols-2', '3': 'grid-cols-3', '4': 'grid-cols-4' },
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
      none: '',
      xxs: 'gap-0.5',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      xxl: 'gap-12',
    },
    wrap: { true: 'flex-wrap', false: 'flex-nowrap' },
  },
  defaultVariants: {
    display: 'flex',
    direction: 'col',
    align: 'stretch',
    justify: 'start',
    gap: 'none',
    wrap: false,
  },
})

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'
type StackVariantKeys = keyof VariantProps<typeof stackVariants>

type BreakpointValue = {
  [K in StackVariantKeys]?: string | boolean
}

const RESPONSIVE_LOOKUP = {
  sm: {
    display: { flex: 'sm:flex', grid: 'sm:grid', none: 'sm:hidden' },
    direction: { row: 'sm:flex-row', col: 'sm:flex-col' },
    cols: {
      '1': 'sm:grid-cols-1',
      '2': 'sm:grid-cols-2',
      '3': 'sm:grid-cols-3',
      '4': 'sm:grid-cols-4',
    },
    align: {
      start: 'sm:items-start',
      center: 'sm:items-center',
      end: 'sm:items-end',
      stretch: 'sm:items-stretch',
    },
    justify: {
      start: 'sm:justify-start',
      center: 'sm:justify-center',
      end: 'sm:justify-end',
      between: 'sm:justify-between',
    },
    gap: {
      none: 'sm:gap-0',
      xs: 'sm:gap-1',
      sm: 'sm:gap-2',
      md: 'sm:gap-4',
      lg: 'sm:gap-6',
      xl: 'sm:gap-8',
      xxl: 'sm:gap-12',
    },
    wrap: 'sm:flex-wrap',
    nowrap: 'sm:flex-nowrap',
  },
  md: {
    display: { flex: 'md:flex', grid: 'md:grid', none: 'md:hidden' },
    direction: { row: 'md:flex-row', col: 'md:flex-col' },
    cols: {
      '1': 'md:grid-cols-1',
      '2': 'md:grid-cols-2',
      '3': 'md:grid-cols-3',
      '4': 'md:grid-cols-4',
    },
    align: {
      start: 'md:items-start',
      center: 'md:items-center',
      end: 'md:items-end',
      stretch: 'md:items-stretch',
    },
    justify: {
      start: 'md:justify-start',
      center: 'md:justify-center',
      end: 'md:justify-end',
      between: 'md:justify-between',
    },
    gap: {
      none: 'md:gap-0',
      xs: 'md:gap-1',
      sm: 'md:gap-2',
      md: 'md:gap-4',
      lg: 'md:gap-6',
      xl: 'md:gap-8',
      xxl: 'md:gap-12',
    },
    wrap: 'md:flex-wrap',
    nowrap: 'md:flex-nowrap',
  },
  lg: {
    display: { flex: 'lg:flex', grid: 'lg:grid', none: 'lg:hidden' },
    direction: { row: 'lg:flex-row', col: 'lg:flex-col' },
    cols: {
      '1': 'lg:grid-cols-1',
      '2': 'lg:grid-cols-2',
      '3': 'lg:grid-cols-3',
      '4': 'lg:grid-cols-4',
    },
    align: {
      start: 'lg:items-start',
      center: 'lg:items-center',
      end: 'lg:items-end',
      stretch: 'lg:items-stretch',
    },
    justify: {
      start: 'lg:justify-start',
      center: 'lg:justify-center',
      end: 'lg:justify-end',
      between: 'lg:justify-between',
    },
    gap: {
      none: 'lg:gap-0',
      xs: 'lg:gap-1',
      sm: 'lg:gap-2',
      md: 'lg:gap-4',
      lg: 'lg:gap-6',
      xl: 'lg:gap-8',
      xxl: 'lg:gap-12',
    },
    wrap: 'lg:flex-wrap',
    nowrap: 'lg:flex-nowrap',
  },
  xl: {
    display: { flex: 'xl:flex', grid: 'xl:grid', none: 'xl:hidden' },
    direction: { row: 'xl:flex-row', col: 'xl:flex-col' },
    cols: {
      '1': 'xl:grid-cols-1',
      '2': 'xl:grid-cols-2',
      '3': 'xl:grid-cols-3',
      '4': 'xl:grid-cols-4',
    },
    align: {
      start: 'xl:items-start',
      center: 'xl:items-center',
      end: 'xl:items-end',
      stretch: 'xl:items-stretch',
    },
    justify: {
      start: 'xl:justify-start',
      center: 'xl:justify-center',
      end: 'xl:justify-end',
      between: 'xl:justify-between',
    },
    gap: {
      none: 'xl:gap-0',
      xs: 'xl:gap-1',
      sm: 'xl:gap-2',
      md: 'xl:gap-4',
      lg: 'xl:gap-6',
      xl: 'xl:gap-8',
      xxl: 'xl:gap-12',
    },
  },
}

export function getResponsiveClasses(breakpoint: Breakpoint, val?: BreakpointValue) {
  if (!val) return ''
  const classes: string[] = []
  const bp = RESPONSIVE_LOOKUP[breakpoint] as Record<string, Record<string, string> | string>
  if (!bp) return ''

  const wrap = bp.wrap
  const nowrap = bp.nowrap

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

export interface StackProps extends BoxProps, VariantProps<typeof stackVariants> {
  as?: ElementType
  sm?: BoxProps['sm'] & BreakpointValue
  md?: BoxProps['md'] & BreakpointValue
  lg?: BoxProps['lg'] & BreakpointValue
  xl?: BoxProps['xl'] & BreakpointValue
}

export const STACK_KEYS = [
  'display',
  'direction',
  'cols',
  'align',
  'justify',
  'gap',
  'wrap',
] as const

export const BREAKPOINT_KEYS = ['sm', 'md', 'lg', 'xl'] as const

/**
 * Splits props into all Layout specific (Box + Stack) and rest.
 * Use this for components that want to consume the entire layout API.
 */
export function splitLayoutProps<T extends object>(props: T) {
  const layoutProps: Record<string, unknown> = {}
  const restProps: Record<string, unknown> = {}

  Object.entries(props).forEach(([key, value]) => {
    if (
      STACK_KEYS.includes(key as any) ||
      BOX_KEYS.includes(key as any) ||
      BREAKPOINT_KEYS.includes(key as any) ||
      key === 'as'
    ) {
      layoutProps[key] = value
    } else {
      restProps[key] = value
    }
  })

  return {
    layoutProps: layoutProps as unknown as StackProps,
    restProps: restProps as unknown as Omit<T, keyof StackProps>,
  }
}

export function getStackClasses(props: StackProps) {
  const { as: _as, sm, md, lg, xl, ...variants } = props

  return cn(
    stackVariants(variants as VariantProps<typeof stackVariants>),
    getResponsiveClasses('sm', sm),
    getResponsiveClasses('md', md),
    getResponsiveClasses('lg', lg),
    getResponsiveClasses('xl', xl)
  )
}

export const Stack = forwardRef<HTMLElement, StackProps>((props, ref) => {
  const { layoutProps, restProps } = splitLayoutProps(props)

  // Extract stack-specific props to generate flex classes
  const stackOnlyProps: Record<string, unknown> = {}
  const boxProps: Record<string, unknown> = {}

  const typedLayoutProps = layoutProps as Record<string, unknown>
  Object.keys(typedLayoutProps).forEach((key) => {
    if (STACK_KEYS.includes(key as any)) {
      stackOnlyProps[key] = typedLayoutProps[key]
    } else if (BOX_KEYS.includes(key as any) || key === 'as') {
      boxProps[key] = typedLayoutProps[key]
    }

    // Breakpoints need to go to both since they can contain both Box and Stack variants
    if (BREAKPOINT_KEYS.includes(key as any)) {
      stackOnlyProps[key] = typedLayoutProps[key]
      boxProps[key] = typedLayoutProps[key]
    }
  })

  const { className, ...otherRest } = restProps as Record<string, unknown>
  const { as: Component = 'div' } = layoutProps

  return (
    <Box
      ref={ref}
      as={Component as ElementType}
      className={cn(getStackClasses(stackOnlyProps as StackProps), className as string)}
      {...boxProps}
      {...otherRest}
    />
  )
})

Stack.displayName = 'Stack'

export const HStack = forwardRef<HTMLElement, Omit<StackProps, 'direction'>>((props, ref) => (
  <Stack ref={ref} direction="row" {...props} />
))
HStack.displayName = 'HStack'

export const VStack = forwardRef<HTMLElement, Omit<StackProps, 'direction'>>((props, ref) => (
  <Stack ref={ref} direction="col" {...props} />
))
VStack.displayName = 'VStack'
