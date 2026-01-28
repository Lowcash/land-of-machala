'use client'

import { useState } from 'react'

import type { HaggleState, MarketItem } from '@/lib/types/market'

interface UseHaggleProps {
  setInfoText: (text: string) => void
  showMessage: (msg: string) => void
}

export function useHaggle({ setInfoText, showMessage }: UseHaggleProps) {
  const [haggledItems, setHaggledItems] = useState<Record<number, HaggleState>>({})

  const getPrice = (item: MarketItem, buying: boolean) => {
    const basePrice = buying ? item.price : Math.floor(item.price * 0.5)
    const haggle = haggledItems[item.id]
    if (haggle) return haggle.price
    return basePrice
  }

  const handleHaggle = (item: MarketItem, buying: boolean, e: React.MouseEvent) => {
    e.stopPropagation()

    if (haggledItems[item.id]) return

    // Base chance 40% + random factor.
    const roll = Math.random()
    const success = roll > 0.4

    const currentPrice = getPrice(item, buying)
    let newPrice = currentPrice

    if (success) {
      // Buying: Lower price. Selling: Higher price.
      const factor = buying ? 0.8 : 1.2
      newPrice = Math.floor(currentPrice * factor)
      setInfoText(buying ? 'Uspěls! Cena šla dolů.' : 'Skvělé! Zaplatí víc.')
      showMessage('Úspěšné smlouvání!')
    } else {
      // Buying: Higher price (annoyed). Selling: Lower price (lowball).
      const factor = buying ? 1.15 : 0.85
      newPrice = Math.floor(currentPrice * factor)
      setInfoText("Obchodník se naštval. 'Tohle je moje poslední nabídka!'")
      showMessage('Neúspěch!')
    }

    setHaggledItems((prev) => ({
      ...prev,
      [item.id]: { price: newPrice, success, attempted: true },
    }))
  }

  return {
    haggledItems,
    getPrice,
    handleHaggle,
  }
}
