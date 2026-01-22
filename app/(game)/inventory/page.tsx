import { InventoryClient } from '@/components/features/Inventory'
import { PageTemplate } from '@/components/layout/PageTemplate'
import { getInventoryPageData } from '@/lib/loaders/inventory-loader'
import { Backpack } from 'lucide-react'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function InventoryPage() {
  const data = await getInventoryPageData()

  if (!data) redirect('/onboarding')

  return (
    <PageTemplate
      title="Inventář"
      icon={<Backpack />}
      maxWidth="lg"
      backLink={{ href: '/game', label: 'Zpět do hry' }}
      characterId={data.characterId}
    >
      <InventoryClient initialInventory={data.inventory} />
    </PageTemplate>
  )
}
