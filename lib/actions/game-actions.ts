'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function rollDiceAction(characterId: string, betAmount: number) {
  const character = await prisma.character.findUnique({
    where: { id: characterId },
  })

  if (!character) {
    throw new Error('Postava nenalezena')
  }

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
      where: { id: characterId },
      data: { gold: { increment: goldChange } },
    })
  }

  revalidatePath('/game')

  return {
    player: [p1, p2],
    house: [h1, h2],
    result,
    goldChange,
  }
}
