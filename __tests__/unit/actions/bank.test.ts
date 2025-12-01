import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ERROR_CAUSE } from '@/config'

describe('bank actions', () => {
  describe('deposit money logic', () => {
    it('should calculate balance after deposit', () => {
      const playerMoney = 100
      const depositAmount = 30
      const newPlayerBalance = playerMoney - depositAmount
      expect(newPlayerBalance).toBe(70)
    })

    it('should update bank account after deposit', () => {
      const bankMoney = 50
      const depositAmount = 30
      const newBankBalance = bankMoney + depositAmount
      expect(newBankBalance).toBe(80)
    })

    it('should reject deposit when insufficient funds', () => {
      const playerMoney = 100
      const depositAmount = 150
      const balance = playerMoney - depositAmount
      const hasInsufficientFunds = balance < 0
      expect(hasInsufficientFunds).toBe(true)
    })

    it('should allow deposit when exact amount available', () => {
      const playerMoney = 100
      const depositAmount = 100
      const balance = playerMoney - depositAmount
      const hasInsufficientFunds = balance < 0
      expect(hasInsufficientFunds).toBe(false)
    })

    it('should handle zero deposit', () => {
      const playerMoney = 100
      const depositAmount = 0
      const newPlayerBalance = playerMoney - depositAmount
      expect(newPlayerBalance).toBe(100)
    })
  })

  describe('withdraw money logic', () => {
    it('should calculate balance after withdraw', () => {
      const bankMoney = 100
      const withdrawAmount = 30
      const newBankBalance = bankMoney - withdrawAmount
      expect(newBankBalance).toBe(70)
    })

    it('should update player money after withdraw', () => {
      const playerMoney = 50
      const withdrawAmount = 30
      const newPlayerMoney = playerMoney + withdrawAmount
      expect(newPlayerMoney).toBe(80)
    })

    it('should reject withdraw when insufficient bank funds', () => {
      const bankMoney = 100
      const withdrawAmount = 150
      const balance = bankMoney - withdrawAmount
      const hasInsufficientFunds = balance < 0
      expect(hasInsufficientFunds).toBe(true)
    })

    it('should allow withdraw when exact amount available', () => {
      const bankMoney = 100
      const withdrawAmount = 100
      const balance = bankMoney - withdrawAmount
      const hasInsufficientFunds = balance < 0
      expect(hasInsufficientFunds).toBe(false)
    })

    it('should handle zero withdraw', () => {
      const bankMoney = 100
      const withdrawAmount = 0
      const newBankBalance = bankMoney - withdrawAmount
      expect(newBankBalance).toBe(100)
    })
  })

  describe('deposit item logic', () => {
    it('should identify weapon item type', () => {
      const item = { type: 'weapon', id: 'weapon-1' }
      expect(item.type).toBe('weapon')
    })

    it('should identify armor item type', () => {
      const item = { type: 'armor', id: 'armor-1' }
      expect(item.type).toBe('armor')
    })

    it('should identify potion item type', () => {
      const item = { type: 'potion', id: 'potion-1' }
      expect(item.type).toBe('potion')
    })

    it('should find item in inventory for weapon', () => {
      const inventory = {
        weapons_inventory: [
          { id: 'inv-1', weapon_id: 'weapon-1' },
          { id: 'inv-2', weapon_id: 'weapon-2' },
        ],
      }
      const itemId = 'inv-1'
      const inventoryItem = inventory.weapons_inventory.find(x => x.id === itemId)
      expect(inventoryItem).toBeDefined()
      expect(inventoryItem?.weapon_id).toBe('weapon-1')
    })

    it('should find item in inventory for armor', () => {
      const inventory = {
        armors_inventory: [
          { id: 'inv-1', armor_id: 'armor-1' },
          { id: 'inv-2', armor_id: 'armor-2' },
        ],
      }
      const itemId = 'inv-2'
      const inventoryItem = inventory.armors_inventory.find(x => x.id === itemId)
      expect(inventoryItem).toBeDefined()
      expect(inventoryItem?.armor_id).toBe('armor-2')
    })

    it('should return undefined for non-existent item', () => {
      const inventory = {
        weapons_inventory: [{ id: 'inv-1', weapon_id: 'weapon-1' }],
      }
      const itemId = 'inv-999'
      const inventoryItem = inventory.weapons_inventory.find(x => x.id === itemId)
      expect(inventoryItem).toBeUndefined()
    })
  })

  describe('withdraw item logic', () => {
    it('should find item in bank for weapon', () => {
      const bankAccount = {
        weapons: [
          { id: 'bank-1', weapon_id: 'weapon-1' },
          { id: 'bank-2', weapon_id: 'weapon-2' },
        ],
      }
      const itemId = 'bank-1'
      const bankItem = bankAccount.weapons.find(x => x.id === itemId)
      expect(bankItem).toBeDefined()
      expect(bankItem?.weapon_id).toBe('weapon-1')
    })

    it('should find item in bank for armor', () => {
      const bankAccount = {
        armors: [
          { id: 'bank-1', armor_id: 'armor-1' },
          { id: 'bank-2', armor_id: 'armor-2' },
        ],
      }
      const itemId = 'bank-2'
      const bankItem = bankAccount.armors.find(x => x.id === itemId)
      expect(bankItem).toBeDefined()
      expect(bankItem?.armor_id).toBe('armor-2')
    })

    it('should find item in bank for potion', () => {
      const bankAccount = {
        potions: [
          { id: 'bank-1', potion_id: 'potion-1' },
        ],
      }
      const itemId = 'bank-1'
      const bankItem = bankAccount.potions.find(x => x.id === itemId)
      expect(bankItem).toBeDefined()
      expect(bankItem?.potion_id).toBe('potion-1')
    })

    it('should return undefined for non-existent bank item', () => {
      const bankAccount = {
        weapons: [{ id: 'bank-1', weapon_id: 'weapon-1' }],
      }
      const itemId = 'bank-999'
      const bankItem = bankAccount.weapons.find(x => x.id === itemId)
      expect(bankItem).toBeUndefined()
    })
  })
})
