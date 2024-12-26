import type { User } from '@prisma/client'

import * as PlaceAction from '@/server/actions/place'

export function hasCharacter(player: User) {
  return hasRace(player) && hasProfession(player)
}

export function hasRace(player: User) {
  return !!player.race
}

export function hasProfession(player: User) {
  return !!player.race
}

export function isSafe(player: User) {
  return isInPlace({ x: player.pos_x, y: player.pos_y })
}

export function isInPlace(position: Coordinates) {
  return PlaceAction.get({ posX: position.x, posY: position.y })
}

export function canMove(player: User) {
  return !isInCombat(player) && !isDefeated(player) && !hasLoot(player)
}

export function isInCombat(player: User) {
  return !!player.enemy_instance_id
}

export function isDefeated(player: User) {
  return !!player.defeated
}

export function hasLoot(player: User) {
  return !!player.loot_id
}
