'use client'

import { Suspense } from 'react'

import dynamic from 'next/dynamic'

import { viewData } from '@/lib/game/constants/views'
import { useGameMove, useGameView } from '@/lib/hooks/game'
import type { Buff, View } from '@/lib/types/game'
import type { MarketItem } from '@/lib/types/market'

import type { MergedQuest } from '@/components/features/Quest/Shared/types'

import { GameActions } from '../Shared/components/GameActions'
import { useGameDashboardState } from './GameDashboardProvider'

const BankActions = dynamic(() => import('../Locations/BankActions').then((mod) => mod.BankActions))

const MarketShop = dynamic(() =>
  import('../Locations/Shops/MarketShop').then((mod) => mod.MarketShop)
)

const TavernActions = dynamic(() =>
  import('../Locations/TavernActions').then((mod) => mod.TavernActions)
)
const TownActions = dynamic(() => import('../Locations/TownActions').then((mod) => mod.TownActions))
const QuestBoard = dynamic(() => import('../Locations/QuestBoard').then((mod) => mod.QuestBoard))
const ForestActions = dynamic(() =>
  import('../Locations/ForestActions').then((mod) => mod.ForestActions)
)

interface ActionsAreaProps {
  currentView: View
  gold: number
  inventory: MarketItem[]
  activeBuffs: Buff[]
  bankGold: number
  quests: MergedQuest[]
  // Server Component Slots
  smithShopSlot: React.ReactNode
  healerShopSlot: React.ReactNode
}

export function ActionsArea({
  currentView,
  gold,
  inventory,
  bankGold,
  quests,
  smithShopSlot,
  healerShopSlot,
}: ActionsAreaProps) {
  // 1. Hooks (using context for shared state)
  const { setInfoText } = useGameDashboardState()
  const { goToView, goBack } = useGameView(currentView)
  const { handleMove } = useGameMove({
    handleSetInfoText: setInfoText,
  })

  // 2. Data
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

            {currentView === 'tavern' && <TavernActions gold={gold} onInfoAction={setInfoText} />}

            {currentView === 'smith' && smithShopSlot}

            {currentView === 'healer' && healerShopSlot}

            {currentView === 'market' && <MarketShop gold={gold} inventory={inventory} />}

            {currentView === 'board' && <QuestBoard quests={quests} onBack={goBack} />}

            {currentView === 'forest' && <ForestActions onView={goToView} />}
          </Suspense>
        </div>
      </GameActions>
    </div>
  )
}
