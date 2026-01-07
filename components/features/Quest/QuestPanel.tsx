import { getMyCharacterAction } from '@/lib/actions/character'
import { getAllQuestsAction, getCharacterQuestsAction } from '@/lib/actions/quest'
import { QuestClient } from './QuestClient'

export async function QuestPanel() {
  const [characterResult, characterError] = await getMyCharacterAction()
  const [allQuestsResult] = await getAllQuestsAction()

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

  // Dummy quests
  const dummyQuests = [
    {
      id: 'dummy-q1',
      title: 'Krysí problém',
      description: 'Hostinský si stěžuje na krysy ve sklepě. Pomoc mu je vyhubit.',
      type: 'MAIN',
      minLevel: 1,
      rewards: { xp: 100, gold: 50 },
      objectives: [
        { id: 'obj-1', description: 'Zabij 5 Krys', target: 5, current: 0, completed: false, order: 1 }
      ]
    },
    {
      id: 'dummy-q2',
      title: 'Ztracený amulet',
      description: 'Najdi starý rodinný amulet ztracený v lese.',
      type: 'SIDE',
      minLevel: 3,
      rewards: { xp: 200, gold: 100, items: ['Starý Amulet'] },
      objectives: [
        { id: 'obj-2', description: 'Najdi Amulet', target: 1, current: 0, completed: false, order: 1 }
      ]
    },
    {
      id: 'dummy-q3',
      title: 'Denní lov: VLCI',
      description: 'Vlci se přemnožili. Sniž jejich stavy.',
      type: 'DAILY',
      minLevel: 5,
      rewards: { xp: 150, gold: 75 },
      objectives: [
        { id: 'obj-3', description: 'Ulov 10 Vlků', target: 10, current: 3, completed: false, order: 1 }
      ]
    }
  ]

  let allQuests = allQuestsResult?.quests || []
  if (allQuests.length === 0) {
      allQuests = dummyQuests as any
  }

  const character = characterResult.character

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
      // Serialize dates
      createdAt: quest.createdAt?.toISOString(),
    }
  })

  return <QuestClient quests={mergedQuests} characterId={character.id} />
}
