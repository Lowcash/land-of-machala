import { getCharacterByUserId } from '@/entity/character'
import { getAllQuests, getCharacterQuests } from '@/entity/quest'

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

  // Fetch Quest data
  const [allQuests, characterQuests] = await Promise.all([
    getAllQuests(),
    getCharacterQuests(character.id),
  ])

  // Merge quests with character progress (simple logic for dashboard)
  const quests = allQuests.map((q) => {
    const cq = characterQuests.find((charQ) => charQ.questId === q.id)
    return {
      ...q,
      characterStatus: cq?.status || null,
      progress: 0, // Simplified for dashboard
      objectives: q.objectives.map((obj) => {
        const charObj = cq?.objectives.find((co) => co.objectiveId === obj.id)
        return {
          ...obj,
          current: charObj?.current || 0,
          completed: charObj?.completed || false,
        }
      }),
      rewards: q.rewards.map((r) => ({
        ...r,
        item: r.item ? { id: r.item.id, name: r.item.name } : null,
      })),
    }
  })

  // Transform character data to match GameDashboard interface
  const characterWithStats = {
    ...character,
    x: character.locationX,
    y: character.locationY,
    xpToNextLevel: getXPNeededForNextLevel(character.level),
    stats: {
      strength: character.strength,
      intelligence: character.intelligence,
      agility: character.agility,
      stamina: character.stamina,
    },
    bankGold: character.bankGold || 0,
    activeBuffs:
      character.buffs?.map((b: { type: string; value: number; expiresAt: Date }) => ({
        name: b.type === 'STR' ? 'Požehnání Síly' : 'Požehnání Výdrže',
        stat: b.type === 'STR' ? 'Síla' : 'Výdrž',
        val: b.value,
        expiresAt: b.expiresAt,
      })) || [],
  }

  return {
    character,
    dashboardData: characterWithStats,
    quests,
  }
}
