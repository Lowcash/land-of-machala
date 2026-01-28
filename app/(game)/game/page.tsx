import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getGamePageData } from '@/lib/loaders/game-loader'
import type { CharacterData, CharacterItem } from '@/lib/types/game'

import { CombatClient } from '@/components/features/Combat/CombatClient'
import { GameDashboard } from '@/components/features/Game'
import type { CharacterData as DashboardCharacter } from '@/components/features/Game/Dashboard/GameDashboard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Hra | Land of Machala',
  description: 'Vstup do světa Machala a zažij dobrodružství.',
}

export default async function GamePage() {
  const data = await getGamePageData()

  if (!data) redirect('/onboarding')

  const { character, dashboardData } = data

  if (character.inCombat) {
    const combatCharacter = character as unknown as CharacterData & {
      combatPlayerHp?: number
      combatEnemyHp?: number
      combatEnemyId?: string
    }

    // Transform inventory items to match CharacterItem type
    const inventory = character.inventory.map((i: unknown) => {
      const inv = i as { item: CharacterItem }
      return { ...inv.item, ...inv } as unknown as CharacterItem
    })

    return <CombatClient character={combatCharacter} inventory={inventory} />
  }

  return <GameDashboard character={dashboardData as unknown as DashboardCharacter} />
}
