import type { Metadata } from 'next'
import { Cinzel, MedievalSharp, Philosopher } from 'next/font/google'
import { notFound } from 'next/navigation'

import { routing } from '@/i18n/routing'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

import { NotificationProvider } from '@/providers/notification-provider'

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Land of Machala',
  description: 'An epic RPG adventure',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
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
      <body
        className={`${cinzel.variable} ${medievalSharp.variable} ${philosopher.variable} font-body antialiased selection:bg-(--color-secondary)/30 selection:text-(--color-ivory) min-h-dvh flex flex-col`}
      >
        <NextIntlClientProvider messages={safeMessages}>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
