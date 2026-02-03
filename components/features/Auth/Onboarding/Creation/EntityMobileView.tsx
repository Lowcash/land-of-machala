import { ChevronDown } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { HStack, VStack } from '@/components/ui/stack'
import { Label } from '@/components/ui/typography'

import { type EntityItem, type EntitySelectorProps } from '../types'
import { EntityItemComponent } from './EntityItem'

export function EntityMobileView<T extends EntityItem>({
  items,
  selectedId,
  title,
  renderDetail,
  createLink,
}: Omit<EntitySelectorProps<T>, 'paramName' | 'searchParams' | 'isMobile'> & {
  createLink: (id: string) => string
}) {
  const selectedItem = items.find((i) => i.id === selectedId)!

  return (
    <VStack mb="sm" fullWidth>
      <Card>
        <Card.Header disablePadding>
          <HStack
            p="md"
            justify="between"
            align="center"
            fullWidth
            interactive
            _internalClassName="group hover:bg-game-copper/20 transition-colors"
          >
            <Label font="fantasy" color="gold">
              {title} ({selectedItem.name})
            </Label>
            <ChevronDown className="text-game-gold h-4 w-4 sm:h-5 sm:w-5" />
          </HStack>
        </Card.Header>

        <Card.Content>
          <VStack gap="sm" fullWidth>
            <VStack display="grid" gridCols="3" gap="sm" fullWidth>
              {items.map((item) => (
                <EntityItemComponent
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  isMobileView={true}
                  createLink={createLink}
                />
              ))}
            </VStack>
            {renderDetail(selectedItem)}
          </VStack>
        </Card.Content>
      </Card>
    </VStack>
  )
}
