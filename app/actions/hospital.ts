'use server'

import { getTranslations } from 'next-intl/server'
import { db } from '@/lib/db'
import { playerProcedure } from '@/lib/safe-action'
import { hospitalItemActionSchema, hospitalSchema } from '@/zod-schema/hospital'
import { QuestIdent } from '@prisma/client'

import * as HospitalEntity from '@/entity/hospital'
import * as InventoryEntity from '@/entity/inventory'
import * as QuestEntity from '@/entity/quest'
import * as QuestManager from '@/lib/manager/quest'

import { ERROR_CAUSE } from '@/config'

export const show = playerProcedure.createServerAction()
  .input(hospitalSchema)
  .handler(async ({ input, ctx }) => {
    const t = await getTranslations()

    const [selectedQuest, assignedQuests] = await Promise.all([
      QuestEntity.get(QuestIdent.SLAIN_ENEMY),
      QuestEntity.getAssigned(ctx.player.id, ctx.player.user_quest_id),
    ])

    if (!selectedQuest || !assignedQuests) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    const [hospital, slainEnemyQuestReward, slainEnemyQuestState] = await Promise.all([
      HospitalEntity.get(input.hospitalId),
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
            efficiency: `+${x.potion.hp_gain} ${t('common.hp')}`,
            price: `${x.price} ${t('common.currency')}`,
          },
        },
      })),
      slainEnemyQuest: {
        state: slainEnemyQuestState,
        reward: slainEnemyQuestReward.reward_money,
      },
      text: {
        header: t('place.your_are_in', { place: hospital.name }),
        description: hospital.description,
        heal: {
          header: t('place.hospital.heal.header', {
            price: `${hospital.healing_price ?? 0} ${t('common.currency')}`,
          }),
          action: t('place.hospital.heal.action'),
          success: t('place.hospital.heal.success'),
          failure: t('place.hospital.heal.failure'),
        },
        resurrect: {
          description: t('place.hospital.resurrect.description'),
          action: t('place.hospital.resurrect.action'),
          success: t('place.hospital.resurrect.success'),
        },
        quest: {
          enemySlain: {
            description: t('quest.slain_enemy.description'),
            accept: t('quest.slain_enemy.accept'),
            complete: t('quest.slain_enemy.complete'),
            accepted: t('quest.slain_enemy.accepted'),
            completed: t('quest.slain_enemy.completed', {
              reward: `${slainEnemyQuestReward.reward_money} ${t('common.currency')}`,
            }),
            looted: t('quest.slain_enemy.looted'),
          },
        },
        potion: {
          buy: t('potion.buy'),
          buy_success: t('potion.buy_success'),
          buy_failure: t('potion.buy_failure'),
        },
      },
    }
  })

export const resurrect = playerProcedure.createServerAction()
  .input(hospitalSchema)
  .handler(async ({ ctx }) => {
    await db.user.update({
      where: { id: ctx.user.id },
      data: { hp_actual: ctx.user.hp_max, defeated: false },
    })
  })

export const heal = playerProcedure.createServerAction()
  .input(hospitalSchema)
  .handler(async ({ input, ctx }) => {
    const hospital = await HospitalEntity.get(input.hospitalId)

    if (!hospital) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    const balance = ctx.user.money - (hospital.healing_price ?? 0)

    if (balance < 0) throw new Error(ERROR_CAUSE.INSUFFICIENT_FUNDS)

    await db.user.update({
      where: { id: ctx.user.id },
      data: { money: balance, hp_actual: ctx.user.hp_max },
    })
  })

export const buyPotion = playerProcedure.createServerAction()
  .input(hospitalItemActionSchema)
  .handler(async ({ input, ctx }) => {
    const [hospital, inventory] = await Promise.all([
      HospitalEntity.get(input.hospitalId),
      InventoryEntity.get(ctx.player.id, ctx.player.inventory_id),
    ])

    if (!hospital || !inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    const hospitalPotion = hospital.potions_hospital.find((x) => x.potion_id === input.potionId)

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
