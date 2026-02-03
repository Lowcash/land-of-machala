import { headers } from 'next/headers'

import { GAME_NAV_ITEMS } from '@/lib/game/views'

import { HStack, VStack } from '@/components/ui/stack'

import { FooterNavItem } from './FooterNavItem'

export async function GameFooter() {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/'

  return (
    <VStack fullWidth py="sm">
      <HStack justify="between" px="md" _internalClassName="mx-auto max-w-lg" fullWidth>
        {GAME_NAV_ITEMS.map((item) => (
          <FooterNavItem
            key={item.id}
            id={item.id}
            path={item.path}
            label={item.label}
            icon={item.icon}
            isActive={pathname === item.path}
          />
        ))}
      </HStack>
    </VStack>
  )
}
