import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import { CheckCircle, Circle, Coins, MapPin, User, Zap } from 'lucide-react'
import { useRef } from 'react'
import { QuestStartButton } from './QuestStartButton'
import type { MergedQuest, QuestCategory } from './types'

type QuestDetailContentProps = {
  quest: MergedQuest
  characterId: string
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

export function QuestDetailContent({ quest, characterId }: QuestDetailContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <ScrollIndicator targetRef={scrollRef} position="both" />
      <div ref={scrollRef} className="scrollbar-custom flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-2xl">
          {/* Quest header */}
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`rounded px-2 py-1 text-xs ${getCategoryBadge(quest.category)}`}
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                {getCategoryName(quest.category)}
              </span>
              <span className="text-xs text-[#8b7355]">Level {quest.level}</span>
            </div>
            <h2
              className={`mb-2 text-2xl ${getCategoryColor(quest.category)}`}
              style={{ fontFamily: 'var(--font-medieval)' }}
            >
              {quest.title}
            </h2>
            <p className="text-sm leading-relaxed text-[#d4a574]">{quest.description}</p>
          </div>

          {/* Quest giver & location */}
          <div className="mb-4 rounded border border-[#8b6f47] bg-black/60 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#d4a574]" />
                <div>
                  <p className="text-[10px] text-[#8b7355]">Quest Giver</p>
                  <p className="text-sm text-[#f5e6d3]">{quest.giver || 'Neznámý'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#d4a574]" />
                <div>
                  <p className="text-[10px] text-[#8b7355]">Lokace</p>
                  <p className="text-sm text-[#f5e6d3]">{quest.location || 'Neznámá'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Story */}
          {quest.story && (
            <div className="mb-4 rounded border border-[#8b6f47] bg-black/60 p-4">
              <h3
                className="mb-2 text-sm text-[#d4a574]"
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                Příběh:
              </h3>
              <p className="text-sm leading-relaxed text-[#f5e6d3] italic">{quest.story}</p>
            </div>
          )}

          {/* Objectives */}
          <div className="mb-4 rounded border border-[#8b6f47] bg-black/60 p-4">
            <h3
              className="mb-3 text-sm text-[#d4a574]"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              Úkoly:
            </h3>
            <div className="space-y-2">
              {quest.objectives.map((objective) => (
                <div key={objective.id} className="flex items-start gap-2">
                  {objective.completed ? (
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#6fbf6f]" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#8b7355]" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`text-sm ${objective.completed ? 'text-[#6fbf6f] line-through' : 'text-[#f5e6d3]'}`}
                    >
                      {objective.description}
                    </p>
                    {objective.target > 1 && (
                      <p className="mt-0.5 text-xs text-[#8b7355]">
                        Pokrok: {objective.current}/{objective.target}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards */}
          <div className="mb-4 rounded border border-[#8b6f47] bg-black/60 p-4">
            <h3
              className="mb-3 text-sm text-[#d4a574]"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              Odměny:
            </h3>
            <div className="flex flex-wrap gap-3">
              {quest.rewardXp > 0 && (
                <div className="flex items-center gap-2 rounded border border-[#8b6f47] bg-black/40 px-3 py-2">
                  <Zap className="h-4 w-4 text-[#ffd700]" />
                  <span className="text-sm text-[#f5e6d3]">{quest.rewardXp} XP</span>
                </div>
              )}
              {quest.rewardGold > 0 && (
                <div className="flex items-center gap-2 rounded border border-[#8b6f47] bg-black/40 px-3 py-2">
                  <Coins className="h-4 w-4 text-[#ffd700]" />
                  <span className="text-sm text-[#f5e6d3]">{quest.rewardGold} zlatých</span>
                </div>
              )}
              {quest.rewards.map((reward) =>
                reward.item ? (
                  <div
                    key={reward.id}
                    className="flex items-center gap-2 rounded border border-[#8b6f47] bg-black/40 px-3 py-2"
                  >
                    <span className="text-sm text-[#69ccf0]">
                      {reward.quantity}x {reward.item.name}
                    </span>
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Progress bar for active quests */}
          {quest.characterStatus === 'ACTIVE' && (
            <div className="mb-4">
              <div className="mb-1 flex items-center justify-between text-xs text-[#8b7355]">
                <span>Postup questu</span>
                <span>{quest.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-black/60">
                <div
                  className={`h-full bg-gradient-to-r ${
                    quest.category === 'MAIN'
                      ? 'from-[#ffd700] to-[#ffed4e]'
                      : quest.category === 'SIDE'
                        ? 'from-[#69ccf0] to-[#89dcff]'
                        : quest.category === 'DAILY'
                          ? 'from-[#6fbf6f] to-[#8fdf8f]'
                          : 'from-[#b66bd4] to-[#d68bf4]'
                  } transition-all`}
                  style={{ width: `${quest.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action button */}
          <QuestStartButton quest={quest} characterId={characterId} />
        </div>
      </div>
    </div>
  )
}
