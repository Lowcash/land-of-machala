import { Swords } from 'lucide-react'

import type { ActivityLogEntry, CharacterData, CharacterItem } from '@/lib/types/game'

import { CombatActions } from '@/components/features/Combat/CombatActions'
import { CombatPotions } from '@/components/features/Combat/CombatPotions'
import { CombatStats } from '@/components/features/Combat/CombatStats'
import { GameActivityPanel, GameHeader } from '@/components/features/Game'
import { GameActions } from '@/components/features/Game/Shared/components/GameActions'
import { GenericGameLayout } from '@/components/features/Game/Shared/layouts/GenericGameLayout'

interface CombatLayoutProps {
  character: CharacterData
  playerHp: number
  playerMana: number
  enemy: {
    name: string
    level: number
    maxHp: number
    [key: string]: unknown
  }
  enemyHp: number
  potions: CharacterItem[]
  logs: ActivityLogEntry[]
  isPending: boolean
  onAction: (action: 'attack' | 'defend' | 'special' | 'flee') => void
  footer: React.ReactNode
  effects?: string[]
}

export function CombatLayout({
  character,
  playerHp,
  playerMana,
  enemy,
  enemyHp,
  potions,
  logs,
  isPending,
  onAction,
  footer,
  effects = [],
}: CombatLayoutProps) {
  return (
    <GenericGameLayout
      header={<GameHeader title="Souboj" icon={Swords} />}
      footer={footer}
      backgroundImage="/assets/locations/forest.jpg"
      rightPanel={<GameActivityPanel logs={logs} />}
      topContent={
        <CombatStats
          character={character}
          playerHp={playerHp}
          playerMana={playerMana}
          enemy={enemy}
          enemyHp={enemyHp}
          effects={effects}
        />
      }
      bottomContent={
        <GameActions
          showDirections={false}
          onToggleDirections={() => {}}
          exploration={<CombatPotions potions={potions} isPending={isPending} />}
        >
          <CombatActions onAction={onAction} isPending={isPending} />
        </GameActions>
      }
    />
  )
}
