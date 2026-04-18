'use client'

import { Button } from '@/components/ui/core/button'
import { ActionGroup } from '@/components/ui/prefabs/structure'

interface LoginActionsProps {
  onRegister?: () => void
  onGuestAccess?: () => void
  isLoading?: boolean
  guestLabel: string
  registerLabel: string
}

export function LoginActions({
  onRegister,
  onGuestAccess,
  isLoading,
  guestLabel,
  registerLabel,
}: LoginActionsProps) {
  const handleGuestAccess = () => {
    onGuestAccess?.()
  }

  const handleRegister = () => {
    onRegister?.()
  }

  return (
    <ActionGroup direction="col" md={{ direction: 'col' }}>
      <Button variant="secondary" fullWidth onClick={handleGuestAccess} disabled={isLoading}>
        {guestLabel}
      </Button>

      <Button variant="primary" fullWidth onClick={handleRegister} disabled={isLoading}>
        {registerLabel}
      </Button>
    </ActionGroup>
  )
}
