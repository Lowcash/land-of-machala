import { getCharacterByUserId } from '@/entity/character'
import { createServerActionProcedure } from 'zsa'

import { auth } from '@/lib/auth'

/**
 * Base procedure for authenticated actions.
 * Ensures a valid session exists.
 */

export const authenticatedProcedure = createServerActionProcedure().handler(async () => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('Nepřihlášen - relace vypršela.')
  }

  return { userId: session.user.id }
})

/**
 * Procedure for actions requiring a character.
 * Ensures the user has an associated character in the database.
 */

export const characterProcedure = createServerActionProcedure().handler(async () => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('Nepřihlášen - relace vypršela.')
  }

  const character = await getCharacterByUserId(session.user.id)

  if (!character) {
    throw new Error('Postava nenalezena - prosím vytvoř si postavu.')
  }

  return { character, userId: session.user.id }
})
