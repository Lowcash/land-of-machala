import 'server-only'

import { db } from '@/lib/db'

import * as ArmorEntity from '@/entity/armor'
import * as PlayerEntity from '@/entity/player'
import * as WeaponEntity from '@/entity/weapon'

export type WearableEntity = NonNullable<Awaited<ReturnType<typeof get>>>

export async function get(player: PlayerEntity.CharacterEntity, wearableId: Nullish<string>) {
  const wearable = wearableId
    ? await db.wearable.findFirst({
        where: { id: wearableId },
        include: {
          left_hand: { include: { weapon: true } },
          right_hand: { include: { weapon: true } },
          head: { include: { armor: true } },
          shoulder: { include: { armor: true } },
          chest: { include: { armor: true } },
          hands: { include: { armor: true } },
          pants: { include: { armor: true } },
          boots: { include: { armor: true } },
        },
      })
    : await db.$transaction(async (db) => {
        const wearable = await db.wearable.create({
          data: {},
          include: {
            left_hand: { include: { weapon: true } },
            right_hand: { include: { weapon: true } },
            head: { include: { armor: true } },
            shoulder: { include: { armor: true } },
            chest: { include: { armor: true } },
            hands: { include: { armor: true } },
            pants: { include: { armor: true } },
            boots: { include: { armor: true } },
          },
        })

        await db.user.update({
          where: { id: player.id },
          data: { wearable: { connect: { id: wearable.id } } },
        })

        return wearable
      })

  if (!wearable) return undefined

  return {
    ...wearable,
    head: {
      ...wearable.head,
      armor: wearable.head?.armor
        ? {
            ...wearable.head.armor,
            ...ArmorEntity.getI18n(wearable.head.armor),
          }
        : undefined,
    },
    shoulder: {
      ...wearable.shoulder,
      armor: wearable.shoulder?.armor
        ? {
            ...wearable.shoulder.armor,
            ...ArmorEntity.getI18n(wearable.shoulder.armor),
          }
        : undefined,
    },
    chest: {
      ...wearable.chest,
      armor: wearable.chest?.armor
        ? {
            ...wearable.chest.armor,
            ...ArmorEntity.getI18n(wearable.chest.armor),
          }
        : undefined,
    },
    hand: {
      ...wearable.hands,
      armor: wearable.hands?.armor
        ? {
            ...wearable.hands.armor,
            ...ArmorEntity.getI18n(wearable.hands.armor),
          }
        : undefined,
    },
    pants: {
      ...wearable.pants,
      armor: wearable.pants?.armor
        ? {
            ...wearable.pants?.armor,
            ...ArmorEntity.getI18n(wearable.pants.armor),
          }
        : undefined,
    },
    boots: {
      ...wearable.boots,
      armor: wearable.boots?.armor
        ? {
            ...wearable.boots.armor,
            ...ArmorEntity.getI18n(wearable.boots.armor),
          }
        : undefined,
    },
    left_hand: {
      ...wearable.left_hand,
      weapon: wearable.left_hand?.weapon
        ? {
            ...wearable.left_hand.weapon,
            ...WeaponEntity.getI18n(wearable.left_hand.weapon),
          }
        : undefined,
    },
    right_hand: {
      ...wearable.right_hand,
      weapon: wearable.right_hand?.weapon
        ? {
            ...wearable.right_hand.weapon,
            ...WeaponEntity.getI18n(wearable.right_hand.weapon),
          }
        : undefined,
    },
  }
}
