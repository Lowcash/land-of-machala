'use client'

import { ActionBtn } from '@/components/features/Game/ActionBtn'
import { CharacterBox } from '@/components/features/Game/CharacterBox'
import { GamePanel } from '@/components/features/Game/GameLayout'
import { PageTemplate } from '@/components/layout'
import { InfoLogPanel } from '@/components/layout/InfoLogPanel'
import { useCombatItemAction as combatItemAction, performCombatActionAction } from '@/lib/actions/combat'
import { endCombat } from '@/lib/actions/combat-state'
import { useActivityLog } from '@/lib/hooks/useActivityLog'
import { getIconFromName } from '@/lib/icons'
import {
    ArrowLeft,
    Shield,
    Sparkles,
    Swords,
    Target,
    Zap
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'; // Assuming sonner is used for toasts, or use window.alert/console

interface CombatClientProps {
  character: any
  inventory: any[]
}

export function CombatClient({ character, inventory: initialInventory }: CombatClientProps) {
  const router = useRouter()
  const [playerHp, setPlayerHp] = useState(character.combatPlayerHp || character.hp)
  const [playerMana] = useState(character.mana)
  const [enemyHp, setEnemyHp] = useState(character.combatEnemyHp || 100)
  const [isPending, startTransition] = useTransition()
  
  // Use activity log hook
  const { logs } = useActivityLog(character.id, 2000)

  const enemy = {
    name: 'Nepřítel',
    level: character.level, 
    maxHp: character.combatEnemyHp ? 100 : 100, // Should be passed safely
    ...character.currentEnemy 
  }

  const handleAction = async (action: 'attack' | 'defend' | 'special' | 'flee', _type?: string) => {
    startTransition(async () => {
      try {
        if (action === 'flee') {
           const result = await endCombat(character.id, 'flee')
           if (result?.success) {
             router.push('/game')
           } else {
             toast.error('Útěk se nezdařil!')
           }
           return
        }

        const [data, err] = await performCombatActionAction({
          characterId: character.id,
          enemyId: character.combatEnemyId || 'enemy',
          enemyCurrentHp: enemyHp,
          action: action as any
        })

        if (err) {
          toast.error(err.message)
          return
        }

        if (data) {
          setPlayerHp(data.playerHp)
          setEnemyHp(data.enemyHp)
          
          if (data.result === 'victory') {
             await endCombat(character.id, 'victory')
             toast.success('Vítězství!')
             router.push('/game')
          } else if (data.result === 'defeat') {
             await endCombat(character.id, 'defeat')
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
  const potions = inventory.filter(i => i.type === 'CONSUMABLE' || i.type === 'consumable')

  // No changes to subsections definition needed, just the layout below
  const combatSubsections = [
    {
      title: 'ÚTOK',
      content: (
        <div className="space-y-1">
          <ActionBtn
            onClick={() => handleAction('attack', 'quick')}
            icon={Zap}
            color="text-[#ffd700]"
            border="hover:border-[#ffd700]"
            disabled={isPending}
          >
            <div className="flex w-full justify-between">
              <span>Rychlý útok</span>
              <span className="text-[10px] opacity-70">Základní</span>
            </div>
          </ActionBtn>
          <ActionBtn
            onClick={() => handleAction('attack', 'heavy')} 
            icon={Target}
            color="text-[#ff6b6b]"
            border="hover:border-[#ff6b6b]"
            disabled={isPending}
          >
            <div className="flex w-full justify-between">
              <span>Silný úder</span>
              <span className="text-[10px] text-[#ff6b6b]">Vysoké poškození</span>
            </div>
          </ActionBtn>
          <ActionBtn
            onClick={() => handleAction('special')}
            icon={Sparkles}
            color="text-[#b66bd4]"
            border="hover:border-[#b66bd4]"
            disabled={isPending}
          >
            <div className="flex w-full justify-between">
              <span>Speciální schopnost</span>
              <span className="text-[10px] text-[#b66bd4]">-Mana</span>
            </div>
          </ActionBtn>
        </div>
      ),
      defaultOpen: true
    },
    {
      title: 'OBRANA & TAKTIKA',
      content: (
        <div className="space-y-1">
          <ActionBtn
            onClick={() => handleAction('defend', 'block')}
            icon={Shield}
            color="text-[#69ccf0]"
            border="hover:border-[#69ccf0]"
            disabled={isPending}
          >
            <span>Obrana</span> (Sníží poškození)
          </ActionBtn>
          <ActionBtn
            onClick={() => handleAction('flee')}
            icon={ArrowLeft}
            color="text-[#8b7355]"
            border="hover:border-[#d4a574]"
            disabled={isPending}
          >
             <span>Útěk</span>
          </ActionBtn>
        </div>
      ),
      defaultOpen: true
    },
    {
      title: `LEKTVARY (${potions.length})`,
      content: (
        <div className="grid grid-cols-2 gap-2">
          {potions.map((potion: any) => (
             <ActionBtn
               key={potion.id}
               onClick={async () => {
                 const [_res, err] = await combatItemAction({ characterId: character.id, itemId: potion.id })
                 if (!err) {
                    toast.success('Lektvar použit')
                 }
               }}
               icon={getIconFromName(potion.iconName || 'potion')}
               color="text-[#6fbf6f]"
               border="hover:border-[#6fbf6f]"
               disabled={isPending}
             >
                {potion.name}
             </ActionBtn>
          ))}
          {potions.length === 0 && <div className="text-xs text-[#8b7355] italic col-span-2">Žádné lektvary</div>}
        </div>
      ),
      collapsible: true,
      defaultOpen: false
    }
  ]

  return (
    <PageTemplate title="Souboj" icon={Swords} backgroundImage="/assets/locations/forest.jpg" maxWidth="lg">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {/* Top Section - Player and Enemy */}
        <div className="grid w-full grid-cols-1 gap-3 px-3 pt-3 md:grid-cols-2">
             {/* Player Stats */}
             <div className="w-full">
               <CharacterBox
                 name={character.name}
                 level={character.level}
                 hp={playerHp}
                 hpMax={character.maxHp}
                 mana={playerMana}
                 manaMax={character.maxMana}
                 stats={character}
                 isEnemy={false}
               />
             </div>

             {/* Enemy Stats */}
             <div className="w-full">
               <CharacterBox
                 name={enemy.name}
                 level={enemy.level}
                 hp={enemyHp}
                 hpMax={enemy.maxHp} 
                 mana={0}
                 manaMax={100}
                 stats={{ ...character, strength: 10, defense: 5 }} 
                 isEnemy={true}
                 image="/assets/enemies/wolf.png"
               />
             </div>
        </div>

        {/* Combat Log - Middle */}
        <div className="mx-3 shrink-0 overflow-hidden rounded border border-[#d4a574]/50 bg-black/70 p-4 backdrop-blur-sm" style={{ height: '140px' }}>
          <InfoLogPanel logs={logs} className="h-full" />
        </div>

        {/* Actions - Bottom */}
        <div className="relative min-h-0 flex-1 px-3 pb-3">
           <GamePanel title="Akce" subsections={combatSubsections} />
        </div>
      </div>
    </PageTemplate>
  )
}
