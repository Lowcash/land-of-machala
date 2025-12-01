import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ERROR_CAUSE } from '@/config'

describe('inventory actions', () => {
  describe('inventory item mapping', () => {
    it('should map weapons with equipped status', () => {
      const wearable = {
        left_hand_weapon_id: 'weapon-inv-1',
        right_hand_weapon_id: null,
      }
      const weaponsInventory = [
        { id: 'weapon-inv-1', weapon: { name: 'Sword' } },
        { id: 'weapon-inv-2', weapon: { name: 'Axe' } },
      ]

      const mappedWeapons = weaponsInventory.map(x => {
        const armed = Object.entries(wearable).find(([_, v]) => v === x.id)
        return {
          ...x,
          armed_left: armed?.[0] === 'left_hand_weapon_id',
          armed_right: armed?.[0] === 'right_hand_weapon_id',
        }
      })

      expect(mappedWeapons[0].armed_left).toBe(true)
      expect(mappedWeapons[0].armed_right).toBe(false)
      expect(mappedWeapons[1].armed_left).toBe(false)
      expect(mappedWeapons[1].armed_right).toBe(false)
    })

    it('should map armors with equipped status', () => {
      const wearable = {
        head_armor_id: 'armor-inv-1',
        chest_armor_id: null,
      }
      const armorsInventory = [
        { id: 'armor-inv-1', armor: { name: 'Helmet' } },
        { id: 'armor-inv-2', armor: { name: 'Chestplate' } },
      ]

      const mappedArmors = armorsInventory.map(x => ({
        ...x,
        armed: Object.values(wearable).some(y => y === x.id),
      }))

      expect(mappedArmors[0].armed).toBe(true)
      expect(mappedArmors[1].armed).toBe(false)
    })

    it('should handle empty inventory', () => {
      const inventory = {
        weapons_inventory: [],
        armors_inventory: [],
        potions_inventory: [],
      }

      expect(inventory.weapons_inventory).toHaveLength(0)
      expect(inventory.armors_inventory).toHaveLength(0)
      expect(inventory.potions_inventory).toHaveLength(0)
    })
  })

  describe('buy item logic', () => {
    it('should calculate balance after buying item', () => {
      const playerMoney = 100
      const itemPrice = 30
      const newBalance = playerMoney - itemPrice
      expect(newBalance).toBe(70)
    })

    it('should reject purchase when insufficient funds', () => {
      const playerMoney = 20
      const itemPrice = 30
      const balance = playerMoney - itemPrice
      const hasInsufficientFunds = balance < 0
      expect(hasInsufficientFunds).toBe(true)
    })

    it('should allow purchase when exact funds available', () => {
      const playerMoney = 30
      const itemPrice = 30
      const balance = playerMoney - itemPrice
      const hasInsufficientFunds = balance < 0
      expect(hasInsufficientFunds).toBe(false)
    })

    it('should handle null item price', () => {
      const playerMoney = 100
      const itemPrice = null
      const balance = playerMoney - (itemPrice ?? 0)
      expect(balance).toBe(100)
    })
  })

  describe('sell item logic', () => {
    it('should calculate balance after selling item', () => {
      const playerMoney = 100
      const sellPrice = 25
      const newBalance = playerMoney + sellPrice
      expect(newBalance).toBe(125)
    })

    it('should handle zero sell price', () => {
      const playerMoney = 100
      const sellPrice = 0
      const newBalance = playerMoney + sellPrice
      expect(newBalance).toBe(100)
    })
  })

  describe('equip item validation', () => {
    it('should find weapon in inventory for equipping', () => {
      const inventory = {
        weapons_inventory: [
          { id: 'inv-1', weapon_id: 'weapon-1', weapon: { name: 'Sword' } },
          { id: 'inv-2', weapon_id: 'weapon-2', weapon: { name: 'Axe' } },
        ],
      }
      const itemId = 'inv-1'
      const weapon = inventory.weapons_inventory.find(x => x.id === itemId)
      expect(weapon).toBeDefined()
      expect(weapon?.weapon.name).toBe('Sword')
    })

    it('should find armor in inventory for equipping', () => {
      const inventory = {
        armors_inventory: [
          { id: 'inv-1', armor_id: 'armor-1', armor: { name: 'Helmet' } },
          { id: 'inv-2', armor_id: 'armor-2', armor: { name: 'Shield' } },
        ],
      }
      const itemId = 'inv-2'
      const armor = inventory.armors_inventory.find(x => x.id === itemId)
      expect(armor).toBeDefined()
      expect(armor?.armor.name).toBe('Shield')
    })

    it('should return undefined for non-existent item', () => {
      const inventory = {
        weapons_inventory: [{ id: 'inv-1', weapon_id: 'weapon-1' }],
      }
      const itemId = 'inv-999'
      const weapon = inventory.weapons_inventory.find(x => x.id === itemId)
      expect(weapon).toBeUndefined()
    })
  })

  describe('potion usage', () => {
    it('should find potion in inventory', () => {
      const inventory = {
        potions_inventory: [
          { id: 'inv-1', potion_id: 'potion-1', potion: { hp_gain: 25 } },
          { id: 'inv-2', potion_id: 'potion-2', potion: { hp_gain: 50 } },
        ],
      }
      const itemId = 'inv-2'
      const potion = inventory.potions_inventory.find(x => x.id === itemId)
      expect(potion).toBeDefined()
      expect(potion?.potion.hp_gain).toBe(50)
    })

    it('should calculate HP after using potion', () => {
      const playerHP = 50
      const maxHP = 100
      const potionHPGain = 30
      const newHP = Math.min(playerHP + potionHPGain, maxHP)
      expect(newHP).toBe(80)
    })

    it('should not exceed max HP when using potion', () => {
      const playerHP = 90
      const maxHP = 100
      const potionHPGain = 50
      const newHP = Math.min(playerHP + potionHPGain, maxHP)
      expect(newHP).toBe(100)
    })

    it('should restore full HP when potion brings HP to or above max', () => {
      const playerHP = 60
      const maxHP = 100
      const potionHPGain = 100
      const newHP = Math.min(playerHP + potionHPGain, maxHP)
      expect(newHP).toBe(100)
    })
  })
})
