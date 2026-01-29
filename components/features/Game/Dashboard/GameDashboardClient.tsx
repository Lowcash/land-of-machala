'use client'

import { CharacterClass } from '@prisma/client'

import { useGameDashboard } from '@/lib/hooks/game/useGameDashboard'
import type { CharacterData as BaseCharacterData } from '@/lib/types/game'

import { GameFooter, GameHeader } from '@/components/features/Game'
import { GameActivityPanel } from '@/components/features/Game/Activity/GameActivityPanel'
import { ActionsArea } from '@/components/features/Game/Dashboard/ActionsArea'
import { CharacterBox } from '@/components/features/Game/Dashboard/CharacterBox'
import type { MarketItem } from '@/components/features/Game/Locations/Market/types'
import { PageLayout } from '@/components/layout/PageLayout'

export interface CharacterData extends BaseCharacterData {
  xpToNextLevel: number
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
  initialView?: string
}

export function GameDashboardClient({ character, initialView }: GameDashboardProps) {
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
  } = useGameDashboard({ character, initialView })

  return (
    <PageLayout
      header={
        <GameHeader
          title={currentViewData.title}
          subtitle={character.name}
          characterId={character.id}
          playerStats={{
            gold: gold,
            x: character.x || 0,
            y: character.y || 0,
          }}
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
              character.class === CharacterClass.WARRIOR || character.class === CharacterClass.ROGUE
                ? 'energy'
                : 'mana'
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
