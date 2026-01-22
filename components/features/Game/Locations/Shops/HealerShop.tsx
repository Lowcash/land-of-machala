'use client'

import { Typography } from '@/components/ui/typography'
import { HEALER_SERVICES } from '@/lib/game/data'
import { Zap } from 'lucide-react'
import { toast } from 'sonner'
import { ShopInterface, type ShopItem } from '../../Shared/components/ShopInterface'

interface Buff {
  name: string
  stat: string
  val: number
}

interface HealerShopProps {
  onBack: () => void
  gold: number
  setGold: (gold: number | ((prev: number) => number)) => void
  activeBuffs: Buff[]
  setActiveBuffs: (buffs: Buff[] | ((prev: Buff[]) => Buff[])) => void
}

export function HealerShop({
  onBack,
  gold,
  setGold,
  activeBuffs,
  setActiveBuffs,
}: HealerShopProps) {
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

  const columns = [
    { key: 'name', label: 'Služba' },
    { key: 'description', label: 'Účinek' },
    {
      key: 'price',
      label: 'Cena',
      render: (item: any) => <span className="text-game-gold">{item.price}g</span>,
    },
  ]

  const customContent = (
    <div className="space-y-4">
      {activeBuffs.length > 0 ? (
        <div className="bg-game-gold/10 border-game-gold/20 rounded border p-3">
          <Typography
            variant="small"
            className="text-game-gold mb-2 block tracking-wider uppercase"
          >
            Aktivní požehnání
          </Typography>
          {activeBuffs.map((b, i) => (
            <div key={i} className="text-game-fg flex items-center gap-2 text-xs">
              <Zap className="text-game-gold h-3 w-3" />
              {b.name} (+{b.val} {b.stat})
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="muted" className="italic">
          Léčitel míchá byliny a tiše si brouká. Vůně heřmánku je uklidňující.
        </Typography>
      )}

      <div className="border-game-copper/20 flex flex-col gap-1 border-t pt-2">
        <button className="text-game-copper-muted hover:text-game-gold text-left text-sm transition-colors">
          &gt; Slyšel jsem o problémech s bylinami (Quest)
        </button>
      </div>
    </div>
  )

  return (
    <ShopInterface
      title="Léčitel"
      greeting="Vítej, poutníku. Mé byliny jsou čerstvé a mé ruce pevné. Co tě trápí?"
      gold={gold}
      items={HEALER_SERVICES as unknown as ShopItem[]}
      onBuy={handleBuy}
      onBack={onBack}
      itemColumns={columns}
      customContent={customContent}
    />
  )
}
