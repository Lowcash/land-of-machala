'use client'

import { CheckCircle, Circle, Star } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GameList } from '@/components/ui/game-list'
import { Progress } from '@/components/ui/progress'

import type { MergedQuest, QuestCategory, QuestStatus } from '../Shared/types'

type QuestListProps = {
  quests: MergedQuest[]
  selectedQuest: string | null
  onSelectQuestAction: (id: string | null) => void
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
      return 'Hlavní'
    case 'SIDE':
      return 'Vedlejší'
    case 'DAILY':
      return 'Denní'
    case 'EVENT':
      return 'Event'
  }
}

function getStatusIcon(status: QuestStatus | null) {
  switch (status) {
    case 'ACTIVE':
      return <Circle className="h-4 w-4 text-[#ffd700]" />
    case 'COMPLETED':
      return <CheckCircle className="h-4 w-4 text-[#6fbf6f]" />
    case null:
      return <Star className="h-4 w-4 text-[#69ccf0]" />
    case 'FAILED':
      return <Circle className="h-4 w-4 text-[#ff6b6b]" />
  }
}

export function QuestList({ quests, selectedQuest, onSelectQuestAction }: QuestListProps) {
  const filteredQuests = quests

  return (
    <div
      className={`${selectedQuest ? 'hidden md:flex' : 'flex'} w-full flex-col border-r border-[#8b6f47] bg-black/70 backdrop-blur-sm md:w-80 lg:w-96`}
    >
      <GameList<MergedQuest>
        data={filteredQuests}
        keyExtractor={(quest) => quest.id}
        className="flex-1"
        renderItem={(quest) => (
          <Button
            variant="ghost"
            onClick={() => onSelectQuestAction(quest.id)}
            className={cn(
              'h-auto w-full p-0 text-left transition-all',
              selectedQuest === quest.id ? 'z-10' : ''
            )}
          >
            <Card
              className={cn(
                'flex w-full flex-col items-start p-3 transition-all',
                selectedQuest === quest.id
                  ? 'border-[#ffd700] bg-black/60 shadow-[0_0_10px_rgba(255,215,0,0.2)]'
                  : 'border-[#8b6f47] bg-black/40 hover:border-[#d4a574]'
              )}
            >
              <div className="mb-2 flex items-start gap-2">
                {getStatusIcon(quest.characterStatus)}
                <div className="min-w-0 flex-1">
                  <h3
                    className={cn('mb-1 truncate text-sm', getCategoryColor(quest.category))}
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {quest.title}
                  </h3>
                  <p className="line-clamp-2 text-xs text-[#8b7355]">{quest.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    'rounded px-2 py-0.5 text-[10px]',
                    getCategoryBadge(quest.category)
                  )}
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  {getCategoryName(quest.category)}
                </span>
                <span className="text-[10px] text-[#8b7355]">Lvl {quest.level}</span>
                <span className="ml-auto text-[10px] text-[#8b7355]">
                  {quest.objectives.filter((o) => o.completed).length}/{quest.objectives.length}
                </span>
              </div>

              <div className="mt-2 w-full">
                <Progress value={quest.progress} className="h-1 bg-black/60" />
              </div>
            </Card>
          </Button>
        )}
      />
    </div>
  )
}
