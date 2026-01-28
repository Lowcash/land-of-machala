import type { LucideIcon } from 'lucide-react'

export interface EntityItem {
  id: string
  name: string
  icon: LucideIcon | React.ComponentType<unknown>
  [key: string]: unknown
}

export interface EntitySelectorProps<T extends EntityItem> {
  items: T[]
  selectedId: string
  paramName: string
  searchParams?: { [key: string]: string | string[] | undefined }
  isMobile?: boolean
  title: string
  renderDetail: (item: T) => React.ReactNode
}
