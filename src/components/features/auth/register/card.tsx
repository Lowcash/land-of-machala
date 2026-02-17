import { Card } from '@/components/ui/core/card'

import { RegisterForm, RegisterFormValues } from './form'

interface RegisterCardProps {
  onRegister?: (values: RegisterFormValues) => void
  isLoading?: boolean
}

export function RegisterCard({ onRegister, isLoading }: RegisterCardProps) {
  return (
    <Card variant="primary" p="md" md={{ p: 'lg' }} gap="md">
      <RegisterForm onRegister={onRegister} isLoading={isLoading} />
    </Card>
  )
}
