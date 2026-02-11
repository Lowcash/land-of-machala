import { Card } from '@/components/ui/core/card'
import { Divider } from '@/components/ui/shared/divider'

import { LoginActions } from './actions'
import { LoginForm } from './form'

interface LoginCardProps {
  onLogin?: (values: any) => void
  onRegister?: () => void
  onGuestAccess?: () => void
  isLoading?: boolean
}

export function LoginCard({ onLogin, onRegister, onGuestAccess, isLoading }: LoginCardProps) {
  return (
    <Card variant="primary" padding="xl" gap="md">
      <LoginForm onLogin={onLogin} isLoading={isLoading} />

      <Divider label="Nebo" />

      <LoginActions onRegister={onRegister} onGuestAccess={onGuestAccess} isLoading={isLoading} />
    </Card>
  )
}
