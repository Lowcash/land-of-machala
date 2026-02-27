import { HStack } from '@/components/ui/core/stack'
import { DecorativeLabel } from '@/components/ui/prefabs/typography/hero'

interface DividerProps {
  label?: string
  variant?: 'default' | 'solid'
}

export function Divider({ label, variant = 'default' }: DividerProps) {
  if (variant === 'solid') {
    return (
      <div className="h-px w-full shrink-0 bg-linear-to-r from-transparent via-(--color-secondary)/80 to-transparent" />
    )
  }

  return (
    <HStack align="center" gap="md" fullWidth>
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-(--color-secondary)/60 to-transparent"></div>
      {label && <DecorativeLabel>{label}</DecorativeLabel>}
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-(--color-secondary)/60 to-transparent"></div>
    </HStack>
  )
}
