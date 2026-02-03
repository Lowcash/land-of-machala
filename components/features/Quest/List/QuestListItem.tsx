import Link from 'next/link'

import { CheckCircle, Circle, Star } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { MergedQuest, QuestStatus } from '@/components/features/Quest/Shared/types'
import {
  getCategoryBadge,
  getCategoryName,
  getCategoryTypographyColor,
} from '@/components/features/Quest/Shared/utils'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { DetailRow } from '@/components/ui/display'
import { Progress } from '@/components/ui/progress'
import { HStack, VStack } from '@/components/ui/stack'
import { H3, P, Span } from '@/components/ui/typography'

interface QuestListItemProps {
  quest: MergedQuest
  isSelected: boolean
}

function getStatusIcon(status: QuestStatus | null) {
  switch (status) {
    case 'ACTIVE':
      return <Circle className="text-game-gold h-4 w-4" />
    case 'COMPLETED':
      return <CheckCircle className="text-game-success h-4 w-4" />
    case null:
      return <Star className="text-game-info h-4 w-4" />
    case 'FAILED':
      return <Circle className="text-game-danger h-4 w-4" />
    default:
      return null
  }
}

export function QuestListItem({ quest, isSelected }: QuestListItemProps) {
  return (
    <Link
      href={isSelected ? '?' : `?questId=${quest.id}`}
      className={cn(
        'group relative block h-auto w-full p-0 text-left transition-all',
        isSelected ? 'z-10' : ''
      )}
    >
      <VStack border={isSelected ? 'gold' : 'none'} bg={isSelected ? 'black-60' : 'none'}>
        <Card variant="row">
          <Card.Content>
            <VStack gap="sm">
              <HStack align="start" gap="md">
                <VStack pt="xs" shrink="0">
                  {getStatusIcon(quest.characterStatus)}
                </VStack>
                <VStack minW="0" gap="xs" _internalClassName="flex-1">
                  <H3 font="fantasy" color={getCategoryTypographyColor(quest.category)}>
                    {quest.title}
                  </H3>
                  <P color="muted" size="sm" _internalClassName="line-clamp-2">
                    {quest.description}
                  </P>
                </VStack>
              </HStack>

              <DetailRow
                label={
                  <HStack gap="sm">
                    <Badge variant={getCategoryBadge(quest.category)}>
                      {getCategoryName(quest.category)}
                    </Badge>
                    <Span color="muted">Lvl {quest.level}</Span>
                  </HStack>
                }
                value={
                  <Span color="muted">
                    {quest.objectives.filter((o) => o.completed).length}/{quest.objectives.length}
                  </Span>
                }
                py="none"
              />

              <VStack fullWidth>
                <Progress value={quest.progress} />
              </VStack>
            </VStack>
          </Card.Content>
        </Card>
      </VStack>
    </Link>
  )
}
