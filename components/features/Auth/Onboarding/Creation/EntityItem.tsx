import Link from 'next/link'

import { cn } from '@/lib/utils'

import { type EntityItem } from '../types'

interface EntityItemProps<T extends EntityItem> {
  item: T
  isSelected: boolean
  isMobileView: boolean
  createLink: (id: string) => string
}

export function EntityItemComponent<T extends EntityItem>({
  item,
  isSelected,
  isMobileView,
  createLink,
}: EntityItemProps<T>) {
  const Icon = item.icon

  const containerClasses = cn(
    'flex flex-col items-center justify-center rounded-lg border-2 transition-all',
    isMobileView ? 'h-15 gap-0.5 p-2 sm:h-20 sm:gap-1 sm:p-3' : 'h-auto gap-2 p-3',
    isSelected
      ? 'border-game-gold from-game-copper to-game-copper-muted scale-105 bg-linear-to-br shadow-lg'
      : 'border-game-copper/50 hover:border-game-gold bg-black/40 hover:scale-105'
  )

  const iconClasses = cn(
    'shrink-0',
    isMobileView ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-6 w-6',
    isSelected ? 'text-game-gold' : 'text-game-gold-muted'
  )

  const textClasses = cn(
    'font-fantasy text-center',
    isMobileView ? 'text-[10px] sm:text-xs' : 'text-xs',
    isSelected ? 'text-game-gold' : 'text-game-gold-muted'
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemHref = createLink(item.id) as any

  return (
    <Link href={itemHref} scroll={false} className={containerClasses}>
      {' '}
      <Icon className={iconClasses} />
      <span className={textClasses}>{item.name}</span>
    </Link>
  )
}
