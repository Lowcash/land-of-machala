import Link from 'next/link'

import { CheckCircle, Circle, Star } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Card } from '@/components/ui/card'
import { GameList } from '@/components/ui/game-list'
import { Progress } from '@/components/ui/progress'

import type { MergedQuest, QuestStatus } from '../Shared/types'
import { getCategoryBadge, getCategoryColor, getCategoryName } from '../Shared/utils'

interface QuestListProps {
  quests: MergedQuest[]
  selectedQuest: string | null
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

export function QuestList({ quests, selectedQuest }: QuestListProps) {
  const filteredQuests = quests

  return (
    <div
      className={`${selectedQuest ? 'hidden md:flex' : 'flex'} w-full flex-col border-r border-[#8b6f47] bg-black/70 backdrop-blur-sm md:w-80 lg:w-96`}
    >
      <GameList<MergedQuest>
        data={filteredQuests}
        keyExtractor={(quest) => quest.id}
        className="flex-1"
        renderItem={(quest) => {
          const isSelected = selectedQuest === quest.id

          return (
            <Link
              href={isSelected ? '?' : `?questId=${quest.id}`}
              className={cn(
                'group relative block h-auto w-full p-0 text-left transition-all',
                isSelected ? 'z-10' : ''
              )}
            >
              <Card
                className={cn(
                  'flex w-full flex-col items-start p-3 transition-all',
                  isSelected
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
            </Link>
          )
        }}
      />
    </div>
  )
}
