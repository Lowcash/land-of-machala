import { type Metadata } from 'next'

import { getScopedTranslations } from '@/lib/i18n'

import { RegisterView } from '@/components/features/auth/register/view'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getScopedTranslations('Auth.Registration')

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}

export default function RegisterPage() {
  return <RegisterView />
}
