import { setRequestLocale } from 'next-intl/server'

import { AuthShell } from '@/components/ui/prefabs/layout/auth-shell'

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <AuthShell>{children}</AuthShell>
}
