import { cn } from '@/lib/utils'

import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'

import type { MergedQuest } from '../Shared/types'
import { getCategoryBadge, getCategoryColor, getCategoryName } from '../Shared/utils'
import { QuestActions } from './QuestActions'
import { QuestInfoPanel } from './QuestInfoPanel'
import { QuestObjectivesList } from './QuestObjectivesList'
import { QuestRewardsList } from './QuestRewardsList'

interface QuestDetailContentProps {
  quest: MergedQuest
}

export function QuestDetailContent({ quest }: QuestDetailContentProps) {
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

          {/* Actions (Start/Abandon/Status) */}
          <div className="mt-4 border-t border-[#8b6f47]/30 pt-4">
            <QuestActions quest={quest} />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
