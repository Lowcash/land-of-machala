import { CheckCircle, Circle } from 'lucide-react'

import { cn } from '@/lib/utils'

import { DetailRow } from '@/components/ui/display'
import { VStack } from '@/components/ui/stack'
import { P, SectionHeading, Span } from '@/components/ui/typography'

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
    <VStack gap="md" py="sm">
      <SectionHeading>Úkoly:</SectionHeading>
      <VStack gap="xs">
        {objectives.map((objective) => {
          const StatusIcon = objective.completed ? CheckCircle : Circle
          return (
            <DetailRow
              key={objective.id}
              labelVariant="p"
              label={
                <VStack align="start" gap="xs">
                  <P
                    color={objective.completed ? 'success' : 'copper'}
                    italic={objective.completed}
                    _internalClassName="flex items-start gap-2"
                  >
                    <StatusIcon
                      className={cn(
                        'mt-0.5 h-4 w-4 shrink-0',
                        objective.completed ? 'text-game-success' : 'text-game-copper-muted'
                      )}
                    />
                    {objective.description}
                  </P>
                </VStack>
              }
              value={
                objective.target > 1 && (
                  <Span color="muted" size="sm">
                    {objective.current}/{objective.target}
                  </Span>
                )
              }
              py="xs"
              border="game-b"
            />
          )
        })}
      </VStack>
    </VStack>
  )
}
