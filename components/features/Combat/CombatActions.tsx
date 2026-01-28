import { ArrowLeft, Shield, Sparkles, Target, Zap } from 'lucide-react'

import { GameActionPanel } from '@/components/features/Game/Shared/components/GameActionPanel'
import { ActionGrid, ActionItem } from '@/components/ui/Action'

interface CombatActionsProps {
  onAction: (action: 'attack' | 'defend' | 'special' | 'flee') => void
  isPending: boolean
}

export function CombatActions({ onAction, isPending }: CombatActionsProps) {
  const attackContent = (
    <ActionGrid columns={{ default: 1 }}>
      <ActionItem
        label="Rychlý útok"
        subLabel="Základní"
        icon={Zap}
        onClick={() => onAction('attack')}
        disabled={isPending}
        variant="primary"
        layout="row"
      />
      <ActionItem
        label="Silný úder"
        subLabel="Vysoké poškození"
        icon={Target}
        onClick={() => onAction('attack')}
        disabled={isPending}
        variant="danger"
        layout="row"
      />
      <ActionItem
        label="Speciální schopnost"
        subLabel="-Mana"
        icon={Sparkles}
        onClick={() => onAction('special')}
        disabled={isPending}
        variant="secondary"
        className="border-game-magic text-game-magic hover:bg-game-magic/10"
        layout="row"
      />
    </ActionGrid>
  )

  const defenseContent = (
    <ActionGrid columns={{ default: 1, sm: 2 }}>
      <ActionItem
        label="Obrana"
        subLabel="(Sníží poškození)"
        icon={Shield}
        onClick={() => onAction('defend')}
        disabled={isPending}
        variant="secondary"
        layout="row"
      />
      <ActionItem
        label="Útěk"
        icon={ArrowLeft}
        onClick={() => onAction('flee')}
        disabled={isPending}
        variant="ghost"
        className="text-[#8b7355] hover:text-[#d4a574]"
        layout="row"
      />
    </ActionGrid>
  )

  return (
    <GameActionPanel
      sideTitle="Útok"
      mainTitle="Obrana & Taktika"
      sideContent={attackContent}
      mainContent={defenseContent}
    />
  )
}
