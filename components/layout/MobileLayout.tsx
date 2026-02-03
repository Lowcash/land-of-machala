import type { ReactNode } from 'react'

import { ArrowLeft } from 'lucide-react'

// Internal cn helper for the local file refactor if needed,
// though we usually import it. Checking imports...
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { HStack, VStack } from '@/components/ui/stack'
import { H2 } from '@/components/ui/typography'

interface MobileLayoutProps {
  /** Is overlay visible */
  isOpen: boolean
  /** Title text */
  title: string
  /** Content */
  children: ReactNode
  /** Close handler */
  onClose: () => void
  /** Custom back button text */
  backText?: string
  /** Custom className */
  className?: string
}

/**
 * Mobile fullscreen overlay for detail views
 * Replaces repeated fixed inset-0 patterns
 */
export function MobileLayout({
  isOpen,
  title,
  children,
  onClose,
  backText = 'Zpět',
  className = '',
}: MobileLayoutProps) {
  if (!isOpen) return null

  return (
    <VStack
      position="fixed"
      inset="0"
      z="top"
      fullHeight
      fullWidth
      bg="black-90"
      backdrop
      _internalClassName={cn('md:hidden pt-11.75', className)}
    >
      {/* Header */}
      <HStack
        shrink="0"
        align="center"
        justify="between"
        px="md"
        py="md"
        bg="black-80"
        border="game-b"
        backdrop
      >
        <H2 font="medieval" color="gold" _internalClassName="text-base sm:text-lg">
          {title}
        </H2>
        <Button
          onClick={onClose}
          variant="ghost"
          icon={ArrowLeft}
          label={backText}
          aria-label="Zavřít"
        />
      </HStack>

      {/* Scrollable Content */}
      <VStack flex="1" overflow="scroll" p="md" _internalClassName="sm:p-6">
        {children}
      </VStack>
    </VStack>
  )
}
