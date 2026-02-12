import type { Metadata } from 'next'
import { Cinzel, MedievalSharp, Philosopher } from 'next/font/google'
import { notFound } from 'next/navigation'

import { routing } from '@/i18n/routing'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

import { Background } from '@/components/ui/shared/background'

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

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${cinzel.variable} ${medievalSharp.variable} ${philosopher.variable} font-body antialiased selection:bg-(--color-secondary)/30 selection:text-(--color-ivory)`}
      >
        <NextIntlClientProvider messages={messages}>
          <Background />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
