import * as React from 'react'

import Link from 'next/link'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const typographyVariants = cva('transition-colors', {
  variants: {
    variant: {
      h1: 'text-2xl sm:text-3xl font-bold leading-tight',
      h2: 'text-xl sm:text-2xl font-bold leading-tight',
      h3: 'text-lg sm:text-xl font-bold leading-tight',
      h4: 'text-base sm:text-lg font-bold leading-tight',
      p: 'text-sm sm:text-base leading-relaxed',
      label: 'text-xs font-bold uppercase tracking-tight',
      caption: 'text-[10px] leading-tight',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    },
    font: {
      standard: 'font-sans',
      fantasy: 'font-fantasy tracking-wide',
      medieval: 'font-medieval tracking-wider',
      mono: 'font-mono tracking-tighter',
    },
    color: {
      default: 'text-foreground',
      gold: 'text-game-gold',
      'gold-muted': 'text-game-gold-muted',
      copper: 'text-game-copper',
      'copper-muted': 'text-game-copper-muted',
      muted: 'text-game-copper-muted',
      danger: 'text-game-danger',
      success: 'text-game-success',
      magic: 'text-game-magic',
      cold: 'text-game-info',
      nature: 'text-game-success',
      info: 'text-game-info',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    italic: {
      true: 'italic',
      false: '',
    },
    truncate: {
      true: 'truncate',
      false: '',
    },
    uppercase: {
      true: 'uppercase',
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
    },
    /** Margin Bottom */
    mb: {
      none: 'mb-0',
      xs: 'mb-1',
      sm: 'mb-2',
      md: 'mb-4',
      lg: 'mb-6',
      xl: 'mb-8',
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
    /** Letter Spacing */
    letterSpacing: {
      tighter: 'tracking-tighter',
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
      wider: 'tracking-wider',
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
    /** Inset / Top */
    top: {
      '0': 'top-0',
      '2': 'top-2',
      '4': 'top-4',
    },
    bottom: {
      '0': 'bottom-0',
      '2': 'bottom-2',
      '4': 'bottom-4',
    },
    left: {
      '0': 'left-0',
      '2': 'left-2',
      '4': 'left-4',
    },
    right: {
      '0': 'right-0',
      '2': 'right-2',
      '4': 'right-4',
    },
    inset: {
      '0': 'inset-0',
    },
    size: {
      xs: 'text-[10px] sm:text-xs',
      sm: 'text-xs sm:text-sm',
      md: 'text-sm sm:text-base',
      lg: 'text-base sm:text-lg',
      xl: 'text-lg sm:text-xl',
      '2xl': 'text-xl sm:text-2xl',
      '3xl': 'text-2xl sm:text-3xl',
    },
  },
  defaultVariants: {
    variant: 'p',
    weight: 'normal',
    font: 'standard',
    color: 'default',
    align: 'left',
    truncate: false,
    uppercase: false,
  },
})

export interface TypographyProps extends Omit<
  React.AllHTMLAttributes<HTMLElement>,
  'className' | 'style' | 'color' | 'as' | 'size'
> {
  size?: VariantProps<typeof typographyVariants>['size']
  variant?: VariantProps<typeof typographyVariants>['variant']
  weight?: VariantProps<typeof typographyVariants>['weight']
  font?: VariantProps<typeof typographyVariants>['font']
  color?: VariantProps<typeof typographyVariants>['color']
  align?: VariantProps<typeof typographyVariants>['align']
  italic?: VariantProps<typeof typographyVariants>['italic']
  truncate?: VariantProps<typeof typographyVariants>['truncate']
  uppercase?: VariantProps<typeof typographyVariants>['uppercase']
  mt?: VariantProps<typeof typographyVariants>['mt']
  mb?: VariantProps<typeof typographyVariants>['mb']
  opacity?: VariantProps<typeof typographyVariants>['opacity']
  leading?: VariantProps<typeof typographyVariants>['leading']
  letterSpacing?: VariantProps<typeof typographyVariants>['letterSpacing']
  position?: VariantProps<typeof typographyVariants>['position']
  z?: VariantProps<typeof typographyVariants>['z']
  top?: VariantProps<typeof typographyVariants>['top']
  bottom?: VariantProps<typeof typographyVariants>['bottom']
  left?: VariantProps<typeof typographyVariants>['left']
  right?: VariantProps<typeof typographyVariants>['right']
  inset?: VariantProps<typeof typographyVariants>['inset']
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' | 'div'
  /** Internal use only */
  _internalClassName?: string
  /** Internal use only */
  _internalStyle?: React.CSSProperties
}

export function Typography({
  variant,
  weight,
  font,
  color,
  align,
  italic,
  truncate,
  uppercase,
  mt,
  mb,
  opacity,
  leading,
  letterSpacing,
  position,
  z,
  top,
  bottom,
  left,
  right,
  inset,
  size,
  as,
  _internalClassName,
  _internalStyle,
  ...props
}: TypographyProps) {
  const Component =
    as ||
    (variant && ['h1', 'h2', 'h3', 'h4'].includes(variant)
      ? (variant as React.ElementType)
      : variant === 'label'
        ? 'label'
        : 'p')

  return (
    <Component
      className={cn(
        typographyVariants({
          variant,
          weight,
          font,
          color,
          align,
          italic,
          truncate,
          uppercase,
          mt,
          mb,
          opacity,
          leading,
          letterSpacing,
          position,
          z,
          top,
          bottom,
          left,
          right,
          inset,
          size,
        }),
        _internalClassName
      )}
      style={_internalStyle}
      {...props}
    />
  )
}

export interface TypographyPrefabProps extends TypographyProps {
  bold?: boolean
}

// Prefabs
export const H1 = (props: TypographyPrefabProps) => (
  <Typography variant="h1" weight={props.weight || (props.bold ? 'bold' : undefined)} {...props} />
)
export const H2 = (props: TypographyPrefabProps) => (
  <Typography variant="h2" weight={props.weight || (props.bold ? 'bold' : undefined)} {...props} />
)
export const H3 = (props: TypographyPrefabProps) => (
  <Typography variant="h3" weight={props.weight || (props.bold ? 'bold' : undefined)} {...props} />
)
export const H4 = (props: TypographyPrefabProps) => (
  <Typography variant="h4" weight={props.weight || (props.bold ? 'bold' : undefined)} {...props} />
)
export const P = (props: TypographyPrefabProps) => (
  <Typography variant="p" weight={props.weight || (props.bold ? 'bold' : 'normal')} {...props} />
)
export const Span = (props: TypographyPrefabProps) => (
  <Typography
    variant="p"
    as="span"
    weight={props.weight || (props.bold ? 'bold' : 'normal')}
    {...props}
  />
)
export const Label = (props: TypographyPrefabProps) => (
  <Typography
    variant="label"
    weight={props.weight || (props.bold ? 'bold' : undefined)}
    {...props}
  />
)
export const Caption = (props: TypographyPrefabProps) => (
  <Typography
    variant="caption"
    weight={props.weight || (props.bold ? 'bold' : undefined)}
    {...props}
  />
)

// Aesthetic Prefabs
export const GoldTitle = (props: TypographyPrefabProps) => (
  <Typography variant="h3" font="fantasy" color="gold" {...props} />
)
/**
 * A semantic header for sub-panels with consistent color, font, and margins.
 */
/**
 * A semantic header for sub-panels with consistent color, font, and margins.
 */
export const SectionHeading = (props: TypographyPrefabProps) => (
  <Typography variant="label" color="copper" font="fantasy" mb="xs" uppercase {...props} />
)

/**
 * A prefab for key-value pairs (e.g. "Level: 10").
 */
export const ValueLabel = ({
  label,
  value,
  ...props
}: TypographyPrefabProps & { label: string; value: string | number }) => (
  <Span color="muted" {...props}>
    {label}:{' '}
    <Span color="gold" weight="bold">
      {value}
    </Span>
  </Span>
)
export const MutedText = (props: TypographyPrefabProps) => (
  <Typography variant="caption" color="muted" {...props} />
)
export const DangerText = (props: TypographyPrefabProps) => (
  <Typography variant="p" color="danger" {...props} />
)
export const MagicText = (props: TypographyPrefabProps) => (
  <Typography variant="p" color="magic" {...props} />
)
export const SuccessText = (props: TypographyPrefabProps) => (
  <Typography variant="p" color="success" {...props} />
)

export const MedievalTitle = (props: TypographyPrefabProps) => (
  <Typography variant="h1" font="medieval" color="gold" {...props} />
)

export const LogoTitle = (props: TypographyPrefabProps) => (
  <Typography
    as="h1"
    variant="h1"
    font="medieval"
    color="gold"
    _internalClassName="text-3xl sm:text-4xl lg:text-5xl"
    _internalStyle={{ textShadow: '3px 3px 8px rgba(0,0,0,0.9)' }}
    {...props}
  />
)

export const GameLink = ({ href, ...props }: TypographyPrefabProps & { href: string }) => (
  // @ts-expect-error - handling strict Next.js routing types in shared component
  <Link href={href as string}>
    <Typography
      variant="p"
      as="span"
      color="gold"
      _internalClassName="cursor-pointer transition-all hover:underline"
      {...props}
    />
  </Link>
)
