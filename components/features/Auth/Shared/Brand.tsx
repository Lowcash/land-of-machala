import { Sparkles, Swords } from 'lucide-react'

interface BrandProps {
  className?: string
  heroText: string
}

export function Brand({ className = '', heroText }: BrandProps) {
  return (
    <div className={`mb-6 text-center sm:mb-8 ${className}`}>
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

      <p className="mt-2 text-xs text-[#8b7355] italic sm:text-sm">{heroText}</p>
    </div>
  )
}
