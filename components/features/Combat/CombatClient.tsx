'use client'

import { Swords } from 'lucide-react'

import { useCombatLogic } from '@/lib/hooks/game/useCombatLogic'
import type { CharacterData, CharacterItem } from '@/lib/types/game'

import { CombatActions } from '@/components/features/Combat/CombatActions'
import { CombatPotions } from '@/components/features/Combat/CombatPotions'
import { CombatStats } from '@/components/features/Combat/CombatStats'
import { GameActivityPanel, GameFooter, GameHeader } from '@/components/features/Game'
import { GameActions } from '@/components/features/Game/Shared/components/GameActions'
import { PageLayout } from '@/components/layout/PageLayout'

interface CombatClientProps {
  character: CharacterData & {
    combatPlayerHp?: number
    combatEnemyHp?: number
    combatEnemyId?: string
    currentEnemy?: {
      name: string
      level: number
      maxHp: number
      [key: string]: unknown
    }
  }
  inventory: CharacterItem[]
}

export function CombatClient({ character, inventory: initialInventory }: CombatClientProps) {
  const { playerHp, playerMana, enemyHp, enemy, logs, potions, isPending, handleAction } =
    useCombatLogic({ character, initialInventory })

  return (
    <PageLayout
      header={<GameHeader title="Souboj" icon={Swords} />}
      footer={<GameFooter />}
      backgroundImage="/assets/locations/forest.jpg"
      rightPanel={
        <GameActivityPanel
          logs={logs}
          className="mx-3 h-[140px] shrink-0 rounded border border-[#d4a574]/50 bg-black/60 p-4 backdrop-blur-sm"
        />
      }
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <CombatStats
          character={character}
          playerHp={playerHp}
          playerMana={playerMana}
          enemy={enemy}
          enemyHp={enemyHp}
        />

        <div className="relative min-h-0 flex-1 px-3 pb-3">
          <GameActions
            showDirections={false}
            onToggleDirections={() => {}}
            exploration={<CombatPotions potions={potions} isPending={isPending} />}
          >
            <CombatActions onAction={handleAction} isPending={isPending} />
          </GameActions>
        </div>
      </div>
    </PageLayout>
  )
}
