'use client'

import { useRouter } from 'next/navigation'

import { LogOut } from 'lucide-react'

import { logoutAction } from '@/lib/actions/auth'

import { Button } from '@/components/ui/button'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutAction()
    router.refresh() // Clear client cache
    router.replace('/login') // Redirect to login
  }

  return (
    <Button
      variant="game-danger-ghost"
      size="game-compact"
      onClick={handleLogout}
      aria-label="Odhlásit se z hry"
      icon={LogOut}
      label="Odhlásit"
      responsiveLabel
    />
  )
}
