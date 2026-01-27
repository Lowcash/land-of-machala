'use client'

import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { getIconFromName, getRarityBorder, getRarityColor } from '../Shared/inventoryUtils'
import type { InventoryItemUI } from '../Shared/types'

interface ItemDetailViewProps {
  item: InventoryItemUI | null
  onClose: () => void
  characterId: string
  isPending?: boolean
  onUse?: (id: string) => void
  onEquip?: (id: string) => void
  onUnequip?: (id: string) => void
}

export function ItemDetailView({
  item,
  onClose,
  isPending = false,
  onUse = () => {},
  onEquip = () => {},
  onUnequip = () => {},
}: ItemDetailViewProps) {
  if (!item) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-[#8b7355] italic">
        Vyber si předmět pro zobrazení detailů...
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between border-b border-[#8b6f47]/30 pb-2">
        <h2
          className="text-xl font-bold text-[#ffd700]"
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          {item.name}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-[#8b7355] hover:text-[#d4a574]"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pr-2">
        <div className="text-center">
          <div
            className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 bg-black/40 ${getRarityBorder(
              item.rarity
            )} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
          >
            {(() => {
              const Icon = getIconFromName(item.iconName)
              return <Icon className={`h-10 w-10 ${getRarityColor(item.rarity)}`} />
            })()}
          </div>
          <p className="text-xs tracking-widest text-[#8b7355] uppercase">{item.type}</p>
        </div>

        {/* Stats */}
        <div className="space-y-2 rounded border border-[#8b6f47]/30 bg-black/40 p-4">
          <div className="grid gap-2">
            <StatRow label="Útok" value={item.attack} />
            <StatRow label="Obrana" value={item.defense} />
            <StatRow label="Magie" value={item.magic} />
            <StatRow label="Rychlost" value={item.speed} />
            <StatRow label="Léčení" value={item.healing} />
            <StatRow label="Mana" value={item.mana} />
          </div>
          <div className="border-t border-[#8b6f47]/50 pt-2 text-center text-xs leading-relaxed text-[#8b7355] italic">
            &quot;{item.description || 'Tajemný předmět bez popisu.'}&quot;
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 grid gap-2 border-t border-[#8b6f47]/30 pt-4">
        {item.type === 'consumable' ? (
          <Button
            onClick={() => onUse(item.id)}
            disabled={isPending}
            variant="game-primary"
            className="w-full"
          >
            Použít předmět
          </Button>
        ) : (
          <Button
            onClick={() => (item.equipped ? onUnequip(item.id) : onEquip(item.id))}
            disabled={isPending}
            variant={item.equipped ? 'game-danger' : 'game-primary'}
            className="w-full"
          >
            {item.equipped ? 'Sundat výbavu' : 'Nasadit výbavu'}
          </Button>
        )}
      </div>
    </div>
  )
}

function StatRow({ label, value }: { label: string; value?: number }) {
  if (value == null || value <= 0) return null
  return (
    <div className="flex justify-between text-[11px]">
      <span className="text-[#8b7355]">{label}:</span>
      <span className="font-bold text-[#d4a574]">+{value}</span>
    </div>
  )
}
