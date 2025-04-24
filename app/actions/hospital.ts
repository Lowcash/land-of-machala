'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { playerActionClient } from '@/lib/safe-action'
import { hospitalItemActionSchema, hospitalSchema } from '@/zod-schema/hospital'
import { QuestIdent } from '@prisma/client'

import * as HospitalEntity from '@/entity/hospital'
import * as InventoryEntity from '@/entity/inventory'
import * as QuestEntity from '@/entity/quest'
import * as QuestManager from '@/lib/manager/quest'
import * as RewardManager from '@/lib/manager/reward'

import { ERROR_CAUSE } from '@/config'

export const show = playerActionClient
  .metadata({ actionName: 'hospital_show' })
  .schema(hospitalSchema)
  .action(async ({ parsedInput, ctx }) => {
    const [selectedQuest, assignedQuests] = await Promise.all([
      QuestEntity.get(QuestIdent.SLAIN_ENEMY),
      QuestEntity.getAssigned(ctx.player.id, ctx.player.user_quest_id),
    ])

    if (!selectedQuest || !assignedQuests) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    const [hospital, slainEnemyQuestReward, slainEnemyQuestState] = await Promise.all([
      HospitalEntity.get(parsedInput.hospitalId),
      QuestEntity.get(QuestIdent.SLAIN_ENEMY),
      QuestManager.getUpdatedProgress(db, selectedQuest, assignedQuests),
    ])

    if (!hospital || !slainEnemyQuestState || !slainEnemyQuestReward) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    return {
      ...hospital,
      potions_hospital: hospital.potions_hospital.map((x) => ({
        ...x,
        potion: {
          ...x.potion,
          text: {
            efficiency: `+${x.potion.hp_gain} ${i18n.t('common.hp')}`,
            price: `${x.price} ${i18n.t('common.currency')}`,
          },
        },
      })),
      slainEnemyQuest: {
        state: slainEnemyQuestState,
        reward: slainEnemyQuestReward.reward_money,
      },
      text: {
        header: i18n.t('place.your_are_in', { place: hospital.name }),
        description: hospital.description,
        heal: {
          header: i18n.t('place.hospital.heal.header', {
            price: `${hospital.healing_price ?? 0} ${i18n.t('common.currency')}`,
          }),
          action: i18n.t('place.hospital.heal.action'),
          success: i18n.t('place.hospital.heal.success'),
          failure: i18n.t('place.hospital.heal.failure'),
        },
        resurrect: {
          action: i18n.t('place.hospital.resurrect.action'),
        },
        quest: {
          enemySlain: {
            description: i18n.t('quest.slain_enemy.description'),
            accept: i18n.t('quest.slain_enemy.accept'),
            complete: i18n.t('quest.slain_enemy.complete'),
            accepted: i18n.t('quest.slain_enemy.accepted'),
            completed: i18n.t('quest.slain_enemy.completed', {
              reward: `${slainEnemyQuestReward.reward_money} ${i18n.t('common.currency')}`,
            }),
            looted: i18n.t('quest.slain_enemy.looted'),
          },
        },
        potion: {
          buy: i18n.t('potion.buy'),
          buy_success: i18n.t('potion.buy_success'),
          buy_failure: i18n.t('potion.buy_failure'),
        },
      },
    }
  })

export const resurrect = playerActionClient
  .metadata({ actionName: 'hospital_resurrect' })
  .schema(hospitalSchema)
  .action(async ({ ctx }) => {
    await db.user.update({
      where: { id: ctx.user.id },
      data: { hp_actual: ctx.user.hp_max, defeated: false },
    })
  })

export const heal = playerActionClient
  .metadata({ actionName: 'hospital_heal' })
  .schema(hospitalSchema)
  .action(async ({ parsedInput, ctx }) => {
    const hospital = await HospitalEntity.get(parsedInput.hospitalId)

    if (!hospital) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    const balance = ctx.user.money - (hospital.healing_price ?? 0)

    if (balance < 0) throw new Error(ERROR_CAUSE.INSUFFICIENT_FUNDS)

    await db.user.update({
      where: { id: ctx.user.id },
      data: { money: balance, hp_actual: ctx.user.hp_max },
    })
  })

export const buyPotion = playerActionClient
  .metadata({ actionName: 'hospital_buy_potion' })
  .schema(hospitalItemActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const [hospital, inventory] = await Promise.all([
      HospitalEntity.get(parsedInput.hospitalId),
      InventoryEntity.get(ctx.player.id, ctx.player.inventory_id),
    ])

    if (!hospital || !inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    const hospitalPotion = hospital.potions_hospital.find((x) => x.potion_id === parsedInput.potionId)

    if (!hospitalPotion) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    const balance = ctx.user.money - (hospitalPotion.price ?? 0)

    if (balance < 0) throw new Error(ERROR_CAUSE.INSUFFICIENT_FUNDS)

    await db.$transaction(async (db) => {
      await db.user.update({
        where: { id: ctx.user.id },
        data: {
          money: balance,
        },
      })

      await db.potionInInventory.create({
        data: {
          potion_id: hospitalPotion.potion.id,
          inventory_id: inventory.id,
        },
      })
    })
  })

export const acceptSlainEnemyQuest = playerActionClient
  .metadata({ actionName: 'hospital_accept_slain_enemy_quest' })
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
  .metadata({ actionName: 'hospital_complete_slain_enemy_quest' })
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
