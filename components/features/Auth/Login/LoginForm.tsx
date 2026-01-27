'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

// Added useTransition import

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Lock, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { loginAction } from '@/lib/actions/auth'
import { getMyCharacterAction } from '@/lib/actions/character'
import { cn } from '@/lib/utils'

import { useNotification } from '@/components/providers/NotificationProvider'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import { AuthInput } from '../Shared/AuthInput'
import { type LoginValues, loginSchema } from './loginSchema'

export function LoginForm() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
  })

  const rememberMe = watch('rememberMe')

  const onLogin = (values: LoginValues) => {
    if (isPending) return

    startTransition(async () => {
      try {
        const [data, err] = await loginAction({
          email: values.email,
          password: values.password,
        })

        if (err) {
          showNotification({
            variant: 'error',
            title: 'Přihlášení selhalo',
            description: err.message || 'Zkontroluj email a heslo',
          })
          return
        }

        if (data?.success) {
          const [charData] = await getMyCharacterAction()
          if (charData?.character) {
            router.push('/game')
          } else {
            router.push('/onboarding')
          }
        }
      } catch (error) {
        console.error('Login error:', error)
        showNotification({
          variant: 'error',
          title: 'Chyba přihlášení',
          description: 'Došlo k chybě při přihlašování',
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
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
          onClick={() => setValue('rememberMe', !rememberMe)}
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
          onClick={() => setValue('rememberMe', !rememberMe)}
          className="font-fantasy text-game-gold-muted hover:text-game-gold cursor-pointer text-xs transition-colors select-none sm:text-sm"
        >
          Zapamatovat si mě
        </Label>
      </div>

      <Button
        type="submit"
        loading={isPending}
        disabled={!isValid}
        variant="game-primary"
        className="font-fantasy w-full font-bold"
      >
        Přihlásit se
      </Button>
    </form>
  )
}
