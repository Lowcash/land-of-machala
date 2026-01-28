import { Brain, Shield, Sword, Wind } from 'lucide-react'

interface CharacterStatsProps {
  stats: {
    strength: number
    intelligence: number
    agility: number
    stamina: number
  }
}

export function CharacterStats({ stats }: CharacterStatsProps) {
  return (
    <div className="flex divide-x divide-[#8b6f47]/20 border-t border-[#8b6f47]/30 bg-[#120f0a]/50">
      <StatItem icon={Sword} value={stats.strength} label="STR" color="text-red-400" />
      <StatItem icon={Brain} value={stats.intelligence} label="INT" color="text-purple-400" />
      <StatItem icon={Wind} value={stats.agility} label="AGI" color="text-yellow-400" />
      <StatItem icon={Shield} value={stats.stamina} label="STA" color="text-blue-400" />
    </div>
  )
}

interface StatItemProps {
  icon: typeof Sword
  value: number
  label: string
  color: string
}

function StatItem({ icon: Icon, value, label, color }: StatItemProps) {
  return (
    <div className="flex flex-1 flex-col items-center py-2 transition-colors hover:bg-white/5">
      <span className={`mb-0.5 text-[10px] font-bold tracking-wider text-[#8b7355] uppercase`}>
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        <Icon className={`h-3.5 w-3.5 ${color}`} />
        <span className="text-sm font-medium text-[#d4a574]">{value}</span>
      </div>
    </div>
  )
}
