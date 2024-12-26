import { db } from '@/server/db'

import * as _Game from './_game'
import * as QuestAction from './quest'

_Game.enemyEmitter.on('defeated', async (enemy) => {
  const userQuest = await QuestAction.getAssignedQuests()

  if (!!userQuest.quest_slain_enemy) {
    const actualSlain = userQuest.quest_slain_enemy.slain.actual_slain
    const desiredSlain = userQuest.quest_slain_enemy.slain.desired_slain

    if (actualSlain >= desiredSlain) return

    await db.slain.update({
      where: { id: userQuest.quest_slain_enemy.slain.id },
      data: { actual_slain: actualSlain + 1 },
    })

    await QuestAction.checkProgress('SLAIN_ENEMY')
  }
  if (!!userQuest.quest_slain_troll) {
    if (enemy.name !== 'troll') return

    const actualSlain = userQuest.quest_slain_troll.slain.actual_slain
    const desiredSlain = userQuest.quest_slain_troll.slain.desired_slain

    if (actualSlain >= desiredSlain) return

    await db.slain.update({
      where: { id: userQuest.quest_slain_troll.slain.id },
      data: { actual_slain: actualSlain + 1 },
    })

    await QuestAction.checkProgress('SLAIN_TROLL')
  }
})
