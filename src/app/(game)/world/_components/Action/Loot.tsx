'use client'

import { useGameInfoQuery, useLootMutation } from '@/hooks/api/useGame'

import * as S from './index.styles'
import { Button } from '@/components/ui/button'

export default function Loot() {
  const gameInfo = useGameInfoQuery()

  const lootMutation = useLootMutation()

  const handleLoot = () => lootMutation.mutate()

  // @ts-ignore
  if (!gameInfo.data?.loot) return <></>

  return (
    <S.Action>
      <Button variant='destructive' onClick={handleLoot}>
        Loot
      </Button>
    </S.Action>
  )
}
