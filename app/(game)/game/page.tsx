import type { CharacterData, CharacterItem } from '@/components/features/Character/Shared/types'
import { CombatClient } from '@/components/features/Combat/CombatClient'
import { GameDashboard } from '@/components/features/Game'
import type { CharacterData as DashboardCharacter } from '@/components/features/Game/Dashboard/GameDashboard'
import { auth } from '@/lib/auth'
import { getGamePageData } from '@/lib/loaders/game-loader'
import { redirect } from 'next/navigation'

export default async function GamePage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const data = await getGamePageData(session.user.id)
  if (!data) redirect('/onboarding')

  const { character, dashboardData } = data

  if (character.inCombat) {
    const combatCharacter = character as unknown as CharacterData & {
      combatPlayerHp?: number
      combatEnemyHp?: number
      combatEnemyId?: string
    }

    return (
      <CombatClient
        character={combatCharacter}
        inventory={character.inventory.map((i: unknown) => {
          const inv = i as { item: CharacterItem }
          return { ...inv.item, ...inv } as unknown as CharacterItem
        })}
      />
    )
  }

  return <GameDashboard character={dashboardData as unknown as DashboardCharacter} />
}
