'use client'

import { useState, useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { Swords } from 'lucide-react'
import { toast } from 'sonner'

import { performCombatActionAction } from '@/lib/actions/combat'
import { endCombat } from '@/lib/actions/combat-state'
import { useActivityLog } from '@/lib/hooks/useActivityLog'

import { CharacterBox, GameActivityPanel, GameFooter, GameHeader } from '@/components/features/Game'
import { GameActions } from '@/components/features/Game/Shared/components/GameActions'
import { PageLayout } from '@/components/layout/PageLayout'

import type { CharacterData, CharacterItem } from '../Character/Shared/types'
import { CombatActions } from './CombatActions'
import { CombatPotions } from './CombatPotions'

interface CombatClientProps {
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
  inventory: CharacterItem[]
}

export function CombatClient({ character, inventory: initialInventory }: CombatClientProps) {
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

  const [inventory] = useState(initialInventory)
  const potions = inventory.filter((i) => i.type?.toUpperCase() === 'CONSUMABLE')

  return (
    <PageLayout
      header={<GameHeader title="Souboj" icon={Swords} />}
      footer={<GameFooter />}
      backgroundImage="/assets/locations/forest.jpg"
      rightPanel={
        <GameActivityPanel
          logs={logs}
          className="mx-3 h-[140px] shrink-0 rounded border border-[#d4a574]/50 bg-black/60 p-4 backdrop-blur-sm"
        />
      }
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="grid w-full grid-cols-1 gap-3 px-3 pt-3 md:grid-cols-2">
          <CharacterBox
            name={character.name}
            level={character.level}
            hp={playerHp ?? character.hp}
            hpMax={character.maxHp}
            mana={playerMana}
            manaMax={character.maxMana}
            stats={{
              strength: character.strength,
              intelligence: character.intelligence,
              agility: character.agility,
              stamina: character.stamina,
            }}
            isEnemy={false}
          />

          <CharacterBox
            name={enemy.name}
            level={enemy.level}
            hp={enemyHp ?? 100}
            hpMax={enemy.maxHp}
            mana={0}
            manaMax={100}
            stats={{
              strength: character.strength,
              intelligence: character.intelligence,
              agility: character.agility,
              stamina: 5,
            }}
            isEnemy={true}
            image="/assets/enemies/wolf.png"
          />
        </div>

        <div className="relative min-h-0 flex-1 px-3 pb-3">
          <GameActions
            showDirections={false}
            onToggleDirections={() => {}}
            exploration={<CombatPotions potions={potions} isPending={isPending} />}
          >
            <CombatActions onAction={handleAction} isPending={isPending} />
          </GameActions>
        </div>
      </div>
    </PageLayout>
  )
}
