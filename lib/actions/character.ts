'use server'

import {
  addExperience,
  createCharacter,
  getCharacterByUserId,
  healCharacter,
  restoreMana,
  updateCharacterLocation,
  updateCharacterResources,
  updateCharacterStats,
} from '@/entity/character'
import type { CharacterClass, CharacterRace } from '@prisma/client'

import {
  addExperienceSchema,
  createCharacterSchema,
  healSchema,
  restoreManaSchema,
  updateLocationSchema,
  updateResourcesSchema,
  updateStatsSchema,
} from '@/lib/schemas/character'

import { authenticatedProcedure, characterProcedure } from './procedures'

/**
 * Character Server Actions
 * Handles character creation, progression, and stat management
 */

export const getMyCharacterAction = authenticatedProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { userId } = ctx

    const character = await getCharacterByUserId(userId)
    if (!character) {
      return { character: null }
    }

    return { character }
  })

export const createCharacterAction = authenticatedProcedure
  .createServerAction()
  .input(createCharacterSchema)
  .handler(async ({ input, ctx }) => {
    const { userId } = ctx

    // Check if user already has a character
    const existingCharacter = await getCharacterByUserId(userId)
    if (existingCharacter) {
      throw new Error('Postava již existuje')
    }

    const character = await createCharacter({
      userId,
      name: input.name,
      race: input.race as CharacterRace,
      class: input.class as CharacterClass,
    })

    return { character }
  })

export const updateCharacterStatsAction = characterProcedure
  .createServerAction()
  .input(updateStatsSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const updated = await updateCharacterStats(character.id, input.stats)
    return { character: updated }
  })

export const updateCharacterResourcesAction = characterProcedure
  .createServerAction()
  .input(updateResourcesSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const updated = await updateCharacterResources(character.id, input.resources)
    return { character: updated }
  })

export const updateCharacterLocationAction = characterProcedure
  .createServerAction()
  .input(updateLocationSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const updated = await updateCharacterLocation(character.id, {
      locationX: input.locationX,
      locationY: input.locationY,
      currentView: input.currentView,
    })

    return { character: updated }
  })

export const addExperienceAction = characterProcedure
  .createServerAction()
  .input(addExperienceSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const updated = await addExperience(character.id, input.amount)

    return {
      character: updated,
      leveledUp: updated.level > character.level,
      newLevel: updated.level,
    }
  })

export const healCharacterAction = characterProcedure
  .createServerAction()
  .input(healSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const updated = await healCharacter(character.id, input.amount)
    return { character: updated }
  })

export const restoreManaAction = characterProcedure
  .createServerAction()
  .input(restoreManaSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const updated = await restoreMana(character.id, input.amount)
    return { character: updated }
  })

export const getCharacterStatsAction = characterProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { character } = ctx

    return {
      x: character.locationX,
      y: character.locationY,
      gold: character.gold,
    }
  })
