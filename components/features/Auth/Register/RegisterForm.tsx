'use client'

import { useNotification } from '@/components/providers/NotificationProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerAction } from '@/lib/actions/auth'
import { Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function RegisterForm() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

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

      // Auto-redirect to onboarding since registerAction signs the user in
      router.push('/onboarding')
    } catch (err) {
      if (err instanceof Error) {
        showNotification({
          variant: 'error',
          title: 'Chyba registrace',
          description: err.message,
        })
      } else {
        showNotification({
          variant: 'error',
          title: 'Chyba',
          description: 'Došlo k chybě. Zkuste to prosím znovu.',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      variant="default"
      className="border-game-gold/20 w-full max-w-md bg-black/40 backdrop-blur-md"
    >
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
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
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                className="font-fantasy text-game-gold placeholder:text-game-gold/30 border-game-gold/30 bg-game-wood-dark/50 focus-visible:border-game-gold pl-10 focus-visible:ring-0"
                required
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
                placeholder="Zadej heslo (min. 6 znaků)..."
                autoCapitalize="none"
                className="font-fantasy text-game-gold placeholder:text-game-gold/30 border-game-gold/30 bg-game-wood-dark/50 focus-visible:border-game-gold pl-10 focus-visible:ring-0"
                required
                minLength={6}
              />
            </div>
          </div>

          <Button
            type="submit"
            loading={loading}
            disabled={!email || !password}
            variant="game-primary"
            className="font-fantasy w-full font-bold"
          >
            {loading ? 'Registruji...' : 'Vytvořit účet'}
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
