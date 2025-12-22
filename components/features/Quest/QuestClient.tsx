'use client'

import { ArrowLeft, Scroll } from 'lucide-react'
import { useState } from 'react'
import { QuestDetailContent } from './QuestDetailContent'
import { QuestList } from './QuestList'
import type { MergedQuest } from './types'

type QuestClientProps = {
  quests: MergedQuest[]
  characterId: string
}

export function QuestClient({ quests, characterId }: QuestClientProps) {
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null)

  const selectedQuestData = quests.find((q) => q.id === selectedQuest)

  return (
    <>
      <div className="flex w-full flex-1 overflow-hidden">
        <QuestList
          quests={quests}
          selectedQuest={selectedQuest}
          setSelectedQuest={setSelectedQuest}
        />

        {/* Desktop detail panel */}
        <div className="hidden flex-1 border-l border-[#8b6f47] bg-black/70 backdrop-blur-sm md:flex">
          {selectedQuest && selectedQuestData ? (
            <QuestDetailContent quest={selectedQuestData} characterId={characterId} />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <Scroll className="mx-auto mb-4 h-16 w-16 text-[#8b6f47]" />
                <h3
                  className="mb-2 text-lg text-[#d4a574]"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  Vyber quest
                </h3>
                <p className="text-sm leading-relaxed text-[#8b7355]">
                  Klikni na quest v seznamu pro zobrazení detailů a postupu.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile fullscreen overlay */}
      {selectedQuest && selectedQuestData && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md md:hidden">
          <div className="flex flex-shrink-0 items-center justify-between border-b border-[#8b6f47] bg-black/80 px-3 py-2 backdrop-blur-md">
            <h2 className="text-lg text-[#ffd700]" style={{ fontFamily: 'var(--font-medieval)' }}>
              Detail questu
            </h2>
            <button
              onClick={() => setSelectedQuest(null)}
              className="flex items-center gap-2 rounded border border-[#8b6f47] bg-black/60 px-3 py-1.5 transition-colors hover:border-[#ffd700]"
            >
              <ArrowLeft className="h-4 w-4 text-[#d4a574]" />
              <span className="text-sm text-[#d4a574]">Zpět</span>
            </button>
          </div>

          <div className="scrollbar-custom flex-1 overflow-y-auto p-4">
            <QuestDetailContent quest={selectedQuestData} characterId={characterId} />
          </div>
        </div>
      )}
    </>
  )
}
