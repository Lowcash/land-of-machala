import type { LucideIcon } from 'lucide-react'
import { Eye, Hammer, Shield, Sparkles, Swords } from 'lucide-react'

import { CategoryFilter } from '@/components/ui/category-filter'

import { getCategoryColor } from '../Shared/styles'
import type { SkillCategory } from '../Shared/types'

type SkillCategoryFilterProps = {
  selectedCategory: SkillCategory
}

export function SkillCategoryFilter({ selectedCategory }: SkillCategoryFilterProps) {
  const categories: Array<{ id: SkillCategory; label: string; icon: LucideIcon }> = [
    { id: 'combat', label: 'Boj', icon: Swords },
    { id: 'defense', label: 'Obrana', icon: Shield },
    { id: 'magic', label: 'Magie', icon: Sparkles },
    { id: 'stealth', label: 'Stealth', icon: Eye },
    { id: 'crafting', label: 'Řemeslo', icon: Hammer },
  ]

  return (
    <CategoryFilter
      categories={categories}
      selectedCategory={selectedCategory}
      getCategoryColor={getCategoryColor}
    />
  )
}
