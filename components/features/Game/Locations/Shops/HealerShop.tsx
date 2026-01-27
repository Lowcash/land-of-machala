'use client'

import { Zap } from 'lucide-react'
import { toast } from 'sonner'

import { HEALER_SERVICES } from '@/lib/game/data'

import { LocationLayout } from '../../Shared/components/LocationLayout'
import { ShopInterface, type ShopItem } from '../../Shared/components/ShopInterface'

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
  const handleBuy = (service: ShopItem) => {
    setGold((prev) => prev - service.price)

    if (service.action === 'Léčení') {
      toast.success('Léčitel ti vyčistil rány. Cítíš se lépe.')
    } else if (service.action === 'Požehnání síly') {
      setActiveBuffs((prev) => [...prev, { name: 'Síla Býka', stat: 'strength', val: 5 }])
      toast.success('Cítíš příliv nové síly!')
    } else if (service.action === 'Požehnání ochrany') {
      setActiveBuffs((prev) => [...prev, { name: 'Výdrž kance', stat: 'stamina', val: 5 }])
      toast.success('Tvá kůže ztvrdla jako kámen!')
    }
  }

  return (
    <LocationLayout
      title="Chrám léčení"
      description="Tvé rány se zahojí, tvá duše najde klid. Moje byliny jsou ti k službám."
    >
      <ShopInterface
        gold={gold}
        items={HEALER_SERVICES as unknown as ShopItem[]}
        onBuy={handleBuy}
      />

      {activeBuffs.length > 0 && (
        <div className="rounded border border-[#ffd700]/20 bg-[#ffd700]/5 p-2">
          <div className="mb-1 text-[10px] font-bold text-[#ffd700] uppercase">
            Aktivní požehnání
          </div>
          {activeBuffs.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] text-[#f5e6d3]">
              <Zap className="h-3 w-3 text-[#ffd700]" />
              {b.name} (+{b.val} {b.stat})
            </div>
          ))}
        </div>
      )}
    </LocationLayout>
  )
}
