import { NarrativeCard } from '@/components/ui/prefabs/narrative/narrative-card'
import { Divider } from '@/components/ui/shared/divider'

import { LoginActions } from './actions'
import { LoginForm } from './form'
import type { LoginUiLabels } from './types'

interface LoginCardProps {
  onLogin?: (values: any) => void
  onRegister?: () => void
  onGuestAccess?: () => void
  isLoading?: boolean
  guestLabel: string
  registerLabel: string
  orLabel: string
  uiLabels: LoginUiLabels
}

export function LoginCard({
  onLogin,
  onRegister,
  onGuestAccess,
  isLoading,
  guestLabel,
  registerLabel,
  orLabel,
  uiLabels,
}: LoginCardProps) {
  return (
    <NarrativeCard variant="primary">
      <LoginForm onLogin={onLogin} isLoading={isLoading} uiLabels={uiLabels} />

      <Divider label={orLabel} />

      <LoginActions
        onRegister={onRegister}
        onGuestAccess={onGuestAccess}
        isLoading={isLoading}
        guestLabel={guestLabel}
        registerLabel={registerLabel}
      />
    </NarrativeCard>
  )
}
