'use server'

import { z } from 'zod'
import { protectedAction } from '@/server/trpc'
import * as Place from './_place'

export const get = protectedAction
  .input(
    z.object({
      posX: z.number(),
      posY: z.number(),
    }),
  )
  .query(async ({ input }) => Place.get({ x: input.posX, y: input.posY }))
