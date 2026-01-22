export type LocationType = 'TOWN' | 'DUNGEON' | 'WILDERNESS' | 'LANDMARK'

export interface Location {
  id: string
  name: string
  type: LocationType
  description: string | null
  level: number
  positionX: number
  positionY: number
}

export interface MapFilters {
  showTowns: boolean
  showDungeons: boolean
  showWilderness: boolean
  showLandmarks: boolean
}
