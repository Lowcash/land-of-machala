import { toast } from 'sonner'

import { performUseItemAction } from '@/lib/actions/combat'
import { getIconFromName } from '@/lib/icons'

import { Button } from '@/components/ui/button'

import type { CharacterItem } from '../Character/Shared/types'

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
      <div className="grid grid-cols-2 gap-2">
        {potions.map((potion) => {
          const Icon = getIconFromName(potion.iconName || 'potion')
          return (
            <Button
              key={potion.id}
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
              variant="outline"
              disabled={isPending}
              size="sm"
              className="border-game-success/50 text-game-success hover:border-game-success gap-2"
            >
              <Icon className="h-4 w-4" />
              <span className="truncate">{potion.name}</span>
            </Button>
          )
        })}
      </div>
      {potions.length === 0 && (
        <div className="text-xs text-[#8b7355] italic">Žádné lektvary k dispozici</div>
      )}
    </div>
  )
}
