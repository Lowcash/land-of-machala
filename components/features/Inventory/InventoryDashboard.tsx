import { Backpack, Shield, Sword } from 'lucide-react'

import { GameFooter, GameHeader } from '@/components/features/Game'
import { SplitLayout } from '@/components/layout'
import { PageLayout } from '@/components/layout/PageLayout'

import type { CharacterData } from '../Character/Shared/types'
import { InventoryGridWrapper } from './InventoryGridWrapper'
import { ItemDetailWrapper } from './ItemDetailWrapper'
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
  // TODO: Fetch inventory on server?
  // currently initialInventory is passed from page default async func.
  // inventory state was local. If we want optimistic updates etc, we might need a client wrapper for the whole list if mutation happens?
  // But for simple "Dashboard" viewing, current list is fine.
  // The original client had `const [inventory] = useState(initialInventory)`.
  // It was effectively static unless updated?
  const inventory = initialInventory
  const selectedItemId = searchParams?.itemId || null

  const selectedItem = inventory.find((i) => i.id === selectedItemId) || null

  return (
    <PageLayout
      header={<GameHeader title="Inventář" icon={Backpack} />}
      footer={<GameFooter />}
      backgroundImage="/assets/locations/forest.jpg"
      showInfoLog={false}
    >
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
              <InventoryGridWrapper inventory={inventory} selectedItem={selectedItemId} />
            </div>
          </div>
        }
        aside={<ItemDetailWrapper item={selectedItem} characterId={character.id} />}
      />
    </PageLayout>
  )
}
