'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/core/button'
import { Form } from '@/components/ui/forms/form'

const registrationSchema = z
  .object({
    email: z.string().email('Zadejte platný email'),
    password: z.string().min(6, 'Heslo musí mít alespoň 6 znaků'),
    confirmPassword: z.string().min(1, 'Potvrzení hesla je povinné'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hesla se neshodují',
    path: ['confirmPassword'],
  })

export type RegistrationFormValues = z.infer<typeof registrationSchema>

interface RegistrationFormProps {
  onRegister?: (values: RegistrationFormValues) => void
  isLoading?: boolean
}

export function RegistrationForm({ onRegister, isLoading }: RegistrationFormProps) {
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

  return (
    <Form.Root<RegistrationFormValues> form={form} onSubmit={onSubmit}>
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
        autoComplete="new-password"
      />

      <Form.Input
        control={form.control}
        name="confirmPassword"
        label="Potvrzení hesla"
        type="password"
        placeholder="Zadej heslo znovu..."
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
        Vytvořit účet
      </Button>
    </Form.Root>
  )
}
