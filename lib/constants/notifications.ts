import type { LucideIcon } from 'lucide-react'
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react'

export type NotificationVariant = 'success' | 'error' | 'warning' | 'info'

export interface NotificationConfig {
  icon: LucideIcon
  borderColor: string
  bgGradient: string
  glowColor: string
}

export const NOTIFICATION_VARIANT_CONFIG: Record<NotificationVariant, NotificationConfig> = {
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
} as const
