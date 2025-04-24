'use server'

import { actionClient } from '@/lib/safe-action'

import * as RaceEntity from '@/entity/race'

export const show = actionClient.metadata({ actionName: 'race_show' }).action(async () => RaceEntity.getAll())
