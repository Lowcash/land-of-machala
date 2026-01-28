'use client'

import { useState, useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { CheckCircle, X } from 'lucide-react'
import { toast } from 'sonner'

import { abandonQuestAction } from '@/lib/actions/quest'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'

import type { MergedQuest, QuestCategory } from '../Shared/types'
import { QuestAbandonDialog } from './QuestAbandonDialog'
import { QuestInfoPanel } from './QuestInfoPanel'
import { QuestObjectivesList } from './QuestObjectivesList'
import { QuestRewardsList } from './QuestRewardsList'

type QuestDetailContentProps = {
  quest: MergedQuest
}

function getCategoryColor(category: QuestCategory) {
  switch (category) {
    case 'MAIN':
      return 'text-[#ffd700]'
    case 'SIDE':
      return 'text-[#69ccf0]'
    case 'DAILY':
      return 'text-[#6fbf6f]'
    case 'EVENT':
      return 'text-[#b66bd4]'
  }
}

function getCategoryBadge(category: QuestCategory) {
  switch (category) {
    case 'MAIN':
      return 'bg-[#ffd700]/10 text-[#ffd700] border border-[#ffd700]/50'
    case 'SIDE':
      return 'bg-[#69ccf0]/10 text-[#69ccf0] border border-[#69ccf0]/50'
    case 'DAILY':
      return 'bg-[#6fbf6f]/10 text-[#6fbf6f] border border-[#6fbf6f]/50'
    case 'EVENT':
      return 'bg-[#b66bd4]/10 text-[#b66bd4] border border-[#b66bd4]/50'
  }
}

function getCategoryName(category: QuestCategory) {
  switch (category) {
    case 'MAIN':
      return 'Hlavní quest'
    case 'SIDE':
      return 'Vedlejší quest'
    case 'DAILY':
      return 'Denní úkol'
    case 'EVENT':
      return 'Speciální událost'
  }
}

export function QuestDetailContent({ quest }: QuestDetailContentProps) {
  const router = useRouter()
  const [showAbandonModal, setShowAbandonModal] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleAbandonQuest = async () => {
    if (isPending) return

    startTransition(async () => {
      try {
        const [result, error] = await abandonQuestAction({
          questId: quest.id,
        })

        if (error) {
          toast.error('Chyba při opuštění questu', {
            description: error.message || 'Nepodařilo se opustit quest',
          })
        } else if (result?.success) {
          toast.success('Quest opuštěn', {
            description: `Opustil jsi quest "${quest.title}"`,
          })
          setShowAbandonModal(false)
          router.refresh()
        }
      } catch {
        toast.error('Chyba', {
          description: 'Něco se pokazilo při opouštění questu',
        })
      }
    })
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <ScrollArea className="h-full">
        <div className="mx-auto max-w-2xl space-y-4 p-4">
          {/* Header */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span
                className={cn('rounded px-2 py-1 text-xs', getCategoryBadge(quest.category))}
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                {getCategoryName(quest.category)}
              </span>
              <span className="text-xs text-[#8b7355]">Level {quest.level || 1}</span>
            </div>
            <h2
              className={cn('mb-2 text-2xl', getCategoryColor(quest.category))}
              style={{ fontFamily: 'var(--font-medieval)' }}
            >
              {quest.title}
            </h2>
            <p className="text-sm leading-relaxed text-[#d4a574]">{quest.description}</p>
          </div>

          <QuestInfoPanel giver={quest.giver} location={quest.location} story={quest.story} />

          <QuestObjectivesList objectives={quest.objectives} />

          <QuestRewardsList
            rewardXp={quest.rewardXp}
            rewardGold={quest.rewardGold}
            rewards={quest.rewards}
          />

          {/* Progress bar for active quests */}
          {quest.characterStatus === 'ACTIVE' && (
            <div className="mb-4">
              <div className="mb-1 flex items-center justify-between text-xs text-[#8b7355]">
                <span>Postup questu</span>
                <span>{quest.progress}%</span>
              </div>
              <div className="h-2">
                <Progress value={quest.progress} className="h-2 bg-black/60" />
              </div>
            </div>
          )}

          {/* Action button - only show for ACTIVE quests */}
          {quest.characterStatus === 'ACTIVE' && (
            <Button
              variant="ghost"
              onClick={() => setShowAbandonModal(true)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded border border-[#ff6b6b] bg-[#ff6b6b]/10 py-3 text-[#ff6b6b] transition-all hover:bg-[#ff6b6b]/20"
            >
              <X className="h-4 w-4" />
              <span className="text-sm" style={{ fontFamily: 'var(--font-fantasy)' }}>
                Vzdát quest
              </span>
            </Button>
          )}

          {/* Completed badge */}
          {quest.characterStatus === 'COMPLETED' && (
            <div className="flex items-center justify-center gap-2 rounded border border-[#6fbf6f]/50 bg-[#6fbf6f]/10 py-3 text-[#6fbf6f]">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm" style={{ fontFamily: 'var(--font-fantasy)' }}>
                Quest dokončen!
              </span>
            </div>
          )}
        </div>
      </ScrollArea>

      <QuestAbandonDialog
        questTitle={quest.title}
        isOpen={showAbandonModal}
        onClose={() => setShowAbandonModal(false)}
        onConfirm={handleAbandonQuest}
        isLoading={isPending}
      />
    </div>
  )
}
