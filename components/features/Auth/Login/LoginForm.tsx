import { useNotification } from '@/components/providers/NotificationProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { GameDivider } from '@/components/ui/GameDivider'
import { Label } from '@/components/ui/label'
import { createGuestAccountAction, loginAction } from '@/lib/actions/auth'
import { getMyCharacterAction } from '@/lib/actions/character'
import { cn } from '@/lib/utils'
import { Check, Lock, Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AuthInput } from '../Shared/AuthInput'

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
      const [data, err] = await createGuestAccountAction()

      if (err || !data) {
        throw new Error(err?.message || 'Failed to create guest account')
      }

      const { email: guestEmail, password: guestPassword } = data

      const result = await signIn('credentials', {
        email: guestEmail,
        password: guestPassword,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

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
          <AuthInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Zadej email..."
            icon={Mail}
            disabled={isLoading}
            autoComplete="email"
          />

          <AuthInput
            id="password"
            label="Heslo"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Zadej heslo..."
            icon={Lock}
            disabled={isLoading}
            autoComplete="current-password"
          />

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              disabled={isLoading}
              onClick={() => setRememberMe(!rememberMe)}
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded border-2 p-0 transition-all disabled:cursor-not-allowed disabled:opacity-50',
                rememberMe
                  ? 'border-game-gold bg-game-gold'
                  : 'border-game-copper hover:border-game-gold bg-black/60'
              )}
            >
              {rememberMe && <Check className="h-3.5 w-3.5 text-black" />}
            </Button>
            <Label
              onClick={() => setRememberMe(!rememberMe)}
              className="font-fantasy text-game-gold-muted hover:text-game-gold cursor-pointer text-xs transition-colors select-none sm:text-sm"
            >
              Zapamatovat si mě
            </Label>
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

        <GameDivider label="NEBO" />

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
