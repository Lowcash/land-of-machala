'use server'

import type { Armor, Weapon } from '@prisma/client'
import { protectedAction } from '@/server/trpc'

import * as PlayerAction from '@/server/actions/player'
import * as WearableAction from '@/server/actions/wearable'

export const get = protectedAction.query(async () => {
  const [player, wearable] = await Promise.all([PlayerAction.get(), WearableAction.get()])

  const weapons: PlayerWeapons = {
    leftHand: wearable.left_hand?.weapon,
    rightHand: wearable.right_hand?.weapon,
  }
  const armors: PlayerArmors = {
    head: wearable.head?.armor,
    shoulder: wearable.shoulder?.armor,
    chest: wearable.chest?.armor,
    hand: wearable.hand?.armor,
    pants: wearable.pants?.armor,
    boots: wearable.boots?.armor,
  }

  return {
    level: player.level,
    damage: getDamage(weapons),
    strength: getStrength(armors),
    agility: getAgility(armors),
    intelligence: getIntelligence(armors),
  }
})

type PlayerArmors = {
  head?: Armor
  shoulder?: Armor
  chest?: Armor
  hand?: Armor
  pants?: Armor
  boots?: Armor
}

function getStrength(armors: PlayerArmors) {
  return (
    (armors.head?.strength ?? 0) +
    (armors.shoulder?.strength ?? 0) +
    (armors.chest?.strength ?? 0) +
    (armors.hand?.strength ?? 0) +
    (armors.pants?.strength ?? 0) +
    (armors.boots?.strength ?? 0)
  )
}

function getAgility(armors: PlayerArmors) {
  return (
    (armors.head?.agility ?? 0) +
    (armors.shoulder?.agility ?? 0) +
    (armors.chest?.agility ?? 0) +
    (armors.hand?.agility ?? 0) +
    (armors.pants?.agility ?? 0) +
    (armors.boots?.agility ?? 0)
  )
}

function getIntelligence(armors: PlayerArmors) {
  return (
    (armors.head?.intelligency ?? 0) +
    (armors.shoulder?.intelligency ?? 0) +
    (armors.chest?.intelligency ?? 0) +
    (armors.hand?.intelligency ?? 0) +
    (armors.pants?.intelligency ?? 0) +
    (armors.boots?.intelligency ?? 0)
  )
}

type PlayerWeapons = {
  leftHand?: Weapon
  rightHand?: Weapon
}

function getDamage(weapons: PlayerWeapons) {
  return {
    min: (weapons.leftHand?.damage_from ?? 0) + (weapons.rightHand?.damage_from ?? 0),
    max: (weapons.leftHand?.damage_to ?? 0) + (weapons.rightHand?.damage_to ?? 0),
  }
}
