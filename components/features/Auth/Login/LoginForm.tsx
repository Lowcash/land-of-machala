'use client'

import { useNotification } from '@/components/providers/NotificationProvider'
import { getMyCharacterAction } from '@/lib/actions/character'
import { Check, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '../Shared/ui/Button'
import { Card } from '../Shared/ui/Card'
import { Input } from '../Shared/ui/Input'

export function LoginForm() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || isLoading) return

    setIsLoading(true)
    try {
      const { loginAction } = await import('@/lib/actions/auth')
      const [data, err] = await loginAction({
        email,
        password,
      })

      if (err) {
        showNotification({
          variant: 'error',
          title: 'Přihlášení selhalo',
          description: err.message || 'Zkontroluj email a heslo',
        })
        setIsLoading(false)
        return
      }

      if (data?.success) {
        // Check if user has character
        const [charData] = await getMyCharacterAction()

        if (charData?.character) {
          router.push('/game')
        } else {
          router.push('/onboarding')
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      showNotification({
        variant: 'error',
        title: 'Chyba přihlášení',
        description: 'Došlo k chybě při přihlašování',
      })
      setIsLoading(false)
    }
  }

  const handleDemoMode = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      // Create guest account
      const response = await fetch('/api/auth/guest', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to create guest account')
      }

      const { email, password } = await response.json()

      // Sign in with guest credentials
      const { signIn } = await import('next-auth/react')
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      // Guest users always need to create character
      router.push('/onboarding')
    } catch (error) {
      console.error('Guest login error:', error)
      showNotification({
        variant: 'error',
        title: 'Chyba host účtu',
        description: 'Došlo k chybě při vytváření host účtu',
      })
      setIsLoading(false)
    }
  }

  const handleRegister = () => {
    setIsLoading(true)
    router.push('/register')
  }

  return (
    <Card className="w-full max-w-md">
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email"
          icon={Mail}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Zadej email..."
          disabled={isLoading}
          autoComplete="email"
          className="font-fantasy"
        />

        <Input
          label="Heslo"
          icon={Lock}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Zadej heslo..."
          disabled={isLoading}
          autoComplete="current-password"
          className="font-fantasy"
        />

        {/* Remember Me Checkbox */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => setRememberMe(!rememberMe)}
            className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
              rememberMe
                ? 'border-game-gold bg-game-gold'
                : 'border-game-copper hover:border-game-gold bg-black/60'
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {rememberMe && <Check className="h-3.5 w-3.5 text-black" />}
          </button>
          <label
            onClick={() => setRememberMe(!rememberMe)}
            className="text-game-gold-muted hover:text-game-gold font-fantasy cursor-pointer text-xs transition-colors select-none sm:text-sm"
          >
            Zapamatovat si mě
          </label>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          disabled={!email || !password}
          className="font-fantasy"
        >
          {isLoading ? 'Přihlašování...' : 'Přihlásit se'}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="via-game-copper h-px flex-1 bg-linear-to-r from-transparent to-transparent"></div>
        <span className="text-game-copper-muted font-fantasy text-xs">NEBO</span>
        <div className="via-game-copper h-px flex-1 bg-linear-to-r from-transparent to-transparent"></div>
      </div>

      {/* Other Actions */}
      <div className="space-y-3">
        <Button
          onClick={handleDemoMode}
          isLoading={isLoading}
          variant="secondary"
          className="font-fantasy"
        >
          {isLoading ? 'Vytváření účtu...' : 'Zkusit hru jako host (bez registrace)'}
        </Button>

        <Button
          onClick={handleRegister}
          disabled={isLoading}
          variant="ghost"
          className="font-fantasy border-game-gold-muted text-game-gold border-2"
        >
          Vytvořit nový účet
        </Button>
      </div>
    </Card>
  )
}
