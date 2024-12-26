import { db } from '@/server/db'
import type { Profession, Race, User } from '@prisma/client'
import * as PlaceAction from '@/server/actions/place'

import { DIRECTIONS } from '@/const'

export function get(id: string) {
  return db.user.findFirst({
    where: { id },
    include: {
      enemy_instance: { include: { enemy: true } },
      loot: {
        include: {
          armors_loot: { include: { armor: true } },
          weapons_loot: { include: { weapon: true } },
        },
      },
    },
  })
}

export function create(id: string, character: { race: Race; profession: Profession }) {
  return db.user.update({
    where: { id },
    data: {
      race: character.race,
      profession: character.profession,
      hp_actual: 100,
      hp_max: 100,
      xp_actual: 0,
      xp_max: 100,
    },
  })
}

export function move(id: string, position: Coordinates, direction: (typeof DIRECTIONS)[number]) {
  const horizontal = direction === 'left' ? -1 : direction === 'right' ? 1 : 0
  const vertical = direction === 'down' ? -1 : direction === 'up' ? 1 : 0

  return db.user.update({
    where: { id },
    data: {
      pos_x: position.x + horizontal,
      pos_y: position.y + vertical,
    },
  })
}

export function canMove(player: User) {
  return !isInCombat(player) && !isDefeated(player) && !hasLoot(player)
}

export function isInCombat(player: User) {
  return !!player.enemy_instance_id
}

function isDefeated(player: User) {
  return !!player.defeated
}

export function hasLoot(player: User) {
  return !!player.loot_id
}

export function hasCharacter(player: User) {
  return hasRace(player) && hasProfession(player)
}

function hasRace(player: User) {
  return !!player.race
}

function hasProfession(player: User) {
  return !!player.race
}

export function isSafe(player: User) {
  return isInPlace({ x: player.pos_x, y: player.pos_y })
}

function isInPlace(position: Coordinates) {
  return PlaceAction.get({ posX: position.x, posY: position.y })
}
