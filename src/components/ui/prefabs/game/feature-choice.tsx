'use client'

import { forwardRef } from 'react'

import { Button } from '@/components/ui/core/button'
import { VStack } from '@/components/ui/core/stack'
import { Icon } from '@/components/ui/icons'
import { Value } from '@/components/ui/prefabs/typography/shared'

interface FeatureChoiceProps {
  label: string
  icon: React.ElementType
  isSelected?: boolean
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'choice' | 'secondary'
}

/**
 * A semantic prefab for selection options (Race, Class, Items, etc.)
 * Encapsulates the Button + Icon + Label hierarchy.
 */
export const FeatureChoice = forwardRef<HTMLButtonElement, FeatureChoiceProps>(
  ({ label, icon: PassedIcon, isSelected, onClick, disabled, variant }, ref) => {
    const activeVariant = variant || (isSelected ? 'primary' : 'choice')

    return (
      <Button
        ref={ref}
        variant={activeVariant}
        onClick={onClick}
        disabled={disabled}
        fullWidth
        size="feature"
      >
        <VStack align="center" gap="xxs" fullWidth minWidth="zero">
          <Icon
            icon={PassedIcon as import('lucide-react').LucideIcon}
            size="md"
            color={isSelected ? 'primary' : 'secondary'}
          />
          <Value variant="small" color={isSelected ? 'primary' : 'ivory'} align="center" truncate>
            {label}
          </Value>
        </VStack>
      </Button>
    )
  }
)

FeatureChoice.displayName = 'FeatureChoice'
