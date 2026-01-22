'use client'

import { useNotification } from '@/components/providers/NotificationProvider'
import { registerAction } from '@/lib/actions/auth'
import { Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '../Shared/ui/Button'
import { Card } from '../Shared/ui/Card'
import { Input } from '../Shared/ui/Input'

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
    <Card className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          icon={Mail}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Zadej email..."
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          className="font-fantasy"
          required
        />

        <Input
          label="Heslo"
          icon={Lock}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Zadej heslo (min. 6 znaků)..."
          autoCapitalize="none"
          className="font-fantasy"
          required
          minLength={6}
        />

        <Button
          type="submit"
          isLoading={loading}
          disabled={!email || !password}
          className="font-fantasy"
        >
          {loading ? 'Registruji...' : 'Vytvořit účet'}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-game-copper-muted text-sm sm:text-base">
          Již máš účet?{' '}
          <Link href="/login" className="text-game-gold-muted hover:text-game-gold hover:underline">
            Přihlas se zde
          </Link>
        </p>
      </div>
    </Card>
  )
}
