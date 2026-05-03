'use client'

import { useState } from 'react'

import { AUTH_CHRONICLES, AUTH_HERO, AUTH_STATS } from '@/lib/auth/demo-data'
import { ENTRY_SHARED_COPY, ENTRY_SIGN_IN_COPY, ENTRY_SIGN_UP_COPY } from '@/lib/auth/entry-copy'
import {
  type LoginErrors,
  type RegisterErrors,
  validateLoginInput,
  validateRegisterInput,
} from '@/lib/auth/entry-validation'

import { EntrySignInPanel, EntrySignUpPanel } from '@/components/features/auth/entry/panels'
import { AuthSplitLayout } from '@/components/ui/prefabs/layout/auth-split-layout'

import type { EntryScreen, RootEntryShellProps } from './shell'

type LoginFormState = {
  email: string
  errors: LoginErrors
  password: string
  rememberMe: boolean
}

type RegisterFormState = {
  acceptTerms: boolean
  email: string
  errors: RegisterErrors
  heroName: string
  password: string
}

export function RootEntryShellClient({
  initialScreen = 'signIn',
  onGuestEntry,
  onLoginSuccess,
  onRegisterSuccess,
  statusMessage,
}: RootEntryShellProps) {
  const [screen, setScreen] = useState<EntryScreen>(initialScreen)
  const [loginForm, setLoginForm] = useState<LoginFormState>({
    email: ENTRY_SHARED_COPY.emailPlaceholder,
    errors: {},
    password: '',
    rememberMe: true,
  })
  const [registerForm, setRegisterForm] = useState<RegisterFormState>({
    acceptTerms: false,
    email: '',
    errors: {},
    heroName: '',
    password: '',
  })

  function submitLogin(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateLoginInput({
      email: loginForm.email,
      password: loginForm.password,
    })

    setLoginForm((previous) => ({ ...previous, errors: nextErrors }))

    if (Object.keys(nextErrors).length === 0) {
      onLoginSuccess?.()
    }
  }

  function submitRegister(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateRegisterInput({
      acceptTerms: registerForm.acceptTerms,
      email: registerForm.email,
      heroName: registerForm.heroName,
      password: registerForm.password,
    })

    setRegisterForm((previous) => ({ ...previous, errors: nextErrors }))

    if (Object.keys(nextErrors).length === 0) {
      onRegisterSuccess?.()
    }
  }

  return (
    <AuthSplitLayout
      chronicles={AUTH_CHRONICLES}
      headline={AUTH_HERO.headline}
      stats={AUTH_STATS}
      tagline={
        screen === 'signIn' ? ENTRY_SIGN_IN_COPY.description : ENTRY_SIGN_UP_COPY.description
      }
    >
      {screen === 'signIn' ? (
        <EntrySignInPanel
          email={loginForm.email}
          errors={loginForm.errors}
          onEmailChange={(value) =>
            setLoginForm((previous) => ({ ...previous, email: value, errors: {} }))
          }
          onGuestEntry={onGuestEntry}
          onPasswordChange={(value) =>
            setLoginForm((previous) => ({ ...previous, password: value, errors: {} }))
          }
          onRememberChange={(checked) =>
            setLoginForm((previous) => ({ ...previous, rememberMe: checked }))
          }
          onSubmit={submitLogin}
          onSwitchToSignUp={() => setScreen('signUp')}
          password={loginForm.password}
          rememberMe={loginForm.rememberMe}
          statusMessage={statusMessage}
        />
      ) : (
        <EntrySignUpPanel
          acceptTerms={registerForm.acceptTerms}
          email={registerForm.email}
          errors={registerForm.errors}
          heroName={registerForm.heroName}
          onAcceptTermsChange={(checked) =>
            setRegisterForm((previous) => ({ ...previous, acceptTerms: checked }))
          }
          onEmailChange={(value) =>
            setRegisterForm((previous) => ({ ...previous, email: value, errors: {} }))
          }
          onGuestEntry={onGuestEntry}
          onHeroNameChange={(value) =>
            setRegisterForm((previous) => ({ ...previous, heroName: value, errors: {} }))
          }
          onPasswordChange={(value) =>
            setRegisterForm((previous) => ({ ...previous, password: value, errors: {} }))
          }
          onSubmit={submitRegister}
          onSwitchToSignIn={() => setScreen('signIn')}
          password={registerForm.password}
          statusMessage={statusMessage}
        />
      )}
    </AuthSplitLayout>
  )
}
