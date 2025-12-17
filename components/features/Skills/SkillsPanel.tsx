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
    default:
      return 'magic'
  }
}

export async function SkillsPanel() {
  const [characterResult, characterError] = await getMyCharacterAction()
  const [allSkillsResult, allSkillsError] = await getAllSkillsAction()

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

  if (allSkillsError || !allSkillsResult?.skills) {
    console.error('[SkillsPanel] Skills fetch error:', allSkillsError?.message || 'No skills found')
    return <div className="p-8 text-center text-[#d4a574]">Nebyla nalezena žádná dovednost.</div>
  }

  const character = characterResult.character
  const allSkills = allSkillsResult.skills

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

  const talentPoints = character.talentPoints

  return (
    <SkillsClient skills={mergedSkills} talentPoints={talentPoints} characterId={character.id} />
  )
}
