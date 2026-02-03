import { getCharacterByUserId } from '@/entity/character'

import { auth } from '@/lib/auth'

export async function getCharacterPageData() {
  const session = await auth()
  if (!session?.user?.id) return null

  const character = await getCharacterByUserId(session.user.id)

  if (!character) {
    return null
  }

  // Map achievements for separate prop
  const mappedAchievements = character.achievements.map((ca) => ({
    id: ca.achievement.id,
    title: ca.achievement.title,
    description: ca.achievement.description,
    icon: ca.achievement.iconName,
    rarity: ca.achievement.rarity,
    category: ca.achievement.category,
    maxProgress: ca.achievement.maxProgress,
    rewardGold: ca.achievement.rewardGold,
    rewardXp: ca.achievement.rewardXp,
    rewardTitle: ca.achievement.rewardTitle,
    unlocked: ca.unlocked,
    progress: ca.progress,
    unlockedAt: ca.unlockedAt,
  }))

  // Map inventory
  const mappedInventory = character.inventory.map((inv) => ({
    ...inv.item,
    equipped: inv.equipped,
    quantity: inv.quantity,
    attack: inv.item.strength,
    defense: inv.item.stamina,
  }))

  // Map character data for client (ensure achievements is string[] IDs)
  const characterForClient = {
    ...character,
    achievements: character.achievements.map((ca) => ca.achievementId),
    reputation: 0,
    createdAt: undefined,
    updatedAt: undefined,
    lastPlayedAt: undefined,
    locationX: undefined,
    locationY: undefined,
    currentView: undefined,
  }

  return {
    characterId: character.id,
    clientProps: {
      character: characterForClient,
      inventory: mappedInventory,
      achievements: mappedAchievements,
    },
  }
}
