'use client'

import { createContext, useCallback, useContext, useState } from 'react'

import { AlertProps } from '@/components/ui/core/alert'
import { AlertStack } from '@/components/ui/core/alert-stack'

type NotificationVariant = AlertProps['variant']

export interface Notification {
  id: string
  title?: string
  message: React.ReactNode
  variant?: NotificationVariant
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationContextType {
  notify: (notification: Omit<Notification, 'id'>) => string
  dismiss: (id: string) => void
  success: (message: React.ReactNode, title?: string) => string
  error: (message: React.ReactNode, title?: string) => string
  warn: (message: React.ReactNode, title?: string) => string
  info: (message: React.ReactNode, title?: string) => string
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

/**
 * Global Notification Provider.
 * Renders floating alerts in a queue.
 */
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const notify = useCallback(
    (notification: Omit<Notification, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 11)
      setNotifications((prev) => [...prev, { ...notification, id }])

      if (notification.duration !== 0) {
        setTimeout(() => {
          dismiss(id)
        }, notification.duration || 5000)
      }

      return id
    },
    [dismiss]
  )

  const success = useCallback(
    (message: React.ReactNode, title?: string) => notify({ message, title, variant: 'success' }),
    [notify]
  )

  const error = useCallback(
    (message: React.ReactNode, title?: string) => notify({ message, title, variant: 'danger' }),
    [notify]
  )

  const warn = useCallback(
    (message: React.ReactNode, title?: string) => notify({ message, title, variant: 'warning' }),
    [notify]
  )

  const info = useCallback(
    (message: React.ReactNode, title?: string) => notify({ message, title, variant: 'info' }),
    [notify]
  )

  return (
    <NotificationContext.Provider value={{ notify, dismiss, success, error, warn, info }}>
      {children}
      <AlertStack items={notifications as any} onDismiss={dismiss} />
    </NotificationContext.Provider>
  )
}

/**
 * Hook to trigger global notifications.
 */
export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
