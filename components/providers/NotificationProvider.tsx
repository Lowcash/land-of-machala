'use client'

import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useState } from 'react'

type NotificationVariant = 'success' | 'error' | 'warning' | 'info'

type Notification = {
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

const variantConfig = {
  success: {
    icon: CheckCircle2,
    borderColor: '#6fbf6f',
    bgGradient: 'from-[#6fbf6f]/20 to-black/90',
    glowColor: 'rgba(111, 191, 111, 0.4)',
  },
  error: {
    icon: AlertCircle,
    borderColor: '#ff6b6b',
    bgGradient: 'from-[#ff6b6b]/20 to-black/90',
    glowColor: 'rgba(255, 107, 107, 0.4)',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: '#ffd700',
    bgGradient: 'from-[#ffd700]/20 to-black/90',
    glowColor: 'rgba(255, 215, 0, 0.4)',
  },
  info: {
    icon: Info,
    borderColor: '#69ccf0',
    bgGradient: 'from-[#69ccf0]/20 to-black/90',
    glowColor: 'rgba(105, 204, 240, 0.4)',
  },
}

function NotificationItem({
  notification,
  onClose,
}: {
  notification: Notification
  onClose: () => void
}) {
  const [isVisible, setIsVisible] = useState(false)
  const config = variantConfig[notification.variant]
  const Icon = config.icon

  // Fade in
  useState(() => {
    setTimeout(() => setIsVisible(true), 100)
  })

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

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

        <button
          onClick={handleClose}
          className="shrink-0 text-[#f5e6d3]/60 transition-colors hover:text-[#f5e6d3]"
          aria-label="Zavřít oznámení"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = notificationId++
    setNotifications((prev) => [...prev, { ...notification, id }])
  }, [])

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

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
