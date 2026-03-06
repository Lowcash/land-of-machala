import { Link } from '@/i18n/routing'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { Text } from '@/components/ui/core/typography'

/**
 * Semantic typography prefabs to ensure consistency across the application.
 * Use these instead of raw Text components with repetitive props.
 */

type TypographyColor =
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

interface TypographyPrefabProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'> {
  children: React.ReactNode
  as?: 'p' | 'span' | 'div'
  color?: TypographyColor
  align?: 'left' | 'center' | 'right' | 'justify'
  truncate?: boolean
  shrink?: boolean
  grow?: boolean
  px?: 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  mx?: 'none' | 'auto'
  maxWidth?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  bold?: boolean
  tabularNums?: boolean
  font?: 'body' | 'fantasy' | 'medieval'
  variant?:
    | 'primary'
    | 'lead'
    | 'large'
    | 'small'
    | 'muted'
    | 'fantasy-value'
    | 'detail'
    | 'bonus'
    | 'tiny'
}

export function NarrativeText({ align, ...props }: TypographyPrefabProps) {
  return <Text variant="lead" color="primary" align={align || 'center'} {...props} />
}

export function Value({ align, variant, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant={variant === 'tiny' ? 'tiny' : 'fantasy-value'}
      color={props.color || 'ivory'}
      align={align}
      truncate={props.truncate}
      shrink={props.shrink}
      grow={props.grow}
      tabularNums={props.tabularNums}
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

/**
 * Combined Label/Decoration prefab.
 * Uses the decoration variant by default (tracking-widest, uppercase).
 */
export function Label({ align, variant, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant={variant === 'tiny' ? 'tiny' : 'decoration'}
      color={props.color || 'gold'}
      align={align || 'center'}
      {...props}
    />
  )
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
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>,
    VariantProps<typeof textLinkVariants> {
  href: string
  className?: string
  align?: 'left' | 'center' | 'right' | 'justify'
}

export function TextLink({ className, variant, align, ...props }: TextLinkProps) {
  return (
    <Link className={cn(textLinkVariants({ variant }), className)} {...props}>
      <Text as="span" align={align} color="inherit">
        {props.children}
      </Text>
    </Link>
  )
}
