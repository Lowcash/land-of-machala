'use client'

import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import { ChevronRight, Coins, Home, Store } from 'lucide-react'
import { useRef, useState } from 'react'
import { ActionBtn } from './ActionBtn'
import { GameLayout, GamePanel } from './GameLayout'

interface ArmoryActionsProps {
  onBack: () => void
}

export function ArmoryActions({ onBack }: ArmoryActionsProps) {
  const [selectedAction, setSelectedAction] = useState<'buy' | 'sell'>('buy')
  const tableScrollRef = useRef<HTMLDivElement>(null)

  const items = [
    { name: 'Dřevěný meč', attack: 5, price: 50 },
    { name: 'Železný meč', attack: 12, price: 150 },
    { name: 'Dlouhý meč', attack: 15, price: 200 },
    { name: 'Bojová sekera', attack: 18, price: 300 },
    { name: 'Kožená zbroj', defense: 8, price: 100 },
    { name: 'Řetězová zbroj', defense: 15, price: 250 },
    { name: 'Ocelová zbroj', defense: 20, price: 400 },
    { name: 'Platová zbroj', defense: 25, price: 600 },
  ]

  return (
    <GameLayout>
      <GamePanel title="Akce">
        <div className="space-y-1.5">
          <ActionBtn onClick={onBack} icon={Home}>
            <span>Vrátit se do města</span>
          </ActionBtn>

          <div className="mt-2 space-y-1.5 border-t border-[#8b6f47]/30 pt-2">
            <ActionBtn
              onClick={() => setSelectedAction('buy')}
              icon={Store}
              className={selectedAction === 'buy' ? 'border-[#ffd700] bg-black/60' : ''}
            >
              <span className="flex w-full items-center justify-between">
                <span>Koupit zbraně a zbroje</span>
                <ChevronRight className="h-3.5 w-3.5 text-[#8b7355]" />
              </span>
            </ActionBtn>
            <ActionBtn
              onClick={() => setSelectedAction('sell')}
              icon={Coins}
              className={selectedAction === 'sell' ? 'border-[#ffd700] bg-black/60' : ''}
            >
              <span className="flex w-full items-center justify-between">
                <span>Prodat své předměty</span>
                <ChevronRight className="h-3.5 w-3.5 text-[#8b7355]" />
              </span>
            </ActionBtn>
          </div>
        </div>
      </GamePanel>

      <GamePanel title={selectedAction === 'buy' ? 'Nabídka zbrojíře' : 'Prodej předmětů'}>
        {selectedAction === 'buy' ? (
          <div className="relative flex max-h-full flex-col overflow-hidden rounded border border-[#8b6f47] bg-black/60">
            <div ref={tableScrollRef} className="scrollbar-custom overflow-y-auto">
              <ScrollIndicator targetRef={tableScrollRef} position="bottom" />
              <table className="w-full text-xs">
                <thead className="sticky top-0 z-10 bg-black/80">
                  <tr className="border-b border-[#8b6f47]">
                    <th
                      className="px-2 py-1.5 text-left text-[#d4a574]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Předmět
                    </th>
                    <th
                      className="px-2 py-1.5 text-center text-[#d4a574]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Bonus
                    </th>
                    <th
                      className="px-2 py-1.5 text-right text-[#d4a574]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Cena
                    </th>
                    <th
                      className="px-2 py-1.5 text-right text-[#d4a574]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Akce
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx} className="border-b border-[#8b6f47]/30 hover:bg-black/20">
                      <td className="px-2 py-2 text-[#f5e6d3]">{item.name}</td>
                      <td className="px-2 py-2 text-center">
                        {item.attack && <span className="text-[#ff6b6b]">+{item.attack}</span>}
                        {item.defense && <span className="text-[#69ccf0]">+{item.defense}</span>}
                      </td>
                      <td className="px-2 py-2 text-right text-[#ffd700]">{item.price}g</td>
                      <td className="px-2 py-2 text-right">
                        <button className="rounded border border-[#ffd700] bg-gradient-to-r from-[#8b6f47] to-[#6d5a3e] px-2 py-1 text-xs text-white hover:from-[#a8865d] hover:to-[#a8865d]">
                          Koupit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded border border-[#8b6f47] bg-black/60 p-3">
            <p className="py-4 text-center text-xs text-[#8b7355]">
              Vyber předměty z batohu k prodeji zbrojíři.
            </p>
          </div>
        )}
      </GamePanel>
    </GameLayout>
  )
}
