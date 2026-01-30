'use client'

import { useOptimistic, useTransition } from 'react'

// Assuming icons, need to check availability
import { useRouter } from 'next/navigation'

import { BicepsFlexed, Plus } from 'lucide-react'
import { toast } from 'sonner'

import { updateCharacterStatsAction } from '@/lib/actions/character'
import { Stats } from '@/lib/game/constants/mechanics'
import { STAT_CONFIG } from '@/lib/game/constants/stats'
import { GAME_CONSTANTS } from '@/lib/game/constants/values'

import { Button } from '@/components/ui/button'

interface AttributesPanelProps {
  stats: {
    strength: number
    intelligence: number
    agility: number
    stamina: number
  }
  talentPoints: number
}

export function AttributesPanel({ stats, talentPoints }: AttributesPanelProps) {
  // 1. Hooks
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [optimisticState, setOptimisticState] = useOptimistic(
    { stats, talentPoints },
    (state, updatedStat: Stats) => ({
      stats: {
        ...state.stats,
        [updatedStat]: state.stats[updatedStat] + GAME_CONSTANTS.STAT_ALLOCATION_AMOUNT,
      },
      talentPoints: state.talentPoints - 1,
    })
  )

  // 2. Navigation State / Derived Values - None currently

  // 3. Handlers
  const handleAllocate = async (stat: Stats) => {
    if (optimisticState.talentPoints <= 0) return

    startTransition(async () => {
      setOptimisticState(stat) // Apply optimistic update immediately

      try {
        const result = await updateCharacterStatsAction({
          stats: {
            [stat]: GAME_CONSTANTS.STAT_ALLOCATION_AMOUNT,
          },
        })

        if (result[0]) {
          router.refresh()
        } else {
          toast.error('Chyba při ukládání.')
        }
      } catch {
        toast.error('Nepodařilo se přidat atribut')
      }
    })
  }

  // 4. Sub-components (Render helpers)
  const AttributeRow = ({ stat }: { stat: Stats }) => {
    const config = STAT_CONFIG[stat]
    const currentValue = optimisticState.stats[stat]
    const canAllocate = optimisticState.talentPoints > 0

    return (
      <div className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 px-2 py-1.5">
        <div className="flex items-center gap-2">
          <config.icon className={`h-4 w-4 ${config.color}`} />
          <span className="text-xs text-[#8b7355]">{config.label}</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-bold ${config.color}`}
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            {currentValue}
          </span>

          {talentPoints > 0 && (
            <Button
              disabled={!canAllocate || isPending}
              onClick={() => handleAllocate(stat)}
              size="icon"
              variant="ghost"
              className={`h-5 w-5 ${config.border} ${config.bg} p-0 ${config.color} hover:bg-opacity-40`}
            >
              <Plus className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h3
        className="mb-2 flex items-center gap-2 text-sm text-[#ffd700]"
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        <BicepsFlexed className="h-4 w-4" />
        Atributy
      </h3>

      <div className="grid grid-cols-1 gap-2">
        {Object.values(Stats).map((stat) => (
          <AttributeRow key={stat} stat={stat} />
        ))}
      </div>

      {optimisticState.talentPoints > 0 && (
        <div className="mt-2 text-center text-[10px] text-[#ffd700]">
          Volné body: {optimisticState.talentPoints}
        </div>
      )}
    </div>
  )
}
