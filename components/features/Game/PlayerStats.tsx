'use client'

import { Coins, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

interface PlayerStatsProps {
  characterId: string
}

interface PlayerData {
  x: number
  y: number
  gold: number
}

export function PlayerStats({ characterId }: PlayerStatsProps) {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null)

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(`/api/character/${characterId}/stats`)
        if (response.ok) {
          const data = await response.json()
          setPlayerData({
            x: data.x ?? 0,
            y: data.y ?? 0,
            gold: data.gold ?? 0,
          })
        }
      } catch (error) {
        console.error('Failed to fetch player stats:', error)
      }
    }

    fetchPlayerData()
    const interval = setInterval(fetchPlayerData, 30000) // Update every 30s

    return () => clearInterval(interval)
  }, [characterId])

  if (!playerData) {
    return null
  }

  return (
    <div className="flex items-center gap-3">
      {/* Coordinates */}
      <div className="flex items-center gap-1.5 rounded border border-[#8b6f47]/50 bg-black/40 px-2 py-1">
        <MapPin className="h-3.5 w-3.5 text-[#69ccf0]" />
        <span className="text-xs text-[#d4a574]">
          {playerData.x}, {playerData.y}
        </span>
      </div>

      {/* Gold */}
      <div className="flex items-center gap-1.5 rounded border border-[#ffd700]/30 bg-black/40 px-2 py-1">
        <Coins className="h-3.5 w-3.5 text-[#ffd700]" />
        <span className="text-sm font-bold text-[#ffd700]">{playerData.gold}</span>
      </div>
    </div>
  )
}
