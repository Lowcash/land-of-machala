import type { Metadata } from 'next'

import { NextIntlClientProvider } from 'next-intl'

import { getMessages, routing } from '@/lib/i18n'
import { SITE_APP_NAME, SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site-config'

import './globals.css'

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_APP_NAME,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={routing.defaultLocale}>
      <body>
        <NextIntlClientProvider locale={routing.defaultLocale} messages={getMessages()}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
