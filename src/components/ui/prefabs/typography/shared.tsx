import * as React from 'react'

import { Link } from '@/i18n/routing'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { Text } from '@/components/ui/core/typography'

/**
 * Semantic typography prefabs to ensure consistency across the application.
 * Use these instead of raw Text components with repetitive props.
 */

export function NarrativeText({ align, ...props }: TypographyPrefabProps) {
  return (
    <Text
      font="fantasy"
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

interface TypographyPrefabProps extends Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  'color' | 'className'
> {
  children: React.ReactNode
  as?: 'p' | 'span' | 'div'
  color?: TypographyColor
  align?: 'left' | 'center' | 'right' | 'justify'
  bold?: boolean
  variant?: 'primary' | 'lead' | 'large' | 'small' | 'muted' | 'fantasy-value'
}

export function Value({ align, variant, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant={variant || 'fantasy-value'}
      font="fantasy"
      color={'ivory' as any}
      align={align}
      className="tracking-wider"
      {...props}
    />
  )
}

export function MutedText({ align, ...props }: TypographyPrefabProps) {
  return <Text color={'secondary' as any} align={align} {...props} />
}

export function Description({ align, ...props }: TypographyPrefabProps) {
  return (
    <Text
      font="body"
      color={'secondary' as any}
      align={align}
      className="text-xs italic sm:text-sm"
      {...props}
    />
  )
}

export function Decoration({ align, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="small"
      color={'secondary' as any}
      font="fantasy"
      align={align}
      className="tracking-widest uppercase"
      {...props}
    />
  )
}

export function Label({ align, ...props }: TypographyPrefabProps) {
  return (
    <Text
      font="fantasy"
      color={'gold' as any}
      align={align || 'center'}
      className="text-base sm:text-xl"
      {...props}
    />
  )
}

export function Legend({ align, bold, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="small"
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
