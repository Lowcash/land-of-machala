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
    <div className="border-game-gold-muted flex flex-col gap-4 rounded-lg border-2 bg-black/90 p-4 shadow-2xl backdrop-blur-md">
      <h2 className="font-fantasy text-game-gold text-center text-xl">{title}</h2>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <EntityItemComponent
            key={item.id}
            item={item}
            isSelected={selectedId === item.id}
            isMobileView={false}
            createLink={createLink}
          />
        ))}
      </div>
      {renderDetail(selectedItem)}
    </div>
  )
}
