'use server'

import { prisma } from '@/lib/db'

export async function depositGoldAction(characterId: string, amount: number) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    })

    if (!character) return { success: false, message: 'Postava nenalezena.' }
    if (amount <= 0) return { success: false, message: 'Neplatná částka.' }
    if (character.gold < amount) return { success: false, message: 'Nemáš dost zlata.' }

    await prisma.character.update({
      where: { id: characterId },
      data: {
        gold: character.gold - amount,
        bankGold: character.bankGold + amount,
      },
    })

    return { success: true, message: `Uloženo ${amount} zlata.` }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Chyba při vkladu.' }
  }
}

export async function withdrawGoldAction(characterId: string, amount: number) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    })

    if (!character) return { success: false, message: 'Postava nenalezena.' }
    if (amount <= 0) return { success: false, message: 'Neplatná částka.' }
    if (character.bankGold < amount) return { success: false, message: 'Nemáš dost v bance.' }

    await prisma.character.update({
      where: { id: characterId },
      data: {
        gold: character.gold + amount,
        bankGold: character.bankGold - amount,
      },
    })

    return { success: true, message: `Vybráno ${amount} zlata.` }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Chyba při výběru.' }
  }
}
