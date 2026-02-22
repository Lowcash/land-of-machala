import { Card } from '@/components/ui/core/card'
import { ScrollArea } from '@/components/ui/core/scroll-area'
import { VStack } from '@/components/ui/core/stack'
import { Description } from '@/components/ui/prefabs/typography/shared'
import { cn } from '@/lib/utils'

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
  playerAttack: { color: 'text-(--color-gold)', border: 'border-l-(--color-gold)' },
  enemyAttack: { color: 'text-red-400', border: 'border-l-red-500' },
  defend: { color: 'text-blue-400', border: 'border-l-blue-500' },
  heal: { color: 'text-emerald-400', border: 'border-l-emerald-500' },
  mana: { color: 'text-purple-400', border: 'border-l-purple-500' },
  info: { color: 'text-(--color-secondary)', border: 'border-l-(--color-secondary)' },
  travel: { color: 'text-amber-600', border: 'border-l-amber-700' },
  discovery: { color: 'text-fuchsia-400', border: 'border-l-fuchsia-500' },
  quest: { color: 'text-yellow-500', border: 'border-l-yellow-600' },
  loot: { color: 'text-green-400', border: 'border-l-green-500' },
  death: { color: 'text-red-600', border: 'border-l-red-700' },
}

interface InfoLogProps {
  logs: LogEntry[]
  maxHeight?: string | number
  variant?: 'ticker' | 'compact' | 'full'
}

export function InfoLog({ logs, maxHeight = 300, variant = 'full' }: InfoLogProps) {
  const isTicker = variant === 'ticker'
  
  return (
    <Card variant={isTicker ? 'ghost' : 'secondary'} p="none" border={isTicker ? 'none' : 'base'}>
      <ScrollArea maxHeight={maxHeight}>
        <VStack gap="xs" p={isTicker ? 'none' : 'sm'}>
          {logs.length === 0 ? (
            !isTicker && <Description align="center">No entries in the log yet...</Description>
          ) : (
            logs.map((log) => {
              const config = typeConfig[log.type] || typeConfig.info
              const color = config.color.match(/\((.*?)\)/)?.[1] || config.color

              return (
                <div
                  key={log.id}
                  className={cn(
                    "flex flex-row items-start gap-3 transform-gpu transition-colors",
                    !isTicker && "p-2 rounded-sm border-l-2 bg-black/20 hover:bg-black/40",
                    !isTicker && config.border,
                    isTicker && "px-2 py-0.5 opacity-80 hover:opacity-100"
                  )}
                >
                  {!isTicker && (
                    <span className="font-fantasy mt-0.5 shrink-0 text-[10px] opacity-30">
                      {log.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </span>
                  )}
                  <Description
                    variant="tiny"
                    font="fantasy"
                    style={{ color: `var(${color})` }}
                    className={cn(isTicker && "truncate")}
                  >
                    {isTicker && <span className="mr-2 opacity-50">»</span>}
                    {log.message}
                  </Description>
                </div>
              )
            })
          )}
        </VStack>
      </ScrollArea>
    </Card>
  )
}
