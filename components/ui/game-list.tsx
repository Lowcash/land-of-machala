import { cn } from '@/lib/utils'

import { ScrollArea } from '@/components/ui/scroll-area'

interface GameListProps<T> {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
  emptyMessage?: string
  keyExtractor?: (item: T) => string | number
}

export function GameList<T>({
  data,
  renderItem,
  className,
  emptyMessage = 'Žádné položky',
  keyExtractor,
}: GameListProps<T>) {
  if (!data?.length) {
    return (
      <div
        className={cn(
          'text-game-gold-muted flex h-full items-center justify-center p-4 text-center italic',
          className
        )}
      >
        {emptyMessage}
      </div>
    )
  }

  return (
    <ScrollArea className={cn('h-full', className)}>
      <div className="space-y-2 p-1">
        {data.map((item, index) => (
          <div key={keyExtractor ? keyExtractor(item) : index}>{renderItem(item, index)}</div>
        ))}
      </div>
    </ScrollArea>
  )
}
