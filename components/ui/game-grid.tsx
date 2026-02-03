import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { VStack } from './stack'

interface GameGridProps {
  children: ReactNode
  fullHeight?: boolean
  variant?: 'default' | 'map'
  columns?: {
    default?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  className?: string
}

export function GameGrid({
  children,
  fullHeight = false,
  variant = 'default',
  columns = { default: 2 },
  className,
}: GameGridProps) {
  return (
    <VStack
      flex="1"
      minH="none"
      overflow="hidden"
      bg={variant === 'map' ? 'black' : 'none'}
      fullHeight={fullHeight}
    >
      <VStack overflowY="scroll" fullHeight={fullHeight} maxH={fullHeight ? 'none' : 'md'}>
        <VStack p="md" fullWidth>
          <VStack
            display="grid"
            gridCols={
              String(columns.default || 1) as
                | '1'
                | '2'
                | '3'
                | '4'
                | '5'
                | '6'
                | '7'
                | '8'
                | '9'
                | '10'
                | '11'
                | '12'
            }
            gap="md"
            fullWidth
            _internalClassName={cn(
              columns.sm && `sm:grid-cols-${columns.sm}`,
              columns.md && `md:grid-cols-${columns.md}`,
              columns.lg && `lg:grid-cols-${columns.lg}`,
              className
            )}
          >
            {children}
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  )
}
