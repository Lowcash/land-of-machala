'use client'

import { useNotification } from '@/components/providers/NotificationProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getMyCharacterAction } from '@/lib/actions/character'
import { cn } from '@/lib/utils'
import { Check, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
      const { createGuestAccountAction } = await import('@/lib/actions/auth')
      const [data, err] = await createGuestAccountAction()

      if (err) {
        throw new Error(err.message || 'Failed to create guest account')
      }

      if (!data) {
        throw new Error('No data returned from guest creation')
      }

      const { email, password } = data

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
    <Card
      variant="default"
      className="border-game-gold/20 w-full max-w-md bg-black/40 backdrop-blur-md"
    >
      <CardContent className="pt-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-game-gold/80">
              Email
            </Label>
            <div className="group relative">
              <div className="text-game-gold/50 group-focus-within:text-game-gold absolute top-1/2 left-3 -translate-y-1/2 transition-colors">
                <Mail className="h-4 w-4" />
              </div>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Zadej email..."
                disabled={isLoading}
                autoComplete="email"
                className="font-fantasy text-game-gold placeholder:text-game-gold/30 border-game-gold/30 bg-game-wood-dark/50 focus-visible:border-game-gold pl-10 focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-game-gold/80">
              Heslo
            </Label>
            <div className="group relative">
              <div className="text-game-gold/50 group-focus-within:text-game-gold absolute top-1/2 left-3 -translate-y-1/2 transition-colors">
                <Lock className="h-4 w-4" />
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Zadej heslo..."
                disabled={isLoading}
                autoComplete="current-password"
                className="font-fantasy text-game-gold placeholder:text-game-gold/30 border-game-gold/30 bg-game-wood-dark/50 focus-visible:border-game-gold pl-10 focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setRememberMe(!rememberMe)}
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded border-2 transition-all disabled:cursor-not-allowed disabled:opacity-50',
                rememberMe
                  ? 'border-game-gold bg-game-gold'
                  : 'border-game-copper hover:border-game-gold bg-black/60'
              )}
            >
              {rememberMe && <Check className="h-3.5 w-3.5 text-black" />}
            </button>
            <label
              onClick={() => setRememberMe(!rememberMe)}
              className="font-fantasy text-game-gold-muted hover:text-game-gold cursor-pointer text-xs transition-colors select-none sm:text-sm"
            >
              Zapamatovat si mě
            </label>
          </div>

          <Button
            type="submit"
            loading={isLoading}
            disabled={!email || !password}
            variant="game-primary"
            className="font-fantasy w-full font-bold"
          >
            Přihlásit se
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="via-game-copper h-px flex-1 bg-linear-to-r from-transparent to-transparent"></div>
          <span className="font-fantasy text-game-copper-muted text-xs">NEBO</span>
          <div className="via-game-copper h-px flex-1 bg-linear-to-r from-transparent to-transparent"></div>
        </div>

        {/* Other Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleDemoMode}
            loading={isLoading}
            variant="game-secondary"
            className="font-fantasy w-full"
          >
            Zkusit hru jako host (bez registrace)
          </Button>

          <Button
            onClick={handleRegister}
            disabled={isLoading}
            variant="ghost"
            className="border-game-gold-muted font-fantasy text-game-gold hover:border-game-gold hover:text-game-gold w-full border-2"
          >
            Vytvořit nový účet
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
