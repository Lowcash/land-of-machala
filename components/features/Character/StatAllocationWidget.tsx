'use client'

import { updateCharacterStatsAction } from '@/lib/actions/character'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface StatAllocationWidgetProps {
  characterId: string
  talentPoints: number
}

export function StatAllocationWidget({ characterId, talentPoints }: StatAllocationWidgetProps) {
  const [isAllocating, setIsAllocating] = useState(false)

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
        window.location.reload() // Refresh to show new stats
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
        <button
          onClick={() => handleAllocateStat('strength')}
          disabled={isAllocating}
          className="rounded border border-[#ff6b6b]/50 bg-[#ff6b6b]/20 p-1 transition-colors hover:bg-[#ff6b6b]/40 disabled:opacity-50"
          title="Přidat bod do Síly"
        >
          <Plus className="mx-auto h-3 w-3 text-[#ff6b6b]" />
        </button>
        <button
          onClick={() => handleAllocateStat('intelligence')}
          disabled={isAllocating}
          className="rounded border border-[#b66bd4]/50 bg-[#b66bd4]/20 p-1 transition-colors hover:bg-[#b66bd4]/40 disabled:opacity-50"
          title="Přidat bod do Inteligence"
        >
          <Plus className="mx-auto h-3 w-3 text-[#b66bd4]" />
        </button>
        <button
          onClick={() => handleAllocateStat('agility')}
          disabled={isAllocating}
          className="rounded border border-[#ffd700]/50 bg-[#ffd700]/20 p-1 transition-colors hover:bg-[#ffd700]/40 disabled:opacity-50"
          title="Přidat bod do Obratnosti"
        >
          <Plus className="mx-auto h-3 w-3 text-[#ffd700]" />
        </button>
        <button
          onClick={() => handleAllocateStat('stamina')}
          disabled={isAllocating}
          className="rounded border border-[#69ccf0]/50 bg-[#69ccf0]/20 p-1 transition-colors hover:bg-[#69ccf0]/40 disabled:opacity-50"
          title="Přidat bod do Výdrže"
        >
          <Plus className="mx-auto h-3 w-3 text-[#69ccf0]" />
        </button>
      </div>
    </div>
  )
}
