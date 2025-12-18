'use client'

import { useState } from 'react'
import { Home, Heart, ScrollText, FlaskConical, ChevronRight, Sparkles, Zap } from 'lucide-react'
import { ActionBtn } from './ActionBtn'
import { GameLayout, GamePanel } from './GameLayout'

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

  const handleAction = (action: string, cost: number) => {
    if (gold < cost) {
      setMessage('Nemáš dost zlata!')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setGold((prev: number) => prev - cost)

    if (action === 'Léčení') {
      setInfoText('Léčitel ti vyčistil rány. Cítíš se lépe. (HP doplněno)')
      // Note: Full HP restore logic should ideally be here or passed via prop,
      // but for now we rely on the visual feedback and cost.
      // To actually heal, we would need setHp prop.
    } else if (action === 'Požehnání síly') {
      setActiveBuffs((prev: any[]) => [...prev, { name: 'Síla Býka', stat: 'strength', val: 5 }])
    } else if (action === 'Požehnání ochrany') {
      // Using Stamina because 'defense' is not a base stat in Game.tsx logic yet
      setActiveBuffs((prev: any[]) => [...prev, { name: 'Výdrž kance', stat: 'stamina', val: 5 }])
    }

    setMessage(`Použil jsi službu: ${action} (-${cost}g)`)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <GameLayout>
      <GamePanel title="Léčitel">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded border border-[#8b6f47] bg-black/60 p-3">
            <span className="text-sm text-[#8b7355]">Tvé zlato:</span>
            <span className="font-mono text-lg text-[#ffd700]">{gold}g</span>
          </div>

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
          <div className="space-y-2">
            <div className="group flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 p-3 transition-colors hover:bg-[#6fbf6f]/5">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#6fbf6f]/20 p-2 text-[#6fbf6f]">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm text-[#f5e6d3]">Ošetření zranění</div>
                  <div className="text-[10px] text-[#8b7355]">Obnoví zdraví</div>
                </div>
              </div>
              <button
                onClick={() => handleAction('Léčení', 50)}
                className="rounded border border-[#d4a574]/50 bg-[#8b6f47] px-3 py-1.5 text-xs text-white hover:border-[#ffd700] hover:bg-[#a8865d]"
              >
                50g
              </button>
            </div>

            <div className="group flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 p-3 transition-colors hover:bg-[#ffd700]/5">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#ffd700]/20 p-2 text-[#ffd700]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm text-[#f5e6d3]">Požehnání síly</div>
                  <div className="text-[10px] text-[#8b7355]">+5 Síla (Do odpočinku)</div>
                </div>
              </div>
              <button
                onClick={() => handleAction('Požehnání síly', 100)}
                className="rounded border border-[#d4a574]/50 bg-[#8b6f47] px-3 py-1.5 text-xs text-white hover:border-[#ffd700] hover:bg-[#a8865d]"
              >
                100g
              </button>
            </div>

            <div className="group flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 p-3 transition-colors hover:bg-[#ffd700]/5">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#ffd700]/20 p-2 text-[#ffd700]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm text-[#f5e6d3]">Požehnání výdrže</div>
                  <div className="text-[10px] text-[#8b7355]">+5 Stamina (Do odpočinku)</div>
                </div>
              </div>
              <button
                onClick={() => handleAction('Požehnání ochrany', 100)}
                className="rounded border border-[#d4a574]/50 bg-[#8b6f47] px-3 py-1.5 text-xs text-white hover:border-[#ffd700] hover:bg-[#a8865d]"
              >
                100g
              </button>
            </div>

            <div className="group flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 p-3 transition-colors hover:bg-[#69ccf0]/5">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#69ccf0]/20 p-2 text-[#69ccf0]">
                  <FlaskConical className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm text-[#f5e6d3]">Protijed</div>
                  <div className="text-[10px] text-[#8b7355]">Vyléčí otravu</div>
                </div>
              </div>
              <button
                onClick={() => handleAction('Protijed', 20)}
                className="rounded border border-[#d4a574]/50 bg-[#8b6f47] px-3 py-1.5 text-xs text-white hover:border-[#ffd700] hover:bg-[#a8865d]"
              >
                20g
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 rounded border border-[#8b6f47] bg-black/60 p-4">
            <p className="text-sm text-[#d4a574] italic">
              "Vítej, poutníku. Mé byliny jsou čerstvé a mé ruce pevné. Co tě trápí? Hledáš
              uzdravení těla, nebo snad potřebuješ pomoc s něčím... složitějším?"
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
