import { getMyCharacterAction } from '@/lib/actions/character'
import { getAllQuestsAction, getCharacterQuestsAction } from '@/lib/actions/quest'
import { QuestClient } from './QuestClient'

export async function QuestPanel() {
  const [characterResult, characterError] = await getMyCharacterAction()
  const [allQuestsResult, allQuestsError] = await getAllQuestsAction()

  if (characterError || !characterResult?.character) {
    console.error(
      '[QuestPanel] Character fetch error:',
      characterError?.message || 'No character found'
    )
    return (
      <div className="p-8 text-center text-[#d4a574]">
        Nebyla nalezena postava. Prosím vytvořte si novou postavu.
      </div>
    )
  }

  if (allQuestsError || !allQuestsResult?.quests) {
    console.error('[QuestPanel] Quests fetch error:', allQuestsError?.message || 'No quests found')
    return <div className="p-8 text-center text-[#d4a574]">Nebyl nalezen žádný quest.</div>
  }

  const character = characterResult.character
  const allQuests = allQuestsResult.quests

  const [characterQuestsResult] = await getCharacterQuestsAction({
    characterId: character.id,
  })

  const characterQuests = characterQuestsResult?.quests || []

  // Merge all quests with character progress
  const mergedQuests = allQuests.map((quest) => {
    const characterQuest = characterQuests.find((cq) => cq.questId === quest.id)

    const objectives = quest.objectives.map((obj) => {
      const charObjective = characterQuest?.objectives.find((co) => co.objectiveId === obj.id)

      return {
        id: obj.id,
        description: obj.description,
        target: obj.target,
        current: charObjective?.current || 0,
        completed: charObjective?.completed || false,
        order: obj.order,
      }
    })

    const completedObjectives = objectives.filter((o) => o.completed).length
    const totalObjectives = objectives.length
    const progress =
      totalObjectives > 0 ? Math.round((completedObjectives / totalObjectives) * 100) : 0

    return {
      ...quest,
      objectives,
      characterStatus: characterQuest?.status || null,
      progress,
    }
  })

  return <QuestClient quests={mergedQuests} characterId={character.id} />
}
