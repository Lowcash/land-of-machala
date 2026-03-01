import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const headingVariants = cva('font-fantasy font-bold tracking-tight', {
  variants: {
    level: {
      h1: 'text-4xl',
      h2: 'text-3xl',
      h3: 'text-2xl',
      h4: 'text-xl',
    },
    font: {
      fantasy: 'font-fantasy',
      medieval: 'font-medieval',
    },
    color: {
      primary: 'text-(--color-primary)',
      secondary: 'text-(--color-secondary)',
      ivory: 'text-(--color-ivory)',
      success: 'text-(--color-success)',
      danger: 'text-(--color-danger)',
      magic: 'text-purple-500',
      gold: 'text-(--color-gold)',
      info: 'text-(--color-info)',
      copper: 'text-(--color-secondary)',
      hp: 'text-(--color-stat-hp)',
      mana: 'text-(--color-stat-mana)',
      strength: 'text-(--color-stat-strength)',
      intelligence: 'text-(--color-stat-intelligence)',
      agility: 'text-(--color-stat-agility)',
      stamina: 'text-(--color-stat-stamina)',
      inherit: 'text-inherit',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    level: 'h1',
    font: 'fantasy',
    color: 'primary',
  },
})

interface HeadingProps
  extends
    Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
}

export function Heading({ level, font, color, align, className, as, ...props }: HeadingProps) {
  if (!props.children) return null
  const Component = as || level || 'h1'
  return (
    <Component
      className={cn(headingVariants({ level, font, color, align }), className)}
      {...props}
    />
  )
}

const textVariants = cva('leading-tight transition-colors', {
  variants: {
    variant: {
      primary: 'text-base',
      lead: 'text-xl sm:text-2xl font-fantasy italic leading-relaxed',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm opacity-80',
      detail: 'text-xs sm:text-sm leading-relaxed italic font-body',
      bonus: 'text-[10px] sm:text-[11px] italic font-body',
      'fantasy-value': 'text-base sm:text-lg font-fantasy tracking-wider',
      decoration: 'text-xs sm:text-sm font-fantasy tracking-widest uppercase',
      tiny: 'text-[10px] sm:text-xs font-fantasy tracking-wider',
    },
    font: {
      body: 'font-body',
      fantasy: 'font-fantasy',
      medieval: 'font-medieval',
    },
    color: {
      primary: 'text-(--color-primary)',
      secondary: 'text-(--color-secondary)',
      ivory: 'text-(--color-ivory)',
      success: 'text-(--color-success)',
      danger: 'text-(--color-danger)',
      magic: 'text-purple-500',
      gold: 'text-(--color-gold)',
      info: 'text-(--color-info)',
      copper: 'text-(--color-secondary)',
      hp: 'text-(--color-stat-hp)',
      mana: 'text-(--color-stat-mana)',
      strength: 'text-(--color-stat-strength)',
      intelligence: 'text-(--color-stat-intelligence)',
      agility: 'text-(--color-stat-agility)',
      stamina: 'text-(--color-stat-stamina)',
      inherit: 'text-inherit',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    truncate: {
      true: 'truncate',
      false: '',
    },
    shrink: {
      true: 'shrink-0',
      false: 'shrink',
    },
    grow: {
      true: 'grow',
      false: 'grow-0',
    },
    bold: {
      true: 'font-bold',
      false: '',
    },
    tabularNums: {
      true: 'tabular-nums',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    font: 'body',
    color: 'ivory',
    truncate: false,
    shrink: false,
    grow: false,
    bold: false,
    tabularNums: false,
  },
})

export interface TextProps
  extends
    Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color' | 'className'>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div'
  className?: string
  px?: 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  maxWidth?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
}

export function Text({
  variant,
  font,
  color,
  align,
  truncate,
  shrink,
  grow,
  bold,
  tabularNums,
  className,
  px,
  maxWidth,
  as: Component = 'p',
  ...props
}: TextProps) {
  const pxClass = px ? {
    none: 'px-0',
    xxs: 'px-0.5',
    xs: 'px-1',
    sm: 'px-2',
    md: 'px-4',
    lg: 'px-6',
    xl: 'px-8',
  }[px] : ''

  const maxWidthClass = maxWidth ? {
    none: 'max-w-none',
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  }[maxWidth] : ''

  return (
    <Component
      className={cn(
        textVariants({
          variant,
          font,
          color,
          align,
          truncate,
          shrink,
          grow,
          bold,
          tabularNums,
        }),
        pxClass,
        maxWidthClass,
        className
      )}
      {...props}
    />
  )
}
