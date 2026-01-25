import { GameFooter, GameHeader } from '@/components/features/Game'
import { InventoryClient } from '@/components/features/Inventory'
import { PageLayout } from '@/components/layout/PageLayout'
import { getInventoryPageData } from '@/lib/loaders/inventory-loader'
import { Backpack } from 'lucide-react'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function InventoryPage() {
  const data = await getInventoryPageData()

  if (!data) redirect('/onboarding')

  return (
    <PageLayout
      header={
        <GameHeader
          title="Inventář"
          icon={Backpack}
          backLink={{ href: '/game', label: 'Zpět do hry' }}
        />
      }
      footer={<GameFooter />}
      maxWidth="lg"
    >
      <InventoryClient character={data.character} initialInventory={data.inventory} maxSlots={20} />
    </PageLayout>
  )
}
