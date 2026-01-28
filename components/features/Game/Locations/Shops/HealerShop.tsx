'use client'

import { Zap } from 'lucide-react'
import { toast } from 'sonner'

import { HEALER_SERVICES } from '@/lib/game/constants/items'

import { type ShopItem } from '../../Shared/components/ShopInterface'
import { type TradeItem, TradePanel } from '../../Shared/components/TradePanel'

interface Buff {
  name: string
  stat: string
  val: number
}

interface HealerShopProps {
  gold: number
  setGold: (gold: number | ((prev: number) => number)) => void
  activeBuffs: Buff[]
  setActiveBuffs: (buffs: Buff[] | ((prev: Buff[]) => Buff[])) => void
}

export function HealerShop({ gold, setGold, activeBuffs, setActiveBuffs }: HealerShopProps) {
  const handleBuy = (item: TradeItem) => {
    if (gold < item.price) {
      toast.error('Nemáš dost zlata!')
      return
    }

    setGold((prev) => prev - item.price)

    // Note: Mapping back from TradeItem to logic.
    // Ideally items should have an ID or key to identify action.
    // HEALER_SERVICES has 'action' property. We can find it by name or use extended interface.
    // For now, I'll use name matching or just assume the TradeItem was created from the service.

    // Let's look up the service
    const service = (HEALER_SERVICES as unknown as ShopItem[]).find((s) => s.name === item.name)

    if (service?.action === 'Léčení') {
      toast.success('Léčitel ti vyčistil rány. Cítíš se lépe.')
    } else if (service?.action === 'Požehnání síly') {
      setActiveBuffs((prev) => [...prev, { name: 'Síla Býka', stat: 'strength', val: 5 }])
      toast.success('Cítíš příliv nové síly!')
    } else if (service?.action === 'Požehnání ochrany') {
      setActiveBuffs((prev) => [...prev, { name: 'Výdrž kance', stat: 'stamina', val: 5 }])
      toast.success('Tvá kůže ztvrdla jako kámen!')
    }
  }

  const tradeItems: TradeItem[] = (HEALER_SERVICES as unknown as ShopItem[]).map((s) => ({
    id: s.name, // Using name as ID
    name: s.name,
    description: s.description,
    price: s.price,
    icon: s.icon || Zap,
    type: 'Služba',
    canHaggle: false,
  }))

  const activeBuffsContent = activeBuffs.length > 0 && (
    <div className="rounded border border-[#ffd700]/20 bg-[#ffd700]/5 p-2">
      <div className="mb-1 text-[10px] font-bold text-[#ffd700] uppercase">Aktivní požehnání</div>
      {activeBuffs.map((b, i) => (
        <div key={i} className="flex items-center gap-2 text-[10px] text-[#f5e6d3]">
          <Zap className="h-3 w-3 text-[#ffd700]" />
          {b.name} (+{b.val} {b.stat})
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="mb-2 text-center text-sm text-[#8b7355] italic">
        &quot;Tvé rány se zahojí, tvá duše najde klid. Moje byliny jsou ti k službám.&quot;
      </div>

      {activeBuffsContent}

      <TradePanel
        items={tradeItems}
        onAction={handleBuy}
        actionLabel="Koupit"
        emptyMessage="Léčitel nic nenabízí."
      />
    </div>
  )
}
