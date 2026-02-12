import { Card } from '@/components/ui/core/card'

import { RegistrationForm, RegistrationFormValues } from './form'

interface RegistrationCardProps {
  onRegister?: (values: RegistrationFormValues) => void
  isLoading?: boolean
}

export function RegistrationCard({ onRegister, isLoading }: RegistrationCardProps) {
  return (
    <Card variant="primary" p="lg" md={{ p: 'xl' }} gap="md">
      <RegistrationForm onRegister={onRegister} isLoading={isLoading} />
    </Card>
  )
}
