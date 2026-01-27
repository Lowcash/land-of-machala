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
import { addExperience, updateCharacterResources } from '@/entity/character'
import type { AchievementCategory } from '@prisma/client'
import { z } from 'zod'

import { prisma } from '@/lib/db'

import { characterProcedure } from './procedures'

/**
 * Achievement Server Actions
 * Handles achievement tracking, progress updates, and rewards
 */

const getCategorySchema = z.object({
  category: z.enum(['COMBAT', 'EXPLORATION', 'QUESTS', 'SOCIAL', 'COLLECTION', 'PROGRESSION']),
})

const updateProgressSchema = z.object({
  achievementId: z.string(),
  progress: z.number().int().min(0),
})

const incrementProgressSchema = z.object({
  achievementId: z.string(),
  amount: z.number().int().min(1).default(1),
})

const unlockSchema = z.object({
  achievementId: z.string(),
})

export const getAllAchievementsAction = characterProcedure
  .createServerAction()
  .input(z.object({ includeHidden: z.boolean().default(false) }))
  .handler(async ({ input }) => {
    const achievements = await getAllAchievements(input.includeHidden)
    return { achievements }
  })

export const getAchievementsByCategoryAction = characterProcedure
  .createServerAction()
  .input(getCategorySchema)
  .handler(async ({ input }) => {
    const achievements = await getAchievementsByCategory(input.category as AchievementCategory)
    return { achievements }
  })

export const getCharacterAchievementsAction = characterProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { character } = ctx

    const achievements = await getCharacterAchievements(character.id)

    // Initialize achievements if none exist
    if (achievements.length === 0) {
      const initialized = await initializeCharacterAchievements(character.id)
      return { achievements: initialized }
    }

    return { achievements }
  })

export const updateAchievementProgressAction = characterProcedure
  .createServerAction()
  .input(updateProgressSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const characterAchievement = await updateAchievementProgress(
      character.id,
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
        await updateCharacterResources(character.id, {
          gold: character.gold + achievement.rewardGold,
        })
      }

      if (achievement.rewardXp > 0) {
        await addExperience(character.id, achievement.rewardXp)
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

export const incrementAchievementProgressAction = characterProcedure
  .createServerAction()
  .input(incrementProgressSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const characterAchievement = await incrementAchievementProgress(
      character.id,
      input.achievementId,
      input.amount
    )

    // Award rewards if achievement was just unlocked
    if (characterAchievement.unlocked) {
      const achievement = characterAchievement.achievement

      if (achievement.rewardGold > 0) {
        await updateCharacterResources(character.id, {
          gold: character.gold + achievement.rewardGold,
        })
      }

      if (achievement.rewardXp > 0) {
        await addExperience(character.id, achievement.rewardXp)
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

export const unlockAchievementAction = characterProcedure
  .createServerAction()
  .input(unlockSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const characterAchievement = await unlockAchievement(character.id, input.achievementId)

    const achievement = await prisma.achievement.findUnique({
      where: { id: characterAchievement.achievementId },
    })

    if (!achievement) {
      throw new Error('Achievement nebylo nalezeno')
    }

    // Award rewards
    if (achievement.rewardGold > 0) {
      await updateCharacterResources(character.id, {
        gold: character.gold + achievement.rewardGold,
      })
    }

    if (achievement.rewardXp > 0) {
      await addExperience(character.id, achievement.rewardXp)
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
