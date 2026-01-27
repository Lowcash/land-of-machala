'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

// Corrected import for useTransition

import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { registerAction } from '@/lib/actions/auth'

import { useNotification } from '@/components/providers/NotificationProvider'
import { Button } from '@/components/ui/button'

import { AuthInput } from '../Shared/AuthInput'
import { type RegisterValues, registerSchema } from './registerSchema'

export function RegisterForm() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onRegister = (values: RegisterValues) => {
    if (isPending) return

    startTransition(async () => {
      try {
        const [, err] = await registerAction({
          email: values.email,
          password: values.password,
        })

        if (err) {
          throw new Error(err.message || 'Registrace se nezdařila')
        }

        showNotification({
          variant: 'success',
          title: 'Registrace úspěšná',
          description: 'Vítejte!',
        })

        router.push('/onboarding')
      } catch (err) {
        showNotification({
          variant: 'error',
          title: 'Chyba registrace',
          description:
            err instanceof Error ? err.message : 'Došlo k chybě. Zkuste to prosím znovu.',
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
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
        variant="game-primary"
        className="font-fantasy w-full font-bold"
      >
        Vytvořit účet
      </Button>
    </form>
  )
}
