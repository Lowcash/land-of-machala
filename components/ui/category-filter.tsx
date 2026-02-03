import Link from 'next/link'

import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Label } from '@/components/ui/typography'

import { VStack } from './stack'

export interface CategoryOption<T extends string> {
  id: T
  label: string
  icon: LucideIcon
  color?: string // Optional color class (e.g. text-red-500)
}

interface CategoryFilterProps<T extends string> {
  categories: CategoryOption<T>[]
  selectedCategory: T
  paramName?: string // defaulting to 'category'
  allLabel?: string
  getCategoryColor?: (category: T) => string
}

export function CategoryFilter<T extends string>({
  categories,
  selectedCategory,
  paramName = 'category',
  allLabel = 'Vše',
  getCategoryColor,
}: CategoryFilterProps<T>) {
  return (
    <VStack
      fullWidth
      p="1.5"
      gap="sm"
      border="game-b"
      bg="black-60"
      backdrop="small"
      display="grid"
      gridCols="3"
      _internalClassName="md:flex md:flex-col md:gap-3 md:border-b-0 md:p-4"
    >
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        href={'?' as any}
        className={cn(
          'flex items-center justify-center rounded border-2 px-2 py-2 transition-all md:justify-start md:px-4',
          selectedCategory === 'all'
            ? 'border-[#ffd700] bg-[#8b6f47]/30'
            : 'border-[#8b6f47] bg-black/40 hover:border-[#d4a574]'
        )}
      >
        <Label font="fantasy" color={selectedCategory === 'all' ? 'gold' : 'copper'}>
          {allLabel}
        </Label>
      </Link>
      {categories.map((cat) => {
        const Icon = cat.icon
        const isActive = selectedCategory === cat.id
        const color = getCategoryColor ? getCategoryColor(cat.id) : cat.color

        return (
          <Link
            key={cat.id}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            href={`?${paramName}=${cat.id}` as any}
            className={cn(
              'flex w-full items-center justify-center gap-1.5 rounded border-2 px-2 py-2 transition-all md:justify-start md:gap-2 md:px-4',
              isActive
                ? 'border-[#ffd700] bg-[#8b6f47]/30'
                : 'border-[#8b6f47] bg-black/40 hover:border-[#d4a574]'
            )}
          >
            <Icon
              className={cn(
                'h-3.5 w-3.5 md:h-5 md:w-5',
                isActive ? 'text-[#ffd700]' : color || 'text-[#d4a574]'
              )}
            />
            <Label font="fantasy" color={isActive ? 'gold' : 'copper'}>
              {cat.label}
            </Label>
          </Link>
        )
      })}
    </VStack>
  )
}
