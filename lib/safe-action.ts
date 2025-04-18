import 'server-only'
import { z } from 'zod'
import { db } from '@/lib/db'
import { createSafeActionClient, flattenValidationErrors } from 'next-safe-action'
import { getServerSession } from 'next-auth/next'
import { type User } from '@prisma/client'

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
  const userSession = await getServerSession()

  if (!userSession) throw new Error(ERROR_CAUSE.UNAUTHORIZED)

  const user = (await db.user.findUnique({ where: { email: userSession?.user.email! } })) as User

  if (!!user?.role && user.role === metadata.role) throw new Error(ERROR_CAUSE.NO_PERMISSION)

  return next({ ctx: { user } })
})

export const handleValidationErrorsShape = async (ve: any) => flattenValidationErrors(ve).fieldErrors
