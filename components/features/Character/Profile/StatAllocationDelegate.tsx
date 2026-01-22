'use client'

import { GameButton } from '@/components/ui/game/GameButton'
import { updateCharacterStatsAction } from '@/lib/actions/character'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface StatAllocationDelegateProps {
  characterId: string
  talentPoints: number
}

export function StatAllocationDelegate({ characterId, talentPoints }: StatAllocationDelegateProps) {
  const [isAllocating, setIsAllocating] = useState(false)
  const router = useRouter()

  const handleAllocateStat = async (stat: 'strength' | 'intelligence' | 'agility' | 'stamina') => {
    if (talentPoints <= 0 || isAllocating) return

    setIsAllocating(true)
    try {
      const result = await updateCharacterStatsAction({
        characterId,
        stats: {
          [stat]: 1, // Add 1 to the stat (will be calculated in entity layer)
        },
      })

      if (result[0]) {
        toast.success(`+1 ${stat}`)
        router.refresh() // Refresh to show new stats
      }
    } catch {
      toast.error('Nepodařilo se přidat atribut')
    } finally {
      setIsAllocating(false)
    }
  }

  return (
    <div className="mt-2 border-t border-[#8b6f47]/30 pt-2">
      <div className="mb-1 text-center text-[10px] text-[#ffd700]">Volné body: {talentPoints}</div>
      <div className="grid grid-cols-4 gap-1">
        <GameButton
          onClick={() => handleAllocateStat('strength')}
          disabled={isAllocating}
          size="icon"
          variant="ghost"
          className="h-6 w-full border border-[#ff6b6b]/50 bg-[#ff6b6b]/20 p-0 text-[#ff6b6b] hover:bg-[#ff6b6b]/40 hover:text-[#ff6b6b]"
          title="Přidat bod do Síly"
        >
          <Plus className="h-3 w-3" />
        </GameButton>
        <GameButton
          onClick={() => handleAllocateStat('intelligence')}
          disabled={isAllocating}
          size="icon"
          variant="ghost"
          className="h-6 w-full border border-[#b66bd4]/50 bg-[#b66bd4]/20 p-0 text-[#b66bd4] hover:bg-[#b66bd4]/40 hover:text-[#b66bd4]"
          title="Přidat bod do Inteligence"
        >
          <Plus className="h-3 w-3" />
        </GameButton>
        <GameButton
          onClick={() => handleAllocateStat('agility')}
          disabled={isAllocating}
          size="icon"
          variant="ghost"
          className="h-6 w-full border border-[#ffd700]/50 bg-[#ffd700]/20 p-0 text-[#ffd700] hover:bg-[#ffd700]/40 hover:text-[#ffd700]"
          title="Přidat bod do Obratnosti"
        >
          <Plus className="h-3 w-3" />
        </GameButton>
        <GameButton
          onClick={() => handleAllocateStat('stamina')}
          disabled={isAllocating}
          size="icon"
          variant="ghost"
          className="h-6 w-full border border-[#69ccf0]/50 bg-[#69ccf0]/20 p-0 text-[#69ccf0] hover:bg-[#69ccf0]/40 hover:text-[#69ccf0]"
          title="Přidat bod do Výdrže"
        >
          <Plus className="h-3 w-3" />
        </GameButton>
      </div>
    </div>
  )
}
