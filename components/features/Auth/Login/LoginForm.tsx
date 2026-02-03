'use client'

import { Lock, Mail } from 'lucide-react'

import { useLoginForm } from '@/lib/hooks/auth/useLoginForm'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { StandardForm } from '@/components/ui/display'

import { AuthInput } from '../Shared/AuthInput'

export function LoginForm() {
  const { form, isPending, rememberMe, toggleRememberMe, handleSubmit } = useLoginForm()
  const {
    register,
    formState: { errors, isValid },
  } = form

  return (
    <StandardForm onSubmit={handleSubmit}>
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
        placeholder="Zadej heslo..."
        icon={Lock}
        disabled={isPending}
        autoComplete="current-password"
        {...register('password')}
        error={errors.password?.message}
      />

      <Checkbox
        label="Zapamatovat si mě"
        checked={rememberMe}
        onCheckedChange={toggleRememberMe}
        disabled={isPending}
      />

      <Button
        type="submit"
        loading={isPending}
        disabled={!isValid}
        variant="ghost_game"
        fullWidth
        label={isPending ? 'Přihlašování...' : 'Přihlásit se'}
      />
    </StandardForm>
  )
}
