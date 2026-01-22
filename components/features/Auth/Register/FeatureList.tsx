import { Sparkles } from 'lucide-react'

export function FeatureList() {
  return (
    <>
      <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-4 shadow-xl backdrop-blur-md">
        <h3
          className="mb-4 flex items-center gap-2 text-base text-[#ffd700]"
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

      {/* Version Footer */}
      <div className="border-t border-[#8b6f47]/30 pt-4 text-center">
        <p className="text-xs text-[#8b7355]">
          Verze 2.0 • © {new Date().getFullYear()} Land of Machala
        </p>
      </div>
    </>
  )
}
