'use server'

import { createUser, getUser, getUserByUsername } from '@/entity/user'
import { auth, signIn, signOut } from '@/lib/auth'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { createServerAction } from 'zsa'

/**
 * Auth Server Actions
 * Handles user authentication using NextAuth
 */

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

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
      throw new Error('Invalid credentials')
    }

    const user = await getUser(email)
    if (!user) {
      throw new Error('User not found')
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
      throw new Error('Email already registered')
    }

    const existingUsername = await getUserByUsername(username)
    if (existingUsername) {
      throw new Error('Username already taken')
    }

    const hashedPassword = await hash(password, 10)
    const user = await createUser({
      email,
      username,
      password: hashedPassword,
    })

    // Sign in the newly created user
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (!result || result.error) {
      throw new Error('Failed to sign in after registration')
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

export async function getCurrentUserId(): Promise<string | null> {
  const session = await auth()
  return session?.user?.id || null
}
