'use client'

import { PageTemplate } from '@/components/layout/PageTemplate'
import { RouteTransition } from '@/components/layout/RouteTransition'
import { useState } from 'react'
import { BankActions } from './BankActions'
import { CharacterBox } from './CharacterBox'
import { viewData, type View } from './config/viewData'
import { HealerActions } from './HealerActions'
import { useGameMove } from './hooks/useGameMove'
import type { MarketItem } from './Market/types'
import { MarketActions } from './MarketActions'
import { SmithActions } from './SmithActions'
import { TavernActions } from './TavernActions'
import { TownActions } from './TownActions'

interface CharacterData {
  id: string
  name: string
  level: number
  hp: number
  maxHp: number
  mana: number
  maxMana: number
  xp: number
  xpToNextLevel: number
  gold: number
  bankGold?: number
  class: string
  stats: {
    strength: number
    intelligence: number
    agility: number
    stamina: number
  }
  inventory?: MarketItem[] // refined type
}

interface GameDashboardProps {
  character: CharacterData
}

export function GameDashboard({ character }: GameDashboardProps) {
  const [currentView, setCurrentView] = useState<View>('town')
  const [infoText, setInfoText] = useState<string | null>(null)
  const [isShaking, setIsShaking] = useState(false)

  // Mock data for now - should come from props or query
  interface Buff {
    name: string
    stat: string
    val: number
  }

  const [gold, setGold] = useState(character.gold || 0)
  const [activeBuffs, setActiveBuffs] = useState<Buff[]>([])
  const [inventory, setInventory] = useState<MarketItem[]>(character.inventory || [])

  const handleSetInfoText = (text: string | null) => {
    if (!text) {
      setInfoText(null)
      setIsShaking(false)
      return
    }

    setInfoText(text)

    // Check for error/warning indicators in the text to trigger alert behavior
    const isAlert = text.includes('text-[#ff6b6b]') || text.includes('⚠️') || text.includes('Chyba')

    if (isAlert) {
      setIsShaking(true)
      setTimeout(() => {
        setInfoText(null)
        setIsShaking(false)
      }, 3000)
    } else {
      setIsShaking(false)
    }
  }

  const { handleMove } = useGameMove({
    characterId: character.id,
    handleSetInfoText,
  })

  // Get current view data
  const currentViewData = viewData[currentView]

  return (
    <RouteTransition>
      <PageTemplate
        title={currentViewData.title}
        backgroundImage={currentViewData.bg}
        icon={currentViewData.icon}
        maxWidth="lg"
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
              xp={character.xp}
              xpMax={character.xpToNextLevel}
              stats={character.stats}
              isEnemy={false}
              resourceType={
                character.class === 'warrior' || character.class === 'rogue' ? 'energy' : 'mana'
              }
            />
          </div>

          {/* Central Info Panel */}
          <div
            className={`mx-3 shrink-0 overflow-hidden rounded border border-[#d4a574]/50 bg-black/70 p-4 backdrop-blur-sm transition-colors ${isShaking ? 'animate-shake border-[#ff4444]' : ''}`}
            style={{ height: '140px' }}
          >
            <div className="scrollbar-custom h-full overflow-y-auto">
              <div
                className="animate-fade-in-wave mx-auto max-w-2xl py-1 text-center text-sm leading-relaxed text-[#f5e6d3]"
                key={infoText || currentViewData.desc}
                dangerouslySetInnerHTML={{ __html: infoText || currentViewData.desc }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="relative min-h-0 flex-1 px-3 pb-3">
            {currentView === 'town' && (
              <TownActions
                onSmith={() => setCurrentView('smith')}
                onBank={() => setCurrentView('bank')}
                onHealer={() => setCurrentView('healer')}
                onTavern={() => setCurrentView('tavern')}
                onMarket={() => setCurrentView('market')}
                onMove={handleMove}
                setInfoText={handleSetInfoText}
              />
            )}
            {currentView === 'smith' && (
              <SmithActions
                onBack={() => setCurrentView('town')}
                gold={gold}
                setGold={setGold}
                inventory={inventory as any} // Cast remains as SmithActions is not refactored yet
                setInventory={setInventory as any}
                setInfoText={handleSetInfoText}
              />
            )}
            {currentView === 'bank' && (
              <BankActions
                onBack={() => setCurrentView('town')}
                gold={gold}
                balance={character.bankGold || 0}
                characterId={character.id}
              />
            )}
            {currentView === 'healer' && (
              <HealerActions
                onBack={() => setCurrentView('town')}
                gold={gold}
                setGold={setGold}
                activeBuffs={activeBuffs}
                setActiveBuffs={setActiveBuffs}
                setInfoText={handleSetInfoText}
              />
            )}
            {currentView === 'tavern' && (
              <TavernActions
                onBack={() => setCurrentView('town')}
                onRest={() => {}}
                gold={gold}
                setGold={setGold}
                setInfoText={handleSetInfoText}
              />
            )}
            {currentView === 'market' && (
              <MarketActions
                onBack={() => setCurrentView('town')}
                gold={gold}
                setGold={setGold}
                inventory={inventory}
                setInventory={setInventory}
                setInfoText={handleSetInfoText}
              />
            )}
          </div>
        </div>
      </PageTemplate>
    </RouteTransition>
  )
}
