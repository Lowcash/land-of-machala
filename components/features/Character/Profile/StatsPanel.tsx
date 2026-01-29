import { Shield, Swords } from 'lucide-react'

import { calculateCritChance, calculateDodgeChance } from '@/lib/game/formulas'
import type { CharacterData } from '@/lib/types/game'

import { GameCard } from '@/components/ui/game-card'

import { AttributesPanel } from './AttributesPanel'

export function StatsPanel({
  character,
  totalAttack,
  totalDefense,
}: {
  character: CharacterData
  totalAttack: number
  totalDefense: number
}) {
  // Calculate derived stats
  const critChance = calculateCritChance(character.agility)
  const dodgeChance = calculateDodgeChance(character.agility)

  // Use character talent points or default to 0
  const talentPoints = character.talentPoints ?? 0

  // Default stats if missing
  const stats = character.stats || { strength: 0, intelligence: 0, agility: 0, stamina: 0 }

  return (
    <GameCard className="h-full space-y-3 p-3">
      {/* Attributes Panel (Optimistic) */}
      <AttributesPanel stats={stats} talentPoints={talentPoints} />

      <div className="h-px w-full bg-linear-to-r from-transparent via-[#8b6f47] to-transparent opacity-50"></div>

      {/* Combat Stats */}
      <div>
        <h3
          className="mb-2 flex items-center gap-2 text-sm text-[#ffd700]"
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          <Swords className="h-4 w-4" />
          Bojové statistiky
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 px-2 py-1.5">
            <span className="text-xs text-[#8b7355]">Útok</span>
            <span
              className="text-sm font-bold text-[#ff6b6b]"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {totalAttack}
            </span>
          </div>
          <div className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 px-2 py-1.5">
            <span className="text-xs text-[#8b7355]">Obrana</span>
            <span
              className="text-sm font-bold text-[#69ccf0]"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {totalDefense}
            </span>
          </div>
          <div className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 px-2 py-1.5">
            <span className="text-xs text-[#8b7355]">Crit</span>
            <span
              className="text-sm font-bold text-[#ffd700]"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {critChance}%
            </span>
          </div>
          <div className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 px-2 py-1.5">
            <span className="text-xs text-[#8b7355]">Dodge</span>
            <span
              className="text-sm font-bold text-[#ffd700]"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {dodgeChance}%
            </span>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-linear-to-r from-transparent via-[#8b6f47] to-transparent opacity-50"></div>

      {/* Resistances */}
      <div>
        <h3
          className="mb-2 flex items-center gap-2 text-sm text-[#ffd700]"
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          <Shield className="h-4 w-4" />
          Odolnosti
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 px-2 py-1">
            <span className="text-[10px] text-[#8b7355]">Fyzická</span>
            <span
              className="text-xs font-bold text-[#d4a574]"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {character.physicalResistance}%
            </span>
          </div>
          <div className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 px-2 py-1">
            <span className="text-[10px] text-[#8b7355]">Magická</span>
            <span
              className="text-xs font-bold text-[#b66bd4]"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {character.magicalResistance}%
            </span>
          </div>
          <div className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 px-2 py-1">
            <span className="text-[10px] text-[#8b7355]">Oheň</span>
            <span
              className="text-xs font-bold text-[#ff6b6b]"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {character.fireResistance}%
            </span>
          </div>
          <div className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 px-2 py-1">
            <span className="text-[10px] text-[#8b7355]">Chlad</span>
            <span
              className="text-xs font-bold text-[#69ccf0]"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {character.coldResistance}%
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 px-2 py-1">
            <span className="text-[10px] text-[#8b7355]">Jed</span>
            <span
              className="text-xs font-bold text-[#6fbf6f]"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {character.poisonResistance}%
            </span>
          </div>
        </div>
      </div>
    </GameCard>
  )
}
