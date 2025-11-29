'use server'

import { z } from 'zod'
import { createServerAction } from 'zsa'

import * as ClassEntity from '@/entity/class'

export const show = createServerAction()
  .input(z.object({}).optional())
  .handler(async () => ClassEntity.getAll())
