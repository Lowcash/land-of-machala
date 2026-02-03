import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { CharacterClass } from '@prisma/client'

import { viewData } from '@/lib/game/constants/views'
import { getIconFromName } from '@/lib/icons'
import { getGamePageData } from '@/lib/loaders/game-loader'
import type { CharacterData, CharacterItem, InventoryEntry, View } from '@/lib/types/game'
import type { MarketItem } from '@/lib/types/market'

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
import type { MergedQuest } from '@/components/features/Quest/Shared/types'

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

    const combatInventory = (character.inventory || []).map((entry) => {
      const invEntry = entry as unknown as InventoryEntry
      return {
        ...invEntry.item,
        equipped: invEntry.equipped,
        quantity: invEntry.quantity,
        icon: getIconFromName(invEntry.item.iconName),
      }
    }) as CharacterItem[]

    return (
      <CombatClient
        character={combatCharacter}
        inventory={combatInventory}
        footer={<GameFooter />}
      />
    )
  }

  /* Use typed dashboardData */
  const dash = dashboardData as unknown as CharacterData
  const dashboardInventory = (dash.inventory || []).map((entry) => ({
    ...entry.item,
    price: entry.item.value,
    equipped: entry.equipped,
    quantity: entry.quantity,
    icon: getIconFromName(entry.item.iconName || 'Backpack'),
  })) as MarketItem[]

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
          <GameActivityPanel>
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
            xpMax={dash.xpToNextLevel || 0}
            stats={dash.stats || { strength: 0, intelligence: 0, agility: 0, stamina: 0 }}
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
            inventory={dashboardInventory}
            activeBuffs={dash.activeBuffs || []}
            bankGold={dash.bankGold || 0}
            quests={data.quests as MergedQuest[]}
            smithShopSlot={<SmithShop gold={character.gold} />}
            healerShopSlot={
              <HealerShop activeBuffs={dash.activeBuffs || []} gold={character.gold} />
            }
          />
        }
      />
    </GameDashboardProvider>
  )
}
