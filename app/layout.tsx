import '@/styles/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { MedievalSharp } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/context/theme-provider'
import { QueryProvider } from '@/context/query-provider'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const medieval = MedievalSharp({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Land of Machala',
  description: 'A mystical realm of magic and adventure',
}

// Force dynamic rendering for all pages (required for cookie-based routing)
export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  const messages = await getMessages()

  return (
    <html lang='cs' suppressHydrationWarning>
      <head />
      <ErrorBoundary>
        <body className={cn('font-sans antialiased', medieval.variable)}>
          <SpeedInsights />

          <NextIntlClientProvider messages={messages}>
            <QueryProvider>
              <ThemeProvider
                attribute='class'
                // defaultTheme='system'
                defaultTheme='light'
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Toaster />
              </ThemeProvider>
            </QueryProvider>
          </NextIntlClientProvider>
        </body>
      </ErrorBoundary>
    </html>
  )
}
