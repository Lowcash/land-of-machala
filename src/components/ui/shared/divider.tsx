import { HStack } from '@/components/ui/core/stack'
import { DecorativeLabel } from '@/components/ui/prefabs/typography/hero'

interface DividerProps {
  label?: string
}

export function Divider({ label }: DividerProps) {
  return (
    <HStack align="center" gap="md" fullWidth>
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-(--color-secondary)/40 to-transparent"></div>
      {label && <DecorativeLabel className="text-xs">{label}</DecorativeLabel>}
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-(--color-secondary)/40 to-transparent"></div>
    </HStack>
  )
}
