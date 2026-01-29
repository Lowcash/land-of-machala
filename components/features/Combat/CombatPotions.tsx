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
  return (
    <div className="space-y-1">
      <div className="mb-1 text-xs font-bold tracking-wider text-[#8b7355] uppercase">
        Lektvary ({potions.length})
      </div>
      <ActionGrid columns={{ default: 2 }}>
        {potions.map((potion) => {
          const Icon = getIconFromName(potion.iconName || 'potion')
          return (
            <ActionItem
              key={potion.id}
              label={potion.name}
              icon={Icon}
              onClick={async () => {
                const [, err] = await performUseItemAction({
                  itemId: potion.id,
                })
                if (!err) {
                  toast.success('Lektvar použit')
                } else {
                  toast.error(err.message)
                }
              }}
              variant="default"
              disabled={isPending}
              className="border-game-success/50 text-game-success hover:border-game-success gap-2"
              layout="row"
            />
          )
        })}
      </ActionGrid>
      {potions.length === 0 && (
        <div className="text-xs text-[#8b7355] italic">Žádné lektvary k dispozici</div>
      )}
    </div>
  )
}
