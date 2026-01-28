import { getCharacterByUserId } from '@/entity/character'

import { cleanExpiredLootPiles } from '@/lib/actions/loot-recovery'
import { auth } from '@/lib/auth'
import { getXPNeededForNextLevel } from '@/lib/game/progression'

export async function getGamePageData() {
  const session = await auth()
  if (!session?.user?.id) return null

  const userId = session.user.id

  const character = await getCharacterByUserId(userId)

  if (!character) return null

  // Clean expired loot if any
  if (!character.inCombat) {
    await cleanExpiredLootPiles(character.id)
  }

  // Transform character data to match GameDashboard interface
  const characterWithStats = {
    ...character,
    xpToNextLevel: getXPNeededForNextLevel(character.level),
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
