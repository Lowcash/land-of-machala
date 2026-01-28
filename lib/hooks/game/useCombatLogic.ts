'use client'

import { useState, useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import { performCombatActionAction } from '@/lib/actions/combat'
import { endCombat } from '@/lib/actions/combat-state'
import { useActivityLog } from '@/lib/hooks/game/useActivityLog'
import type { CharacterData, CharacterItem } from '@/lib/types/game'

interface UseCombatLogicProps {
  character: CharacterData & {
    combatPlayerHp?: number
    combatEnemyHp?: number
    combatEnemyId?: string
    currentEnemy?: {
      name: string
      level: number
      maxHp: number
      [key: string]: unknown
    }
  }
  initialInventory: CharacterItem[]
}

export function useCombatLogic({ character, initialInventory }: UseCombatLogicProps) {
  const router = useRouter()
  const [playerHp, setPlayerHp] = useState(character.combatPlayerHp || character.hp)
  const [playerMana] = useState(character.mana)
  const [enemyHp, setEnemyHp] = useState(character.combatEnemyHp || 100)
  const [isPending, startTransition] = useTransition()

  const { logs } = useActivityLog(character.id as string, 2000)

  const enemy = {
    name: 'Nepřítel',
    level: character.level,
    maxHp: 100,
    ...character.currentEnemy,
  }

  const [inventory] = useState(initialInventory)
  const potions = inventory.filter((i) => i.type?.toUpperCase() === 'CONSUMABLE')

  const handleAction = async (action: 'attack' | 'defend' | 'special' | 'flee') => {
    startTransition(async () => {
      try {
        if (action === 'flee') {
          const [data] = await endCombat({ result: 'flee' })
          if (data?.success) {
            router.push('/game')
          } else {
            toast.error('Útěk se nezdařil!')
          }
          return
        }

        const [data, err] = await performCombatActionAction({
          enemyId: character.combatEnemyId || 'enemy',
          enemyCurrentHp: enemyHp,
          action,
        })

        if (err) {
          toast.error(err.message)
          return
        }

        if (data) {
          setPlayerHp(data.playerHp || 0)
          setEnemyHp(data.enemyHp || 0)

          if (data.result === 'victory') {
            await endCombat({ result: 'victory' })
            toast.success('Vítězství!')
            router.push('/game')
          } else if (data.result === 'defeat') {
            await endCombat({ result: 'defeat' })
            toast.error('Porážka!')
            router.push('/game')
          }
        }
      } catch (error) {
        console.error('Combat error:', error)
      }
    })
  }

  return {
    playerHp,
    playerMana,
    enemyHp,
    enemy,
    logs,
    potions,
    isPending,
    handleAction,
  }
}
