'use server'

import { z } from 'zod'
import { db } from '../db'
import { cache } from 'react'
import { protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'
import { getPlayer } from './player'
import { getInventory } from './inventory'
import { acceptQuest, checkQuestProgress, completeQuest, getQuest } from './quest'
import { collectReward } from './game'

import { ERROR_CAUSE } from '@/const'

export const getHospital = cache(
  protectedAction.input(z.object({ hospitalId: z.string() })).query(async ({ input }) => {
    const hospital = await db.hospital.findFirst({
      where: { id: input.hospitalId },
      include: {
        potions_hospital: { include: { potion: true } },
      },
    })

    if (!hospital) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

    return hospital
  }),
)

export const showHospital = cache(
  protectedAction.input(z.object({ hospitalId: z.string() })).query(async ({ input }) => {
    const hospital = await getHospital({ hospitalId: input.hospitalId })

    return {
      ...hospital,
      slainEnemyQuest: {
        state: await checkQuestProgress('SLAIN_ENEMY'),
        reward: (await getQuest('SLAIN_ENEMY')).money,
      },
    }
  }),
)

export const resurect = protectedAction.mutation(async () => {
  const player = await getPlayer()

  await db.user.update({
    where: { id: player.id },
    data: { hp_actual: player.hp_max, defeated: false },
  })
})

export const heal = protectedAction.input(z.object({ hospitalId: z.string() })).mutation(async ({ input }) => {
  const player = await getPlayer()
  const hospital = await getHospital({ hospitalId: input.hospitalId })

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
    const hospital = await getHospital({ hospitalId: input.hospitalId })

    const hospitalPotion = hospital.potions_hospital.find((x) => x.potion_id === input.potionId)

    if (!hospitalPotion) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

    const player = await getPlayer()

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
          inventory_id: (await getInventory()).id,
        },
      })
    })
  })

export const acceptSlainEnemyQuest = protectedAction.mutation(async () => {
  if ((await checkQuestProgress('SLAIN_ENEMY')) !== 'READY') throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  await acceptQuest('SLAIN_ENEMY')
})

export const completeSlainEnemyQuest = protectedAction.mutation(async () => {
  if ((await checkQuestProgress('SLAIN_ENEMY')) !== 'COMPLETE') throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  await collectReward(db, { money: await completeQuest('SLAIN_ENEMY') })
})
