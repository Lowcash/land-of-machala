import { SkillCategory } from '@/components/features/Skills/Shared/types'
import { getMyCharacterAction } from '@/lib/actions/character'
import { getAllSkillsAction, getCharacterSkillsAction } from '@/lib/actions/skill'
import { Skill } from '@prisma/client'

function treeToCategory(tree: string | any): SkillCategory {
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

// Reuse dummy skills from original file as per user choice to keep them until DB is populated
const DUMMY_SKILLS: any[] = [
  {
    id: 'dummy-1',
    name: 'Mocný Úder',
    description: 'Zasadí drtivý úder, který způsobí 150% poškození zbraní.',
    iconName: 'swords',
    tree: 'COMBAT',
    tier: 1,
    maxRank: 5,
    requiredLevel: 1,
    requiredSkillId: null,
    requiredTreePoints: 0,
    positionX: 0,
    positionY: 0,
    createdAt: new Date(),
  },
  {
    id: 'dummy-2',
    name: 'Kamenná Kůže',
    description: 'Zvýší obranu o 20% na 30 sekund.',
    iconName: 'shield',
    tree: 'DEFENSE',
    tier: 1,
    maxRank: 3,
    requiredLevel: 2,
    requiredSkillId: null,
    requiredTreePoints: 0,
    positionX: 1,
    positionY: 0,
    createdAt: new Date(),
  },
  {
    id: 'dummy-3',
    name: 'Ohnivá Koule',
    description: 'Vystřelí ohnivou kouli, která způsobí poškození v oblasti.',
    iconName: 'sparkles',
    tree: 'MAGIC',
    tier: 2,
    maxRank: 3,
    requiredLevel: 5,
    requiredSkillId: null,
    requiredTreePoints: 3,
    positionX: 2,
    positionY: 1,
    createdAt: new Date(),
  },
  {
    id: 'dummy-4',
    name: 'Blesk',
    description: 'Zasáhne nepřítele bleskem s šancí na omráčení.',
    iconName: 'zap',
    tree: 'MAGIC',
    tier: 2,
    maxRank: 3,
    requiredLevel: 6,
    requiredSkillId: null,
    requiredTreePoints: 3,
    positionX: 3,
    positionY: 1,
    createdAt: new Date(),
  },
  {
    id: 'dummy-5',
    name: 'Krvavá Oběť',
    description: 'Obětuje část životů pro získání many.',
    iconName: 'heart',
    tree: 'MAGIC',
    tier: 3,
    maxRank: 1,
    requiredLevel: 10,
    requiredSkillId: null,
    requiredTreePoints: 6,
    positionX: 2,
    positionY: 2,
    createdAt: new Date(),
  },
  {
    id: 'dummy-6',
    name: 'Dvojitý Úder',
    description: 'Útok dvakrát v rychlém sledu.',
    iconName: 'swords',
    tree: 'COMBAT',
    tier: 2,
    maxRank: 3,
    requiredLevel: 4,
    requiredSkillId: null,
    requiredTreePoints: 3,
    positionX: 0,
    positionY: 1,
    createdAt: new Date(),
  },
  {
    id: 'dummy-7',
    name: 'Úder Štítem',
    description: 'Zasadí útok štítem a omráčí nepřítele.',
    iconName: 'shield',
    tree: 'DEFENSE',
    tier: 2,
    maxRank: 3,
    requiredLevel: 5,
    requiredSkillId: null,
    requiredTreePoints: 3,
    positionX: 1,
    positionY: 1,
    createdAt: new Date(),
  },
  {
    id: 'dummy-8',
    name: 'Ledový Déšť',
    description: 'Přivolá déšť ledových šípů v oblasti.',
    iconName: 'cloud-snow',
    tree: 'MAGIC',
    tier: 3,
    maxRank: 1,
    requiredLevel: 12,
    requiredSkillId: null,
    requiredTreePoints: 6,
    positionX: 3,
    positionY: 2,
    createdAt: new Date(),
  },
  {
    id: 'dummy-9',
    name: 'Berserker',
    description: 'Zvýší poškození o 50%, ale sníží obranu.',
    iconName: 'flame',
    tree: 'COMBAT',
    tier: 3,
    maxRank: 1,
    requiredLevel: 15,
    requiredSkillId: null,
    requiredTreePoints: 6,
    positionX: 0,
    positionY: 2,
    createdAt: new Date(),
  },
  {
    id: 'dummy-10',
    name: 'Pevnost',
    description: 'Stane se neprůstřelným na 5 sekund.',
    iconName: 'shield-check',
    tree: 'DEFENSE',
    tier: 3,
    maxRank: 1,
    requiredLevel: 14,
    requiredSkillId: null,
    requiredTreePoints: 6,
    positionX: 1,
    positionY: 2,
    createdAt: new Date(),
  },
]

export async function getSkillsPageData() {
  const [characterResult, characterError] = await getMyCharacterAction()

  if (characterError || !characterResult?.character) {
    return null
  }

  const { character } = characterResult
  const [allSkillsResult] = await getAllSkillsAction()

  let allSkills: Skill[] = (allSkillsResult?.skills as unknown as Skill[]) || []

  // If no skills found, use dummy skills
  if (allSkills.length === 0) {
    allSkills = DUMMY_SKILLS as unknown as Skill[]
  }

  const [characterSkillsResult] = await getCharacterSkillsAction({
    characterId: character.id,
  })

  const characterSkills = characterSkillsResult?.skills || []

  // Merge all skills with character progress
  const mergedSkills = allSkills.map((skill) => {
    const characterSkill = characterSkills.find((cs) => cs.skillId === skill.id)
    const category = treeToCategory(skill.tree)

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
