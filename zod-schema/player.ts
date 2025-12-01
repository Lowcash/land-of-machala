import { z } from 'zod'
import i18n from '@/lib/i18n'

import { DIRECTIONS } from '@/config'

export const createPlayerSchema = z.object({
  name: z.string({ required_error: i18n.t('character.name.required') }),
  raceId: z.string({ required_error: i18n.t('race.required') }),
  classId: z.string({ required_error: i18n.t('class.required') }),
})

export type PlayerCreateSchema = z.infer<typeof createPlayerSchema>

export const playerMoveSchema = z.object({ direction: z.enum(DIRECTIONS) })

export type PlayerMoveSchema = z.infer<typeof playerMoveSchema>
