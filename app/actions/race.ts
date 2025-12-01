'use server'

import { z } from 'zod'
import { createServerAction } from 'zsa'

import { getAll } from '@/entity/race'

export const show = createServerAction()
  .input(z.object({}).optional())
  .handler(async () => getAll())
