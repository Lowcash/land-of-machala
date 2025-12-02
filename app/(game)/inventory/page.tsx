import { show } from '@/app/actions/inventory'
import { InventoryClient } from './_client'

/**
 * Inventory Page - Server Component with SSR Hydration
 * Fetches inventory items on server for instant render
 */
export default async function InventoryPage() {
  const [data] = await show({})
  return <InventoryClient initialData={data} />
}
