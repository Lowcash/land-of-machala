'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { QuestList } from './List/QuestList'
import type { MergedQuest } from './Shared/types'

interface QuestListWrapperProps {
  quests: MergedQuest[]
  selectedQuestId: string | null
}

export function QuestListWrapper({ quests, selectedQuestId }: QuestListWrapperProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSelectQuest = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (id) {
      params.set('questId', id)
    } else {
      params.delete('questId')
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <QuestList
      quests={quests}
      selectedQuest={selectedQuestId}
      onSelectQuestAction={handleSelectQuest}
    />
  )
}
