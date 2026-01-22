import { createCharacter } from '@/entity/character'
import { addItem, equipInventoryItem, getInventory, unequipInventoryItem } from '@/entity/inventory'
import { prisma } from '@/lib/db'
import { CharacterClass, CharacterRace, EquipmentSlot, ItemType } from '@prisma/client'

async function main() {
  console.log('Starting Inventory Logic Test...')

  // 1. Setup: Create User and Character
  const testUserId = 'test-user-inventory-' + Date.now()
  const user = await prisma.user.create({
    data: {
      id: testUserId,
      email: `test-inventory-${Date.now()}@example.com`,
      username: `InvTester${Date.now()}`,
      passwordHash: 'hash',
    },
  })

  const character = await createCharacter({
    userId: user.id,
    name: 'InvTester',
    race: CharacterRace.HUMAN,
    class: CharacterClass.WARRIOR,
  })

  console.log(`Created character: ${character.name} (${character.id})`)

  // 2. Create Items
  const sword = await prisma.item.create({
    data: {
      name: 'Test Sword',
      type: ItemType.WEAPON,
      slot: EquipmentSlot.WEAPON,
      strength: 5,
      iconName: 'sword',
    },
  })

  const shield = await prisma.item.create({
    data: {
      name: 'Test Shield',
      type: ItemType.ARMOR,
      slot: EquipmentSlot.OFFHAND,
      stamina: 5,
      iconName: 'shield',
    },
  })

  const potion = await prisma.item.create({
    data: {
      name: 'Health Potion',
      type: ItemType.CONSUMABLE,
      healing: 20,
      iconName: 'heart',
    },
  })

  console.log('Created test items')

  // 3. Add Items to Inventory
  await addItem(character.id, sword.id, 1)
  await addItem(character.id, shield.id, 1)
  await addItem(character.id, potion.id, 5)

  let inventory = await getInventory(character.id)
  console.log(`Inventory size: ${inventory.length}`)
  if (inventory.length !== 3) throw new Error('Inventory size mismatch')

  // 4. Test Equip
  const swordInvItem = inventory.find((i) => i.itemId === sword.id)
  if (!swordInvItem) throw new Error('Sword not found in inventory')

  console.log('Equipping sword...')
  await equipInventoryItem(character.id, swordInvItem.id)

  inventory = await getInventory(character.id)
  const equippedSword = inventory.find((i) => i.itemId === sword.id)
  if (!equippedSword?.equipped) throw new Error('Sword failed to equip')
  console.log('Sword equipped successfully')

  // 5. Test Unequip
  console.log('Unequipping sword...')
  await unequipInventoryItem(character.id, equippedSword.id)

  inventory = await getInventory(character.id)
  const unequippedSword = inventory.find((i) => i.itemId === sword.id)
  if (unequippedSword?.equipped) throw new Error('Sword failed to unequip')
  console.log('Sword unequipped successfully')

  // 6. Test Stacking Logic (Equip from stack)
  // Add another sword to make a stack of 2 (if logic allows, but currently addItem stacks unequipped)
  await addItem(character.id, sword.id, 1)
  inventory = await getInventory(character.id)
  const swordStack = inventory.find((i) => i.itemId === sword.id)
  console.log(`Sword stack quantity: ${swordStack?.quantity}`)

  if (swordStack && swordStack.quantity === 2) {
    console.log('Equipping from stack...')
    await equipInventoryItem(character.id, swordStack.id)

    inventory = await getInventory(character.id)
    const equippedSwords = inventory.filter((i) => i.itemId === sword.id && i.equipped)
    const unequippedSwords = inventory.filter((i) => i.itemId === sword.id && !i.equipped)

    console.log(`Equipped swords: ${equippedSwords.length}`)
    console.log(`Unequipped swords: ${unequippedSwords.length}`)
    console.log(`Unequipped quantity: ${unequippedSwords[0]?.quantity}`)

    if (equippedSwords.length !== 1 || unequippedSwords[0]?.quantity !== 1) {
      throw new Error('Stack splitting logic failed')
    }
    console.log('Stack splitting worked correctly')
  }

  // Cleanup
  await prisma.user.delete({ where: { id: user.id } })
  await prisma.item.delete({ where: { id: sword.id } })
  await prisma.item.delete({ where: { id: shield.id } })
  await prisma.item.delete({ where: { id: potion.id } })

  console.log('Test completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
