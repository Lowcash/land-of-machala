import * as React from 'react'
import { cn } from '@/lib/utils'
import { Text } from '@/components/ui/core/typography'

/**
 * Semantic typography prefabs to ensure consistency across the application.
 * Use these instead of raw Text components with repetitive props.
 */

interface TypographyPrefabProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'className'> {
  children: React.ReactNode
  as?: 'p' | 'span' | 'div'
  textAlign?: 'left' | 'center' | 'right'
}

export function Value({ textAlign = 'left', ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="fantasy-value"
      font="fantasy"
      color={'ivory' as any}
      className={cn('tracking-wider', {
        'text-left': textAlign === 'left',
        'text-center': textAlign === 'center',
        'text-right': textAlign === 'right',
      })}
      {...props}
    />
  )
}

export function MutedText({ textAlign = 'left', ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="muted"
      color={'secondary' as any}
      className={cn({
        'text-left': textAlign === 'left',
        'text-center': textAlign === 'center',
        'text-right': textAlign === 'right',
      })}
      {...props}
    />
  )
}

export function Description({ textAlign = 'left', ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="muted"
      font="body"
      color={'secondary' as any}
      className={cn('text-xs italic sm:text-sm', {
        'text-left': textAlign === 'left',
        'text-center': textAlign === 'center',
        'text-right': textAlign === 'right',
      })}
      {...props}
    />
  )
}

export function Decoration({ textAlign = 'left', ...props }: TypographyPrefabProps) {
  return (
    <Text
      variant="small"
      color={'secondary' as any}
      font="fantasy"
      className={cn('tracking-widest uppercase opacity-60', {
        'text-left': textAlign === 'left',
        'text-center': textAlign === 'center',
        'text-right': textAlign === 'right',
      })}
      {...props}
    />
  )
}
