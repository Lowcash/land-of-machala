import '@/styles/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { MedievalSharp } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/context/theme-provider'
import { QueryProvider } from '@/context/query-provider'

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

export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <html lang='cs' suppressHydrationWarning>
      <head />
      <body className={cn('font-sans antialiased', medieval.variable)}>
        <SpeedInsights />

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
      </body>
    </html>
  )
}
