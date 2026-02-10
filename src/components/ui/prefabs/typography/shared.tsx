import * as React from 'react'
import { cn } from '@/lib/utils'
import { Text } from '@/components/ui/core/typography'

/**
 * Semantic typography prefabs to ensure consistency across the application.
 * Use these instead of raw Text components with repetitive props.
 */

interface TypographyPrefabProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  as?: 'p' | 'span' | 'div'
}

export function Value({ className, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="fantasy-value"
      font="fantasy"
      color={'ivory' as any}
      className={cn('tracking-wider', className)}
      {...props}
    />
  )
}

export function MutedText({ className, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="muted"
      color={'secondary' as any}
      className={className}
      {...props}
    />
  )
}

export function Description({ className, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="muted"
      font="body"
      color={'secondary' as any}
      className={cn('text-xs italic sm:text-sm', className)}
      {...props}
    />
  )
}

export function Decoration({ className, ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="small"
      color={'secondary' as any}
      font="fantasy"
      className={cn('tracking-widest uppercase opacity-60', className)}
      {...props}
    />
  )
}
