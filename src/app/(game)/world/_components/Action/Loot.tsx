'use client'

import { loc } from '@/local'
import { useInfoQuery, useLootMutation } from '@/hooks/api/useGame'

import * as S from './styles'
import { Button } from '@/components/ui/button'

export default function Loot() {
  const gameInfo = useInfoQuery()

  const lootMutation = useLootMutation()

  const handleLoot = () => lootMutation.mutate()

  if (!gameInfo.data?.loot) return <></>

  return (
    <S.Action>
      <Button variant='destructive' onClick={handleLoot}>
        {loc.loot.header}
      </Button>
    </S.Action>
  )
}
