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
      variant="ghost"
      onClick={handleLogout}
      aria-label="Odhlásit se z hry"
      className="flex items-center gap-2 rounded border border-[#8b6f47] bg-black/60 px-3 py-1.5 transition-colors hover:border-[#ff6b6b] hover:bg-[#ff6b6b]/10 focus-visible:ring-2 focus-visible:ring-[#ff6b6b]"
    >
      <LogOut className="h-4 w-4 text-[#ff6b6b]" />
      <span className="hidden text-sm text-[#ff6b6b] sm:inline">Odhlásit</span>
    </Button>
  )
}
