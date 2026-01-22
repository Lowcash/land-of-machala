'use server'

import {
  addExperience,
  createCharacter,
  getCharacter,
  getCharacterByUserId,
  healCharacter,
  restoreMana,
  updateCharacterLocation,
  updateCharacterResources,
  updateCharacterStats,
} from '@/entity/character'
import { auth } from '@/lib/auth'
import type { CharacterClass, CharacterRace } from '@prisma/client'
import { z } from 'zod'
import { createServerAction } from 'zsa'

/**
 * Character Server Actions
 * Handles character creation, progression, and stat management
 */

const createCharacterSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(20, 'Name must be at most 20 characters'),
  race: z.enum(['HUMAN', 'DWARF', 'ELF', 'ORC', 'HALFLING', 'DRAGONBORN'] as const),
  class: z.enum(['WARRIOR', 'MAGE', 'ROGUE', 'PALADIN', 'RANGER', 'NECROMANCER'] as const),
})

const updateStatsSchema = z.object({
  characterId: z.string(),
  stats: z.object({
    strength: z.number().int().min(1).optional(),
    intelligence: z.number().int().min(1).optional(),
    agility: z.number().int().min(1).optional(),
    stamina: z.number().int().min(1).optional(),
  }),
})

const updateResourcesSchema = z.object({
  characterId: z.string(),
  resources: z.object({
    hp: z.number().int().min(0).optional(),
    mana: z.number().int().min(0).optional(),
    gold: z.number().int().min(0).optional(),
  }),
})

const updateLocationSchema = z.object({
  characterId: z.string(),
  locationX: z.number().int(),
  locationY: z.number().int(),
  currentView: z.string(),
})

const addExperienceSchema = z.object({
  characterId: z.string(),
  amount: z.number().int().min(0),
})

const healSchema = z.object({
  characterId: z.string(),
  amount: z.number().int().min(0),
})

const restoreManaSchema = z.object({
  characterId: z.string(),
  amount: z.number().int().min(0),
})

export const getMyCharacterAction = createServerAction().handler(async () => {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Not authenticated')
  }
  const userId = session.user.id

  const character = await getCharacterByUserId(userId)
  if (!character) {
    return { character: null }
  }

  return { character }
})

export const createCharacterAction = createServerAction()
  .input(createCharacterSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    // Check if user already has a character
    const existingCharacter = await getCharacterByUserId(userId)
    if (existingCharacter) {
      throw new Error('Character already exists')
    }

    const character = await createCharacter({
      userId,
      name: input.name,
      race: input.race as CharacterRace,
      class: input.class as CharacterClass,
    })

    return { character }
  })

export const updateCharacterStatsAction = createServerAction()
  .input(updateStatsSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    const character = await getCharacter(input.characterId)
    if (!character || character.userId !== userId) {
      throw new Error('Character not found or unauthorized')
    }

    const updated = await updateCharacterStats(input.characterId, input.stats)
    return { character: updated }
  })

export const updateCharacterResourcesAction = createServerAction()
  .input(updateResourcesSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    const character = await getCharacter(input.characterId)
    if (!character || character.userId !== userId) {
      throw new Error('Character not found or unauthorized')
    }

    const updated = await updateCharacterResources(input.characterId, input.resources)
    return { character: updated }
  })

export const updateCharacterLocationAction = createServerAction()
  .input(updateLocationSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    const character = await getCharacter(input.characterId)
    if (!character || character.userId !== userId) {
      throw new Error('Character not found or unauthorized')
    }

    const updated = await updateCharacterLocation(input.characterId, {
      locationX: input.locationX,
      locationY: input.locationY,
      currentView: input.currentView,
    })

    return { character: updated }
  })

export const addExperienceAction = createServerAction()
  .input(addExperienceSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    const character = await getCharacter(input.characterId)
    if (!character || character.userId !== userId) {
      throw new Error('Character not found or unauthorized')
    }

    const updated = await addExperience(input.characterId, input.amount)

    return {
      character: updated,
      leveledUp: updated.level > character.level,
      newLevel: updated.level,
    }
  })

export const healCharacterAction = createServerAction()
  .input(healSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    const character = await getCharacter(input.characterId)
    if (!character || character.userId !== userId) {
      throw new Error('Character not found or unauthorized')
    }

    const updated = await healCharacter(input.characterId, input.amount)
    return { character: updated }
  })

export const restoreManaAction = createServerAction()
  .input(restoreManaSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    const character = await getCharacter(input.characterId)
    if (!character || character.userId !== userId) {
      throw new Error('Character not found or unauthorized')
    }

    const updated = await restoreMana(input.characterId, input.amount)
    return { character: updated }
  })

export const getCharacterStatsAction = createServerAction()
  .input(z.object({ characterId: z.string() }))
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }
    const userId = session.user.id

    const character = await getCharacter(input.characterId)
    if (!character || character.userId !== userId) {
      throw new Error('Character not found or unauthorized')
    }

    return {
      x: character.locationX,
      y: character.locationY,
      gold: character.gold,
    }
  })
