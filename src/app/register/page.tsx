import { type Metadata } from 'next'
import { RegistrationView } from '@/components/features/auth/registration.view'

export const metadata: Metadata = {
  title: 'Registrace | Land of Machala',
  description: 'Začni své dobrodružství v zemi Machala. Vytvoř si účet a staň se legendou.',
}

export default function RegisterPage() {
  return <RegistrationView />
}
