'use client'

import { Check, Lock, Mail } from 'lucide-react'

import { useLoginForm } from '@/lib/hooks/auth/useLoginForm'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

import { AuthInput } from '../Shared/AuthInput'

export function LoginForm() {
  const { form, isPending, rememberMe, toggleRememberMe, handleSubmit } = useLoginForm()
  const {
    register,
    formState: { errors, isValid },
  } = form

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isPending}
          onClick={toggleRememberMe}
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded border-2 transition-all disabled:cursor-not-allowed disabled:opacity-50',
            rememberMe
              ? 'border-[#ffd700] bg-[#ffd700]'
              : 'border-[#8b6f47] bg-black/60 hover:border-[#ffd700]'
          )}
        >
          {rememberMe && <Check className="h-3.5 w-3.5 text-black" />}
        </button>
        <label
          onClick={toggleRememberMe}
          className="cursor-pointer text-xs text-[#d4a574] transition-colors select-none hover:text-[#ffd700] sm:text-sm"
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          Zapamatovat si mě
        </label>
      </div>

      <Button
        type="submit"
        loading={isPending}
        disabled={!isValid}
        variant="game-ghost"
        fullWidth
        label={isPending ? 'Přihlašování...' : 'Přihlásit se'}
      />
    </form>
  )
}
