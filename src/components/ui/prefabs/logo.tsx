import { SwordsIcon } from '@/components/ui/icons'

/**
 * Logo prefab component with premium medieval design.
 * Features a glowing background, gradient borders, and centered swords icon.
 */
export function Logo() {
  return (
    <div className="relative mb-4 inline-block">
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#ffd700]/20 to-[#8b6f47]/20 blur-2xl" />
      
      {/* Circle container with gradient border and background */}
      <div className="relative rounded-full border-2 border-[#ffd700] bg-linear-to-br from-[#8b6f47] to-[#6d5a3e] p-4 shadow-2xl">
        <SwordsIcon />
      </div>
    </div>
  )
}
