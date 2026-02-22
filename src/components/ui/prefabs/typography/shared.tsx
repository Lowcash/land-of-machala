import { Link } from '@/i18n/routing'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { Text, type TextProps } from '@/components/ui/core/typography'
import { type BreakpointValue } from '@/components/ui/core/stack'

/**
 * Semantic typography prefabs to ensure consistency across the application.
 * Use these instead of raw Text components with repetitive props.
 */

export interface TypographyPrefabProps extends Omit<TextProps, 'sm' | 'md' | 'lg' | 'xl'> {
  sm?: BreakpointValue
  md?: BreakpointValue
  lg?: BreakpointValue
  xl?: BreakpointValue
}

export function NarrativeText({ align, ...props }: TypographyPrefabProps) {
  return <Text variant="lead" color="primary" align={align || 'center'} {...props} />
}

export function Value({ align, variant, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant={variant || 'fantasy-value'}
      color={props.color || 'ivory'}
      align={align}
      bold
      {...props}
    />
  )
}

export function MutedText({ align, variant, ...props }: TypographyPrefabProps) {
  return <Text color="secondary" variant={variant || 'muted'} align={align} {...props} />
}

export function Description({ align, variant, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant={variant === 'bonus' ? 'bonus' : 'detail'}
      color="secondary"
      align={align}
      {...props}
    />
  )
}

export function Label({ align, variant, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant={variant || 'decoration'}
      color={props.color || 'gold'}
      align={align || 'center'}
      {...props}
    />
  )
}

export function Legend({ children, ...props }: TypographyPrefabProps) {
  return <Text variant="detail" italic color="secondary" {...props}>{children}</Text>
}

const textLinkVariants = cva('cursor-pointer transition-colors hover:underline', {
  variants: {
    variant: {
      primary: 'text-(--color-primary)',
      secondary: 'text-(--color-secondary)',
      ivory: 'text-(--color-ivory)',
      danger: 'text-(--color-danger)',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export interface TextLinkProps
  extends
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color' | 'className'>,
    VariantProps<typeof textLinkVariants> {
  href: string
  align?: 'left' | 'center' | 'right' | 'justify'
}

export function TextLink({ variant, align, ...props }: TextLinkProps) {
  return (
    <Link className={cn(textLinkVariants({ variant }))} {...props}>
      <Text as="span" align={align} color="inherit">
        {props.children}
      </Text>
    </Link>
  )
}
