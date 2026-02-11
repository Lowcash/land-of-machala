'use client'

import { Button } from '@/components/ui/core/button'
import { VStack } from '@/components/ui/core/stack'

interface LoginActionsProps {
  onRegister?: () => void
  onGuestAccess?: () => void
  isLoading?: boolean
}

export function LoginActions({ onRegister, onGuestAccess, isLoading }: LoginActionsProps) {
  return (
    <VStack gap="md">
      <Button variant="secondary" fullWidth onClick={onGuestAccess} disabled={isLoading}>
        Zkusit hru jako host (bez registrace)
      </Button>

      <Button variant="primary" fullWidth onClick={onRegister} disabled={isLoading}>
        Vytvořit nový účet
      </Button>
    </VStack>
  )
}
