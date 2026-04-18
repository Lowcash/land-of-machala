'use client'

import { useTransition } from 'react'

import { useRouter } from '@/i18n/routing'

import type { OriginsSurfaceProps } from '@/lib/auth/public-entry'
import type { CompleteRootOnboardingInput } from '@/lib/auth/root-session'

import { completeRootOnboardingAction } from '@/app/[locale]/actions/root-session'

import { OriginsViewUI } from './origins/view'

export function OnboardingRoot({ ...origins }: OriginsSurfaceProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleFinish = (payload: CompleteRootOnboardingInput) => {
    startTransition(async () => {
      const result = await completeRootOnboardingAction(payload)

      if (result.ok) {
        router.refresh()
      }
    })
  }

  return <OriginsViewUI {...origins} onFinish={handleFinish} isLoading={isPending} />
}
