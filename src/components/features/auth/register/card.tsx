import { NarrativeCard } from '@/components/ui/prefabs/narrative/narrative-card'

import { RegisterForm, RegisterFormValues } from './form'
import type { RegisterUiLabels } from './types'

interface RegisterCardProps {
  onRegister?: (values: RegisterFormValues) => void
  isLoading?: boolean
  uiLabels: RegisterUiLabels
}

export function RegisterCard({ onRegister, isLoading, uiLabels }: RegisterCardProps) {
  return (
    <NarrativeCard variant="primary">
      <RegisterForm onRegister={onRegister} isLoading={isLoading} uiLabels={uiLabels} />
    </NarrativeCard>
  )
}
