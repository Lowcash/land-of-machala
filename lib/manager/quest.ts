import 'server-only'

import { type Enemy, EnemyIdent, QuestIdent, type Prisma, PrismaClient } from '@prisma/client'

import * as EnemyEntity from '@/entity/enemy'
import * as QuestEntity from '@/entity/quest'
import * as PlayerEntity from '@/entity/player'

export async function accept(
  dbTransaction: Prisma.TransactionClient,
  selectedQuest: QuestEntity.QuestEntity,
  assignedQuests: QuestEntity.QuestAssignedEntity,
) {
  switch (selectedQuest.ident) {
    case QuestIdent.SLAIN_ENEMY: {
      const slain = await dbTransaction.slain.create({ data: { desired_slain: 10 } })

      const questSlainEnemy = await dbTransaction.questSlainEnemy.create({
        data: { quest_id: selectedQuest.id, slain_id: slain.id },
      })

      await dbTransaction.userQuest.update({
        where: { id: assignedQuests.id },
        data: {
          quest_slain_enemy_id: questSlainEnemy.id,
          quest_slain_enemy_complete: false,
          quest_slain_enemy_done: false,
        },
      })

      break
    }
    case QuestIdent.SLAIN_TROLL: {
      const troll = await EnemyEntity.get(EnemyIdent.HILL_TROLL)

      if (!troll) return

      const slain = await dbTransaction.slain.create({ data: { desired_slain: 10, enemy_id: troll.id } })

      const questSlainTroll = await dbTransaction.questSlainTroll.create({
        data: { quest_id: selectedQuest.id, slain_id: slain.id },
      })

      await dbTransaction.userQuest.update({
        where: { id: assignedQuests.id },
        data: {
          quest_slain_enemy_id: questSlainTroll.id,
          quest_slain_troll_complete: false,
          quest_slain_troll_done: false,
        },
      })

      break
    }
  }
}

export async function complete(
  dbTransaction: Prisma.TransactionClient,
  selectedQuest: QuestEntity.QuestEntity,
  assignedQuests: QuestEntity.QuestAssignedEntity,
) {
  let questKey: keyof typeof assignedQuests
  let questDoneKey: keyof typeof assignedQuests

  switch (selectedQuest.ident) {
    case QuestIdent.SLAIN_ENEMY:
      questKey = 'quest_slain_enemy'
      questDoneKey = 'quest_slain_enemy_done'
      break
    case QuestIdent.SLAIN_TROLL:
      questKey = 'quest_slain_troll'
      questDoneKey = 'quest_slain_troll_done'
      break
  }

  const reward = assignedQuests[questKey]!.quest.reward_money

  switch (selectedQuest.ident) {
    case QuestIdent.SLAIN_ENEMY:
      await dbTransaction.questSlainEnemy.delete({
        where: { id: assignedQuests[questKey]!.id },
      })
      break
    case QuestIdent.SLAIN_TROLL:
      await dbTransaction.questSlainTroll.delete({
        where: { id: assignedQuests[questKey]!.id },
      })
      break
  }

  await dbTransaction.slain.delete({
    where: { id: assignedQuests[questKey]!.slain_id },
  })

  await dbTransaction.userQuest.update({
    where: { id: assignedQuests.id },
    data: { [questDoneKey]: true },
  })

  return { reward }
}

export async function getUpdatedProgress(
  dbTransaction: Prisma.TransactionClient,
  selectedQuest: QuestEntity.QuestEntity,
  assignedQuests: QuestEntity.QuestAssignedEntity,
) {
  let questKey: keyof typeof assignedQuests
  let questDoneKey: keyof typeof assignedQuests
  let questCompleteKey: keyof typeof assignedQuests

  switch (selectedQuest.ident) {
    case QuestIdent.SLAIN_ENEMY:
      questKey = 'quest_slain_enemy'
      questDoneKey = 'quest_slain_enemy_done'
      questCompleteKey = 'quest_slain_enemy_complete'
      break
    case QuestIdent.SLAIN_TROLL:
      questKey = 'quest_slain_troll'
      questDoneKey = 'quest_slain_troll_done'
      questCompleteKey = 'quest_slain_troll_complete'
      break
  }

  if (!assignedQuests[questKey]) return 'READY'
  if (assignedQuests[questDoneKey]) return 'DONE'

  let isComplete = false

  switch (selectedQuest.ident) {
    case QuestIdent.SLAIN_ENEMY: {
      isComplete =
        assignedQuests.quest_slain_enemy!.slain.actual_slain >= assignedQuests.quest_slain_enemy!.slain.desired_slain
      break
    }
    case QuestIdent.SLAIN_TROLL: {
      isComplete =
        assignedQuests.quest_slain_troll!.slain.actual_slain >= assignedQuests.quest_slain_troll!.slain.desired_slain
      break
    }
  }

  if (isComplete) {
    await dbTransaction.userQuest.update({
      where: { id: assignedQuests.id },
      data: { [questCompleteKey]: true },
    })
  }

  return isComplete ? 'COMPLETE' : 'PROGRESS'
}

export async function updateState(
  dbOrDbTransaction: PrismaClient | Prisma.TransactionClient,
  player: PlayerEntity.PlayerEntity,
  data: {
    slainedEnemy?: Enemy
  },
) {
  const userQuest = await QuestEntity.getAssigned(player.id, player.user_quest_id)

  if (!userQuest) return

  if (!!userQuest.quest_slain_enemy) {
    const quest = await QuestEntity.get(QuestIdent.SLAIN_ENEMY)

    if (!quest) return

    const actualSlain = userQuest.quest_slain_enemy.slain.actual_slain
    const desiredSlain = userQuest.quest_slain_enemy.slain.desired_slain

    if (actualSlain >= desiredSlain) return

    await dbOrDbTransaction.slain.update({
      where: { id: userQuest.quest_slain_enemy.slain.id },
      data: { actual_slain: actualSlain + 1 },
    })

    await getUpdatedProgress(dbOrDbTransaction, quest, userQuest)
  }
  if (!!userQuest.quest_slain_troll) {
    if (data.slainedEnemy?.id !== EnemyIdent.HILL_TROLL) return

    const quest = await QuestEntity.get(QuestIdent.SLAIN_TROLL)

    if (!quest) return

    const actualSlain = userQuest.quest_slain_troll.slain.actual_slain
    const desiredSlain = userQuest.quest_slain_troll.slain.desired_slain

    if (actualSlain >= desiredSlain) return

    await dbOrDbTransaction.slain.update({
      where: { id: userQuest.quest_slain_troll.slain.id },
      data: { actual_slain: actualSlain + 1 },
    })

    await getUpdatedProgress(dbOrDbTransaction, quest, userQuest)
  }
}
