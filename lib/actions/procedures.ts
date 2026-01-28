import { createServerActionProcedure } from 'zsa'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

/**
 * Base procedure for authenticated actions.
 * Ensures a valid session exists.
 */

export const authenticatedProcedure = createServerActionProcedure().handler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ next }: any) => {
    const session = await auth()

    if (!session?.user?.id) {
      throw new Error('Nepřihlášen - relace vypršela.')
    }

    return next({ userId: session.user.id })
  }
)

/**
 * Procedure for actions requiring a character.
 * Ensures the user has an associated character in the database.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const characterProcedure = createServerActionProcedure().handler(async ({ next }: any) => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('Nepřihlášen - relace vypršela.')
  }

  const character = await prisma.character.findFirst({
    where: { userId: session.user.id },
  })

  if (!character) {
    throw new Error('Postava nenalezena - prosím vytvoř si postavu.')
  }

  return next({ character, userId: session.user.id })
})
