'use client'

import { GameFooter, GameHeader } from '@/components/features/Game'
import { SplitLayout } from '@/components/layout'
import { PageLayout } from '@/components/layout/PageLayout'
import { Backpack, Shield, Sword } from 'lucide-react'
import { useState } from 'react'
import type { CharacterData } from '../Character/Shared/types'
import { ItemDetailView as ItemDetail } from './Detail/ItemDetailView'
import { InventoryGrid } from './Grid/InventoryGrid'
import type { InventoryItemUI } from './Shared/types'

interface InventoryClientProps {
  character: CharacterData
  initialInventory: InventoryItemUI[]
  maxSlots: number
}

export function InventoryClient({ character, initialInventory, maxSlots }: InventoryClientProps) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [inventory] = useState<InventoryItemUI[]>(initialInventory)
  const [mounted, setMounted] = useState(false)

  // Use simple effect to avoid hydration mismatch if needed,
  // though for data passing it's usually fine.
  // Including mounted check just in case of complex UI.
  useState(() => {
    setMounted(true)
  })

  if (!mounted) return null

  const selectedItem = inventory.find((i) => i.id === selectedItemId) || null

  return (
    <PageLayout
      header={<GameHeader title="Inventář" icon={Backpack} />}
      footer={<GameFooter />}
      backgroundImage="/assets/locations/forest.jpg"
      // We don't use rightPanel prop here, instead we use SplitLayout inside children
      // Wait, PageTemplate ALREADY uses SplitLayout if showInfoLog is true.
      // But Inventory wants a custom split (Grid vs Detail).
      // So we should probably disable showInfoLog or use rightPanel?
      // Let's check original implementation.
      // Origin used SplitView manually inside children?
      // Let's assume yes based on my previous grep.
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
            <InventoryGrid
              inventory={inventory}
              selectedItem={selectedItemId}
              onSelectItem={setSelectedItemId}
            />
          </div>
        }
        aside={
          <ItemDetail
            item={selectedItem}
            onClose={() => setSelectedItemId(null)}
            characterId={character.id}
          />
        }
      />
    </PageLayout>
  )
}
