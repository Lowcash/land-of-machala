import { AnimatePresence } from 'framer-motion'

import { Alert } from '@/components/ui/core/alert'
import { AnimateNotify } from '@/components/ui/core/animations/animate-notify'
import { Stack } from '@/components/ui/core/stack'

interface AlertStackItem {
  id: string
  title?: string
  message: React.ReactNode
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info'
}

interface AlertStackProps {
  items: AlertStackItem[]
  onDismiss: (id: string) => void
}

/**
 * AlertStack manages the layout and animation of multiple alerts.
 * It handles mobile overflow by limiting max height and enabling internal scroll.
 */
export function AlertStack({ items, onDismiss }: AlertStackProps) {
  return (
    <Stack
      position="fixed"
      zIndex="600"
      fullWidth
      maxWidth="sm"
      // Desktop: Right side, below header (top-24)
      sm={{ top: '24', bottom: 'auto', right: 'lg' }}
      // Mobile: Centered top (top-4)
      top="4"
      bottom="auto"
      p="md"
      pointerEvents="none"
    >
      <Stack
        direction="col"
        gap="sm"
        align="end"
        overflow="auto"
        maxHeight="70dvh"
        scrollbar="none"
        pointerEvents="none"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item) => (
            <AnimateNotify key={item.id} id={item.id}>
              <Alert variant={item.variant} title={item.title} onClick={() => onDismiss(item.id)}>
                {item.message}
              </Alert>
            </AnimateNotify>
          ))}
        </AnimatePresence>
      </Stack>
    </Stack>
  )
}
