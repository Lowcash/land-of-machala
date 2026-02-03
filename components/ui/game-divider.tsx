import { Span } from '@/components/ui/typography'

import { HStack } from './stack'

interface GameDividerProps {
  label?: string
  className?: string
}

export function GameDivider({ label, className }: GameDividerProps) {
  return (
    <HStack align="center" gap="md" py="md" fullWidth _internalClassName={className}>
      <HStack flex="1" h="px" bg="black-20" border="game-b" opacity="30" />
      {label && (
        <Span color="copper" variant="caption" uppercase>
          {label}
        </Span>
      )}
      <HStack flex="1" h="px" bg="black-20" border="game-b" opacity="30" />
    </HStack>
  )
}
