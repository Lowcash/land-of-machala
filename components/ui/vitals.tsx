'use client'

import { calculatePercentage } from '@/lib/game/formulas'

import { Progress } from '@/components/ui/progress'
import { VStack } from '@/components/ui/stack'
import { Caption } from '@/components/ui/typography'

interface VitalBarProps {
  /** Current value of the resource */
  current: number
  /** Maximum value of the resource */
  max: number
  /** Variant/Color of the bar */
  variant: 'hp' | 'mana' | 'xp'
  /** Optional label text (e.g. "HP", "MP") */
  label?: string
  /** Whether to show the numeric values (current / max) */
  showValues?: boolean
  /** Whether to show percentage for XP */
  showPercentage?: boolean
  /** Custom overlay text (overrides default numeric/percentage display) */
  overlayText?: string
}

/**
 * A standard resource bar (HP, Mana, XP) with overlaid text.
 * Ensures consistent styling for progress bars across the application.
 */
export function VitalBar({
  current,
  max,
  variant,
  label,
  showValues = true,
  showPercentage = false,
  overlayText,
}: VitalBarProps) {
  const percentage = calculatePercentage(current, max)

  // Format the overlaid text
  const displayValue =
    overlayText ||
    (() => {
      if (showPercentage) return `${Math.round(percentage)}%` + (label ? ` ${label}` : '')
      if (showValues) return `${Math.round(current)} / ${max}` + (label ? ` ${label}` : '')
      return label || ''
    })()

  const isXP = variant === 'xp'

  return (
    <VStack position="relative" fullWidth>
      <Progress value={percentage} variant={variant} />
      <Caption
        weight="bold"
        position="absolute"
        inset="0"
        align="center"
        color="default"
        _internalClassName={`flex items-center justify-center ${isXP ? 'text-black/80' : 'text-game-gold-muted drop-shadow-md'}`}
        _internalStyle={{
          textShadow: isXP ? 'none' : '1px 1px 2px var(--color-black)',
          fontSize: isXP ? '8px' : '10px',
        }}
      >
        {displayValue}
      </Caption>
    </VStack>
  )
}
