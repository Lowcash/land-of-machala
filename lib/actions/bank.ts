'use server'

import { z } from 'zod'

import { prisma } from '@/lib/db'

import { characterProcedure } from './procedures'

/**
 * Deposits gold into the character's bank account.
 */
export const depositGoldAction = characterProcedure
  .createServerAction()
  .input(z.object({ amount: z.number().positive() }))
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    const { amount } = input

    if (character.gold < amount) {
      return { success: false, message: 'Nemáš dost zlata v měšci.' }
    }

    await prisma.character.update({
      where: { id: character.id },
      data: {
        gold: { decrement: amount },
        bankGold: { increment: amount },
      },
    })

    return { success: true, message: `Úspěšně jsi uložil ${amount} zlata.` }
  })

/**
 * Withdraws gold from the character's bank account.
 */
export const withdrawGoldAction = characterProcedure
  .createServerAction()
  .input(z.object({ amount: z.number().positive() }))
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    const { amount } = input

    if (character.bankGold < amount) {
      return { success: false, message: 'Nemáš dost zlata v bance.' }
    }

    await prisma.character.update({
      where: { id: character.id },
      data: {
        gold: { increment: amount },
        bankGold: { decrement: amount },
      },
    })

    return { success: true, message: `Úspěšně jsi vybral ${amount} zlata.` }
  })
