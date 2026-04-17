import type { Metadata, Viewport } from 'next'
import { Cinzel, MedievalSharp, Philosopher } from 'next/font/google'
import { notFound } from 'next/navigation'

import { routing } from '@/i18n/routing'
import { NotificationProvider } from '@/providers/notification-provider'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

import { RootShell } from '@/components/ui/prefabs/layout/root-shell'

import '../globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

const medievalSharp = MedievalSharp({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-medieval',
  display: 'swap',
})

const philosopher = Philosopher({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-philosopher',
  display: 'swap',
})

type AppLocale = (typeof routing.locales)[number]

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Land of Machala',
  description: 'An epic RPG adventure',
}

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  // Security: Only expose essential namespaces to the client.
  // We explicitly select only strings required by global client components like `error.tsx`
  // so we don't leak full `Auth` or `Game` dictionaries to the client bundle.
  const safeMessages = {
    Common: {
      error: messages.Common.error,
      error_description: messages.Common.error_description,
      error_digest: messages.Common.error_digest,
      try_again: messages.Common.try_again,
    },
  }

  return (
    <html lang={locale}>
      <RootShell
        as="body"
        className={`${cinzel.variable} ${medievalSharp.variable} ${philosopher.variable}`}
      >
        <NextIntlClientProvider messages={safeMessages}>
          <NotificationProvider>{children}</NotificationProvider>
        </NextIntlClientProvider>
      </RootShell>
    </html>
  )
}
