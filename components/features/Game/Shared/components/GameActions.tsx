import type { ReactNode } from 'react'

import { ArrowLeft, Home, type LucideIcon } from 'lucide-react'

import { type Direction, GAME_ACTION_LABELS, GAME_DIRECTIONS } from '@/lib/constants/game-actions'

import { GameActionPanel } from '@/components/features/Game/Shared/components/GameActionPanel'
import { ActionGrid, ActionItem } from '@/components/ui/action'
import { Button } from '@/components/ui/button'
import { VStack } from '@/components/ui/stack'

interface GameActionsProps {
  children?: ReactNode
  exploration?: ReactNode
  showDirections: boolean
  onToggleDirections: () => void
  onStay?: () => void
  onMove?: (direction: Direction) => void
  onBack?: () => void
  title?: string
  icon?: LucideIcon
}

export function GameActions({
  children,
  exploration,
  showDirections,
  onToggleDirections,
  onStay,
  onMove,
  onBack,
  title,
  icon: Icon,
}: GameActionsProps) {
  if (showDirections) {
    return (
      <GameActionPanel title={title} icon={Icon}>
        <VStack mb="md" fullWidth>
          <Button
            variant="primary"
            onClick={onStay ?? onToggleDirections}
            fullWidth
            label={GAME_ACTION_LABELS.STAY_IN_TOWN}
            icon={Home}
          />
        </VStack>

        <ActionGrid columns={{ default: 1, md: 2 }}>
          {GAME_DIRECTIONS.map((d) => (
            <VStack
              key={d.direction}
              rounded="md"
              overflow="hidden"
              _internalClassName="relative transition-all hover:brightness-110"
              _internalStyle={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${d.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                textShadow: '1px 1px 2px black',
              }}
            >
              <ActionItem
                label={d.label}
                subLabel={d.subLabel}
                icon={d.icon}
                onClick={() => onMove?.(d.direction)}
                layout="col"
              />
            </VStack>
          ))}
        </ActionGrid>
      </GameActionPanel>
    )
  }

  return (
    <GameActionPanel
      title={title}
      icon={Icon}
      sideContent={exploration}
      mainContent={children}
      footer={
        onBack && (
          <Button
            variant="primary"
            onClick={onBack}
            fullWidth
            label={GAME_ACTION_LABELS.BACK_TO_TOWN}
            icon={ArrowLeft}
          />
        )
      }
    />
  )
}
