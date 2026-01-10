'use client'

import { RouteTransition } from '@/components/layout/RouteTransition'
import { useNotification } from '@/components/providers/NotificationProvider'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Check, Lock, Mail, Scroll, Sparkles, Swords, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const FLAVOR_TEXTS = [
  'Vstup do světa plného nebezpečí a dobrodružství...',
  'Tvá legenda čeká na sepsání...',
  'Machala volá své hrdiny...',
  'Čest, sláva a zlato čekají na statečné...',
]

export function LoginForm() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const [flavorText, setFlavorText] = useState(FLAVOR_TEXTS[0])

  useEffect(() => {
    setFlavorText(FLAVOR_TEXTS[Math.floor(Math.random() * FLAVOR_TEXTS.length)])
    setIsMounted(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || isLoading) return

    setIsLoading(true)
    try {
      const { signIn } = await import('next-auth/react')
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        showNotification({
          variant: 'error',
          title: 'Přihlášení selhalo',
          description: 'Zkontroluj email a heslo',
        })
        setIsLoading(false)
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
    <RouteTransition>
      <div
        className="relative flex h-dvh flex-col overflow-auto bg-[#0a0806]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/locations/city-background.jpg)' }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/75 to-black/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-1 items-center justify-center p-3 pt-12 sm:p-4">
          <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2">
            {/* Left Column: Login Form */}
            <div className="mx-auto w-full max-w-md">
              {/* Logo & Title */}
              <div className="mb-6 text-center sm:mb-8">
                <div className="relative mb-4 inline-block">
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#ffd700]/20 to-[#8b6f47]/20 blur-2xl"></div>
                  <div className="relative rounded-full border-2 border-[#ffd700] bg-linear-to-br from-[#8b6f47] to-[#6d5a3e] p-4 shadow-2xl">
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
              <div className="mb-4 rounded-lg border-2 border-[#d4a574] bg-black/90 p-4 shadow-2xl backdrop-blur-md sm:p-6">
                <form onSubmit={handleLogin} className="space-y-4">
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
                        disabled={isLoading}
                        autoComplete="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck="false"
                        className="w-full rounded-lg border-2 border-[#8b6f47] bg-black/60 py-2.5 pr-3 pl-10 text-sm text-[#ffd700] transition-colors placeholder:text-[#8b7355] focus:border-[#ffd700] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-base"
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
                        disabled={isLoading}
                        autoComplete="current-password"
                        className="w-full rounded-lg border-2 border-[#8b6f47] bg-black/60 py-2.5 pr-3 pl-10 text-sm text-[#ffd700] transition-colors placeholder:text-[#8b7355] focus:border-[#ffd700] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-base"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      />
                    </div>
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                        rememberMe
                          ? 'border-[#ffd700] bg-[#ffd700]'
                          : 'border-[#8b6f47] bg-black/60 hover:border-[#ffd700]'
                      } disabled:cursor-not-allowed disabled:opacity-50`}
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
                    disabled={!email || !password || isLoading}
                    className="w-full rounded-lg border border-[#8b6f47] bg-[#8b6f47]/10 py-2.5 text-center text-sm text-[#d4a574] transition-all hover:border-[#ffd700] hover:bg-[#8b6f47]/20 hover:text-[#ffd700] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#8b6f47] disabled:hover:bg-[#8b6f47]/10 disabled:hover:text-[#d4a574]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {isLoading ? 'Přihlašování...' : 'Přihlásit se'}
                  </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#8b6f47] to-transparent"></div>
                  <span
                    className="text-xs text-[#8b7355]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    NEBO
                  </span>
                  <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#8b6f47] to-transparent"></div>
                </div>

                {/* Other Actions */}
                <div className="space-y-3">
                  <button
                    onClick={handleDemoMode}
                    disabled={isLoading}
                    className="w-full rounded-lg border border-[#8b6f47] bg-[#8b6f47]/10 py-2.5 text-center text-sm text-[#d4a574] transition-all hover:border-[#ffd700] hover:bg-[#8b6f47]/20 hover:text-[#ffd700] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#8b6f47] disabled:hover:bg-[#8b6f47]/10 disabled:hover:text-[#d4a574]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {isLoading ? 'Vytváření účtu...' : 'Zkusit hru jako host (bez registrace)'}
                  </button>

                  <button
                    onClick={handleRegister}
                    disabled={isLoading}
                    className="w-full rounded-lg border-2 border-[#d4a574] py-2.5 text-center text-sm text-[#ffd700] transition-all hover:scale-[1.02] hover:bg-[#d4a574]/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-transparent"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    Vytvořit nový účet
                  </button>
                </div>
              </div>

              {/* Mobile Info Accordion */}
              <div className="lg:hidden">
                {isMounted && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="stats" className="border-[#8b6f47]">
                      <AccordionTrigger className="rounded-lg border border-[#8b6f47] bg-black/80 px-4 py-3 text-[#ffd700] hover:bg-[#8b6f47]/10">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span style={{ fontFamily: 'var(--font-fantasy)' }}>
                            Statistiky serveru
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 max-h-[40vh] overflow-y-auto rounded-lg border border-[#8b6f47] bg-black/80 p-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
                            <div className="mb-1 text-xs text-[#8b7355]">Aktivní hráči</div>
                            <div
                              className="text-lg text-[#ffd700]"
                              style={{ fontFamily: 'var(--font-fantasy)' }}
                            >
                              1,247
                            </div>
                          </div>
                          <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
                            <div className="mb-1 text-xs text-[#8b7355]">Zabití bossů</div>
                            <div
                              className="text-lg text-[#ff6b6b]"
                              style={{ fontFamily: 'var(--font-fantasy)' }}
                            >
                              89
                            </div>
                          </div>
                          <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
                            <div className="mb-1 text-xs text-[#8b7355]">Top level</div>
                            <div
                              className="text-lg text-[#6fbf6f]"
                              style={{ fontFamily: 'var(--font-fantasy)' }}
                            >
                              87
                            </div>
                          </div>
                          <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
                            <div className="mb-1 text-xs text-[#8b7355]">Questy</div>
                            <div
                              className="text-lg text-[#69ccf0]"
                              style={{ fontFamily: 'var(--font-fantasy)' }}
                            >
                              12k+
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="updates" className="mt-3 border-[#8b6f47]">
                      <AccordionTrigger className="rounded-lg border border-[#8b6f47] bg-black/80 px-4 py-3 text-[#ffd700] hover:bg-[#8b6f47]/10">
                        <div className="flex items-center gap-2">
                          <Scroll className="h-4 w-4" />
                          <span style={{ fontFamily: 'var(--font-fantasy)' }}>
                            Nejnovější změny
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 max-h-[40vh] overflow-y-auto rounded-lg border border-[#8b6f47] bg-black/80 p-4">
                        <ul className="space-y-2 text-sm text-[#d4a574]">
                          <li className="flex items-start gap-2">
                            <span className="mt-1 text-[#ffd700]">•</span>
                            <span>
                              <span className="text-[#6fbf6f]">Rozšíření dovedností:</span> 19
                              skills ve 3 větvích (Combat, Defense, Magic)
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1 text-[#ffd700]">•</span>
                            <span>
                              <span className="text-[#69ccf0]">WoW-style talent systém:</span>{' '}
                              3-tier progrese s unlock požadavky
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1 text-[#ffd700]">•</span>
                            <span>
                              <span className="text-[#ff6b6b]">Movement systém:</span> Směrové
                              pohyby (N/S/E/W) + náhodné souboje
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1 text-[#ffd700]">•</span>
                            <span>Kompaktní CharacterBox redesign s medieval fantasy stylem</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            </div>

            {/* Right Column: Info & Stats */}
            <div className="mx-auto hidden w-full max-w-md space-y-4 self-end lg:block">
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
                  Nejnovější změny
                </h4>
                <ul className="space-y-2 text-sm text-[#d4a574]">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#ffd700]">•</span>
                    <span>
                      <span className="text-[#6fbf6f]">Rozšíření dovedností:</span> 19 skills ve 3
                      větvích (Combat, Defense, Magic)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#ffd700]">•</span>
                    <span>
                      <span className="text-[#69ccf0]">WoW-style talent systém:</span> 3-tier
                      progrese s unlock požadavky
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#ffd700]">•</span>
                    <span>
                      <span className="text-[#ff6b6b]">Movement systém:</span> Směrové pohyby
                      (N/S/E/W) + náhodné souboje
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#ffd700]">•</span>
                    <span>Kompaktní CharacterBox redesign s medieval fantasy stylem</span>
                  </li>
                </ul>
              </div>

              {/* Quote/Lore */}
              <div className="rounded-lg border border-[#8b6f47]/50 bg-black/60 p-4 text-center text-sm text-[#8b7355] italic">
                &quot;V dobách temnoty se rodí legendy. Budeš jednou z nich, nebo padneš v zapomnění
                jako ti před tebou?&quot;
              </div>

              {/* Version Footer */}
              <div className="border-t border-[#8b6f47]/30 pt-4 text-center">
                <p className="text-xs text-[#8b7355]">
                  Verze 2.0 • © {new Date().getFullYear()} Land of Machala
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RouteTransition>
  )
}
