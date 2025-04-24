'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { QuestIdent } from '@prisma/client'

export type QuestEntity = NonNullable<Awaited<ReturnType<typeof get>>>

export async function get(ident: QuestIdent) {
  const quest = await db.quest.findFirst({
    where: { ident },
  })

  if (!quest) return undefined

  return quest
}

export type QuestAssignedEntity = NonNullable<Awaited<ReturnType<typeof getAssigned>>>

export async function getAssigned(playerId: string, userQuestId: Nullish<string>) {
  const userQuest = userQuestId
    ? await db.userQuest.findFirst({
        where: { id: userQuestId },
        include: {
          quest_slain_enemy: { include: { quest: true, slain: { include: { enemy: true } } } },
          quest_slain_troll: { include: { quest: true, slain: { include: { enemy: true } } } },
        },
      })
    : await db.$transaction(async (db) => {
        const userQuest = await db.userQuest.create({
          data: {},
          include: {
            quest_slain_enemy: { include: { quest: true, slain: { include: { enemy: true } } } },
            quest_slain_troll: { include: { quest: true, slain: { include: { enemy: true } } } },
          },
        })

        await db.user.update({
          where: { id: playerId },
          data: { user_quest: { connect: { id: userQuest.id } } },
        })

        return userQuest
      })

  if (!userQuest) return undefined

  return {
    ...userQuest,
    quest_slain_enemy: userQuest.quest_slain_enemy
      ? {
          ...userQuest.quest_slain_enemy,
          text: {
            description: i18n.t('quest.slain_enemy.description_short'),
            slained: i18n.t('quest.slained'),
          },
          quest: {
            ...userQuest.quest_slain_enemy.quest,
            name: i18n.t('quest.slain_enemy.header'),
          },
        }
      : undefined,
    quest_slain_troll: userQuest.quest_slain_troll
      ? {
          ...userQuest.quest_slain_troll,
          text: {
            description: i18n.t('quest.slain_troll.description_short'),
            slained: i18n.t('quest.slained'),
          },
          quest: {
            ...userQuest.quest_slain_troll.quest,
            name: i18n.t('quest.slain_troll.header'),
          },
        }
      : undefined,
  }
}
