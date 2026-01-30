import { Shield, Sword } from 'lucide-react'

import type { CharacterData } from '@/lib/types/game'

import { SplitLayout } from '@/components/layout'

import { ItemDetailView } from './Detail/ItemDetailView'
import { InventoryGrid } from './Grid/InventoryGrid'
import type { InventoryItemUI } from './Shared/types'

interface InventoryDashboardProps {
  character: CharacterData
  initialInventory: InventoryItemUI[]
  maxSlots: number
  searchParams: { itemId?: string }
}

export function InventoryDashboard({
  character,
  initialInventory,
  maxSlots,
  searchParams,
}: InventoryDashboardProps) {
  // Inventory data is passed from the server page component.
  // Updates trigger a revalidatePath/refresh, so this "static" prop is kept in sync.
  const inventory = initialInventory
  const selectedItemId = searchParams?.itemId || null

  const selectedItem = inventory.find((i) => i.id === selectedItemId) || null

  return (
    <SplitLayout
      asideWidth="lg"
      hideMobileAside={!selectedItemId}
      main={
        <div className="flex h-full flex-col">
          <div className="border-game-copper/30 flex shrink-0 items-center justify-between border-b bg-black/40 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sword className="h-4 w-4 text-[#ff6b6b]" />
                <span className="text-sm font-bold text-[#f5e6d3]">
                  {character.stats?.strength || 10}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#69ccf0]" />
                <span className="text-sm font-bold text-[#f5e6d3]">
                  {character.stats?.stamina || 10}
                </span>
              </div>
            </div>
            <div
              className="text-xs font-bold text-[#d4a574]"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {inventory.length} / {maxSlots}
            </div>
          </div>
          <div className="flex-1 p-4">
            <InventoryGrid inventory={inventory} selectedItem={selectedItemId} />
          </div>
        </div>
      }
      aside={<ItemDetailView item={selectedItem} characterLevel={character.level} />}
    />
  )
}
