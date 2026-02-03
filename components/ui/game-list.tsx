import { ScrollArea } from '@/components/ui/scroll-area'
import { VStack } from '@/components/ui/stack'
import { P } from '@/components/ui/typography'

interface GameListProps<T> {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  emptyMessage?: string
  keyExtractor?: (item: T) => string | number
}

export function GameList<T>({
  data,
  renderItem,
  emptyMessage = 'Žádné položky',
  keyExtractor,
}: GameListProps<T>) {
  if (!data?.length) {
    return (
      <VStack h="full" align="center" justify="center" p="md">
        <P color="muted" align="center" italic>
          {emptyMessage}
        </P>
      </VStack>
    )
  }

  return (
    <ScrollArea>
      <VStack gap="sm" p="xs">
        {data.map((item, index) => (
          <VStack fullWidth key={keyExtractor ? keyExtractor(item) : index}>
            {renderItem(item, index)}
          </VStack>
        ))}
      </VStack>
    </ScrollArea>
  )
}
