'use client'

import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle, Circle, Star } from 'lucide-react'
import type { MergedQuest, QuestCategory, QuestStatus } from '../Shared/types'

type QuestListProps = {
  quests: MergedQuest[]
  selectedQuest: string | null
  onSelectQuest: (id: string | null) => void
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

export function QuestList({ quests, selectedQuest, onSelectQuest }: QuestListProps) {
  const filteredQuests = quests

  return (
    <div
      className={`${selectedQuest ? 'hidden md:flex' : 'flex'} w-full flex-col border-r border-[#8b6f47] bg-black/70 backdrop-blur-sm md:w-80 lg:w-96`}
    >
      {/* Quest list */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex-1 space-y-2 p-3">
            {filteredQuests.map((quest) => (
              <button
                key={quest.id}
                onClick={() => onSelectQuest(quest.id)}
                className={`w-full rounded border p-3 text-left transition-all ${
                  selectedQuest === quest.id
                    ? 'border-[#ffd700] bg-black/60'
                    : 'border-[#8b6f47] bg-black/40 hover:border-[#d4a574]'
                }`}
              >
                <div className="mb-2 flex items-start gap-2">
                  {getStatusIcon(quest.characterStatus)}
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`mb-1 truncate text-sm ${getCategoryColor(quest.category)}`}
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      {quest.title}
                    </h3>
                    <p className="line-clamp-2 text-xs text-[#8b7355]">{quest.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] ${getCategoryBadge(quest.category)}`}
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {getCategoryName(quest.category)}
                  </span>
                  <span className="text-[10px] text-[#8b7355]">Lvl {quest.level}</span>
                  <span className="ml-auto text-[10px] text-[#8b7355]">
                    {quest.objectives.filter((o) => o.completed).length}/{quest.objectives.length}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-2">
                  <Progress value={quest.progress} className="h-1 bg-black/60" />
                  {/* Note: Colors are currently handled by Progress indicator if we passed classNames, 
                      but standard Progress component uses `bg-primary` for indicator.
                      If we want dynamic colors (Gold/Blue/Green/Purple), we might need to inline style the indicator
                      or extend Progress to accept color variants. 
                      For now, let's use a simple Progress usage or wrapped one.
                      
                      Actually, shadcn Progress renders two divs. The inner one has `bg-primary`.
                      To customize color per quest category, we can wrap or modify.
                      
                      Let's stick to standard Progress for now to accomplish standardization goal.
                      If color is critical, we can add `indicatorClassName` or similar to our Progress component 
                      or just style it via CSS variables or utility overrides if supported.
                      
                      The default shadcn Progress doesn't expose indicator className easily unless modified.
                      Our `ui/progress.tsx` (viewed in Step 254) uses `bg-primary`.
                      
                      We *could* just rely on the primary color for all quests for consistency, 
                      or we can modify `ui/progress.tsx` to allow custom colors.
                      
                      Given the "Standardization" goal, using a single color is arguably BETTER UX than rainbow colors.
                      Let's try standardizing first.
                  */}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
