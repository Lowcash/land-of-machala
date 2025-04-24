'use server'

import { actionClient } from '@/lib/safe-action'

import * as ClassEntity from '@/entity/class'

export const show = actionClient.metadata({ actionName: 'class_show' }).action(async () => ClassEntity.getAll())
