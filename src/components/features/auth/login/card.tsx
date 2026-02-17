import { Card } from '@/components/ui/core/card'
import { Divider } from '@/components/ui/shared/divider'

import { LoginActions } from './actions'
import { LoginForm } from './form'

interface LoginCardProps {
  onLogin?: (values: any) => void
  onRegister?: () => void
  onGuestAccess?: () => void
  isLoading?: boolean
  guestLabel: string
  registerLabel: string
  orLabel: string
}

export function LoginCard({
  onLogin,
  onRegister,
  onGuestAccess,
  isLoading,
  guestLabel,
  registerLabel,
  orLabel,
}: LoginCardProps) {
  return (
    <Card variant="primary" p="md" md={{ p: 'lg' }} gap="md">
      <LoginForm onLogin={onLogin} isLoading={isLoading} />

      <Divider label={orLabel} />

      <LoginActions
        onRegister={onRegister}
        onGuestAccess={onGuestAccess}
        isLoading={isLoading}
        guestLabel={guestLabel}
        registerLabel={registerLabel}
      />
    </Card>
  )
}
