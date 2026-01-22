'use client'

import React from 'react'
import { TownActions } from '../Locations/TownActions'

import { HealerShop } from '../Locations/Shops/HealerShop'
import { MarketShop } from '../Locations/Shops/MarketShop'
import { SmithShop } from '../Locations/Shops/SmithShop'

import { BankActions } from '../Locations/BankActions'
import { TavernActions } from '../Locations/TavernActions'

import type { MarketItem } from '../Locations/Market/types'
import type { View } from '../Shared/config/viewData'

interface ActionsAreaProps {
  currentView: View
  goBack: () => void
  goToView: (view: View) => void
  gold: number
  setGold: React.Dispatch<React.SetStateAction<number>>
  inventory: MarketItem[]
  setInventory: React.Dispatch<React.SetStateAction<MarketItem[]>>
  activeBuffs: any[]
  setActiveBuffs: React.Dispatch<React.SetStateAction<any[]>>
  handleSetInfoText: (text: string | null) => void
  handleMove: (direction: any) => void
  characterId: string
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
  characterId,
  bankGold,
}: ActionsAreaProps) {
  // Wrapper to bridge setInfoText interface
  const setInfoTextWrapper = (text: string) => handleSetInfoText(text)

  return (
    <div className="relative flex h-full min-h-0 w-full flex-1 flex-col">
      {currentView === 'town' && (
        <TownActions
          onSmith={() => goToView('smith')}
          onBank={() => goToView('bank')}
          onHealer={() => goToView('healer')}
          onTavern={() => goToView('tavern')}
          onMarket={() => goToView('market')}
          onMove={handleMove}
          setInfoText={handleSetInfoText}
        />
      )}

      {currentView === 'smith' && (
        <SmithShop
          onBack={goBack}
          gold={gold}
          setGold={setGold}
          inventory={inventory}
          setInventory={setInventory}
        />
      )}

      {currentView === 'bank' && (
        <BankActions onBack={goBack} gold={gold} balance={bankGold} characterId={characterId} />
      )}

      {currentView === 'healer' && (
        <HealerShop
          onBack={goBack}
          gold={gold}
          setGold={setGold}
          activeBuffs={activeBuffs}
          setActiveBuffs={setActiveBuffs}
        />
      )}

      {currentView === 'tavern' && (
        <TavernActions
          onBack={goBack}
          onRest={() => {}}
          gold={gold}
          setGold={setGold}
          setInfoText={handleSetInfoText}
        />
      )}

      {currentView === 'market' && (
        <MarketShop
          onBack={goBack}
          gold={gold}
          setGold={setGold}
          inventory={inventory}
          setInventory={setInventory}
          setInfoText={setInfoTextWrapper}
        />
      )}
    </div>
  )
}
