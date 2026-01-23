import { InventoryClient } from '@/components/features/Inventory'
import { getInventoryPageData } from '@/lib/loaders/inventory-loader'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function InventoryPage() {
  const data = await getInventoryPageData()

  if (!data) redirect('/onboarding')

  return <InventoryClient initialInventory={data.inventory} />
}
