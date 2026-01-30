import { useCombatLogic } from '@/lib/hooks/game/useCombatLogic'
import type { CharacterData, CharacterItem } from '@/lib/types/game'

import { CombatLayout } from '@/components/features/Combat/CombatLayout'

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
  footer: React.ReactNode
}

export function CombatClient({
  character,
  inventory: initialInventory,
  footer,
}: CombatClientProps) {
  const { playerHp, playerMana, enemyHp, enemy, logs, potions, isPending, handleAction } =
    useCombatLogic({ character, initialInventory })

  return (
    <CombatLayout
      character={character}
      playerHp={playerHp}
      playerMana={playerMana}
      enemy={enemy}
      enemyHp={enemyHp}
      potions={potions}
      logs={logs}
      isPending={isPending}
      onAction={handleAction}
      footer={footer}
    />
  )
}
