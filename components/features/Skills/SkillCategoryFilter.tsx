'use client'

import type { LucideIcon } from 'lucide-react'
import { Eye, Hammer, Shield, Sparkles, Swords } from 'lucide-react'
import type { SkillCategory } from './types'

type SkillCategoryFilterProps = {
  selectedCategory: SkillCategory
  onSelectCategory: (category: SkillCategory) => void
}

export function SkillCategoryFilter({
  selectedCategory,
  onSelectCategory,
}: SkillCategoryFilterProps) {
  const categories: Array<{ id: SkillCategory; label: string; icon: LucideIcon; color: string }> = [
    { id: 'combat', label: 'Boj', icon: Swords, color: 'text-[#ff6b6b]' },
    { id: 'defense', label: 'Obrana', icon: Shield, color: 'text-[#69ccf0]' },
    { id: 'magic', label: 'Magie', icon: Sparkles, color: 'text-[#b66bd4]' },
    { id: 'stealth', label: 'Stealth', icon: Eye, color: 'text-[#6fbf6f]' },
    { id: 'crafting', label: 'Řemeslo', icon: Hammer, color: 'text-[#d4a574]' },
  ]

  return (
    <div className="grid grid-cols-3 gap-2 border-b border-[#8b6f47] bg-black/60 p-2 backdrop-blur-sm md:flex md:w-full md:flex-col md:gap-3 md:border-b-0 md:p-4">
      <button
        onClick={() => onSelectCategory('all')}
        className={`w-full rounded border-2 px-2 py-2 text-xs transition-all md:px-4 md:text-left md:text-sm ${
          selectedCategory === 'all'
            ? 'border-[#ffd700] bg-[#8b6f47]/30 text-[#ffd700]'
            : 'border-[#8b6f47] bg-black/40 text-[#d4a574] hover:border-[#d4a574]'
        }`}
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        Vše
      </button>
      {categories.map((cat) => {
        const Icon = cat.icon
        const isActive = selectedCategory === cat.id

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex w-full items-center justify-center gap-1.5 rounded border-2 px-2 py-2 transition-all md:justify-start md:gap-2 md:px-4 ${
              isActive
                ? 'border-[#ffd700] bg-[#8b6f47]/30'
                : 'border-[#8b6f47] bg-black/40 hover:border-[#d4a574]'
            }`}
          >
            <Icon
              className={`h-3.5 w-3.5 md:h-5 md:w-5 ${isActive ? 'text-[#ffd700]' : cat.color}`}
            />
            <span
              className={`text-xs md:text-sm ${isActive ? 'text-[#ffd700]' : 'text-[#d4a574]'}`}
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {cat.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
