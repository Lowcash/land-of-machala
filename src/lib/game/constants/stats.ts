export interface ServerStat {
  label: string
  value: string
  color: 'gold' | 'danger' | 'success' | 'info'
}

export const SERVER_STATS: ServerStat[] = [
  { label: 'Aktivní hráči', value: '1,247', color: 'gold' },
  { label: 'Zabití bossů', value: '89', color: 'danger' },
  { label: 'Top level', value: '87', color: 'success' },
  { label: 'Questy', value: '12k+', color: 'info' },
]
