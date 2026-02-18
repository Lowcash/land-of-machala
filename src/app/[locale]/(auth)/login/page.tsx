import type { Metadata } from 'next'

import { getScopedTranslations } from '@/lib/i18n'

import { LoginView } from '@/components/features/auth/login/view'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getScopedTranslations('Auth.Login')

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}

export default function LoginPage() {
  return <LoginView />
}
