'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { moveCharacter } from '@/lib/actions/movement-actions'
import { MOVEMENT_DESCRIPTIONS } from '@/lib/game/constants/texts'

interface UseGameMoveProps {
  handleSetInfoText: (text: string | null) => void
}

export function useGameMove({ handleSetInfoText }: UseGameMoveProps) {
  const router = useRouter()
  const [, startTransition] = useTransition()

  const handleMove = async (direction: 'north' | 'south' | 'east' | 'west') => {
    startTransition(async () => {
      const [result, err] = await moveCharacter({ direction })

      if (err || !result?.success) {
        handleSetInfoText(
          `<span class="text-[#ff6b6b]">Chyba:</span> ${err?.message || 'Pohyb selhal'}`
        )
        return
      }

      // Direction descriptions
      const directionDesc = MOVEMENT_DESCRIPTIONS[direction]

      // Random combat encounter
      if (result.hasEncounter) {
        // Force refresh to trigger CombatClient check in GamePage
        router.refresh()
      } else {
        handleSetInfoText(
          `${directionDesc}<br/><span class="text-[#8b7355]">Pozice: X: ${result.newX}, Y: ${result.newY}</span>`
        )
      }
    })
  }

  return { handleMove }
}
