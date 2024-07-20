import '@/styles/globals.css'
import type { Metadata } from 'next'
import { MedievalSharp } from 'next/font/google'
import { cn } from '@/lib/utils'
import { cookies } from 'next/headers'
import { getServerAuthSession } from '@/server/auth'
import { TRPCReactProvider } from '@/trpc/react'
import { NextAuthProvider } from '@/ctx/auth-provider'
import { ThemeProvider } from '@/ctx/theme-provider'

import { Header, Footer, Main } from '@/styles/common'
import Intro from './(intro)'
import Game from './(game)'
import User from '@/components/user'

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

  const path = '/images/environment/forest.webp'

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn('flex flex-col h-screen w-screen bg-background font-sans antialiased', medieval.variable)}
        style={session ? { backgroundImage: `url(${path})`, backgroundSize: '100% 100%' } : undefined}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextAuthProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
              <Header>
                <div className='w-fit ml-auto space-x-1'>
                  {session && <User />}
                </div>
              </Header>

              <Main>
                {!session && <Intro />}
                {session && <Game>{children}</Game>}
              </Main>

              <Footer>
                <div className='w-fit ml-auto mr-auto'></div>
              </Footer>
            </ThemeProvider>
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
