'use client'

import { MobileOverlay, SplitView } from '@/components/layout'
import { PageTemplate } from '@/components/layout/PageTemplate'
import { Scroll } from 'lucide-react'
import { useEffect, useState } from 'react'
import { QuestDetailContent } from './Detail/QuestDetailContent'
import { QuestList } from './List/QuestList'
import type { MergedQuest } from './Shared/types'

type QuestClientProps = {
  quests: MergedQuest[]
  characterId: string
}

export function QuestClient({ quests, characterId }: QuestClientProps) {
  // We need to parse dates back from strings if they were serialized
  const hydratedQuests = quests.map((quest) => ({
    ...quest,
    createdAt: new Date(quest.createdAt),
  }))

  const [selectedQuest, setSelectedQuest] = useState<string | null>(null)

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const questId = params.get('questId')
      if (questId && hydratedQuests.find((q) => q.id === questId)) {
        setSelectedQuest(questId)
      } else {
        setSelectedQuest(null)
      }
    }

    handlePopState()
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [hydratedQuests])

  const handleSelectQuest = (id: string | null) => {
    if (id) {
      setSelectedQuest(id)
      window.history.pushState({ questId: id }, '', `?questId=${id}`)
    } else {
      setSelectedQuest(null)
      const url = new URL(window.location.href)
      url.searchParams.delete('questId')
      window.history.pushState({}, '', url.toString())
    }
  }

  const handleBack = () => {
    window.history.back()
  }

  const selectedQuestData = hydratedQuests.find((q) => q.id === selectedQuest)

  // Empty state for desktop sidebar
  const emptyState = (
    <div className="flex h-full items-center justify-center p-4">
      <div className="text-center">
        <Scroll className="mx-auto mb-4 h-16 w-16 text-[#8b6f47]" />
        <h3 className="mb-2 text-lg text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>
          Vyber quest
        </h3>
        <p className="text-sm leading-relaxed text-[#8b7355]">
          Klikni na quest v seznamu pro zobrazení detailů a postupu.
        </p>
      </div>
    </div>
  )

  return (
    <PageTemplate
      title="Denik Úkolů"
      backLink={{ href: '/game', label: 'Zpět do hry' }}
      icon={<Scroll className="h-6 w-6" />}
    >
      <SplitView
        main={
          <QuestList
            quests={hydratedQuests}
            selectedQuest={selectedQuest}
            onSelectQuest={handleSelectQuest}
          />
        }
        aside={
          selectedQuestData ? (
            <QuestDetailContent quest={selectedQuestData} characterId={characterId} />
          ) : (
            emptyState
          )
        }
        asideWidth="lg"
      />

      {/* Mobile detail overlay */}
      {selectedQuestData && (
        <MobileOverlay isOpen={!!selectedQuest} title="Detail questu" onClose={handleBack}>
          <QuestDetailContent quest={selectedQuestData} characterId={characterId} />
        </MobileOverlay>
      )}
    </PageTemplate>
  )
}
