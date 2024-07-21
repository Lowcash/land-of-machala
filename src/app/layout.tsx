import '@/styles/globals.css'
import type { Metadata } from 'next'
import { MedievalSharp } from 'next/font/google'
import { cn } from '@/lib/utils'
import { cookies } from 'next/headers'
import { getServerAuthSession } from '@/server/auth'
import { TRPCReactProvider } from '@/trpc/react'
import { NextAuthProvider } from '@/ctx/auth-provider'
import { ThemeProvider } from '@/ctx/theme-provider'
import { LayoutProvider } from '@/ctx/layout-provider'
import { PageProvider } from '@/ctx/page-provider'

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

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn('flex flex-col h-screen w-screen bg-background font-sans antialiased', medieval.variable)}
        style={{ backgroundSize: '100% 100%' }}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextAuthProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
              <LayoutProvider>
                <PageProvider signed={!!session}>{children}</PageProvider>
              </LayoutProvider>
            </ThemeProvider>
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
