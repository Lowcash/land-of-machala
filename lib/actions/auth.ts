'use server'

import { createUser, getUser, getUserByUsername } from '@/entity/user'
import { randomBytes } from 'crypto'
import { createServerAction } from 'zsa'

import { auth, signIn, signOut } from '@/lib/auth'
import { loginSchema, registerSchema } from '@/lib/schemas/auth'

/**
 * Auth Server Actions
 */

export const loginAction = createServerAction()
  .input(loginSchema)
  .handler(async ({ input }) => {
    const { email, password } = input

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (!result || result.error) {
      throw new Error('Nesprávné údaje')
    }

    const user = await getUser(email)
    if (!user) {
      throw new Error('Uživatel nenalezen')
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    }
  })

export const registerAction = createServerAction()
  .input(registerSchema)
  .handler(async ({ input }) => {
    const { email, username, password } = input

    // Check if user already exists
    const existingUser = await getUser(email)
    if (existingUser) {
      throw new Error('E-mail je již registrován')
    }

    const finalUsername = (username || email.split('@')[0]) as string

    const existingUsername = await getUserByUsername(finalUsername)
    if (existingUsername) {
      throw new Error('Uživatelské jméno je již obsazeno')
    }

    const user = await createUser({
      email,
      username: finalUsername,
      password,
    })

    // Sign in the newly created user
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (!result || result.error) {
      throw new Error('Nepodařilo se přihlásit po registraci')
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    }
  })

export const logoutAction = createServerAction().handler(async () => {
  await signOut({ redirect: false })
  return { success: true }
})

export const createGuestAccountAction = createServerAction().handler(async () => {
  // Generate random credentials
  const randomId = randomBytes(4).toString('hex')
  const email = `guest_${randomId}@example.com`
  const password = randomBytes(8).toString('hex')

  // Create guest user
  const user = await createUser({
    email,
    username: `Guest_${randomId}`,
    password,
    isGuest: true,
  })

  return {
    email,
    password,
    userId: user.id,
  }
})

export async function getCurrentUserId(): Promise<string | null> {
  const session = await auth()
  return session?.user?.id || null
}
