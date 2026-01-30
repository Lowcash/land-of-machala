'use client'

import { ChevronRight, ScrollText } from 'lucide-react'

import { useQuestBoard } from '@/lib/hooks/game'

import type { MergedQuest } from '@/components/features/Quest/Shared/types'

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
      <div className="space-y-4">
        <LocationAction
          variant="compact"
          title="Zpět na vývěsku"
          icon={ChevronRight}
          className="h-auto border-none bg-transparent p-0 text-[#8b7355] hover:bg-transparent hover:text-[#d4a574]"
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
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h4 className="text-xs font-bold tracking-widest text-[#8b7355] uppercase">
          Dostupné zakázky
        </h4>
        <div className="mx-4 h-px flex-1 bg-[#8b6f47]/20" />
      </div>

      <div className="grid grid-cols-1 gap-2">
        {availableQuests.length > 0 ? (
          availableQuests.map((quest) => (
            <LocationAction
              key={quest.id}
              title={quest.title}
              icon={ScrollText}
              variant="compact"
              onClick={() => onSelect(quest)}
              className="border-[#8b6f47]/30 bg-black/40 hover:border-[#ffd700]/50"
            />
          ))
        ) : (
          <div className="py-8 text-center text-sm text-[#8b7355] italic">
            Momentálně nejsou k dispozici žádné nové úkoly.
          </div>
        )}
      </div>
    </div>
  )
}
