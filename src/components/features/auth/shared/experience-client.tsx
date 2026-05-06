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

const INITIAL_ROOT_EXPERIENCE_STATE: RootExperienceState = {
  entryScreen: 'signIn',
  stage: 'entry',
  statusMessage: '',
}

export function RootExperienceClient() {
  const [state, setState] = useState<RootExperienceState>(INITIAL_ROOT_EXPERIENCE_STATE)

  function enterOrigins() {
    setState((previous) => ({ ...previous, stage: 'origins' }))
  }

  function queueEntryContinuation() {
    setState((previous) => ({
      ...previous,
      entryScreen: 'signIn',
      statusMessage: ENTRY_STATUS_MESSAGES.continuationPending,
    }))
  }

  function enterOriginsAfterRegister() {
    setState((previous) => ({
      ...previous,
      stage: 'origins',
      statusMessage: '',
    }))
  }

  function returnToEntryWithPreparedHero() {
    setState((previous) => ({
      ...previous,
      entryScreen: 'signIn',
      stage: 'entry',
      statusMessage: ENTRY_STATUS_MESSAGES.heroPrepared,
    }))
  }

  if (state.stage === 'entry') {
    return (
      <RootEntryShell
        initialScreen={state.entryScreen}
        onGuestEntry={enterOrigins}
        onLoginSuccess={queueEntryContinuation}
        onRegisterSuccess={enterOriginsAfterRegister}
        statusMessage={state.statusMessage}
      />
    )
  }

  return <OriginsViewClient onComplete={returnToEntryWithPreparedHero} />
}
