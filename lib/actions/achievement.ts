'use server'

import {
  getAchievementsByCategory,
  getAllAchievements,
  getCharacterAchievements,
  incrementAchievementProgress,
  initializeCharacterAchievements,
  unlockAchievement,
  updateAchievementProgress,
} from '@/entity/achievement'
import { addExperience, getCharacter, updateCharacterResources } from '@/entity/character'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { AchievementCategory } from '@prisma/client'
import { z } from 'zod'
import { createServerAction } from 'zsa'

/**
 * Achievement Server Actions
 * Handles achievement tracking, progress updates, and rewards
 */

const getCategorySchema = z.object({
  category: z.enum(['COMBAT', 'EXPLORATION', 'QUESTS', 'SOCIAL', 'COLLECTION', 'PROGRESSION']),
})

const getCharacterAchievementsSchema = z.object({
  characterId: z.string(),
})

const updateProgressSchema = z.object({
  characterId: z.string(),
  achievementId: z.string(),
  progress: z.number().int().min(0),
})

const incrementProgressSchema = z.object({
  characterId: z.string(),
  achievementId: z.string(),
  amount: z.number().int().min(1).default(1),
})

const unlockSchema = z.object({
  characterId: z.string(),
  achievementId: z.string(),
})

export const getAllAchievementsAction = createServerAction()
  .input(z.object({ includeHidden: z.boolean().default(false) }))
  .handler(async ({ input }) => {
    const achievements = await getAllAchievements(input.includeHidden)
    return { achievements }
  })

export const getAchievementsByCategoryAction = createServerAction()
  .input(getCategorySchema)
  .handler(async ({ input }) => {
    const achievements = await getAchievementsByCategory(input.category as AchievementCategory)
    return { achievements }
  })

export const getCharacterAchievementsAction = createServerAction()
  .input(getCharacterAchievementsSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    const character = await getCharacter(input.characterId)
    if (!character || character.userId !== userId) {
      throw new Error('Character not found or unauthorized')
    }

    const achievements = await getCharacterAchievements(input.characterId)

    // Initialize achievements if none exist
    if (achievements.length === 0) {
      const initialized = await initializeCharacterAchievements(input.characterId)
      return { achievements: initialized }
    }

    return { achievements }
  })

export const updateAchievementProgressAction = createServerAction()
  .input(updateProgressSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    const character = await getCharacter(input.characterId)
    if (!character || character.userId !== userId) {
      throw new Error('Character not found or unauthorized')
    }

    const characterAchievement = await updateAchievementProgress(
      input.characterId,
      input.achievementId,
      input.progress
    )

    // Award rewards if achievement was just unlocked
    if (
      characterAchievement.unlocked &&
      characterAchievement.progress === characterAchievement.achievement.maxProgress
    ) {
      const achievement = characterAchievement.achievement

      if (achievement.rewardGold > 0) {
        await updateCharacterResources(input.characterId, {
          gold: character.gold + achievement.rewardGold,
        })
      }

      if (achievement.rewardXp > 0) {
        await addExperience(input.characterId, achievement.rewardXp)
      }

      return {
        characterAchievement,
        justUnlocked: true,
        rewards: {
          gold: achievement.rewardGold,
          xp: achievement.rewardXp,
          title: achievement.rewardTitle,
        },
      }
    }

    return { characterAchievement, justUnlocked: false }
  })

export const incrementAchievementProgressAction = createServerAction()
  .input(incrementProgressSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    const character = await getCharacter(input.characterId)
    if (!character || character.userId !== userId) {
      throw new Error('Character not found or unauthorized')
    }

    const characterAchievement = await incrementAchievementProgress(
      input.characterId,
      input.achievementId,
      input.amount
    )

    // Award rewards if achievement was just unlocked
    if (characterAchievement.unlocked) {
      const achievement = characterAchievement.achievement

      if (achievement.rewardGold > 0) {
        await updateCharacterResources(input.characterId, {
          gold: character.gold + achievement.rewardGold,
        })
      }

      if (achievement.rewardXp > 0) {
        await addExperience(input.characterId, achievement.rewardXp)
      }

      return {
        characterAchievement,
        justUnlocked: true,
        rewards: {
          gold: achievement.rewardGold,
          xp: achievement.rewardXp,
          title: achievement.rewardTitle,
        },
      }
    }

    return { characterAchievement, justUnlocked: false }
  })

export const unlockAchievementAction = createServerAction()
  .input(unlockSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    const character = await getCharacter(input.characterId)
    if (!character || character.userId !== userId) {
      throw new Error('Character not found or unauthorized')
    }

    const characterAchievement = await unlockAchievement(input.characterId, input.achievementId)

    const achievement = await prisma.achievement.findUnique({
      where: { id: characterAchievement.achievementId },
    })

    if (!achievement) {
      throw new Error('Achievement not found')
    }

    // Award rewards
    if (achievement.rewardGold > 0) {
      await updateCharacterResources(input.characterId, {
        gold: character.gold + achievement.rewardGold,
      })
    }

    if (achievement.rewardXp > 0) {
      await addExperience(input.characterId, achievement.rewardXp)
    }

    return {
      characterAchievement,
      rewards: {
        gold: achievement.rewardGold,
        xp: achievement.rewardXp,
        title: achievement.rewardTitle,
      },
    }
  })

/**
 * Server-side achievement triggers
 * These are called automatically when certain events occur
 */

export async function checkCombatAchievements(characterId: string, enemiesDefeated: number) {
  // First Blood (defeat 1 enemy)
  if (enemiesDefeated === 1) {
    const firstBlood = await getAllAchievements()
    const achievement = firstBlood.find((a) => a.title === 'First Blood')
    if (achievement) {
      await unlockAchievement(characterId, achievement.id)
    }
  }

  // Slayer (defeat 100 enemies)
  const slayer = await getAllAchievements()
  const slayerAchievement = slayer.find((a) => a.title === 'Slayer')
  if (slayerAchievement) {
    await updateAchievementProgress(characterId, slayerAchievement.id, enemiesDefeated)
  }
}

export async function checkQuestAchievements(characterId: string, questsCompleted: number) {
  // Quest Beginner (complete 1 quest)
  if (questsCompleted === 1) {
    const questBeginner = await getAllAchievements()
    const achievement = questBeginner.find((a) => a.title === 'Quest Beginner')
    if (achievement) {
      await unlockAchievement(characterId, achievement.id)
    }
  }

  // Quest Master (complete 50 quests)
  const questMaster = await getAllAchievements()
  const achievement = questMaster.find((a) => a.title === 'Quest Master')
  if (achievement) {
    await updateAchievementProgress(characterId, achievement.id, questsCompleted)
  }
}

export async function checkLevelAchievements(characterId: string, level: number) {
  const allAchievements = await getAllAchievements()

  // Level 10
  if (level >= 10) {
    const level10 = allAchievements.find((a) => a.title === 'Level 10')
    if (level10) {
      await unlockAchievement(characterId, level10.id)
    }
  }

  // Legendary Hero (level 50)
  if (level >= 50) {
    const legendary = allAchievements.find((a) => a.title === 'Legendary Hero')
    if (legendary) {
      await unlockAchievement(characterId, legendary.id)
    }
  }
}
