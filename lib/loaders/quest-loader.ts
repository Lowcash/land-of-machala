import type { MergedQuest } from '@/components/features/Quest/Shared/types'
import { getCharacterByUserId } from '@/entity/character'
import { getAllQuests, getCharacterQuests } from '@/entity/quest'
import { auth } from '@/lib/auth'

export async function getQuestPageData() {
  const session = await auth()
  if (!session?.user?.id) return null

  const character = await getCharacterByUserId(session.user.id)
  if (!character) return null

  const allQuests = await getAllQuests()

  // Dummy quests if DB is empty
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

  const questsToUse = allQuests.length > 0 ? allQuests : dummyQuests

  const characterQuests = await getCharacterQuests(character.id)

  // Merge all quests with character progress
  const mergedQuests: MergedQuest[] = questsToUse.map((quest) => {
    const characterQuest = characterQuests.find((cq) => cq.questId === quest.id)

    const objectives = (
      (quest.objectives as unknown as Array<{
        id: string
        description: string
        target: number
        order: number
      }>) || []
    ).map((obj) => {
      const charObjective = characterQuest?.objectives.find((co) => co.objectiveId === obj.id)

      return {
        id: obj.id as string,
        description: obj.description as string,
        target: obj.target as number,
        current: charObjective?.current || 0,
        completed: charObjective?.completed || false,
        order: obj.order as number,
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
      createdAt:
        quest.createdAt instanceof Date
          ? quest.createdAt.toISOString()
          : (quest.createdAt as unknown as string),
    } as MergedQuest
  })

  return {
    characterId: character.id,
    quests: mergedQuests,
  }
}
