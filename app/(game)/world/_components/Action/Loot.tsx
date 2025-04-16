'use client'

import { loc } from '@/lib/localization'
import { useGameLootMutation } from '@/hooks/api/use-game'

import * as S from './styles'
import { Button } from '@/components/ui/button'

export default function Loot() {
  const lootMutation = useGameLootMutation()

  const handleLoot = () => lootMutation.mutate()

  return (
    <S.Action>
      <Button variant='destructive' onClick={handleLoot}>
        {loc.loot.header}
      </Button>
    </S.Action>
  )
}
