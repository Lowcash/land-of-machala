import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Flame,
  type LucideIcon,
  Moon,
  Sun,
} from 'lucide-react'

export function getWorldWeatherIcon(weather: string, timeOfDay: string): LucideIcon {
  switch (weather) {
    case 'clear':
      return timeOfDay === 'night' || timeOfDay === 'dusk' ? Moon : Sun
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

export function getWorldTimeIcon(hour: number): LucideIcon {
  if (hour >= 6 && hour < 12) return Sun
  if (hour >= 12 && hour < 18) return Sun
  if (hour >= 18 && hour < 21) return Moon
  return Moon
}

export function getWorldWeatherColor(weather: string): string {
  switch (weather) {
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

export function getWorldTimeColor(timeOfDay: string): string {
  switch (timeOfDay) {
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
