'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'
import { type QuestSchema, questSchema } from '@/zod-schema/quest'

import { ERROR_CAUSE } from '@/config'

export const showAssigned = authActionClient.metadata({ actionName: 'quest_show_assigned' }).action(async () => {
  const assignedQuests = await getAssigned().then((x) => x?.data)

  if (!assignedQuests) throw new Error(ERROR_CAUSE.ENTITY_NOT_EXIST)

  return assignedQuests
})

export const get = authActionClient
  .metadata({ actionName: 'quest_get' })
  .schema(questSchema)
  .action(async ({ parsedInput }) => {
    const quest = await db.quest.findFirst({
      where: { ident: parsedInput.ident },
    })

    if (!quest) throw new Error(ERROR_CAUSE.ENTITY_NOT_EXIST)

    return quest
  })

async function getRules({ ident }: QuestSchema) {
  const assignedQuest = await getAssigned().then((x) => x?.data)

  if (!assignedQuest) return

  switch (ident) {
    case 'SLAIN_ENEMY':
      return assignedQuest.quest_slain_enemy!.slain.actual_slain >= assignedQuest.quest_slain_enemy!.slain.desired_slain
    case 'SLAIN_TROLL':
      return assignedQuest.quest_slain_troll!.slain.actual_slain >= assignedQuest.quest_slain_troll!.slain.desired_slain
  }
}

export const getAssigned = authActionClient.metadata({ actionName: 'quest_get_assigned' }).action(async ({ ctx }) => {
  const userQuest = ctx.user.user_quest_id
    ? await db.userQuest.findFirst({
        where: { id: ctx.user.user_quest_id },
        include: {
          quest_slain_enemy: { include: { quest: true, slain: { include: { enemy: true } } } },
          quest_slain_troll: { include: { quest: true, slain: { include: { enemy: true } } } },
        },
      })
    : await db.$transaction(async (db) => {
        const userQuest = await db.userQuest.create({
          data: {},
          include: {
            quest_slain_enemy: { include: { quest: true, slain: { include: { enemy: true } } } },
            quest_slain_troll: { include: { quest: true, slain: { include: { enemy: true } } } },
          },
        })

        await db.user.update({
          where: { id: ctx.user.id },
          data: { user_quest: { connect: { id: userQuest.id } } },
        })

        return userQuest
      })

  if (!userQuest) throw new Error(ERROR_CAUSE.ENTITY_NOT_EXIST)

  return {
    ...userQuest,
    quest_slain_enemy: userQuest.quest_slain_enemy
      ? {
          ...userQuest.quest_slain_enemy,
          text: {
            description: i18n.t('quest.slain_enemy.description_short'),
            slained: i18n.t('quest.slained'),
          },
          quest: {
            ...userQuest.quest_slain_enemy.quest,
            name: i18n.t('quest.slain_enemy.header'),
          },
        }
      : undefined,
    quest_slain_troll: userQuest.quest_slain_troll
      ? {
          ...userQuest.quest_slain_troll,
          text: {
            description: i18n.t('quest.slain_troll.description_short'),
            slained: i18n.t('quest.slained'),
          },
          quest: {
            ...userQuest.quest_slain_troll.quest,
            name: i18n.t('quest.slain_troll.header'),
          },
        }
      : undefined,
  }
})

export const accept = authActionClient
  .metadata({ actionName: 'quest_accept' })
  .schema(questSchema)
  .action(async ({ parsedInput }) => {
    const [selectedQuest, assignedQuests] = await Promise.all([
      get({ ident: parsedInput.ident }).then((x) => x?.data),
      getAssigned().then((x) => x?.data),
    ])

    if (!selectedQuest || !assignedQuests) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    await db.$transaction(async (db) => {
      const slain = await db.slain.create({ data: { desired_slain: 10 } })

      switch (parsedInput.ident) {
        case 'SLAIN_ENEMY':
          const questSlainEnemy = await db.questSlainEnemy.create({
            data: { quest_id: selectedQuest.id, slain_id: slain.id },
          })

          await db.userQuest.update({
            where: { id: assignedQuests?.id },
            data: {
              quest_slain_enemy_id: questSlainEnemy.id,
              quest_slain_enemy_complete: false,
              quest_slain_enemy_done: false,
            },
          })

          break
        case 'SLAIN_TROLL':
          const questSlainTroll = await db.questSlainTroll.create({
            data: { quest_id: selectedQuest.id, slain_id: slain.id },
          })

          await db.userQuest.update({
            where: { id: assignedQuests?.id },
            data: {
              quest_slain_enemy_id: questSlainTroll.id,
              quest_slain_troll_complete: false,
              quest_slain_troll_done: false,
            },
          })

          break
      }
    })
  })

export const complete = authActionClient
  .metadata({ actionName: 'quest_complete' })
  .schema(questSchema)
  .action(async ({ parsedInput }) => {
    const userQuest = (await getAssigned())?.data

    if (!userQuest) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    let questKey: keyof typeof userQuest
    let questDoneKey: keyof typeof userQuest

    switch (parsedInput.ident) {
      case 'SLAIN_ENEMY':
        questKey = 'quest_slain_enemy'
        questDoneKey = 'quest_slain_enemy_done'
        break
      case 'SLAIN_TROLL':
        questKey = 'quest_slain_troll'
        questDoneKey = 'quest_slain_troll_done'
        break
    }

    if (!userQuest[questKey]) throw new Error(ERROR_CAUSE.ENTITY_NOT_EXIST)

    return await db.$transaction(async (db) => {
      const reward = userQuest[questKey]!.quest.reward_money

      switch (parsedInput.ident) {
        case 'SLAIN_ENEMY':
          await db.questSlainEnemy.delete({
            where: { id: userQuest[questKey]!.id },
          })
          break
        case 'SLAIN_ENEMY':
          await db.questSlainTroll.delete({
            where: { id: userQuest[questKey]!.id },
          })
          break
      }

      await db.slain.delete({
        where: { id: userQuest[questKey]!.slain_id },
      })

      await db.userQuest.update({
        where: { id: userQuest.id },
        data: { [questDoneKey]: true },
      })

      return reward
    })
  })

export const checkProgress = authActionClient
  .metadata({ actionName: 'quest_check_progress' })
  .schema(questSchema)
  .action(async ({ parsedInput }) => {
    const userQuest = (await getAssigned())?.data

    if (!userQuest) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    let questKey: keyof typeof userQuest
    let questDoneKey: keyof typeof userQuest
    let questCompleteKey: keyof typeof userQuest

    switch (parsedInput.ident) {
      case 'SLAIN_ENEMY':
        questKey = 'quest_slain_enemy'
        questDoneKey = 'quest_slain_enemy_done'
        questCompleteKey = 'quest_slain_enemy_complete'
        break
      case 'SLAIN_TROLL':
        questKey = 'quest_slain_troll'
        questDoneKey = 'quest_slain_troll_done'
        questCompleteKey = 'quest_slain_troll_complete'
        break
    }

    if (!userQuest[questKey]) return 'READY'
    if (userQuest[questDoneKey]) return 'DONE'

    const isComplete = await getRules({ ident: parsedInput.ident })

    if (isComplete) {
      await db.userQuest.update({
        where: { id: userQuest.id },
        data: { [questCompleteKey]: true },
      })
    }

    return isComplete ? 'COMPLETE' : 'PROGRESS'
  })
