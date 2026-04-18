import type { Metadata } from 'next'

import {
  getAuthenticatedSurfaceProps,
  getLoginSurfaceProps,
  getOriginsSurfaceProps,
  getRegisterSurfaceProps,
  getRootMetadata,
} from '@/lib/auth/public-entry'
import { readRootSession } from '@/lib/server/auth/root-session'

import { AuthenticatedRoot } from '@/components/features/auth/authenticated-root'
import { OnboardingRoot } from '@/components/features/auth/onboarding-root'
import { RootEntryShell } from '@/components/features/auth/root-entry-shell'

export async function generateMetadata(): Promise<Metadata> {
  return getRootMetadata()
}

export default async function RootPage() {
  const rootSession = await readRootSession()

  if (rootSession?.state === 'authenticated') {
    const authenticated = await getAuthenticatedSurfaceProps(rootSession)

    return <AuthenticatedRoot {...authenticated} />
  }

  if (rootSession?.state === 'onboarding') {
    const origins = await getOriginsSurfaceProps()

    return <OnboardingRoot {...origins} />
  }

  const [login, register] = await Promise.all([getLoginSurfaceProps(), getRegisterSurfaceProps()])

  return <RootEntryShell login={login} register={register} />
}
