import { QuestIdent } from '@prisma/client'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'
import { enemyEmitter } from './game'
import type { TRPCContext } from '../trpc'

import { ERROR_CAUSE } from '@/const'

type State = 'WAITING' | 'READY' | 'PROGRESS' | 'COMPLETE' | 'DONE'

export default createTRPCRouter({
  show: protectedProcedure.query(async ({ ctx }) => await getUserQuest(ctx)),
})

async function rules(ctx: TRPCContext, ident: QuestIdent) {
  const userQuest = await getUserQuest(ctx)

  switch (ident) {
    case 'SLAIN_ENEMY':
      return userQuest.quest_slain_enemy!.slain.actual_slain >= userQuest.quest_slain_enemy!.slain.desired_slain
    case 'SLAIN_TROLL':
      return userQuest.quest_slain_troll!.slain.actual_slain >= userQuest.quest_slain_troll!.slain.desired_slain
  }
}

export async function acceptQuest(ctx: TRPCContext, ident: QuestIdent) {
  const quest = await getQuest(ctx, ident)
  const userQuest = await getUserQuest(ctx)

  await ctx.db.$transaction(async (db) => {
    const _slain = await db.slain.create({ data: { desired_slain: 10 } })

    switch (ident) {
      case 'SLAIN_ENEMY':
        const _questSlainEnemy = await db.questSlainEnemy.create({ data: { quest_id: quest.id, slain_id: _slain.id } })

        await db.userQuest.update({
          where: { id: userQuest.id },
          data: { quest_slain_enemy_id: _questSlainEnemy.id },
        })

        break
      case 'SLAIN_TROLL':
        const _questSlainTroll = await db.questSlainTroll.create({ data: { quest_id: quest.id, slain_id: _slain.id } })

        await db.userQuest.update({
          where: { id: userQuest.id },
          data: { quest_slain_enemy_id: _questSlainTroll.id },
        })

        break
    }
  })
}

export async function completeQuest(ctx: TRPCContext, ident: QuestIdent) {
  const userQuest = await getUserQuest(ctx)

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

  return await ctx.db.$transaction(async (db) => {
    const reward = userQuest[questKey]!.quest.money

    await db.slain.delete({
      where: { id: userQuest[questKey]!.slain_id },
    })

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

    await db.userQuest.update({
      where: { id: userQuest.id },
      data: { [questDoneKey]: true },
    })

    return reward
  })
}

export async function checkQuestProgress(ctx: TRPCContext, ident: QuestIdent): Promise<State> {
  const userQuest = await getUserQuest(ctx)

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

  if (!userQuest[questKey]) return 'READY'
  if (userQuest[questDoneKey]) return 'DONE'

  return (await rules(ctx, ident)) ? 'COMPLETE' : 'PROGRESS'
}

enemyEmitter.on('defeated', async ({ ctx, ...enemy }) => {
  const userQuest = await getUserQuest(ctx)

  if (!!userQuest.quest_slain_enemy) {
    const actualSlain = userQuest.quest_slain_enemy.slain.actual_slain

    await ctx.db.slain.update({
      where: { id: userQuest.quest_slain_enemy.slain.id },
      data: { actual_slain: actualSlain + 1 },
    })
  }
  if (!!userQuest.quest_slain_troll) {
    if (enemy.name !== 'troll') return

    const actualSlain = userQuest.quest_slain_troll.slain.actual_slain

    await ctx.db.slain.update({
      where: { id: userQuest.quest_slain_troll.slain.id },
      data: { actual_slain: actualSlain + 1 },
    })
  }
})

export async function getQuest(ctx: TRPCContext, ident: QuestIdent) {
  const quest = await ctx.db.quest.findFirst({
    where: { ident },
  })

  if (!quest) throw getTRPCErrorFromUnknown(ERROR_CAUSE.ENTITY_NOT_EXIST)

  return quest
}

export async function getUserQuest(ctx: TRPCContext) {
  if (!ctx.session?.user) throw new Error('User does not exist!')

  let userQuest = await ctx.db.userQuest.findFirst({
    where: { id: ctx.session.user.user_quest_id ?? -1 },
    include: {
      quest_slain_enemy: { include: { quest: true, slain: { include: { enemy: true } } } },
      quest_slain_troll: { include: { quest: true, slain: { include: { enemy: true } } } },
    },
  })

  if (!userQuest) {
    userQuest = await ctx.db.$transaction(async (db) => {
      const _userQuest = await db.userQuest.create({
        data: {},
        include: {
          quest_slain_enemy: { include: { quest: true, slain: { include: { enemy: true } } } },
          quest_slain_troll: { include: { quest: true, slain: { include: { enemy: true } } } },
        },
      })

      await db.user.update({
        where: { id: ctx.session!.user.id },
        data: { user_quest: { connect: { id: _userQuest.id } } },
      })

      return _userQuest
    })
  }

  if (!userQuest) throw getTRPCErrorFromUnknown(ERROR_CAUSE.ENTITY_NOT_EXIST)

  return userQuest
}
