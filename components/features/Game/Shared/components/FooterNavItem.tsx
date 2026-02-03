import Link from 'next/link'

import type { LucideIcon } from 'lucide-react'

import type { AppRoute } from '@/lib/types/game'
import { cn } from '@/lib/utils'

import { VStack } from '@/components/ui/stack'
import { Caption } from '@/components/ui/typography'

interface FooterNavItemProps {
  id: string
  path: AppRoute
  label: string
  icon: LucideIcon
  isActive: boolean
}

export function FooterNavItem({ path, label, icon: Icon, isActive }: FooterNavItemProps) {
  return (
    <Link
      href={path}
      className={cn(
        'group relative flex h-auto min-w-16 flex-col items-center gap-1 rounded-lg p-2 transition-all duration-300',
        isActive ? 'bg-game-gold/10' : 'hover:bg-white/5'
      )}
    >
      {/* Glow effect for active */}
      {isActive && (
        <VStack
          position="absolute"
          inset="0"
          rounded="full"
          bg="gold"
          opacity="10"
          _internalClassName="blur-xl"
        />
      )}

      <VStack
        _internalClassName={cn(
          'transition-colors duration-300',
          isActive
            ? 'text-game-gold drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]'
            : 'text-game-copper-muted group-hover:text-game-gold-muted'
        )}
      >
        <Icon className="h-6 w-6" />
      </VStack>

      <Caption
        weight="medium"
        color={isActive ? 'gold' : 'muted'}
        _internalClassName={cn(
          'text-[10px] tracking-wide transition-colors duration-300',
          !isActive && 'group-hover:text-game-gold-muted'
        )}
      >
        {label}
      </Caption>

      {/* Active Indicator Dot */}
      {isActive && (
        <VStack
          position="absolute"
          bottom="-1"
          h="1"
          w="1"
          rounded="full"
          bg="gold"
          _internalClassName="shadow-[0_0_5px_var(--color-game-gold)]"
        />
      )}
    </Link>
  )
}
