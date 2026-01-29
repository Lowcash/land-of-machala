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

import { prisma } from '@/lib/db'
import {
  getAllAchievementsSchema,
  getCategorySchema,
  incrementProgressSchema,
  unlockSchema,
  updateProgressSchema,
} from '@/lib/schemas/achievement'
/**
 * Server-side achievement triggers
 * These are called automatically when certain events occur
 */

import type { UnlockedAchievement } from '@/lib/types/game'

import { characterProcedure } from './procedures'

/**
 * Achievement Server Actions
 * Handles achievement tracking, progress updates, and rewards
 */

export const getAllAchievementsAction = characterProcedure
  .createServerAction()
  .input(getAllAchievementsSchema)
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

export async function checkCombatAchievements(characterId: string, enemiesDefeated: number) {
  const unlockedAchievements: UnlockedAchievement[] = []

  // First Blood (defeat 1 enemy)
  if (enemiesDefeated === 1) {
    const firstBlood = await getAllAchievements()
    const achievement = firstBlood.find((a) => a.title === 'First Blood')
    if (achievement) {
      const result = await unlockAchievement(characterId, achievement.id)
      if (result.unlocked) {
        unlockedAchievements.push({
          title: achievement.title,
          rewards: {
            gold: achievement.rewardGold,
            xp: achievement.rewardXp,
            title: achievement.rewardTitle,
          },
        })
      }
    }
  }

  // Slayer (defeat 100 enemies)
  const slayer = await getAllAchievements()
  const slayerAchievement = slayer.find((a) => a.title === 'Slayer')
  if (slayerAchievement) {
    const result = await updateAchievementProgress(
      characterId,
      slayerAchievement.id,
      enemiesDefeated
    )
    if (
      result.unlocked &&
      result.progress === result.achievement.maxProgress &&
      result.progress === enemiesDefeated // Ensure it was JUST unlocked if possible, though progress vs maxProgress check is usually enough if called incrementally
    ) {
      // Re-fetch or structure rewards since updateAchievementProgress returns CharacterAchievement directly
      // Actually updateAchievementProgressAction handles rewards logic internally but here we are calling the entity function directly.
      // Wait, updateAchievementProgress entity function returns CharacterAchievement with Achievement included.
      unlockedAchievements.push({
        title: slayerAchievement.title,
        rewards: {
          gold: slayerAchievement.rewardGold,
          xp: slayerAchievement.rewardXp,
          title: slayerAchievement.rewardTitle,
        },
      })
    }
  }

  return unlockedAchievements
}

export async function checkQuestAchievements(characterId: string, questsCompleted: number) {
  const unlockedAchievements: UnlockedAchievement[] = []
  const allAchievements = await getAllAchievements()

  // Quest Beginner (complete 1 quest)
  if (questsCompleted === 1) {
    const questBeginner = allAchievements.find((a) => a.title === 'Quest Beginner')
    if (questBeginner) {
      const result = await unlockAchievement(characterId, questBeginner.id)
      if (result.unlocked) {
        unlockedAchievements.push({
          title: questBeginner.title,
          rewards: {
            gold: questBeginner.rewardGold,
            xp: questBeginner.rewardXp,
            title: questBeginner.rewardTitle,
          },
        })
      }
    }
  }

  // Quest Master (complete 50 quests)
  const questMaster = allAchievements.find((a) => a.title === 'Quest Master')
  if (questMaster) {
    const result = await updateAchievementProgress(characterId, questMaster.id, questsCompleted)
    if (
      result.unlocked &&
      result.progress === result.achievement.maxProgress &&
      result.progress === questsCompleted
    ) {
      unlockedAchievements.push({
        title: questMaster.title,
        rewards: {
          gold: questMaster.rewardGold,
          xp: questMaster.rewardXp,
          title: questMaster.rewardTitle,
        },
      })
    }
  }

  return unlockedAchievements
}

export async function checkLevelAchievements(characterId: string, level: number) {
  const unlockedAchievements: UnlockedAchievement[] = []
  const allAchievements = await getAllAchievements()

  // Level 10
  if (level >= 10) {
    const level10 = allAchievements.find((a) => a.title === 'Level 10')
    if (level10) {
      const result = await unlockAchievement(characterId, level10.id)
      if (result.unlocked) {
        unlockedAchievements.push({
          title: level10.title,
          rewards: {
            gold: level10.rewardGold,
            xp: level10.rewardXp,
            title: level10.rewardTitle,
          },
        })
      }
    }
  }

  // Legendary Hero (level 50)
  if (level >= 50) {
    const legendary = allAchievements.find((a) => a.title === 'Legendary Hero')
    if (legendary) {
      const result = await unlockAchievement(characterId, legendary.id)
      if (result.unlocked) {
        unlockedAchievements.push({
          title: legendary.title,
          rewards: {
            gold: legendary.rewardGold,
            xp: legendary.rewardXp,
            title: legendary.rewardTitle,
          },
        })
      }
    }
  }

  return unlockedAchievements
}
