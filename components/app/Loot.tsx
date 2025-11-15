'use client'

import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useGameShowInfoQuery, useGameLootMutation } from '@/hooks/api/use-game'

import { Detail, Hero } from '@/styles/common'
import Info from '@/components/app/Info'
import CharacterPlayer from '@/components/app/CharacterPlayer'
import Decision, { type DecisionSelectedEvent } from '@/components/app/Decision'

const DECISION = {
  LEAVE: 'leave',
} as const

export default function Loot() {
  const commonShowQuery = useCommonShowQuery()
  const gameShowInfoQuery = useGameShowInfoQuery()

  const lootMutation = useGameLootMutation()

  const armors = gameShowInfoQuery.data?.loot?.armors_loot?.map((x) => x.text.reward).filter((x) => !!x)
  const weapons = gameShowInfoQuery.data?.loot?.weapons_loot?.map((x) => x.text.reward).filter((x) => !!x)

  const itemsLoot = [armors, weapons].flat().filter((x): x is string => !!x)

  const handleDecisionSelected: DecisionSelectedEvent = (decision) => {
    switch (decision?.key) {
      case DECISION.LEAVE:
        // p.onBankLeave?.()
        break
    }

    lootMutation.mutate()
  }

  return (
    <>
      <Hero>
        <CharacterPlayer />
      </Hero>
      <Detail>
        <Info
          headers={[gameShowInfoQuery.data?.loot?.text?.loot_found ?? 'game_loot_found']}
          descriptions={[
            itemsLoot.join(', '),
            gameShowInfoQuery.data?.loot?.text?.reward_money ?? 'game_reward_money',
            gameShowInfoQuery.data?.loot?.text?.reward_xp ?? 'game_reward_xp',
          ]}
        />
        <Decision
          top={[{ key: DECISION.LEAVE, text: commonShowQuery.data?.text.leave ?? 'loot_leave' }]}
          bottom={itemsLoot.map((x) => ({
            key: x,
            text: `${gameShowInfoQuery.data?.loot?.text?.loot ?? 'loot_loot_action'} ${x}`,
          }))}
          onDecisionSelected={handleDecisionSelected}
        />
      </Detail>
    </>
  )
}
