'use server'

import { addExperience, updateCharacterResources } from '@/entity/character'
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
import type { QuestStatus } from '@prisma/client'

import { checkLevelAchievements, checkQuestAchievements } from '@/lib/actions/achievement'
import { prisma } from '@/lib/db'
import {
  abandonQuestSchema,
  completeQuestSchema,
  getCharacterQuestsSchema,
  startQuestSchema,
  updateObjectiveSchema,
} from '@/lib/schemas/quest'

import { characterProcedure } from './procedures'

/**
 * Actions for quest management.
 */

export const getAllQuestsAction = characterProcedure.createServerAction().handler(async () => {
  const quests = await getAllQuests()
  return { quests }
})

export const getCharacterQuestsAction = characterProcedure
  .createServerAction()
  .input(getCharacterQuestsSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    const quests = await getCharacterQuests(character.id, input.status as QuestStatus | undefined)
    return { quests }
  })

export const startQuestAction = characterProcedure
  .createServerAction()
  .input(startQuestSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const existing = await getCharacterQuest(character.id, input.questId)
    if (existing) {
      return { success: false, message: 'Tento úkol už máš v deníku.' }
    }

    const characterQuest = await startQuest(character.id, input.questId)
    return { success: true, quest: characterQuest, message: 'Úkol byl přijat.' }
  })

export const updateQuestObjectiveAction = characterProcedure
  .createServerAction()
  .input(updateObjectiveSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const updated = await updateQuestObjectiveProgress(
      character.id,
      input.questId,
      input.objectiveId,
      input.progress
    )

    return { success: true, quest: updated }
  })

export const completeQuestAction = characterProcedure
  .createServerAction()
  .input(completeQuestSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const characterQuest = await getCharacterQuest(character.id, input.questId)

    if (!characterQuest) {
      return { success: false, message: 'Úkol nebyl nalezen.' }
    }

    if (characterQuest.status !== 'COMPLETED') {
      return { success: false, message: 'Cíle úkolu ještě nejsou splněny.' }
    }

    const quest = characterQuest.quest

    // Award rewards
    if (quest.rewardGold > 0) {
      await updateCharacterResources(character.id, {
        gold: character.gold + quest.rewardGold,
      })
    }

    if (quest.rewardXp > 0) {
      await addExperience(character.id, quest.rewardXp)
    }

    if (quest.rewards && quest.rewards.length > 0) {
      for (const reward of quest.rewards) {
        if (reward.itemId) {
          await addItem(character.id, reward.itemId, reward.quantity)
        }
      }
    }

    const completed = await completeQuest(character.id, input.questId)

    // Check achievements
    const allCharacterQuests = await getCharacterQuests(character.id, 'COMPLETED')
    const questsCompletedCount = allCharacterQuests.length

    const questAchievements = await checkQuestAchievements(character.id, questsCompletedCount)

    // Check level achievements (character might have leveled up from rewards)
    const updatedCharacter = await prisma.character.findUnique({ where: { id: character.id } })
    const levelAchievements = updatedCharacter
      ? await checkLevelAchievements(character.id, updatedCharacter.level)
      : []

    return {
      success: true,
      message: 'Úkol byl úspěšně dokončen! Získal jsi odměny.',
      quest: completed,
      rewards: {
        gold: quest.rewardGold,
        xp: quest.rewardXp,
        items: quest.rewards,
      },
      achievements: [...questAchievements, ...levelAchievements],
    }
  })

export const abandonQuestAction = characterProcedure
  .createServerAction()
  .input(abandonQuestSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    await abandonQuest(character.id, input.questId)

    return { success: true, message: 'Úkol byl opuštěn.' }
  })
