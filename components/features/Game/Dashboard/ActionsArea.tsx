import React, { Suspense } from 'react'

import dynamic from 'next/dynamic'

import { viewData } from '@/lib/game/constants/views'
import type { View } from '@/lib/types/game'
import type { MarketItem } from '@/lib/types/market'

import { GameActions } from '../Shared/components/GameActions'

const BankActions = dynamic(() => import('../Locations/BankActions').then((mod) => mod.BankActions))
const HealerShop = dynamic(() =>
  import('../Locations/Shops/HealerShop').then((mod) => mod.HealerShop)
)
const MarketShop = dynamic(() =>
  import('../Locations/Shops/MarketShop').then((mod) => mod.MarketShop)
)
const SmithShop = dynamic(() => import('../Locations/Shops/SmithShop').then((mod) => mod.SmithShop))
const TavernActions = dynamic(() =>
  import('../Locations/TavernActions').then((mod) => mod.TavernActions)
)
const TownActions = dynamic(() => import('../Locations/TownActions').then((mod) => mod.TownActions))

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
          <Suspense
            fallback={
              <div className="flex h-20 items-center justify-center text-xs text-[#8b7355]">
                Načítání...
              </div>
            }
          >
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
          </Suspense>
        </div>
      </GameActions>
    </div>
  )
}
