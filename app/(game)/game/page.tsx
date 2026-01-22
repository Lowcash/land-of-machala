import { CombatClient } from '@/components/features/Combat/CombatClient'
import { GameDashboard } from '@/components/features/Game'
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
    return (
      <CombatClient
        character={character as any}
        inventory={character.inventory.map((i: any) => ({ ...i.item, ...i }))}
      />
    )
  }

  return <GameDashboard character={dashboardData as any} />
}
