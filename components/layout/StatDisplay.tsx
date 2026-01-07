'use client'

import { Tooltip } from '@/components/ui/CustomTooltip'
import type { LucideIcon } from 'lucide-react'

interface StatDisplayProps {
  /** Stat label */
  label: string
  /** Stat value */
  value: string | number
  /** Optional icon */
  icon?: LucideIcon
  /** Icon color */
  iconColor?: string
  /** Value color */
  valueColor?: string
  /** Tooltip text */
  tooltip?: string
  /** Layout variant */
  variant?: 'row' | 'column' | 'card'
  /** Custom className */
  className?: string
}

/**
 * Reusable stat display component
 * Reduces repetitive stat rendering patterns
 */
export function StatDisplay({
  label,
  value,
  icon: Icon,
  iconColor = 'text-[#d4a574]',
  valueColor = 'text-[#ffd700]',
  tooltip,
  variant = 'row',
  className = '',
}: StatDisplayProps) {
  const content = (
    <>
      {variant === 'card' ? (
        <div
          className={`rounded border border-[#8b6f47]/30 bg-black/40 p-2 text-center sm:p-3 ${className}`}
        >
          {Icon && <Icon className={`mx-auto mb-1 h-5 w-5 ${iconColor}`} />}
          <div className="text-[10px] text-[#8b7355] uppercase">{label}</div>
          <div
            className={`text-xl sm:text-2xl ${valueColor}`}
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            {value}
          </div>
        </div>
      ) : variant === 'column' ? (
        <div className={`text-center ${className}`}>
          {Icon && <Icon className={`mx-auto mb-1 h-4 w-4 ${iconColor}`} />}
          <div className="text-xs text-[#8b7355]">{label}</div>
          <div className={`text-lg ${valueColor}`} style={{ fontFamily: 'var(--font-fantasy)' }}>
            {value}
          </div>
        </div>
      ) : (
        <div className={`flex items-center justify-between ${className}`}>
          <span className="flex items-center gap-2 text-[#8b7355]">
            {Icon && <Icon className={`h-4 w-4 ${iconColor}`} />}
            {label}
          </span>
          <span className={valueColor} style={{ fontFamily: 'var(--font-fantasy)' }}>
            {value}
          </span>
        </div>
      )}
    </>
  )

  if (tooltip) {
    return <Tooltip content={tooltip}>{content}</Tooltip>
  }

  return content
}

interface ProgressBarProps {
  /** Current value */
  current: number
  /** Maximum value */
  max: number
  /** Bar color */
  color?: string
  /** Label */
  label?: string
  /** Show text values */
  showValues?: boolean
  /** Custom className */
  className?: string
}

/**
 * Reusable progress bar (HP, Mana, XP, etc.)
 */
export function ProgressBar({
  current,
  max,
  color = 'from-[#ffd700] to-[#ffed4e]',
  label,
  showValues = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100))

  return (
    <div className={`grid grid-cols-[auto_1fr_auto] items-center gap-2 text-xs ${className}`}>
      {label && <span className="font-bold">{label}</span>}
      <div className="h-2.5 overflow-hidden rounded-full border border-[#8b6f47] bg-black/60">
        <div className={`h-full bg-gradient-to-r ${color}`} style={{ width: `${percentage}%` }} />
      </div>
      {showValues && (
        <span className="text-right text-[#8b7355]">
          {current}/{max}
        </span>
      )}
    </div>
  )
}
