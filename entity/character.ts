import type { CharacterClass, CharacterRace } from '@prisma/client'

import { prisma } from '@/lib/db'
import { calculateInitialStats } from '@/lib/game/character'
import { calculateMaxHp, calculateMaxMana, calculateProgression } from '@/lib/game/formulas'

/**
 * Character Entity Layer
 * Handles character creation, progression, and stats
 */

export async function getCharacter(id: string) {
  const character = await prisma.character.findUnique({
    where: { id },
    include: {
      inventory: {
        include: {
          item: true,
        },
      },
      bankItems: {
        include: {
          item: true,
        },
      },
      quests: {
        include: {
          quest: {
            include: {
              objectives: true,
              rewards: {
                include: {
                  item: true,
                },
              },
            },
          },
          objectives: true,
        },
      },
      skills: {
        include: {
          skill: true,
        },
      },
      achievements: {
        include: {
          achievement: true,
        },
      },
    },
  })

  return character
}

export async function getCharacterByUserId(userId: string) {
  return await prisma.character.findFirst({
    where: { userId },
    include: {
      inventory: {
        include: {
          item: true,
        },
      },
      quests: {
        include: {
          quest: {
            include: {
              objectives: true,
            },
          },
        },
      },
      skills: {
        include: {
          skill: true,
        },
      },
      achievements: {
        include: {
          achievement: true,
        },
      },
    },
  })
}

export async function createCharacter(data: {
  userId: string
  name: string
  race: CharacterRace
  class: CharacterClass
}) {
  const initialStats = calculateInitialStats(data.race)

  return await prisma.character.create({
    data: {
      userId: data.userId,
      name: data.name,
      race: data.race,
      class: data.class,
      ...initialStats,
    },
  })
}

export async function updateCharacterStats(
  id: string,
  stats: {
    strength?: number
    intelligence?: number
    agility?: number
    stamina?: number
  }
) {
  const character = await prisma.character.findUnique({ where: { id } })
  if (!character) throw new Error('Character not found')

  // Add increments to existing stats
  const updatedStats = {
    strength: character.strength + (stats.strength ?? 0),
    intelligence: character.intelligence + (stats.intelligence ?? 0),
    agility: character.agility + (stats.agility ?? 0),
    stamina: character.stamina + (stats.stamina ?? 0),
  }

  const maxHp = calculateMaxHp(updatedStats.stamina, character.level)
  const maxMana = calculateMaxMana(updatedStats.intelligence, character.level)

  return await prisma.character.update({
    where: { id },
    data: {
      strength: updatedStats.strength,
      intelligence: updatedStats.intelligence,
      agility: updatedStats.agility,
      stamina: updatedStats.stamina,
      maxHp,
      maxMana,
      // Ensure current HP/Mana doesn't exceed new max
      hp: Math.min(character.hp, maxHp),
      mana: Math.min(character.mana, maxMana),
      talentPoints: Math.max(0, character.talentPoints - 1),
    },
  })
}

export async function addExperience(id: string, amount: number) {
  const character = await prisma.character.findUnique({ where: { id } })
  if (!character) throw new Error('Character not found')

  const { newLevel, newXp, levelsGained } = calculateProgression(
    character.level,
    character.experience,
    amount
  )

  // Use the formulas for max HP/Mana
  const maxHp = calculateMaxHp(character.stamina, newLevel)
  const maxMana = calculateMaxMana(character.intelligence, newLevel)

  return await prisma.character.update({
    where: { id },
    data: {
      experience: newXp,
      level: newLevel,
      talentPoints: { increment: levelsGained },
      maxHp,
      maxMana,
      // Full heal on level up if level increased
      ...(levelsGained > 0 ? { hp: maxHp, mana: maxMana } : {}),
    },
  })
}

export async function updateCharacterResources(
  id: string,
  resources: {
    hp?: number
    mana?: number
    gold?: number
  }
) {
  return await prisma.character.update({
    where: { id },
    data: resources,
  })
}

export async function updateCharacterLocation(
  id: string,
  location: {
    locationX: number
    locationY: number
    currentView: string
  }
) {
  return await prisma.character.update({
    where: { id },
    data: location,
  })
}

export async function healCharacter(id: string, amount: number) {
  const character = await prisma.character.findUnique({ where: { id } })
  if (!character) throw new Error('Character not found')

  const newHp = Math.min(character.hp + amount, character.maxHp)

  return await prisma.character.update({
    where: { id },
    data: { hp: newHp },
  })
}

export async function restoreMana(id: string, amount: number) {
  const character = await prisma.character.findUnique({ where: { id } })
  if (!character) throw new Error('Character not found')

  const newMana = Math.min(character.mana + amount, character.maxMana)

  return await prisma.character.update({
    where: { id },
    data: { mana: newMana },
  })
}

export async function spendTalentPoint(id: string) {
  const character = await prisma.character.findUnique({ where: { id } })
  if (!character) throw new Error('Character not found')
  if (character.talentPoints <= 0) throw new Error('No talent points available')

  return await prisma.character.update({
    where: { id },
    data: { talentPoints: character.talentPoints - 1 },
  })
}

export async function updateLastPlayed(id: string) {
  return await prisma.character.update({
    where: { id },
    data: { lastPlayedAt: new Date() },
  })
}
