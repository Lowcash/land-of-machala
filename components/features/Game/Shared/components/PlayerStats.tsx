import { Coins, MapPin } from 'lucide-react'

import { StatBadge } from '@/components/ui/display'
import { HStack } from '@/components/ui/stack'

interface PlayerStatsProps {
  gold: number
  x: number
  y: number
}

export function PlayerStats({ gold, x, y }: PlayerStatsProps) {
  return (
    <HStack align="center" gap="md">
      {/* Coordinates */}
      <StatBadge label={`${x}, ${y}`} icon={MapPin} color="info" variant="subtle" />

      {/* Gold */}
      <StatBadge label={gold} icon={Coins} color="gold" variant="subtle" />
    </HStack>
  )
}
