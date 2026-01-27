import type { QuestCategory, QuestStatus } from '@prisma/client'

import { prisma } from '@/lib/db'

/**
 * Quest Entity Layer
 * Handles quest progression, objectives, and rewards
 */

export async function getAllQuests() {
  return await prisma.quest.findMany({
    include: {
      objectives: {
        orderBy: { order: 'asc' },
      },
      rewards: {
        include: {
          item: true,
        },
      },
    },
    orderBy: [{ category: 'asc' }, { level: 'asc' }],
  })
}

export async function getQuestsByCategory(category: QuestCategory) {
  return await prisma.quest.findMany({
    where: { category },
    include: {
      objectives: {
        orderBy: { order: 'asc' },
      },
      rewards: {
        include: {
          item: true,
        },
      },
    },
    orderBy: { level: 'asc' },
  })
}

export async function getQuest(id: string) {
  return await prisma.quest.findUnique({
    where: { id },
    include: {
      objectives: {
        orderBy: { order: 'asc' },
      },
      rewards: {
        include: {
          item: true,
        },
      },
    },
  })
}

export async function getCharacterQuests(characterId: string, status?: QuestStatus) {
  return await prisma.characterQuest.findMany({
    where: {
      characterId,
      ...(status && { status }),
    },
    include: {
      quest: {
        include: {
          objectives: {
            orderBy: { order: 'asc' },
          },
          rewards: {
            include: {
              item: true,
            },
          },
        },
      },
      objectives: true,
    },
    orderBy: [{ status: 'asc' }, { quest: { category: 'asc' } }],
  })
}

export async function getCharacterQuest(characterId: string, questId: string) {
  return await prisma.characterQuest.findUnique({
    where: {
      characterId_questId: {
        characterId,
        questId,
      },
    },
    include: {
      quest: {
        include: {
          objectives: {
            orderBy: { order: 'asc' },
          },
          rewards: {
            include: {
              item: true,
            },
          },
        },
      },
      objectives: true,
    },
  })
}

export async function startQuest(characterId: string, questId: string) {
  const quest = await prisma.quest.findUnique({
    where: { id: questId },
    include: { objectives: true },
  })

  if (!quest) {
    throw new Error('Quest not found')
  }

  const characterQuest = await prisma.characterQuest.create({
    data: {
      characterId,
      questId,
      status: 'ACTIVE',
      startedAt: new Date(),
      objectives: {
        create: quest.objectives.map((objective) => ({
          objectiveId: objective.id,
          current: 0,
          completed: false,
        })),
      },
    },
    include: {
      quest: {
        include: {
          objectives: true,
          rewards: {
            include: {
              item: true,
            },
          },
        },
      },
      objectives: true,
    },
  })

  return characterQuest
}

export async function updateQuestObjectiveProgress(
  characterId: string,
  questId: string,
  objectiveId: string,
  progress: number
) {
  const characterQuest = await prisma.characterQuest.findUnique({
    where: {
      characterId_questId: {
        characterId,
        questId,
      },
    },
    include: {
      quest: {
        include: {
          objectives: true,
        },
      },
      objectives: true,
    },
  })

  if (!characterQuest) {
    throw new Error('Character quest not found')
  }

  const objective = characterQuest.quest.objectives.find((obj) => obj.id === objectiveId)

  if (!objective) {
    throw new Error('Quest objective not found')
  }

  const characterObjective = characterQuest.objectives.find(
    (obj) => obj.objectiveId === objectiveId
  )

  if (!characterObjective) {
    throw new Error('Character objective not found')
  }

  const newProgress = Math.min(progress, objective.target)
  const completed = newProgress >= objective.target

  await prisma.characterQuestObjective.update({
    where: { id: characterObjective.id },
    data: {
      current: newProgress,
      completed,
    },
  })

  // Check if all objectives are completed
  const updatedCharacterQuest = await prisma.characterQuest.findUnique({
    where: {
      characterId_questId: {
        characterId,
        questId,
      },
    },
    include: {
      objectives: true,
    },
  })

  const allCompleted = updatedCharacterQuest?.objectives.every((obj) => obj.completed)

  if (allCompleted) {
    return await prisma.characterQuest.update({
      where: {
        characterId_questId: {
          characterId,
          questId,
        },
      },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
      include: {
        quest: {
          include: {
            objectives: true,
            rewards: {
              include: {
                item: true,
              },
            },
          },
        },
        objectives: true,
      },
    })
  }

  return updatedCharacterQuest
}

export async function completeQuest(characterId: string, questId: string) {
  return await prisma.characterQuest.update({
    where: {
      characterId_questId: {
        characterId,
        questId,
      },
    },
    data: {
      status: 'COMPLETED',
      completedAt: new Date(),
    },
    include: {
      quest: {
        include: {
          objectives: true,
          rewards: {
            include: {
              item: true,
            },
          },
        },
      },
      objectives: true,
    },
  })
}

export async function failQuest(characterId: string, questId: string) {
  return await prisma.characterQuest.update({
    where: {
      characterId_questId: {
        characterId,
        questId,
      },
    },
    data: {
      status: 'FAILED',
    },
  })
}

export async function abandonQuest(characterId: string, questId: string) {
  return await prisma.characterQuest.delete({
    where: {
      characterId_questId: {
        characterId,
        questId,
      },
    },
  })
}
