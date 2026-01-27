import { getCharacterByUserId } from '@/entity/character'
import { getAllQuests, getCharacterQuests } from '@/entity/quest'

import { auth } from '@/lib/auth'
import { DUMMY_QUESTS } from '@/lib/game/quests'

import type { MergedQuest } from '@/components/features/Quest/Shared/types'

export async function getQuestPageData() {
  const session = await auth()
  if (!session?.user?.id) return null

  const character = await getCharacterByUserId(session.user.id)
  if (!character) return null

  const allQuests = await getAllQuests()

  const questsToUse = allQuests.length > 0 ? allQuests : DUMMY_QUESTS

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
