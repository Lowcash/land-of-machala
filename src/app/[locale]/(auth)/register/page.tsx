import { type Metadata } from 'next'

import { RegisterView } from '@/components/features/auth/register/view'

export const metadata: Metadata = {
  title: 'Registrace | Land of Machala',
  description: 'Začni své dobrodružství v zemi Machala. Vytvoř si účet a staň se legendou.',
}

export default function RegisterPage() {
  return <RegisterView />
}
