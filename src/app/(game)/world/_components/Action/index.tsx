import { getGameInfo } from '@/server/actions/game'

import { Card } from '@/styles/common-server'
import Enemy from './Enemy'
import Loot from './Loot'

export default async function Action() {
  const infoQuery = (await getGameInfo()) as any

  const hasEnemy = !!infoQuery?.enemy_instance
  const hasLoot = !!infoQuery?.loot

  if (!hasEnemy && !hasLoot) return <></>

  return (
    <Card>
      <div className='flex justify-between'>
        {hasEnemy && <Enemy />}
        {hasLoot && <Loot />}
      </div>
    </Card>
  )
}
