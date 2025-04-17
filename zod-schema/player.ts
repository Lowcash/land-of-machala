import { z } from 'zod'
import i18next from '@/lib/i18n'

import { DIRECTIONS } from '@/config'

export const playerSignSchema = z.object({
  email: z.string({ required_error: i18next.t('sign.email_required') }),
  password: z.string({ required_error: i18next.t('sign.password_required') }),
})

export type PlayerSignSchema = z.infer<typeof playerSignSchema>

export const playerCreateSchema = z.object({
  name: z.string({ required_error: i18next.t('sign.name_required') }),
  raceId: z.string({ required_error: i18next.t('sign.race_required') }),
  classId: z.string({ required_error: i18next.t('sign.class_required') }),
})

export type PlayerCreateSchema = z.infer<typeof playerCreateSchema>

export const playerMoveSchema = z.object({ direction: z.enum(DIRECTIONS) })

export type PlayerMoveSchema = z.infer<typeof playerMoveSchema>
