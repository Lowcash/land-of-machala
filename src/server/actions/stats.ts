'use server'

import { protectedAction } from '@/server/trpc'

import * as _Stats from './_stats'
import * as PlayerAction from '@/server/actions/player'
import * as WearableAction from '@/server/actions/wearable'

export const get = protectedAction.query(async () => {
  const [player, wearable] = await Promise.all([PlayerAction.get(), WearableAction.get()])

  const weapons: _Stats.PlayerWeapons = {
    leftHand: wearable.left_hand?.weapon,
    rightHand: wearable.right_hand?.weapon,
  }
  const armors: _Stats.PlayerArmors = {
    head: wearable.head?.armor,
    shoulder: wearable.shoulder?.armor,
    chest: wearable.chest?.armor,
    hand: wearable.hand?.armor,
    pants: wearable.pants?.armor,
    boots: wearable.boots?.armor,
  }

  return {
    level: player.level,
    damage: _Stats.getDamage(weapons),
    strength: _Stats.getStrength(armors),
    agility: _Stats.getAgility(armors),
    intelligence: _Stats.getIntelligence(armors),
  }
})
