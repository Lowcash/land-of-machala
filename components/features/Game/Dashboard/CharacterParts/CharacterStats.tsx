import { Brain, Shield, Sword, Wind } from 'lucide-react'

import { StatDisplay, StatGrid } from '@/components/ui/display'

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
    <StatGrid columns="4" border="game-t" p="xs" bg="black-40" divide>
      <StatDisplay icon={Sword} value={stats.strength} label="STR" color="danger" size="sm" />
      <StatDisplay icon={Brain} value={stats.intelligence} label="INT" color="magic" size="sm" />
      <StatDisplay icon={Wind} value={stats.agility} label="AGI" color="gold" size="sm" />
      <StatDisplay icon={Shield} value={stats.stamina} label="STA" color="info" size="sm" />
    </StatGrid>
  )
}
