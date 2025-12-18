import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { Cinzel, MedievalSharp, Philosopher } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

const medievalSharp = MedievalSharp({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-medieval',
  display: 'swap',
})

const philosopher = Philosopher({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-philosopher',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Land of Machala',
  description: 'An epic RPG adventure',
}

import { GameBackgroundWrapper } from '@/components/layout/GameBackgroundWrapper'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${medievalSharp.variable} ${philosopher.variable}`}
    >
      <body className="font-body text-game-fg bg-black antialiased">
        <GameBackgroundWrapper>{children}</GameBackgroundWrapper>
        <Toaster />
      </body>
    </html>
  )
}
