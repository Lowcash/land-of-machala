import Link from 'next/link'

import { X } from 'lucide-react'

import { ItemType } from '@/lib/types/game'

import { getIconFromName, getRarityBorder, getRarityColor } from '../Shared/inventoryUtils'
import type { InventoryItemUI } from '../Shared/types'
import { InventoryItemActions } from './InventoryItemActions'

interface ItemDetailViewProps {
  item: InventoryItemUI | null
  characterLevel?: number
}

export function ItemDetailView({ item, characterLevel = 1 }: ItemDetailViewProps) {
  // 1. Hooks - None

  // 2. Derived Values
  if (!item) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-[#8b7355] italic">
        Vyber si předmět pro zobrazení detailů...
      </div>
    )
  }

  const isLevelMet = characterLevel >= item.level

  // 4. Sub-components (Render helpers)
  const StatRow = ({ label, value }: { label: string; value?: number }) => {
    if (value == null || value <= 0) return null
    return (
      <div className="flex justify-between text-[11px]">
        <span className="text-[#8b7355]">{label}:</span>
        <span className="font-bold text-[#d4a574]">+{value}</span>
      </div>
    )
  }

  const Icon = getIconFromName(item.iconName)

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between border-b border-[#8b6f47]/30 pb-2">
        <h2
          className="text-xl font-bold text-[#ffd700]"
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          {item.name}
        </h2>
        <Link
          href="?"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#8b7355] transition-colors hover:bg-black/20 hover:text-[#d4a574]"
        >
          <X className="h-5 w-5" />
        </Link>
      </div>

      <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pr-2">
        <div className="text-center">
          <div
            className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 bg-black/40 ${getRarityBorder(
              item.rarity
            )} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
          >
            <Icon className={`h-10 w-10 ${getRarityColor(item.rarity)}`} />
          </div>
          <p className="text-xs tracking-widest text-[#8b7355] uppercase">{item.type}</p>
        </div>

        {/* Requirements */}
        {item.level > 1 && (
          <div
            className={`rounded border px-3 py-2 text-center text-xs font-bold ${
              isLevelMet ? 'border-[#8b6f47]/30 text-[#d4a574]' : 'border-red-900/50 text-red-400'
            }`}
          >
            Požadovaný Level: {item.level} {!isLevelMet && '(Nedostatečný)'}
          </div>
        )}

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
      <div className="mt-4 border-t border-[#8b6f47]/30 pt-4">
        <InventoryItemActions
          itemId={item.id}
          isEquipped={item.equipped}
          isConsumable={item.type === ItemType.CONSUMABLE}
        />
      </div>
    </div>
  )
}
