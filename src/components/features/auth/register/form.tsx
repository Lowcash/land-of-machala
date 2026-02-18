'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/core/button'
import { Form } from '@/components/ui/forms/form'
import { LockIcon, MailIcon } from '@/components/ui/icons'

/**
 * Returns the validation schema for the registration form.
 */
const getRegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      email: z.string().email(t('form.validation.emailInvalid')),
      password: z.string().min(6, t('form.validation.passwordLength')),
      confirmPassword: z.string().min(1, t('form.validation.passwordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('form.validation.passwordMismatch'),
      path: ['confirmPassword'],
    })

export type RegisterFormValues = z.infer<ReturnType<typeof getRegisterSchema>>

interface RegisterFormProps {
  onRegister?: (values: RegisterFormValues) => void
  isLoading?: boolean
}

/**
 * A registration form component.
 */
export function RegisterForm({ onRegister, isLoading }: RegisterFormProps) {
  const t = useTranslations('Auth.Registration')

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(getRegisterSchema(t)),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  return (
    <Form.Root<RegisterFormValues> form={form} onSubmit={onRegister || (() => {})}>
      <Form.Input
        control={form.control}
        name="email"
        label={t('form.email')}
        placeholder={t('form.email') + '...'}
        disabled={isLoading}
        leftIcon={<MailIcon />}
        autoComplete="email"
      />

      <Form.Input
        control={form.control}
        name="password"
        label={t('form.password')}
        type="password"
        placeholder={t('form.password') + '...'}
        disabled={isLoading}
        leftIcon={<LockIcon />}
        autoComplete="new-password"
      />

      <Form.Input
        control={form.control}
        name="confirmPassword"
        label={t('form.confirmPassword')}
        type="password"
        placeholder={t('form.confirmPassword') + '...'}
        disabled={isLoading}
        leftIcon={<LockIcon />}
        autoComplete="new-password"
      />

      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        disabled={!form.formState.isDirty || !form.formState.isValid}
      >
        {t('form.submit')}
      </Button>
    </Form.Root>
  )
}
