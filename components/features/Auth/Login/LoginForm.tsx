'use client'

import { Check, Lock, Mail } from 'lucide-react'

import { useLoginForm } from '@/lib/hooks/auth/useLoginForm'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

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
        <Button
          type="button"
          variant="ghost"
          disabled={isPending}
          onClick={toggleRememberMe}
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded border-2 p-0 transition-all disabled:cursor-not-allowed disabled:opacity-50',
            rememberMe
              ? 'border-game-gold bg-game-gold'
              : 'border-game-copper hover:border-game-gold bg-black/60'
          )}
        >
          {rememberMe && <Check className="h-3.5 w-3.5 text-black" />}
        </Button>
        <Label
          onClick={toggleRememberMe}
          className="font-fantasy text-game-gold-muted hover:text-game-gold cursor-pointer text-xs transition-colors select-none sm:text-sm"
        >
          Zapamatovat si mě
        </Label>
      </div>

      <Button
        type="submit"
        loading={isPending}
        disabled={!isValid}
        variant="game-ghost"
        className="font-fantasy w-full border-2 font-bold"
      >
        Přihlásit se
      </Button>
    </form>
  )
}
