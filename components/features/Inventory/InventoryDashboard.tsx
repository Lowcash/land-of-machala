import { Shield, Sword } from 'lucide-react'

import type { CharacterData } from '@/lib/types/game'

import { SplitLayout } from '@/components/layout'
import { StatDisplay } from '@/components/ui/display'
import { InfoBar } from '@/components/ui/info-bar'
import { HStack, VStack } from '@/components/ui/stack'
import { Caption } from '@/components/ui/typography'

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
        <VStack fullHeight gap="none" fullWidth>
          <InfoBar>
            <HStack gap="md">
              <StatDisplay
                icon={Sword}
                value={character.stats?.strength || 10}
                color="danger"
                size="sm"
              />
              <StatDisplay
                icon={Shield}
                value={character.stats?.stamina || 10}
                color="cold"
                size="sm"
              />
            </HStack>
            <Caption font="fantasy" color="copper" bold>
              {inventory.length} / {maxSlots}
            </Caption>
          </InfoBar>
          <VStack flex="1" p="md" fullWidth>
            <InventoryGrid inventory={inventory} selectedItem={selectedItemId} />
          </VStack>
        </VStack>
      }
      aside={<ItemDetailView item={selectedItem} characterLevel={character.level} />}
    />
  )
}
