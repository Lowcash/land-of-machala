import { ItemType } from '@prisma/client'

export function getConsumableEffects(item: {
  type: ItemType
  healing: number | null
  manaRestore: number | null
}) {
  if (item.type !== ItemType.CONSUMABLE) {
    throw new Error('Item is not consumable')
  }

  return {
    healing: item.healing ?? 0,
    manaRestore: item.manaRestore ?? 0,
  }
}

export function canEquipItem(item: { slot: string | null }) {
  return !!item.slot
}

export function calculateSellValue(item: { value: number }) {
  return Math.floor(item.value * 0.5)
}

export const DUMMY_INVENTORY = [
  {
    id: 'dummy-1',
    name: 'Rezavý meč',
    type: ItemType.WEAPON,
    rarity: 'COMMON' as const,
    iconName: 'sword',
    slot: 'main_hand',
    equipped: true,
    value: 10,
    level: 1,
    description: 'Starý orezlý meč, ale lepší než nic.',
    quantity: 1,
    attack: 5,
  },
  {
    id: 'dummy-2',
    name: 'Léčivý lektvar',
    type: ItemType.CONSUMABLE,
    rarity: 'COMMON' as const,
    iconName: 'flask',
    slot: null,
    equipped: false,
    value: 5,
    level: 1,
    description: 'Obnoví 20 životů.',
    quantity: 3,
    healing: 20,
  },
]
