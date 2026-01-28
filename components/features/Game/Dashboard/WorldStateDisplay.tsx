import type { WorldState } from '@/types/events'

import {
  getWorldTimeColor,
  getWorldTimeIcon,
  getWorldWeatherColor,
  getWorldWeatherIcon,
} from '@/lib/game/world'

interface WorldStateDisplayProps {
  worldState: WorldState
}

export function WorldStateDisplay({ worldState }: WorldStateDisplayProps) {
  const WeatherIcon = getWorldWeatherIcon(worldState.weather, worldState.timeOfDay)
  const TimeIcon = getWorldTimeIcon(worldState.hour)
  const timeColor = getWorldTimeColor(worldState.timeOfDay)
  const weatherColor = getWorldWeatherColor(worldState.weather)

  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-700/30 bg-slate-800/60 px-4 py-2 backdrop-blur-sm">
      {/* Time */}
      <div className="flex items-center gap-2">
        <TimeIcon className={`h-4 w-4 ${timeColor}`} />
        <div className="text-sm">
          <span className={`${timeColor}`}>{worldState.timeOfDay}</span>
          <span className="ml-2 text-slate-500">Day {worldState.dayNumber}</span>
        </div>
      </div>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-700/50" />

      {/* Weather */}
      <div className="flex items-center gap-2">
        <WeatherIcon className={`h-4 w-4 ${weatherColor}`} />
        <span className={`text-sm ${weatherColor} capitalize`}>{worldState.weather}</span>
      </div>

      {/* Effects indicator */}
      {worldState.weatherEffects.combatModifier !== undefined &&
        worldState.weatherEffects.combatModifier !== 0 && (
          <>
            <div className="h-6 w-px bg-slate-700/50" />
            <div className="text-xs text-slate-400">
              Combat {worldState.weatherEffects.combatModifier > 0 ? '+' : ''}
              {worldState.weatherEffects.combatModifier}%
            </div>
          </>
        )}
    </div>
  )
}
