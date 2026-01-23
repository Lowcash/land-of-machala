'use client'

import { GameActionsPanel } from '@/components/features/Game/Layout/GameActionsPanel'
import { Button } from '@/components/ui/button'
import { Beer, Building, Cross, Hammer, ScrollText, ShoppingBag, Swords } from 'lucide-react'
import { useState } from 'react'
import { BankActions } from './BankActions'
import { TavernActions } from './TavernActions'

export function TownActions({
  showDirections,
  onToggleDirections,
  characterId,
}: {
  showDirections: boolean
  onToggleDirections: () => void
  characterId: string
}) {
  const [currentBuilding, setCurrentBuilding] = useState<string | null>(null)

  if (currentBuilding === 'bank') {
    return <BankActions characterId={characterId} onBack={() => setCurrentBuilding(null)} />
  }

  if (currentBuilding === 'tavern') {
    // Note: Passing empty handlers/props as placeholders because they are required but missing in original logic
    return (
      <TavernActions
        onBack={() => setCurrentBuilding(null)}
        onRest={() => {}}
        gold={100}
        setGold={() => {}}
        setInfoText={() => {}}
      />
    )
  }

  return (
    <GameActionsPanel
      showDirections={showDirections}
      onToggleDirections={onToggleDirections}
      title="Machala - Náměstí"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Button
          variant="game-secondary"
          className="h-24 flex-col gap-2 border-[#d4a574]/30 bg-black/40 hover:bg-black/60 hover:text-[#ffd700]"
          onClick={() => setCurrentBuilding('shop')}
        >
          <ShoppingBag className="h-8 w-8 text-[#d4a574]" />
          <span className="text-xs font-bold uppercase">Tržiště</span>
        </Button>

        <Button
          variant="game-secondary"
          className="h-24 flex-col gap-2 border-[#d4a574]/30 bg-black/40 hover:bg-black/60 hover:text-[#ffd700]"
          onClick={() => setCurrentBuilding('smith')}
        >
          <Hammer className="h-8 w-8 text-[#d4a574]" />
          <span className="text-xs font-bold uppercase">Kovárna</span>
        </Button>

        <Button
          variant="game-secondary"
          className="h-24 flex-col gap-2 border-[#d4a574]/30 bg-black/40 hover:bg-black/60 hover:text-[#ffd700]"
          onClick={() => setCurrentBuilding('tavern')}
        >
          <Beer className="h-8 w-8 text-[#d4a574]" />
          <span className="text-xs font-bold uppercase">Hospoda</span>
        </Button>

        <Button
          variant="game-secondary"
          className="h-24 flex-col gap-2 border-[#d4a574]/30 bg-black/40 hover:bg-black/60 hover:text-[#ffd700]"
          onClick={() => setCurrentBuilding('bank')}
        >
          <Building className="h-8 w-8 text-[#d4a574]" />
          <span className="text-xs font-bold uppercase">Banka</span>
        </Button>

        <Button
          variant="game-secondary"
          className="h-24 flex-col gap-2 border-[#d4a574]/30 bg-black/40 hover:bg-black/60 hover:text-[#ffd700]"
          onClick={() => setCurrentBuilding('arena')}
        >
          <Swords className="h-8 w-8 text-[#d4a574]" />
          <span className="text-xs font-bold uppercase">Aréna</span>
        </Button>

        <Button
          variant="game-secondary"
          className="h-24 flex-col gap-2 border-[#d4a574]/30 bg-black/40 hover:bg-black/60 hover:text-[#ffd700]"
          onClick={() => setCurrentBuilding('church')}
        >
          <Cross className="h-8 w-8 text-[#d4a574]" />
          <span className="text-xs font-bold uppercase">Chrám</span>
        </Button>

        <Button
          variant="game-secondary"
          className="col-span-full h-12 gap-2 border-[#d4a574]/30 bg-black/40 hover:bg-black/60 hover:text-[#ffd700]"
          onClick={() => setCurrentBuilding('boards')}
        >
          <ScrollText className="h-5 w-5 text-[#d4a574]" />
          <span className="text-sm font-bold uppercase">Vývěska úkolů</span>
        </Button>
      </div>
    </GameActionsPanel>
  )
}
