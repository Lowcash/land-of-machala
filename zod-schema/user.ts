import { z } from 'zod'
import i18n from '@/lib/i18n'

export const userSignSchema = z.object({
  email: z.string({ required_error: i18n.t('user.email.required') }),
  password: z.string({ required_error: i18n.t('user.password.required') }),
})

export type UserSignSchema = z.infer<typeof userSignSchema>
