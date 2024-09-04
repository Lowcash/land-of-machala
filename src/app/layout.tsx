import '@/styles/globals.css'
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import Script from 'next/script'
import { MedievalSharp } from 'next/font/google'
import { initialize } from './inititialize'

import Hydration from './_hydration'
import { ThemeProvider } from '@/context/theme-provider'
import { QueryProvider } from '@/context/query-provider'

initialize()

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

export default async function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === 'production' && (
          <Script defer src='https://cloud.umami.is/script.js' data-website-id='94bf505a-895c-4213-8e6a-0d2513987607' />
        )}
      </head>
      <body
        className={cn(
          'flex h-screen w-screen flex-col bg-background bg-cover font-sans antialiased',
          medieval.variable,
        )}
      >
        <QueryProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <Hydration>{children}</Hydration>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
