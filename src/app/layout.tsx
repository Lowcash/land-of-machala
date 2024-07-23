import '@/styles/globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { MedievalSharp } from 'next/font/google'
import { cn } from '@/lib/utils'
import { getServerAuthSession } from '@/server/auth'
import { TRPCReactProvider } from '@/trpc/react'
import { ThemeProvider } from '@/ctx/theme-provider'
import { LayoutProvider } from '@/ctx/layout-provider'
import { PageProvider } from '@/ctx/page-provider'
import { AuthRequiredError } from '@/lib/exceptions'

const medieval = MedievalSharp({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Land of Machala',
  description: 'A mystical realm of magic and adventure',
  icons: [{ rel: 'icon', url: './favicon.ico' }],
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession()

  if (!session) throw new AuthRequiredError()

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === 'production' && (
          <Script defer src='https://cloud.umami.is/script.js' data-website-id='94bf505a-895c-4213-8e6a-0d2513987607' />
        )}
      </head>
      <body
        className={cn('flex flex-col h-screen w-screen bg-background font-sans antialiased', medieval.variable)}
        style={{ backgroundSize: '100% 100%' }}
      >
        <TRPCReactProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <LayoutProvider>
              <PageProvider signed={!!session}>{children}</PageProvider>
            </LayoutProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
