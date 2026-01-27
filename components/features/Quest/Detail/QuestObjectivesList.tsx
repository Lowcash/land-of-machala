import { CheckCircle, Circle } from 'lucide-react'

import { cn } from '@/lib/utils'

interface Objective {
  id: string
  completed: boolean
  description: string
  current: number
  target: number
}

interface QuestObjectivesListProps {
  objectives: Objective[]
}

export function QuestObjectivesList({ objectives }: QuestObjectivesListProps) {
  return (
    <div className="rounded border border-[#8b6f47] bg-black/60 p-4">
      <h3 className="mb-3 text-sm text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>
        Úkoly:
      </h3>
      <div className="space-y-2">
        {objectives.map((objective) => (
          <div key={objective.id} className="flex items-start gap-2">
            {objective.completed ? (
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#6fbf6f]" />
            ) : (
              <Circle className="mt-0.5 h-4 w-4 shrink-0 text-[#8b7355]" />
            )}
            <div className="flex-1">
              <p
                className={cn(
                  'text-sm',
                  objective.completed ? 'text-[#6fbf6f] line-through' : 'text-[#f5e6d3]'
                )}
              >
                {objective.description}
              </p>
              {objective.target > 1 && (
                <p className="mt-0.5 text-xs text-[#8b7355]">
                  Pokrok: {objective.current}/{objective.target}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
