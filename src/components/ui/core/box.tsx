import { type ElementType, type HTMLAttributes, forwardRef } from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

export const boxVariants = cva('', {
  variants: {
    p: { none: '', xxs: 'p-0.5', xs: 'p-1', sm: 'p-2', md: 'p-4', lg: 'p-6', xl: 'p-8' },
    pt: { none: '', xxs: 'pt-0.5', xs: 'pt-1', sm: 'pt-2', md: 'pt-4', lg: 'pt-6', xl: 'pt-8' },
    pb: { none: '', xxs: 'pb-0.5', xs: 'pb-1', sm: 'pb-2', md: 'pb-4', lg: 'pb-6', xl: 'pb-8' },
    px: { none: '', xxs: 'px-0.5', xs: 'px-1', sm: 'px-2', md: 'px-4', lg: 'px-6', xl: 'px-8' },
    py: { none: '', xxs: 'py-0.5', xs: 'py-1', sm: 'py-2', md: 'py-4', lg: 'py-6', xl: 'py-8' },
    m: { none: '', xxs: 'm-0.5', xs: 'm-1', sm: 'm-2', md: 'm-4', lg: 'm-6', xl: 'm-8' },
    mx: { none: '', auto: 'mx-auto' },
    fullWidth: { true: 'w-full', false: '' },
    fullHeight: { true: 'h-full', false: '' },
    flex: { '1': 'flex-1', auto: 'flex-auto', none: 'flex-none' },
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
    maxHeight: {
      none: '',
      '70dvh': 'max-h-[70dvh]',
      '90dvh': 'max-h-[90dvh]',
      screen: 'max-h-screen',
    },
    minHeight: {
      zero: 'min-h-0',
      none: '',
      screen: 'min-h-screen',
      dvh: 'min-h-dvh',
      full: 'min-h-full',
      character: 'min-h-[160px]',
    },
    minWidth: { zero: 'min-w-0', none: '', full: 'min-w-full' },
    height: {
      zero: 'h-0',
      auto: 'h-auto',
      full: 'h-full',
      px: 'h-px',
      creation: 'h-[480px]',
      'avatar-lg': 'h-32',
      avatar: 'h-20',
      'avatar-sm': 'h-14',
      'avatar-xs': 'h-10',
      'vitals-label': 'h-4',
      'vitals-progress': 'h-2',
      'vitals-progress-md': 'h-3',
      'vitals-footer': 'h-6',
    },
    width: {
      auto: 'w-auto',
      full: 'w-full',
      'avatar-lg': 'w-32',
      avatar: 'w-20',
      'avatar-sm': 'w-14',
      'avatar-xs': 'w-10',
    },
    position: {
      relative: 'relative',
      absolute: 'absolute',
      fixed: 'fixed',
      sticky: 'sticky',
      static: 'static',
    },
    top: {
      '0': 'top-0',
      '2': 'top-2',
      '4': 'top-4',
      '16': 'top-16',
      '20': 'top-20',
      '24': 'top-24',
      auto: 'top-auto',
    },
    bottom: {
      '0': 'bottom-0',
      '4': 'bottom-4',
      '6': 'bottom-6',
      '20': 'bottom-20',
      auto: 'bottom-auto',
    },
    left: { '0': 'left-0', md: 'left-4', lg: 'left-6', auto: 'left-auto' },
    right: { '0': 'right-0', '4': 'right-4', md: 'right-4', lg: 'right-6', auto: 'right-auto' },
    inset: { none: '', zero: 'inset-0', xs: '-right-1 -bottom-1', base: '-right-2 -bottom-2' },
    rounded: { none: '', md: 'rounded-md', lg: 'rounded-lg', full: 'rounded-full' },
    border: { none: '', base: 'border', '2': 'border-2' },
    borderColor: {
      none: '',
      primary: 'border-(--color-primary)',
      secondary: 'border-(--color-secondary)',
    },
    bgColor: { none: '', black: 'bg-black/40', secondary: 'bg-(--color-secondary)' },
    opacity: {
      none: '',
      '10': 'opacity-10',
      '20': 'opacity-20',
      '50': 'opacity-50',
      '80': 'opacity-80',
      '100': 'opacity-100',
    },
    overflow: { none: '', auto: 'overflow-auto', hidden: 'overflow-hidden' },
    scrollbar: { none: 'scrollbar-none' },
    shadow: { none: '', inner: 'shadow-inner' },
    zIndex: {
      '0': 'z-0',
      '10': 'z-10',
      '40': 'z-40',
      '50': 'z-50',
      '600': 'z-600',
      auto: 'z-auto',
    },
    pointerEvents: { none: 'pointer-events-none', auto: 'pointer-events-auto' },
    aspect: {
      none: '',
      square: 'aspect-square',
      portrait: 'aspect-[3/4]',
      landscape: 'aspect-[4/3]',
      video: 'aspect-video',
    },
  },
  defaultVariants: {
    fullWidth: false,
    fullHeight: false,
    maxWidth: 'none',
    mx: 'none',
    minHeight: 'none',
    minWidth: 'none',
    height: 'auto',
  },
})

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'
type BoxVariantKeys = keyof VariantProps<typeof boxVariants>

type BreakpointValue = {
  [K in BoxVariantKeys]?: string | boolean
}

/**
 * Responsive lookups for box primitives (mostly layout constraints and padding)
 */
const BOX_RESPONSIVE_LOOKUP = {
  sm: {
    p: { none: 'sm:p-0', xs: 'sm:p-1', sm: 'sm:p-2', md: 'sm:p-4', lg: 'sm:p-6', xl: 'sm:p-8' },
    flex: { '1': 'sm:flex-1', auto: 'sm:flex-auto', none: 'sm:flex-none' },
    maxWidth: {
      sm: 'sm:max-w-sm',
      md: 'sm:max-w-md',
      lg: 'sm:max-w-lg',
      xl: 'sm:max-w-xl',
      '5xl': 'sm:max-w-5xl',
    },
    height: { auto: 'sm:h-auto', full: 'sm:h-full', creation: 'sm:h-[480px]' },
    top: { '24': 'sm:top-24', auto: 'sm:top-auto' },
    bottom: { '6': 'sm:bottom-6', auto: 'sm:bottom-auto' },
    right: { '0': 'sm:right-0', '4': 'sm:right-4', '6': 'sm:right-6', auto: 'sm:right-auto' },
    fullWidth: 'sm:w-full',
    fullHeight: 'sm:h-full',
  },
  md: {
    p: { none: 'md:p-0', xs: 'md:p-1', sm: 'md:p-2', md: 'md:p-4', lg: 'md:p-6', xl: 'md:p-8' },
    flex: { '1': 'md:flex-1', auto: 'md:flex-auto', none: 'md:flex-none' },
    maxWidth: {
      sm: 'md:max-w-sm',
      md: 'md:max-w-md',
      lg: 'md:max-w-lg',
      xl: 'md:max-w-xl',
      '5xl': 'md:max-w-5xl',
    },
    height: { auto: 'md:h-auto', full: 'md:h-full', creation: 'md:h-[480px]' },
    fullWidth: 'md:w-full',
    fullHeight: 'md:h-full',
  },
  lg: {
    p: { none: 'lg:p-0', xs: 'lg:p-1', sm: 'lg:p-2', md: 'lg:p-4', lg: 'lg:p-6', xl: 'lg:p-8' },
    flex: { '1': 'lg:flex-1', auto: 'lg:flex-auto', none: 'lg:flex-none' },
    maxWidth: {
      sm: 'lg:max-w-sm',
      md: 'lg:max-w-md',
      lg: 'lg:max-w-lg',
      xl: 'lg:max-w-xl',
      '5xl': 'lg:max-w-5xl',
    },
    height: { auto: 'lg:h-auto', full: 'lg:h-full', creation: 'lg:h-[480px]' },
    fullWidth: 'lg:w-full',
    fullHeight: 'lg:h-full',
  },
  xl: {
    p: { none: 'xl:p-0', xs: 'xl:p-1', sm: 'xl:p-2', md: 'xl:p-4', lg: 'xl:p-6', xl: 'xl:p-8' },
    maxWidth: {
      sm: 'xl:max-w-sm',
      md: 'xl:max-w-md',
      lg: 'xl:max-w-lg',
      xl: 'xl:max-w-xl',
    },
  },
}

export function getBoxResponsiveClasses(breakpoint: Breakpoint, val?: BreakpointValue) {
  if (!val) return ''
  const classes: string[] = []
  const bp = BOX_RESPONSIVE_LOOKUP[breakpoint] as Record<string, Record<string, string> | string>
  if (!bp) return ''

  const fw = bp.fullWidth
  const fh = bp.fullHeight

  if (val.fullWidth && typeof fw === 'string') classes.push(fw)
  if (val.fullHeight && typeof fh === 'string') classes.push(fh)

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

export interface BoxProps
  extends
    Omit<HTMLAttributes<HTMLElement>, 'color' | 'width' | 'height'>,
    VariantProps<typeof boxVariants> {
  as?: ElementType
  sm?: BreakpointValue
  md?: BreakpointValue
  lg?: BreakpointValue
  xl?: BreakpointValue
}

export const BOX_KEYS = [
  'fullWidth',
  'fullHeight',
  'p',
  'pt',
  'pb',
  'px',
  'py',
  'flex',
  'maxWidth',
  'maxHeight',
  'm',
  'mx',
  'minHeight',
  'minWidth',
  'height',
  'width',
  'position',
  'top',
  'bottom',
  'left',
  'right',
  'inset',
  'rounded',
  'border',
  'borderColor',
  'bgColor',
  'opacity',
  'overflow',
  'scrollbar',
  'shadow',
  'zIndex',
  'pointerEvents',
  'aspect',
] as const

export const BREAKPOINT_KEYS = ['sm', 'md', 'lg', 'xl'] as const

export function splitBoxProps<T extends object>(props: T) {
  const boxProps: Record<string, unknown> = {}
  const restProps: Record<string, unknown> = {}

  Object.entries(props).forEach(([key, value]) => {
    if (
      BOX_KEYS.includes(key as (typeof BOX_KEYS)[number]) ||
      BREAKPOINT_KEYS.includes(key as (typeof BREAKPOINT_KEYS)[number]) ||
      key === 'as'
    ) {
      boxProps[key] = value
    } else {
      restProps[key] = value
    }
  })

  return { boxProps: boxProps as BoxProps, restProps: restProps as Omit<T, keyof BoxProps> }
}

export function getBoxClasses(props: BoxProps) {
  const { as: _, sm, md, lg, xl, ...variants } = props

  return cn(
    boxVariants(variants as VariantProps<typeof boxVariants>),
    getBoxResponsiveClasses('sm', sm),
    getBoxResponsiveClasses('md', md),
    getBoxResponsiveClasses('lg', lg),
    getBoxResponsiveClasses('xl', xl)
  )
}

export const Box = forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const { boxProps, restProps } = splitBoxProps(props)
  const { className, ...otherRest } = restProps as HTMLAttributes<HTMLElement>
  const { as: Component = 'div' } = boxProps

  return <Component ref={ref} className={cn(getBoxClasses(boxProps), className)} {...otherRest} />
})

Box.displayName = 'Box'
