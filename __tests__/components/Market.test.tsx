import { fireEvent, render, screen } from '@testing-library/react'
import { Shield, Sword } from 'lucide-react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { MarketItem } from '@/lib/types/market'

import { BlackMarket } from '@/components/features/Game/Locations/Market/MarketBlackMarket'
import { MarketBuy } from '@/components/features/Game/Locations/Market/MarketBuy'
import { MarketSell } from '@/components/features/Game/Locations/Market/MarketSell'

// Mock icons
vi.mock('lucide-react', async () => {
  const actual = await vi.importActual('lucide-react')
  return {
    ...(actual as object),
    Sword: (props: object) => <div data-testid="icon-sword" {...props} />,
    Shield: (props: object) => <div data-testid="icon-shield" {...props} />,
  }
})

describe('Market Components', () => {
  const mockStock = [
    {
      id: 1,
      name: 'Test Sword',
      price: 100,
      type: 'weapon',
      icon: Sword,
      description: 'desc',
      attack: 10,
      rarity: 'common',
    },
  ]
  const mockInventory = [
    {
      id: 2,
      name: 'My Shield',
      price: 50,
      type: 'armor',
      icon: Shield,
      description: 'desc',
      equipped: false,
      quantity: 1,
      rarity: 'common',
      defense: 5,
    },
  ]

  const mockHandleBuy = vi.fn()
  const mockHandleSell = vi.fn()
  const mockHandleHaggle = vi.fn()
  const mockGetPrice = vi.fn((item, buying) => (buying ? item.price : item.price / 2))

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('MarketBuy', () => {
    it('renders stock items correctly', () => {
      render(
        <MarketBuy
          stock={mockStock as unknown as MarketItem[]}
          handleBuy={mockHandleBuy}
          handleHaggle={mockHandleHaggle}
          getPrice={mockGetPrice}
          haggledItems={{}}
        />
      )

      expect(screen.getByText('Test Sword')).toBeDefined()
      expect(screen.getByText('100g')).toBeDefined()
    })

    it('calls handleBuy when clicked', () => {
      render(
        <MarketBuy
          stock={mockStock as unknown as MarketItem[]}
          handleBuy={mockHandleBuy}
          handleHaggle={mockHandleHaggle}
          getPrice={mockGetPrice}
          haggledItems={{}}
        />
      )

      fireEvent.click(screen.getByText('Test Sword').closest('div')!)
      expect(mockHandleBuy).toHaveBeenCalledWith(mockStock[0])
    })
  })

  describe('MarketSell', () => {
    it('renders inventory items correctly', () => {
      render(
        <MarketSell
          inventory={mockInventory as unknown as MarketItem[]}
          handleSell={mockHandleSell}
          handleHaggle={mockHandleHaggle}
          getPrice={mockGetPrice}
          haggledItems={{}}
        />
      )

      expect(screen.getByText('My Shield')).toBeDefined()
      expect(screen.getByText('25g')).toBeDefined() // 50 / 2
    })
  })

  describe('BlackMarket', () => {
    it('renders black market items', () => {
      const bmStock = [
        { id: 3, name: 'Poison', price: 666, icon: Sword, type: 'misc', description: 'Deadly' },
      ]
      render(<BlackMarket stock={bmStock as unknown as MarketItem[]} handleBuy={mockHandleBuy} />)
      expect(screen.getByText('Poison')).toBeDefined()
      expect(screen.getByText('666g')).toBeDefined()
    })
  })
})
