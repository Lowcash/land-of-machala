'use client'

import { ServiceTable } from '@/components/ui/ServiceTable'
import { FlaskConical, Heart, Sparkles, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ActionsLayout } from './ActionsLayout'

import type { LucideIcon } from 'lucide-react'

interface Buff {
  name: string
  stat: string
  val: number
}

interface Service {
  id: string
  name: string
  description: string
  price: number
  icon: LucideIcon
  iconColor: string
  iconBg: string
  action: string
}

interface HealerActionsProps {
  onBack: () => void
  gold: number
  setGold: (gold: number | ((prev: number) => number)) => void
  activeBuffs: Buff[]
  setActiveBuffs: (buffs: Buff[] | ((prev: Buff[]) => Buff[])) => void
  setInfoText: (text: string) => void
}

export function HealerActions({
  onBack,
  gold,
  setGold,
  activeBuffs,
  setActiveBuffs,
  setInfoText,
}: HealerActionsProps) {
  const [message, setMessage] = useState('')

  const services = [
    {
      id: 'heal',
      name: 'Ošetření zranění',
      description: 'Obnoví zdraví',
      price: 50,
      icon: Heart,
      iconColor: 'text-[#6fbf6f]',
      iconBg: 'bg-[#6fbf6f]/20',
      action: 'Léčení',
    },
    {
      id: 'str-buff',
      name: 'Požehnání síly',
      description: '+5 Síla (Do odpočinku)',
      price: 100,
      icon: Sparkles,
      iconColor: 'text-[#ffd700]',
      iconBg: 'bg-[#ffd700]/20',
      action: 'Požehnání síly',
    },
    {
      id: 'sta-buff',
      name: 'Požehnání výdrže',
      description: '+5 Stamina (Do odpočinku)',
      price: 100,
      icon: Sparkles,
      iconColor: 'text-[#ffd700]',
      iconBg: 'bg-[#ffd700]/20',
      action: 'Požehnání ochrany',
    },
    {
      id: 'antidote',
      name: 'Protijed',
      description: 'Vyléčí otravu',
      price: 20,
      icon: FlaskConical,
      iconColor: 'text-[#69ccf0]',
      iconBg: 'bg-[#69ccf0]/20',
      action: 'Protijed',
    },
  ]

  const handleService = (service: Service) => {
    if (gold < service.price) {
      setMessage('Nemáš dost zlata!')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setGold((prev: number) => prev - service.price)

    if (service.action === 'Léčení') {
      setInfoText('Léčitel ti vyčistil rány. Cítíš se lépe. (HP doplněno)')
    } else if (service.action === 'Požehnání síly') {
      setActiveBuffs((prev) => [...prev, { name: 'Síla Býka', stat: 'strength', val: 5 }])
    } else if (service.action === 'Požehnání ochrany') {
      setActiveBuffs((prev) => [...prev, { name: 'Výdrž kance', stat: 'stamina', val: 5 }])
    }

    setMessage(`Použil jsi službu: ${service.action} (-${service.price}g)`)
    setTimeout(() => setMessage(''), 3000)
  }

  useEffect(() => {
    setInfoText(
      '"Vítej, poutníku. Mé byliny jsou čerstvé a mé ruce pevné. Co tě trápí? Hledáš uzdravení těla, nebo snad potřebuješ pomoc s něčím... složitějším?"'
    )
  }, [setInfoText])

  return (
    <ActionsLayout
      title="Léčitel"
      onBack={onBack}
      showDirections={false}
      onToggleDirections={() => {}}
      exploration={
        <div className="space-y-4">
          <div className="flex items-center gap-2 rounded border border-[#ffd700]/30 bg-[#ffd700]/10 p-3 text-[#ffd700]">
            <span className="text-xs tracking-wider text-[#8b7355] uppercase">Tvé zlato:</span>
            <span className="font-bold">{gold}g</span>
          </div>
          {activeBuffs.length > 0 ? (
            <div className="rounded border border-[#ffd700]/30 bg-[#ffd700]/10 p-2">
              <div className="mb-2 text-[10px] font-bold tracking-wider text-[#ffd700] uppercase">
                Aktivní požehnání
              </div>
              {activeBuffs.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#f5e6d3]">
                  <Zap className="h-3 w-3 text-[#ffd700]" />
                  {b.name} (+{b.val} {b.stat})
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded border border-[#8b6f47] bg-black/60 p-4 text-xs text-[#8b7355] italic">
              Léčitel míchá byliny a tiše si brouká starou melodii. Vůně heřmánku a máty je
              uklidňující.
            </div>
          )}
        </div>
      }
    >
      <div className="space-y-2">
        <div className="mb-4 space-y-1">
          <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
            &gt; Slyšel jsem o problémech s bylinami (Quest)
          </button>
          <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
            &gt; Kde najdu vzácné ingredience?
          </button>
        </div>

        {message && (
          <div className="mb-3 flex items-center gap-2 rounded border border-[#6fbf6f] bg-[#6fbf6f]/20 p-2 text-xs text-[#6fbf6f]">
            <Sparkles className="h-4 w-4" />
            {message}
          </div>
        )}
        <ServiceTable
          items={services}
          mode="cards"
          columns={[
            { key: 'name', label: 'Název' },
            {
              key: 'description',
              label: 'Popis',
              render: (item: Service) => (
                <div>
                  <div>{item.description}</div>
                  <div className="mt-1 text-[#ffd700]">{item.price}g</div>
                </div>
              ),
            },
          ]}
          actions={[
            {
              label: 'Koupit',
              onClick: handleService,
              disabled: (item: Service) => gold < item.price,
            },
          ]}
          rowIcon={(item: Service) => {
            const Icon = item.icon
            return <Icon className={`h-4 w-4 ${item.iconColor}`} />
          }}
          emptyMessage="Žádné služby k dispozici"
        />
      </div>
    </ActionsLayout>
  )
}
