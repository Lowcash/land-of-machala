import { cn } from '@/lib/utils'

import { Card } from '@/components/ui/core/card'
import { ScrollArea } from '@/components/ui/core/scroll-area'
import { Description } from '@/components/ui/prefabs/typography/shared'

export type LogEntryType =
  | 'playerAttack'
  | 'enemyAttack'
  | 'defend'
  | 'heal'
  | 'mana'
  | 'info'
  | 'travel'
  | 'discovery'
  | 'quest'
  | 'loot'
  | 'death'

export interface LogEntry {
  id: string
  timestamp: Date
  message: string
  type: LogEntryType
}

const typeConfig: Record<LogEntryType, { color: string; border: string }> = {
  playerAttack: { color: 'text-orange-400', border: 'border-l-orange-500' },
  enemyAttack: { color: 'text-red-500', border: 'border-l-red-600' },
  defend: { color: 'text-sky-400', border: 'border-l-sky-500' },
  heal: { color: 'text-emerald-400', border: 'border-l-emerald-500' },
  mana: { color: 'text-indigo-400', border: 'border-l-indigo-500' },
  info: { color: 'text-(--color-secondary)', border: 'border-l-(--color-secondary)' },
  travel: { color: 'text-amber-600', border: 'border-l-amber-700' },
  discovery: { color: 'text-fuchsia-400', border: 'border-l-fuchsia-500' },
  quest: { color: 'text-yellow-500', border: 'border-l-yellow-600' },
  loot: { color: 'text-lime-400', border: 'border-l-lime-500' },
  death: { color: 'text-rose-600', border: 'border-l-rose-700 font-bold' },
}

interface InfoLogProps {
  logs: LogEntry[]
  maxHeight?: string | number
}

export function InfoLog({ logs, maxHeight = 300 }: InfoLogProps) {
  return (
    <ScrollArea as={Card} p="xs" gap="xs" style={{ maxHeight }} {...{ variant: 'secondary' }}>
      {logs.length === 0 ? (
        <Description align="center">No entries in the log yet...</Description>
      ) : (
        logs.map((log) => {
          const config = typeConfig[log.type] || typeConfig.info
          const color = config.color.match(/\((.*?)\)/)?.[1] || config.color

          return (
            <div
              key={log.id}
              className={cn(
                'flex transform-gpu flex-row items-center gap-4 transition-colors',
                'rounded-sm border-l-2 bg-black/20 p-2 pl-4 hover:bg-black/40',
                config.border
              )}
            >
              <span className="font-fantasy mt-0.5 shrink-0 text-[10px] opacity-30">
                {log.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </span>
              <Description variant="tiny" font="fantasy" style={{ color: `var(${color})` }}>
                {log.message}
              </Description>
            </div>
          )
        })
      )}
    </ScrollArea>
  )
}
