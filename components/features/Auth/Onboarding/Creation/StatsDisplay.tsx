import { Activity, Brain, Droplet, Heart, Sword, Wind } from 'lucide-react'

import { type classes, type races } from '@/lib/game/onboarding'

type RaceData = (typeof races)[number]
type ClassData = (typeof classes)[number]

interface Stats {
  hp: number
  mana: number
  strength: number
  intelligence: number
  agility: number
  stamina: number
}

interface StatDisplayProps {
  race: RaceData
  classData: ClassData
  finalStats: Stats
}

export function StatsDisplay({ race, classData, finalStats }: StatDisplayProps) {
  // Mapping for consistent rendering
  const statConfig = [
    {
      key: 'hp',
      label: 'HP',
      icon: Heart,
      color: 'text-[#ff6b6b]',
      base: race.stats.hp,
      mod: 0,
      iconColor: undefined,
    }, // Class doesn't mod HP directly usually, check logic if needed
    {
      key: 'mana',
      label: 'Mana',
      icon: Droplet,
      color: 'text-[#69ccf0]',
      base: race.stats.mana,
      mod: 0,
      iconColor: undefined,
    },
    {
      key: 'strength',
      label: 'Síla',
      icon: Sword,
      color: 'text-[#d4a574]',
      base: race.stats.strength,
      mod: classData.statMod.strength,
      iconColor: undefined,
    },
    {
      key: 'intelligence',
      label: 'Inteligence',
      icon: Brain,
      color: 'text-[#d4a574]',
      iconColor: 'text-[#c084fc]',
      base: race.stats.intelligence,
      mod: classData.statMod.intelligence,
    },
    {
      key: 'agility',
      label: 'Obratnost',
      icon: Wind,
      color: 'text-[#d4a574]',
      iconColor: 'text-[#ffd700]',
      base: race.stats.agility,
      mod: classData.statMod.agility,
    },
    {
      key: 'stamina',
      label: 'Výdrž',
      icon: Activity,
      color: 'text-[#d4a574]',
      iconColor: 'text-[#69ccf0]',
      base: race.stats.stamina,
      mod: classData.statMod.stamina,
    },
  ] as const

  return (
    <div className="animate-in fade-in rounded-lg border-2 border-[#d4a574] bg-[#0a0806]/90 p-3 shadow-2xl backdrop-blur-sm duration-700 sm:p-4">
      <h3
        className="mb-2 text-center text-sm text-[#ffd700] sm:mb-3 sm:text-base"
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        Tvé statistiky
      </h3>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:flex sm:flex-col sm:space-y-4">
        {statConfig.map((stat) => (
          <StatRow
            key={stat.key}
            label={stat.label}
            value={finalStats[stat.key as keyof Stats]}
            base={stat.base}
            mod={stat.mod}
            icon={stat.icon}
            color={stat.color}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Race/Class Bonus Description */}
      <div className="border-game-copper/30 mt-4 border-t pt-3 text-center">
        <p className="text-game-copper-muted text-[10px] italic">{race.bonuses}</p>
        <p className="text-game-gold/80 mt-1 text-[10px] italic">{classData.bonuses}</p>
      </div>
    </div>
  )
}

function StatRow({
  label,
  value,
  base,
  mod,
  icon: Icon,
  color,
  iconColor,
}: {
  label: string
  value: number
  base: number
  mod: number
  icon: typeof Brain
  color: string
  iconColor?: string
}) {
  const isPositive = mod > 0
  const isNegative = mod < 0
  const modColor = isPositive ? 'text-[#6fbf6f]' : isNegative ? 'text-[#ff6b6b]' : 'text-gray-500'
  const barColor = isPositive ? 'bg-[#6fbf6f]' : isNegative ? 'bg-[#ff6b6b]' : 'bg-game-gold'

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Icon className={`h-3 w-3 ${iconColor || color} sm:h-4 sm:w-4`} />
          <span
            className={`text-[10px] ${color} sm:text-xs`}
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            {label}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className={`text-xs ${color.includes('#d4a574') ? 'text-[#ffd700]' : color} font-bold sm:text-sm`}
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            {/* Show Base + Mod or just Final? Legacy showed Final but highlighting mod */}
            {value}
          </span>
          {mod !== 0 && (
            <span className={`text-[10px] ${modColor} font-bold`}>
              {isPositive ? '+' : ''}
              {mod}
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar Visualization */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full border border-white/5 bg-black/60">
        {/* Base stat bar (mocked scale 0-20 or 0-150 depending on stat) */}
        {/* We use a relative width logic. Max HP ~150, Max Attr ~20 */}
        <div
          className="absolute top-0 left-0 h-full bg-white/20 transition-all duration-500"
          style={{
            width: `${Math.min((base / (label === 'HP' || label === 'Mana' ? 150 : 20)) * 100, 100)}%`,
          }}
        />
        {/* Mod bar - this is tricky to visualize stacked without more math, 
            so we just tint the remaining bar or overlay? 
            Legacy just had a colored bar. Let's make a simple bar representing the TOTAL value, colored by modification.
        */}
        <div
          className={`h-full ${barColor} absolute top-0 left-0 opacity-80 mix-blend-screen transition-all duration-500`}
          style={{
            width: `${Math.min((value / (label === 'HP' || label === 'Mana' ? 150 : 20)) * 100, 100)}%`,
          }}
        />
      </div>
    </div>
  )
}
