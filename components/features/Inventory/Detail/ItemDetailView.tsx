'use client'

import { getIconFromName, getRarityBorder, getRarityColor } from '../Shared/inventoryUtils'
import type { InventoryItemUI } from '../Shared/types'

interface ItemDetailViewProps {
  item: InventoryItemUI
  isPending: boolean
  onUse: (id: string) => void
  onEquip: (id: string) => void
  onUnequip: (id: string) => void
}

export function ItemDetailView({
  item,
  isPending,
  onUse,
  onEquip,
  onUnequip,
}: ItemDetailViewProps) {
  return (
    <div className="mx-auto max-w-md space-y-6">
      {/* Header */}
      <div className="text-center">
        <div
          className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 bg-black/40 ${getRarityBorder(
            item.rarity
          )} shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
        >
          {(() => {
            const Icon = getIconFromName(item.iconName)
            return <Icon className={`h-12 w-12 ${getRarityColor(item.rarity)}`} />
          })()}
        </div>
        <h2
          className={`text-2xl font-bold ${getRarityColor(item.rarity)}`}
          style={{ fontFamily: 'var(--font-medieval)' }}
        >
          {item.name}
        </h2>
        <p className="text-[#8b7355]">{item.type}</p>
      </div>

      {/* Stats */}
      <div className="space-y-2 rounded border border-[#8b6f47] bg-black/40 p-4">
        <div className="grid gap-2">
          <StatRow label="Útok" value={item.attack} />
          <StatRow label="Obrana" value={item.defense} />
          <StatRow label="Magie" value={item.magic} />
          <StatRow label="Rychlost" value={item.speed} />
          <StatRow label="Léčení" value={item.healing} />
          <StatRow label="Mana" value={item.mana} />
        </div>
        <div className="border-t border-[#8b6f47]/50 pt-2">
          <p className="text-sm text-[#8b7355] italic">&quot;{item.description}&quot;</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid gap-3">
        {item.type === 'consumable' ? (
          <button
            onClick={() => onUse(item.id)}
            disabled={isPending}
            className="w-full rounded border border-[#6fbf6f] bg-[#6fbf6f]/10 px-4 py-2 text-[#6fbf6f] transition-colors hover:bg-[#6fbf6f]/20 disabled:opacity-50"
          >
            Použít
          </button>
        ) : (
          <button
            onClick={() => (item.equipped ? onUnequip(item.id) : onEquip(item.id))}
            disabled={isPending}
            className={`w-full rounded border px-4 py-2 transition-colors disabled:opacity-50 ${
              item.equipped
                ? 'border-[#ff6b6b] bg-[#ff6b6b]/10 text-[#ff6b6b] hover:bg-[#ff6b6b]/20'
                : 'border-[#ffd700] bg-[#ffd700]/10 text-[#ffd700] hover:bg-[#ffd700]/20'
            }`}
          >
            {item.equipped ? 'Sundat' : 'Nasadit'}
          </button>
        )}
      </div>
    </div>
  )
}

function StatRow({ label, value }: { label: string; value?: number }) {
  if (value == null || value <= 0) return null
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[#8b7355]">{label}:</span>
      <span className="text-[#d4a574]">+{value}</span>
    </div>
  )
}
