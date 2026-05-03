'use client'

import { useState } from 'react'

import { ENTRY_STATUS_MESSAGES } from '@/lib/auth/entry-copy'

import { RootEntryShell } from '@/components/features/auth/entry/shell'
import type { EntryScreen } from '@/components/features/auth/entry/shell'
import { OriginsViewClient } from '@/components/features/auth/origins/view-client'

export type RootStage = 'entry' | 'origins'

type RootExperienceState = {
  entryScreen: EntryScreen
  stage: RootStage
  statusMessage: string
}

export function RootExperienceClient() {
  const [state, setState] = useState<RootExperienceState>({
    entryScreen: 'signIn',
    stage: 'entry',
    statusMessage: '',
  })

  if (state.stage === 'entry') {
    return (
      <RootEntryShell
        initialScreen={state.entryScreen}
        onGuestEntry={() => setState((previous) => ({ ...previous, stage: 'origins' }))}
        onLoginSuccess={() => {
          setState((previous) => ({
            ...previous,
            entryScreen: 'signIn',
            statusMessage: ENTRY_STATUS_MESSAGES.continuationPending,
          }))
        }}
        onRegisterSuccess={() => {
          setState((previous) => ({
            ...previous,
            stage: 'origins',
            statusMessage: '',
          }))
        }}
        statusMessage={state.statusMessage}
      />
    )
  }

  return (
    <OriginsViewClient
      onComplete={() => {
        setState((previous) => ({
          ...previous,
          entryScreen: 'signIn',
          stage: 'entry',
          statusMessage: ENTRY_STATUS_MESSAGES.heroPrepared,
        }))
      }}
    />
  )
}
