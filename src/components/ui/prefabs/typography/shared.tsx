import * as React from 'react'

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

interface TypographyPrefabProps extends Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  'className' | 'color'
> {
  children: React.ReactNode
  as?: 'p' | 'span' | 'div'
  color?: TypographyColor
  align?: 'left' | 'center' | 'right' | 'justify'
  bold?: boolean
}

export function Value({ align, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="fantasy-value"
      font="fantasy"
      color={'ivory' as any}
      align={align}
      className="tracking-wider"
      {...props}
    />
  )
}

export function MutedText({ align, ...props }: TypographyPrefabProps) {
  return <Text variant="muted" color={'secondary' as any} align={align} {...props} />
}

export function Description({ align, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="muted"
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
      className="tracking-widest uppercase opacity-60"
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
