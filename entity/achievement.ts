import type { AchievementCategory } from '@prisma/client'

import { prisma } from '@/lib/db'

/**
 * Achievement Entity Layer
 * Handles achievement tracking, unlocking, and progression
 */

export async function getAllAchievements(includeHidden = false) {
  return await prisma.achievement.findMany({
    where: includeHidden ? {} : { hidden: false },
    orderBy: [{ category: 'asc' }, { rarity: 'desc' }],
  })
}

export async function getAchievementsByCategory(category: AchievementCategory) {
  return await prisma.achievement.findMany({
    where: { category },
    orderBy: [{ rarity: 'desc' }],
  })
}

export async function getAchievement(id: string) {
  return await prisma.achievement.findUnique({
    where: { id },
  })
}

export async function getCharacterAchievements(characterId: string) {
  return await prisma.characterAchievement.findMany({
    where: { characterId },
    include: {
      achievement: true,
    },
    orderBy: [
      { unlocked: 'desc' },
      { achievement: { category: 'asc' } },
      { achievement: { rarity: 'desc' } },
    ],
  })
}

export async function getCharacterAchievement(characterId: string, achievementId: string) {
  return await prisma.characterAchievement.findUnique({
    where: {
      characterId_achievementId: {
        characterId,
        achievementId,
      },
    },
    include: {
      achievement: true,
    },
  })
}

export async function initializeCharacterAchievements(characterId: string) {
  const achievements = await prisma.achievement.findMany()

  const characterAchievements = achievements.map((achievement) => ({
    characterId,
    achievementId: achievement.id,
    progress: 0,
    unlocked: false,
  }))

  await prisma.characterAchievement.createMany({
    data: characterAchievements,
    skipDuplicates: true,
  })

  return await getCharacterAchievements(characterId)
}

export async function updateAchievementProgress(
  characterId: string,
  achievementId: string,
  progress: number
) {
  const characterAchievement = await prisma.characterAchievement.findUnique({
    where: {
      characterId_achievementId: {
        characterId,
        achievementId,
      },
    },
    include: {
      achievement: true,
    },
  })

  if (!characterAchievement) {
    // Create if doesn't exist
    const achievement = await prisma.achievement.findUnique({
      where: { id: achievementId },
    })

    if (!achievement) {
      throw new Error('Achievement not found')
    }

    const newProgress = Math.min(progress, achievement.maxProgress)
    const unlocked = newProgress >= achievement.maxProgress

    return await prisma.characterAchievement.create({
      data: {
        characterId,
        achievementId,
        progress: newProgress,
        unlocked,
        unlockedAt: unlocked ? new Date() : null,
      },
      include: {
        achievement: true,
      },
    })
  }

  if (characterAchievement.unlocked) {
    // Already unlocked, don't update
    return characterAchievement
  }

  const newProgress = Math.min(progress, characterAchievement.achievement.maxProgress)
  const unlocked = newProgress >= characterAchievement.achievement.maxProgress

  return await prisma.characterAchievement.update({
    where: {
      characterId_achievementId: {
        characterId,
        achievementId,
      },
    },
    data: {
      progress: newProgress,
      unlocked,
      unlockedAt: unlocked ? new Date() : null,
    },
    include: {
      achievement: true,
    },
  })
}

export async function incrementAchievementProgress(
  characterId: string,
  achievementId: string,
  amount = 1
) {
  const characterAchievement = await prisma.characterAchievement.findUnique({
    where: {
      characterId_achievementId: {
        characterId,
        achievementId,
      },
    },
    include: {
      achievement: true,
    },
  })

  if (!characterAchievement) {
    return await updateAchievementProgress(characterId, achievementId, amount)
  }

  if (characterAchievement.unlocked) {
    return characterAchievement
  }

  const newProgress = Math.min(
    characterAchievement.progress + amount,
    characterAchievement.achievement.maxProgress
  )

  return await updateAchievementProgress(characterId, achievementId, newProgress)
}

export async function unlockAchievement(characterId: string, achievementId: string) {
  const achievement = await prisma.achievement.findUnique({
    where: { id: achievementId },
  })

  if (!achievement) {
    throw new Error('Achievement not found')
  }

  const existingCharacterAchievement = await prisma.characterAchievement.findUnique({
    where: {
      characterId_achievementId: {
        characterId,
        achievementId,
      },
    },
  })

  if (existingCharacterAchievement) {
    if (existingCharacterAchievement.unlocked) {
      return existingCharacterAchievement
    }

    return await prisma.characterAchievement.update({
      where: {
        characterId_achievementId: {
          characterId,
          achievementId,
        },
      },
      data: {
        progress: achievement.maxProgress,
        unlocked: true,
        unlockedAt: new Date(),
      },
      include: {
        achievement: true,
      },
    })
  }

  return await prisma.characterAchievement.create({
    data: {
      characterId,
      achievementId,
      progress: achievement.maxProgress,
      unlocked: true,
      unlockedAt: new Date(),
    },
    include: {
      achievement: true,
    },
  })
}
