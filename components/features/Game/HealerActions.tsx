'use client'

import { useState } from 'react'
import { Home, Heart, ScrollText, FlaskConical, ChevronRight, Sparkles, Zap } from 'lucide-react'
import { ActionBtn } from './ActionBtn'
import { GameLayout, GamePanel } from './GameLayout'
import { ServiceTable } from '@/components/ui/ServiceTable'

interface HealerActionsProps {
  onBack: () => void
  gold: number
  setGold: (gold: number | ((prev: number) => number)) => void
  activeBuffs: any[]
  setActiveBuffs: (buffs: any) => void
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
  const [mode, setMode] = useState<'services' | 'talk'>('services')
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

  const handleService = (service: any) => {
    if (gold < service.price) {
      setMessage('Nemáš dost zlata!')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setGold((prev: number) => prev - service.price)

    if (service.action === 'Léčení') {
      setInfoText('Léčitel ti vyčistil rány. Cítíš se lépe. (HP doplněno)')
    } else if (service.action === 'Požehnání síly') {
      setActiveBuffs((prev: any[]) => [...prev, { name: 'Síla Býka', stat: 'strength', val: 5 }])
    } else if (service.action === 'Požehnání ochrany') {
      setActiveBuffs((prev: any[]) => [...prev, { name: 'Výdrž kance', stat: 'stamina', val: 5 }])
    }

    setMessage(`Použil jsi službu: ${service.action} (-${service.price}g)`)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <GameLayout>
      <GamePanel title="Léčitel">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <ActionBtn onClick={onBack} icon={Home}>
              <span>Vrátit se do města</span>
            </ActionBtn>
            <div className="mt-2 space-y-1.5 border-t border-[#8b6f47]/30 pt-2">
              <ActionBtn
                onClick={() => setMode('services')}
                icon={Heart}
                className={mode === 'services' ? 'border-[#ffd700] bg-[#ffd700]/10' : ''}
              >
                <span className="flex w-full items-center justify-between">
                  <span>Služby a lektvary</span>
                  <ChevronRight className="h-3.5 w-3.5 text-[#8b7355]" />
                </span>
              </ActionBtn>
              <ActionBtn
                onClick={() => setMode('talk')}
                icon={ScrollText}
                className={mode === 'talk' ? 'border-[#ffd700] bg-[#ffd700]/10' : ''}
              >
                <span className="flex w-full items-center justify-between">
                  <span>Mluvit s léčitelem</span>
                  <ChevronRight className="h-3.5 w-3.5 text-[#8b7355]" />
                </span>
              </ActionBtn>
            </div>
          </div>
        </div>
      </GamePanel>

      <GamePanel title={mode === 'services' ? 'Nabídka služeb' : 'Rozhovor'}>
        {message && (
          <div className="mb-3 flex items-center gap-2 rounded border border-[#6fbf6f] bg-[#6fbf6f]/20 p-2 text-xs text-[#6fbf6f]">
            <Sparkles className="h-4 w-4" />
            {message}
          </div>
        )}

        {activeBuffs.length > 0 && (
          <div className="mb-3 rounded border border-[#ffd700]/30 bg-[#ffd700]/10 p-2">
            <div className="mb-1 text-[10px] tracking-wide text-[#ffd700] uppercase">
              Aktivní požehnání
            </div>
            {activeBuffs.map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-[#f5e6d3]">
                <Zap className="h-3 w-3 text-[#ffd700]" />
                {b.name} (+{b.val} {b.stat})
              </div>
            ))}
          </div>
        )}

        {mode === 'services' ? (
          <ServiceTable
            items={services}
            mode="cards"
            columns={[
              { key: 'name', label: 'Název' },
              {
                key: 'description',
                label: 'Popis',
                render: (item) => (
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
                disabled: (item) => gold < item.price,
              },
            ]}
            rowIcon={(item) => {
              const Icon = item.icon
              return <Icon className={`h-4 w-4 ${item.iconColor}`} />
            }}
            emptyMessage="Žádné služby k dispozici"
          />
        ) : (
          <div className="space-y-4 rounded border border-[#8b6f47] bg-black/60 p-4">
            <p className="text-sm text-[#d4a574] italic">
              &quot;Vítej, poutníku. Mé byliny jsou čerstvé a mé ruce pevné. Co tě trápí? Hledáš
              uzdravení těla, nebo snad potřebuješ pomoc s něčím... složitějším?&quot;
            </p>
            <div className="space-y-2">
              <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
                &gt; Slyšel jsem o problémech s bylinami (Quest)
              </button>
              <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
                &gt; Kde najdu vzácné ingredience?
              </button>
              <button className="w-full border-b border-[#8b6f47]/30 p-2 text-left text-xs text-[#8b7355] transition-colors hover:bg-white/5 hover:text-[#ffd700]">
                &gt; Potřebuji jen ošetřit (Zpět k službám)
              </button>
            </div>
          </div>
        )}
      </GamePanel>
    </GameLayout>
  )
}
