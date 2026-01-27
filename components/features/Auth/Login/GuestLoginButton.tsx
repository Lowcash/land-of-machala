'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { signIn } from 'next-auth/react'

import { createGuestAccountAction } from '@/lib/actions/auth'

import { useNotification } from '@/components/providers/NotificationProvider'
import { Button } from '@/components/ui/button'

export function GuestLoginButton() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState(false)

  const handleDemoMode = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const [data, err] = await createGuestAccountAction()

      if (err || !data) {
        throw new Error(err?.message || 'Failed to create guest account')
      }

      const { email: guestEmail, password: guestPassword } = data

      const result = await signIn('credentials', {
        email: guestEmail,
        password: guestPassword,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      router.push('/onboarding')
    } catch (error) {
      console.error('Guest login error:', error)
      showNotification({
        variant: 'error',
        title: 'Chyba host účtu',
        description: 'Došlo k chybě při vytváření host účtu',
      })
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleDemoMode}
      loading={isLoading}
      variant="game-secondary"
      className="font-fantasy w-full"
    >
      Zkusit hru jako host (bez registrace)
    </Button>
  )
}
