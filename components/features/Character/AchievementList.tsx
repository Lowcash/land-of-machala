'use client'

import { Trophy } from 'lucide-react'

// TODO: Move to types if shared
interface Achievement {
    id: number
    name: string
    description: string
    icon: any
    unlocked: boolean
}

interface AchievementListProps {
    achievements: Achievement[]
}

export function AchievementList({ achievements }: AchievementListProps) {
    return (
        <div className="flex flex-col h-full rounded-lg border-2 border-[#d4a574] bg-linear-to-br from-black/80 to-black/60 shadow-lg p-4">
            <h3
                className="mb-3 flex items-center gap-2 text-base text-[#d4a574]"
                style={{ fontFamily: 'var(--font-fantasy)' }}
            >
                <Trophy className="h-4 w-4" />
                Úspěchy ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
            </h3>
            <div className="space-y-2 overflow-y-auto pr-2 scrollbar-custom max-h-[300px]">
                {achievements.map((achievement) => (
                    <div
                        key={achievement.id}
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
                ))}
            </div>
        </div>
    )
}
