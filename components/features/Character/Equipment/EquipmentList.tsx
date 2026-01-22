'use client'

import { Shield } from 'lucide-react'
import type { CharacterItem } from '../Shared/types'

interface EquipmentListProps {
  equipped: CharacterItem[]
}

export function EquipmentList({ equipped }: EquipmentListProps) {
  const getSlotName = (slot: string) => {
    const names: Record<string, string> = {
      left_hand: 'Levá ruka',
      right_hand: 'Pravá ruka',
      chest: 'Hruď',
      hands: 'Ruce',
      feet: 'Nohy',
      head: 'Hlava',
      legs: 'Nohy',
    }
    return names[slot] || slot
  }

  return (
    <div className="flex h-full flex-col rounded-lg border-2 border-[#d4a574] bg-linear-to-br from-black/80 to-black/60 p-4 shadow-lg">
      <h3
        className="mb-4 flex items-center gap-2 text-base text-[#d4a574]"
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        <Shield className="h-4 w-4" />
        Výbava
      </h3>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {equipped.map((item) => {
          const Icon = item.icon || Shield
          return (
            <div
              key={item.id}
              className="group relative flex items-center gap-3 rounded-lg border border-[#8b6f47]/50 bg-black/60 p-3 transition-all hover:border-[#ffd700] hover:bg-black/80 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#8b6f47] bg-linear-to-br from-black/60 to-[#8b6f47]/20 shadow-inner transition-colors group-hover:border-[#d4a574]">
                <Icon className="h-5 w-5 text-[#d4a574] drop-shadow-md group-hover:text-[#ffd700]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4
                    className="truncate text-sm text-[#f5e6d3] group-hover:text-[#ffd700]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {item.name}
                  </h4>
                  <span className="ml-2 shrink-0 text-[9px] tracking-widest text-[#8b7355] uppercase">
                    {getSlotName(item.slot || '')}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-3 text-[10px]">
                  {(item.attack || item.damage) && (
                    <span className="flex items-center gap-1">
                      <span className="text-[#8b7355]">Útok</span>
                      <span className="font-bold text-[#ff6b6b]">
                        +{item.attack || item.damage}
                      </span>
                    </span>
                  )}
                  {item.defense && (
                    <span className="flex items-center gap-1">
                      <span className="text-[#8b7355]">Obrana</span>
                      <span className="font-bold text-[#69ccf0]">+{item.defense}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        {equipped.length === 0 && (
          <div className="col-span-full py-8 text-center text-sm text-[#8b7355] italic">
            Žádná nasazená výbava
          </div>
        )}
      </div>
    </div>
  )
}
