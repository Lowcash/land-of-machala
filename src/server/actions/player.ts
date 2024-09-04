'use server'

import { z } from 'zod'
import { db } from '../db'
import { cache } from 'react'
import { serverActionProcedure, protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'
import { getPlace } from './place'
import { getWearable } from './wearable'
import { checkForEnemy } from './game'

import { PROFESSIONS, RACES } from '@/const'
import { DIRECTIONS, ERROR_CAUSE } from '@/const'

export const getPlayerSession = cache(serverActionProcedure.query(({ ctx }) => ctx.user))

export const getPlayer = protectedAction.query(async ({ ctx }) => {
  const player = await db.user.findFirst({
    where: { id: ctx.user.id },
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

  if (!player) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  const { damage_min, damage_max, strength, agility, intelligence, ...playerOther } = player

  return playerOther
})

export const getPlayerCached = cache(getPlayer)

export const getPlayerStats = protectedAction.query(async ({ ctx }) => {
  const playerWearable = await getWearable()

  const strength =
    (playerWearable.head?.armor?.strength ?? 0) +
    (playerWearable.shoulder?.armor?.strength ?? 0) +
    (playerWearable.chest?.armor?.strength ?? 0) +
    (playerWearable.hand?.armor?.strength ?? 0) +
    (playerWearable.pants?.armor?.strength ?? 0) +
    (playerWearable.boots?.armor?.strength ?? 0)

  const agility =
    (playerWearable.head?.armor?.agility ?? 0) +
    (playerWearable.shoulder?.armor?.agility ?? 0) +
    (playerWearable.chest?.armor?.agility ?? 0) +
    (playerWearable.hand?.armor?.agility ?? 0) +
    (playerWearable.pants?.armor?.agility ?? 0) +
    (playerWearable.boots?.armor?.agility ?? 0)

  const intelligence =
    (playerWearable.head?.armor?.intelligency ?? 0) +
    (playerWearable.shoulder?.armor?.intelligency ?? 0) +
    (playerWearable.chest?.armor?.intelligency ?? 0) +
    (playerWearable.hand?.armor?.intelligency ?? 0) +
    (playerWearable.pants?.armor?.intelligency ?? 0) +
    (playerWearable.boots?.armor?.intelligency ?? 0)

  const damage_min =
    (playerWearable.left_hand?.weapon?.damage_from ?? 0) + (playerWearable.right_hand?.weapon?.damage_from ?? 0)
  const damage_max =
    (playerWearable.left_hand?.weapon?.damage_to ?? 0) + (playerWearable.right_hand?.weapon.damage_to ?? 0)

  await db.user.update({
    where: { id: ctx.user.id },
    data: { damage_min, damage_max, strength, agility, intelligence },
  })

  return { level: (await getPlayer()).level, damage_min, damage_max, strength, agility, intelligence }
})

export const hasPlayerCharacter = cache(
  protectedAction.query(async () => {
    const player = await getPlayerCached()

    const hasRace = Boolean(player.race)
    const hasProfession = Boolean(player.profession)

    return hasRace && hasProfession
  }),
)

export const createPlayer = protectedAction
  .input(
    z.object({
      race: z.enum(RACES),
      profession: z.enum(PROFESSIONS),
    }),
  )
  .mutation(({ ctx, input }) => {
    db.user.update({
      where: { id: ctx.user.id },
      data: {
        race: input.race,
        profession: input.profession,
        hp_actual: 100,
        hp_max: 100,
        xp_actual: 0,
        xp_max: 100,
      },
    })
  })

export const canPlayerMove = cache(
  protectedAction.query(async () => {
    const player = await getPlayerCached()

    const hasEnemy = Boolean(player.enemy_instance_id)
    const hasLoot = Boolean(player.loot_id)
    const isDefeated = Boolean(player.defeated)

    return !hasEnemy && !hasLoot && !isDefeated
  }),
)

export const movePlayer = protectedAction.input(z.enum(DIRECTIONS)).mutation(async ({ input }) => {
  const player = await getPlayerCached()

  if (!(await canPlayerMove())) throw getTRPCErrorFromUnknown(ERROR_CAUSE.CANNOT_MOVE)

  const horizontal = input === 'left' ? -1 : input === 'right' ? 1 : 0
  const vertical = input === 'down' ? -1 : input === 'up' ? 1 : 0

  await db.user.update({
    where: { id: player.id },
    data: {
      pos_x: player.pos_x + horizontal,
      pos_y: player.pos_y + vertical,
    },
  })

  if (await isPlayerOnPlace()) return

  await checkForEnemy()
})

export const isPlayerOnPlace = protectedAction.query(async () => {
  const player = await getPlayerCached()
  const place = await getPlace({ posX: player.pos_x, posY: player.pos_y })

  return Boolean(place)
})

export const isPlayerInCombat = protectedAction.query(async () => {
  const player = await getPlayerCached()

  return Boolean(player.enemy_instance)
})

export const isPlayerDefeated = protectedAction.query(async () => {
  const player = await getPlayerCached()

  return player.defeated
})

export const hasPlayerLoot = protectedAction.query(async () => {
  const player = await getPlayerCached()

  return Boolean(player.loot)
})
