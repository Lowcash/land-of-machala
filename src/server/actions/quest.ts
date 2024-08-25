'use server'

import { db } from '../db'
import { getTRPCErrorFromUnknown } from '@trpc/server'

import { ERROR_CAUSE } from '@/const'
import { QuestIdent } from '@prisma/client'
import { getPlayer } from './player'
import { enemyEmitter } from './_game'

type State = 'WAITING' | 'READY' | 'PROGRESS' | 'COMPLETE' | 'DONE'

export async function getQuest(ident: QuestIdent) {
  const quest = await db.quest.findFirst({
    where: { ident },
  })

  if (!quest) throw getTRPCErrorFromUnknown(ERROR_CAUSE.ENTITY_NOT_EXIST)

  return quest
}

export async function getUserQuests() {
  const player = await getPlayer()

  let userQuest = await db.userQuest.findFirst({
    where: { id: player.user_quest_id ?? -1 },
    include: {
      quest_slain_enemy: { include: { quest: true, slain: { include: { enemy: true } } } },
      quest_slain_troll: { include: { quest: true, slain: { include: { enemy: true } } } },
    },
  })

  if (!userQuest) {
    userQuest = await db.$transaction(async (db) => {
      const userQuest = await db.userQuest.create({
        data: {},
        include: {
          quest_slain_enemy: { include: { quest: true, slain: { include: { enemy: true } } } },
          quest_slain_troll: { include: { quest: true, slain: { include: { enemy: true } } } },
        },
      })

      await db.user.update({
        where: { id: player.id },
        data: { user_quest: { connect: { id: userQuest.id } } },
      })

      return userQuest
    })
  }

  if (!userQuest) throw getTRPCErrorFromUnknown(ERROR_CAUSE.ENTITY_NOT_EXIST)

  return userQuest
}

async function rules(ident: QuestIdent) {
  const userQuest = await getUserQuests()

  switch (ident) {
    case 'SLAIN_ENEMY':
      return userQuest.quest_slain_enemy!.slain.actual_slain >= userQuest.quest_slain_enemy!.slain.desired_slain
    case 'SLAIN_TROLL':
      return userQuest.quest_slain_troll!.slain.actual_slain >= userQuest.quest_slain_troll!.slain.desired_slain
  }
}

export async function acceptQuest(ident: QuestIdent) {
  const quest = await getQuest(ident)
  const userQuest = await getUserQuests()

  await db.$transaction(async (db) => {
    const slain = await db.slain.create({ data: { desired_slain: 10 } })

    switch (ident) {
      case 'SLAIN_ENEMY':
        const questSlainEnemy = await db.questSlainEnemy.create({ data: { quest_id: quest.id, slain_id: slain.id } })

        await db.userQuest.update({
          where: { id: userQuest.id },
          data: {
            quest_slain_enemy_id: questSlainEnemy.id,
            quest_slain_enemy_complete: false,
            quest_slain_enemy_done: false,
          },
        })

        break
      case 'SLAIN_TROLL':
        const questSlainTroll = await db.questSlainTroll.create({ data: { quest_id: quest.id, slain_id: slain.id } })

        await db.userQuest.update({
          where: { id: userQuest.id },
          data: {
            quest_slain_enemy_id: questSlainTroll.id,
            quest_slain_troll_complete: false,
            quest_slain_troll_done: false,
          },
        })

        break
    }
  })
}

export async function completeQuest(ident: QuestIdent) {
  const userQuest = await getUserQuests()

  let questKey: keyof typeof userQuest
  let questDoneKey: keyof typeof userQuest

  switch (ident) {
    case 'SLAIN_ENEMY':
      questKey = 'quest_slain_enemy'
      questDoneKey = 'quest_slain_enemy_done'
      break
    case 'SLAIN_TROLL':
      questKey = 'quest_slain_troll'
      questDoneKey = 'quest_slain_troll_done'
      break
  }

  if (!userQuest[questKey]) throw getTRPCErrorFromUnknown(ERROR_CAUSE.ENTITY_NOT_EXIST)

  return await db.$transaction(async (db) => {
    const reward = userQuest[questKey]!.quest.money

    switch (ident) {
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
}

export async function checkQuestProgress(ident: QuestIdent): Promise<State> {
  const userQuest = await getUserQuests()

  let questKey: keyof typeof userQuest
  let questDoneKey: keyof typeof userQuest
  let questCompleteKey: keyof typeof userQuest
  switch (ident) {
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

  const isComplete = await rules(ident)

  if (isComplete) {
    await db.userQuest.update({
      where: { id: userQuest.id },
      data: { [questCompleteKey]: true },
    })
  }

  return isComplete ? 'COMPLETE' : 'PROGRESS'
}

enemyEmitter.on('defeated', async (enemy) => {
  const userQuest = await getUserQuests()

  if (!!userQuest.quest_slain_enemy) {
    const actualSlain = userQuest.quest_slain_enemy.slain.actual_slain
    const desiredSlain = userQuest.quest_slain_enemy.slain.desired_slain

    if (actualSlain >= desiredSlain) return

    await db.slain.update({
      where: { id: userQuest.quest_slain_enemy.slain.id },
      data: { actual_slain: actualSlain + 1 },
    })

    await checkQuestProgress('SLAIN_ENEMY')
  }
  if (!!userQuest.quest_slain_troll) {
    if (enemy.name !== 'troll') return

    const actualSlain = userQuest.quest_slain_troll.slain.actual_slain
    const desiredSlain = userQuest.quest_slain_troll.slain.desired_slain

    if (actualSlain >= desiredSlain) return

    await db.slain.update({
      where: { id: userQuest.quest_slain_troll.slain.id },
      data: { actual_slain: actualSlain + 1 },
    })

    await checkQuestProgress('SLAIN_TROLL')
  }
})
