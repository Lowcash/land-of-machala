import type { CharacterClass, CharacterRace } from '@prisma/client'

import { prisma } from '@/lib/db'

/**
 * Character Entity Layer
 * Handles character creation, progression, and stats
 */

const XP_BASE = 100
const XP_MULTIPLIER = 1.5

export function calculateXpForLevel(level: number): number {
  return Math.floor(XP_BASE * Math.pow(XP_MULTIPLIER, level - 1))
}

function calculateMaxHp(stamina: number, level: number): number {
  return 100 + stamina * 5 + level * 10
}

function calculateMaxMana(intelligence: number, level: number): number {
  return 50 + intelligence * 3 + level * 5
}

export async function getCharacter(id: string) {
  return await prisma.character.findUnique({
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
    },
  })
}

export async function createCharacter(data: {
  userId: string
  name: string
  race: CharacterRace
  class: CharacterClass
}) {
  // Base stats by race
  const raceStats = {
    HUMAN: { strength: 10, intelligence: 10, agility: 10, stamina: 10 },
    DWARF: { strength: 12, intelligence: 8, agility: 8, stamina: 14 },
    ELF: { strength: 8, intelligence: 12, agility: 14, stamina: 8 },
    ORC: { strength: 14, intelligence: 6, agility: 8, stamina: 12 },
    HALFLING: { strength: 8, intelligence: 10, agility: 14, stamina: 10 },
    DRAGONBORN: { strength: 12, intelligence: 10, agility: 10, stamina: 12 },
  }

  const stats = raceStats[data.race]
  const maxHp = calculateMaxHp(stats.stamina, 1)
  const maxMana = calculateMaxMana(stats.intelligence, 1)

  return await prisma.character.create({
    data: {
      userId: data.userId,
      name: data.name,
      race: data.race,
      class: data.class,
      strength: stats.strength,
      intelligence: stats.intelligence,
      agility: stats.agility,
      stamina: stats.stamina,
      level: 1,
      experience: 0,
      hp: maxHp,
      maxHp,
      mana: maxMana,
      maxMana,
      gold: 0,
      talentPoints: 0,
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
      hp: Math.min(character.hp, maxHp),
      mana: Math.min(character.mana, maxMana),
      talentPoints: Math.max(0, character.talentPoints - 1),
    },
  })
}

export async function addExperience(id: string, amount: number) {
  const character = await prisma.character.findUnique({ where: { id } })
  if (!character) throw new Error('Character not found')

  let newExperience = character.experience + amount
  let newLevel = character.level
  let newTalentPoints = character.talentPoints

  // Check for level up
  while (newExperience >= calculateXpForLevel(newLevel)) {
    newExperience -= calculateXpForLevel(newLevel)
    newLevel++
    newTalentPoints++
  }

  const maxHp = calculateMaxHp(character.stamina, newLevel)
  const maxMana = calculateMaxMana(character.intelligence, newLevel)

  return await prisma.character.update({
    where: { id },
    data: {
      experience: newExperience,
      level: newLevel,
      talentPoints: newTalentPoints,
      maxHp,
      maxMana,
      hp: maxHp, // Full heal on level up
      mana: maxMana,
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
