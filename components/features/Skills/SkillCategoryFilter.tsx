'use client'

import { Heart, Shield, Sparkles, Swords, Zap } from 'lucide-react'
import type { SkillCategory } from './types'

type SkillCategoryFilterProps = {
  selectedCategory: SkillCategory
  onSelectCategory: (category: SkillCategory) => void
}

export function SkillCategoryFilter({
  selectedCategory,
  onSelectCategory,
}: SkillCategoryFilterProps) {
  const categories: Array<{ id: SkillCategory; label: string; icon: any; color: string }> = [
    { id: 'all', label: 'Všechny', icon: Zap, color: 'text-[#d4a574]' },
    { id: 'combat', label: 'Boj', icon: Swords, color: 'text-[#ff6b6b]' },
    { id: 'defense', label: 'Obrana', icon: Shield, color: 'text-[#69ccf0]' },
    { id: 'magic', label: 'Magie', icon: Sparkles, color: 'text-[#b66bd4]' },
    { id: 'utility', label: 'Užitečné', icon: Heart, color: 'text-[#6fbf6f]' },
  ]

  return (
    <div className="flex w-16 flex-col gap-2 border-r border-[#8b6f47] bg-black/60 p-2 backdrop-blur-sm md:w-20">
      {categories.map((cat) => {
        const Icon = cat.icon
        const isActive = selectedCategory === cat.id

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex aspect-square w-full flex-col items-center justify-center gap-1 rounded border-2 transition-all ${
              isActive
                ? 'border-[#ffd700] bg-[#8b6f47]/30'
                : 'border-[#8b6f47] bg-black/40 hover:border-[#d4a574]'
            }`}
            title={cat.label}
          >
            <Icon className={`h-5 w-5 md:h-6 md:w-6 ${isActive ? 'text-[#ffd700]' : cat.color}`} />
            <span
              className={`hidden text-[10px] md:block ${isActive ? 'text-[#ffd700]' : 'text-[#8b7355]'}`}
            >
              {cat.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
