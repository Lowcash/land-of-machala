import { type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Text } from '@/components/ui/core/typography'

interface SelectionItemProps {
  name: string
  icon: LucideIcon
  isSelected: boolean
  onClick: () => void
}

/**
 * Individual selectable item button for race or class selection.
 * Encapsulates the themed button styling and interactive states.
 */
export function SelectionItem({ name, icon: Icon, isSelected, onClick }: SelectionItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-15 flex-col items-center justify-center gap-0.5 rounded-lg border-2 p-2 transition-all sm:h-18 sm:gap-1 sm:p-3',
        isSelected
          ? 'scale-105 border-(--color-gold) bg-linear-to-br from-(--color-secondary) to-(--color-secondary)/40 shadow-lg'
          : 'border-(--color-secondary)/30 bg-black/40 hover:scale-105 hover:border-(--color-gold)'
      )}
    >
      <Icon size={16} className={isSelected ? 'text-(--color-gold)' : 'text-(--color-secondary)'} />
      <Text
        font="fantasy"
        color={isSelected ? 'gold' : 'secondary'}
        className="text-[10px] sm:text-xs"
      >
        {name}
      </Text>
    </button>
  )
}
