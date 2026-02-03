'use client'

import { toast } from 'sonner'

import { performUseItemAction } from '@/lib/actions/combat'
import { getIconFromName } from '@/lib/icons'
import type { CharacterItem } from '@/lib/types/game'

import { ActionGrid, ActionItem } from '@/components/ui/action'
import { VStack } from '@/components/ui/stack'
import { Label, MutedText } from '@/components/ui/typography'

interface CombatPotionsProps {
  potions: CharacterItem[]
  isPending: boolean
}

export function CombatPotions({ potions, isPending }: CombatPotionsProps) {
  // 1. Hooks - None currently

  // 2. Navigation State - None currently

  // 3. Handlers
  const handleUsePotion = async (id: string, name: string) => {
    const [, err] = await performUseItemAction({
      itemId: id,
    })

    if (!err) {
      toast.success(`${name} použit`)
    } else {
      toast.error(err.message)
    }
  }

  // 4. Sub-components (Render helpers)
  const PotionItem = ({ potion }: { potion: CharacterItem }) => {
    const Icon = getIconFromName(potion.iconName || 'potion')
    return (
      <ActionItem
        key={potion.id}
        label={potion.name}
        icon={Icon}
        onClick={() => handleUsePotion(potion.id, potion.name)}
        variant="success"
        disabled={isPending}
        layout="row"
      />
    )
  }

  return (
    <VStack gap="xs">
      <Label color="muted" bold>
        Lektvary ({potions.length})
      </Label>
      <ActionGrid columns={{ default: 2 }}>
        {potions.map((potion) => (
          <PotionItem key={potion.id} potion={potion} />
        ))}
      </ActionGrid>
      {potions.length === 0 && <MutedText italic>Žádné lektvary k dispozici</MutedText>}
    </VStack>
  )
}
