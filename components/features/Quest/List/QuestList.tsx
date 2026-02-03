import { cn } from '@/lib/utils'

import { GameList } from '@/components/ui/game-list'
import { VStack } from '@/components/ui/stack'

import type { MergedQuest } from '../Shared/types'
import { QuestListItem } from './QuestListItem'

interface QuestListProps {
  quests: MergedQuest[]
  selectedQuest: string | null
}

export function QuestList({ quests, selectedQuest }: QuestListProps) {
  const filteredQuests = quests

  return (
    <VStack
      fullHeight
      fullWidth
      border="game-r"
      bg="black-80"
      backdrop
      _internalClassName={cn(selectedQuest ? 'hidden md:flex' : 'flex')}
    >
      <GameList<MergedQuest>
        data={filteredQuests}
        keyExtractor={(quest) => quest.id}
        renderItem={(quest) => (
          <QuestListItem quest={quest} isSelected={selectedQuest === quest.id} />
        )}
      />
    </VStack>
  )
}
