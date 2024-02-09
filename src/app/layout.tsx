import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { cookies } from 'next/headers'
import { getServerAuthSession } from '@/server/auth'
import { TRPCReactProvider } from '@/trpc/react'
import { NextAuthProvider } from '@/ctx/auth-provider'
import { ThemeProvider } from '@/ctx/theme-provider'

import GlobalStyles from '@/styles/globals'
import { Content, Main } from '@/styles/common'
import { Login } from '@/components/button/login'
import MenuLeft from '@/components/menu-left'
import MenuRight from '@/components/menu-right'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Land of Machala App',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: './favicon.ico' }],
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession()

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextAuthProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
              <GlobalStyles />

              {!session && <Login />}

              {session && (
                <Main>
                  <MenuLeft />
                  <Content>{children}</Content>
                  <MenuRight />
                </Main>
              )}
            </ThemeProvider>
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
