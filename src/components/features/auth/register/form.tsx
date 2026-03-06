'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/core/button'
import { Form } from '@/components/ui/forms/form'
import { LockIcon, MailIcon } from '@/components/ui/icons'

import type { RegisterUiLabels } from './types'

/**
 * Returns the validation schema for the registration form.
 */
const getRegisterSchema = (ui: RegisterUiLabels) =>
  z
    .object({
      email: z.email(ui.validation.emailInvalid),
      password: z.string().min(6, ui.validation.passwordLength),
      confirmPassword: z.string().min(1, ui.validation.passwordRequired),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: ui.validation.passwordMismatch,
      path: ['confirmPassword'],
    })

export type RegisterFormValues = z.infer<ReturnType<typeof getRegisterSchema>>

interface RegisterFormProps {
  onRegister?: (values: RegisterFormValues) => void
  isLoading?: boolean
  uiLabels: RegisterUiLabels
}

/**
 * A registration form component.
 */
export function RegisterForm({ onRegister, isLoading, uiLabels }: RegisterFormProps) {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(getRegisterSchema(uiLabels)),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  })

  return (
    <Form.Root<RegisterFormValues> form={form} onSubmit={onRegister || (() => {})} gap="md">
      <Form.Input
        control={form.control}
        name="email"
        label={uiLabels.email}
        placeholder={uiLabels.emailPlaceholder}
        disabled={isLoading}
        leftIcon={<MailIcon />}
        autoComplete="email"
      />

      <Form.Input
        control={form.control}
        name="password"
        label={uiLabels.password}
        type="password"
        placeholder="••••••••"
        disabled={isLoading}
        leftIcon={<LockIcon />}
        autoComplete="new-password"
      />

      <Form.Input
        control={form.control}
        name="confirmPassword"
        label={uiLabels.confirmPassword}
        type="password"
        placeholder="••••••••"
        disabled={isLoading}
        leftIcon={<LockIcon />}
        autoComplete="new-password"
      />

      <Button type="submit" fullWidth loading={isLoading} disabled={isLoading}>
        {uiLabels.submit}
      </Button>
    </Form.Root>
  )
}
