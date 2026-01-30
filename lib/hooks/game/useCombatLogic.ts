'use client'

import { useState, useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import { performCombatActionAction } from '@/lib/actions/combat'
import { endCombat } from '@/lib/actions/combat-state'
import { useActivityLog } from '@/lib/hooks/game/useActivityLog'
import type { CharacterData, CharacterItem, UnlockedAchievement } from '@/lib/types/game'

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
  // 1. Hooks
  const router = useRouter()
  const [playerHp, setPlayerHp] = useState(character.combatPlayerHp || character.hp)
  const [playerMana] = useState(character.mana)
  const [enemyHp, setEnemyHp] = useState(character.combatEnemyHp || 100)
  const [isPending, startTransition] = useTransition()
  const { logs } = useActivityLog(character.id as string, 2000)
  const [effects, setEffects] = useState<string[]>([])

  // 1.5 Internal Helpers
  const triggerEffect = (effect: string) => {
    setEffects((prev) => [...prev, effect])
    setTimeout(() => {
      setEffects((prev) => prev.filter((e) => e !== effect))
    }, 2000)
  }

  // 2. Derived Values
  const enemy = {
    name: 'Nepřítel',
    level: character.level,
    maxHp: 100,
    ...character.currentEnemy,
  }

  const potions = initialInventory.filter((i) => i.type?.toUpperCase() === 'CONSUMABLE')

  // 3. Handlers
  const handleVictory = async (rewards?: { xp: number; gold: number }) => {
    await endCombat({ result: 'victory', rewards })
    toast.success('Vítězství!', {
      description: `Získal jsi ${rewards?.xp} XP a ${rewards?.gold} Zlata`,
      className: 'border-green-500 bg-green-900/90 text-green-100',
    })
    router.push('/game')
  }

  const handleDefeat = async () => {
    await endCombat({ result: 'defeat' })
    toast.error('Porážka!')
    router.push('/game')
  }

  const handleFlee = async () => {
    const [data] = await endCombat({ result: 'flee' })
    if (data?.success) {
      router.push('/game')
    } else {
      toast.error('Útěk se nezdařil!')
    }
  }

  const handleAction = async (action: 'attack' | 'defend' | 'special' | 'flee') => {
    startTransition(async () => {
      try {
        if (action === 'flee') {
          await handleFlee()
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

          // Trigger visual effects based on data
          if (data.playerCrit) triggerEffect('player-crit')
          if (data.enemyCrit) triggerEffect('enemy-crit')
          if (data.playerDodged) triggerEffect('player-dodge')
          if (data.enemyDodged) triggerEffect('enemy-dodge')

          // Process achievements
          data.achievements?.forEach((achievement: UnlockedAchievement) => {
            toast.success(`Achievement Unlocked: ${achievement.title}!`, {
              description: achievement.rewards?.title || 'Gratulujeme!',
            })
          })

          // Process Level Up
          if (data.levelUp) {
            toast.success(`LEVEL UP! Úroveň ${data.newLevel}`, {
              description: 'Tvé schopnosti se zlepšily!',
              duration: 8000,
              className: 'border-2 border-yellow-500 bg-yellow-900/90 text-yellow-100',
            })
          }

          // Process Results
          if (data.result === 'victory') {
            await handleVictory(data.rewards)
          } else if (data.result === 'defeat') {
            await handleDefeat()
          }
        }
      } catch (error) {
        toast.error('Během souboje došlo k chybě.')
        console.error('Combat error:', error)
      }
    })
  }

  // 4. Return
  return {
    playerHp,
    playerMana,
    enemyHp,
    enemy,
    logs,
    potions,
    isPending,
    handleAction,
    effects,
  }
}
