import racesData from './races.json'

export interface RaceInfo {
  id: string
  nameKey: string
}

export const RACES = racesData as RaceInfo[]
