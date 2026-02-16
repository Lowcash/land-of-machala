import * as React from 'react'

import { Link } from '@/i18n/routing'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { Text } from '@/components/ui/core/typography'

/**
 * Semantic typography prefabs to ensure consistency across the application.
 * Use these instead of raw Text components with repetitive props.
 */

export function NarrativeText({ align, variant, ...props }: TypographyPrefabProps) {
  return (
    <Text
      font="fantasy"
      variant={variant as any}
      color={'primary' as any}
      align={align || 'center'}
      className="text-xl leading-relaxed italic sm:text-2xl"
      {...props}
    />
  )
}

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

interface TypographyPrefabProps extends Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  'color' | 'className'
> {
  children: React.ReactNode
  as?: 'p' | 'span' | 'div'
  color?: TypographyColor
  align?: 'left' | 'center' | 'right' | 'justify'
  bold?: boolean
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

export function Value({ align, variant, ...props }: TypographyPrefabProps) {
  // Map our preset variant to the base Text variant where appropriate
  const baseVariant =
    variant === 'tiny' || variant === 'small' ? 'small' : variant || 'fantasy-value'

  return (
    <Text
      variant={baseVariant as any}
      font="fantasy"
      color={'ivory' as any}
      align={align}
      className={cn('tracking-wider', variant === 'tiny' && 'text-[10px] sm:text-xs')}
      {...props}
    />
  )
}

export function MutedText({ align, variant, ...props }: TypographyPrefabProps) {
  return <Text color={'secondary' as any} variant={variant as any} align={align} {...props} />
}

export function Description({ align, variant, ...props }: TypographyPrefabProps) {
  const sizes = {
    primary: 'text-xs italic sm:text-sm',
    detail: 'text-[11px] leading-relaxed italic sm:text-[13px]',
    bonus: 'text-[10px] italic sm:text-[11px]',
  }
  const sizeClass = (sizes as any)[variant as any] || sizes.primary
  const baseVariant = variant === 'bonus' || variant === 'small' ? 'small' : 'primary'

  return (
    <Text
      font="body"
      variant={baseVariant as any}
      color={'secondary' as any}
      align={align}
      className={sizeClass}
      {...props}
    />
  )
}

export function Decoration({ align, variant, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant={variant === 'small' ? 'small' : 'small'}
      color={'secondary' as any}
      font="fantasy"
      align={align}
      className="tracking-widest uppercase"
      {...props}
    />
  )
}

export function Label({ align, variant, ...props }: TypographyPrefabProps) {
  // Map our preset variant to the base Text variant where appropriate
  const baseVariant = (variant === 'small' || variant === 'tiny') ? 'small' : 'primary'

  return (
    <Text
      font="fantasy"
      variant={baseVariant as any}
      color={'gold' as any}
      align={align || 'center'}
      className={cn(
        'text-base sm:text-xl',
        variant === 'small' && 'text-sm! sm:text-base!',
        variant === 'tiny' && 'text-xs! sm:text-sm!'
      )}
      {...props}
    />
  )
}

export function Legend({ align, bold, variant, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant={variant === 'small' ? 'small' : ('small' as any)}
      font="body"
      align={align}
      className={cn(bold && 'font-bold')}
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
