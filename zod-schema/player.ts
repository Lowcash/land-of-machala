import { z } from 'zod'
import { loc } from '@/lib/localization'

import { DIRECTIONS } from '@/config'

export const playerSignSchema = z.object({
  email: z.string({ required_error: loc.sign.email_required }),
  password: z.string({ required_error: loc.sign.password_required }),
})

export type PlayerSignSchema = z.infer<typeof playerSignSchema>

export const playerCreateSchema = z.object({
  name: z.string({ required_error: loc.sign.name_required }),
  raceId: z.union([z.string(), z.number()], { required_error: loc.sign.race_required }),
  classId: z.union([z.string(), z.number()], { required_error: loc.sign.class_required }),
})

export type PlayerCreateSchema = z.infer<typeof playerCreateSchema>

export const playerMoveSchema = z.object({ direction: z.enum(DIRECTIONS) })

export type PlayerMoveSchema = z.infer<typeof playerMoveSchema>
