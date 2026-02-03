'use client'

import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useState } from 'react'

import { X } from 'lucide-react'

import {
  NOTIFICATION_VARIANT_CONFIG,
  type NotificationVariant,
} from '@/lib/constants/notifications'
import { useNotificationAnimation } from '@/lib/hooks/ui/useNotificationAnimation'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Stack, VStack } from '@/components/ui/stack'
import { H4, P } from '@/components/ui/typography'

export type Notification = {
  id: number
  title: string
  description?: string
  variant: NotificationVariant
  duration?: number
}

type NotificationContextType = {
  showNotification: (notification: Omit<Notification, 'id'>) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

let notificationId = 0

interface NotificationItemProps {
  notification: Notification
  onClose: () => void
}

function NotificationItem({ notification, onClose }: NotificationItemProps) {
  // Hooks
  const { isVisible, handleClose } = useNotificationAnimation({
    onClose,
    duration: notification.duration,
  })

  // Derived values
  const config = NOTIFICATION_VARIANT_CONFIG[notification.variant]
  const Icon = config.icon

  // Render
  return (
    <VStack
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      rounded="lg"
      backdrop
      position="relative"
      mb="sm"
      w="80"
      overflow="hidden"
      _internalClassName={cn(
        'transition-all duration-300 bg-linear-to-br border-2',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        config.bgGradient
      )}
      _internalStyle={{
        borderColor: config.borderColor,
        boxShadow: `0 0 20px ${config.glowColor}, 0 4px 6px rgba(0,0,0,0.3)`,
      }}
    >
      <Stack direction="row" align="start" gap="md" p="md">
        <VStack
          h="10"
          w="10"
          shrink="0"
          align="center"
          justify="center"
          rounded="full"
          _internalClassName="border-2"
          _internalStyle={{
            borderColor: config.borderColor,
            boxShadow: `0 0 12px ${config.glowColor}`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color: config.borderColor }} />
        </VStack>

        <VStack flex="1" gap="xs">
          <H4
            font="fantasy"
            color="default"
            weight="bold"
            _internalStyle={{ color: '#f5e6d3', fontSize: '14px' }}
          >
            {notification.title}
          </H4>
          {notification.description && (
            <P _internalStyle={{ color: 'rgba(245, 230, 211, 0.8)', fontSize: '12px' }}>
              {notification.description}
            </P>
          )}
        </VStack>

        <Button
          onClick={handleClose}
          variant="ghost"
          size="icon-xs"
          icon={X}
          aria-label="Zavřít oznámení"
        />
      </Stack>
    </VStack>
  )
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  // Hooks
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Callbacks
  const showNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = notificationId++
    setNotifications((prev) => [...prev, { ...notification, id }])
  }, [])

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  // Render
  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <VStack
        position="fixed"
        top="20"
        left="0"
        z="top"
        fullWidth
        align="end"
        px="md"
        _internalClassName="left-1/2 max-w-6xl -translate-x-1/2"
      >
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </VStack>
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}
