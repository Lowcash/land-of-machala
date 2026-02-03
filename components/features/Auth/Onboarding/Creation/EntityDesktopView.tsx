import { Card } from '@/components/ui/card'
import { VStack } from '@/components/ui/stack'
import { GoldTitle } from '@/components/ui/typography'

import { type EntityItem, type EntitySelectorProps } from '../types'
import { EntityItemComponent } from './EntityItem'

export function EntityDesktopView<T extends EntityItem>({
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
    <Card variant="dialog" fullWidth>
      <VStack backdrop fullWidth>
        <Card.Content>
          <VStack gap="lg" fullWidth>
            <GoldTitle variant="h2" align="center">
              {title}
            </GoldTitle>

            <VStack display="grid" gridCols="3" gap="sm" fullWidth>
              {items.map((item) => (
                <EntityItemComponent
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  isMobileView={false}
                  createLink={createLink}
                />
              ))}
            </VStack>

            {renderDetail(selectedItem)}
          </VStack>
        </Card.Content>
      </VStack>
    </Card>
  )
}
