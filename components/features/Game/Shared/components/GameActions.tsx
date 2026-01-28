'use client'

import type { ReactNode } from 'react'

import {
  ArrowDown,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight,
  ArrowUp,
  Home,
  type LucideIcon,
} from 'lucide-react'

import { GameActionPanel } from '@/components/features/Game/Shared/components/GameActionPanel'
import { ActionGrid, ActionItem } from '@/components/ui/Action'
import { Button } from '@/components/ui/button'

interface GameActionsProps {
  children?: ReactNode
  exploration?: ReactNode
  showDirections: boolean
  onToggleDirections: () => void
  onStay?: () => void
  onMove?: (direction: 'north' | 'south' | 'east' | 'west') => void
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
  const directions = [
    {
      direction: 'north',
      label: 'Sever',
      subLabel: 'Hory, Doly',
      icon: ArrowUp,
      bg: '/assets/locations/mountains-background.jpg',
    },
    {
      direction: 'south',
      label: 'Jih',
      subLabel: 'Pláně, Farmy',
      icon: ArrowDown,
      bg: '/assets/locations/plains-background.jpg',
    },
    {
      direction: 'east',
      label: 'Východ',
      subLabel: 'Poušť, Oáza',
      icon: ArrowRight,
      bg: '/assets/locations/desert-background.jpg',
    },
    {
      direction: 'west',
      label: 'Západ',
      subLabel: 'Temný les',
      icon: ArrowLeftIcon,
      bg: '/assets/locations/forest-background.jpg',
    },
  ] as const

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
            <span>Zůstat ve městě</span>
          </Button>
        </div>

        <ActionGrid columns={{ default: 1, md: 2 }}>
          {directions.map((d) => (
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
            <ArrowLeftIcon className="h-4 w-4" />
            Vrátit se do města
          </Button>
        )
      }
    />
  )
}
