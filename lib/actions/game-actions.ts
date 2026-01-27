'use server'

import { revalidatePath } from 'next/cache'

import { z } from 'zod'

import { prisma } from '@/lib/db'

import { characterProcedure } from './procedures'

export const rollDiceAction = characterProcedure
  .createServerAction()
  .input(
    z.object({
      betAmount: z.number().int().min(10),
    })
  )
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    const { betAmount } = input

    if (character.gold < betAmount) {
      throw new Error('Nedostatek zlata')
    }

    const p1 = Math.floor(Math.random() * 6) + 1
    const p2 = Math.floor(Math.random() * 6) + 1
    const h1 = Math.floor(Math.random() * 6) + 1
    const h2 = Math.floor(Math.random() * 6) + 1

    const playerSum = p1 + p2
    const houseSum = h1 + h2

    let result: 'win' | 'lose' | 'draw' = 'draw'
    let goldChange = 0

    if (playerSum > houseSum) {
      result = 'win'
      goldChange = betAmount
    } else if (playerSum < houseSum) {
      result = 'lose'
      goldChange = -betAmount
    }

    if (goldChange !== 0) {
      await prisma.character.update({
        where: { id: character.id },
        data: { gold: { increment: goldChange } },
      })
    }

    revalidatePath('/game')

    return {
      player: [p1, p2],
      house: [h1, h2],
      result,
      goldChange,
      success: true,
    }
  })
