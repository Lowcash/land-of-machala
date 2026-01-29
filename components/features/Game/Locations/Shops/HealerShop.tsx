'use client'

import { Zap } from 'lucide-react'
import { toast } from 'sonner'

import { HEALER_SERVICES } from '@/lib/game/constants/items'
import { ServiceActions } from '@/lib/game/constants/mechanics'
import { HEALER_CONSTANTS } from '@/lib/game/constants/values'

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

    // Lookup service by ID or check Action directly if mapped
    const service = HEALER_SERVICES.find((s) => s.name === item.name)

    if (service?.action === ServiceActions.HEAL) {
      toast.success('Léčitel ti vyčistil rány. Cítíš se lépe.')
    } else if (service?.action === ServiceActions.BUFF_STRENGTH) {
      setActiveBuffs((prev) => [
        ...prev,
        { name: 'Síla Býka', stat: 'strength', val: HEALER_CONSTANTS.BUFF_VALUE },
      ])
      toast.success('Cítíš příliv nové síly!')
    } else if (service?.action === ServiceActions.BUFF_STAMINA) {
      setActiveBuffs((prev) => [
        ...prev,
        { name: 'Výdrž kance', stat: 'stamina', val: HEALER_CONSTANTS.BUFF_VALUE },
      ])
      toast.success('Tvá kůže ztvrdla jako kámen!')
    }
  }

  const tradeItems: TradeItem[] = HEALER_SERVICES.map((s) => ({
    id: s.name, // Using name as ID for now
    name: s.name,
    description: s.description,
    price: s.price,
    icon: s.icon || Zap,
    type: 'Služba',
    canHaggle: false,
    action: s.action,
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
