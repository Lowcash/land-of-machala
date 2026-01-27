import { Sparkles } from 'lucide-react'

import { HERO_TEXTS } from '@/lib/game/data'

import { Brand } from '../Shared/Brand'
import { Layout } from '../Shared/Layout'
import { LoreQuote } from '../Shared/LoreQuote'
import { FeatureList } from './FeatureList'
import { RegisterForm } from './RegisterForm'

export function Register() {
  const randomHeroText = HERO_TEXTS[Math.floor(Math.random() * HERO_TEXTS.length)] || HERO_TEXTS[0]
  const randomQuote = HERO_TEXTS[Math.floor(Math.random() * HERO_TEXTS.length)] || HERO_TEXTS[0]

  return (
    <Layout backgroundImage="/assets/locations/city-background.jpg">
      <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2">
        {/* Left Column: Brand & Register Form */}
        <div className="mx-auto w-full max-w-md">
          <Brand className="mb-8" heroText={randomHeroText} />
          <RegisterForm />

          {/* Mobile Info Accordion */}
          <div className="mt-4 lg:hidden">
            <details className="group w-full">
              <summary className="border-game-copper text-game-gold hover:bg-game-copper/10 flex cursor-pointer list-none items-center gap-2 rounded-lg border bg-black/80 px-4 py-3 transition-colors">
                <Sparkles className="h-4 w-4" />
                <span className="font-fantasy">Začni své dobrodružství</span>
              </summary>
              <div className="border-game-copper text-game-gold-muted mt-2 rounded-lg border bg-black/80 p-4 text-xs leading-relaxed">
                Registrací získáš přístup do světa Machala, kde můžeš vytvořit svého hrdinu, bojovat
                s monstry a získávat legendární předměty.
              </div>
            </details>
          </div>
        </div>

        {/* Right Column: Features & Hero Text (Desktop Only) */}
        <div className="mx-auto hidden w-full max-w-md space-y-4 self-end lg:block">
          <FeatureList />
          <LoreQuote text={randomQuote} />
        </div>
      </div>
    </Layout>
  )
}
