import type { ReactNode } from 'react'

import { ArrowLeft, Home, type LucideIcon } from 'lucide-react'

import { type Direction, GAME_ACTION_LABELS, GAME_DIRECTIONS } from '@/lib/constants/game-actions'

import { GameActionPanel } from '@/components/features/Game/Shared/components/GameActionPanel'
import { ActionGrid, ActionItem } from '@/components/ui/Action'
import { Button } from '@/components/ui/button'

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
        <div className="mb-4">
          <Button
            variant="game-primary"
            onClick={onStay ?? onToggleDirections}
            className="w-full gap-2"
          >
            <Home className="h-4 w-4" />
            <span>{GAME_ACTION_LABELS.STAY_IN_TOWN}</span>
          </Button>
        </div>

        <ActionGrid columns={{ default: 1, md: 2 }}>
          {GAME_DIRECTIONS.map((d) => (
            <ActionItem
              key={d.direction}
              label={d.label}
              subLabel={d.subLabel}
              icon={d.icon}
              onClick={() => onMove?.(d.direction)}
              className="relative justify-start p-4! hover:brightness-110"
              layout="col"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${d.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                textShadow: '1px 1px 2px black',
              }}
            />
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
          <Button variant="game-primary" onClick={onBack} className="w-full gap-2">
            <ArrowLeft className="h-4 w-4" />
            {GAME_ACTION_LABELS.BACK_TO_TOWN}
          </Button>
        )
      }
    />
  )
}
