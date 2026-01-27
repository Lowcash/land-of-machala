import type { LucideIcon } from 'lucide-react'
import { Trophy } from 'lucide-react'

import { GameCard } from '@/components/ui/game-card'
import { GameList } from '@/components/ui/game-list'

interface Achievement {
  id: number
  name: string
  description: string
  icon: LucideIcon
  unlocked: boolean
}

interface AchievementListProps {
  achievements: Achievement[]
}

export function AchievementList({ achievements }: AchievementListProps) {
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <GameCard
      title={`Úspěchy (${unlockedCount}/${achievements.length})`}
      icon={Trophy}
      className="h-full"
    >
      <GameList
        data={achievements}
        keyExtractor={(item) => item.id}
        renderItem={(achievement) => (
          <div
            className={`flex items-start gap-3 rounded border p-3 ${
              achievement.unlocked
                ? 'border-[#ffd700]/30 bg-[#ffd700]/5'
                : 'border-[#8b6f47]/30 bg-black/40 opacity-60'
            }`}
          >
            <div
              className={`mt-0.5 rounded-full p-1 ${achievement.unlocked ? 'bg-[#ffd700]/20' : 'bg-black/40'}`}
            >
              <achievement.icon
                className={`h-4 w-4 ${achievement.unlocked ? 'text-[#ffd700]' : 'text-[#8b7355]'}`}
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <h4
                className={`text-sm font-bold ${achievement.unlocked ? 'text-[#ffd700]' : 'text-[#8b7355]'}`}
              >
                {achievement.name}
              </h4>
              <p className="text-xs text-[#8b7355]">{achievement.description}</p>
            </div>
          </div>
        )}
      />
    </GameCard>
  )
}
