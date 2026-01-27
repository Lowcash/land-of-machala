import React from 'react'

import type { View } from '@/lib/game/config'
import { viewData } from '@/lib/game/config'

import { BankActions } from '../Locations/BankActions'
import type { MarketItem } from '../Locations/Market/types'
import { HealerShop } from '../Locations/Shops/HealerShop'
import { MarketShop } from '../Locations/Shops/MarketShop'
import { SmithShop } from '../Locations/Shops/SmithShop'
import { TavernActions } from '../Locations/TavernActions'
import { TownActions } from '../Locations/TownActions'
import { GameActions } from '../Shared/components/GameActions'

interface Buff {
  name: string
  stat: string
  val: number
}

type MoveDirection = 'north' | 'south' | 'east' | 'west'

interface ActionsAreaProps {
  currentView: View
  goBack: () => void
  goToView: (view: View) => void
  gold: number
  setGold: React.Dispatch<React.SetStateAction<number>>
  inventory: MarketItem[]
  setInventory: React.Dispatch<React.SetStateAction<MarketItem[]>>
  activeBuffs: Buff[]
  setActiveBuffs: React.Dispatch<React.SetStateAction<Buff[]>>
  handleSetInfoText: (text: string | null) => void
  handleMove: (direction: MoveDirection) => void
  bankGold: number
}

export function ActionsArea({
  currentView,
  goBack,
  goToView,
  gold,
  setGold,
  inventory,
  setInventory,
  activeBuffs,
  setActiveBuffs,
  handleSetInfoText,
  handleMove,
  bankGold,
}: ActionsAreaProps) {
  const currentViewConfig = viewData[currentView]

  return (
    <div className="relative flex h-full min-h-0 w-full flex-1 flex-col">
      <GameActions
        title={currentViewConfig.title}
        onBack={currentView !== 'town' ? goBack : undefined}
        showDirections={currentView === 'town'}
        onToggleDirections={() => {}}
        onMove={handleMove}
        exploration={
          <div className="space-y-4">
            <div className="rounded border border-[#8b6f47] bg-black/60 p-3 text-xs text-[#8b7355]">
              <div dangerouslySetInnerHTML={{ __html: currentViewConfig.desc }} />
            </div>
          </div>
        }
      >
        <div className="space-y-1.5 pt-2">
          {currentView === 'town' && <TownActions onView={goToView} />}

          {currentView === 'bank' && <BankActions gold={gold} balance={bankGold} />}

          {currentView === 'tavern' && (
            <TavernActions gold={gold} onInfoAction={handleSetInfoText} />
          )}

          {currentView === 'smith' && (
            <SmithShop
              gold={gold}
              setGold={setGold}
              inventory={inventory}
              setInventory={setInventory}
            />
          )}

          {currentView === 'healer' && (
            <HealerShop
              gold={gold}
              setGold={setGold}
              activeBuffs={activeBuffs}
              setActiveBuffs={setActiveBuffs}
            />
          )}

          {currentView === 'market' && (
            <MarketShop
              gold={gold}
              setGold={setGold}
              inventory={inventory}
              setInventory={setInventory}
              setInfoText={handleSetInfoText}
            />
          )}
        </div>
      </GameActions>
    </div>
  )
}
