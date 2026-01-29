'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { registerAction } from '@/lib/actions/auth'

import {
  type RegisterValues,
  registerSchema,
} from '@/components/features/Auth/Register/registerSchema'
import { useNotification } from '@/components/providers/NotificationProvider'

export function useRegisterForm() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [isPending, startTransition] = useTransition()

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (values: RegisterValues) => {
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

  return {
    form,
    onSubmit,
    isPending,
  }
}
