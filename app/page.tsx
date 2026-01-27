import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

export default async function HomePage() {
  const session = await auth()

  // If logged in, go to game
  if (session) {
    redirect('/game')
  }

  // Otherwise, show login page
  redirect('/login')
}
