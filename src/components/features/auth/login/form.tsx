'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/core/button'
import { Form } from '@/components/ui/forms/form'

const getLoginSchema = (t: any) =>
  z.object({
    email: z.string().email(t('form.validation.emailInvalid')),
    password: z.string().min(1, t('form.validation.passwordRequired')),
    rememberMe: z.boolean(),
  })

export type LoginFormValues = z.infer<ReturnType<typeof getLoginSchema>>

interface LoginFormProps {
  onLogin?: (values: LoginFormValues) => void
  isLoading?: boolean
}

export function LoginForm({ onLogin, isLoading }: LoginFormProps) {
  const t = useTranslations('Auth.Login')
  const loginSchema = getLoginSchema(t)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = (values: LoginFormValues) => {
    onLogin?.(values)
  }

  return (
    <Form.Root<LoginFormValues> form={form} onSubmit={onSubmit}>
      <Form.Input
        control={form.control}
        name="email"
        label={t('form.email')}
        placeholder={t('form.email') + '...'}
        disabled={isLoading}
        leftIcon={<Mail className="h-4 w-4" />}
        autoComplete="email"
      />

      <Form.Input
        control={form.control}
        name="password"
        label={t('form.password')}
        type="password"
        placeholder={t('form.password') + '...'}
        disabled={isLoading}
        leftIcon={<Lock className="h-4 w-4" />}
        autoComplete="current-password"
      />

      <Form.Checkbox
        control={form.control}
        name="rememberMe"
        label={t('form.rememberMe')}
        disabled={isLoading}
      />

      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        disabled={!form.watch('email') || !form.watch('password')}
      >
        {t('form.submit')}
      </Button>
    </Form.Root>
  )
}
