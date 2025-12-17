export interface WorldState {
  weather: 'clear' | 'rain' | 'storm' | 'fog' | 'snow' | 'heat' | 'cloudy'
  timeOfDay: 'dawn' | 'morning' | 'noon' | 'afternoon' | 'dusk' | 'night'
  dayNumber: number
  hour: number
  weatherEffects: {
    combatModifier?: number
  }
}

export interface RandomEvent {
  id: string
  title: string
  description: string
  type: 'combat' | 'treasure' | 'flavor'
}

export interface ActiveEvent {
  id: string
  expiresAt: number
}
