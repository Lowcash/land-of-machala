import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import ThemeRegistry from '~/styles/theme'
import { TRPCReactProvider } from '~/trpc/react'
import NextAuthProvider from '~/ctx/auth-provider'

import _Layout from './_layout'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Land of Machala App',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextAuthProvider>
            <ThemeRegistry options={{ key: 'mui' }}>
              <_Layout>{children}</_Layout>
            </ThemeRegistry>
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
