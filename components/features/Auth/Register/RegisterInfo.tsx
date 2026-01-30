import { Sparkles } from 'lucide-react'

export function RegisterInfo() {
  const heroText =
    'V dobách temnoty se rodí legendy. Budeš jednou z nich, nebo padneš v zapomnění jako ti před tebou?'

  return (
    <div className="mx-auto hidden w-full max-w-md space-y-4 self-end lg:block">
      <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-4 shadow-xl backdrop-blur-md">
        <h3
          className="animate-pulse-glow mb-4 flex items-center gap-2 text-base text-[#ffd700]"
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          <Sparkles className="h-5 w-5" />
          Začni své dobrodružství
        </h3>
        <p className="mb-3 text-sm leading-relaxed text-[#d4a574]">
          Registrací získáš přístup do světa Machala, kde můžeš:
        </p>
        <ul className="space-y-2 text-sm text-[#d4a574]">
          <li className="flex items-start gap-2">
            <span className="mt-1 text-[#ffd700]">•</span>
            <span>Vytvořit svého hrdinu z 6 ras a povolání</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-[#ffd700]">•</span>
            <span>Bojovat s monstry a získávat legendární předměty</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-[#ffd700]">•</span>
            <span>Plnit questy a odhalovat příběh země Machala</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-[#ffd700]">•</span>
            <span>Rozvíjet dovednosti ve 3 větvích talentů</span>
          </li>
        </ul>
      </div>

      {/* Quote/Lore */}
      <div className="rounded-lg border border-[#8b6f47]/50 bg-black/60 p-4 text-center text-sm text-[#8b7355] italic">
        {heroText}
      </div>

      {/* Version Footer */}
      <div className="border-t border-[#8b6f47]/30 pt-4 text-center">
        <p className="text-xs text-[#8b7355]">
          Verze 2.0 • © {new Date().getFullYear()} Land of Machala
        </p>
      </div>
    </div>
  )
}
