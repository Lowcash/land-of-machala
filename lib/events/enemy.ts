import { db } from '@/lib/db'
import TypedEventEmitter from '@/lib/emitter'
import type { Enemy } from '@prisma/client'

import * as QuestAction from '@/app/actions/quest'

export const emitter = new TypedEventEmitter<{
  defeated: Enemy
}>()

emitter.on('defeated', async (enemy) => {
  const userQuest = (await QuestAction.getAssigned())?.data!

  if (!!userQuest.quest_slain_enemy) {
    const actualSlain = userQuest.quest_slain_enemy.slain.actual_slain
    const desiredSlain = userQuest.quest_slain_enemy.slain.desired_slain

    if (actualSlain >= desiredSlain) return

    await db.slain.update({
      where: { id: userQuest.quest_slain_enemy.slain.id },
      data: { actual_slain: actualSlain + 1 },
    })

    await QuestAction.checkProgress({ ident: 'SLAIN_ENEMY' })
  }
  if (!!userQuest.quest_slain_troll) {
    if (enemy.id !== 'troll') return

    const actualSlain = userQuest.quest_slain_troll.slain.actual_slain
    const desiredSlain = userQuest.quest_slain_troll.slain.desired_slain

    if (actualSlain >= desiredSlain) return

    await db.slain.update({
      where: { id: userQuest.quest_slain_troll.slain.id },
      data: { actual_slain: actualSlain + 1 },
    })

    await QuestAction.checkProgress({ ident: 'SLAIN_TROLL' })
  }
})
