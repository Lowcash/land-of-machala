import { z } from 'zod'

import { QUESTS } from '@/config'

export const questSchema = z.object({ ident: z.enum(QUESTS) })

export type QuestSchema = z.infer<typeof questSchema>
