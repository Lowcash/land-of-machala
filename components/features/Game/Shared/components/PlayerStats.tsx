import { Coins, MapPin } from 'lucide-react'

interface PlayerStatsProps {
  gold: number
  x: number
  y: number
}

export function PlayerStats({ gold, x, y }: PlayerStatsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Coordinates */}
      <div className="flex items-center gap-1.5 rounded border border-[#8b6f47]/50 bg-black/40 px-2 py-1">
        <MapPin className="h-3.5 w-3.5 text-[#69ccf0]" />
        <span className="text-xs text-[#d4a574]">
          {x}, {y}
        </span>
      </div>

      {/* Gold */}
      <div className="flex items-center gap-1.5 rounded border border-[#ffd700]/30 bg-black/40 px-2 py-1">
        <Coins className="h-3.5 w-3.5 text-[#ffd700]" />
        <span className="text-sm font-bold text-[#ffd700]">{gold}</span>
      </div>
    </div>
  )
}
