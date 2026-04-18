'use server'

import { revalidatePath } from 'next/cache'

import {
  type CompleteRootOnboardingInput,
  type RootLoginInput,
  type RootRegisterInput,
  type RootSessionActionResult,
  rootLoginInputSchema,
  rootRegisterInputSchema,
} from '@/lib/auth/root-session'
import { completeRootOnboardingInputSchema } from '@/lib/auth/root-session'
import {
  beginGuestRootSession,
  beginRegisteredRootSession,
  beginReturningRootSession,
  clearRootSession,
  completeRootOnboarding,
  readRootSession,
} from '@/lib/server/auth/root-session'

function success(): RootSessionActionResult {
  revalidatePath('/')

  return { ok: true }
}

export async function beginGuestRootSessionAction(): Promise<RootSessionActionResult> {
  await beginGuestRootSession()

  return success()
}

export async function beginReturningRootSessionAction(
  input: RootLoginInput
): Promise<RootSessionActionResult> {
  const parsed = rootLoginInputSchema.safeParse(input)

  if (!parsed.success) {
    return { ok: false, reason: 'invalid-input' }
  }

  await beginReturningRootSession(parsed.data)

  return success()
}

export async function beginRegisteredRootSessionAction(
  input: RootRegisterInput
): Promise<RootSessionActionResult> {
  const parsed = rootRegisterInputSchema.safeParse(input)

  if (!parsed.success) {
    return { ok: false, reason: 'invalid-input' }
  }

  await beginRegisteredRootSession(parsed.data)

  return success()
}

export async function completeRootOnboardingAction(
  input: CompleteRootOnboardingInput
): Promise<RootSessionActionResult> {
  const currentSession = await readRootSession()

  if (!currentSession || currentSession.state !== 'onboarding') {
    return { ok: false, reason: 'missing-session' }
  }

  const parsed = completeRootOnboardingInputSchema.safeParse(input)

  if (!parsed.success) {
    return { ok: false, reason: 'invalid-input' }
  }

  await completeRootOnboarding(parsed.data)

  return success()
}

export async function clearRootSessionAction(): Promise<RootSessionActionResult> {
  await clearRootSession()

  return success()
}
