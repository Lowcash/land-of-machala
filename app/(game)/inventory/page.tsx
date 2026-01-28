import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { Backpack } from 'lucide-react'

import { getInventoryPageData } from '@/lib/loaders/inventory-loader'

import { GameFooter, GameHeader } from '@/components/features/Game'
import { Inventory } from '@/components/features/Inventory'
import { PageLayout } from '@/components/layout/PageLayout'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Inventář | Land of Machala',
  description: 'Spravuj své předměty a vybavení.',
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: { itemId?: string }
}) {
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
      <Inventory
        character={data.character}
        initialInventory={data.inventory}
        maxSlots={20}
        searchParams={searchParams}
      />
    </PageLayout>
  )
}
