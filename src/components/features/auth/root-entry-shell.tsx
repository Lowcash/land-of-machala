'use client'

import { useState, useTransition } from 'react'

import { useRouter } from '@/i18n/routing'

import type {
  LoginSurfaceProps,
  PublicEntryScreen,
  RegisterSurfaceProps,
} from '@/lib/auth/public-entry'
import type { RootLoginInput, RootRegisterInput } from '@/lib/auth/root-session'

import {
  beginGuestRootSessionAction,
  beginRegisteredRootSessionAction,
  beginReturningRootSessionAction,
} from '@/app/[locale]/actions/root-session'

import { LoginViewUI } from './login/ui'
import { RegisterViewUI } from './register/ui'

interface RootEntryShellProps {
  login: LoginSurfaceProps
  register: RegisterSurfaceProps
  initialScreen?: PublicEntryScreen
}

export function RootEntryShell({ login, register, initialScreen = 'login' }: RootEntryShellProps) {
  const router = useRouter()
  const [screen, setScreen] = useState<PublicEntryScreen>(initialScreen)
  const [isPending, startTransition] = useTransition()

  const handleLogin = (values: RootLoginInput) => {
    startTransition(async () => {
      const result = await beginReturningRootSessionAction(values)

      if (result.ok) {
        router.refresh()
      }
    })
  }

  const handleRegister = (values: RootRegisterInput) => {
    startTransition(async () => {
      const result = await beginRegisteredRootSessionAction(values)

      if (result.ok) {
        router.refresh()
      }
    })
  }

  const handleGuestAccess = () => {
    startTransition(async () => {
      const result = await beginGuestRootSessionAction()

      if (result.ok) {
        router.refresh()
      }
    })
  }

  switch (screen) {
    case 'register':
      return (
        <RegisterViewUI
          {...register}
          onRegister={handleRegister}
          onLoginNavigate={() => setScreen('login')}
          loginHref="/"
          isLoading={isPending}
        />
      )
    default:
      return (
        <LoginViewUI
          {...login}
          onLogin={handleLogin}
          onRegister={() => setScreen('register')}
          onGuestAccess={handleGuestAccess}
          isLoading={isPending}
        />
      )
  }
}
