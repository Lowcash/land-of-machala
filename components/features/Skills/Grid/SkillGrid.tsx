import Link from 'next/link'

import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

import { DetailRow, RankIndicator, SectionHeader, StatDisplay } from '@/components/ui/display'
import { GameGrid } from '@/components/ui/game-grid'
import { IconBox } from '@/components/ui/icon-box'
import { HStack, VStack } from '@/components/ui/stack'
import { H3, MutedText, P, Span } from '@/components/ui/typography'

import { getIconFromName } from '../Shared/iconMap'
import { getCategoryBg, getCategoryColor, getCategoryTypographyColor } from '../Shared/styles'
import type { MergedSkill, SkillCategory } from '../Shared/types'
import { SkillCategoryFilter } from './SkillCategoryFilter'

interface SkillGridProps {
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
      <VStack position="sticky" z="10" shrink="0" display="hidden-md">
        <SkillCategoryFilter selectedCategory={selectedCategory} />
      </VStack>

      {/* Desktop: Side-by-side layout */}
      <HStack fullWidth fullHeight align="stretch" gap="none" overflow="hidden">
        {/* Left: Category Filter (Desktop only) */}
        <VStack
          display="none-md"
          shrink="0"
          border="game-r"
          bg="black-60"
          _internalClassName="md:w-48 lg:w-56"
        >
          <SkillCategoryFilter selectedCategory={selectedCategory} />
        </VStack>

        {/* Right: Skills Grid */}
        <VStack position="relative" flex="1" overflow="hidden" gap="none">
          <VStack shrink="0" p="md" pb="none" align="center" gap="xs">
            <SectionHeader color="gold">Strom dovedností</SectionHeader>
            <P color="copper">
              Dostupné body: <Span color="gold">{talentPoints}</Span> • Naučeno:{' '}
              <Span color="gold">
                {totalSkillsLearned}/{skills.length}
              </Span>
            </P>
          </VStack>

          <VStack flex="1" overflowY="auto" p="md">
            <GameGrid columns={{ default: 1, sm: 2, lg: 2, xl: 3 }}>
              {filteredSkills.map((skill) => {
                const Icon = getIconFromName(skill.iconName)
                const maxed = skill.currentLevel >= skill.maxRank
                const canUpgrade =
                  skill.unlocked && skill.currentLevel < skill.maxRank && talentPoints >= skill.cost

                const href = {
                  pathname: '/game/skills',
                  query:
                    selectedCategory === 'all'
                      ? { skillId: skill.id }
                      : { category: selectedCategory, skillId: skill.id },
                }

                return (
                  <Link
                    key={skill.id}
                    href={href}
                    className={cn(
                      'group relative rounded-lg border-2 p-4 transition-all hover:scale-[1.02]',
                      selectedSkill === skill.id
                        ? `${getCategoryBg(skill.category)} shadow-lg`
                        : skill.unlocked
                          ? 'border-game-wood bg-black-60 hover:border-game-gold-muted hover:bg-black-70'
                          : 'border-game-wood/50 bg-black-40 hover:border-game-wood hover:bg-black-50'
                    )}
                  >
                    <VStack gap="md">
                      <HStack align="center" gap="sm">
                        <IconBox
                          icon={Icon}
                          isLocked={!skill.unlocked}
                          _internalClassName={cn(
                            'h-12 w-12 shrink-0 transition-colors',
                            getCategoryBg(skill.category)
                          )}
                          iconClassName={getCategoryColor(skill.category)}
                          square
                        />
                        <VStack flex="1" _internalClassName="min-w-0" gap="none">
                          <H3
                            font="fantasy"
                            color={
                              skill.unlocked ? getCategoryTypographyColor(skill.category) : 'copper'
                            }
                            truncate
                          >
                            {skill.name}
                          </H3>
                          <DetailRow
                            label={`Level ${skill.currentLevel}`}
                            value={`Max ${skill.maxRank}`}
                            py="none"
                          />
                        </VStack>
                      </HStack>

                      {/* Rank Indicator */}
                      <RankIndicator
                        current={skill.currentLevel}
                        max={skill.maxRank}
                        variant={skill.category}
                      />

                      <VStack mt="auto">
                        {maxed && skill.unlocked && (
                          <HStack align="center" gap="xs">
                            <Check className="text-game-success h-3 w-3" />
                            <MutedText color="success">Maximální level</MutedText>
                          </HStack>
                        )}

                        {!maxed && skill.unlocked && (
                          <StatDisplay
                            value={`${skill.cost} bodů`}
                            label="Cena"
                            color={canUpgrade ? 'gold' : 'danger'}
                            size="sm"
                          />
                        )}
                      </VStack>
                    </VStack>
                  </Link>
                )
              })}
            </GameGrid>
          </VStack>
        </VStack>
      </HStack>
    </>
  )
}
