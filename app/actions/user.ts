'use server'

import { z } from 'zod'
import { getTranslations } from 'next-intl/server'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { cache } from 'react'
import { getServerSession } from 'next-auth/next'

import { createServerAction } from 'zsa'
import { signInSchema } from '@/zod-schema/user'

import { ERROR_CAUSE } from '@/config'

export const showLanding = createServerAction()
  .input(z.object({}).optional())
  .handler(async () => {
    const t = await getTranslations()

    return {
      text: {
        email: t('user.email.header'),
        password: t('user.password.header'),
        signIn: t('user.sign_in.header'),
        signInSuccess: t('user.sign_in.success'),
        signInFailure: t('user.sign_in.failure'),
        signUp: t('user.sign_up.header'),
        signUpSuccess: t('user.sign_up.success'),
        signUpFailure: t('user.sign_up.failure'),
      },
    }
  })

export const signUp = createServerAction()
  .input(signInSchema)
  .handler(async ({ input }) => {
    const isExisting = await db.user.findFirst({ where: { email: input.email } })

    if (isExisting) throw new Error(ERROR_CAUSE.ALREADY_EXISTS)

    const hashedPassword = await bcrypt.hash(input.password, 10)

    await db.user.create({ data: { email: input.email, password: hashedPassword } })
  })

export const isSigned = cache(
  createServerAction()
    .input(z.object({}).optional())
    .handler(async () => !!(await getServerSession())),
)
