import { QuestClient } from '@/components/features/Quest/QuestClient'
import { PageTemplate } from '@/components/layout/PageTemplate'
import { getMyCharacterAction } from '@/lib/actions/character'
import { getAllQuestsAction, getCharacterQuestsAction } from '@/lib/actions/quest'
import { ScrollText } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function QuestsPage() {
  const [characterResult, characterError] = await getMyCharacterAction()
  const [allQuestsResult] = await getAllQuestsAction()

  if (characterError || !characterResult?.character) {
    return (
      <PageTemplate
        title="Questy"
        icon={<ScrollText />}
        maxWidth="lg"
        backLink={{ href: '/game', label: 'Zpět do hry' }}
      >
        <div className="p-8 text-center text-[#d4a574]">
          Nebyla nalezena postava. Prosím vytvořte si novou postavu.
        </div>
      </PageTemplate>
    )
  }

  // Dummy quests
  const dummyQuests = [
    {
      id: 'dummy-q1',
      title: 'Krysí problém',
      description: 'Hostinský si stěžuje na krysy ve sklepě. Pomoc mu je vyhubit.',
      category: 'MAIN',
      minLevel: 1,
      rewards: [],
      objectives: [
        {
          id: 'obj-1',
          description: 'Zabij 5 Krys',
          target: 5,
          current: 0,
          completed: false,
          order: 1,
          questId: 'dummy-q1',
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'dummy-q2',
      title: 'Ztracený amulet',
      description: 'Najdi starý rodinný amulet ztracený v lese.',
      category: 'SIDE',
      minLevel: 3,
      rewards: [],
      objectives: [
        {
          id: 'obj-2',
          description: 'Najdi Amulet',
          target: 1,
          current: 0,
          completed: false,
          order: 1,
          questId: 'dummy-q2',
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'dummy-q3',
      title: 'Denní lov: VLCI',
      description: 'Vlci se přemnožili. Sniž jejich stavy.',
      category: 'DAILY',
      minLevel: 5,
      rewards: [],
      objectives: [
        {
          id: 'obj-3',
          description: 'Ulov 10 Vlků',
          target: 10,
          current: 3,
          completed: false,
          order: 1,
          questId: 'dummy-q3',
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  let allQuests = allQuestsResult?.quests || []
  if (allQuests.length === 0) {
    allQuests = dummyQuests as any[]
  }

  const character = characterResult.character

  const [characterQuestsResult] = await getCharacterQuestsAction({
    characterId: character.id,
  })

  const characterQuests = characterQuestsResult?.quests || []

  // Merge all quests with character progress
  const mergedQuests = allQuests.map((quest) => {
    const characterQuest = characterQuests.find((cq) => cq.questId === quest.id)

    const objectives = quest.objectives.map((obj: any) => {
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

    const completedObjectives = objectives.filter((o: any) => o.completed).length
    const totalObjectives = objectives.length
    const progress =
      totalObjectives > 0 ? Math.round((completedObjectives / totalObjectives) * 100) : 0

    return {
      ...quest,
      objectives,
      characterStatus: characterQuest?.status || null,
      progress,
      // Serialize dates
      createdAt: quest.createdAt instanceof Date ? quest.createdAt.toISOString() : quest.createdAt,
    }
  })

  return (
    <PageTemplate
      title="Questy"
      icon={<ScrollText />}
      maxWidth="lg"
      backLink={{ href: '/game', label: 'Zpět do hry' }}
      characterId={character.id}
    >
      <QuestClient quests={mergedQuests} characterId={character.id} />
    </PageTemplate>
  )
}
