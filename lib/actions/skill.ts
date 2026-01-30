'use server'

import {
  getAllSkills,
  getCharacterSkills,
  getCharacterSkillsByTree,
  getSkillsByTree,
  increaseSkillRank,
  setActiveSkill,
  unlockSkill,
} from '@/entity/skill'
import type { SkillTree } from '@prisma/client'

import {
  getCharacterSkillsSchema,
  getSkillsByTreeSchema,
  increaseRankSchema,
  setActiveSchema,
  unlockSkillSchema,
} from '@/lib/schemas/skill'

import { logActivity } from './activity-log'
import { characterProcedure } from './procedures'

/**
 * Skill Server Actions
 * Handles skill tree navigation, unlocking, and upgrades.
 */

export const getAllSkillsAction = characterProcedure.createServerAction().handler(async () => {
  const skills = await getAllSkills()
  return { skills }
})

export const getSkillsByTreeAction = characterProcedure
  .createServerAction()
  .input(getSkillsByTreeSchema)
  .handler(async ({ input }) => {
    const skills = await getSkillsByTree(input.tree as SkillTree)
    return { skills }
  })

export const getCharacterSkillsAction = characterProcedure
  .createServerAction()
  .input(getCharacterSkillsSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const skills = input.tree
      ? await getCharacterSkillsByTree(character.id, input.tree as SkillTree)
      : await getCharacterSkills(character.id)

    return { skills }
  })

export const unlockSkillAction = characterProcedure
  .createServerAction()
  .input(unlockSkillSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    try {
      const characterSkill = await unlockSkill(character.id, input.skillId)

      await logActivity(
        character.id,
        'info',
        `Nová dovednost odemčena: ${characterSkill.skill.name}`
      )

      return {
        success: true,
        message: `Dovednost ${characterSkill.skill.name} byla odemčena!`,
        characterSkill,
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nepodařilo se odemknout dovednost.'
      return { success: false, message }
    }
  })

export const increaseSkillRankAction = characterProcedure
  .createServerAction()
  .input(increaseRankSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    try {
      const characterSkill = await increaseSkillRank(character.id, input.skillId)

      await logActivity(
        character.id,
        'info',
        `Dovednost ${characterSkill.skill.name} vylepšena na úroveň ${characterSkill.currentRank}`
      )

      return {
        success: true,
        message: `Úroveň dovednosti ${characterSkill.skill.name} byla zvýšena na ${characterSkill.currentRank}.`,
        characterSkill,
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Nepodařilo se zvýšit úroveň dovednosti.'
      return { success: false, message }
    }
  })

export const setActiveSkillAction = characterProcedure
  .createServerAction()
  .input(setActiveSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    const characterSkill = await setActiveSkill(character.id, input.skillId, input.active)

    return {
      success: true,
      characterSkill,
      message: input.active ? 'Schopnost byla aktivována.' : 'Schopnost byla deaktivována.',
    }
  })
