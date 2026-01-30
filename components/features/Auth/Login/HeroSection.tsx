'use client'

import { useEffect, useState } from 'react'

import { Sparkles, Swords } from 'lucide-react'

const HERO_TEXTS = [
  'V dobách temnoty se rodí legendy. Budeš jednou z nich, nebo padneš v zapomnění jako ti před tebou?',
  'Tvá cesta začíná právě teď. Každé rozhodnutí formuje tvůj osud.',
  'Machala volá své hrdiny. Odpovíš na volání?',
  'Nebezpečí číhá za každým rohem, ale s odvahou přichází sláva.',
  'Dávné legendy praví o hrdinech, kteří změnili osud světa. Tvůj příběh začíná zde.',
]

const FLAVOR_TEXTS = [
  'Vstup do světa plného nebezpečí a dobrodružství...',
  'Tvá legenda čeká na sepsání...',
  'Machala volá své hrdiny...',
  'Čest, sláva a zlato čekají na statečné...',
]

export function HeroSection() {
  const [flavorText, setFlavorText] = useState<string>(FLAVOR_TEXTS[0]!)
  const [heroText, setHeroText] = useState<string>(HERO_TEXTS[0]!)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setFlavorText(FLAVOR_TEXTS[Math.floor(Math.random() * FLAVOR_TEXTS.length)] ?? FLAVOR_TEXTS[0]!)
    setHeroText(HERO_TEXTS[Math.floor(Math.random() * HERO_TEXTS.length)] ?? HERO_TEXTS[0]!)
  }, [])

  if (!mounted) {
    // Return a stable initial state for SSR to avoid hydration mismatch
    return <HeroContent flavor={FLAVOR_TEXTS[0]!} hero={HERO_TEXTS[0]!} />
  }

  return <HeroContent flavor={flavorText} hero={heroText} />
}

function HeroContent({ flavor, hero }: { flavor: string; hero: string }) {
  return (
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

      <div className="min-h-[20px]">
        <p className="mt-2 text-xs text-[#8b7355] italic sm:text-sm">{flavor}</p>
      </div>

      {/* Hero Quote - visible only on large screens usually, but we keep it here to be flexible */}
      <div className="mx-auto mt-6 hidden max-w-md rounded-lg border border-[#8b6f47]/50 bg-black/60 p-4 text-center text-sm text-[#8b7355] italic lg:block">
        {hero}
      </div>
    </div>
  )
}
