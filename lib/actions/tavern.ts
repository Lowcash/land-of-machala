'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/db'
import { RUMORS } from '@/lib/game/data'

import { characterProcedure } from './procedures'

/**
 * Character buys a rumor in the tavern.
 * Cost: 5 gold.
 */
export const buyRumorAction = characterProcedure.createServerAction().handler(async ({ ctx }) => {
  const { character } = ctx

  if (character.gold < 5) {
    return { success: false, message: 'Nemáš dost zlata na drink (5g).' }
  }

  const rumor = RUMORS[Math.floor(Math.random() * RUMORS.length)] || RUMORS[0]

  await prisma.character.update({
    where: { id: character.id },
    data: { gold: { decrement: 5 } },
  })

  revalidatePath('/game')
  return { success: true, rumor, message: 'Koupil jsi rundu (5g) a dozvěděl ses něco zajímavého.' }
})

/**
 * Character pays for a stay in the tavern to recover HP/Mana.
 * Cost: 10 gold.
 */
export const buyStayAction = characterProcedure.createServerAction().handler(async ({ ctx }) => {
  const { character } = ctx

  if (character.gold < 10) {
    return { success: false, message: 'Nemáš dost zlata na pokoj (10g).' }
  }

  await prisma.character.update({
    where: { id: character.id },
    data: {
      gold: { decrement: 10 },
      hp: character.maxHp,
      mana: character.maxMana,
    },
  })

  revalidatePath('/game')
  return { success: true, message: 'Důkladný odpočinek ti vrátil veškeré síly.' }
})
