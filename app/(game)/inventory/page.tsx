import { InventoryPanel } from '@/components/features/Inventory/InventoryPanel'
import { PageTemplate } from '@/components/layout/PageTemplate'
import { Backpack } from 'lucide-react'
import { Suspense } from 'react'

export default function InventoryPage() {
  return (
    <PageTemplate title="Inventář" icon={<Backpack />} maxWidth="lg">
      <Suspense fallback={<div className="p-8 text-center text-[#d4a574]">Načítání...</div>}>
        <InventoryPanel />
      </Suspense>
    </PageTemplate>
  )
}
