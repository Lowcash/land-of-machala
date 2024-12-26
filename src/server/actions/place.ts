'use server'

import { z } from 'zod'
import { db } from '@/server/db'
import { protectedAction } from '@/server/trpc'

export const get = protectedAction
  .input(
    z.object({
      posX: z.number(),
      posY: z.number(),
    }),
  )
  .query(async ({ input }) =>
    db.place.findFirst({
      where: { pos_x: input.posX, pos_y: input.posY },
      include: {
        hospital: true,
        armory: true,
        bank: true,
      },
    }),
  )
