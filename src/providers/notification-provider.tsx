'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Alert, type AlertProps } from '@/components/ui/core/alert'
import { VStack } from '@/components/ui/core/stack'

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

const NotificationContext = React.createContext<NotificationContextType | undefined>(undefined)

/**
 * Global Notification Provider.
 * Renders floating alerts in a queue.
 */
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = React.useState<Notification[]>([])

  const dismiss = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const notify = React.useCallback(
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

  const success = React.useCallback((message: React.ReactNode, title?: string) => 
    notify({ message, title, variant: 'success' }), [notify])
  
  const error = React.useCallback((message: React.ReactNode, title?: string) => 
    notify({ message, title, variant: 'danger' }), [notify])

  const warn = React.useCallback((message: React.ReactNode, title?: string) => 
    notify({ message, title, variant: 'warning' }), [notify])

  const info = React.useCallback((message: React.ReactNode, title?: string) => 
    notify({ message, title, variant: 'info' }), [notify])

  return (
    <NotificationContext.Provider value={{ notify, dismiss, success, error, warn, info }}>
      {children}
      <div className="fixed bottom-6 right-6 z-600 w-full max-w-sm pointer-events-none sm:top-24 sm:bottom-auto">
        <VStack gap="sm" align="end">
          <AnimatePresence mode="popLayout" initial={false}>
            {notifications.map((n) => (
              <motion.div
                key={n.id}
                layout
                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 40, filter: 'blur(5px)' }}
                transition={{ 
                  layout: { type: 'spring', damping: 30, stiffness: 300 },
                  opacity: { duration: 0.2 },
                  filter: { duration: 0.2 },
                  x: { type: 'spring', damping: 25, stiffness: 200 }
                }}
                className="w-full pointer-events-auto"
              >
                <Alert
                  variant={n.variant}
                  title={n.title}
                  onClick={() => dismiss(n.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {n.message}
                </Alert>
              </motion.div>
            ))}
          </AnimatePresence>
        </VStack>
      </div>
    </NotificationContext.Provider>
  )
}

/**
 * Hook to trigger global notifications.
 */
export function useNotification() {
  const context = React.useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
