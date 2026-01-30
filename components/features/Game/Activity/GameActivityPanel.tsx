import type { ActivityLogEntry } from '@/lib/types/game'

import { ScrollArea } from '@/components/ui/scroll-area'

interface GameActivityPanelProps {
  logs?: ActivityLogEntry[]
  title?: string
  className?: string
  children?: React.ReactNode
}

export function GameActivityPanel({ logs = [], className = '', children }: GameActivityPanelProps) {
  return (
    <div className={`relative flex min-h-0 flex-col ${className}`}>
      <div className="relative min-h-0 flex-1">
        <ScrollArea className="h-full">
          <div className="space-y-1.5 p-1">
            {children ? (
              children
            ) : logs.length === 0 ? (
              <div className="text-game-copper-muted py-4 text-center text-xs italic">
                Zatím žádné záznamy...
              </div>
            ) : (
              logs.map((log) => {
                const colors = {
                  playerAttack: 'text-game-gold border-l-game-gold',
                  enemyAttack: 'text-game-danger border-l-game-danger',
                  defend: 'text-game-info border-l-game-info',
                  heal: 'text-game-success border-l-game-success',
                  mana: 'text-game-magic border-l-game-magic',
                  info: 'text-game-copper-muted border-l-game-copper-muted',
                  travel: 'text-game-gold-muted border-l-game-gold-muted',
                  discovery: 'text-game-magic border-l-game-magic',
                  quest: 'text-game-gold border-l-game-gold',
                  loot: 'text-game-success border-l-game-success',
                  death: 'text-game-danger border-l-game-danger',
                }
                const colorClass =
                  colors[log.type as keyof typeof colors] || 'text-game-fg border-l-game-copper'

                const isCrit = log.message.includes('Kritický zásah')
                const isDodge = log.message.includes('vyhnul') || log.message.includes('utekl')
                const isVictory =
                  log.message.includes('poražen') || log.message.includes('Získal jsi')

                let dynamicClass = colorClass
                if (isCrit) {
                  dynamicClass =
                    'text-amber-400 font-bold border-l-4 border-l-amber-500 bg-amber-900/20'
                }
                if (isDodge) {
                  dynamicClass = 'text-gray-400 italic border-l-gray-500 opacity-90'
                }
                if (isVictory) {
                  dynamicClass = 'text-green-400 font-bold border-l-green-500 bg-green-900/20'
                }

                return (
                  <div
                    key={log.id}
                    className={`rounded-lg border-l-2 px-3 py-1.5 text-xs sm:text-sm ${dynamicClass} bg-black/40 backdrop-blur-sm transition-opacity hover:bg-black/60`}
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    <span className="mr-2 text-[10px] opacity-50">
                      {new Date(log.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </span>
                    {log.message}
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
