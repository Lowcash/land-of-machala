import { setRequestLocale } from 'next-intl/server'

import { AuthContainer } from '@/components/features/auth/shared/auth-container'

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <AuthContainer>{children}</AuthContainer>
}
