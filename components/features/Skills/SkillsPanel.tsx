import { getMyCharacterAction } from '@/lib/actions/character'
import { getAllSkillsAction, getCharacterSkillsAction } from '@/lib/actions/skill'
import { SkillsClient } from './SkillsClient'
import type { SkillCategory } from './types'

function treeToCategory(tree: string): SkillCategory {
  switch (tree) {
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

export async function SkillsPanel() {
  const [characterResult, characterError] = await getMyCharacterAction()
  const [allSkillsResult] = await getAllSkillsAction()

  if (characterError || !characterResult?.character) {
    console.error(
      '[SkillsPanel] Character fetch error:',
      characterError?.message || 'No character found'
    )
    return (
      <div className="p-8 text-center text-[#d4a574]">
        Nebyla nalezena postava. Prosím vytvořte si novou postavu.
      </div>
    )
  }

  // Define dummy skills in case fetch fails or returns empty
  const dummySkills = [
    {
      id: 'dummy-1',
      name: 'Mocný Úder',
      description: 'Zasadí drtivý úder, který způsobí 150% poškození zbraní.',
      iconName: 'swords',
      tree: 'COMBAT',
      tier: 1,
      maxRank: 5,
      requiredLevel: 1,
      requiredTreePoints: 0,
      x: 0,
      y: 0,
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
      requiredTreePoints: 0,
      x: 1,
      y: 0,
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
      requiredTreePoints: 3,
      x: 2,
      y: 1,
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
      requiredTreePoints: 3,
      x: 3,
      y: 1,
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
      requiredTreePoints: 6,
      x: 2,
      y: 2,
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
      requiredTreePoints: 3,
      x: 0,
      y: 1,
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
      requiredTreePoints: 3,
      x: 1,
      y: 1,
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
      requiredTreePoints: 6,
      x: 3,
      y: 2,
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
      requiredTreePoints: 6,
      x: 0,
      y: 2,
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
      requiredTreePoints: 6,
      x: 1,
      y: 2,
    },
  ]

  interface Skill {
    id: string
    name: string
    description: string
    category: string
    iconName: string
    isPassive: boolean
    manaCost: number
    cooldown: number
    damage: number
    currentRank: number
    maxRank: number
    requiredLevel: number
    requiredTreePoints: number
    x: number
    y: number
  }

  let allSkills: Skill[] = allSkillsResult?.skills || []

  // If no skills found, use dummy skills
  if (allSkills.length === 0) {
    allSkills = dummySkills as Skill[]
  }

  const character = characterResult.character

  const [characterSkillsResult] = await getCharacterSkillsAction({
    characterId: character.id,
  })

  // Also enable Filter "All" removal logic in Client component later (Step 1.5)
  // But wait, user said "odstraňme všechny" (Remove "All" filter).
  // I need to check SkillsClient.tsx for that.

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

  const talentPoints = character.talentPoints

  return (
    <SkillsClient skills={mergedSkills} talentPoints={talentPoints} characterId={character.id} />
  )
}
