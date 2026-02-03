import { VStack } from '@/components/ui/stack'

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <VStack
      fullHeight
      bg="game-wood-dark"
      overflow="hidden"
      _internalStyle={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Content Layer */}
      <VStack position="relative" z="10" flex="1" overflow="hidden">
        <VStack fullWidth maxW="none" flex="1" overflow="hidden" _internalClassName="mx-auto">
          {children}
        </VStack>
      </VStack>
    </VStack>
  )
}
