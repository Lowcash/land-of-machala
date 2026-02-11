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
  bold?: boolean
}

export function Value({ ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="fantasy-value"
      font="fantasy"
      color={'ivory' as any}
      className="tracking-wider"
      {...props}
    />
  )
}

export function MutedText({ ...props }: TypographyPrefabProps) {
  return <Text variant="muted" color={'secondary' as any} {...props} />
}

export function Description({ ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="muted"
      font="body"
      color={'secondary' as any}
      className="text-xs italic sm:text-sm"
      {...props}
    />
  )
}

export function Decoration({ ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="small"
      color={'secondary' as any}
      font="fantasy"
      className="tracking-widest uppercase opacity-60"
      {...props}
    />
  )
}

export function Legend({ bold, ...props }: TypographyPrefabProps) {
  return <Text variant="small" font="body" className={cn(bold && 'font-bold')} {...props} />
}
