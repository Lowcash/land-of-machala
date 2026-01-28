import { ChevronDown } from 'lucide-react'

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
    <div className="border-game-gold-muted mb-2 overflow-hidden rounded-lg border bg-black/80 backdrop-blur-sm">
      <div className="group text-game-gold hover:bg-game-copper/20 flex w-full items-center justify-between p-3 text-sm transition-colors sm:p-4 sm:text-base">
        <span className="font-fantasy">
          {title} ({selectedItem.name})
        </span>
        <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <div className="p-3 sm:p-4">
        <div className="mb-2 grid grid-cols-3 gap-1.5 sm:gap-2">
          {items.map((item) => (
            <EntityItemComponent
              key={item.id}
              item={item}
              isSelected={selectedId === item.id}
              isMobileView={true}
              createLink={createLink}
            />
          ))}
        </div>
        {renderDetail(selectedItem)}
      </div>
    </div>
  )
}
