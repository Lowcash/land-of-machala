'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { playerProcedure } from '@/lib/safe-action'
import { QuestIdent } from '@prisma/client'

import * as QuestEntity from '@/entity/quest'
import * as QuestManager from '@/lib/manager/quest'
import * as RewardManager from '@/lib/manager/reward'

import { ERROR_CAUSE } from '@/config'

export const showAssigned = playerProcedure
  .createServerAction()
  .input(z.object({}).optional())
  .handler(async ({ ctx }) => {
    const assignedQuests = await QuestEntity.getAssigned(ctx.player.id, ctx.player.user_quest_id)

    if (!assignedQuests) throw new Error(ERROR_CAUSE.ENTITY_NOT_EXIST)

    return assignedQuests
  })

export const acceptSlainEnemyQuest = playerProcedure
  .createServerAction()
  .input(z.object({}).optional())
  .handler(async ({ ctx }) => {
    const [selectedQuest, assignedQuests] = await Promise.all([
      QuestEntity.get(QuestIdent.SLAIN_ENEMY),
      QuestEntity.getAssigned(ctx.player.id, ctx.player.user_quest_id),
    ])

    if (!selectedQuest || !assignedQuests) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    if ((await QuestManager.getUpdatedProgress(db, selectedQuest, assignedQuests)) !== 'READY')
      throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    await db.$transaction(async (dbTransaction) => QuestManager.accept(dbTransaction, selectedQuest, assignedQuests))
  })

export const completeSlainEnemyQuest = playerProcedure
  .createServerAction()
  .input(z.object({}).optional())
  .handler(async ({ ctx }) => {
    const [selectedQuest, assignedQuests] = await Promise.all([
      QuestEntity.get(QuestIdent.SLAIN_ENEMY),
      QuestEntity.getAssigned(ctx.player.id, ctx.player.user_quest_id),
    ])

    if (!selectedQuest || !assignedQuests) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    if ((await QuestManager.getUpdatedProgress(db, selectedQuest, assignedQuests)) !== 'COMPLETE')
      throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    await db.$transaction(async (dbTransaction) => {
      const questReward = await QuestManager.complete(dbTransaction, selectedQuest, assignedQuests)

      const preparedReward = await RewardManager.prepareReward(dbTransaction, { money: questReward.reward })

      await RewardManager.collectReward(dbTransaction, ctx.player, preparedReward)
    })
  })
