'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/core/button'
import { Form } from '@/components/ui/forms/form'
import { LockIcon, MailIcon } from '@/components/ui/icons'

/**
 * Returns the validation schema for the login form.
 */
const getLoginSchema = (ui: any) =>
  z.object({
    email: z.email(ui.validation.emailInvalid),
    password: z.string().min(1, ui.validation.passwordRequired),
    rememberMe: z.boolean(),
  })

export type LoginFormValues = z.infer<ReturnType<typeof getLoginSchema>>

interface LoginFormProps {
  onLogin?: (values: LoginFormValues) => void
  isLoading?: boolean
  uiLabels: any
}

/**
 * A login Form component.
 */
export function LoginForm({ onLogin, isLoading, uiLabels }: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(getLoginSchema(uiLabels)),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  return (
    <Form.Root<LoginFormValues> form={form} onSubmit={onLogin || (() => {})} gap="md">
      <Form.Input
        control={form.control}
        name="email"
        label={uiLabels.email}
        placeholder={uiLabels.email + '...'}
        disabled={isLoading}
        leftIcon={<MailIcon />}
        autoComplete="email"
      />

      <Form.Input
        control={form.control}
        name="password"
        label={uiLabels.password}
        type="password"
        placeholder={uiLabels.password + '...'}
        disabled={isLoading}
        leftIcon={<LockIcon />}
        autoComplete="current-password"
      />

      <Form.Checkbox
        control={form.control}
        name="rememberMe"
        label={uiLabels.rememberMe}
        disabled={isLoading}
      />

      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        disabled={!form.watch('email') || !form.watch('password')}
      >
        {uiLabels.submit}
      </Button>
    </Form.Root>
  )
}
