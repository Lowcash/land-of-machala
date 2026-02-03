'use client'

import type { LucideIcon } from 'lucide-react'
import { Check, Lock } from 'lucide-react'

import { getRarityBorder, getRarityColor } from '@/lib/constants/rarity'
import { ItemRarity } from '@/lib/types/game'
import { cn } from '@/lib/utils'

import { VStack } from './stack'
import { Caption } from './typography'

interface IconBoxProps {
  /** The icon to display in the center */
  icon?: LucideIcon
  /** Optional rarity which defines border color and background glow */
  rarity?: ItemRarity
  /** Whether the item is currently selected (highlights with gold border) */
  isSelected?: boolean
  /** Whether the item is equipped (shows checkmark) */
  isEquipped?: boolean
  /** Whether the item/skill is locked (shows lock, dims content) */
  isLocked?: boolean
  /** Numeric quantity to show in the bottom right */
  quantity?: number
  /** Whether the slot is empty (showing a ghost border) */
  isEmpty?: boolean
  /** Click handler */
  onClick?: () => void
  /** Manual class override for the container */
  _internalClassName?: string
  /** Manual class override for the icon */
  iconClassName?: string
  /** Whether it should be a square tile (aspect-square) */
  square?: boolean
  /** Polygormphic tag */
  as?: React.ElementType
  /** Pass-through props for the underlying component */
  [key: string]: unknown
}

/**
 * A standard "tile" or "slot" component for items, skills, and achievements.
 * Consolidates layout, rarity styling, and status indicators.
 */
export function IconBox({
  icon: Icon,
  rarity,
  isSelected = false,
  isEquipped = false,
  isLocked = false,
  quantity,
  isEmpty = false,
  onClick,
  _internalClassName,
  iconClassName,
  square = true,
  as: Component = 'button',
  ...props
}: IconBoxProps) {
  const isLegendary = rarity === ItemRarity.LEGENDARY
  const isEpic = rarity === ItemRarity.EPIC
  const isRare = rarity === ItemRarity.RARE

  const rarityBorder = rarity ? getRarityBorder(rarity) : ''
  const rarityColor = rarity ? getRarityColor(rarity) : ''

  if (isEmpty) {
    return (
      <VStack
        as="div"
        position="relative"
        align="center"
        justify="center"
        rounded="lg"
        _internalClassName={cn(
          'border-2 border-game-copper/10 bg-black/20 opacity-40',
          square && 'aspect-square h-auto',
          _internalClassName
        )}
      />
    )
  }

  return (
    <VStack
      as={Component}
      onClick={onClick}
      position="relative"
      align="center"
      justify="center"
      rounded="lg"
      {...props}
      _internalClassName={cn(
        'group transition-all border-2 p-2',
        square && 'aspect-square h-auto',
        isSelected
          ? 'scale-105 border-game-gold bg-black/60 shadow-[0_0_10px_var(--color-game-gold-muted)] z-10'
          : cn('bg-black/40 hover:bg-black/60', rarityBorder),
        isLocked && 'opacity-60 grayscale cursor-not-allowed',
        !isSelected && !isLocked && 'hover:scale-[1.02]',
        isLegendary &&
          'bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-yellow-900/20 to-transparent',
        isEpic &&
          'bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-purple-900/20 to-transparent',
        isRare &&
          'bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900/20 to-transparent',
        _internalClassName
      )}
    >
      <VStack h="full" w="full" align="center" justify="center">
        {isLocked ? (
          <Lock className="text-game-copper h-6 w-6" />
        ) : Icon ? (
          <Icon className={cn('h-8 w-8', rarityColor, iconClassName)} />
        ) : null}
      </VStack>

      {quantity && quantity > 1 && (
        <VStack
          position="absolute"
          right="1"
          bottom="1"
          rounded="default"
          border="copper"
          bg="black-80"
          px="1.5"
          py="0.5"
          leading="none"
          _internalClassName="text-white"
        >
          <Caption weight="bold" size="xs">
            {quantity}
          </Caption>
        </VStack>
      )}

      {isEquipped && !isLocked && (
        <VStack
          position="absolute"
          top="1"
          right="1"
          rounded="full"
          p="0.5"
          bg="gold"
          _internalClassName="text-black shadow-sm"
        >
          <Check className="h-3 w-3" />
        </VStack>
      )}
    </VStack>
  )
}
