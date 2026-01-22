import { cleanExpiredLootPiles } from '@/lib/actions/loot-recovery'
import { prisma } from '@/lib/db'

export async function getGamePageData(userId: string) {
  const character = await prisma.character.findFirst({
    where: { userId },
    include: {
      inventory: {
        include: { item: true },
      },
      skills: {
        include: { skill: true },
      },
    },
  })

  if (!character) return null

  // Clean expired loot if any
  if (!character.inCombat) {
    await cleanExpiredLootPiles(character.id)
  }

  // Transform character data to match GameDashboard interface
  // TODO: Calculate xpToNextLevel based on level tables
  const characterWithStats = {
    ...character,
    xpToNextLevel: 1000,
    stats: {
      strength: character.strength,
      intelligence: character.intelligence,
      agility: character.agility,
      stamina: character.stamina,
    },
  }

  return {
    character,
    dashboardData: characterWithStats,
  }
}
