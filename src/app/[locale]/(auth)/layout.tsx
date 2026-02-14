import { setRequestLocale } from 'next-intl/server'

import { AuthPageLayout } from '@/components/features/auth/shared/auth-page-layout'

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <AuthPageLayout>{children}</AuthPageLayout>
}
