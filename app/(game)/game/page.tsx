import { CombatClient } from '@/components/features/Combat/CombatClient'
import { GameDashboard } from '@/components/features/Game/GameDashboard'
import { cleanExpiredLootPiles } from '@/lib/actions/loot-recovery'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function GamePage() {
  const session = await auth()
  if (!session?.user) redirect('/auth/login')

  const character = await prisma.character.findFirst({
    where: { userId: session.user.id },
    include: {
      inventory: {
        include: { item: true },
      },
      skills: {
        include: { skill: true },
      },
    },
  })

  if (!character) redirect('/create-character')

  // Combat Check
  if (character.inCombat) {
    return <CombatClient character={character} inventory={character.inventory.map((i: any) => ({...i.item, ...i}))} />
  }

  // Clean expired loot if any
  await cleanExpiredLootPiles(character.id)

  // Transform character data to match GameDashboard interface
  const characterWithStats = {
      ...character,
      stats: {
          strength: character.strength,
          intelligence: character.intelligence,
          agility: character.agility,
          stamina: character.stamina
      }
  }

  return <GameDashboard character={characterWithStats as any} />
}
