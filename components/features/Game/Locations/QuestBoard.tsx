'use client'

import { ChevronRight, ScrollText } from 'lucide-react'

import { useQuestBoard } from '@/lib/hooks/game'

import type { MergedQuest } from '@/components/features/Quest/Shared/types'
import { ActionGrid } from '@/components/ui/action'
import { LabelledDivider } from '@/components/ui/display'
import { VStack } from '@/components/ui/stack'
import { MutedText } from '@/components/ui/typography'

import { DialogPanel } from '../Shared/components/DialogPanel'
import { LocationAction } from '../Shared/components/LocationAction'

interface QuestBoardProps {
  quests: MergedQuest[]
  onBack: () => void
}

export function QuestBoard({ quests, onBack }: QuestBoardProps) {
  // 1. Hooks
  const { selectedQuest, isPending, handleAcceptQuest, handleSelectQuest } = useQuestBoard({
    onBack,
  })

  // 2. Navigation State
  const availableQuests = quests.filter(
    (q) => q.characterStatus === null || q.characterStatus === 'AVAILABLE'
  )

  // 3. Handlers
  const onAccept = (id: string) => handleAcceptQuest(id)
  const onSelect = (quest: MergedQuest | null) => handleSelectQuest(quest)

  // 4. Sub-components (Render helpers)
  if (selectedQuest) {
    return (
      <VStack gap="md">
        <LocationAction
          variant="ghost"
          title="Zpět na vývěsku"
          icon={ChevronRight}
          onClick={() => onSelect(null)}
        />

        <DialogPanel
          npcName="Vývěska"
          dialogText={`${selectedQuest.title}\n\n${selectedQuest.description}`}
          options={[
            {
              id: 'accept',
              text: 'Přijmout úkol',
              action: () => onAccept(selectedQuest.id),
              variant: 'primary',
              disabled: isPending,
            },
            {
              id: 'cancel',
              text: 'Možná později',
              action: () => onSelect(null),
              variant: 'secondary',
            },
          ]}
        />
      </VStack>
    )
  }

  return (
    <VStack gap="md">
      <LabelledDivider label="Dostupné zakázky" />

      <ActionGrid columns={{ default: 1 }}>
        {availableQuests.length > 0 ? (
          availableQuests.map((quest) => (
            <LocationAction
              key={quest.id}
              title={quest.title}
              icon={ScrollText}
              variant="compact"
              onClick={() => onSelect(quest)}
            />
          ))
        ) : (
          <VStack py="lg" align="center" fullWidth gap="sm">
            <MutedText italic>Momentálně nejsou k dispozici žádné nové úkoly.</MutedText>
          </VStack>
        )}
      </ActionGrid>
    </VStack>
  )
}
