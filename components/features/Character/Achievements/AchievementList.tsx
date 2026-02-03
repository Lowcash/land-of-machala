'use client'

import { Search } from 'lucide-react'

import {
  ACHIEVEMENT_FILTER_BUTTONS,
  ACHIEVEMENT_SEARCH_PLACEHOLDER,
  getAchievementIcon,
} from '@/lib/constants/achievements'
import type { FilterType } from '@/lib/hooks/game/useAchievementFilters'
import { useAchievementFilters } from '@/lib/hooks/game/useAchievementFilters'
import type { Achievement } from '@/lib/types/game'
import { ItemRarity } from '@/lib/types/game'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { DetailRow } from '@/components/ui/display'
import { GameCard } from '@/components/ui/game-card'
import { GameList } from '@/components/ui/game-list'
import { IconBox } from '@/components/ui/icon-box'
import { Input } from '@/components/ui/input'
import { HStack, VStack } from '@/components/ui/stack'
import { H4, P, Span } from '@/components/ui/typography'

interface AchievementListProps {
  achievements: Achievement[]
}

export function AchievementList({ achievements }: AchievementListProps) {
  // Hooks
  const { filter, search, filteredAchievements, unlockedCount, actions } = useAchievementFilters({
    achievements,
  })

  // Render
  return (
    <GameCard
      title={`Úspěchy (${unlockedCount}/${achievements.length})`}
      icon={getAchievementIcon('trophy')}
    >
      <VStack border="game-b" p="md" fullWidth>
        <VStack gap="md" fullWidth>
          <HStack gap="sm" fullWidth>
            {ACHIEVEMENT_FILTER_BUTTONS.map((button) => (
              <VStack key={button.id} flex="1">
                <Button
                  variant={filter === button.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => actions.setFilter(button.id as FilterType)}
                  label={button.label}
                  fullWidth
                />
              </VStack>
            ))}
          </HStack>
          <VStack position="relative" fullWidth>
            <VStack position="absolute" top="0" left="0" p="sm" interactive="none">
              <Search className="text-muted-foreground h-4 w-4" />
            </VStack>
            <Input
              variant="subtle"
              hasIcon
              placeholder={ACHIEVEMENT_SEARCH_PLACEHOLDER}
              value={search}
              onChange={(e) => actions.setSearch(e.target.value)}
            />
          </VStack>
        </VStack>
      </VStack>

      <VStack flex="1" overflow="hidden" fullWidth>
        <GameList
          data={filteredAchievements}
          keyExtractor={(item) => item.id}
          renderItem={(achievement) => {
            const Icon = getAchievementIcon(achievement.icon)

            return (
              <VStack
                p="md"
                gap="md"
                rounded="lg"
                border={achievement.unlocked ? 'gold' : 'game'}
                bg={achievement.unlocked ? 'black-60' : 'black-40'}
                opacity={achievement.unlocked ? '100' : '60'}
                _internalClassName={cn(
                  achievement.unlocked && 'shadow-[inset_0_0_20px_rgba(255,215,0,0.05)]'
                )}
                fullWidth
              >
                <HStack align="start" gap="md" fullWidth>
                  <IconBox
                    icon={Icon}
                    rarity={achievement.unlocked ? ItemRarity.LEGENDARY : ItemRarity.COMMON}
                    isLocked={!achievement.unlocked}
                    _internalClassName="h-12 w-12 shrink-0"
                    square
                  />
                  <VStack flex="1" gap="xs">
                    <DetailRow
                      label={
                        <H4 color={achievement.unlocked ? 'gold' : 'muted'} bold>
                          {achievement.title}
                        </H4>
                      }
                      value={
                        achievement.unlocked &&
                        achievement.unlockedAt && (
                          <Span color="muted" size="xs">
                            {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </Span>
                        )
                      }
                      py="none"
                    />

                    <P color="muted" size="sm" leading="relaxed">
                      {achievement.description}
                    </P>

                    {/* Progress Bar (if not unlocked) */}
                    {!achievement.unlocked && achievement.maxProgress > 1 && (
                      <VStack gap="xs" fullWidth mt="sm">
                        <VStack
                          h="1.5"
                          fullWidth
                          rounded="full"
                          bg="black"
                          border="game"
                          overflow="hidden"
                        >
                          <VStack
                            fullHeight
                            bg="gold"
                            opacity="60"
                            _internalStyle={{
                              width: `${Math.min(100, ((achievement.progress || 0) / achievement.maxProgress) * 100)}%`,
                            }}
                          />
                        </VStack>
                        <DetailRow
                          label=""
                          value={`${achievement.progress || 0} / ${achievement.maxProgress}`}
                          py="none"
                        />
                      </VStack>
                    )}
                  </VStack>
                </HStack>
              </VStack>
            )
          }}
        />
      </VStack>
    </GameCard>
  )
}
