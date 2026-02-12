'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/core/button'
import { Form } from '@/components/ui/forms/form'

const getRegistrationSchema = (t: any) =>
  z
    .object({
      email: z.string().email(t('Auth.Login.form.validation.emailInvalid')),
      password: z.string().min(6, 'Heslo musí mít alespoň 6 znaků'),
      confirmPassword: z.string().min(1, 'Potvrzení hesla je povinné'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('Auth.Registration.form.validation.passwordMismatch'),
      path: ['confirmPassword'],
    })

export type RegistrationFormValues = z.infer<ReturnType<typeof getRegistrationSchema>>

interface RegistrationFormProps {
  onRegister?: (values: RegistrationFormValues) => void
  isLoading?: boolean
}

export function RegistrationForm({ onRegister, isLoading }: RegistrationFormProps) {
  const t = useTranslations()
  const registrationSchema = getRegistrationSchema(t)

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: RegistrationFormValues) => {
    onRegister?.(values)
  }

  const tr = useTranslations('Auth.Registration')

  return (
    <Form.Root<RegistrationFormValues> form={form} onSubmit={onSubmit}>
      <Form.Input
        control={form.control}
        name="email"
        label={tr('form.email')}
        placeholder={tr('form.email') + '...'}
        disabled={isLoading}
        leftIcon={<Mail className="h-4 w-4" />}
        autoComplete="email"
      />

      <Form.Input
        control={form.control}
        name="password"
        label={tr('form.password')}
        type="password"
        placeholder={tr('form.password') + '...'}
        disabled={isLoading}
        leftIcon={<Lock className="h-4 w-4" />}
        autoComplete="new-password"
      />

      <Form.Input
        control={form.control}
        name="confirmPassword"
        label={tr('form.confirmPassword')}
        type="password"
        placeholder={tr('form.confirmPassword') + '...'}
        disabled={isLoading}
        leftIcon={<Lock className="h-4 w-4" />}
        autoComplete="new-password"
      />

      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        disabled={!form.formState.isDirty || !form.formState.isValid}
      >
        {tr('form.submit')}
      </Button>
    </Form.Root>
  )
}
