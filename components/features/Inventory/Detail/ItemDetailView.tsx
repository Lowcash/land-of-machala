import { Brain, Droplet, Heart, type LucideIcon, Shield, Sword, Zap } from 'lucide-react'

import { ItemType } from '@/lib/types/game'

import { Card } from '@/components/ui/card'
import { DetailLayout, GameIcon, StatDisplay, StatGrid } from '@/components/ui/display'
import { VStack } from '@/components/ui/stack'
import { Caption, P } from '@/components/ui/typography'

import { getIconFromName } from '../Shared/inventoryUtils'
import type { InventoryItemUI } from '../Shared/types'
import { InventoryItemActions } from './InventoryItemActions'

interface ItemDetailViewProps {
  item: InventoryItemUI | null
  characterLevel?: number
}

export function ItemDetailView({ item, characterLevel = 1 }: ItemDetailViewProps) {
  if (!item) {
    return (
      <VStack fullHeight align="center" justify="center" p="xl">
        <P color="muted" italic align="center">
          Vyber si předmět pro zobrazení detailů...
        </P>
      </VStack>
    )
  }

  const isLevelMet = characterLevel >= item.level

  // 4. Sub-components (Stat rendering)
  const RenderStat = ({
    label,
    value,
    icon,
    color,
  }: {
    label: string
    value?: number
    icon: LucideIcon
    color?: 'gold' | 'danger' | 'cold' | 'magic' | 'nature' | 'success' | 'copper' | 'info'
  }) => {
    if (value == null || value <= 0) return null
    return (
      <StatDisplay
        icon={icon}
        label={label}
        value={`+${value}`}
        color={color || 'copper'}
        size="sm"
      />
    )
  }

  const rarityColorMap: Record<
    string,
    'gold' | 'copper' | 'danger' | 'info' | 'success' | 'magic'
  > = {
    LEGENDARY: 'gold',
    EPIC: 'magic',
    RARE: 'info',
    UNCOMMON: 'success',
    COMMON: 'copper',
  }

  const Icon = getIconFromName(item.iconName)

  return (
    <DetailLayout
      title={item.name}
      onClose="?"
      footer={
        <InventoryItemActions
          itemId={item.id}
          isEquipped={item.equipped}
          isConsumable={item.type === ItemType.CONSUMABLE}
        />
      }
    >
      <VStack gap="lg">
        <VStack align="center" gap="sm">
          <GameIcon
            icon={Icon}
            color={rarityColorMap[item.rarity] || 'copper'}
            size="lg"
            rounded="full"
            bgOpacity="30"
          />
          <Caption color="muted" bold uppercase letterSpacing="wider">
            {item.type}
          </Caption>
        </VStack>

        {/* Requirements */}
        {item.level > 1 && (
          <Card variant={isLevelMet ? 'muted' : 'danger'} fullWidth>
            <Card.Content p="xs">
              <Caption bold color={isLevelMet ? 'muted' : 'danger'} align="center">
                Požadovaný Level: {item.level} {!isLevelMet && '(Nedostatečný)'}
              </Caption>
            </Card.Content>
          </Card>
        )}

        {/* Stats */}
        <Card variant="muted" textured fullWidth>
          <Card.Content>
            <VStack gap="lg">
              <StatGrid columns="2">
                <RenderStat label="Útok" value={item.attack} icon={Sword} color="danger" />
                <RenderStat label="Obrana" value={item.defense} icon={Shield} color="cold" />
                <RenderStat label="Magie" value={item.magic} icon={Brain} color="magic" />
                <RenderStat label="Rychlost" value={item.speed} icon={Zap} color="nature" />
                <RenderStat label="Léčení" value={item.healing} icon={Heart} color="success" />
                <RenderStat label="Mana" value={item.mana} icon={Droplet} color="magic" />
              </StatGrid>
              <VStack gap="xs" pt="sm" border="game-t" align="center">
                <P color="copper" italic align="center">
                  &quot;{item.description || 'Tajemný předmět bez popisu.'}&quot;
                </P>
              </VStack>
            </VStack>
          </Card.Content>
        </Card>
      </VStack>
    </DetailLayout>
  )
}
