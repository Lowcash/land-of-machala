'use server'

import { playerActionClient } from '@/lib/safe-action'

import * as QuestEntity from '@/entity/quest'

import { ERROR_CAUSE } from '@/config'

export const showAssigned = playerActionClient
  .metadata({ actionName: 'quest_show_assigned' })
  .action(async ({ ctx }) => {
    const assignedQuests = await QuestEntity.getAssigned(ctx.player.id, ctx.player.user_quest_id)

    if (!assignedQuests) throw new Error(ERROR_CAUSE.ENTITY_NOT_EXIST)

    return assignedQuests
  })
