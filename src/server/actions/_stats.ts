import type { Armor, Weapon } from '@prisma/client'

export type PlayerArmors = {
  head?: Armor
  shoulder?: Armor
  chest?: Armor
  hand?: Armor
  pants?: Armor
  boots?: Armor
}

export function getStrength(armors: PlayerArmors) {
  return (
    (armors.head?.strength ?? 0) +
    (armors.shoulder?.strength ?? 0) +
    (armors.chest?.strength ?? 0) +
    (armors.hand?.strength ?? 0) +
    (armors.pants?.strength ?? 0) +
    (armors.boots?.strength ?? 0)
  )
}

export function getAgility(armors: PlayerArmors) {
  return (
    (armors.head?.agility ?? 0) +
    (armors.shoulder?.agility ?? 0) +
    (armors.chest?.agility ?? 0) +
    (armors.hand?.agility ?? 0) +
    (armors.pants?.agility ?? 0) +
    (armors.boots?.agility ?? 0)
  )
}

export function getIntelligence(armors: PlayerArmors) {
  return (
    (armors.head?.intelligency ?? 0) +
    (armors.shoulder?.intelligency ?? 0) +
    (armors.chest?.intelligency ?? 0) +
    (armors.hand?.intelligency ?? 0) +
    (armors.pants?.intelligency ?? 0) +
    (armors.boots?.intelligency ?? 0)
  )
}

export type PlayerWeapons = {
  leftHand?: Weapon
  rightHand?: Weapon
}

export function getDamage(weapons: PlayerWeapons) {
  return {
    min: (weapons.leftHand?.damage_from ?? 0) + (weapons.rightHand?.damage_from ?? 0),
    max: (weapons.leftHand?.damage_to ?? 0) + (weapons.rightHand?.damage_to ?? 0),
  }
}
