import type { Metadata } from 'next'

import { LoginView } from '@/components/features/auth/login/view'

export const metadata: Metadata = {
  title: 'Login | Land of Machala',
  description: 'Vstup do světa legend. Tvá cesta začíná zde.',
}

export default function LoginPage() {
  return <LoginView />
}
