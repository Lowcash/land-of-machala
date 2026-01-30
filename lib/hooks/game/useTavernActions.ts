'use client'

import { buyDrinkAction, buyRumorAction, buyStayAction } from '@/lib/actions/tavern'
import { useServerAction } from '@/lib/hooks/ui/useServerAction'

interface UseTavernActionsProps {
  gold: number
  onInfoAction: (text: string | null) => void
}

export function useTavernActions({ gold, onInfoAction }: UseTavernActionsProps) {
  const { execute, isPending } = useServerAction({
    shouldRefresh: true,
  })

  const handleRumors = () => {
    if (gold < 5) {
      onInfoAction('Nemáš dost zlata na drink pro štamgasta! (5g)')
      return
    }

    execute(async () => {
      const result = await buyRumorAction()
      const [data] = result
      if (data?.success) {
        const rumor = (data as { rumor?: string }).rumor || ''
        onInfoAction(`${data.message} ${rumor}`)
      }
      return result
    })
  }

  const handleStay = () => {
    if (gold < 10) {
      onInfoAction('Nemáš dost zlata na pokoj! (10g)')
      return
    }

    execute(async () => {
      const result = await buyStayAction()
      if (result[0]?.success) {
        onInfoAction(result[0].message || 'Odpočinul sis.')
      }
      return result
    })
  }

  const handleDrink = () => {
    if (gold < 5) {
      onInfoAction('Nemáš dost zlata na pivo! (5g)')
      return
    }

    execute(async () => {
      const result = await buyDrinkAction()
      if (result[0]?.success) {
        onInfoAction(result[0].message || 'Dal sis pivo.')
      }
      return result
    })
  }

  return {
    handleRumors,
    handleStay,
    handleDrink,
    isPending,
  }
}
