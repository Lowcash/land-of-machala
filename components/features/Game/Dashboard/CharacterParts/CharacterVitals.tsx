import { calculatePercentage } from '@/lib/game/formulas'

import { Progress } from '@/components/ui/progress'

interface CharacterVitalsProps {
  hp: number
  hpMax: number
  mana: number
  manaMax: number
  xp?: number
  xpMax?: number
  isEnemy: boolean
  resourceType?: 'mana' | 'energy'
}

export function CharacterVitals({
  hp,
  hpMax,
  mana,
  manaMax,
  xp,
  xpMax,
  isEnemy,
  resourceType = 'mana',
}: CharacterVitalsProps) {
  const hpPercent = calculatePercentage(hp, hpMax)
  const resourcePercent = calculatePercentage(mana, manaMax)
  const xpPercent = xp !== undefined && xpMax ? calculatePercentage(xp, xpMax) : 0

  return (
    <div className="w-full space-y-1.5">
      {/* HP Bar */}
      <div className="relative">
        <Progress
          value={hpPercent}
          className="h-4 rounded bg-black/80 ring-1 ring-white/10"
          indicatorClassName="bg-linear-to-r from-red-900 via-red-700 to-red-600"
        />
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white shadow-black drop-shadow-md">
          {Math.round(hp)} / {hpMax} HP
        </div>
      </div>

      {/* Mana Bar */}
      <div className="relative">
        <Progress
          value={resourcePercent}
          className="h-4 rounded bg-black/80 ring-1 ring-white/10"
          indicatorClassName="bg-linear-to-r from-blue-900 via-blue-700 to-blue-500"
        />
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white shadow-black drop-shadow-md">
          {Math.round(mana)} / {manaMax} {resourceType === 'energy' ? 'EN' : 'MP'}
        </div>
      </div>

      {/* XP Bar - Prominent */}
      {!isEnemy && xp !== undefined && (
        <div className="relative">
          <Progress
            value={xpPercent}
            className="h-3 rounded bg-black/80 ring-1 ring-white/10"
            indicatorClassName="bg-linear-to-r from-[#8b6f47] via-[#d4a574] to-[#ffd700]"
          />
          <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-black/80 shadow-white/50 drop-shadow-sm">
            {Math.round(xpPercent)}% XP
          </div>
        </div>
      )}
    </div>
  )
}
