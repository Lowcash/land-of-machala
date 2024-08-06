'use server'

import { db } from '../db'
import { cache } from 'react'
import { protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'

import { ERROR_CAUSE } from '@/const'

export const getUserSession = cache(protectedAction.query(async ({ ctx }) => ctx.user))

export const getUser = protectedAction.query(async ({ ctx }) => {
  const user = await db.user.findFirst({
    where: { id: ctx.user.id },
  })

  if (!user) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  return user
})

export const hasCharacter = protectedAction.query(async () => {
  const { race, profession } = await getUser()

  return Boolean(race) && Boolean(profession)
})
