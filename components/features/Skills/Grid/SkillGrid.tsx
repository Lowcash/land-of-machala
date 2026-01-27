import Link from 'next/link'

import { Check, Lock } from 'lucide-react'

import { cn } from '@/lib/utils'

import { GameGrid } from '@/components/ui/game-grid'

import { getIconFromName } from '../Shared/iconMap'
import { getCategoryBg, getCategoryColor } from '../Shared/styles'
import type { MergedSkill, SkillCategory } from '../Shared/types'
import { SkillCategoryFilter } from './SkillCategoryFilter'

type SkillGridProps = {
  skills: MergedSkill[]
  talentPoints: number
  selectedCategory: SkillCategory
  selectedSkill: string | null
}

export function SkillGrid({
  skills,
  talentPoints,
  selectedCategory,
  selectedSkill,
}: SkillGridProps) {
  const filteredSkills =
    selectedCategory === 'all' ? skills : skills.filter((s) => s.category === selectedCategory)

  const totalSkillsLearned = skills.filter((s) => s.currentLevel > 0).length

  return (
    <>
      {/* Mobile: Sticky Category Filter */}
      <div className="sticky z-10 shrink-0 md:hidden">
        <SkillCategoryFilter selectedCategory={selectedCategory} />
      </div>

      {/* Desktop: Side-by-side layout */}
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* Left: Category Filter (Desktop only) */}
        <div className="hidden shrink-0 border-r border-[#8b6f47] bg-black/60 md:block md:w-48 lg:w-56">
          <SkillCategoryFilter selectedCategory={selectedCategory} />
        </div>

        {/* Right: Skills Grid */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <div className="shrink-0 p-4 pb-0 text-center">
            <h2
              className="mb-1 text-2xl text-[#ffd700]"
              style={{ fontFamily: 'var(--font-medieval)' }}
            >
              Strom dovedností
            </h2>
            <p className="text-sm text-[#d4a574]">
              Dostupné body: <span className="text-[#ffd700]">{talentPoints}</span> • Naučeno:{' '}
              <span className="text-[#ffd700]">
                {totalSkillsLearned}/{skills.length}
              </span>
            </p>
          </div>

          <GameGrid columns={{ default: 1, sm: 2, lg: 2, xl: 3 }}>
            {filteredSkills.map((skill) => {
              const Icon = getIconFromName(skill.iconName)
              const maxed = skill.currentLevel >= skill.maxRank
              const canUpgrade =
                skill.unlocked && skill.currentLevel < skill.maxRank && talentPoints >= skill.cost

              const href =
                selectedCategory === 'all'
                  ? `?skillId=${skill.id}`
                  : `?category=${selectedCategory}&skillId=${skill.id}`

              return (
                <Link
                  key={skill.id}
                  href={href as any}
                  className={cn(
                    'flex h-auto min-h-[80px] w-full flex-col items-start rounded-lg border-2 p-4 text-left transition-all sm:min-h-0',
                    selectedSkill === skill.id
                      ? `${getCategoryBg(skill.category)} scale-105 shadow-lg`
                      : skill.unlocked
                        ? 'border-[#8b6f47] bg-black/60 hover:border-[#d4a574] hover:bg-black/70'
                        : 'border-[#8b6f47]/50 bg-black/40 hover:border-[#8b6f47] hover:bg-black/50'
                  )}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className={`h-14 w-14 rounded-lg ${getCategoryBg(skill.category)} flex shrink-0 items-center justify-center`}
                    >
                      {skill.unlocked ? (
                        <Icon className={`h-7 w-7 ${getCategoryColor(skill.category)}`} />
                      ) : (
                        <Lock className="h-7 w-7 text-[#d4a574]" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`text-base leading-tight ${skill.unlocked ? getCategoryColor(skill.category) : 'text-[#d4a574]'}`}
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                        title={skill.name}
                      >
                        {skill.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#8b7355]">
                        Level {skill.currentLevel}/{skill.maxRank}
                      </p>
                    </div>
                  </div>

                  {/* Level dots */}
                  <div className="mb-2 flex gap-1">
                    {Array.from({ length: skill.maxRank }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full ${
                          i < skill.currentLevel
                            ? `bg-linear-to-r ${
                                skill.category === 'combat'
                                  ? 'from-[#ff6b6b] to-[#ff8b8b]'
                                  : skill.category === 'defense'
                                    ? 'from-[#69ccf0] to-[#89dcff]'
                                    : skill.category === 'magic'
                                      ? 'from-[#b66bd4] to-[#d68bf4]'
                                      : 'from-[#6fbf6f] to-[#8fdf8f]'
                              }`
                            : 'bg-black/60'
                        }`}
                      />
                    ))}
                  </div>

                  {maxed && skill.unlocked && (
                    <div className="flex items-center gap-1 text-[10px] text-[#6fbf6f]">
                      <Check className="h-3 w-3" />
                      <span>Maximální level</span>
                    </div>
                  )}

                  {!maxed && skill.unlocked && (
                    <div className="text-[10px] text-[#8b7355]">
                      Cena:{' '}
                      <span className={canUpgrade ? 'text-[#ffd700]' : 'text-[#ff6b6b]'}>
                        {skill.cost} bodů
                      </span>
                    </div>
                  )}
                </Link>
              )
            })}
          </GameGrid>
        </div>
      </div>
    </>
  )
}
