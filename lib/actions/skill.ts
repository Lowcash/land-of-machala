'use server'

import { getCharacter } from '@/entity/character'
import {
  getAllSkills,
  getCharacterSkills,
  getCharacterSkillsByTree,
  getSkillsByTree,
  increaseSkillRank,
  setActiveSkill,
  unlockSkill,
} from '@/entity/skill'
import { auth } from '@/lib/auth'
import type { SkillTree } from '@prisma/client'
import { z } from 'zod'
import { createServerAction } from 'zsa'

/**
 * Skill Server Actions
 * Handles skill tree navigation, unlocking, and upgrades
 */

const getSkillsByTreeSchema = z.object({
  tree: z.enum(['COMBAT', 'DEFENSE', 'MAGIC']),
})

const getCharacterSkillsSchema = z.object({
  characterId: z.string(),
  tree: z.enum(['COMBAT', 'DEFENSE', 'MAGIC']).optional(),
})

const unlockSkillSchema = z.object({
  characterId: z.string(),
  skillId: z.string(),
})

const increaseRankSchema = z.object({
  characterId: z.string(),
  skillId: z.string(),
})

const setActiveSchema = z.object({
  characterId: z.string(),
  skillId: z.string(),
  active: z.boolean(),
})

export const getAllSkillsAction = createServerAction().handler(async () => {
  const skills = await getAllSkills()
  return { skills }
})

export const getSkillsByTreeAction = createServerAction()
  .input(getSkillsByTreeSchema)
  .handler(async ({ input }) => {
    const skills = await getSkillsByTree(input.tree as SkillTree)
    return { skills }
  })

export const getCharacterSkillsAction = createServerAction()
  .input(getCharacterSkillsSchema)
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

    const skills = input.tree
      ? await getCharacterSkillsByTree(input.characterId, input.tree as SkillTree)
      : await getCharacterSkills(input.characterId)

    return { skills }
  })

export const unlockSkillAction = createServerAction()
  .input(unlockSkillSchema)
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

    try {
      const characterSkill = await unlockSkill(input.characterId, input.skillId)

      return {
        characterSkill,
        success: true,
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Failed to unlock skill')
    }
  })

export const increaseSkillRankAction = createServerAction()
  .input(increaseRankSchema)
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

    try {
      const characterSkill = await increaseSkillRank(input.characterId, input.skillId)

      return {
        characterSkill,
        success: true,
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Failed to increase skill rank')
    }
  })

export const setActiveSkillAction = createServerAction()
  .input(setActiveSchema)
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

    const characterSkill = await setActiveSkill(input.characterId, input.skillId, input.active)

    return { characterSkill }
  })
