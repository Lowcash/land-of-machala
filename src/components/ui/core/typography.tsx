import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { type Breakpoint } from './box'

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

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'ivory'
  | 'success'
  | 'danger'
  | 'magic'
  | 'gold'
  | 'info'
  | 'copper'
  | 'hp'
  | 'mana'
  | 'strength'
  | 'intelligence'
  | 'agility'
  | 'stamina'
  | 'inherit'

interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color' | 'className'> {
  level?: 'h1' | 'h2' | 'h3' | 'h4'
  font?: 'fantasy' | 'medieval'
  color?: TypographyColor
  align?: 'left' | 'center' | 'right' | 'justify'
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
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
    italic: {
      true: 'italic',
      false: '',
    },
    bold: {
      true: 'font-bold',
      false: '',
    },
    tabularNums: {
      true: 'tabular-nums',
      false: '',
    },
    display: {
      none: 'hidden',
      block: 'block',
      inline: 'inline-block',
      flex: 'flex',
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
    display: 'block',
  },
})

type TextVariantKeys = keyof VariantProps<typeof textVariants>
type TextVariantValue = {
  [K in TextVariantKeys]?: string | boolean
}

const TEXT_RESPONSIVE_LOOKUP = {
  sm: {
    display: { none: 'sm:hidden', block: 'sm:block', inline: 'sm:inline-block', flex: 'sm:flex' },
  },
  md: {
    display: { none: 'md:hidden', block: 'md:block', inline: 'md:inline-block', flex: 'md:flex' },
  },
  lg: {
    display: { none: 'lg:hidden', block: 'lg:block', inline: 'lg:inline-block', flex: 'lg:flex' },
  },
  xl: {
    display: { none: 'xl:hidden', block: 'xl:block', inline: 'xl:inline-block', flex: 'xl:flex' },
  },
}

function getTextResponsiveClasses(breakpoint: Breakpoint, val?: TextVariantValue) {
  if (!val) return ''
  const classes: string[] = []
  const bp = TEXT_RESPONSIVE_LOOKUP[breakpoint] as any
  if (!bp) return ''

  Object.keys(val).forEach((key) => {
    const v = (val as any)[key]
    const group = bp[key]
    if (group && typeof v === 'string' && group[v]) {
      classes.push(group[v])
    }
  })

  return classes.join(' ')
}

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color' | 'className'> {
  variant?:
    | 'primary'
    | 'lead'
    | 'large'
    | 'small'
    | 'muted'
    | 'detail'
    | 'bonus'
    | 'fantasy-value'
    | 'decoration'
    | 'tiny'
  font?: 'body' | 'fantasy' | 'medieval'
  color?: TypographyColor
  align?: 'left' | 'center' | 'right' | 'justify'
  truncate?: boolean
  shrink?: boolean
  grow?: boolean
  bold?: boolean
  italic?: boolean
  tabularNums?: boolean
  as?: 'p' | 'span' | 'div'
  className?: string
  display?: 'none' | 'block' | 'inline-block' | 'flex'
  px?: 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  maxWidth?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  sm?: TextVariantValue
  md?: TextVariantValue
  lg?: TextVariantValue
  xl?: TextVariantValue
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
  italic,
  tabularNums,
  display,
  className,
  px,
  maxWidth,
  sm,
  md,
  lg,
  xl,
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
          italic,
          tabularNums,
          display: display as any,
        }),
        pxClass,
        maxWidthClass,
        getTextResponsiveClasses('sm', sm),
        getTextResponsiveClasses('md', md),
        getTextResponsiveClasses('lg', lg),
        getTextResponsiveClasses('xl', xl),
        className
      )}
      {...props}
    />
  )
}
