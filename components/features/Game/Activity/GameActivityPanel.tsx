import type { ActivityLogEntry } from '@/lib/types/game'

import { VStack } from '@/components/ui/stack'
import { MutedText } from '@/components/ui/typography'

import { LogEntry } from './LogEntry'

interface GameActivityPanelProps {
  logs?: ActivityLogEntry[]
  title?: string
  children?: React.ReactNode
}

export function GameActivityPanel({ logs = [], children }: GameActivityPanelProps) {
  return (
    <VStack bg="black-60" shrink="0" _internalClassName="h-[140px] transition-colors">
      <VStack position="relative" flex="1" overflow="hidden">
        <VStack fullHeight overflow="scroll" p="sm" _internalClassName="scrollbar-hide">
          <VStack gap="xs" fullWidth>
            {children ? (
              children
            ) : logs.length === 0 ? (
              <VStack py="md" align="center" fullWidth>
                <MutedText italic>Zatím žádné záznamy...</MutedText>
              </VStack>
            ) : (
              logs.map((log) => <LogEntry key={log.id} log={log} />)
            )}
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  )
}
