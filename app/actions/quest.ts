'use server'

import { db } from '@/lib/db'
import { playerActionClient } from '@/lib/safe-action'
import { QuestIdent } from '@prisma/client'

import * as QuestEntity from '@/entity/quest'
import * as QuestManager from '@/lib/manager/quest'
import * as RewardManager from '@/lib/manager/reward'

import { ERROR_CAUSE } from '@/config'

export const showAssigned = playerActionClient
  .metadata({ actionName: 'quest_show_assigned' })
  .action(async ({ ctx }) => {
    const assignedQuests = await QuestEntity.getAssigned(ctx.player.id, ctx.player.user_quest_id)

    if (!assignedQuests) throw new Error(ERROR_CAUSE.ENTITY_NOT_EXIST)

    return assignedQuests
  })

export const acceptSlainEnemyQuest = playerActionClient
  .metadata({ actionName: 'quest_accept_slain_enemy' })
  .action(async ({ ctx }) => {
    const [selectedQuest, assignedQuests] = await Promise.all([
      QuestEntity.get(QuestIdent.SLAIN_ENEMY),
      QuestEntity.getAssigned(ctx.player.id, ctx.player.user_quest_id),
    ])
    
    if (!selectedQuest || !assignedQuests) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    if ((await QuestManager.getUpdatedProgress(db, selectedQuest, assignedQuests)) !== 'READY')
      throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    await db.$transaction(async (dbTransaction) => QuestManager.accept(dbTransaction, selectedQuest, assignedQuests))
  })

export const completeSlainEnemyQuest = playerActionClient
  .metadata({ actionName: 'quest_complete_slain_enemy' })
  .action(async ({ ctx }) => {
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
