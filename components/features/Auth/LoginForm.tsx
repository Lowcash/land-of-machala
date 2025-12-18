'use client'

import { RouteTransition } from '@/components/layout/RouteTransition'
import { ArrowRight, Check, Lock, Scroll, Sparkles, Swords, User, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const flavorTexts = [
    'Vstup do světa plného nebezpečí a dobrodružství...',
    'Tvá legenda čeká na sepsání...',
    'Machala volá své hrdiny...',
    'Čest, sláva a zlato čekají na statečné...',
  ]

  const [flavorText] = useState(flavorTexts[Math.floor(Math.random() * flavorTexts.length)])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) return

    try {
      const { signIn } = await import('next-auth/react')
      const result = await signIn('credentials', {
        email: username,
        password,
        redirect: false,
      })

      if (result?.error) {
        alert('Přihlášení selhalo. Zkontroluj email a heslo.')
      } else {
        // Check if user has character
        const response = await fetch('/api/character/check')
        const data = await response.json()

        if (data.hasCharacter) {
          router.push('/game')
        } else {
          router.push('/onboarding')
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Došlo k chybě při přihlašování')
    }
  }

  const handleDemoMode = async () => {
    try {
      // Create guest account
      const response = await fetch('/api/auth/guest', {
        method: 'POST',
      })
      const { email, password } = await response.json()

      // Sign in with guest credentials
      const { signIn } = await import('next-auth/react')
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      // Guest users always need to create character
      router.push('/onboarding')
    } catch (error) {
      console.error('Guest login error:', error)
      alert('Došlo k chybě při vytváření host účtu')
    }
  }

  const handleRegister = () => {
    router.push('/register')
  }

  return (
    <RouteTransition>
      <div
        className="relative flex h-screen flex-col overflow-y-auto bg-[#0a0806]"
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
            {/* Left Column: Login Form */}
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
                  <p className="text-sm text-[#d4a574] sm:text-base">Textová fantasy hra</p>
                  <Sparkles className="h-3 w-3 text-[#d4a574]" />
                </div>

                <p className="mt-2 text-xs text-[#8b7355] italic sm:text-sm">{flavorText}</p>
              </div>

              {/* Login Form */}
              <form
                onSubmit={handleLogin}
                className="mb-4 rounded-lg border-2 border-[#d4a574] bg-black/90 p-4 shadow-2xl backdrop-blur-md sm:p-6"
              >
                <div className="space-y-4">
                  <div>
                    <label
                      className="mb-2 block text-xs text-[#d4a574] sm:text-sm"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Uživatelské jméno
                    </label>
                    <div className="relative">
                      <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8b7355]" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Zadej jméno..."
                        className="w-full rounded-lg border-2 border-[#8b6f47] bg-black/60 py-2.5 pr-3 pl-10 text-sm text-[#ffd700] transition-colors placeholder:text-[#8b7355] focus:border-[#ffd700] focus:outline-none sm:py-3 sm:text-base"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
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
                        placeholder="Zadej heslo..."
                        className="w-full rounded-lg border-2 border-[#8b6f47] bg-black/60 py-2.5 pr-3 pl-10 text-sm text-[#ffd700] transition-colors placeholder:text-[#8b7355] focus:border-[#ffd700] focus:outline-none sm:py-3 sm:text-base"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      />
                    </div>
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                        rememberMe
                          ? 'border-[#ffd700] bg-[#ffd700]'
                          : 'border-[#8b6f47] bg-black/60 hover:border-[#ffd700]'
                      }`}
                    >
                      {rememberMe && <Check className="h-3.5 w-3.5 text-black" />}
                    </button>
                    <label
                      onClick={() => setRememberMe(!rememberMe)}
                      className="cursor-pointer text-xs text-[#d4a574] transition-colors select-none hover:text-[#ffd700] sm:text-sm"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Zapamatovat si mě
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!username || !password}
                    className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border-2 py-3 transition-all duration-300 ${
                      username && password
                        ? 'border-[#ffd700] bg-gradient-to-br from-[#d4a574] via-[#8b6f47] to-[#6d5a3e] text-white shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:from-[#ffd700] hover:via-[#d4a574] hover:to-[#8b6f47] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]'
                        : 'cursor-not-allowed border-[#8b6f47]/50 bg-black/40 text-[#8b7355] opacity-50'
                    }`}
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    <span className="relative z-10 text-base sm:text-lg">Přihlásit se</span>
                    <ArrowRight
                      className={`relative z-10 h-5 w-5 transition-transform ${username && password ? 'group-hover:translate-x-1' : ''}`}
                    />
                  </button>
                </div>
              </form>

              <div className="space-y-2 text-center">
                <button
                  onClick={handleDemoMode}
                  className="w-full rounded-lg border border-[#8b6f47]/30 py-2 text-center text-sm text-[#8b7355] transition-colors hover:border-[#ffd700]/30 hover:text-[#ffd700]"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  Zkusit hru jako host (bez registrace)
                </button>

                <button
                  onClick={handleRegister}
                  className="block w-full text-sm text-[#d4a574] transition-colors hover:text-[#ffd700] sm:text-base"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  Vytvořit nový účet
                </button>
              </div>
            </div>

            {/* Right Column: Info & Stats */}
            <div className="mx-auto w-full max-w-md space-y-4">
              {/* Server Stats */}
              <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-4 shadow-xl backdrop-blur-md">
                <h3
                  className="mb-4 flex items-center gap-2 text-base text-[#ffd700]"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  <Users className="h-5 w-5" />
                  Statistiky serveru
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
                    <div className="mb-1 text-xs text-[#8b7355]">Aktivní hráči</div>
                    <div
                      className="text-xl text-[#ffd700]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      1,247
                    </div>
                  </div>
                  <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
                    <div className="mb-1 text-xs text-[#8b7355]">Zabití bossů</div>
                    <div
                      className="text-xl text-[#ff6b6b]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      89
                    </div>
                  </div>
                  <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
                    <div className="mb-1 text-xs text-[#8b7355]">Top level</div>
                    <div
                      className="text-xl text-[#6fbf6f]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      87
                    </div>
                  </div>
                  <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
                    <div className="mb-1 text-xs text-[#8b7355]">Questy</div>
                    <div
                      className="text-xl text-[#69ccf0]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      12k+
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Updates */}
              <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-4 shadow-xl backdrop-blur-md">
                <h4
                  className="mb-3 flex items-center gap-2 text-base text-[#ffd700]"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  <Scroll className="h-5 w-5" />
                  Novinky (v1.2.5)
                </h4>
                <ul className="space-y-2 text-sm text-[#d4a574]">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#ffd700]">•</span>
                    <span>
                      Nový dungeon: <span className="text-[#ff6b6b]">Dračí doupě</span> pro level
                      10+
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#ffd700]">•</span>
                    <span>15 nových achievementů a titulů</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#ffd700]">•</span>
                    <span>Balance změny pro mage class</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#ffd700]">•</span>
                    <span>Bug fixes a optimalizace výkonu</span>
                  </li>
                </ul>
              </div>

              {/* Quote/Lore */}
              <div className="rounded-lg border border-[#8b6f47]/50 bg-black/60 p-4 text-center text-sm text-[#8b7355] italic">
                &quot;V dobách temnoty se rodí legendy. Budeš jednou z nich, nebo padneš v zapomnění
                jako ti před tebou?&quot;
              </div>

              <div className="pt-2 text-center">
                <p className="text-xs text-[#8b7355]">Verze 1.2.5 • © 2025 Land of Machala</p>
              </div>
            </div>

            {/* Mobile Footer (visible only on small screens) */}
            <div className="mt-4 border-t border-[#8b6f47]/30 pt-4 text-center lg:hidden">
              <p className="text-xs text-[#8b7355]">Verze 1.2.5 • © 2025 Land of Machala</p>
            </div>
          </div>
        </div>
      </div>
    </RouteTransition>
  )
}
