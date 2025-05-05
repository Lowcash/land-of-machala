import 'server-only'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import type { Class, Race, EnemyInstance, Loot, User } from '@prisma/client'
import { PlaceType } from '@prisma/client'

import * as PlaceEntity from '@/entity/place'
import * as RaceEntity from '@/entity/race'
import * as ClassEntity from '@/entity/class'

export type PlayerEntity = NonNullable<Awaited<ReturnType<typeof get>>>

export async function get(id: string) {
  const player = await db.user.findFirst({
    where: { id },
    include: {
      race: true,
      class: true,
      enemy_instance: { include: { enemy: true } },
      loot: {
        include: {
          armors_loot: { include: { armor: true } },
          weapons_loot: { include: { weapon: true } },
        },
      },
    },
  })

  if (!hasCharacter(player)) return

  return {
    ...player,
    race: {
      ...player.race,
      ...RaceEntity.getI18n(player.race),
    },
    class: {
      ...player.class,
      ...ClassEntity.getI18n(player.class),
    },
    loot: hasLoot(player)
      ? {
          ...player.loot,
          armors_loot: player.loot.armors_loot.map((x) => ({
            ...x,
            armor: { ...x.armor, name: i18n.t(`${x.armor.i18n_key}.header` as any) },
          })),
          weapons_loot: player.loot.weapons_loot.map((x) => ({
            ...x,
            weapon: { ...x.weapon, name: i18n.t(`${x.weapon.i18n_key}.header` as any) },
          })),
        }
      : undefined,
    canMove: !hasCombat(player) && !player.defeated && !hasLoot(player),
    hasSafePlace:
      !hasCombat(player) &&
      (await PlaceEntity.get({ posX: player.pos_x, posY: player.pos_y }))?.type == PlaceType.SAFEHOUSE,
      text: {
        level: `${player.level} ${i18n.t('stats.level_abbr')}`
      }
  }
}

export type CharacterEntity = User & {
  race: Race
  race_id: number
  class: Class
  class_id: number
  pos_x: number
  pos_y: number
  hp_actual: number
  hp_max: number
  xp_actual: number
  xp_max: number
  defeated: boolean
}

export function hasCharacter(player: any): player is CharacterEntity {
  return (
    typeof player?.race === 'object' &&
    typeof player?.race_id === 'string' &&
    typeof player?.class === 'object' &&
    typeof player?.class_id === 'string' &&
    typeof player?.pos_x === 'number' &&
    typeof player?.pos_y === 'number' &&
    typeof player?.hp_actual === 'number' &&
    typeof player?.hp_max === 'number' &&
    typeof player?.xp_actual === 'number' &&
    typeof player?.xp_max === 'number' &&
    typeof player?.defeated === 'boolean'
  )
}

export function hasCombat(player: any): player is { enemy_instance: EnemyInstance; enemy_instance_id: number } {
  return typeof player?.enemy_instance === 'object' && typeof player?.enemy_instance_id === 'string'
}

export function hasLoot(player: any): player is { loot: Loot; loot_id: number } {
  return typeof player?.loot === 'object' && typeof player?.loot_id === 'string'
}
