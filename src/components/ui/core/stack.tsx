import * as React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

export const RESPONSIVE_LOOKUP = {
  sm: {
    display: { flex: 'sm:flex', grid: 'sm:grid', none: 'sm:hidden' },
    direction: { row: 'sm:flex-row', col: 'sm:flex-col' },
    cols: { '1': 'sm:grid-cols-1', '2': 'sm:grid-cols-2', '3': 'sm:grid-cols-3', '4': 'sm:grid-cols-4' },
    align: { start: 'sm:items-start', center: 'sm:items-center', end: 'sm:items-end', stretch: 'sm:items-stretch', baseline: 'sm:items-baseline' },
    justify: { start: 'sm:justify-start', center: 'sm:justify-center', end: 'sm:justify-end', between: 'sm:justify-between' },
    gap: { none: 'sm:gap-0', xxs: 'sm:gap-0.5', xs: 'sm:gap-1', sm: 'sm:gap-2', md: 'sm:gap-4', lg: 'sm:gap-6', xl: 'sm:gap-8', xxl: 'sm:gap-12' },
    p: { none: 'sm:p-0', xxs: 'sm:p-1', xs: 'sm:p-2', sm: 'sm:p-3', md: 'sm:p-4', lg: 'sm:p-6', xl: 'sm:p-8', px: 'sm:p-px' },
    px: { none: 'sm:px-0', xxs: 'sm:px-1', xs: 'sm:px-2', sm: 'sm:px-3', md: 'sm:px-4', lg: 'sm:px-6', xl: 'sm:px-8', px: 'sm:px-px' },
    py: { none: 'sm:py-0', xxs: 'sm:py-1', xs: 'sm:py-2', sm: 'sm:py-3', md: 'sm:py-4', lg: 'sm:py-6', xl: 'sm:py-8', px: 'sm:py-px' },
    flex: { '1': 'sm:flex-1', auto: 'sm:flex-auto', none: 'sm:flex-none' },
    maxWidth: { none: 'sm:max-w-none', xs: 'sm:max-w-xs', sm: 'sm:max-w-sm', md: 'sm:max-w-md', lg: 'sm:max-w-lg', xl: 'sm:max-w-xl', '2xl': 'sm:max-w-2xl', '3xl': 'sm:max-w-3xl', '5xl': 'sm:max-w-5xl', full: 'sm:max-w-full', prose: 'sm:max-w-prose' },
    height: { auto: 'sm:h-auto', full: 'sm:h-full', creation: 'sm:h-[480px]', px: 'sm:h-px', 'avatar-xs': 'sm:h-12', 'avatar-sm': 'sm:h-16', avatar: 'sm:h-20', dvh: 'sm:h-dvh', 'character': 'sm:min-h-[200px]', vitals: 'sm:h-1.5', 'vitals-label': 'sm:h-4', 'vitals-footer': 'sm:h-10' },
    width: { auto: 'sm:w-auto', full: 'sm:w-full', 'avatar-xs': 'sm:w-12', 'avatar-sm': 'sm:w-16', avatar: 'sm:w-20' },
    variant: { primary: 'sm:text-primary', lead: 'sm:text-xl', large: 'sm:text-lg', base: 'sm:text-base', small: 'sm:text-sm', muted: 'sm:text-sm sm:opacity-60', detail: 'sm:text-xs', bonus: 'sm:text-xs', 'fantasy-value': 'sm:text-lg', decoration: 'sm:text-xl', tiny: 'sm:text-[10px]' },
    inset: { base: 'sm:inset-0', xs: 'sm:inset-0.5', sm: 'sm:inset-1', md: 'sm:inset-2' },
    fullWidth: 'sm:w-full',
    fullHeight: 'sm:h-full',
    wrap: 'sm:flex-wrap',
    nowrap: 'sm:flex-nowrap'
  },
  md: {
    display: { flex: 'md:flex', grid: 'md:grid', none: 'md:hidden' },
    direction: { row: 'md:flex-row', col: 'md:flex-col' },
    cols: { '1': 'md:grid-cols-1', '2': 'md:grid-cols-2', '3': 'md:grid-cols-3', '4': 'md:grid-cols-4' },
    align: { start: 'md:items-start', center: 'md:items-center', end: 'md:items-end', stretch: 'md:items-stretch', baseline: 'md:items-baseline' },
    justify: { start: 'md:justify-start', center: 'md:justify-center', end: 'md:justify-end', between: 'md:justify-between' },
    gap: { none: 'md:gap-0', xxs: 'md:gap-0.5', xs: 'md:gap-1', sm: 'md:gap-2', md: 'md:gap-4', lg: 'md:gap-6', xl: 'md:gap-8', xxl: 'md:gap-12' },
    p: { none: 'md:p-0', xxs: 'md:p-1', xs: 'md:p-2', sm: 'md:p-3', md: 'md:p-4', lg: 'md:p-6', xl: 'md:p-8', px: 'md:p-px' },
    px: { none: 'md:px-0', xxs: 'md:px-1', xs: 'md:px-2', sm: 'md:px-3', md: 'md:px-4', lg: 'md:px-6', xl: 'md:px-8', px: 'md:px-px' },
    py: { none: 'md:py-0', xxs: 'md:py-1', xs: 'md:py-2', sm: 'md:py-3', md: 'md:py-4', lg: 'md:py-6', xl: 'md:py-8', px: 'md:py-px' },
    flex: { '1': 'md:flex-1', auto: 'md:flex-auto', none: 'md:flex-none' },
    maxWidth: { none: 'md:max-w-none', xs: 'md:max-w-xs', sm: 'md:max-w-sm', md: 'md:max-w-md', lg: 'md:max-w-lg', xl: 'md:max-w-xl', '2xl': 'md:max-w-2xl', '3xl': 'md:max-w-3xl', '5xl': 'md:max-w-5xl', full: 'md:max-w-full', prose: 'md:max-w-prose' },
    height: { auto: 'md:h-auto', full: 'md:h-full', creation: 'md:h-[480px]', px: 'md:h-px', 'avatar-xs': 'md:h-12', 'avatar-sm': 'md:h-16', avatar: 'md:h-20', dvh: 'md:h-dvh', 'character': 'md:min-h-[200px]', vitals: 'md:h-1.5', 'vitals-label': 'md:h-4', 'vitals-footer': 'md:h-10' },
    width: { auto: 'md:w-auto', full: 'md:w-full', 'avatar-xs': 'md:w-12', 'avatar-sm': 'md:w-16', avatar: 'md:w-20' },
    variant: { primary: 'md:text-primary', lead: 'md:text-xl', large: 'md:text-lg', base: 'md:text-base', small: 'md:text-sm', muted: 'md:text-sm md:opacity-60', detail: 'md:text-xs', bonus: 'md:text-xs', 'fantasy-value': 'md:text-lg', decoration: 'md:text-xl', tiny: 'md:text-[10px]' },
    inset: { base: 'md:inset-0', xs: 'md:inset-0.5', sm: 'md:inset-1', md: 'md:inset-2' },
    fullWidth: 'md:w-full',
    fullHeight: 'md:h-full',
    wrap: 'md:flex-wrap',
    nowrap: 'md:flex-nowrap'
  },
  lg: {
    display: { flex: 'lg:flex', grid: 'lg:grid', none: 'lg:hidden' },
    direction: { row: 'lg:flex-row', col: 'lg:flex-col' },
    cols: { '1': 'lg:grid-cols-1', '2': 'lg:grid-cols-2', '3': 'lg:grid-cols-3', '4': 'lg:grid-cols-4' },
    align: { start: 'lg:items-start', center: 'lg:items-center', end: 'lg:items-end', stretch: 'lg:items-stretch', baseline: 'lg:items-baseline' },
    justify: { start: 'lg:justify-start', center: 'lg:justify-center', end: 'lg:justify-end', between: 'lg:justify-between' },
    gap: { none: 'lg:gap-0', xxs: 'lg:gap-0.5', xs: 'lg:gap-1', sm: 'lg:gap-2', md: 'lg:gap-4', lg: 'lg:gap-6', xl: 'lg:gap-8', xxl: 'lg:gap-12' },
    p: { none: 'lg:p-0', xxs: 'lg:p-1', xs: 'lg:p-2', sm: 'lg:p-3', md: 'lg:p-4', lg: 'lg:p-6', xl: 'lg:p-8', px: 'lg:p-px' },
    px: { none: 'lg:px-0', xxs: 'lg:px-1', xs: 'lg:px-2', sm: 'lg:px-3', md: 'lg:px-4', lg: 'lg:px-6', xl: 'lg:px-8', px: 'lg:px-px' },
    py: { none: 'lg:py-0', xxs: 'lg:py-1', xs: 'lg:py-2', sm: 'lg:py-3', md: 'lg:py-4', lg: 'lg:py-6', xl: 'lg:py-8', px: 'lg:py-px' },
    flex: { '1': 'lg:flex-1', auto: 'lg:flex-auto', none: 'lg:flex-none' },
    maxWidth: { none: 'lg:max-w-none', xs: 'lg:max-w-xs', sm: 'lg:max-w-sm', md: 'lg:max-w-md', lg: 'lg:max-w-lg', xl: 'lg:max-w-xl', '2xl': 'lg:max-w-2xl', '3xl': 'lg:max-w-3xl', '5xl': 'lg:max-w-5xl', full: 'lg:max-w-full', prose: 'lg:max-w-prose' },
    height: { auto: 'lg:h-auto', full: 'lg:h-full', creation: 'lg:h-[480px]', px: 'lg:h-px', 'avatar-xs': 'lg:h-12', 'avatar-sm': 'lg:h-16', avatar: 'lg:h-20', dvh: 'lg:h-dvh', 'character': 'lg:min-h-[200px]', vitals: 'lg:h-1.5', 'vitals-label': 'lg:h-4', 'vitals-footer': 'lg:h-10' },
    width: { auto: 'lg:w-auto', full: 'lg:w-full', 'avatar-xs': 'lg:w-12', 'avatar-sm': 'lg:w-16', avatar: 'lg:w-20' },
    variant: { primary: 'lg:text-primary', lead: 'lg:text-xl', large: 'lg:text-lg', base: 'lg:text-base', small: 'lg:text-sm', muted: 'lg:text-sm lg:opacity-60', detail: 'lg:text-xs', bonus: 'lg:text-xs', 'fantasy-value': 'lg:text-lg', decoration: 'lg:text-xl', tiny: 'lg:text-[10px]' },
    inset: { base: 'lg:inset-0', xs: 'lg:inset-0.5', sm: 'lg:inset-1', md: 'lg:inset-2' },
    fullWidth: 'lg:w-full',
    fullHeight: 'lg:h-full',
    wrap: 'lg:flex-wrap',
    nowrap: 'lg:flex-nowrap'
  },
  xl: {
    display: { flex: 'xl:flex', grid: 'xl:grid', none: 'xl:hidden' },
    direction: { row: 'xl:flex-row', col: 'xl:flex-col' },
    cols: { '1': 'xl:grid-cols-1', '2': 'xl:grid-cols-2', '3': 'xl:grid-cols-3', '4': 'xl:grid-cols-4' },
    align: { start: 'xl:items-start', center: 'xl:items-center', end: 'xl:items-end', stretch: 'xl:items-stretch', baseline: 'xl:items-baseline' },
    justify: { start: 'xl:justify-start', center: 'xl:justify-center', end: 'xl:justify-end', between: 'xl:justify-between' },
    gap: { none: 'xl:gap-0', xxs: 'xl:gap-0.5', xs: 'xl:gap-1', sm: 'xl:gap-2', md: 'xl:gap-4', lg: 'xl:gap-6', xl: 'xl:gap-8', xxl: 'xl:gap-12' },
    p: { none: 'xl:p-0', xxs: 'xl:p-1', xs: 'xl:p-2', sm: 'xl:p-3', md: 'xl:p-4', lg: 'xl:p-6', xl: 'xl:p-8', px: 'xl:p-px' },
    px: { none: 'xl:px-0', xxs: 'xl:px-1', xs: 'xl:px-2', sm: 'xl:px-3', md: 'xl:px-4', lg: 'xl:px-6', xl: 'xl:px-8', px: 'xl:px-px' },
    py: { none: 'xl:py-0', xxs: 'xl:py-1', xs: 'xl:py-2', sm: 'xl:py-3', md: 'xl:py-4', lg: 'xl:py-6', xl: 'xl:py-8', px: 'xl:py-px' },
    flex: { '1': 'xl:flex-1', auto: 'xl:flex-auto', none: 'xl:flex-none' },
    maxWidth: { none: 'xl:max-w-none', xs: 'xl:max-w-xs', sm: 'xl:max-w-sm', md: 'xl:max-w-md', lg: 'xl:max-w-lg', xl: 'xl:max-w-xl', '2xl': 'xl:max-w-2xl', '3xl': 'xl:max-w-3xl', '5xl': 'xl:max-w-5xl', full: 'xl:max-w-full', prose: 'xl:max-w-prose' },
    height: { auto: 'xl:h-auto', full: 'xl:h-full', creation: 'xl:h-[480px]', px: 'xl:h-px', 'avatar-xs': 'xl:h-12', 'avatar-sm': 'xl:h-16', avatar: 'xl:h-20', dvh: 'xl:h-dvh', 'character': 'xl:min-h-[200px]', vitals: 'xl:h-1.5', 'vitals-label': 'xl:h-4', 'vitals-footer': 'xl:h-10' },
    width: { auto: 'xl:w-auto', full: 'xl:w-full', 'avatar-xs': 'xl:w-12', 'avatar-sm': 'xl:w-16', avatar: 'xl:w-20' },
    variant: { primary: 'xl:text-primary', lead: 'xl:text-xl', large: 'xl:text-lg', base: 'xl:text-base', small: 'xl:text-sm', muted: 'xl:text-sm xl:opacity-60', detail: 'xl:text-xs', bonus: 'xl:text-xs', 'fantasy-value': 'xl:text-lg', decoration: 'xl:text-xl', tiny: 'xl:text-[10px]' },
    inset: { base: 'xl:inset-0', xs: 'xl:inset-0.5', sm: 'xl:inset-1', md: 'xl:inset-2' },
    fullWidth: 'xl:w-full',
    fullHeight: 'xl:h-full',
    wrap: 'xl:flex-wrap',
    nowrap: 'xl:flex-nowrap'
  },
} as const

export type BreakpointValue = {
  display?: 'flex' | 'grid' | 'none'
  direction?: 'row' | 'col'
  cols?: '1' | '2' | '3' | '4'
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between'
  gap?: 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  p?: 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'px'
  px?: 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'px'
  py?: 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'px'
  flex?: '1' | 'auto' | 'none'
  maxWidth?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '5xl' | 'full' | 'prose'
  height?: 'auto' | 'full' | 'creation' | 'px' | 'avatar-xs' | 'avatar-sm' | 'avatar' | 'dvh' | 'character' | 'vitals' | 'vitals-label' | 'vitals-footer'
  width?: 'auto' | 'full' | 'avatar-xs' | 'avatar-sm' | 'avatar'
  minHeight?: 'none' | 'zero' | 'full' | 'screen' | 'dvh' | 'character'
  minWidth?: 'zero' | 'full'
  variant?: 'primary' | 'lead' | 'large' | 'base' | 'small' | 'muted' | 'detail' | 'bonus' | 'fantasy-value' | 'decoration' | 'tiny'
  inset?: 'base' | 'xs' | 'sm' | 'md'
  fullWidth?: boolean
  fullHeight?: boolean
  wrap?: boolean
  nowrap?: boolean
}

export const stackVariants = cva('flex', {
  variants: {
    display: { flex: 'flex', grid: 'grid', none: 'hidden' },
    direction: { row: 'flex-row', col: 'flex-col' },
    cols: { '1': 'grid-cols-1', '2': 'grid-cols-2', '3': 'grid-cols-3', '4': 'grid-cols-4' },
    align: { start: 'items-start', center: 'items-center', end: 'items-end', baseline: 'items-baseline', stretch: 'items-stretch' },
    justify: { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between' },
    gap: { none: 'gap-0', xxs: 'gap-0.5', xs: 'gap-1', sm: 'gap-2', md: 'gap-4', lg: 'gap-6', xl: 'gap-8', xxl: 'gap-12' },
    p: { none: 'p-0', xxs: 'p-1', xs: 'p-2', sm: 'p-3', md: 'p-4', lg: 'p-6', xl: 'p-8', px: 'p-px' },
    px: { none: 'px-0', xxs: 'px-1', xs: 'px-2', sm: 'px-3', md: 'px-4', lg: 'px-6', xl: 'px-8', px: 'px-px' },
    py: { none: 'py-0', xxs: 'py-1', xs: 'py-2', sm: 'py-3', md: 'py-4', lg: 'py-6', xl: 'py-8', px: 'py-px' },
    pt: { none: 'pt-0', xxs: 'pt-1', xs: 'pt-2', sm: 'pt-3', md: 'pt-4', lg: 'pt-6', xl: 'pt-8', px: 'pt-px' },
    pb: { none: 'pb-0', xxs: 'pb-1', xs: 'pb-2', sm: 'pb-3', md: 'pb-4', lg: 'pb-6', xl: 'pb-8', px: 'pb-px' },
    pl: { none: 'pl-0', xxs: 'pl-1', xs: 'pl-2', sm: 'pl-3', md: 'pl-4', lg: 'pl-6', xl: 'pl-8', px: 'pl-px' },
    pr: { none: 'pr-0', xxs: 'pr-1', xs: 'pr-2', sm: 'pr-3', md: 'pr-4', lg: 'pr-6', xl: 'pr-8', px: 'pr-px' },
    mt: { none: 'mt-0', xxs: 'mt-1', xs: 'mt-2', sm: 'mt-3', md: 'mt-4', lg: 'mt-6', xl: 'mt-8', px: 'mt-px', auto: 'mt-auto' },
    mb: { none: 'mb-0', xxs: 'mb-1', xs: 'mb-2', sm: 'mb-3', md: 'mb-4', lg: 'mb-6', xl: 'mb-8', px: 'mb-px', auto: 'mb-auto' },
    ml: { none: 'ml-0', xxs: 'ml-1', xs: 'ml-2', sm: 'ml-3', md: 'ml-4', lg: 'ml-6', xl: 'ml-8', px: 'ml-px', auto: 'ml-auto' },
    mr: { none: 'mr-0', xxs: 'mr-1', xs: 'mr-2', sm: 'mr-3', md: 'mr-4', lg: 'mr-6', xl: 'mr-8', px: 'mr-px', auto: 'mr-auto' },
    flex: { '1': 'flex-1', auto: 'flex-auto', none: 'flex-none' },
    maxWidth: { none: 'max-w-none', xs: 'max-w-xs', sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl', '2xl': 'max-w-2xl', '3xl': 'max-w-3xl', '5xl': 'max-w-5xl', full: 'max-w-full', prose: 'max-w-prose' },
    height: { auto: 'h-auto', full: 'h-full', creation: 'h-[480px]', px: 'h-px', 'avatar-xs': 'h-12', 'avatar-sm': 'h-16', avatar: 'h-20', dvh: 'h-dvh', 'character': 'min-h-[200px]', vitals: 'h-1.5', 'vitals-label': 'h-4', 'vitals-footer': 'h-10' },
    width: { auto: 'w-auto', full: 'w-full', 'avatar-xs': 'w-12', 'avatar-sm': 'w-16', avatar: 'w-20' },
    minHeight: { zero: 'min-h-0', none: 'min-h-0', full: 'min-h-full', screen: 'min-h-screen', dvh: 'min-h-dvh', character: 'min-h-[200px]' },
    minWidth: { zero: 'min-w-0', full: 'min-w-full' },
    inset: { base: 'inset-0', xs: 'inset-0.5', sm: 'inset-1', md: 'inset-2' },
    rounded: { none: 'rounded-none', sm: 'rounded-sm', md: 'rounded-md', lg: 'rounded-lg', xl: 'rounded-xl', full: 'rounded-full' },
    position: { relative: 'relative', absolute: 'absolute', fixed: 'fixed' },
    overflow: { hidden: 'overflow-hidden', auto: 'overflow-auto', visible: 'overflow-visible' },
    bgColor: { none: 'bg-transparent', black: 'bg-black', primary: 'bg-(--color-primary)', secondary: 'bg-(--color-secondary)', gold: 'bg-(--color-gold)' },
    opacity: { '10': 'opacity-10', '20': 'opacity-20', '30': 'opacity-30', '40': 'opacity-40', '50': 'opacity-50', '100': 'opacity-100' },
    border: { none: 'border-0', base: 'border', '2': 'border-2' },
    borderColor: { primary: 'border-(--color-primary)', secondary: 'border-(--color-secondary)', gold: 'border-(--color-gold)' },
    shadow: { none: 'shadow-none', base: 'shadow-md', inner: 'shadow-inner' },
    shrink: { true: 'shrink', false: 'shrink-0' },
    grow: { true: 'grow', false: 'grow-0' },
    top: { '0': 'top-0', '1': 'top-1', '2': 'top-2', '4': 'top-4', 'base': 'top-4', '-1': '-top-1', '-2': '-top-2' },
    bottom: { '0': 'bottom-0', '1': 'bottom-1', '2': 'bottom-2', '4': 'bottom-4', 'base': 'bottom-4', '-1': '-bottom-1', '-2': '-bottom-2' },
    left: { '0': 'left-0', '1': 'left-1', '2': 'left-2', '4': 'left-4', 'base': 'left-4', '-1': '-left-1', '-2': '-left-2' },
    right: { '0': 'right-0', '1': 'right-1', '2': 'right-2', '4': 'right-4', 'base': 'right-4', '-1': '-right-1', '-2': '-right-2' },
    fullWidth: { true: 'w-full' },
    fullHeight: { true: 'h-full' },
    wrap: { true: 'flex-wrap' },
    nowrap: { true: 'flex-nowrap' },
  },
  defaultVariants: { direction: 'row' },
})

export function getResponsiveClasses(breakpoint: keyof typeof RESPONSIVE_LOOKUP, val?: BreakpointValue) {
  if (!val) return ''
  const classes: string[] = []
  const bp = RESPONSIVE_LOOKUP[breakpoint]

  if (val.fullWidth === true) classes.push(bp.fullWidth)
  if (val.fullHeight === true) classes.push(bp.fullHeight)
  if (val.wrap === true) classes.push(bp.wrap)
  if (val.nowrap === true) classes.push(bp.nowrap)

  Object.keys(val).forEach((key) => {
    const v = (val as Record<string, unknown>)[key]
    if (v === undefined || typeof v === 'boolean') return
    const group = (bp as Record<string, any>)[key]
    if (typeof group === 'object' && group !== null && typeof v === 'string' && group[v]) {
      classes.push(group[v])
    }
  })

  return classes.join(' ')
}

export interface StackProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'style' | 'color' | 'width' | 'height'>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType
  sm?: BreakpointValue
  md?: BreakpointValue
  lg?: BreakpointValue
  xl?: BreakpointValue
}

export const Stack = React.forwardRef<HTMLElement, StackProps>(
  ({ as: Component = 'div', sm, md, lg, xl, ...props }, ref) => {
    const variantProps: Record<string, unknown> = {}
    const elementProps: Record<string, unknown> = {}
    
    const variantKeys = [
      'display', 'direction', 'cols', 'align', 'justify', 'gap', 
      'p', 'px', 'py', 'pt', 'pb', 'pl', 'pr',
      'mt', 'mb', 'ml', 'mr',
      'flex', 'maxWidth', 'height', 'width', 
      'minHeight', 'minWidth', 'inset',
      'top', 'bottom', 'left', 'right',
      'rounded', 'position', 'overflow', 'bgColor', 'opacity', 
      'border', 'borderColor', 'shadow', 'shrink', 'grow', 
      'fullWidth', 'fullHeight', 'wrap', 'nowrap'
    ]

    Object.entries(props).forEach(([key, value]) => {
      if (variantKeys.includes(key)) {
        variantProps[key] = value
      } else {
        elementProps[key] = value
      }
    })

    const responsiveClasses = React.useMemo(() => {
      return [
        sm && getResponsiveClasses('sm', sm),
        md && getResponsiveClasses('md', md),
        lg && getResponsiveClasses('lg', lg),
        xl && getResponsiveClasses('xl', xl),
      ].filter(Boolean).join(' ')
    }, [sm, md, lg, xl])

    return (
      <Component
        ref={ref as any}
        className={cn(stackVariants(variantProps as any), responsiveClasses)}
        {...elementProps}
      />
    )
  }
)
Stack.displayName = 'Stack'

export const HStack = React.forwardRef<HTMLElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack {...props} direction="row" ref={ref} />
)
HStack.displayName = 'HStack'

export const VStack = React.forwardRef<HTMLElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack {...props} direction="col" ref={ref} />
)
VStack.displayName = 'VStack'
