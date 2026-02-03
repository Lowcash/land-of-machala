import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Card } from '@/components/ui/card'
import { SelectableCard } from '@/components/ui/display'
import { VStack } from '@/components/ui/stack'
import { Label } from '@/components/ui/typography'

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

  const iconClasses = cn(
    'shrink-0',
    isMobileView ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-6 w-6',
    isSelected ? 'text-game-gold' : 'text-game-gold-muted'
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemHref = createLink(item.id) as any

  return (
    <Link href={itemHref} scroll={false} className="group block h-full">
      <SelectableCard isSelected={isSelected}>
        <Card.Content
          disablePadding
          _internalClassName={cn(isMobileView ? 'h-15 sm:h-20' : 'min-h-[100px] sm:min-h-[120px]')}
        >
          <VStack align="center" justify="center" gap={isMobileView ? 'xs' : 'sm'} fullHeight>
            <Icon className={iconClasses} />
            <VStack px="xs">
              <Label font="fantasy" color={isSelected ? 'gold' : 'gold-muted'} align="center">
                {item.name}
              </Label>
            </VStack>
          </VStack>
        </Card.Content>
      </SelectableCard>
    </Link>
  )
}
