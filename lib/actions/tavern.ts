'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/db'
import { RUMORS } from '@/lib/game/constants/texts'

import { logActivity } from './activity-log'
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

  await logActivity(character.id, 'info', `Koupil jsi rundu (5g) v hospodě.`)

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

  await logActivity(character.id, 'heal', `Odpočinul jsi si v pokoji za 10g.`)

  revalidatePath('/game')
  return { success: true, message: 'Důkladný odpočinek ti vrátil veškeré síly.' }
})

/**
 * Character buys a drink to recover some HP/Mana.
 * Cost: 5 gold.
 * Result: +10 HP, +5 Mana.
 */
export const buyDrinkAction = characterProcedure.createServerAction().handler(async ({ ctx }) => {
  const { character } = ctx

  if (character.gold < 5) {
    return { success: false, message: 'Nemáš dost zlata na drink (5g).' }
  }

  const newHp = Math.min(character.maxHp, character.hp + 10)
  const newMana = Math.min(character.maxMana, character.mana + 5)

  await prisma.character.update({
    where: { id: character.id },
    data: {
      gold: { decrement: 5 },
      hp: newHp,
      mana: newMana,
    },
  })

  await logActivity(character.id, 'mana', `Napil jsi se osvěžujícího piva za 5g.`)

  revalidatePath('/game')
  return { success: true, message: 'Napil jsi se osvěžujícího piva. (+10 HP, +5 Mana)' }
})
