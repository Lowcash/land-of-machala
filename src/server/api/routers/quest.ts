import { QuestIdent } from '@prisma/client'
import type { TRPCContext } from '../trpc'

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

export async function checkQuest(ctx: TRPCContext, ident: QuestIdent) {
  const userQuest = await getUserQuest(ctx)

  switch (ident) {
    case 'SLAIN_ENEMY':
      if (!userQuest.quest_slain_enemy) return false

      return userQuest.quest_slain_enemy?.slain.actual_slain >= userQuest.quest_slain_enemy?.slain.desired_slain
    case 'SLAIN_TROLL':
      if (!userQuest.quest_slain_troll) return false

      return userQuest.quest_slain_troll?.slain.actual_slain >= userQuest.quest_slain_troll?.slain.desired_slain
  }
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

  if (!userQuest) throw new Error('User quest does not exist!')

  return userQuest
}

export async function getQuest(ctx: TRPCContext, ident: QuestIdent) {
  const quest = await ctx.db.quest.findFirst({
    where: { ident },
  })

  if (!quest) throw new Error('Quest does not exist!')

  return quest
}
