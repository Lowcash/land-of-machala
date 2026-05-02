'use client'

import { useState } from 'react'

import { AUTH_CHRONICLES, AUTH_HERO, AUTH_STATS } from '@/lib/auth/demo-data'
import { ENTRY_SHARED_COPY } from '@/lib/auth/entry-copy'
import {
  type LoginErrors,
  type RegisterErrors,
  validateLoginInput,
  validateRegisterInput,
} from '@/lib/auth/entry-validation'

import { EntrySignInPanel, EntrySignUpPanel } from '@/components/features/auth/root-entry-panels'
import { AuthSplitLayout } from '@/components/ui/prefabs/layout/auth-split-layout'

import type { EntryScreen, RootEntryShellProps } from './root-entry-shell'

export function RootEntryShellClient({
  initialScreen = 'signIn',
  onGuestEntry,
  onLoginSuccess,
  onRegisterSuccess,
  statusMessage,
}: RootEntryShellProps) {
  const [screen, setScreen] = useState<EntryScreen>(initialScreen)
  const [rememberMe, setRememberMe] = useState(true)
  const [loginEmail, setLoginEmail] = useState<string>(ENTRY_SHARED_COPY.emailPlaceholder)
  const [loginPassword, setLoginPassword] = useState('')
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({})
  const [heroName, setHeroName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [registerErrors, setRegisterErrors] = useState<RegisterErrors>({})

  function submitLogin(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateLoginInput({
      email: loginEmail,
      password: loginPassword,
    })

    setLoginErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      onLoginSuccess?.()
    }
  }

  function submitRegister(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateRegisterInput({
      acceptTerms,
      email: registerEmail,
      heroName,
      password: registerPassword,
    })

    setRegisterErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      onRegisterSuccess?.()
    }
  }

  return (
    <AuthSplitLayout chronicles={AUTH_CHRONICLES} headline={AUTH_HERO.headline} stats={AUTH_STATS}>
      {screen === 'signIn' ? (
        <EntrySignInPanel
          email={loginEmail}
          errors={loginErrors}
          onEmailChange={(value) => setLoginEmail(value)}
          onGuestEntry={onGuestEntry}
          onPasswordChange={(value) => setLoginPassword(value)}
          onRememberChange={(checked) => setRememberMe(checked)}
          onSubmit={submitLogin}
          onSwitchToSignUp={() => setScreen('signUp')}
          password={loginPassword}
          rememberMe={rememberMe}
          statusMessage={statusMessage}
        />
      ) : (
        <EntrySignUpPanel
          acceptTerms={acceptTerms}
          email={registerEmail}
          errors={registerErrors}
          heroName={heroName}
          onAcceptTermsChange={(checked) => setAcceptTerms(checked)}
          onEmailChange={(value) => setRegisterEmail(value)}
          onGuestEntry={onGuestEntry}
          onHeroNameChange={(value) => setHeroName(value)}
          onPasswordChange={(value) => setRegisterPassword(value)}
          onSubmit={submitRegister}
          onSwitchToSignIn={() => setScreen('signIn')}
          password={registerPassword}
          statusMessage={statusMessage}
        />
      )}
    </AuthSplitLayout>
  )
}
