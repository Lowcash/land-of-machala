'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { loginAction } from '@/lib/actions/auth'
import { getMyCharacterAction } from '@/lib/actions/character'

import { type LoginValues, loginSchema } from '@/components/features/Auth/Login/loginSchema'
import { useNotification } from '@/components/providers/NotificationProvider'

export function useLoginForm() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
  })

  // Watch rememberMe specifically if needed for UI, but the form object has it all
  const rememberMe = form.watch('rememberMe')
  const toggleRememberMe = () => form.setValue('rememberMe', !rememberMe)

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

  return {
    form,
    isPending,
    rememberMe,
    toggleRememberMe,
    handleSubmit: form.handleSubmit(onLogin),
  }
}
