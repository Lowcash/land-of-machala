'use client'

import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useState } from 'react'

import { X } from 'lucide-react'

import {
  NOTIFICATION_VARIANT_CONFIG,
  type NotificationVariant,
} from '@/lib/constants/notifications'
import { useNotificationAnimation } from '@/lib/hooks/ui/useNotificationAnimation'

import { Button } from '@/components/ui/button'

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
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={`relative mb-3 w-80 overflow-hidden rounded-lg border-2 backdrop-blur-md transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } bg-linear-to-br ${config.bgGradient}`}
      style={{
        borderColor: config.borderColor,
        boxShadow: `0 0 20px ${config.glowColor}, 0 4px 6px rgba(0,0,0,0.3)`,
      }}
    >
      <div className="flex items-start gap-3 p-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2"
          style={{
            borderColor: config.borderColor,
            boxShadow: `0 0 12px ${config.glowColor}`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color: config.borderColor }} />
        </div>

        <div className="flex-1 space-y-1">
          <h4 className="font-fantasy text-sm font-semibold text-[#f5e6d3]">
            {notification.title}
          </h4>
          {notification.description && (
            <p className="text-xs text-[#f5e6d3]/80">{notification.description}</p>
          )}
        </div>

        <Button
          onClick={handleClose}
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0 p-0 text-[#f5e6d3]/60 hover:text-[#f5e6d3]"
          aria-label="Zavřít oznámení"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
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
      <div className="fixed top-20 left-1/2 z-600 flex w-full max-w-6xl -translate-x-1/2 flex-col items-end px-4">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
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
