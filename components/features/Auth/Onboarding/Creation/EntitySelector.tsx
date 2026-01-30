// Server Component
import type { EntityItem, EntitySelectorProps } from '../types'
import { EntityDesktopView } from './EntityDesktopView'
import { EntityMobileView } from './EntityMobileView'

export function EntitySelector<T extends EntityItem>({
  items,
  selectedId,
  paramName,
  searchParams,
  isMobile,
  title,
  renderDetail,
}: EntitySelectorProps<T>) {
  const createLink = (id: string) => {
    const params = new URLSearchParams()

    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v))
          } else {
            params.set(key, value)
          }
        }
      })
    }

    params.set(paramName, id)
    return `?${params.toString()}`
  }

  const props = {
    items,
    selectedId,
    title,
    renderDetail,
    createLink,
  }

  if (isMobile) {
    return <EntityMobileView {...props} />
  }

  return <EntityDesktopView {...props} />
}
