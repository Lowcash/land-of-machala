import { getCharacterByUserId } from '@/entity/character'
import { getAllSkills, getCharacterSkills } from '@/entity/skill'
import type { Skill } from '@prisma/client'

import { auth } from '@/lib/auth'
import { DUMMY_SKILLS } from '@/lib/game/skills'

import type { SkillCategory } from '@/components/features/Skills/Shared/types'

function treeToCategory(tree: string): SkillCategory {
  const treeStr = String(tree)
  switch (treeStr) {
    case 'COMBAT':
      return 'combat'
    case 'DEFENSE':
      return 'defense'
    case 'MAGIC':
      return 'magic'
    case 'STEALTH':
      return 'stealth'
    case 'CRAFTING':
      return 'crafting'
    default:
      return 'combat'
  }
}

export async function getSkillsPageData() {
  const session = await auth()
  if (!session?.user?.id) return null

  const character = await getCharacterByUserId(session.user.id)
  if (!character) return null

  const allSkillsRaw = await getAllSkills()
  let allSkills: Skill[] = allSkillsRaw || []

  if (allSkills.length === 0) {
    allSkills = DUMMY_SKILLS as unknown as Skill[]
  }

  const characterSkills = await getCharacterSkills(character.id)

  // Merge all skills with character progress
  const mergedSkills = allSkills.map((skill) => {
    const characterSkill = characterSkills.find((cs) => cs.skillId === skill.id)
    const category = treeToCategory(skill.tree as string)

    return {
      ...skill,
      currentLevel: characterSkill?.currentRank || 0,
      unlocked: characterSkill?.unlocked || false,
      category,
      cost: 1,
    }
  })

  return {
    characterId: character.id,
    talentPoints: character.talentPoints,
    skills: mergedSkills,
  }
}
