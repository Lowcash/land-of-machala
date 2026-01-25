'use client'

import { useNotification } from '@/components/providers/NotificationProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { registerAction } from '@/lib/actions/auth'
import { Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AuthInput } from '../Shared/AuthInput'

export function RegisterForm() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || isLoading) return

    setIsLoading(true)
    try {
      const [, err] = await registerAction({
        email,
        password,
      })

      if (err) {
        throw new Error(err.message || 'Registrace se nezdařila')
      }

      showNotification({
        variant: 'success',
        title: 'Registrace úspěšná',
        description: 'Vítejte!',
      })

      router.push('/onboarding')
    } catch (err) {
      showNotification({
        variant: 'error',
        title: 'Chyba registrace',
        description: err instanceof Error ? err.message : 'Došlo k chybě. Zkuste to prosím znovu.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card
      variant="default"
      className="border-game-gold/20 w-full max-w-md bg-black/40 backdrop-blur-md"
    >
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Zadej email..."
            icon={Mail}
            disabled={isLoading}
            required
          />

          <AuthInput
            id="password"
            label="Heslo"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Zadej heslo (min. 6 znaků)..."
            icon={Lock}
            disabled={isLoading}
            required
            minLength={6}
          />

          <Button
            type="submit"
            loading={isLoading}
            disabled={!email || !password}
            variant="game-primary"
            className="font-fantasy w-full font-bold"
          >
            Vytvořit účet
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-game-copper-muted text-sm sm:text-base">
            Již máš účet?{' '}
            <Link
              href="/login"
              className="text-game-gold-muted hover:text-game-gold transition-colors hover:underline"
            >
              Přihlas se zde
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
