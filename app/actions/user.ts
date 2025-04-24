'use server'

import i18n from '@/lib/i18n'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { cache } from 'react'
import { getServerSession } from 'next-auth/next'

import { actionClient } from '@/lib/safe-action'
import { userSignSchema } from '@/zod-schema/user'

import { ERROR_CAUSE } from '@/config'

export const showLanding = actionClient.metadata({ actionName: 'user_show_landing' }).action(async () => {
  return {
    text: {
      email: i18n.t('user.email.header'),
      password: i18n.t('user.password.header'),
      signIn: i18n.t('user.sign_in.header'),
      signInSuccess: i18n.t('user.sign_in.success'),
      signInFailure: i18n.t('user.sign_in.failure'),
      signUp: i18n.t('user.sign_up.header'),
      signUpSuccess: i18n.t('user.sign_up.success'),
      signUpFailure: i18n.t('user.sign_up.failure'),
    },
  }
})

export const signUp = actionClient
  .metadata({ actionName: 'user_signUp' })
  .schema(userSignSchema)
  .action(async ({ parsedInput }) => {
    const isExisting = await db.user.findFirst({ where: { email: parsedInput.email } })

    if (isExisting) throw new Error(ERROR_CAUSE.ALREADY_EXISTS)

    const hashedPassword = await bcrypt.hash(parsedInput.password, 10)

    await db.user.create({ data: { email: parsedInput.email, password: hashedPassword } })
  })

export const isSigned = cache(
  actionClient.metadata({ actionName: 'user_isSigned' }).action(async () => {
    return !!(await getServerSession())
  }),
)
