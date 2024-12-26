'use server'

import { z } from 'zod'
import { db } from '@/server/db'
import { protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'

import * as PlayerAction from './player'
import * as InventoryAction from './inventory'
import * as QuestAction from './quest'
import * as GameAction from './game'

import { ERROR_CAUSE } from '@/const'

export const get = protectedAction.input(z.object({ hospitalId: z.string() })).query(async ({ input }) => {
  const hospital = await db.hospital.findFirst({
    where: { id: input.hospitalId },
    include: {
      potions_hospital: { include: { potion: true } },
    },
  })

  if (!hospital) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  return hospital
})

export const show = protectedAction.input(z.object({ hospitalId: z.string() })).query(async ({ input }) => {
  const hospital = await get({ hospitalId: input.hospitalId })

  return {
    ...hospital,
    slainEnemyQuest: {
      state: await QuestAction.checkProgress('SLAIN_ENEMY'),
      reward: (await QuestAction.get('SLAIN_ENEMY')).money,
    },
  }
})

export const resurect = protectedAction.mutation(async () => {
  const player = await PlayerAction.get()

  await db.user.update({
    where: { id: player.id },
    data: { hp_actual: player.hp_max, defeated: false },
  })
})

export const heal = protectedAction.input(z.object({ hospitalId: z.string() })).mutation(async ({ input }) => {
  const [player, hospital] = await Promise.all([PlayerAction.get(), get({ hospitalId: input.hospitalId })])

  const balance = player.money - (hospital.price ?? 0)

  if (balance < 0) throw getTRPCErrorFromUnknown(ERROR_CAUSE.INSUFFICIENT_FUNDS)

  await db.user.update({
    where: { id: player.id },
    data: { money: balance, hp_actual: player.hp_max },
  })
})

export const buyPotion = protectedAction
  .input(z.object({ hospitalId: z.string(), potionId: z.number() }))
  .mutation(async ({ input }) => {
    const [player, hospital] = await Promise.all([PlayerAction.get(), get({ hospitalId: input.hospitalId })])

    const hospitalPotion = hospital.potions_hospital.find((x) => x.potion_id === input.potionId)

    if (!hospitalPotion) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

    const balance = player.money - (hospitalPotion.price ?? 0)

    if (balance < 0) throw getTRPCErrorFromUnknown(ERROR_CAUSE.INSUFFICIENT_FUNDS)

    await db.$transaction(async (db) => {
      await db.user.update({
        where: { id: player.id },
        data: {
          money: balance,
        },
      })

      await db.potionInInventory.create({
        data: {
          potion_id: hospitalPotion.potion.id,
          inventory_id: (await InventoryAction.get()).id,
        },
      })
    })
  })

export const acceptSlainEnemyQuest = protectedAction.mutation(async () => {
  if ((await QuestAction.checkProgress('SLAIN_ENEMY')) !== 'READY')
    throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  await QuestAction.accept('SLAIN_ENEMY')
})

export const completeSlainEnemyQuest = protectedAction.mutation(async () => {
  if ((await QuestAction.checkProgress('SLAIN_ENEMY')) !== 'COMPLETE')
    throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  await GameAction.collectReward(db, { money: await QuestAction.complete('SLAIN_ENEMY') })
})
