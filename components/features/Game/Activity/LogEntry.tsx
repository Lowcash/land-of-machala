import type { ActivityLogEntry } from '@/lib/types/game'

import { ActivityItem } from '@/components/ui/display'

interface LogEntryProps {
  log: ActivityLogEntry
}

export function LogEntry({ log }: LogEntryProps) {
  const isCrit = log.message.includes('Kritický zásah')
  const isDodge = log.message.includes('vyhnul') || log.message.includes('utekl')
  const isVictory = log.message.includes('poražen') || log.message.includes('Získal jsi')

  return (
    <ActivityItem
      message={log.message}
      timestamp={log.timestamp}
      variant={log.type}
      isCrit={isCrit}
      isDodge={isDodge}
      isVictory={isVictory}
    />
  )
}
