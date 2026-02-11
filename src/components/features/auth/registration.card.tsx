import { Card } from '@/components/ui/core/card'
import { RegistrationForm, RegistrationFormValues } from './registration.form'

interface RegistrationCardProps {
  onRegister?: (values: RegistrationFormValues) => void
  isLoading?: boolean
}

export function RegistrationCard({ onRegister, isLoading }: RegistrationCardProps) {
  return (
    <Card variant="primary" padding="xl" gap="md">
      <RegistrationForm onRegister={onRegister} isLoading={isLoading} />
    </Card>
  )
}
