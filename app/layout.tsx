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

import { Background } from '@/components/ui/shared/background'

export const metadata: Metadata = {
  title: 'Land of Machala',
  description: 'An epic RPG adventure',
}

export function RootWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${cinzel.variable} ${medievalSharp.variable} ${philosopher.variable} font-body antialiased selection:bg-(--color-secondary)/30 selection:text-(--color-ivory)`}
    >
      <Background />
      {children}
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className="bg-(--color-background) text-(--color-ivory)">
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  )
}
