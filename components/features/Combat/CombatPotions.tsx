'use client'

import { toast } from 'sonner'

import { performUseItemAction } from '@/lib/actions/combat'
import { getIconFromName } from '@/lib/icons'
import type { CharacterItem } from '@/lib/types/game'

import { ActionGrid, ActionItem } from '@/components/ui/Action'

interface CombatPotionsProps {
  potions: CharacterItem[]
  isPending: boolean
}

export function CombatPotions({ potions, isPending }: CombatPotionsProps) {
  // 1. Hooks - None currently

  // 2. Navigation State - None currently

  // 3. Handlers
  const handleUsePotion = async (id: string, name: string) => {
    const [, err] = await performUseItemAction({
      itemId: id,
    })

    if (!err) {
      toast.success(`${name} použit`)
    } else {
      toast.error(err.message)
    }
  }

  // 4. Sub-components (Render helpers)
  const PotionItem = ({ potion }: { potion: CharacterItem }) => {
    const Icon = getIconFromName(potion.iconName || 'potion')
    return (
      <ActionItem
        key={potion.id}
        label={potion.name}
        icon={Icon}
        onClick={() => handleUsePotion(potion.id, potion.name)}
        variant="default"
        disabled={isPending}
        className="border-game-success/50 text-game-success hover:border-game-success gap-2"
        layout="row"
      />
    )
  }

  return (
    <div className="space-y-1">
      <div className="mb-1 text-xs font-bold tracking-wider text-[#8b7355] uppercase">
        Lektvary ({potions.length})
      </div>
      <ActionGrid columns={{ default: 2 }}>
        {potions.map((potion) => (
          <PotionItem key={potion.id} potion={potion} />
        ))}
      </ActionGrid>
      {potions.length === 0 && (
        <div className="text-xs text-[#8b7355] italic">Žádné lektvary k dispozici</div>
      )}
    </div>
  )
}
