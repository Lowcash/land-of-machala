'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/core/button'
import { Form } from '@/components/ui/forms/form'

const loginSchema = z.object({
  email: z.string().email('Zadejte platný email'),
  password: z.string().min(1, 'Heslo je povinné'),
  rememberMe: z.boolean(),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginFormProps {
  onLogin?: (values: LoginFormValues) => void
  isLoading?: boolean
}

export function LoginForm({ onLogin, isLoading }: LoginFormProps) {
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
        label="Email"
        placeholder="Zadej email..."
        disabled={isLoading}
        leftIcon={<Mail className="h-4 w-4" />}
        autoComplete="email"
      />

      <Form.Input
        control={form.control}
        name="password"
        label="Heslo"
        type="password"
        placeholder="Zadej heslo..."
        disabled={isLoading}
        leftIcon={<Lock className="h-4 w-4" />}
        autoComplete="current-password"
      />

      <Form.Checkbox
        control={form.control}
        name="rememberMe"
        label="Zapamatovat si mě"
        disabled={isLoading}
      />

      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        disabled={!form.watch('email') || !form.watch('password')}
      >
        Přihlásit se
      </Button>
    </Form.Root>
  )
}
