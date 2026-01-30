'use client'

import { useState } from 'react'

import { toast } from 'sonner'

import { rollDiceAction } from '@/lib/actions/game-actions'
import { useServerAction } from '@/lib/hooks/ui/useServerAction'

interface UseTavernGambleProps {
  gold: number
  onInfoAction: (text: string | null) => void
}

export function useTavernGamble({ gold, onInfoAction }: UseTavernGambleProps) {
  const { execute } = useServerAction({ shouldRefresh: true })

  const [betAmount, setBetAmount] = useState(10)
  const [diceResult, setDiceResult] = useState<{ player: number[]; house: number[] } | null>(null)
  const [gameState, setGameState] = useState<'idle' | 'rolling' | 'result'>('idle')

  const rollDice = () => {
    if (gold < betAmount) {
      onInfoAction('Nemáš dost zlata na sázku!')
      return
    }

    execute(async () => {
      setGameState('rolling')

      try {
        const [result, err] = await rollDiceAction({ betAmount })

        // Wait for "animation"
        await new Promise((r) => setTimeout(r, 600))

        if (err) {
          setGameState('idle')
          return [null, err] as const
        }

        if (result) {
          setDiceResult({ player: result.player, house: result.house })
          setGameState('result')

          if (result.result === 'win') {
            onInfoAction(`Vyhrál jsi ${result.goldChange}g!`)
            toast.success('Výhra!')
          } else if (result.result === 'lose') {
            onInfoAction(`Prohrál jsi ${Math.abs(result.goldChange)}g.`)
            toast.error('Prohra')
          } else {
            onInfoAction('Remíza! Sázka se vrací.')
          }

          return [{ success: true }, null] as const
        }

        setGameState('idle')
        return [null, new Error('Chyba hry')] as const
      } catch (error) {
        setGameState('idle')
        onInfoAction('Chyba při hře.')
        return [null, error instanceof Error ? error : new Error('Unknown')] as const
      }
    })
  }

  return {
    betAmount,
    setBetAmount,
    diceResult,
    gameState,
    rollDice,
  }
}
