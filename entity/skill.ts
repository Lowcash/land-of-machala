import { prisma } from '@/lib/db'
import type { SkillTree } from '@prisma/client'

/**
 * Skill Entity Layer
 * Handles skill tree, talent unlocking, and progression
 */

export async function getAllSkills() {
  return await prisma.skill.findMany({
    orderBy: [{ tree: 'asc' }, { tier: 'asc' }, { positionY: 'asc' }],
  })
}

export async function getSkillsByTree(tree: SkillTree) {
  return await prisma.skill.findMany({
    where: { tree },
    orderBy: [{ tier: 'asc' }, { positionY: 'asc' }],
  })
}

export async function getSkill(id: string) {
  return await prisma.skill.findUnique({
    where: { id },
  })
}

export async function getCharacterSkills(characterId: string) {
  return await prisma.characterSkill.findMany({
    where: { characterId },
    include: {
      skill: true,
    },
    orderBy: [{ skill: { tree: 'asc' } }, { skill: { tier: 'asc' } }],
  })
}

export async function getCharacterSkillsByTree(characterId: string, tree: SkillTree) {
  return await prisma.characterSkill.findMany({
    where: {
      characterId,
      skill: {
        tree,
      },
    },
    include: {
      skill: true,
    },
    orderBy: [{ skill: { tier: 'asc' } }],
  })
}

export async function getCharacterSkill(characterId: string, skillId: string) {
  return await prisma.characterSkill.findUnique({
    where: {
      characterId_skillId: {
        characterId,
        skillId,
      },
    },
    include: {
      skill: true,
    },
  })
}

export async function unlockSkill(characterId: string, skillId: string) {
  const skill = await prisma.skill.findUnique({ where: { id: skillId } })
  if (!skill) {
    throw new Error('Skill not found')
  }

  const character = await prisma.character.findUnique({
    where: { id: characterId },
  })
  if (!character) {
    throw new Error('Character not found')
  }

  // Check level requirement
  if (skill.requiredLevel && character.level < skill.requiredLevel) {
    throw new Error(
      `Character level ${character.level} is below required level ${skill.requiredLevel}`
    )
  }

  // Check tree points requirement
  if (skill.requiredTreePoints > 0) {
    const treeSkills = await prisma.characterSkill.findMany({
      where: {
        characterId,
        skill: {
          tree: skill.tree,
        },
        unlocked: true,
      },
    })

    const totalTreePoints = treeSkills.reduce((sum, cs) => sum + cs.currentRank, 0)

    if (totalTreePoints < skill.requiredTreePoints) {
      throw new Error(
        `Not enough points in ${skill.tree} tree. Required: ${skill.requiredTreePoints}, Current: ${totalTreePoints}`
      )
    }
  }

  // Check prerequisite skill
  if (skill.requiredSkillId) {
    const requiredCharacterSkill = await prisma.characterSkill.findUnique({
      where: {
        characterId_skillId: {
          characterId,
          skillId: skill.requiredSkillId,
        },
      },
    })

    if (!requiredCharacterSkill || !requiredCharacterSkill.unlocked) {
      throw new Error('Prerequisite skill not unlocked')
    }
  }

  // Check if character has enough talent points
  if (character.talentPoints <= 0) {
    throw new Error('No talent points available')
  }

  const existingSkill = await prisma.characterSkill.findUnique({
    where: {
      characterId_skillId: {
        characterId,
        skillId,
      },
    },
  })

  if (existingSkill) {
    // Skill exists, just unlock it
    const updated = await prisma.characterSkill.update({
      where: {
        characterId_skillId: {
          characterId,
          skillId,
        },
      },
      data: {
        unlocked: true,
        currentRank: 1,
        unlockedAt: new Date(),
      },
      include: {
        skill: true,
      },
    })

    // Spend talent point
    await prisma.character.update({
      where: { id: characterId },
      data: {
        talentPoints: character.talentPoints - 1,
      },
    })

    return updated
  }

  // Create new character skill
  const characterSkill = await prisma.characterSkill.create({
    data: {
      characterId,
      skillId,
      currentRank: 1,
      unlocked: true,
      unlockedAt: new Date(),
    },
    include: {
      skill: true,
    },
  })

  // Spend talent point
  await prisma.character.update({
    where: { id: characterId },
    data: {
      talentPoints: character.talentPoints - 1,
    },
  })

  return characterSkill
}

export async function increaseSkillRank(characterId: string, skillId: string) {
  const characterSkill = await prisma.characterSkill.findUnique({
    where: {
      characterId_skillId: {
        characterId,
        skillId,
      },
    },
    include: {
      skill: true,
    },
  })

  if (!characterSkill) {
    throw new Error('Skill not unlocked')
  }

  if (!characterSkill.unlocked) {
    throw new Error('Skill must be unlocked first')
  }

  if (characterSkill.currentRank >= characterSkill.skill.maxRank) {
    throw new Error('Skill already at max rank')
  }

  const character = await prisma.character.findUnique({
    where: { id: characterId },
  })
  if (!character || character.talentPoints <= 0) {
    throw new Error('No talent points available')
  }

  const updated = await prisma.characterSkill.update({
    where: {
      characterId_skillId: {
        characterId,
        skillId,
      },
    },
    data: {
      currentRank: characterSkill.currentRank + 1,
    },
    include: {
      skill: true,
    },
  })

  // Spend talent point
  await prisma.character.update({
    where: { id: characterId },
    data: {
      talentPoints: character.talentPoints - 1,
    },
  })

  return updated
}

export async function setActiveSkill(characterId: string, skillId: string, active: boolean) {
  return await prisma.characterSkill.update({
    where: {
      characterId_skillId: {
        characterId,
        skillId,
      },
    },
    data: {
      active,
    },
    include: {
      skill: true,
    },
  })
}
