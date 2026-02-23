'use client'

import { Coins, MapPin } from 'lucide-react'

import { HStack } from '@/components/ui/core/stack'
import { Icon } from '@/components/ui/icons'
import { Label, Value } from '@/components/ui/prefabs/typography/shared'

interface IndicatorProps {
  label: string
  size?: 'xs' | 'sm'
}

export function LocationIndicator({ label, size = 'sm' }: IndicatorProps) {
  return (
    <HStack gap="xs" align="center">
      <Icon icon={MapPin} size={size === 'xs' ? 'xs' : 'sm'} color="secondary" />
      <Label variant={size === 'xs' ? 'tiny' : 'small'} color="secondary">
        {label}
      </Label>
    </HStack>
  )
}

export function CurrencyIndicator({ amount }: { amount: number }) {
  return (
    <HStack gap="xs" align="center">
      <Icon icon={Coins} size="xs" color="gold" />
      <Value variant="tiny" color="gold" bold tabularNums>
        {amount} zl
      </Value>
    </HStack>
  )
}
