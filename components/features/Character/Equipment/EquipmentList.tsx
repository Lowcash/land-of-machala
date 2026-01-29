import { Shield } from 'lucide-react'

import { getSlotName } from '@/lib/game/utils'
import type { CharacterItem } from '@/lib/types/game'

import { GameCard } from '@/components/ui/game-card'
import { GameList } from '@/components/ui/game-list'

interface EquipmentListProps {
  equipped: CharacterItem[]
}

export function EquipmentList({ equipped }: EquipmentListProps) {
  return (
    <GameCard title="Výbava" icon={Shield} className="h-full">
      <GameList
        data={equipped}
        keyExtractor={(item) => item.id}
        emptyMessage="Žádná nasazená výbava"
        renderItem={(item) => {
          const Icon = item.icon || Shield
          return (
            <div className="group relative flex items-center gap-3 rounded-lg border border-[#8b6f47]/50 bg-black/60 p-3 transition-all hover:border-[#ffd700] hover:bg-black/80 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)]">
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
        }}
      />
    </GameCard>
  )
}
