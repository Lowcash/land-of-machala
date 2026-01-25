'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function buyRumorAction(characterId: string) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    })

    if (!character) return { success: false, message: 'Postava nenalezena.' }
    if (character.gold < 5) return { success: false, message: 'Nemáš dost zlata na drink (5g).' }

    const rumors = [
      'Opilý trpaslík ti prozradil, že v horách našel žílu zlata, ale vyhnali ho obři.',
      'Zaslechl jsi, že starosta má tajný tunel z radnice rovnou do banky.',
      'Někdo říkal, že v noci vylézají z kanálů obří krysy s červenýma očima.',
      'Hostinský prý míchá pivo s vodou z řeky, proto je tak levné.',
    ]
    const rumor = rumors[Math.floor(Math.random() * rumors.length)]

    await prisma.character.update({
      where: { id: characterId },
      data: { gold: { decrement: 5 } },
    })

    revalidatePath('/game')
    return { success: true, rumor: rumor, message: 'Koupil jsi rundu (5g).' }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Chyba při nákupu drbů.' }
  }
}

export async function buyStayAction(characterId: string) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    })

    if (!character) return { success: false, message: 'Postava nenalezena.' }
    if (character.gold < 10) return { success: false, message: 'Nemáš dost zlata na pokoj (10g).' }

    await prisma.character.update({
      where: { id: characterId },
      data: {
        gold: { decrement: 10 },
        hp: character.maxHp,
        mana: character.maxMana,
      },
    })

    revalidatePath('/game')
    return { success: true, message: 'Odpočinek ti vrátil veškeré síly.' }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Chyba při odpočinku.' }
  }
}
