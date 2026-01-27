import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { ScrollArea } from '@/components/ui/scroll-area'

interface GameGridProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  columns?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

const COLUMN_MAP = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  8: 'grid-cols-8',
  10: 'grid-cols-10',
  12: 'grid-cols-12',
}

export function GameGrid({
  children,
  className,
  containerClassName,
  columns = { default: 1, sm: 2, lg: 3 },
}: GameGridProps) {
  const gridCols = cn(
    'grid gap-3 sm:gap-4',
    COLUMN_MAP[columns.default as keyof typeof COLUMN_MAP] || 'grid-cols-1',
    columns.sm && `sm:${COLUMN_MAP[columns.sm as keyof typeof COLUMN_MAP]}`,
    columns.md && `md:${COLUMN_MAP[columns.md as keyof typeof COLUMN_MAP]}`,
    columns.lg && `lg:${COLUMN_MAP[columns.lg as keyof typeof COLUMN_MAP]}`,
    columns.xl && `xl:${COLUMN_MAP[columns.xl as keyof typeof COLUMN_MAP]}`,
    className
  )

  return (
    <div className={cn('relative flex flex-1 flex-col overflow-hidden', containerClassName)}>
      <ScrollArea className="h-full">
        <div className="flex-1 p-4">
          <div className={gridCols}>{children}</div>
        </div>
      </ScrollArea>
    </div>
  )
}
