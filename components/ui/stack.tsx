import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const stackVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      col: 'flex-col',
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
      'lg-xl': 'gap-7',
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
    /** Margin Top */
    mt: {
      none: 'mt-0',
      xs: 'mt-1',
      sm: 'mt-2',
      md: 'mt-4',
      lg: 'mt-6',
      xl: 'mt-8',
      auto: 'mt-auto',
    },
    /** Margin Bottom */
    mb: {
      none: 'mb-0',
      xs: 'mb-1',
      sm: 'mb-2',
      md: 'mb-4',
      lg: 'mb-6',
      xl: 'mb-8',
      auto: 'mb-auto',
    },
    /** Padding */
    p: {
      none: 'p-0',
      '0.5': 'p-0.5',
      '1': 'p-1',
      '1.5': 'p-1.5',
      xs: 'p-1',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    },
    /** Padding Top */
    pt: {
      none: 'pt-0',
      '0.5': 'pt-0.5',
      '1': 'pt-1',
      '1.5': 'pt-1.5',
      xs: 'pt-1',
      sm: 'pt-2',
      md: 'pt-4',
      lg: 'pt-6',
      xl: 'pt-8',
    },
    /** Padding Bottom */
    pb: {
      none: 'pb-0',
      '0.5': 'pb-0.5',
      '1': 'pb-1',
      '1.5': 'pb-1.5',
      xs: 'pb-1',
      sm: 'pb-2',
      md: 'pb-4',
      lg: 'pb-6',
      xl: 'pb-8',
    },
    /** Padding Left */
    pl: {
      none: 'pl-0',
      '0.5': 'pl-0.5',
      '1': 'pl-1',
      '1.5': 'pl-1.5',
      xs: 'pl-1',
      sm: 'pl-2',
      md: 'pl-4',
      lg: 'pl-6',
      xl: 'pl-8',
    },
    /** Padding Right */
    pr: {
      none: 'pr-0',
      '0.5': 'pr-0.5',
      '1': 'pr-1',
      '1.5': 'pr-1.5',
      xs: 'pr-1',
      sm: 'pr-2',
      md: 'pr-4',
      lg: 'pr-6',
      xl: 'pr-8',
    },
    /** Padding X */
    px: {
      none: 'px-0',
      '0.5': 'px-0.5',
      '1': 'px-1',
      '1.5': 'px-1.5',
      xs: 'px-1',
      sm: 'px-2',
      md: 'px-4',
      lg: 'px-6',
      xl: 'px-8',
    },
    /** Padding Y */
    py: {
      none: 'py-0',
      '0.5': 'py-0.5',
      '1': 'py-1',
      '1.5': 'py-1.5',
      xs: 'py-1',
      sm: 'py-2',
      md: 'py-4',
      lg: 'py-6',
      xl: 'py-8',
    },
    backdrop: {
      true: 'backdrop-blur-md',
      medium: 'backdrop-blur-md',
      small: 'backdrop-blur-sm',
      false: '',
    },
    rounded: {
      none: 'rounded-none',
      default: 'rounded',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    /** Overflow Control */
    overflow: {
      visible: 'overflow-visible',
      hidden: 'overflow-hidden',
      auto: 'overflow-auto',
      scroll: 'overflow-y-auto scrollbar-custom',
    },
    /** Overflow X Control */
    overflowX: {
      visible: 'overflow-x-visible',
      hidden: 'overflow-x-hidden',
      auto: 'overflow-x-auto',
    },
    /** Overflow Y Control */
    overflowY: {
      visible: 'overflow-y-visible',
      hidden: 'overflow-y-hidden',
      auto: 'overflow-y-auto',
      scroll: 'overflow-y-auto scrollbar-custom',
    },
    /** Minimum Width */
    minW: {
      none: 'min-w-0',
      '0': 'min-w-0',
      full: 'min-w-full',
      '50': 'min-w-[50%]',
      '25': 'min-w-[25%]',
    },
    /** Minimum Height */
    minH: {
      none: 'min-h-0',
      '0': 'min-h-0',
      full: 'min-h-full',
      screen: 'min-h-screen',
    },
    /** Max Height */
    maxH: {
      none: 'max-h-none',
      xs: 'max-h-20',
      sm: 'max-h-40',
      md: 'max-h-60',
      lg: 'max-h-80',
      full: 'max-h-full',
      screen: 'max-h-screen',
      market: 'max-h-75',
      '80': 'max-h-[80vh]',
    },
    /** Interaction */
    interactive: {
      true: 'cursor-pointer select-none active:scale-[0.98] transition-transform',
      false: '',
      none: 'pointer-events-none',
    },
    /** Background Options */
    bg: {
      none: '',
      black: 'bg-black',
      'black-90': 'bg-black/90',
      'black-80': 'bg-black/80',
      'black-60': 'bg-black/60',
      'black-40': 'bg-black/40',
      'black-20': 'bg-black/20',
      'black-10': 'bg-black/10',
      danger: 'bg-game-danger/80',
      success: 'bg-game-success/80',
      gold: 'bg-game-gold/80',
      info: 'bg-game-info/80',
      'game-wood': 'bg-game-wood',
      'game-wood-dark': 'bg-game-wood-dark',
      noise: 'bg-noise',
      card: 'bg-card',
      'npc-speech': 'bg-[#1a1510]',
      magic: 'bg-game-magic/80',
      copper: 'bg-[#8b6f47]/10',
      'gold-muted': 'bg-[#d4a574]/20',
    },
    /** Border */
    border: {
      none: '',
      default: 'border border-border',
      game: 'border border-[#8b6f47]/30',
      gold: 'border border-[#ffd700]/30',
      'gold-muted': 'border border-[#d4a574]/30',
      success: 'border border-[#6fbf6f]/30',
      danger: 'border border-[#ff6b6b]/30',
      info: 'border border-[#69ccf0]/30',
      'game-l': 'border-l border-[#8b6f47]/20',
      'game-t': 'border-t border-[#8b6f47]/20',
      'game-copper-t': 'border-t border-[#b87333]/30',
      'game-b': 'border-b border-[#8b6f47]/20',
      'game-r': 'border-r border-[#8b6f47]/20',
      magic: 'border border-[#b66bd4]/30',
      copper: 'border border-[#8b6f47]/30',
    },
    /** Display Control */
    display: {
      flex: 'flex',
      grid: 'grid',
      'none-lg': 'hidden lg:block',
      'flex-lg': 'hidden lg:flex',
      'none-md': 'hidden md:block',
      'flex-md': 'hidden md:flex',
      'block-lg': 'hidden lg:block',
      'hidden-lg': 'lg:hidden',
      'hidden-md': 'md:hidden',
    },
    /** Grid Columns (if display: grid) */
    gridCols: {
      '1': 'grid-cols-1',
      '2': 'grid-cols-2',
      '3': 'grid-cols-3',
      '4': 'grid-cols-4',
      '5': 'grid-cols-5',
      '6': 'grid-cols-6',
      '7': 'grid-cols-7',
      '8': 'grid-cols-8',
      '9': 'grid-cols-9',
      '10': 'grid-cols-10',
      '11': 'grid-cols-11',
      '12': 'grid-cols-12',
      '1-2': 'grid-cols-[1fr_2fr]',
      '2-1': 'grid-cols-[2fr_1fr]',
      '1-2-lg': 'grid-cols-1 lg:grid-cols-2',
      '1-3-lg': 'grid-cols-1 lg:grid-cols-3',
    },
    /** Opacity */
    opacity: {
      '10': 'opacity-10',
      '20': 'opacity-20',
      '30': 'opacity-30',
      '40': 'opacity-40',
      '50': 'opacity-50',
      '60': 'opacity-60',
      '70': 'opacity-70',
      '80': 'opacity-80',
      '90': 'opacity-90',
      '100': 'opacity-100',
    },
    /** Line Height */
    leading: {
      none: 'leading-none',
      tight: 'leading-tight',
      snug: 'leading-snug',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    },
    /** Flex Grow */
    flex: {
      '1': 'flex-1',
      auto: 'flex-auto',
      initial: 'flex-initial',
      none: 'flex-none',
    },
    /** Flex Shrink */
    shrink: {
      '0': 'flex-shrink-0',
      '1': 'flex-shrink',
    },
    /** Position */
    position: {
      relative: 'relative',
      absolute: 'absolute',
      fixed: 'fixed',
      sticky: 'sticky',
    },
    /** Z-Index */
    z: {
      auto: 'z-auto',
      '0': 'z-0',
      '10': 'z-10',
      '20': 'z-20',
      '30': 'z-30',
      '40': 'z-40',
      '50': 'z-50',
      top: 'z-50',
      below: 'z-[-1]',
    },
    /** Flex Wrap */
    flexWrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
    /** Inset / Top */
    top: {
      '-2': '-top-2',
      '-1': '-top-1',
      '0': 'top-0',
      '0.5': 'top-0.5',
      '1': 'top-1',
      '1.5': 'top-1.5',
      '2': 'top-2',
      '4': 'top-4',
      '20': 'top-20',
      full: 'top-full',
    },
    bottom: {
      '-2': '-bottom-2',
      '-1': '-bottom-1',
      '0': 'bottom-0',
      '0.5': 'bottom-0.5',
      '1': 'bottom-1',
      '1.5': 'bottom-1.5',
      '2': 'bottom-2',
      '4': 'bottom-4',
    },
    left: {
      '-2': '-left-2',
      '-1': '-left-1',
      '0': 'left-0',
      '0.5': 'left-0.5',
      '1': 'left-1',
      '1.5': 'left-1.5',
      '2': 'left-2',
      '4': 'left-4',
    },
    right: {
      '-2': '-right-2',
      '-1': '-right-1',
      '0': 'right-0',
      '0.5': 'right-0.5',
      '1': 'right-1',
      '1.5': 'right-1.5',
      '2': 'right-2',
      '4': 'right-4',
    },
    /** Width / Max Width */
    maxW: {
      none: 'max-w-none',
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      '2xl': 'max-w-2xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
      container: 'max-w-7xl px-4 sm:px-6 lg:px-8',
    },
    inset: {
      '0': 'inset-0',
      full: 'inset-0',
    },
    h: {
      full: 'h-full',
      screen: 'h-screen',
      px: 'h-px',
      '1': 'h-1',
      '1.5': 'h-1.5',
      '2': 'h-2',
      '4': 'h-4',
      '5': 'h-5',
      '6': 'h-6',
      '8': 'h-8',
      '10': 'h-10',
      '12': 'h-12',
      '64': 'h-64',
    },
    w: {
      full: 'w-full',
      px: 'w-px',
      '1': 'w-1',
      '1.5': 'w-1.5',
      '2': 'w-2',
      '4': 'w-4',
      '5': 'w-5',
      '6': 'w-6',
      '8': 'w-8',
      '10': 'w-10',
      '12': 'w-12',
      '64': 'w-64',
      '80': 'w-80',
    },
  },
  defaultVariants: {
    direction: 'col',
    align: 'stretch',
    justify: 'start',
    gap: 'none',
    fullWidth: false,
    fullHeight: false,
    display: 'flex',
  },
})

export interface StackProps
  extends
    Omit<React.AllHTMLAttributes<HTMLElement>, 'style' | 'as'>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType
  /** Internal use only */
  _internalClassName?: string
  /** Internal use only */
  _internalStyle?: React.CSSProperties
}

export const Stack = React.forwardRef<HTMLElement, StackProps>(
  (
    {
      direction,
      as: Component = 'div',
      align,
      justify,
      gap,
      fullWidth,
      fullHeight,
      mt,
      mb,
      p,
      pt,
      pb,
      pl,
      pr,
      px,
      py,
      backdrop,
      rounded,
      overflow,
      overflowX,
      overflowY,
      maxH,
      interactive,
      bg,
      border,
      display,
      gridCols,
      flexWrap,
      opacity,
      leading,
      flex,
      shrink,
      position,
      z,
      top,
      bottom,
      left,
      right,
      inset,
      maxW,
      minW,
      minH,
      h,
      w,
      _internalClassName,
      _internalStyle,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          stackVariants({
            direction,
            align,
            justify,
            gap,
            fullWidth,
            fullHeight,
            mt,
            mb,
            p,
            pt,
            pb,
            pl,
            pr,
            px,
            py,
            backdrop,
            rounded,
            overflow,
            overflowX,
            overflowY,
            maxH,
            interactive,
            bg,
            border,
            display,
            gridCols,
            flexWrap,
            opacity,
            leading,
            flex,
            shrink,
            position,
            z,
            top,
            bottom,
            left,
            right,
            inset,
            maxW,
            minW,
            minH,
            h,
            w,
          }),
          _internalClassName
        )}
        style={_internalStyle}
        {...props}
      />
    )
  }
)
Stack.displayName = 'Stack'

export const VStack = React.forwardRef<HTMLElement, StackProps>((props, ref) => {
  return <Stack ref={ref} direction="col" {...props} />
})
VStack.displayName = 'VStack'

export const HStack = React.forwardRef<HTMLElement, StackProps>((props, ref) => {
  return <Stack ref={ref} direction="row" {...props} />
})
HStack.displayName = 'HStack'
