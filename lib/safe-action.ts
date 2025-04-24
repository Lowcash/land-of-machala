import 'server-only'

import { z } from 'zod'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth/next'
import { createSafeActionClient, flattenValidationErrors } from 'next-safe-action'
import * as Player from '@/entity/player'

import { ERROR_CAUSE } from '@/config'

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
      role: z.string().nullish(),
    })
  },
  handleServerError: (error, { clientInput, metadata }) => {
    // Sentry.captureExceptions(error, (scope) => {
    //   scope.clear()
    //   scope.setContext('serverError', { message: error.message })
    //   scope.setContext('clientInput', { clientInput })
    //   return scope
    // })
    // if (error.contructor.name === 'DatabaseError') {
    //   return 'Database Error: Data did not save'
    // }

    return error.message
  },
})

export const authActionClient = actionClient.use(async ({ next, metadata }) => {
  const session = await getServerSession()

  if (!session) throw new Error(ERROR_CAUSE.UNAUTHORIZED)

  const user = await db.user.findUnique({ where: { email: session.user.email! } })

  if (!user) throw new Error(ERROR_CAUSE.UNAUTHORIZED) // TODO login by role

  // if (!user || user.role !== metadata.role) throw new Error(ERROR_CAUSE.NO_PERMISSION)
  // if (!!user?.role && user.role === metadata.role) throw new Error(ERROR_CAUSE.NO_PERMISSION)

  return next({ ctx: { user } })
})

export const playerActionClient = authActionClient.use(async ({ next, ctx }) => {
  const player = await Player.get(ctx.user.id)

  if (!Player.hasCharacter(player)) throw new Error(ERROR_CAUSE.NO_CHARACTER)

  return next({ ctx: { player } })
})

export const handleValidationErrorsShape = async (ve: any) => flattenValidationErrors(ve).fieldErrors
