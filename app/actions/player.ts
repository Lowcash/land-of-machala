'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { playerCreateSchema, playerMoveSchema } from '@/zod-schema/player'
import { actionClient, authActionClient, playerActionClient, handleValidationErrorsShape } from '@/lib/safe-action'

import * as ClassEntity from '@/entity/class'
import * as PlayerEntity from '@/entity/player'
import * as RaceEntity from '@/entity/race'
import * as StatsEntity from '@/entity/stats'
import * as WearableEntity from '@/entity/wearable'
import * as GameManager from '@/lib/manager/game'

import { BASE_HP_ACTUAL, BASE_HP_MAX, BASE_XP_ACTUAL, BASE_XP_MAX, ERROR_CAUSE } from '@/config'

export const show = playerActionClient.metadata({ actionName: 'player_show' }).action(async ({ ctx }) => ({
  ...ctx.player,
  text: {
    character: i18n.t('character.header'),
    race: i18n.t('race.header'),
    class: i18n.t('class.header'),
    level: i18n.t('stats.level'),
    money: i18n.t('common.money'),
    currency: i18n.t('common.currency'),
    hp: i18n.t('common.hp'),
    pos_x: i18n.t('common.pos_x'),
    pos_y: i18n.t('common.pos_y'),
  },
}))

export const showCreate = actionClient.metadata({ actionName: 'user_show_create' }).action(async () => {
  return {
    text: {
      name: i18n.t('character.name.header'),
      race: i18n.t('race.header'),
      class: i18n.t('class.header'),
      create: i18n.t('character.create.header'),
      createSuccess: i18n.t('character.create.success'),
      createFailure: i18n.t('character.create.failure'),
    },
  }
})

export const create = authActionClient
  .metadata({ actionName: 'player_create' })
  .schema(playerCreateSchema, { handleValidationErrorsShape })
  .action(async ({ ctx, parsedInput }) => {
    const [race, class_] = await Promise.all([RaceEntity.get(parsedInput.raceId), ClassEntity.get(parsedInput.classId)])

    if (!race || !class_) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
    
    const player = { ...ctx.user, race, class: class_ } as PlayerEntity.PlayerEntity

    const wearable = await WearableEntity.get(player, player.wearable_id)

    if (!wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
    
    const stats = await StatsEntity.get(player, wearable)

    await db.user.update({
      where: { id: ctx.user.id },
      data: {
        name: parsedInput.name,
        race: { connect: { id: race.id } },
        class: { connect: { id: class_.id } },
        hp_actual: BASE_HP_ACTUAL,
        hp_max: BASE_HP_MAX,
        xp_actual: BASE_XP_ACTUAL,
        xp_max: BASE_XP_MAX,
        strength: stats.strength,
        agility: stats.agility,
        intelligence: stats.intelligence,
        damage_min: stats.damage.min,
        damage_max: stats.damage.max,
      },
    })
  })

export const move = playerActionClient
  .metadata({ actionName: 'player_move' })
  .schema(playerMoveSchema)
  .action(async ({ ctx, parsedInput }) => {
    if (!ctx.player.canMove) throw new Error(ERROR_CAUSE.CANNOT_MOVE)

    const horizontal = parsedInput.direction === 'left' ? -1 : parsedInput.direction === 'right' ? 1 : 0
    const vertical = parsedInput.direction === 'down' ? -1 : parsedInput.direction === 'up' ? 1 : 0

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
