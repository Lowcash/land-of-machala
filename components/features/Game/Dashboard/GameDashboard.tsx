'use client'

import { useGameDashboard } from '@/lib/hooks/game/useGameDashboard'

import { GameFooter, GameHeader } from '@/components/features/Game'
import { GameActivityPanel } from '@/components/features/Game/Activity/GameActivityPanel'
import { PageLayout } from '@/components/layout/PageLayout'

import type { CharacterData as BaseCharacterData } from '../../Character/Shared/types'
import type { MarketItem } from '../Locations/Market/types'
import { ActionsArea } from './ActionsArea'
import { CharacterBox } from './CharacterBox'

export interface CharacterData extends BaseCharacterData {
  xpToNextLevel: number
  bankGold?: number
  stats: {
    strength: number
    intelligence: number
    agility: number
    stamina: number
  }
  inventory?: MarketItem[]
}

interface GameDashboardProps {
  character: CharacterData
}

export function GameDashboard({ character }: GameDashboardProps) {
  const {
    currentView,
    goToView,
    goBack,
    infoText,
    isShaking,
    handleSetInfoText,
    gold,
    setGold,
    activeBuffs,
    setActiveBuffs,
    inventory,
    setInventory,
    handleMove,
    currentViewData,
  } = useGameDashboard({ character })

  return (
    <PageLayout
      header={
        <GameHeader
          title={currentViewData.title}
          subtitle={character.name}
          characterId={character.id}
          icon={currentViewData.icon}
        />
      }
      footer={<GameFooter />}
      backgroundImage={currentViewData.bg}
      rightPanel={
        <GameActivityPanel
          className={`mx-3 h-[140px] shrink-0 bg-black/60 transition-colors ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          <div
            className="animate-fade-in-wave mx-auto max-w-2xl py-1 text-center text-sm leading-relaxed text-[#f5e6d3]"
            key={infoText || currentViewData.desc}
            dangerouslySetInnerHTML={{ __html: infoText || currentViewData.desc }}
          />
        </GameActivityPanel>
      }
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {/* Player box at top */}
        <div className="w-full max-w-md px-3 pt-3">
          <CharacterBox
            name={character.name}
            level={character.level}
            hp={character.hp}
            hpMax={character.maxHp}
            mana={character.mana}
            manaMax={character.maxMana}
            xp={character.experience}
            xpMax={character.xpToNextLevel}
            stats={character.stats}
            isEnemy={false}
            resourceType={
              character.class === 'warrior' || character.class === 'rogue' ? 'energy' : 'mana'
            }
            gold={gold}
            locationName={currentViewData.title}
          />
        </div>

        {/* Actions Area */}
        <ActionsArea
          currentView={currentView}
          goBack={goBack}
          goToView={goToView}
          gold={gold}
          setGold={setGold}
          inventory={inventory}
          setInventory={setInventory}
          activeBuffs={activeBuffs}
          setActiveBuffs={setActiveBuffs}
          handleSetInfoText={handleSetInfoText}
          handleMove={handleMove}
          bankGold={character.bankGold || 0}
        />
      </div>
    </PageLayout>
  )
}
