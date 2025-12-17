import type { WorldState } from '@/types/events'
import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Flame,
  Moon,
  Sun,
} from 'lucide-react'

interface WorldStateDisplayProps {
  worldState: WorldState
}

export function WorldStateDisplay({ worldState }: WorldStateDisplayProps) {
  const getWeatherIcon = () => {
    switch (worldState.weather) {
      case 'clear':
        return worldState.timeOfDay === 'night' || worldState.timeOfDay === 'dusk' ? Moon : Sun
      case 'rain':
        return CloudRain
      case 'storm':
        return CloudLightning
      case 'fog':
        return CloudFog
      case 'snow':
        return CloudSnow
      case 'heat':
        return Flame
      default:
        return Cloud
    }
  }

  const getTimeIcon = () => {
    const hour = worldState.hour
    if (hour >= 6 && hour < 12) return Sun
    if (hour >= 12 && hour < 18) return Sun
    if (hour >= 18 && hour < 21) return Moon
    return Moon
  }

  const getWeatherColor = () => {
    switch (worldState.weather) {
      case 'clear':
        return 'text-yellow-400'
      case 'rain':
        return 'text-blue-400'
      case 'storm':
        return 'text-purple-400'
      case 'fog':
        return 'text-gray-400'
      case 'snow':
        return 'text-cyan-300'
      case 'heat':
        return 'text-orange-400'
      default:
        return 'text-slate-400'
    }
  }

  const getTimeColor = () => {
    switch (worldState.timeOfDay) {
      case 'dawn':
        return 'text-orange-300'
      case 'morning':
        return 'text-yellow-300'
      case 'noon':
        return 'text-yellow-400'
      case 'afternoon':
        return 'text-yellow-500'
      case 'dusk':
        return 'text-orange-400'
      case 'night':
        return 'text-blue-300'
      default:
        return 'text-slate-400'
    }
  }

  const WeatherIcon = getWeatherIcon()
  const TimeIcon = getTimeIcon()

  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-700/30 bg-slate-800/60 px-4 py-2 backdrop-blur-sm">
      {/* Time */}
      <div className="flex items-center gap-2">
        <TimeIcon className={`h-4 w-4 ${getTimeColor()}`} />
        <div className="text-sm">
          <span className={`${getTimeColor()}`}>{worldState.timeOfDay}</span>
          <span className="ml-2 text-slate-500">Day {worldState.dayNumber}</span>
        </div>
      </div>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-700/50" />

      {/* Weather */}
      <div className="flex items-center gap-2">
        <WeatherIcon className={`h-4 w-4 ${getWeatherColor()}`} />
        <span className={`text-sm ${getWeatherColor()} capitalize`}>{worldState.weather}</span>
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
