import type { Quest as PrismaQuest, QuestCategory, QuestStatus } from '@prisma/client'

export type { QuestCategory, QuestStatus }

export type MergedQuest = PrismaQuest & {
  objectives: Array<{
    id: string
    description: string
    target: number
    current: number
    completed: boolean
    order: number
  }>
  rewards: Array<{
    id: string
    itemId: string | null
    quantity: number
    item: {
      id: string
      name: string
    } | null
  }>
  characterStatus: QuestStatus | null
  progress: number // 0-100
}
