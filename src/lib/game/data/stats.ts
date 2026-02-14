import statsData from './stats.json'

export interface ServerStat {
  id: string
  labelKey: string
  value: string
  color: 'gold' | 'danger' | 'success' | 'info'
}

export const SERVER_STATS = statsData as ServerStat[]
