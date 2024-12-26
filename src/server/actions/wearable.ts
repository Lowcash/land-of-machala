'use server'

import { z } from 'zod'
import { protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'
import * as _Wearable from './_wearable'
import * as PlayerAction from './player'

import { ERROR_CAUSE, WEARABLES } from '@/const'

export const get = protectedAction.query(async () => {
  const player = await PlayerAction.get()

  return await _Wearable.get(player.id, player.wearable_id)
})

export const wear = protectedAction
  .input(z.object({ type: z.enum(WEARABLES), inventoryWearableId: z.string() }))
  .mutation(async ({ input }) => {
    if (await PlayerAction.isInCombat()) throw getTRPCErrorFromUnknown(ERROR_CAUSE.COMBAT)

    await _Wearable.wear(input.inventoryWearableId, { id: (await get()).id, type: input.type })
  })

export const unwear = protectedAction
  .input(z.object({ type: z.enum(WEARABLES), inventoryWearableId: z.string() }))
  .mutation(async ({ input }) => {
    if (await PlayerAction.isInCombat()) throw getTRPCErrorFromUnknown(ERROR_CAUSE.COMBAT)

    await _Wearable.unwear(input.inventoryWearableId, { id: (await get()).id, type: input.type })
  })

export const drink = protectedAction
  .input(z.object({ inventoryPotionId: z.string() }))
  .mutation(async ({ input }) => _Wearable.drink(input.inventoryPotionId))
