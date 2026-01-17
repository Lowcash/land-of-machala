'use client'

import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import { ArrowLeft, Check, Lock } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { getIconFromName } from './iconMap'
import { SkillCategoryFilter } from './SkillCategoryFilter'
import type { MergedSkill, SkillCategory } from './types'

type SkillGridProps = {
  skills: MergedSkill[]
  talentPoints: number
  selectedCategory: SkillCategory
  setSelectedCategory: (cat: SkillCategory) => void
  selectedSkill: string | null
  setSelectedSkill: (id: string | null) => void
}

function getCategoryColor(category: SkillCategory) {
  switch (category) {
    case 'combat':
      return 'text-[#ff6b6b]'
    case 'defense':
      return 'text-[#69ccf0]'
    case 'magic':
      return 'text-[#b66bd4]'
    case 'stealth':
      return 'text-[#6fbf6f]'
    case 'crafting':
      return 'text-[#d4a574]'
    default:
      return 'text-[#d4a574]'
  }
}

function getCategoryBg(category: SkillCategory) {
  switch (category) {
    case 'combat':
      return 'bg-[#ff6b6b]/10 border-[#ff6b6b]'
    case 'defense':
      return 'bg-[#69ccf0]/10 border-[#69ccf0]'
    case 'magic':
      return 'bg-[#b66bd4]/10 border-[#b66bd4]'
    case 'stealth':
      return 'bg-[#6fbf6f]/10 border-[#6fbf6f]'
    case 'crafting':
      return 'bg-[#d4a574]/10 border-[#d4a574]'
    default:
      return 'bg-black/40 border-[#8b6f47]'
  }
}

export function SkillGrid({
  skills,
  talentPoints,
  selectedCategory,
  setSelectedCategory,
  selectedSkill,
  setSelectedSkill,
}: SkillGridProps) {
  const filteredSkills =
    selectedCategory === 'all' ? skills : skills.filter((s) => s.category === selectedCategory)

  const totalSkillsLearned = skills.filter((s) => s.currentLevel > 0).length

  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* Sticky Back Navigation */}
      <div className="sticky top-0 z-30 shrink-0 border-b border-[#8b6f47] bg-black/95 px-4 py-3 backdrop-blur-sm">
        <Link
          href="/game"
          className="inline-flex items-center gap-2 text-sm text-[#d4a574] transition-colors hover:text-[#ffd700]"
        >
          <ArrowLeft className="h-4 w-4" />
          Zpět do hry
        </Link>
      </div>

      {/* Mobile: Sticky Category Filter */}
      <div className="sticky top-14.25 z-10 shrink-0 md:hidden">
        <SkillCategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Desktop: Side-by-side layout */}
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* Left: Category Filter (Desktop only) */}
        <div className="hidden shrink-0 border-r border-[#8b6f47] bg-black/60 md:block md:w-48 lg:w-56">
          <SkillCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Right: Skills Grid */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <ScrollIndicator targetRef={scrollRef} position="both" />
          <div ref={scrollRef} className="scrollbar-custom flex-1 overflow-y-auto p-4">
            <div className="mx-auto max-w-7xl">
              <div className="mb-4 text-center">
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

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {filteredSkills.map((skill) => {
                  const Icon = getIconFromName(skill.iconName)
                  const maxed = skill.currentLevel >= skill.maxRank
                  const canUpgrade =
                    skill.unlocked &&
                    skill.currentLevel < skill.maxRank &&
                    talentPoints >= skill.cost

                  return (
                    <button
                      key={skill.id}
                      onClick={() => setSelectedSkill(skill.id)}
                      className={`min-h-touch-target w-full rounded-lg border-2 p-4 text-left transition-all sm:min-h-0 ${
                        selectedSkill === skill.id
                          ? `${getCategoryBg(skill.category)} scale-105 shadow-lg`
                          : skill.unlocked
                            ? 'border-[#8b6f47] bg-black/60 hover:border-[#d4a574] hover:bg-black/70'
                            : 'border-[#8b6f47]/50 bg-black/40 hover:border-[#8b6f47] hover:bg-black/50'
                      }`}
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
                            className={`truncate text-base leading-tight ${skill.unlocked ? getCategoryColor(skill.category) : 'text-[#d4a574]'}`}
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
                                ? `bg-gradient-to-r ${
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
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
