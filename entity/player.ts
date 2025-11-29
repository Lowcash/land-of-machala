import 'server-only'

import { t } from '@/lib/i18n'
import { db } from '@/lib/db'
import type { Class, Race, EnemyInstance, Loot, User } from '@prisma/client'
import { PlaceType } from '@prisma/client'

import { get as getPlace } from '@/entity/place'
import { getI18n as getRaceI18n } from '@/entity/race'
import { getI18n as getClassI18n } from '@/entity/class'
import { getI18n as getEnemyI18n } from '@/entity/enemy'

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
      ...getRaceI18n(player.race),
    },
    class: {
      ...player.class,
      ...getClassI18n(player.class),
    },
    enemy_instance: player.enemy_instance
      ? {
          ...player.enemy_instance,
          enemy: {
            ...player.enemy_instance.enemy,
            ...getEnemyI18n(player.enemy_instance.enemy),
          },
        }
      : undefined,
    loot: hasLoot(player)
      ? {
          ...player.loot,
          armors_loot: player.loot.armors_loot.map((x) => ({
            ...x,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dynamic i18n key from database
            armor: { ...x.armor, name: t(`${x.armor.i18n_key}.header` as any) },
          })),
          weapons_loot: player.loot.weapons_loot.map((x) => ({
            ...x,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dynamic i18n key from database
            weapon: { ...x.weapon, name: t(`${x.weapon.i18n_key}.header` as any) },
          })),
        }
      : undefined,
    canMove: !hasCombat(player) && !player.defeated && !hasLoot(player),
    hasSafePlace:
      !hasCombat(player) && (await getPlace({ posX: player.pos_x, posY: player.pos_y }))?.type == PlaceType.SAFEHOUSE,
    text: {
      level: `${player.level} ${t('stats.level_abbr')}`,
    },
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

// Enhanced type guards with branded types
export function hasCharacter(player: unknown): player is CharacterEntity {
  if (typeof player !== 'object' || player === null) return false
  const p = player as Record<string, unknown>

  return (
    typeof p.race === 'object' &&
    p.race !== null &&
    typeof p.race_id === 'string' &&
    typeof p.class === 'object' &&
    p.class !== null &&
    typeof p.class_id === 'string' &&
    typeof p.pos_x === 'number' &&
    typeof p.pos_y === 'number' &&
    typeof p.hp_actual === 'number' &&
    typeof p.hp_max === 'number' &&
    typeof p.xp_actual === 'number' &&
    typeof p.xp_max === 'number' &&
    typeof p.defeated === 'boolean'
  )
}

export function hasCombat(player: unknown): player is { enemy_instance: EnemyInstance; enemy_instance_id: string } {
  if (typeof player !== 'object' || player === null) return false
  const p = player as Record<string, unknown>

  return typeof p.enemy_instance === 'object' && p.enemy_instance !== null && typeof p.enemy_instance_id === 'string'
}

export function hasLoot(player: unknown): player is { loot: Loot; loot_id: string } {
  if (typeof player !== 'object' || player === null) return false
  const p = player as Record<string, unknown>

  return typeof p.loot === 'object' && p.loot !== null && typeof p.loot_id === 'string'
}
