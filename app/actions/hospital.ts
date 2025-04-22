'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'
import { hospitalItemActionSchema, hospitalSchema } from '@/zod-schema/hospital'

import * as InventoryAction from './inventory'
import * as QuestAction from './quest'
import * as GameAction from './game'

import { ERROR_CAUSE } from '@/config'

export const show = authActionClient
  .metadata({ actionName: 'hospital_show' })
  .schema(hospitalSchema)
  .action(async ({ parsedInput }) => {
    const [hospital, slainEnemyQuestState, slainEnemyQuestReward] = await Promise.all([
      get({ hospitalId: parsedInput.hospitalId }).then((x) => x?.data),
      QuestAction.checkProgress({ ident: 'SLAIN_ENEMY' }).then((x) => x?.data),
      QuestAction.get({ ident: 'SLAIN_ENEMY' }).then((x) => x?.data),
    ])

    if (!hospital || !slainEnemyQuestState || !slainEnemyQuestReward) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    return {
      ...hospital,
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

export const get = authActionClient
  .metadata({ actionName: 'hospital_get' })
  .schema(hospitalSchema)
  .action(async ({ parsedInput }) => {
    const hospital = await db.hospital.findFirst({
      where: { id: parsedInput.hospitalId },
      include: {
        potions_hospital: { include: { potion: true } },
      },
    })

    if (!hospital) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    return {
      ...hospital,
      name: i18n.t(`${hospital.i18n_key}.header` as any),
      description: i18n.t(`${hospital.i18n_key}.description` as any),
      potions_hospital: hospital.potions_hospital.map((x) => ({
        ...x,
        potion: {
          ...x.potion,
          name: '',
          text: {
            efficiency: `+${x.potion.hp_gain} ${i18n.t('common.hp')}`,
            price: `${x.price} ${i18n.t('common.currency')}`,
          },
        },
      })),
    }
  })

export const resurrect = authActionClient
  .metadata({ actionName: 'hospital_resurrect' })
  .schema(hospitalSchema)
  .action(async ({ ctx }) => {
    await db.user.update({
      where: { id: ctx.user.id },
      data: { hp_actual: ctx.user.hp_max, defeated: false },
    })
  })

export const heal = authActionClient
  .metadata({ actionName: 'hospital_heal' })
  .schema(hospitalSchema)
  .action(async ({ parsedInput, ctx }) => {
    const hospital = (await get({ hospitalId: parsedInput.hospitalId }))?.data

    if (!hospital) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    const balance = ctx.user.money - (hospital.healing_price ?? 0)

    if (balance < 0) throw new Error(ERROR_CAUSE.INSUFFICIENT_FUNDS)

    await db.user.update({
      where: { id: ctx.user.id },
      data: { money: balance, hp_actual: ctx.user.hp_max },
    })
  })

export const buyPotion = authActionClient
  .metadata({ actionName: 'hospital_buyPotion' })
  .schema(hospitalItemActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const [hospital, inventory] = await Promise.all([
      get({ hospitalId: parsedInput.hospitalId }).then((x) => x?.data),
      InventoryAction.get().then((x) => x?.data),
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

export const acceptSlainEnemyQuest = authActionClient
  .metadata({ actionName: 'hospital_acceptSlainEnemyQuest' })
  .action(async () => {
    if ((await QuestAction.checkProgress({ ident: 'SLAIN_ENEMY' }))?.data !== 'READY')
      throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    await QuestAction.accept({ ident: 'SLAIN_ENEMY' })
  })

export const completeSlainEnemyQuest = authActionClient
  .metadata({ actionName: 'hospital_completeSlainEnemyQuest' })
  .action(async () => {
    if ((await QuestAction.checkProgress({ ident: 'SLAIN_ENEMY' }))?.data !== 'COMPLETE')
      throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    await GameAction.collectReward(db, { money: (await QuestAction.complete({ ident: 'SLAIN_ENEMY' }))?.data! })
  })
