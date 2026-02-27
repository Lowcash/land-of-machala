import { Alert } from '@/components/ui/core/alert'
import { Stack } from '@/components/ui/core/stack'
import { AnimateNotify } from '@/components/ui/prefabs/animations/animate-notify'
import { Presence } from '@/components/ui/prefabs/animations/presence'

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
      top="2"
      right="0"
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
        <Presence mode="popLayout" initial={false}>
          {items.map((item) => (
            <AnimateNotify key={item.id} id={item.id}>
              <Alert variant={item.variant} title={item.title} onClick={() => onDismiss(item.id)}>
                {item.message}
              </Alert>
            </AnimateNotify>
          ))}
        </Presence>
      </Stack>
    </Stack>
  )
}
