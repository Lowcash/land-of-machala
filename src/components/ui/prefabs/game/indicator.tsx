'use client'

import { Coins, MapPin } from 'lucide-react'
import { HStack } from '@/components/ui/core/stack'
import { Label, Value } from '@/components/ui/prefabs/typography/shared'

interface IndicatorProps {
  label: string
  size?: 'xs' | 'sm'
}

export function LocationIndicator({ label, size = 'sm' }: IndicatorProps) {
  return (
    <HStack gap="xs" align="center">
      <MapPin className={size === 'xs' ? 'h-3 w-3 text-(--color-secondary)' : 'h-4 w-4 text-(--color-secondary)'} />
      <Label variant={size === 'xs' ? 'tiny' : 'small'} color="secondary">
        {label}
      </Label>
    </HStack>
  )
}

export function CurrencyIndicator({ amount }: { amount: number }) {
  return (
    <HStack gap="xs" align="center">
      <Coins className="h-3 w-3 text-(--color-gold)" />
      <Value variant="tiny" color="gold" bold tabularNums>
        {amount} zl
      </Value>
    </HStack>
  )
}
