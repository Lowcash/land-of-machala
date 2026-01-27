import type { ReactNode } from 'react'

import Link from 'next/link'

import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

interface EntityItem {
  id: string
  name: string
  icon: any
  [key: string]: any
}

interface EntitySelectorProps<T extends EntityItem> {
  items: T[]
  selectedId: string
  paramName: string
  searchParams?: { [key: string]: string | string[] | undefined }
  isMobile?: boolean
  title: string
  renderDetail: (item: T) => ReactNode
}

export function EntitySelector<T extends EntityItem>({
  items,
  selectedId,
  paramName,
  searchParams,
  isMobile,
  title,
  renderDetail,
}: EntitySelectorProps<T>) {
  const selectedItem = items.find((i) => i.id === selectedId)!

  const createLink = (id: string) => {
    const params = new URLSearchParams()
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) params.set(key, value as string)
      })
    }
    params.set(paramName, id)
    return `?${params.toString()}`
  }

  if (isMobile) {
    return (
      <div className="border-game-gold-muted mb-2 overflow-hidden rounded-lg border bg-black/80 backdrop-blur-sm">
        <div className="group text-game-gold hover:bg-game-copper/20 flex w-full items-center justify-between p-3 text-sm transition-colors sm:p-4 sm:text-base">
          <span style={{ fontFamily: 'var(--font-fantasy)' }}>
            {title} ({selectedItem.name})
          </span>
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="p-3 sm:p-4">
          <div className="mb-2 grid grid-cols-3 gap-1.5 sm:gap-2">
            {items.map((item) => {
              const Icon = item.icon
              const isSelected = selectedId === item.id
              return (
                <Link
                  key={item.id}
                  href={createLink(item.id) as any}
                  scroll={false}
                  className={cn(
                    'flex h-15 flex-col items-center justify-center gap-0.5 rounded-lg border-2 p-2 transition-all sm:h-20 sm:gap-1 sm:p-3',
                    isSelected
                      ? 'border-game-gold from-game-copper to-game-copper-muted scale-105 bg-linear-to-br shadow-lg'
                      : 'border-game-copper/50 hover:border-game-gold bg-black/40 hover:scale-105'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 sm:h-5 sm:w-5',
                      isSelected ? 'text-game-gold' : 'text-game-gold-muted'
                    )}
                  />
                  <span
                    className={cn(
                      'text-[10px] sm:text-xs',
                      isSelected ? 'text-game-gold' : 'text-game-gold-muted'
                    )}
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </div>
          {renderDetail(selectedItem)}
        </div>
      </div>
    )
  }

  return (
    <div className="border-game-gold-muted flex flex-col gap-4 rounded-lg border-2 bg-black/90 p-4 shadow-2xl backdrop-blur-md">
      <h2
        className="text-game-gold text-center text-xl"
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => {
          const Icon = item.icon
          const isSelected = selectedId === item.id
          return (
            <Link
              key={item.id}
              href={createLink(item.id) as any}
              scroll={false}
              className={cn(
                'flex h-auto flex-col items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all',
                isSelected
                  ? 'border-game-gold from-game-copper to-game-copper-muted scale-105 bg-linear-to-br shadow-lg'
                  : 'border-game-copper/50 hover:border-game-gold bg-black/40 hover:scale-105'
              )}
            >
              <Icon
                className={cn('h-6 w-6', isSelected ? 'text-game-gold' : 'text-game-gold-muted')}
              />
              <span
                className={cn('text-xs', isSelected ? 'text-game-gold' : 'text-game-gold-muted')}
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
      {renderDetail(selectedItem)}
    </div>
  )
}
