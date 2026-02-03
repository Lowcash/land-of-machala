'use client'

import { Lock, Mail } from 'lucide-react'

import { useRegisterForm } from '@/lib/hooks/auth/useRegisterForm'

import { Button } from '@/components/ui/button'
import { StandardForm } from '@/components/ui/display'

import { AuthInput } from '../Shared/AuthInput'

export function RegisterForm() {
  const { form, onSubmit, isPending } = useRegisterForm()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form

  return (
    <StandardForm onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        id="email"
        label="Email"
        type="email"
        placeholder="Zadej email..."
        icon={Mail}
        disabled={isPending}
        autoComplete="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <AuthInput
        id="password"
        label="Heslo"
        type="password"
        placeholder="Zadej heslo (min. 6 znaků)..."
        icon={Lock}
        disabled={isPending}
        autoComplete="new-password"
        {...register('password')}
        error={errors.password?.message}
      />

      <Button
        type="submit"
        loading={isPending}
        disabled={!isValid}
        variant="ghost_game"
        fullWidth
        label={isPending ? 'Registruji...' : 'Vytvořit účet'}
      />
    </StandardForm>
  )
}
