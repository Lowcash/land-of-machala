import 'server-only'

import { db } from '@/lib/db'
import { getServerSession } from 'next-auth/next'
import { createServerAction, createServerActionProcedure, ZSAError } from 'zsa'
import { get as getPlayer, hasCharacter } from '@/entity/player'

import { ERROR_CAUSE } from '@/config'

// TODO: Add Sentry DSN to environment variables and initialize Sentry
// import * as Sentry from '@sentry/nextjs'

export const actionClient = createServerAction()

// Create reusable procedures
export const authProcedure = createServerActionProcedure().handler(async () => {
  const session = await getServerSession()

  if (!session) throw new ZSAError('FORBIDDEN', ERROR_CAUSE.UNAUTHORIZED)

  const user = await db.user.findUnique({ where: { email: session.user.email! } })

  if (!user) throw new ZSAError('FORBIDDEN', ERROR_CAUSE.UNAUTHORIZED)

  return { user }
})

export const playerProcedure = createServerActionProcedure(authProcedure).handler(async ({ ctx }) => {
  const player = await getPlayer(ctx.user.id)

  if (!hasCharacter(player)) throw new ZSAError('FORBIDDEN', ERROR_CAUSE.NO_CHARACTER)

  return { ...ctx, player }
})
