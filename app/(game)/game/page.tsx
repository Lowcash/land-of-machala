import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { CharacterClass } from '@prisma/client'

import { viewData } from '@/lib/game/constants/views'
import { getGamePageData } from '@/lib/loaders/game-loader'
import type { CharacterData, CharacterItem, View } from '@/lib/types/game'

import { CombatClient } from '@/components/features/Combat/CombatClient'
import {
  CharacterBox,
  GameDashboardActivity,
  GameDashboardProvider,
  GameFooter,
  GameHeader,
} from '@/components/features/Game'
import { GameActivityPanel } from '@/components/features/Game/Activity/GameActivityPanel'
import { ActionsArea } from '@/components/features/Game/Dashboard/ActionsArea'
import { HealerShop } from '@/components/features/Game/Locations/Shops/HealerShop'
import { SmithShop } from '@/components/features/Game/Locations/Shops/SmithShop'
import { GenericGameLayout } from '@/components/features/Game/Shared/layouts/GenericGameLayout'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Hra | Land of Machala',
  description: 'Vstup do světa Machala a zažij dobrodružství.',
}

interface PageProps {
  searchParams: Promise<{ view?: string }>
}

export default async function GamePage({ searchParams }: PageProps) {
  const data = await getGamePageData()
  if (!data) redirect('/onboarding')

  const { character, dashboardData } = data
  const { view } = await searchParams
  const currentView = (view as View) || 'town'
  const currentViewConfig = viewData[currentView]

  if (character.inCombat) {
    const combatCharacter = character as unknown as CharacterData & {
      combatPlayerHp?: number
      combatEnemyHp?: number
      combatEnemyId?: string
    }

    const inventory = character.inventory.map((i: unknown) => {
      const inv = i as { item: CharacterItem }
      return { ...inv.item, ...inv } as unknown as CharacterItem
    })

    return (
      <CombatClient character={combatCharacter} inventory={inventory} footer={<GameFooter />} />
    )
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const dash = dashboardData as any

  return (
    <GameDashboardProvider>
      <GenericGameLayout
        header={
          <GameHeader
            title={currentViewConfig.title}
            subtitle={character.name}
            playerStats={{
              gold: character.gold,
              x: dash.x || 0,
              y: dash.y || 0,
            }}
            icon={currentViewConfig.icon}
          />
        }
        footer={<GameFooter />}
        backgroundImage={currentViewConfig.bg}
        rightPanel={
          <GameActivityPanel className="mx-3 h-[140px] shrink-0 bg-black/60 transition-colors">
            <GameDashboardActivity viewDesc={currentViewConfig.desc} />
          </GameActivityPanel>
        }
        topContent={
          <CharacterBox
            name={character.name}
            level={character.level}
            hp={character.hp}
            hpMax={character.maxHp}
            mana={character.mana}
            manaMax={character.maxMana}
            xp={character.experience}
            xpMax={dash.xpToNextLevel}
            stats={dash.stats}
            isEnemy={false}
            resourceType={
              character.class === CharacterClass.WARRIOR || character.class === CharacterClass.ROGUE
                ? 'energy'
                : 'mana'
            }
            gold={character.gold}
            locationName={currentViewConfig.title}
          />
        }
        bottomContent={
          <ActionsArea
            currentView={currentView}
            gold={character.gold}
            inventory={dash.inventory}
            activeBuffs={dash.activeBuffs}
            bankGold={dash.bankGold}
            quests={data.quests as any}
            smithShopSlot={<SmithShop gold={character.gold} />}
            healerShopSlot={
              <HealerShop activeBuffs={character.buffs as any} gold={character.gold} />
            }
          />
        }
      />
    </GameDashboardProvider>
  )
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
