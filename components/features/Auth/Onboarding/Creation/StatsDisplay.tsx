'use client'

import { Activity, Brain, Droplet, Heart, Sword, Wind } from 'lucide-react'

interface Stats {
  hp: number
  mana: number
  strength: number
  intelligence: number
  agility: number
  stamina: number
}

interface StatDisplayProps {
  stats: Stats
}

export function StatsDisplay({ stats }: StatDisplayProps) {
  return (
    <div className="rounded-lg border-2 border-[#d4a574] bg-black/90 p-3 shadow-2xl backdrop-blur-md sm:p-4">
      <h3
        className="mb-2 text-center text-sm text-[#ffd700] sm:mb-3 sm:text-base"
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        Tvé statistiky
      </h3>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 sm:flex sm:flex-col sm:space-y-2">
        <StatRow label="HP" value={stats.hp} icon={Heart} color="text-[#ff6b6b]" />
        <StatRow label="Mana" value={stats.mana} icon={Droplet} color="text-[#69ccf0]" />
        <StatRow label="Síla" value={stats.strength} icon={Sword} color="text-[#d4a574]" />
        <StatRow
          label="Inteligence"
          value={stats.intelligence}
          icon={Brain}
          color="text-[#d4a574]"
          iconColor="text-[#c084fc]"
        />
        <StatRow
          label="Obratnost"
          value={stats.agility}
          icon={Wind}
          color="text-[#d4a574]"
          iconColor="text-[#ffd700]"
        />
        <StatRow
          label="Výdrž"
          value={stats.stamina}
          icon={Activity}
          color="text-[#d4a574]"
          iconColor="text-[#69ccf0]"
        />
      </div>
    </div>
  )
}

function StatRow({
  label,
  value,
  icon: Icon,
  color,
  iconColor,
}: {
  label: string
  value: number
  icon: typeof Brain
  color: string
  iconColor?: string
}) {
  return (
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
      <span
        className={`text-xs ${color.includes('#d4a574') ? 'text-[#ffd700]' : color} sm:text-sm`}
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        {value}
      </span>
    </div>
  )
}
