'use server'

import { addExperience, getCharacter, updateCharacterResources } from '@/entity/character'
import { addItem } from '@/entity/inventory'
import {
  abandonQuest,
  completeQuest,
  getAllQuests,
  getCharacterQuest,
  getCharacterQuests,
  startQuest,
  updateQuestObjectiveProgress,
} from '@/entity/quest'
import { auth } from '@/lib/auth'
import { QuestStatus } from '@prisma/client'
import { z } from 'zod'
import { createServerAction } from 'zsa'

const getCharacterQuestsSchema = z.object({
  characterId: z.string(),
  status: z.enum(['AVAILABLE', 'ACTIVE', 'COMPLETED', 'FAILED']).optional(),
})

const startQuestSchema = z.object({
  characterId: z.string(),
  questId: z.string(),
})

const updateObjectiveSchema = z.object({
  characterId: z.string(),
  questId: z.string(),
  objectiveId: z.string(),
  progress: z.number().int().min(0),
})

const completeQuestSchema = z.object({
  characterId: z.string(),
  questId: z.string(),
})

const abandonQuestSchema = z.object({
  characterId: z.string(),
  questId: z.string(),
})

export const getAllQuestsAction = createServerAction().handler(async () => {
  const quests = await getAllQuests()
  return { quests }
})

export const getCharacterQuestsAction = createServerAction()
  .input(getCharacterQuestsSchema)
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

    const quests = await getCharacterQuests(
      input.characterId,
      input.status as QuestStatus | undefined
    )

    return { quests }
  })

export const startQuestAction = createServerAction()
  .input(startQuestSchema)
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

    const existing = await getCharacterQuest(input.characterId, input.questId)
    if (existing) {
      throw new Error('Quest already started')
    }

    const characterQuest = await startQuest(input.characterId, input.questId)

    return { quest: characterQuest }
  })

export const updateQuestObjectiveAction = createServerAction()
  .input(updateObjectiveSchema)
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

    const updated = await updateQuestObjectiveProgress(
      input.characterId,
      input.questId,
      input.objectiveId,
      input.progress
    )

    return { quest: updated }
  })

export const completeQuestAction = createServerAction()
  .input(completeQuestSchema)
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

    const characterQuest = await getCharacterQuest(input.characterId, input.questId)

    if (!characterQuest) {
      throw new Error('Quest not found')
    }

    if (characterQuest.status !== 'COMPLETED') {
      throw new Error('Quest objectives not completed')
    }

    const quest = characterQuest.quest

    if (quest.rewardGold > 0) {
      await updateCharacterResources(input.characterId, {
        gold: character.gold + quest.rewardGold,
      })
    }

    if (quest.rewardXp > 0) {
      await addExperience(input.characterId, quest.rewardXp)
    }

    if (quest.rewards && quest.rewards.length > 0) {
      for (const reward of quest.rewards) {
        if (reward.itemId) {
          await addItem(input.characterId, reward.itemId, reward.quantity)
        }
      }
    }

    const completed = await completeQuest(input.characterId, input.questId)

    return {
      quest: completed,
      rewards: {
        gold: quest.rewardGold,
        xp: quest.rewardXp,
        items: quest.rewards,
      },
    }
  })

export const abandonQuestAction = createServerAction()
  .input(abandonQuestSchema)
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

    await abandonQuest(input.characterId, input.questId)

    return { success: true }
  })
