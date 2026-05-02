'use client'

import { useState } from 'react'

import { ENTRY_STATUS_MESSAGES } from '@/lib/auth/entry-copy'

import { OriginsView } from '@/components/features/auth/origins/view'
import { RootEntryShell } from '@/components/features/auth/root-entry-shell'

export type RootStage = 'entry' | 'origins'

export function RootExperienceClient() {
  const [stage, setStage] = useState<RootStage>('entry')
  const [entryScreen, setEntryScreen] = useState<'signIn' | 'signUp'>('signIn')
  const [statusMessage, setStatusMessage] = useState<string>('')

  if (stage === 'entry') {
    return (
      <RootEntryShell
        initialScreen={entryScreen}
        onGuestEntry={() => setStage('origins')}
        onLoginSuccess={() => {
          setEntryScreen('signIn')
          setStatusMessage(ENTRY_STATUS_MESSAGES.continuationPending)
        }}
        onRegisterSuccess={() => {
          setStatusMessage('')
          setStage('origins')
        }}
        statusMessage={statusMessage}
      />
    )
  }

  return (
    <OriginsView
      onComplete={() => {
        setEntryScreen('signIn')
        setStatusMessage(ENTRY_STATUS_MESSAGES.heroPrepared)
        setStage('entry')
      }}
    />
  )
}
