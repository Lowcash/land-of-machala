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
import { HStack, VStack } from '@/components/ui/stack'
import { StatRow } from '@/components/ui/stat-row'
import { Caption, GoldTitle } from '@/components/ui/typography'

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
      <StatRow
        label={config.label}
        value={currentValue}
        icon={config.icon}
        iconColor={config.color}
        extra={
          talentPoints > 0 && (
            <Button
              disabled={!canAllocate || isPending}
              onClick={() => handleAllocate(stat)}
              size="icon-xs"
              variant="ghost_game"
              icon={Plus}
            />
          )
        }
      />
    )
  }

  return (
    <VStack gap="sm" fullWidth>
      <HStack gap="sm" align="center">
        <BicepsFlexed className="text-game-gold h-4 w-4" />
        <GoldTitle>Atributy</GoldTitle>
      </HStack>

      <VStack gap="sm" fullWidth>
        {Object.values(Stats).map((stat) => (
          <AttributeRow key={stat} stat={stat} />
        ))}
      </VStack>

      {optimisticState.talentPoints > 0 && (
        <VStack align="center" fullWidth>
          <Caption color="gold" font="fantasy">
            Volné body: {optimisticState.talentPoints}
          </Caption>
        </VStack>
      )}
    </VStack>
  )
}
