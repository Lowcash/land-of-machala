import { moveCharacter } from '@/lib/actions/movement-actions'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

interface UseGameMoveProps {
  characterId: string
  handleSetInfoText: (text: string | null) => void
}

export function useGameMove({ characterId, handleSetInfoText }: UseGameMoveProps) {
  const router = useRouter()
  const [, startTransition] = useTransition()

  const handleMove = async (direction: 'north' | 'south' | 'east' | 'west') => {
    startTransition(async () => {
      const result = await moveCharacter(characterId, direction)

      if (!result.success) {
        handleSetInfoText(`<span class="text-[#ff6b6b]">Chyba:</span> ${result.error}`)
        return
      }

      // Direction descriptions
      const directionTexts = {
        north:
          'Vydáváš se na <span class="text-[#ffd700]">sever</span> k <span class="text-[#d4a574]">horským průsmykům</span>. Vzduch je tu chladnější a slyšíš ozvěnu větru mezi skalami.',
        south:
          'Kráčíš na <span class="text-[#ffd700]">jih</span> přes <span class="text-[#6fbf6f]">zelené pláně</span>. Tráva se vlní ve větru a vzduch je plný vůně květů.',
        east: 'Vydáváš se na <span class="text-[#ffd700]">východ</span> k <span class="text-[#ffa500]">vyprahlé poušti</span>. Písek šustí pod tvýma nohama a slunce pálí nemilosrdně.',
        west: 'Vcházíš na <span class="text-[#ffd700]">západ</span> do <span class="text-[#8b7355]">temného lesa</span>. Stromy jsou husté a světlo sem proniká jen stěží.',
      }

      // Random combat encounter
      if (result.hasEncounter) {
        // Force refresh to trigger CombatClient check in GamePage
        router.refresh()
      } else {
        handleSetInfoText(
          `${directionTexts[direction]}<br/><span class="text-[#8b7355]">Pozice: X: ${result.newX}, Y: ${result.newY}</span>`
        )
      }
    })
  }

  return { handleMove }
}
