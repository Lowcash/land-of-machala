'use client'

import { useHeroText } from '@/lib/hooks/auth'
import { Sparkles } from 'lucide-react'
import { Brand } from '../Shared/Brand'
import { Layout } from '../Shared/Layout'
import { FeatureList } from './FeatureList'
import { RegisterForm } from './RegisterForm'

export function Register() {
  const { heroText, isMounted } = useHeroText()

  return (
    <Layout backgroundImage="/assets/locations/city-background.jpg">
      <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2">
        {/* Left Column: Brand & Register Form */}
        <div className="mx-auto w-full max-w-md">
          <Brand className="mb-8" />
          <RegisterForm />

          {/* Mobile Info Accordion */}
          <div className="lg:hidden">
            {isMounted && (
              <details className="w-full">
                <summary className="border-game-copper text-game-gold hover:bg-game-copper/10 flex cursor-pointer list-none items-center gap-2 rounded-lg border bg-black/80 px-4 py-3">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-fantasy">Začni své dobrodružství</span>
                </summary>
                <div className="border-game-copper text-game-gold-muted mt-2 rounded-lg border bg-black/80 p-4 text-xs leading-relaxed">
                  Registrací získáš přístup do světa Machala, kde můžeš vytvořit svého hrdinu,
                  bojovat s monstry a získávat legendární předměty.
                </div>
              </details>
            )}
          </div>
        </div>

        {/* Right Column: Features & Hero Text (Desktop Only) */}
        <div className="mx-auto hidden w-full max-w-md space-y-4 self-end lg:block">
          <FeatureList />

          {/* Quote/Lore */}
          <div className="border-game-copper/50 text-game-copper-muted rounded-lg border bg-black/60 p-4 text-center text-sm italic">
            {heroText}
          </div>
        </div>
      </div>
    </Layout>
  )
}
