'use client'

import i18next from '@/lib/i18n'
import { useGameLootMutation } from '@/hooks/api/use-game'

import * as S from './styles'
import { Button } from '@/components/ui/button'

export default function Loot() {
  const lootMutation = useGameLootMutation()

  const handleLoot = () => lootMutation.mutate()

  return (
    <S.Action>
      <Button variant='destructive' onClick={handleLoot}>
        {i18next.t('loot.header')}
      </Button>
    </S.Action>
  )
}
