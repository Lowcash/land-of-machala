import { ScrollIndicator } from '@/components/ui/scroll-indicator'
import { abandonQuestAction } from '@/lib/actions/quest'
import { CheckCircle, Circle, Coins, MapPin, User, X, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import type { MergedQuest, QuestCategory } from '../Shared/types'

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
  const router = useRouter()
  const [showAbandonModal, setShowAbandonModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAbandonQuest = async () => {
    if (isLoading) return
    setIsLoading(true)

    try {
      const [result, error] = await abandonQuestAction({
        characterId,
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <ScrollIndicator targetRef={scrollRef} position="both" />
      <div ref={scrollRef} className="scrollbar-custom flex-1 overflow-y-auto">
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
              <span className="text-xs text-[#8b7355]">Level {quest.level || 1}</span>
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
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#6fbf6f]" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-[#8b7355]" />
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
              {Array.isArray(quest.rewards) &&
                quest.rewards.map((reward) =>
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
                  className={`h-full bg-linear-to-r ${
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

          {/* Action button - only show for ACTIVE quests */}
          {quest.characterStatus === 'ACTIVE' && (
            <button
              onClick={() => setShowAbandonModal(true)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded border border-[#ff6b6b] bg-[#ff6b6b]/10 py-3 text-[#ff6b6b] transition-all hover:bg-[#ff6b6b]/20"
            >
              <X className="h-4 w-4" />
              <span className="text-sm" style={{ fontFamily: 'var(--font-fantasy)' }}>
                Vzdát quest
              </span>
            </button>
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
      </div>

      {/* Abandon Confirmation Modal */}
      {showAbandonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-lg border-2 border-[#d4a574] bg-linear-to-br from-black/95 to-black/80 p-6 shadow-2xl">
            <h3
              className="mb-4 text-xl text-[#ffd700]"
              style={{ fontFamily: 'var(--font-medieval)' }}
            >
              Opravdu chceš vzdát quest?
            </h3>
            <p className="mb-6 text-sm text-[#d4a574]">
              Quest &quot;{quest.title}&quot; bude odstraněn z tvé deníku a veškerý postup bude
              ztracen.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAbandonModal(false)}
                disabled={isLoading}
                className="flex-1 rounded border border-[#8b6f47] bg-black/60 py-3 text-sm text-[#d4a574] transition-colors hover:border-[#d4a574] hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                Zrušit
              </button>
              <button
                onClick={handleAbandonQuest}
                disabled={isLoading}
                className="flex-1 rounded border-2 border-[#ff6b6b] bg-[#ff6b6b]/20 py-3 text-sm text-[#ff6b6b] transition-colors hover:bg-[#ff6b6b]/30 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                {isLoading ? 'Opouštím...' : 'Ano, vzdát quest'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
