import { Card } from '@/components/ui/core/card'

import { RegisterForm, RegisterFormValues } from './form'

interface RegisterCardProps {
  onRegister?: (values: RegisterFormValues) => void
  isLoading?: boolean
  uiLabels: any
}

export function RegisterCard({ onRegister, isLoading, uiLabels }: RegisterCardProps) {
  return (
    <Card variant="primary" p="lg" md={{ p: 'xl' }} gap="xl">
      <RegisterForm onRegister={onRegister} isLoading={isLoading} uiLabels={uiLabels} />
    </Card>
  )
}
