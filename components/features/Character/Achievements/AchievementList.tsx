'use client'

import { Search } from 'lucide-react'

import {
  ACHIEVEMENT_FILTER_BUTTONS,
  ACHIEVEMENT_SEARCH_PLACEHOLDER,
  getAchievementIcon,
} from '@/lib/constants/achievements'
import { useAchievementFilters } from '@/lib/hooks/game/useAchievementFilters'
import type { Achievement } from '@/lib/types/game'

import { Button } from '@/components/ui/button'
import { GameCard } from '@/components/ui/game-card'
import { GameList } from '@/components/ui/game-list'
import { Input } from '@/components/ui/input'

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
      className="flex h-full flex-col"
    >
      <div className="flex flex-col gap-3 border-b border-[#3e3e3e] p-3">
        <div className="flex gap-2">
          {ACHIEVEMENT_FILTER_BUTTONS.map((button) => (
            <Button
              key={button.id}
              variant={filter === button.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => actions.setFilter(button.id)}
              className="flex-1"
            >
              {button.label}
            </Button>
          ))}
        </div>
        <div className="relative">
          <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
          <Input
            placeholder={ACHIEVEMENT_SEARCH_PLACEHOLDER}
            value={search}
            onChange={(e) => actions.setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <GameList
          data={filteredAchievements}
          keyExtractor={(item) => item.id}
          renderItem={(achievement) => {
            const IconComponent = getAchievementIcon(achievement.icon)

            return (
              <div
                className={`flex items-start gap-3 rounded border p-3 transition-colors ${
                  achievement.unlocked
                    ? 'border-[#ffd700]/30 bg-[#ffd700]/5'
                    : 'border-[#8b6f47]/30 bg-black/40 opacity-60 grayscale'
                }`}
              >
                <div
                  className={`mt-0.5 flex items-center justify-center rounded-full p-2 ${achievement.unlocked ? 'bg-[#ffd700]/20' : 'bg-black/40'}`}
                >
                  <IconComponent
                    className={`h-5 w-5 ${achievement.unlocked ? 'text-[#ffd700]' : 'text-[#8b7355]'}`}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <h4
                      className={`text-sm font-bold ${achievement.unlocked ? 'text-[#ffd700]' : 'text-[#8b7355]'}`}
                    >
                      {achievement.title}
                    </h4>
                    {achievement.unlocked && achievement.unlockedAt && (
                      <span className="text-muted-foreground/60 ml-2 text-[10px] whitespace-nowrap">
                        {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-[#8b7355]">{achievement.description}</p>

                  {/* Progress Bar (if not unlocked) */}
                  {!achievement.unlocked && achievement.maxProgress > 1 && (
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/40">
                      <div
                        className="h-full bg-[#8b7355]"
                        style={{
                          width: `${Math.min(100, ((achievement.progress || 0) / achievement.maxProgress) * 100)}%`,
                        }}
                      />
                    </div>
                  )}
                  {!achievement.unlocked && achievement.maxProgress > 1 && (
                    <p className="text-muted-foreground mt-0.5 text-right text-[10px]">
                      {achievement.progress || 0} / {achievement.maxProgress}
                    </p>
                  )}
                </div>
              </div>
            )
          }}
        />
      </div>
    </GameCard>
  )
}
