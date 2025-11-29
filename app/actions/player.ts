'use server'

import { getTranslations } from 'next-intl/server'
import { db } from '@/lib/db'
import { createPlayerSchema, playerMoveSchema } from '@/zod-schema/player'
import { playerProcedure } from '@/lib/safe-action'
import { RaceEntity, ClassEntity, PlayerEntity, WearableEntity, StatsEntity } from '@/entity'
import { GameManager } from '@/lib/manager'
import { BASE_HP_ACTUAL, BASE_HP_MAX, BASE_XP_ACTUAL, BASE_XP_MAX, ERROR_CAUSE } from '@/config'

export const show = playerProcedure.createServerAction()
  .input(z.object({}).optional())
  .handler(async ({ ctx }) => {
    const t = await getTranslations()

    return {
      ...ctx.player,
      text: {
        ...ctx.player.text,
        character: t('character.header'),
        race: t('race.header'),
        class: t('class.header'),
        money: t('common.money'),
        currency: t('common.currency'),
        hp: t('common.hp'),
        pos_x: t('common.pos_x'),
        pos_y: t('common.pos_y'),
      },
    }
  })

export const showCreate = createServerAction()
  .input(z.object({}).optional())
  .handler(async () => {
    const t = await getTranslations()

    return {
      text: {
        name: t('character.name.header'),
        race: t('race.header'),
        class: t('class.header'),
        create: t('character.create.header'),
        createSuccess: t('character.create.success'),
        createFailure: t('character.create.failure'),
      },
    }
  })

export const create = authProcedure.createServerAction()
  .input(createPlayerSchema)
  .handler(async ({ ctx, input }) => {
    const [race, class_] = await Promise.all([RaceEntity.get(input.raceId), ClassEntity.get(input.classId)])

    if (!race || !class_) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
    
    const player = { ...ctx.user, race, class: class_ } as PlayerEntity.PlayerEntity

    const wearable = await WearableEntity.get(player, player.wearable_id)

    if (!wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
    
    const stats = await StatsEntity.get(player, wearable)

    await db.user.update({
      where: { id: ctx.user.id },
      data: {
        name: input.name,
        race: { connect: { id: race.id } },
        class: { connect: { id: class_.id } },
        hp_actual: BASE_HP_ACTUAL,
        hp_max: BASE_HP_MAX,
        xp_actual: BASE_XP_ACTUAL,
        xp_max: BASE_XP_MAX,
        strength: stats.strength,
        agility: stats.agility,
        intelligence: stats.intelligence,
        armor: stats.armor,
        damage_min: stats.damage.min,
        damage_max: stats.damage.max,
      },
    })
  })

export const move = playerProcedure.createServerAction()
  .input(playerMoveSchema)
  .handler(async ({ ctx, input }) => {
    if (!ctx.player.canMove) throw new Error(ERROR_CAUSE.CANNOT_MOVE)

    const horizontal = input.direction === 'left' ? -1 : input.direction === 'right' ? 1 : 0
    const vertical = input.direction === 'down' ? -1 : input.direction === 'up' ? 1 : 0

    const newPosX = ctx.player.pos_x + horizontal
    const newPosY = ctx.player.pos_y + vertical

    await db.user.update({
      where: { id: ctx.player.id },
      data: {
        pos_x: newPosX,
        pos_y: newPosY,
      },
    })

    if (!ctx.player.hasSafePlace)
      await GameManager.spawnEnemyIfPossible(db, { ...ctx.player, pos_x: newPosX, pos_y: newPosY })
  })
