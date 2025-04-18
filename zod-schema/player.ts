import { z } from 'zod'
import i18n from '@/lib/i18n'

import { DIRECTIONS } from '@/config'

export const playerSignSchema = z.object({
  email: z.string({ required_error: i18n.t('user.email.required') }),
  password: z.string({ required_error: i18n.t('user.password.required') }),
})

export type PlayerSignSchema = z.infer<typeof playerSignSchema>

export const playerCreateSchema = z.object({
  name: z.string({ required_error: i18n.t('character.name.required') }),
  raceId: z.string({ required_error: i18n.t('race.required') }),
  classId: z.string({ required_error: i18n.t('class.required') }),
})

export type PlayerCreateSchema = z.infer<typeof playerCreateSchema>

export const playerMoveSchema = z.object({ direction: z.enum(DIRECTIONS) })

export type PlayerMoveSchema = z.infer<typeof playerMoveSchema>
