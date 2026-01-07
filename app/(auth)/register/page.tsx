'use client'

import { RouteTransition } from '@/components/layout/RouteTransition'
import { Lock, Mail, Sparkles, Swords } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registrace se nezdařila')
      }

      // Redirect to login after successful registration
      router.push('/login?registered=true')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Došlo k chybě. Zkuste to prosím znovu.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <RouteTransition>
      <div
        className="flex h-[100dvh] flex-col overflow-hidden bg-[#0a0806]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/locations/city-background.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-1 items-center justify-center p-3 sm:p-4">
          <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2">
            {/* Left Column: Register Form */}
            <div className="mx-auto w-full max-w-md">
              {/* Logo & Title */}
              <div className="mb-6 text-center sm:mb-8">
                <div className="relative mb-4 inline-block">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ffd700]/20 to-[#8b6f47]/20 blur-2xl"></div>
                  <div className="relative rounded-full border-2 border-[#ffd700] bg-gradient-to-br from-[#8b6f47] to-[#6d5a3e] p-4 shadow-2xl">
                    <Swords className="h-10 w-10 text-[#ffd700]" />
                  </div>
                </div>

                <h1
                  className="mb-2 text-3xl whitespace-nowrap text-[#ffd700] sm:text-4xl lg:text-5xl"
                  style={{
                    fontFamily: 'var(--font-medieval)',
                    textShadow: '3px 3px 8px rgba(0,0,0,0.9)',
                  }}
                >
                  Land of Machala
                </h1>

                <div className="mb-2 flex items-center justify-center gap-2">
                  <Sparkles className="h-3 w-3 text-[#d4a574]" />
                  <p className="text-sm text-[#d4a574] sm:text-base">Vytvoř si nový účet</p>
                  <Sparkles className="h-3 w-3 text-[#d4a574]" />
                </div>
              </div>

              {/* Register Form */}
              <form
                onSubmit={handleSubmit}
                className="mb-4 rounded-lg border-2 border-[#d4a574] bg-black/90 p-4 shadow-2xl backdrop-blur-md sm:p-6"
              >
                <div className="space-y-4">
                  <div>
                    <label
                      className="mb-2 block text-xs text-[#d4a574] sm:text-sm"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8b7355]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Zadej email..."
                        autoCapitalize="none"
                        className="w-full rounded-lg border-2 border-[#8b6f47] bg-black/60 py-2.5 pr-3 pl-10 text-sm text-[#ffd700] transition-colors placeholder:text-[#8b7355] focus:border-[#ffd700] focus:outline-none sm:py-3 sm:text-base"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="mb-2 block text-xs text-[#d4a574] sm:text-sm"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Heslo
                    </label>
                    <div className="relative">
                      <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8b7355]" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Zadej heslo (min. 6 znaků)..."
                        className="w-full rounded-lg border-2 border-[#8b6f47] bg-black/60 py-2.5 pr-3 pl-10 text-sm text-[#ffd700] transition-colors placeholder:text-[#8b7355] focus:border-[#ffd700] focus:outline-none sm:py-3 sm:text-base"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-lg border border-red-500/50 bg-red-900/30 p-3">
                      <p className="text-center text-sm text-[#ff6b6b]">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !email || !password}
                    className="w-full rounded-lg border border-[#8b6f47] bg-[#8b6f47]/10 py-2.5 text-center text-sm text-[#d4a574] transition-all hover:border-[#ffd700] hover:bg-[#8b6f47]/20 hover:text-[#ffd700] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#8b6f47] disabled:hover:bg-[#8b6f47]/10 disabled:hover:text-[#d4a574]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {loading ? 'Registruji...' : 'Vytvořit účet'}
                  </button>
                </div>
              </form>

              <div className="text-center">
                <p className="text-sm text-[#8b7355] sm:text-base">
                  Již máš účet?{' '}
                  <Link
                    href="/login"
                    className="text-[#d4a574] hover:text-[#ffd700] hover:underline"
                  >
                    Přihlas se zde
                  </Link>
                </p>
              </div>

              {/* Mobile Info - under form */}
              <div className="mt-4 lg:hidden">
                <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-3 shadow-xl backdrop-blur-md">
                  <h3
                    className="mb-2 flex items-center justify-center gap-2 text-sm text-[#ffd700]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    <Sparkles className="h-4 w-4" />
                    Začni své dobrodružství
                  </h3>
                  <p className="text-center text-xs leading-relaxed text-[#d4a574]">
                    Registrací získáš přístup do světa Machala
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Info - desktop only */}
            <div className="mx-auto hidden w-full max-w-md lg:block">
              <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-4 shadow-xl backdrop-blur-md">
                <h3
                  className="mb-4 flex items-center gap-2 text-base text-[#ffd700]"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  <Sparkles className="h-5 w-5" />
                  Začni své dobrodružství
                </h3>
                <p className="text-sm leading-relaxed text-[#d4a574]">
                  Registrací získáš přístup do světa Machala, kde můžeš vytvořit svého hrdinu,
                  bojovat s monstry a získávat legendární předměty.
                </p>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="mt-4 border-t border-[#8b6f47]/30 pt-4 text-center lg:hidden">
              <p className="text-xs text-[#8b7355]">Verze 2.0 • © 2025 Land of Machala</p>
            </div>
          </div>
        </div>
      </div>
    </RouteTransition>
  )
}
