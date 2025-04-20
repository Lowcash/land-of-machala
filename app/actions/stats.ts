'use server'

import i18n from '@/lib/i18n'
import type { Armor, Class, Race, Weapon } from '@prisma/client'
import { authActionClient } from '@/lib/safe-action'

import * as PlayerAction from './player'
import * as WearableAction from './wearable'

import {
  ERROR_CAUSE,
  AGILITY_DAMAGE_CONTRIBUTOR_MULTIPLIER,
  BASE_MAX_DAMAGE,
  BASE_MIN_DAMAGE,
  INTELLIGENCE_DAMAGE_CONTRIBUTOR_MULTIPLIER,
  STRENGTH_DAMAGE_CONTRIBUTOR_MULTIPLIER,
} from '@/config'

export const show = authActionClient.metadata({ actionName: 'stats_show' }).action(async () => {
  const stats = await get().then((x) => x?.data)

  return {
    ...stats,
    text: {
      header: i18n.t('stats.header'),
      level: i18n.t('stats.level'),
      damage: i18n.t('stats.damage'),
      strength: i18n.t('stats.strength'),
      agility: i18n.t('stats.agility'),
      intelligence: i18n.t('stats.intelligence'),
    },
  }
})

export const get = authActionClient.metadata({ actionName: 'stats_get' }).action(async ({ ctx }) => {
  const [player, wearable] = await Promise.all([
    PlayerAction.get().then((x) => x?.data),
    WearableAction.get().then((x) => x?.data),
  ])

  if (!player || !player.race || !player.class || !wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  const character: Character = {
    level: ctx.user.level,
    class: player.class,
    race: player.race,
  }
  const weapons: PlayerWeapons = {
    leftHand: wearable.left_hand.weapon,
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

  const strength = getStrength({ character, armors })
  const agility = getAgility({ character, armors })
  const intelligence = getIntelligence({ character, armors })

  const damage = getDamage({ strength, agility, intelligence, weapons })

  return {
    level: character.level,
    damage,
    strength,
    agility,
    intelligence,
  }
})

type ArmorStatsContributor = {
  character: Character
  armors: PlayerArmors
}

type Character = {
  level: number
  race: Race
  class: Class
}

type PlayerArmors = {
  head?: Armor
  shoulder?: Armor
  chest?: Armor
  hand?: Armor
  pants?: Armor
  boots?: Armor
}

function getStrength({ character, armors }: ArmorStatsContributor) {
  return (
    character.level +
    (character.race?.strength ?? 0) +
    (character.class?.strength ?? 0) +
    (armors.head?.strength ?? 0) +
    (armors.shoulder?.strength ?? 0) +
    (armors.chest?.strength ?? 0) +
    (armors.hand?.strength ?? 0) +
    (armors.pants?.strength ?? 0) +
    (armors.boots?.strength ?? 0)
  )
}

function getAgility({ character, armors }: ArmorStatsContributor) {
  return (
    character.level +
    (character.race?.agility ?? 0) +
    (character.class?.agility ?? 0) +
    (armors.head?.agility ?? 0) +
    (armors.shoulder?.agility ?? 0) +
    (armors.chest?.agility ?? 0) +
    (armors.hand?.agility ?? 0) +
    (armors.pants?.agility ?? 0) +
    (armors.boots?.agility ?? 0)
  )
}

function getIntelligence({ character, armors }: ArmorStatsContributor) {
  return (
    character.level +
    (character.race?.intelligence ?? 0) +
    (character.class?.intelligence ?? 0) +
    (armors.head?.intelligence ?? 0) +
    (armors.shoulder?.intelligence ?? 0) +
    (armors.chest?.intelligence ?? 0) +
    (armors.hand?.intelligence ?? 0) +
    (armors.pants?.intelligence ?? 0) +
    (armors.boots?.intelligence ?? 0)
  )
}

type WeaponStatsContributor = {
  strength: number
  agility: number
  intelligence: number
  weapons: PlayerWeapons
}

type PlayerWeapons = {
  leftHand?: Weapon
  rightHand?: Weapon
}

function getDamage({ strength, agility, intelligence, weapons }: WeaponStatsContributor) {
  const strengthDamage = strength * STRENGTH_DAMAGE_CONTRIBUTOR_MULTIPLIER
  const agilityDamage = agility * AGILITY_DAMAGE_CONTRIBUTOR_MULTIPLIER
  const intelligenceDamage = intelligence * INTELLIGENCE_DAMAGE_CONTRIBUTOR_MULTIPLIER

  const statsDamage = Math.floor(strengthDamage + agilityDamage + intelligenceDamage)

  return {
    min: BASE_MIN_DAMAGE + statsDamage + (weapons.leftHand?.damage_from ?? 0) + (weapons.rightHand?.damage_from ?? 0),
    max: BASE_MAX_DAMAGE + statsDamage + (weapons.leftHand?.damage_to ?? 0) + (weapons.rightHand?.damage_to ?? 0),
  }
}
