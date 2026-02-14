'use client'

import { useRouter } from '@/i18n/routing'

import { Button } from '@/components/ui/core/button'
import { VStack } from '@/components/ui/core/stack'

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
  const router = useRouter()

  const handleRegister = () => {
    if (onRegister) {
      onRegister()
      return
    }
    router.push('/register')
  }

  return (
    <VStack gap="md">
      <Button variant="secondary" fullWidth onClick={onGuestAccess} disabled={isLoading}>
        {guestLabel}
      </Button>

      <Button variant="primary" fullWidth onClick={handleRegister} disabled={isLoading}>
        {registerLabel}
      </Button>
    </VStack>
  )
}
