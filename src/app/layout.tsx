import type { Metadata } from 'next'
import { Cinzel, Newsreader, Noto_Serif, Work_Sans } from 'next/font/google'

import { NextIntlClientProvider } from 'next-intl'

import { getMessages, routing } from '@/lib/i18n'
import { SITE_APP_NAME, SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site-config'

import './globals.css'

const readingFont = Newsreader({
  subsets: ['latin'],
  variable: '--font-source-reading',
  display: 'swap',
})

const interfaceFont = Work_Sans({
  subsets: ['latin'],
  variable: '--font-source-interface',
  display: 'swap',
})

const displayFont = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-source-display',
  display: 'swap',
})

const wordmarkFont = Cinzel({
  subsets: ['latin'],
  variable: '--font-source-wordmark',
  display: 'swap',
})

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_APP_NAME,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={routing.defaultLocale}>
      <body
        className={`${readingFont.variable} ${interfaceFont.variable} ${displayFont.variable} ${wordmarkFont.variable}`}
      >
        <NextIntlClientProvider locale={routing.defaultLocale} messages={getMessages()}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
