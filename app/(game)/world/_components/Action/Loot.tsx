'use client'

import { useGameInfoShowQuery, useGameLootMutation } from '@/hooks/api/use-game'

import * as S from './styles'
import { Button } from '@/components/ui/button'

export default function Loot() {
  const gameInfoShowQuery = useGameInfoShowQuery()

  const lootMutation = useGameLootMutation()

  const handleLoot = () => lootMutation.mutate()

  return (
    <S.Action>
      <Button variant='destructive' onClick={handleLoot}>
        {gameInfoShowQuery.data?.text?.loot ?? 'game_loot'}
      </Button>
    </S.Action>
  )
}
